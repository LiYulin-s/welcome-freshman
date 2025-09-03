<script>
    import { authClient } from "$lib/client/auth";
    import VerifyEmail from "$lib/components/verify-email.svelte";

    import { user } from "$lib/store/user.svelte";
    import { PUBLIC_BASE_URL } from "$env/static/public"
    import StageIndicator from "$lib/components/stage-indicator.svelte";

    const handleEmailResend = async () => {
        const { data, error } = await authClient.signIn.magicLink({
            email: user.email,
            name: user.email.split("@")[0],
            callbackURL: PUBLIC_BASE_URL + '/edit-profile',
        })
        if (error) {
            console.error("Error sending OTP:", error);
            alert("发送验证码失败，请检查邮箱地址是否正确");
        }
    }
</script>
<StageIndicator currentStage={2} />

<VerifyEmail email={user.email} resendMagicLink={handleEmailResend}/>

