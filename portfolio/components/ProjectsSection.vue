<script setup lang="ts">
interface Project {
    key: string;
    title: string;
    categoryKey: string;
    icon: string;
    statusKey: string;
    link?: string;
    highlightCount: number;
    technologies: string[];
}

const projects: Project[] = [
    {
        key: "smart_life",
        title: "Smart Life",
        categoryKey: "E-commerce",
        icon: "📱",
        link: "https://www.smartlife.uz/uz",
        statusKey: "projects.status.completed",
        highlightCount: 3,
        technologies: ["Next.js", "TypeScript", "Tailwind CSS", "RTK Query"],
    },
    {
        key: "darrow",
        title: "Darrow",
        categoryKey: "telegram_app",
        icon: "✈️",
        link: "https://t.me/darrov_bot", // Darrow uchun demo link
        statusKey: "projects.status.completed",
        highlightCount: 3,
        technologies: ["React.js", "TypeScript", "Tailwind CSS", "Telegram API"],
    },
];
</script>

<template>
    <section
        id="projects"
        class="section-padding relative"
        aria-labelledby="projects-heading"
    >
        <!-- Top divider -->
        <div class="section-divider" aria-hidden="true" />

        <!-- Subtle teal glow at bottom -->
        <div
            class="pointer-events-none absolute inset-0 projects-glow"
            aria-hidden="true"
        />

        <div class="section-container relative">
            <!-- ── Section Header ── -->
            <div class="text-center mb-14">
                <span class="section-label mb-3 scroll-animate">{{ $t('projects.label') }}</span>

                <h2
                    id="projects-heading"
                    class="section-title mt-2 scroll-animate delay-100"
                >
                    {{ $t('projects.title') }} <span class="gradient-text">{{ $t('projects.title_accent') }}</span>
                </h2>

                <p
                    class="mt-4 max-w-xl mx-auto text-base leading-relaxed scroll-animate delay-200 text-slate-400/45"
                >
                    {{ $t('projects.description') }}
                </p>
            </div>

            <!-- ── Project Cards Grid ── -->
            <div class="grid sm:grid-cols-2 gap-6">
                <article
                    v-for="(project, index) in projects"
                    :key="project.key"
                    class="glass-card flex flex-col scroll-animate group"
                    :style="`transition-delay: ${index * 0.1}s;`"
                    :aria-label="`Project: ${project.title}`"
                >
                    <div
                        class="flex flex-col flex-1 p-7 rounded-2xl transition-transform duration-300 group-hover:-translate-y-1 h-full"
                    >
                        <!-- ── Card Header ── -->
                        <div
                            class="flex items-start justify-between gap-4 mb-5"
                        >
                            <div class="flex-1 min-w-0">
                                <!-- Category badge -->
                                <div class="flex items-center gap-1.5 mb-2">
                                    <span class="text-sm" aria-hidden="true">
                                        {{ project.icon }}
                                    </span>
                                    <span
                                        class="text-xs font-semibold tracking-wider uppercase text-slate-400/35"
                                    >
                                        {{ $t(`projects.categories.${project.categoryKey}`) }}
                                    </span>
                                </div>

                                <!-- Title -->
                                <h3
                                    class="text-lg font-bold leading-tight mb-0.5 text-slate-200"
                                >
                                    {{ project.title }}
                                </h3>

                                <!-- Subtitle -->
                                <p
                                    class="text-sm font-medium text-slate-400/45"
                                >
                                    {{ $t(`projects.items.${project.key}.subtitle`) }}
                                </p>
                            </div>

                            <!-- Status chip & External Link -->
                            <div class="flex items-center gap-2">
                                <!-- Status badge -->
                                <span
                                    class="text-xs font-semibold px-2.5 py-1 rounded-full border flex-shrink-0 whitespace-nowrap"
                                    :class="project.statusKey.includes('development') ? 'status-dev' : 'status-completed'"
                                    :aria-label="`Status: ${$t(project.statusKey)}`"
                                >
                                    {{ $t(project.statusKey) }}
                                </span>

                                <!-- Demo Link Button -->
                                <a
                                    v-if="project.link"
                                    :href="project.link"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    class="p-1.5 rounded-lg border border-sky-500/20 bg-sky-500/10 text-sky-400 hover:bg-sky-500/20 hover:border-sky-500/40 transition-colors flex items-center justify-center flex-shrink-0"
                                    :title="`Open ${project.title}`"
                                    :aria-label="`Visit ${project.title} website`"
                                >
                                    <svg
                                        width="15"
                                        height="15"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        stroke-width="2"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                    >
                                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                                        <polyline points="15 3 21 3 21 9" />
                                        <line x1="10" y1="14" x2="21" y2="3" />
                                    </svg>
                                </a>
                            </div>
                        </div>

                        <!-- ── Description ── -->
                        <p
                            class="text-sm leading-relaxed mb-5 text-slate-400/55"
                        >
                            {{ $t(`projects.items.${project.key}.description`) }}
                        </p>

                        <!-- ── Highlights ── -->
                        <ul
                            class="space-y-2.5 mb-6 flex-1"
                            aria-label="Key highlights"
                        >
                            <li
                                v-for="i in project.highlightCount"
                                :key="i"
                                class="flex items-start gap-2.5 text-xs leading-relaxed text-slate-200/70"
                            >
                                <!-- Bullet dot — blue accent -->
                                <span
                                    class="flex-shrink-0 mt-1.5 w-1.5 h-1.5 rounded-full bg-sky-600/70"
                                    aria-hidden="true"
                                />
                                {{ $t(`projects.items.${project.key}.highlights.${i - 1}`) }}
                            </li>
                        </ul>

                        <!-- ── Divider ── -->
                        <div
                            class="h-px w-full mb-4 bg-sky-500/10"
                            aria-hidden="true"
                        />

                        <!-- ── Tech Stack ── -->
                        <div
                            class="flex flex-wrap gap-1.5"
                            aria-label="Technologies used"
                        >
                            <span
                                v-for="tech in project.technologies"
                                :key="tech"
                                class="tag-pill"
                            >
                                {{ tech }}
                            </span>
                        </div>
                    </div>
                </article>
            </div>
        </div>
    </section>
</template>

<style scoped>
.projects-glow {
    background: radial-gradient(
        ellipse 70% 40% at 50% 100%,
        rgba(4, 124, 88, 0.06) 0%,
        transparent 70%
    );
}
.status-dev {
    color: rgba(226, 232, 240, 0.88);
    background: rgba(4, 124, 88, 0.1);
    border-color: rgba(4, 124, 88, 0.28);
}
.status-completed {
    color: rgba(226, 232, 240, 0.88);
    background: rgba(2, 132, 199, 0.1);
    border-color: rgba(2, 132, 199, 0.28);
}
</style>
