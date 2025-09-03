<script lang="ts">
    import { goto } from "$app/navigation";
    import { authClient } from "$lib/client/auth";
    import GetStarted from "$lib/components/get-started.svelte";
    import { user } from "$lib/store/user.svelte";

    import { PUBLIC_BASE_URL } from "$env/static/public"
    import StageIndicator from "$lib/components/stage-indicator.svelte";

    const handleEmailSubmit = async (mail: string) => {
        const { data, error } = await authClient.signIn.magicLink({
            email: mail,
            name: mail.split("@")[0],
            callbackURL: PUBLIC_BASE_URL + '/edit-profile',
        })
        if (error) {
            console.error("Error sending OTP:", error);
            alert("发送验证码失败，请检查邮箱地址是否正确");
        }

        user.email = mail;
        
        goto('/verify-email');
    }

</script>

<StageIndicator currentStage={1} />
<GetStarted onEmailSubmit={handleEmailSubmit} />

