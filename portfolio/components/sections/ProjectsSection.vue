<script setup lang="ts">
import { projects } from '~/data';
</script>

<template>
    <section
        id="projects"
        class="section-padding relative"
        aria-labelledby="projects-heading"
    >

        <div class="section-container relative">
            <!-- ── Section Header ── -->
            <div class="text-center mb-10 sm:mb-14 px-2">
                <span class="section-label mb-3 scroll-animate">{{ $t('projects.label') }}</span>

                <h2
                    id="projects-heading"
                    class="section-title mt-2 scroll-animate delay-100"
                >
                    {{ $t('projects.title') }} <span class="gradient-text">{{ $t('projects.title_accent') }}</span>
                </h2>

                <p
                    class="mt-4 max-w-xl mx-auto text-sm sm:text-base leading-relaxed scroll-animate delay-200 text-slate-400/70"
                >
                    {{ $t('projects.description') }}
                </p>
            </div>

            <!-- ── Project Cards Grid ── -->
            <div class="grid md:grid-cols-2 gap-5 sm:gap-6">
                <article
                    v-for="(project, index) in projects"
                    :key="project.key"
                    class="glass-card flex flex-col scroll-animate group overflow-hidden"
                    :style="`transition-delay: ${index * 0.1}s;`"
                    :aria-label="`Project: ${project.title}`"
                >
                    <!-- ── Project Preview Image ── -->
                    <div
                        v-if="project.image"
                        class="relative overflow-hidden rounded-t-2xl"
                    >
                        <img
                            :src="project.image"
                            :alt="`${project.title} preview`"
                            class="w-full h-44 sm:h-52 object-cover object-top
                                   transition-transform duration-500 group-hover:scale-105"
                            loading="lazy"
                            width="600"
                            height="340"
                            @error="(e: Event) => ((e.target as HTMLImageElement).style.display = 'none')"
                        />
                        <div
                            class="absolute inset-0 bg-gradient-to-t from-[#0d1529] via-transparent to-transparent"
                            aria-hidden="true"
                        />
                    </div>

                    <div
                        class="flex flex-col flex-1 p-5 sm:p-7 h-full"
                    >
                        <!-- ── Card Header ── -->
                        <div
                            class="flex flex-col xs:flex-row xs:items-start justify-between gap-3 xs:gap-4 mb-5"
                        >
                            <div class="flex-1 min-w-0">
                                <!-- Category badge -->
                                <div class="flex items-center gap-1.5 mb-2">
                                    <span class="text-sm" aria-hidden="true">
                                        {{ project.icon }}
                                    </span>
                                    <span
                                        class="text-xs font-semibold tracking-wider uppercase text-slate-400"
                                    >
                                        {{ $t(`projects.categories.${project.categoryKey}`) }}
                                    </span>
                                </div>

                                <!-- Title -->
                                <h3
                                    class="text-base sm:text-lg font-bold leading-tight mb-0.5 text-slate-200"
                                >
                                    {{ project.title }}
                                </h3>

                                <!-- Subtitle -->
                                <p
                                    class="text-sm font-medium text-slate-400"
                                >
                                    {{ $t(`projects.items.${project.key}.subtitle`) }}
                                </p>
                            </div>

                            <!-- Status chip & links -->
                            <div class="flex items-center gap-2 flex-shrink-0">
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
                                    class="p-2.5 rounded-lg border border-sky-500/20 bg-sky-500/10 text-sky-400
                                           hover:bg-sky-500/20 hover:border-sky-500/40 transition-colors
                                           flex items-center justify-center flex-shrink-0"
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
                                        aria-hidden="true"
                                    >
                                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                                        <polyline points="15 3 21 3 21 9" />
                                        <line x1="10" y1="14" x2="21" y2="3" />
                                    </svg>
                                </a>

                                <!-- GitHub Link Button -->
                                <a
                                    v-if="project.github"
                                    :href="project.github"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    class="p-2.5 rounded-lg border border-white/10 bg-white/5 text-slate-400
                                           hover:bg-white/10 hover:text-white transition-colors
                                           flex items-center justify-center flex-shrink-0"
                                    :aria-label="`View ${project.title} source code on GitHub`"
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
                                        aria-hidden="true"
                                    >
                                        <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                                        <path d="M9 18c-4.51 2-5-2-7-2" />
                                    </svg>
                                </a>
                            </div>
                        </div>

                        <!-- ── Description ── -->
                        <p
                            class="text-sm leading-relaxed mb-5 text-slate-400/80"
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
                                class="flex items-start gap-2.5 text-xs leading-relaxed text-slate-300"
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

/* xs breakpoint (420px) for card header layout */
@media (min-width: 420px) {
    .xs\:flex-row {
        flex-direction: row;
    }
    .xs\:items-start {
        align-items: flex-start;
    }
    .xs\:gap-4 {
        gap: 1rem;
    }
}
</style>
