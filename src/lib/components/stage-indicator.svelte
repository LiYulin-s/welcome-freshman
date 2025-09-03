<script lang="ts">
    import { Mail, Shield, User, CheckCircle2, CircleQuestionMark } from "@lucide/svelte";
    import { fade } from "svelte/transition";

    interface StageIndicatorProps {
        currentStage: number; // 1: 邮箱输入, 2: 邮箱验证, 3: 个人信息填写, 4: 完成
    }

    let { currentStage }: StageIndicatorProps = $props();
    let isExpanded = $state(false);

    const stages = [
        {
            step: 1,
            title: "邮箱验证",
            icon: Mail,
        },
        {
            step: 2,
            title: "验证码确认",
            icon: Shield,
        },
        {
            step: 3,
            title: "填写信息",
            icon: User,
        },
        {
            step: 4,
            title: "注册完成",
            icon: CheckCircle2,
        },
    ];

    function toggleExpanded() {
        isExpanded = !isExpanded;
    }
</script>

<div
    class="fixed bottom-6 right-6 md:bottom-6 md:right-6 sm:bottom-4 sm:right-4 z-50 flex flex-col items-end gap-3"
>
    <ul
        class="steps steps-horizontal w-full max-w-xs sm:max-w-sm bg-white/95 backdrop-blur-sm rounded-xl p-3 shadow-lg border border-white/20 transition-all duration-300 ease-in-out"
        class:opacity-0 ={!isExpanded}
    >
        {#each stages as stage}
            <li
                class="step text-xs sm:text-sm"
                class:step-secondary={currentStage > stage.step}
                class:step-primary={currentStage === stage.step}
                class:step-neutral={currentStage < stage.step}
            >
                <span class="step-icon">
                    <stage.icon class="w-4 h-4" />
                </span>
                {stage.title}
            </li>
        {/each}
    </ul>

    <div
        role="button"
        tabindex="0"
        class="btn btn-lg btn-circle btn-primary shadow-lg hover:shadow-xl transition-shadow"
        onclick={toggleExpanded}
        onkeydown={(e) => e.key === "Enter" && toggleExpanded()}
    >
        <CircleQuestionMark class="w-6 h-6 text-primary-content" />
    </div>
</div>
