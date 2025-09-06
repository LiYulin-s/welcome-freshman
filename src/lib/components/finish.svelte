<script lang="ts">
    import { CheckCircle2, PartyPopper, Home, User } from "@lucide/svelte";
    import { fade, scale } from "svelte/transition";

    interface FinishProps {
        userName: string;
    }

    let props: FinishProps = $props();
</script>

<div class="flex justify-center items-center min-h-screen p-4">
    <div
        class="card card-lg w-full max-w-md shadow-2xl bg-base-100 border border-base-300 transform transition-all duration-300 hover:scale-105"
    >
        <div class="card-body p-8">
            <!-- 成功图标和动画 -->
            <div class="text-center mb-8">
                <div
                    class="mx-auto w-20 h-20 bg-success/10 rounded-full flex items-center justify-center mb-6"
                    in:scale={{ duration: 500, delay: 200 }}
                >
                    <CheckCircle2 class="w-12 h-12 text-success" />
                </div>

                <div in:fade={{ duration: 500, delay: 400 }}>
                    <h2
                        class="text-3xl font-bold text-base-content mb-3 flex items-center justify-center gap-2"
                    >
                        <PartyPopper class="w-8 h-8 text-primary" />
                        恭喜您！
                    </h2>
                    <p class="text-lg text-base-content/70 mb-2">
                        {#if props.userName}
                            欢迎 <span class="font-semibold text-primary"
                                >{props.userName}</span
                            >
                        {:else}
                            欢迎您
                        {/if}
                    </p>
                    <p class="text-base-content/60">
                        您已成功完成报名系统的报名流程
                    </p>
                </div>
            </div>

            <!-- 完成信息 -->
            <div
                class="bg-success/5 rounded-lg p-6 border border-success/20 mb-8"
                in:fade={{ duration: 500, delay: 600 }}
            >
                <div class="flex items-start gap-3">
                    <CheckCircle2 class="w-6 h-6 text-success mt-0.5" />
                    <div>
                        <h3 class="font-semibold text-success mb-2">
                            注册完成
                        </h3>
                        <ul class="text-sm text-base-content/70 space-y-1">
                            <li>✓ 邮箱验证已完成</li>
                            <li>✓ 个人信息已保存</li>
                            <li>✓ 账户创建成功</li>
                        </ul>
                    </div>
                </div>
            </div>

            <!-- 友好提示 -->
            <div
                class="text-center mt-8 pt-6 border-t border-base-300"
                in:fade={{ duration: 500, delay: 1000 }}
            >
                <p class="text-sm text-base-content/50">
                    感谢您的参与，祝您在新的学习生活中一切顺利！
                </p>
            </div>
        </div>
    </div>
</div>
