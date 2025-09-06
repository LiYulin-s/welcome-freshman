<script lang="ts">
    import type { Profile } from "$lib/types";
    import {
        User,
        GraduationCap,
        Heart,
        Target,
        BookOpen,
        Code,
        Save,
        ArrowLeft,
    } from "@lucide/svelte";
    import { fade, slide } from "svelte/transition";

    interface EditProps {
        onSave: (profile: Profile) => Promise<void>;
        onBack?: () => void;
        frozen: boolean;
        initialData?: Partial<Profile>;
    }

    let props: EditProps = $props();

    // 表单数据
    let formData: Profile = $state({
        name: props.initialData?.name || "",
        gender: props.initialData?.gender || "MALE",
        studentNum: props.initialData?.studentNum || "",
        phone: props.initialData?.phone || "",
        qq: props.initialData?.qq || "",
        school: props.initialData?.school || "",
        major: props.initialData?.major || "",
        intention: props.initialData?.intention || "",
        reason: props.initialData?.reason || "",
        bio: props.initialData?.bio || "",
        interest: props.initialData?.interest || "",
        skills: props.initialData?.skills || "",
    });

    // 验证状态
    let errors: Partial<Record<keyof Profile, string>> = $state({});
    let isValid: boolean = $state(false);

    // 验证函数
    const validateForm = () => {
        errors = {};

        if (!formData.name.trim()) {
            errors.name = "请输入姓名";
        }

        if (!formData.studentNum.trim()) {
            errors.studentNum = "请输入学号";
        } else if (!/^\d{10}$/.test(formData.studentNum)) {
            errors.studentNum = "学号应为10位数字";
        }

        if (!formData.phone.trim()) {
            errors.phone = "请输入手机号";
        } else if (!/^1[3-9]\d{9}$/.test(formData.phone)) {
            errors.phone = "请输入有效的手机号";
        }

        if (!formData.qq.trim()) {
            errors.qq = "请输入QQ号";
        } else if (!/^\d{5,11}$/.test(formData.qq)) {
            errors.qq = "QQ号应为5-11位数字";
        }

        if (!formData.school.trim()) {
            errors.school = "请选择学院";
        }

        if (!formData.major.trim()) {
            errors.major = "请输入专业";
        }

        if (!formData.intention.trim()) {
            errors.intention = "请选择加入意向";
        }

        if (!formData.reason.trim()) {
            errors.reason = "请说明加入原因";
        } else if (formData.reason.length > 300) {
            errors.reason = "加入原因不能超过300字";
        }

        if (!formData.bio.trim()) {
            errors.bio = "请输入个人简介";
        } else if (formData.bio.length > 500) {
            errors.bio = "个人简介不能超过500字";
        }

        if (!formData.interest.trim()) {
            errors.interest = "请输入兴趣爱好";
        }

        if (!formData.skills.trim()) {
            errors.skills = "请输入技能特长";
        }

        isValid = Object.keys(errors).length === 0;
        return isValid;
    };

    const handleSubmit = async () => {
        if (validateForm()) {
            await props.onSave(formData);
        }
    };

    const handleBack = () => {
        if (props.onBack) {
            props.onBack();
        }
    };

    // 学院选项
    const schools = [
        "航空学院",
        "航天学院",
        "航海学院",
        "材料学院",
        "机电学院",
        "力学与土木建筑学院",
        "动力与能源学院",
        "电子信息学院",
        "自动化学院",
        "计算机学院",
        "网络空间安全学院",
        "理学院",
        "管理学院",
        "人文与经法学院",
        "外国语学院",
        "软件学院",
        "生命学院",
        "艺术学院",
        "教育实验学院",
        "国际教育学院",
        "莫航学院",
        "玛丽女王工程学院",
    ];

    const intentions = [
        "v5++（无人机）组",
        "人型组",
        "轮式组",
        "水下组",
        "标准平台组",
    ];
</script>

