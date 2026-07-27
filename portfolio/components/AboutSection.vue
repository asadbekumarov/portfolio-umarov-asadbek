<script setup lang="ts">
const { t } = useI18n();

interface StatItem {
    value: string;
    labelKey: string;
}

interface InfoItem {
    emoji: string;
    labelKey: string;
    valueKey: string;
}

const stats: StatItem[] = [
    { value: "4+", labelKey: "about.stats.projects" },
    { value: "1+", labelKey: "about.stats.experience" },
    { value: "100%", labelKey: "about.stats.remote" },
];

const quickInfo: InfoItem[] = [
    { emoji: "📍", labelKey: "about.info.location", valueKey: "hero.location" },
    { emoji: "💼", labelKey: "about.info.status", valueKey: "about.info.open_to_work" },
    { emoji: "🌐", labelKey: "about.info.availability", valueKey: "about.info.remote_onsite" },
    { emoji: "⚡", labelKey: "about.info.focus", valueKey: "about.info.focus_value" },
];

// Rich text translations
const description1 = computed(() => t('about.description_1', {
    name: `<strong class="text-slate-200 font-semibold">Asadbek Umarov</strong>`,
    role: `<strong class="text-slate-200 font-semibold">Junior Frontend & Mobile Developer</strong>`,
    tech: `<strong class="text-slate-200 font-semibold">React, Next.js, React Native</strong>`
}));

const description2 = computed(() => t('about.description_2', {
    projects: `<strong class="text-slate-200 font-semibold">e-commerce platforms, dashboards, blog systems</strong>`,
    tools: `<strong class="text-slate-200 font-semibold">TypeScript, Tailwind CSS</strong>`,
    focus: `<strong class="text-slate-200 font-semibold">clean UI, responsive layouts, optimized performance</strong>`
}));

const description3 = computed(() => t('about.description_3', {
    roles: `<strong class="text-slate-200 font-semibold">Junior, Internship</strong>`,
    availability: `<strong class="text-slate-200 font-semibold">remote, on-site</strong>`
}));
</script>

