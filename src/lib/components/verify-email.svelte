<script lang="ts">
    import {
        Mail,
        Shield,
        BadgeInfo,
        Timer,
        ExternalLink,
    } from "@lucide/svelte";
    import { fade } from "svelte/transition";

    interface VerifyEmailProps {
        resendMagicLink: () => void;
        email: string;
    }
    let props: VerifyEmailProps = $props();
    let countdown: number = $state(60);
    let canResend: boolean = $state(false);

    const startCountdown = () => {
        canResend = false;
        countdown = 60;
        const timer = setInterval(() => {
            countdown--;
            if (countdown <= 0) {
                clearInterval(timer);
                canResend = true;
            }
        }, 1000);
    };

    const handleResend = () => {
        if (canResend) {
            props.resendMagicLink();
            console.log("重新发送魔法链接到:", props.email);
            startCountdown();
        }
    };

    // 页面加载时启动倒计时
    $effect(() => {
        startCountdown();
    });
</script>

<div class="flex justify-center items-center min-h-screen p-4">
    <div
        class="card card-lg w-full max-w-md shadow-2xl bg-base-100 border border-base-300 transform transition-all duration-300 hover:scale-105"
    >
        <div class="card-body p-8">
            <!-- 头部图标和标题 -->
            <div class="text-center mb-8">
                <div
                    class="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4"
                >
                    <Shield class="w-8 h-8 text-primary" />
                </div>
                <h2 class="text-2xl font-bold text-base-content mb-2">
                    验证您的邮箱
                </h2>
                <p class="text-base-content/70">
                    我们已向
                    {#if props.email}
                        <span class="font-medium text-primary"
                            >{props.email}</span
                        >
                    {:else}
                        您的邮箱
                    {/if}
                    发送了验证链接
                </p>
            </div>

            <!-- 提示区域 -->
            <div class="space-y-6">
                <!-- 主要提示 -->
                <div class="text-center bg-primary/5 rounded-lg p-6 border border-primary/20">
                    <ExternalLink class="w-12 h-12 text-primary mx-auto mb-4" />
                    <h3 class="text-lg font-semibold text-base-content mb-2">
                        请检查您的邮箱
                    </h3>
                    <p class="text-base-content/70 text-sm">
                        点击邮件中的验证链接即可完成邮箱验证
                    </p>
                </div>

                <!-- 重新发送按钮 -->
                <div class="text-center">
                    <button
                        class="btn btn-outline btn-primary"
                        class:btn-disabled={!canResend}
                        onclick={handleResend}
                    >
                        {#if canResend}
                            <Mail class="w-4 h-4" />
                            重新发送验证链接
                        {:else}
                            <Timer class="w-4 h-4" />
                            重新发送 ({countdown}s)
                        {/if}
                    </button>
                </div>

                <!-- 提示信息 -->
                <div class="bg-info rounded-lg p-4 border border-info/20">
                    <div class="flex items-start gap-3">
                        <BadgeInfo class="w-5 h-5 text-info-content" />
                        <div class="text-sm text-info-content">
                            <p class="font-medium mb-1">温馨提示</p>
                            <ul class="list-disc list-inside space-y-1">
                                <li>验证链接有效期为24小时</li>
                                <li>如果没有收到邮件，请检查垃圾邮件文件夹</li>
                                <li>可以在60秒后重新发送验证链接</li>
                                <li>验证完成后页面会自动跳转</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
                                       