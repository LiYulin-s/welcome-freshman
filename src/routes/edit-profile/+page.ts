import { authClient } from "$lib/client/auth";
import { edenClient } from "$lib/client/eden";
import { redirect } from "@sveltejs/kit";
import type { PageLoad } from "./$types";

export const ssr = false;

export const load: PageLoad = async ({ params }) => {
    const { data: session, error } = await authClient.getSession();
    if (error) {
        console.error("Error fetching session:", error);
        redirect(303, '/');
    }
    if (!session) {
        redirect(303, '/');
    }


    if (!session.user.profileId || session.user.profileId === 'null') { // Fuck better-auth
        return { profile: null, newProfile: true, profileId: null };
    }

    else {
        const { data, error } = await edenClient.api.students({ id: session.user.profileId }).get()
        if (error) {
            console.error("Error fetching student profile:", error);
            redirect(303, '/');
        }
        if (data) {
            return { profile: data, newProfile: false, profileId: session.user.profileId };
        }
        else {
            return { profile: null, newProfile: true, profileId: session.user.profileId };
        }
    }
};