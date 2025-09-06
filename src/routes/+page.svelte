<script lang="ts">
    import { goto } from "$app/navigation";
    import { authClient } from "$lib/client/auth";
    import GetStarted from "$lib/components/get-started.svelte";
    import { user } from "$lib/store/user.svelte";

    import { PUBLIC_BASE_URL } from "$env/static/public"
    import StageIndicator from "$lib/components/stage-indicator.svelte";
    import { CircleX } from "@lucide/svelte";

    let busy = $state(false);
    let errorMessage: string | null = $state(null);

    const handleEmailSubmit = async (mail: string) => {
        busy = true;
        errorMessage = null; // 清除之前的错误消息
        const { data, error } = await authClient.signIn.magicLink({
            email: mail,
            name: mail.split("@")[0],
            callbackURL: PUBLIC_BASE_URL + '/edit-profile',
        })
        busy = false;
        if (error) {
            console.error("Error sending OTP:", error);
            errorMessage = error.statusText || "发送验证码失败，请检查邮箱地址是否正确";
            // 5秒后自动清除错误消息
            setTimeout(() => {
                errorMessage = null;
            }, 5000);
        }

        user.email = mail;
        if (!error) {
            goto('/verify-email');
        }
    }

</script>

<StageIndicator currentStage={1} />
<GetStarted onEmailSubmit={handleEmailSubmit} busy={busy} />

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

