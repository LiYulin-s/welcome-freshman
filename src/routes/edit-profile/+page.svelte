<script lang="ts">
    import Edit from "$lib/components/edit.svelte";
    import type { Profile } from "$lib/types";
    import { edenClient } from "$lib/client/eden";

    import type { PageProps } from './$types';
    import { goto } from "$app/navigation";
    import { user } from "$lib/store/user.svelte";
    import StageIndicator from "$lib/components/stage-indicator.svelte";
    import { CircleX } from "@lucide/svelte";

    let { data: pageData }: PageProps = $props();

    let errorMessage: string | null = $state(null);

    let busy = $state(false);

    const saveProfile = async (profile: Profile) => {
        if (pageData.newProfile) {
            busy = true;
            const { data, error } = await edenClient.api.students.post(profile);
            busy = false;
            errorMessage = error ? error.value.message || null : null;
            if (!error) {
                user.name = profile.name;
                goto('completed');
            }
        }
        else {
            busy = true;
            const { data, error } = await edenClient.api.students({id: pageData.profileId!!}).put(profile);
            busy = false;
            errorMessage = error ? error.value.message || null : null;
            if (!error) {
                user.name = profile.name;
                goto('completed');
            }
        }
    };
</script>

<StageIndicator currentStage={3} />

<Edit initialData={pageData.profile || undefined} onSave={saveProfile} busy={busy} />

{#if errorMessage}
    <div class="toast toast-top toast-center z-50">
        <div class="alert alert-error shadow-lg">
            <span>{errorMessage}</span>
            <button 
                class="btn btn-sm btn-circle btn-ghost ml-2"
                onclick={() => errorMessage = null}
            >
                <CircleX class="w-4 h-4" />
            </button>
        </div>
    </div>
{/if}