<template>
    <section id="about" class="section-padding relative" aria-labelledby="about-heading">
        <!-- Top divider -->
        <div class="section-divider" aria-hidden="true" />


        <!-- Widened container — max-w-7xl breaks out of the narrow section-container -->
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <!-- Two-column grid, activates at md, generous gap that grows at xl -->
            <div class="grid md:grid-cols-2 gap-8 lg:gap-12 xl:gap-16 items-start">
                <!-- ══════════════════════════════════════
                     LEFT — Text Content
                ══════════════════════════════════════ -->
                <div class="w-full max-w-xl">
                    <span class="section-label mb-3 scroll-animate">
                        {{ t('about.label') }}
                    </span>

                    <h2 id="about-heading" class="section-title mt-2 mb-8 scroll-animate delay-100">
                        {{ t('about.title') }}
                        <span class="gradient-text">{{ t('about.title_accent') }}</span>
                    </h2>

                    <div class="space-y-5 leading-relaxed text-[0.9375rem] scroll-animate delay-200 text-slate-400/60">

                        <p v-html="description1"></p>

                        <p v-html="description2"></p>

                        <p v-html="description3"></p>

                    </div>

                    <!-- Quick Info Grid — single col on mobile, 2-col from sm -->
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-10 scroll-animate delay-300"
                        aria-label="Quick information">
                        <div v-for="item in quickInfo" :key="item.labelKey" class="glass-card flex items-center gap-4 p-4">
                            <span class="text-2xl flex-shrink-0 leading-none" aria-hidden="true">
                                {{ item.emoji }}
                            </span>
                            <div class="min-w-0">
                                <p class="text-xs font-medium mb-0.5 text-slate-400/40">
                                    {{ $t(item.labelKey) }}
                                </p>
                                <p class="text-sm font-semibold truncate text-slate-200">
                                    {{ $t(item.valueKey) }}
                                </p>
                            </div>
                        </div>
                    </div>


                </div>

                <!-- ══════════════════════════════════════
                     RIGHT — Visual Card Column
                ══════════════════════════════════════ -->
                <div class="w-full max-w-md mx-auto lg:mx-0 space-y-5 scroll-animate delay-150">
                    <!-- Identity / Avatar Card -->
                    <div class="glass-card relative overflow-hidden text-center border-sky-500/20 p-4">
                        <!-- Glow backdrop -->
                        <div class="absolute inset-0 pointer-events-none glow-backdrop" aria-hidden="true" />

                        <div class="relative z-10 flex justify-center">
                            <!-- Rasmga h-64 yoki h-80 kabi cheklov beramiz -->
                            <img
                                src="/user.jpg"
                                alt="Asadbek Umarov"
                                class="w-full h-72 object-cover rounded-xl shadow-md"
                            />
                        </div>
                    </div>

                    <!-- Stats Row — three equal columns -->
                    <div class="grid grid-cols-3 gap-3" aria-label="Professional stats">
                        <div v-for="stat in stats" :key="stat.labelKey" class="glass-card p-5 text-center">
                            <p class="text-2xl font-black gradient-text">
                                {{ stat.value }}
                            </p>
                            <p class="text-xs font-medium mt-1.5 leading-tight text-slate-400/40">
                                {{ $t(stat.labelKey) }}
                            </p>
                        </div>
                    </div>

                    <!-- LinkedIn Card Link -->
                    <a href="https://www.linkedin.com/in/asadbek-umarov-ab9385376" target="_blank"
                        rel="noopener noreferrer" class="glass-card flex items-center gap-4 p-5 group"
                        aria-label="View Asadbek's LinkedIn profile">
                        <!-- LinkedIn icon box — blue -->
                        <div class="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300 bg-sky-500/10 border border-sky-500/25 group-hover:bg-sky-500/20">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0284c7"
                                stroke-width="2" aria-hidden="true">
                                <path
                                    d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
                                <circle cx="4" cy="4" r="2" />
                            </svg>
                        </div>

                        <div class="flex-1 min-w-0">
                            <p class="text-sm font-semibold transition-colors duration-200 text-slate-200 group-hover:text-sky-500">
                                {{ $t('about.ctas.linkedin') }}
                            </p>
                            <p class="text-xs truncate mt-0.5 text-slate-400/40">
                                asadbek-umarov-ab9385376
                            </p>
                        </div>

                        <svg class="flex-shrink-0 transition-colors duration-200 text-slate-200/25" width="15" height="15" viewBox="0 0 24 24"
                            fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                            <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" />
                        </svg>
                    </a>

                    <!-- Portfolio Link -->
                    <a href="https://github.com/asadbekumarov" target="_blank" rel="noopener noreferrer"
                        class="glass-card flex items-center gap-4 p-5 group"
                        aria-label="View Asadbek's existing portfolio">
                        <!-- Globe icon box — teal -->
                        <div class="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300 bg-emerald-500/10 border border-emerald-500/25 group-hover:bg-emerald-500/20">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#047c58"
                                stroke-width="2" aria-hidden="true">
                                <circle cx="12" cy="12" r="10" />
                                <line x1="2" y1="12" x2="22" y2="12" />
                                <path
                                    d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
                            </svg>
                        </div>

                        <div class="flex-1 min-w-0">
                            <p class="text-sm font-semibold transition-colors duration-200 text-slate-200 group-hover:text-sky-500">
                                {{ $t('about.ctas.portfolio') }}
                            </p>
                            <p class="text-xs truncate mt-0.5 text-slate-400/40">
                                https://github.com/asadbekumarov
                            </p>
                        </div>

                        <svg class="flex-shrink-0 transition-colors duration-200 text-slate-200/25" width="15" height="15" viewBox="0 0 24 24"
                            fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                            <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" />
                        </svg>
                    </a>
                </div>
            </div>
        </div>
    </section>
</template>

<style scoped>
.glow-backdrop {
    background: radial-gradient(
        ellipse 80% 50% at 50% -10%,
        rgba(2, 132, 199, 0.16) 0%,
        transparent 70%
    );
}
.avatar-gradient {
    background: linear-gradient(
        135deg,
        #0284c7 0%,
        #047c58 100%
    );
}
</style>
