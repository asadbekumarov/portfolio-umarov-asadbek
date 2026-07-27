<script setup lang="ts">
interface ExperienceItem {
    key: string;
    periodStart: string;
    periodEnd: string | null;
    current: boolean;
    achievementCount: number;
}

const experiences: ExperienceItem[] = [
    {
        key: "soft_turtkul",
        periodStart: "Aug 2025",
        periodEnd: "Nov 2025",
        current: false,
        achievementCount: 3,
    },
];
</script>

<template>
    <section
        id="experience"
        class="section-padding relative"
        aria-labelledby="experience-heading"
    >
        <!-- Top gradient divider -->
        <div class="section-divider" aria-hidden="true" />

        <!-- Subtle background glow (blue) -->
        <div
            class="pointer-events-none absolute inset-0 experience-glow"
            aria-hidden="true"
        />

        <div class="section-container relative">
            <!-- ── Section Header ── -->
            <div class="text-center mb-16">
                <span class="section-label mb-3 scroll-animate">{{ $t('experience.label') }}</span>
                <h2
                    id="experience-heading"
                    class="section-title scroll-animate delay-100"
                >
                    {{ $t('experience.title') }}
                    <span class="gradient-text"> {{ $t('experience.title_accent') }}</span>
                </h2>
                <p
                    class="mt-4 max-w-xl mx-auto text-base leading-relaxed scroll-animate delay-200 text-slate-400/45"
                >
                    {{ $t('experience.description') }}
                </p>
            </div>

            <!-- ── Timeline ── -->
            <div class="max-w-3xl mx-auto">
                <div
                    v-for="(exp, index) in experiences"
                    :key="exp.key + index"
                    class="relative pl-10 scroll-animate delay-200"
                >
                    <!-- Vertical timeline line -->
                    <div
                        class="absolute left-0 top-0 bottom-0 w-px timeline-line"
                        aria-hidden="true"
                    />

                    <!-- Timeline dot -->
                    <div
                        class="absolute left-[-5px] top-7 w-[11px] h-[11px] rounded-full border-2 border-sky-600 bg-[#030712]"
                        aria-hidden="true"
                    >
                        <!-- Pulsing inner dot — teal for current role -->
                        <div
                            v-if="exp.current"
                            class="absolute inset-[2px] rounded-full animate-ping bg-emerald-700 opacity-80"
                        />
                        <div
                            v-if="exp.current"
                            class="absolute inset-[2px] rounded-full bg-emerald-700"
                        />
                    </div>

                    <!-- ── Card ── -->
                    <div
                        class="glass-card p-7 sm:p-8 transition-all duration-300"
                    >
                        <!-- Card header -->
                        <div
                            class="flex flex-wrap items-start justify-between gap-4 mb-5"
                        >
                            <div>
                                <!-- Role + Current badge -->
                                <div
                                    class="flex flex-wrap items-center gap-2.5 mb-1.5"
                                >
                                    <h3
                                        class="text-lg font-bold text-slate-200"
                                    >
                                        {{ $t(`experience.items.${exp.key}.role`) }}
                                    </h3>

                                </div>

                                <!-- Company · Type · Location -->
                                <div
                                    class="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm"
                                >
                                    <span
                                        class="font-semibold text-sky-600"
                                    >
                                        {{ $t(`experience.items.${exp.key}.company`) }}
                                    </span>
                                    <span
                                        class="text-slate-200/20"
                                        >·</span
                                    >
                                    <span
                                        class="text-slate-400/45"
                                    >
                                        {{ $t(`experience.items.${exp.key}.type`) }}
                                    </span>
                                    <span
                                        class="text-slate-200/20"
                                        >·</span
                                    >
                                    <span
                                        class="text-slate-400/45"
                                    >
                                        {{ $t(`experience.items.${exp.key}.location`) }}
                                    </span>
                                </div>
                            </div>

                            <!-- Period badge -->
                            <span
                                class="text-xs font-semibold px-3 py-1.5 rounded-lg flex-shrink-0 bg-[#0d2138]/80 border border-sky-500/15 text-slate-200/60"
                            >
                                {{ exp.periodStart }} — {{ exp.current ? $t('experience.current') : exp.periodEnd }}
                            </span>
                        </div>

                        <!-- Horizontal divider -->
                        <div
                            class="w-full h-px mb-5 bg-sky-500/10"
                            aria-hidden="true"
                        />

                        <!-- Description -->
                        <p
                            class="text-sm leading-relaxed mb-5 text-slate-400/60"
                        >
                            {{ $t(`experience.items.${exp.key}.description`) }}
                        </p>

                        <!-- Achievements list -->
                        <ul
                            class="space-y-2.5 mb-6"
                            aria-label="Key achievements"
                        >
                            <li
                                v-for="i in exp.achievementCount"
                                :key="i"
                                class="flex items-start gap-3 text-sm text-slate-200/80"
                            >
                                <!-- Check icon -->
                                <span
                                    class="flex-shrink-0 mt-0.5 w-4 h-4 rounded-full flex items-center justify-center bg-sky-500/10 border border-sky-500/25"
                                    aria-hidden="true"
                                >
                                    <svg
                                        width="8"
                                        height="8"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="#0284c7"
                                        stroke-width="3"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                    >
                                        <polyline points="20 6 9 17 4 12" />
                                    </svg>
                                </span>
                                {{ $t(`experience.items.${exp.key}.achievements.${i - 1}`) }}
                            </li>
                        </ul>

                        <!-- Technology tags -->
                        <div
                            class="flex flex-wrap gap-2 pt-5 border-t border-sky-500/10"
                            aria-label="Technologies used"
                        >
                            <span
                                v-for="tech in exp.technologies"
                                :key="tech"
                                class="tag-pill"
                            >
                                {{ tech }}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <!-- ── Open to Work CTA ── -->
            <div class="max-w-3xl mx-auto mt-8 pl-10 scroll-animate delay-300">
                <div
                    class="glass-card p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-sky-500/20 bg-sky-500/5"
                >
                    <div class="flex items-center gap-3">

                    </div>

                </div>
            </div>
        </div>
    </section>
</template>

<style scoped>
.experience-glow {
    background: radial-gradient(
        ellipse 55% 35% at 20% 60%,
        rgba(2, 132, 199, 0.06) 0%,
        transparent 70%
    );
}
.timeline-line {
    background: linear-gradient(
        to bottom,
        #0284c7 0%,
        rgba(2, 132, 199, 0.3) 60%,
        transparent 100%
    );
}
</style>
