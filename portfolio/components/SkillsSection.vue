<script setup lang="ts">
interface SkillCategory {
    emoji: string;
    categoryKey: string;
    skills: string[];
}

const skillCategories: SkillCategory[] = [
    {
        emoji: "⚡",
        categoryKey: "skills.categories.core",
        skills: ["JavaScript (ES6+)", "TypeScript", "HTML5", "CSS3"],
    },
    {
        emoji: "🚀",
        categoryKey: "skills.categories.frameworks",
        skills: ["React.js", "Next.js", "React Native"],
    },
    {
        emoji: "🎨",
        categoryKey: "skills.categories.styling",
        skills: [
            "Tailwind CSS",
            "CSS Modules",
            "Responsive Design",
            "Mobile-First",
        ],
    },
    {
        emoji: "🔄",
        categoryKey: "skills.categories.state",
        skills: ["RTK Query", "Redux Toolkit", "REST APIs", "Async/Await"],
    },
    {
        emoji: "🛠️",
        categoryKey: "skills.categories.tools",
        skills: ["Git", "GitHub", "VS Code", "Figma", "npm / yarn"],
    },
    {
        emoji: "💡",
        categoryKey: "skills.categories.soft",
        skills: [
            "Problem Solving",
            "Team Collaboration",
            "Attention to Detail",
            "Fast Learner",
        ],
    },
];
</script>

<template>
    <section
        id="skills"
        class="section-padding relative"
        aria-labelledby="skills-heading"
    >
        <!-- Top divider -->
        <div class="section-divider" aria-hidden="true" />

        <!-- Subtle background glow -->
        <div
            class="pointer-events-none absolute inset-0 skills-glow"
            aria-hidden="true"
        />

        <div class="section-container relative">
            <!-- ── Section Header ── -->
            <div class="text-center mb-14">
                <span class="section-label mb-3 scroll-animate">
                    {{ $t('skills.label') }}
                </span>
                <h2
                    id="skills-heading"
                    class="section-title mt-2 scroll-animate delay-100"
                >
                    {{ $t('skills.title') }}
                    <span class="gradient-text">{{ $t('skills.title_accent') }}</span>
                </h2>
                <p
                    class="mt-4 max-w-xl mx-auto text-sm sm:text-base leading-relaxed scroll-animate delay-200 text-slate-400/45"
                >
                    {{ $t('skills.description') }}
                </p>
            </div>

            <!-- ── Skills Grid ── -->
            <div
                class="grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
                role="list"
                aria-label="Skill categories"
            >
                <div
                    v-for="(cat, index) in skillCategories"
                    :key="cat.categoryKey"
                    class="glass-card p-6 group scroll-animate"
                    :style="`transition-delay: ${0.05 + index * 0.08}s;`"
                    role="listitem"
                >
                    <!-- Card header -->
                    <div class="flex items-start gap-3 mb-4">
                        <!-- Icon box -->
                        <div
                            class="w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0 transition-transform duration-300 group-hover:scale-110 bg-sky-500/10 border border-sky-500/20"
                            aria-hidden="true"
                        >
                            {{ cat.emoji }}
                        </div>
                        <div>
                            <h3
                                class="text-sm font-semibold leading-tight text-slate-200"
                            >
                                {{ $t(`${cat.categoryKey}.title`) }}
                            </h3>
                            <p
                                class="text-xs mt-0.5 text-slate-400/40"
                            >
                                {{ $t(`${cat.categoryKey}.description`) }}
                            </p>
                        </div>
                    </div>

                    <!-- Divider -->
                    <div
                        class="h-px w-full mb-4 bg-sky-500/10"
                        aria-hidden="true"
                    />

                    <!-- Skill pills -->
                    <div
                        class="flex flex-wrap gap-2"
                        role="list"
                        :aria-label="`${$t(`${cat.categoryKey}.title`)} skills`"
                    >
                        <span
                            v-for="skill in cat.skills"
                            :key="skill"
                            class="tag-pill transition-all duration-200 group-hover:border-indigo-500/30 group-hover:bg-indigo-500/12"
                            role="listitem"
                        >
                            {{ skill }}
                        </span>
                    </div>
                </div>
            </div>

            <!-- ── Bottom note ── -->

        </div>
    </section>
</template>

<style scoped>
.skills-glow {
    background: radial-gradient(
        ellipse 70% 40% at 50% 50%,
        rgba(2, 132, 199, 0.05) 0%,
        transparent 70%
    );
}
</style>
