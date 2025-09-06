<script lang="ts">
    import {
        CheckCircle2,
        Mail,
        GraduationCap,
        Info,
        BadgeInfo,
        CircleX,
    } from "@lucide/svelte";
    import { crossfade, draw, fade } from "svelte/transition";

    interface VerifyEmailProps {
        onEmailSubmit: (email: string) => Promise<void>;
    }
    let props: VerifyEmailProps = $props();
    let email: string = $state("");
    let isValid: boolean = $state(false);

    const validateEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.nwpu\.edu\.cn$/;
        isValid = emailRegex.test(email);
        return isValid;
    };

    const handleSubmit = async () => {
        if (validateEmail(email)) {
            await props.onEmailSubmit(email);
        }
    };
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
                    <GraduationCap class="w-8 h-8 text-primary" />
                </div>
                <h2 class="text-2xl font-bold text-base-content mb-2">
                    欢迎使用足基软件组报名系统
                </h2>
                <p class="text-base-content/70">
                    请输入您的学校邮箱完成身份验证
                </p>
            </div>

            <!-- 表单区域 -->
            <div class="space-y-6">
                <div class="form-control">
                    <label class="label">
                        <span
                            class="label-text font-medium flex items-center gap-2"
                        >
                            <Mail class="w-4 h-4" />
                            学校邮箱
                        </span>
                    </label>
                    <div class="join w-full">
                        <div class="relative flex-1">
                            <input
                                type="email"
                                placeholder="alice@mail.nwpu.edu.cn"
                                class="input input-bordered input-lg w-full join-item pr-12 transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                                class:input-error={email && !isValid}
                                class:input-success={email && isValid}
                                onkeydown={(e) => {
                                    if (e.key === "Enter") {
                                        handleSubmit();
                                    }
                                }}
                                bind:value={email}
                                oninput={() => validateEmail(email)}
                            />
                        </div>
                        <button
                            class="btn btn-primary btn-lg join-item px-6 transition-all duration-200 hover:scale-105"
                            class:btn-disabled={!isValid}
                            onclick={handleSubmit}
                        >
                            {#if isValid}
                                <CheckCircle2 class="w-5 h-5" />
                            {:else}
                                <CircleX class="w-5 h-5" />
                            {/if}
                        </button>
                    </div>
                    {#if email && !isValid}
                        <div
                            class="badge badge-sm badge-error mt-2"
                            transition:fade
                        >
                            <span class="label-text-alt text-error-content"
                                >请输入有效的学校邮箱（@mail.nwpu.edu.cn）</span
                            >
                        </div>
                    {/if}
                </div>

                <!-- 提示信息 -->
                <div class="bg-info rounded-lg p-4 border border-info/20">
                    <div class="flex items-start gap-3">
                        <BadgeInfo class="w-5 h-5 text-info-content" />
                        <div class="text-sm text-info-content">
                            <p class="font-medium mb-1">温馨提示</p>
                            <p>
                                请使用您的学校邮箱进行验证，我们将发送验证链接到您的邮箱
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
