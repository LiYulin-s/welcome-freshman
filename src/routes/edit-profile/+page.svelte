<script lang="ts">
    import Edit from "$lib/components/edit.svelte";
    import type { Profile } from "$lib/types";
    import { edenClient } from "$lib/client/eden";

    import type { PageProps } from './$types';
    import { goto } from "$app/navigation";
    import { user } from "$lib/store/user.svelte";
    import StageIndicator from "$lib/components/stage-indicator.svelte";

    let { data: pageData }: PageProps = $props();

    let errorMessage: string | null = $state(null);

    const saveProfile = async (profile: Profile) => {
        if (pageData.newProfile) {
            const { data, error } = await edenClient.api.students.post(profile);
            errorMessage = error ? error.value.message || null : null;
            if (!error) {
                user.name = profile.name;
                goto('completed');
            }
        }
        else {
            const { data, error } = await edenClient.api.students({id: pageData.profileId!!}).put(profile);
            errorMessage = error ? error.value.message || null : null;
            if (!error) {
                user.name = profile.name;
                goto('completed');
            }
        }
    };
</script>

<StageIndicator currentStage={3} />

<Edit initialData={pageData.profile || undefined} onSave={saveProfile} frozen={false} />