<div class="flex justify-center items-center min-h-screen p-4">
    <div
        class="card card-lg w-full max-w-md shadow-2xl bg-base-100 border border-base-300 transform transition-all duration-300 hover:scale-105"
    >
        <div class="card-body p-8">
            <!-- 头部 -->
            <div class="flex items-center gap-4 mb-8">
                {#if props.onBack}
                    <button class="btn btn-ghost btn-sm" onclick={handleBack}>
                        <ArrowLeft class="w-4 h-4" />
                    </button>
                {/if}
                <div class="flex items-center gap-3">
                    <div
                        class="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center"
                    >
                        <User class="w-6 h-6 text-primary" />
                    </div>
                    <div>
                        <h2 class="text-2xl font-bold text-base-content">
                            编辑个人信息
                        </h2>
                        <p class="text-base-content/70">请完善您的个人资料</p>
                    </div>
                </div>
            </div>

            <!-- 表单 -->
            <form class="space-y-8" onsubmit={handleSubmit}>
                <!-- 基本信息 -->
                <div class="card bg-base-100 border border-base-300">
                    <div class="card-body p-6">
                        <h3
                            class="card-title text-lg mb-4 flex items-center gap-2"
                        >
                            <User class="w-5 h-5" />
                            基本信息
                        </h3>

                        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <!-- 姓名 -->
                            <div class="form-control">
                                <label class="label" for="name-input">
                                    <span class="label-text font-medium"
                                        >姓名 *</span
                                    >
                                </label>
                                <input
                                    id="name-input"
                                    type="text"
                                    placeholder="请输入真实姓名"
                                    class="input input-bordered"
                                    class:input-error={errors.name}
                                    bind:value={formData.name}
                                    oninput={() => validateForm()}
                                />
                                {#if errors.name}
                                    <div
                                        class="badge badge-sm badge-error mt-2"
                                        transition:fade
                                    >
                                        {errors.name}
                                    </div>
                                {/if}
                            </div>

                            <!-- 性别 -->
                            <div class="form-control">
                                <label class="label" for="gender-select">
                                    <span class="label-text font-medium"
                                        >性别 *</span
                                    >
                                </label>
                                <select
                                    id="gender-select"
                                    class="select select-bordered"
                                    bind:value={formData.gender}
                                    onchange={() => validateForm()}
                                >
                                    <option value="MALE">男</option>
                                    <option value="FEMALE">女</option>
                                </select>
                            </div>

                            <!-- 学号 -->
                            <div class="form-control">
                                <label class="label" for="student-num-input">
                                    <span class="label-text font-medium"
                                        >学号 *</span
                                    >
                                </label>
                                <input
                                    id="student-num-input"
                                    type="text"
                                    placeholder="请输入10位学号"
                                    maxlength="10"
                                    class="input input-bordered"
                                    class:input-error={errors.studentNum}
                                    bind:value={formData.studentNum}
                                    oninput={() => validateForm()}
                                    onkeydown={(e) => {
                                        if (
                                            !/[0-9]/.test(e.key) &&
                                            ![
                                                "Backspace",
                                                "Delete",
                                                "Tab",
                                                "ArrowLeft",
                                                "ArrowRight",
                                            ].includes(e.key)
                                        ) {
                                            e.preventDefault();
                                        }
                                    }}
                                />
                                {#if errors.studentNum}
                                    <div
                                        class="badge badge-sm badge-error mt-2"
                                        transition:fade
                                    >
                                        {errors.studentNum}
                                    </div>
                                {/if}
                            </div>

                            <!-- 手机号 -->
                            <div class="form-control">
                                <label class="label" for="phone-input">
                                    <span class="label-text font-medium"
                                        >手机号 *</span
                                    >
                                </label>
                                <input
                                    id="phone-input"
                                    type="tel"
                                    placeholder="请输入手机号"
                                    maxlength="11"
                                    class="input input-bordered"
                                    class:input-error={errors.phone}
                                    bind:value={formData.phone}
                                    oninput={() => validateForm()}
                                    onkeydown={(e) => {
                                        if (
                                            !/[0-9]/.test(e.key) &&
                                            ![
                                                "Backspace",
                                                "Delete",
                                                "Tab",
                                                "ArrowLeft",
                                                "ArrowRight",
                                            ].includes(e.key)
                                        ) {
                                            e.preventDefault();
                                        }
                                    }}
                                />
                                {#if errors.phone}
                                    <div
                                        class="badge badge-sm badge-error mt-2"
                                        transition:fade
                                    >
                                        {errors.phone}
                                    </div>
                                {/if}
                            </div>

                            <!-- QQ号 -->
                            <div class="form-control">
                                <label class="label" for="qq-input">
                                    <span class="label-text font-medium"
                                        >QQ号 *</span
                                    >
                                </label>
                                <input
                                    id="qq-input"
                                    type="text"
                                    placeholder="请输入QQ号"
                                    maxlength="11"
                                    class="input input-bordered"
                                    class:input-error={errors.qq}
                                    bind:value={formData.qq}
                                    oninput={() => validateForm()}
                                    onkeydown={(e) => {
                                        if (
                                            !/[0-g]/.test(e.key) &&
                                            ![
                                                "Backspace",
                                                "Delete",
                                                "Tab",
                                                "ArrowLeft",
                                                "ArrowRight",
                                            ].includes(e.key)
                                        ) {
                                            e.preventDefault();
                                        }
                                    }}
                                />
                                {#if errors.qq}
                                    <div
                                        class="badge badge-sm badge-error mt-2"
                                        transition:fade
                                    >
                                        {errors.qq}
                                    </div>
                                {/if}
                            </div>

                            <!-- 学院 -->
                            <div class="form-control">
                                <label class="label" for="school-select">
                                    <span class="label-text font-medium"
                                        >学院 *</span
                                    >
                                </label>
                                <select
                                    id="school-select"
                                    class="select select-bordered"
                                    class:select-error={errors.school}
                                    bind:value={formData.school}
                                    onchange={() => validateForm()}
                                >
                                    <option value="">请选择学院</option>
                                    {#each schools as school}
                                        <option value={school}>{school}</option>
                                    {/each}
                                </select>
                                {#if errors.school}
                                    <div
                                        class="badge badge-sm badge-error mt-2"
                                        transition:fade
                                    >
                                        {errors.school}
                                    </div>
                                {/if}
                            </div>

                            <!-- 专业 -->
                            <div
                                class="form-control md:col-span-2 md:floating-label"
                            >
                                <label class="label" for="major-input">
                                    <span class="label-text font-medium"
                                        >专业 *</span
                                    >
                                </label>
                                <input
                                    id="major-input"
                                    type="text"
                                    placeholder="请输入专业名称"
                                    class="input input-bordered"
                                    class:input-error={errors.major}
                                    bind:value={formData.major}
                                    oninput={() => validateForm()}
                                />
                                {#if errors.major}
                                    <div
                                        class="badge badge-sm badge-error mt-2"
                                        transition:fade
                                    >
                                        {errors.major}
                                    </div>
                                {/if}
                            </div>
                        </div>
                    </div>
                </div>

                <!-- 个人介绍 -->
                <div class="card bg-base-100 border border-base-300">
                    <div class="card-body p-6">
                        <h3
                            class="card-title text-lg mb-4 flex items-center gap-2"
                        >
                            <Target class="w-5 h-5" />
                            个人介绍
                        </h3>

                        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <!-- 加入意向 -->
                            <div class="form-control md:col-span-2">
                                <label class="label" for="intention-select">
                                    <span class="label-text font-medium"
                                        >加入意向 *</span
                                    >
                                </label>
                                <select
                                    id="intention-select"
                                    class="select select-bordered"
                                    class:select-error={errors.intention}
                                    bind:value={formData.intention}
                                    onchange={() => validateForm()}
                                >
                                    <option value=""
                                        >请选择您希望加入的组别</option
                                    >
                                    {#each intentions as intention}
                                        <option value={intention}
                                            >{intention}</option
                                        >
                                    {/each}
                                </select>
                                {#if errors.intention}
                                    <div
                                        class="badge badge-sm badge-error mt-2"
                                        transition:fade
                                    >
                                        {errors.intention}
                                    </div>
                                {/if}
                            </div>

                            <!-- 加入原因 -->
                            <div class="form-control md:col-span-2">
                                <label class="label" for="reason-textarea">
                                    <span class="label-text font-medium"
                                        >加入原因 *</span
                                    >
                                    <span class="label-text-alt"
                                        >{formData.reason.length}/300</span
                                    >
                                </label>
                                <textarea
                                    id="reason-textarea"
                                    placeholder="请简要说明您想加入我们的原因和期望..."
                                    class="textarea textarea-bordered h-24"
                                    class:textarea-error={errors.reason}
                                    bind:value={formData.reason}
                                    oninput={() => validateForm()}
                                ></textarea>
                                {#if errors.reason}
                                    <div
                                        class="badge badge-sm badge-error mt-2"
                                        transition:fade
                                    >
                                        {errors.reason}
                                    </div>
                                {/if}
                            </div>

                            <!-- 个人简介 -->
                            <div class="form-control md:col-span-2">
                                <label class="label" for="bio-textarea">
                                    <span class="label-text font-medium"
                                        >个人简介 *</span
                                    >
                                    <span class="label-text-alt"
                                        >{formData.bio.length}/500</span
                                    >
                                </label>
                                <textarea
                                    id="bio-textarea"
                                    placeholder="请介绍一下您自己，包括性格特点、学习经历、项目经验等..."
                                    class="textarea textarea-bordered h-32"
                                    class:textarea-error={errors.bio}
                                    bind:value={formData.bio}
                                    oninput={() => validateForm()}
                                ></textarea>
                                {#if errors.bio}
                                    <div
                                        class="badge badge-sm badge-error mt-2"
                                        transition:fade
                                    >
                                        {errors.bio}
                                    </div>
                                {/if}
                            </div>
                        </div>
                    </div>
                </div>

                <!-- 兴趣技能 -->
                <div class="card bg-base-100 border border-base-300">
                    <div class="card-body p-6">
                        <h3
                            class="card-title text-lg mb-4 flex items-center gap-2"
                        >
                            <Heart class="w-5 h-5" />
                            兴趣与技能
                        </h3>

                        <div class="grid grid-cols-1 gap-6">
                            <!-- 兴趣爱好 -->
                            <div class="form-control">
                                <label class="label" for="interest-textarea">
                                    <span class="label-text font-medium"
                                        >兴趣爱好 *</span
                                    >
                                </label>
                                <textarea
                                    id="interest-textarea"
                                    placeholder="请分享您的兴趣爱好，如运动、音乐、阅读等..."
                                    class="textarea textarea-bordered h-24"
                                    class:textarea-error={errors.interest}
                                    bind:value={formData.interest}
                                    oninput={() => validateForm()}
                                ></textarea>
                                {#if errors.interest}
                                    <div
                                        class="badge badge-sm badge-error mt-2"
                                        transition:fade
                                    >
                                        {errors.interest}
                                    </div>
                                {/if}
                            </div>

                            <!-- 技能特长 -->
                            <div class="form-control">
                                <label class="label" for="skills-textarea">
                                    <span class="label-text font-medium"
                                        >技能特长 *</span
                                    >
                                </label>
                                <textarea
                                    id="skills-textarea"
                                    placeholder="请列出您的技能特长，如编程语言、设计软件等..."
                                    class="textarea textarea-bordered h-24"
                                    class:textarea-error={errors.skills}
                                    bind:value={formData.skills}
                                    oninput={() => validateForm()}
                                ></textarea>
                                {#if errors.skills}
                                    <div
                                        class="badge badge-sm badge-error mt-2"
                                        transition:fade
                                    >
                                        {errors.skills}
                                    </div>
                                {/if}
                            </div>
                        </div>
                    </div>
                </div>

                <!-- 操作按钮 -->
                <div class="flex justify-end gap-4 mt-8">
                    {#if props.onBack}
                        <button
                            type="button"
                            class="btn btn-ghost"
                            onclick={handleBack}
                        >
                            <ArrowLeft class="w-4 h-4" />
                            返回
                        </button>
                    {/if}
                    <button
                        type="submit"
                        class="btn btn-primary"
                        disabled={!isValid || props.frozen}
                    >
                        <Save class="w-4 h-4" />
                        {#if props.frozen}
                            保存中...
                        {:else}
                            保存信息
                        {/if}
                    </button>
                </div>
            </form>
        </div>
    </div>
</div>
