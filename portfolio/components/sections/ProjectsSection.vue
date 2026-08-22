<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { projects } from '~/data';

const scrollContainer = ref<HTMLElement | null>(null);
const isHovered = ref(false);
const isGridView = ref(false);
let animationFrameId: number;
let scrollPos = 0;

function autoScroll() {
    if (!scrollContainer.value || isGridView.value) {
        animationFrameId = requestAnimationFrame(autoScroll);
        return;
    }
    
    const el = scrollContainer.value;
    
    if (!isHovered.value) {
        scrollPos += 0.5; // continuous scrolling speed
        
        const maxScroll = el.scrollWidth - el.clientWidth;
        if (scrollPos >= maxScroll - 1) {
            scrollPos = 0;
            el.scrollLeft = 0;
        } else {
            el.scrollLeft = scrollPos;
        }
    } else {
        // synchronize scrollPos if user manually scrolled while hovering
        scrollPos = el.scrollLeft;
    }

    animationFrameId = requestAnimationFrame(autoScroll);
}

onMounted(() => {
    animationFrameId = requestAnimationFrame(autoScroll);
});

onUnmounted(() => {
    cancelAnimationFrame(animationFrameId);
});

const lightboxImage = ref<string | null>(null);
const lightboxTitle = ref<string>('');

function openLightbox(image: string, title: string) {
    lightboxImage.value = image;
    lightboxTitle.value = title;
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    lightboxImage.value = null;
    lightboxTitle.value = '';
    document.body.style.overflow = '';
}

function onKeydown(e: KeyboardEvent) {
    if (e.key === 'Escape') closeLightbox();
}
</script>

<template>
    <section
        id="projects"
        class="section-padding relative"
        aria-labelledby="projects-heading"
    >

        <div class="section-container relative">
            <!-- ── Section Header ── -->
            <div class="relative flex flex-col items-center justify-center mb-10 sm:mb-14">
                <div class="text-center px-2">
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

                <!-- Desktop View Toggle Button -->
                <button
                    class="absolute bottom-0 right-0 hidden sm:flex items-center gap-2 text-sm font-medium text-sky-400 hover:text-sky-300 transition-colors px-4 py-2 rounded-lg border border-sky-500/20 bg-sky-500/10 hover:bg-sky-500/20"
                    @click="isGridView = !isGridView"
                >
                    <span v-if="!isGridView">Barchasini ko'rish</span>
                    <span v-else>Qisqartirish</span>
                </button>
                
                <!-- Mobile View Toggle Button -->
                <button
                    class="mt-6 sm:hidden flex items-center justify-center w-full max-w-[200px] gap-2 text-sm font-medium text-sky-400 hover:text-sky-300 transition-colors px-4 py-2 rounded-lg border border-sky-500/20 bg-sky-500/10 hover:bg-sky-500/20"
                    @click="isGridView = !isGridView"
                >
                    <span v-if="!isGridView">Barchasini ko'rish</span>
                    <span v-else>Qisqartirish</span>
                </button>
            </div>
        </div>

        <!-- ── Project Cards ── -->
        <div :class="{ 'section-container': isGridView }">
            <div 
                ref="scrollContainer"
                :class="isGridView 
                    ? 'grid md:grid-cols-2 gap-5 sm:gap-6 pb-8'
                    : 'flex gap-5 sm:gap-6 overflow-x-auto pb-8 pt-2 hide-scrollbar scroll-bleed'"
            >
                <article
                    v-for="(project, index) in projects"
                    :key="project.key"
                    class="glass-card flex flex-col scroll-animate group overflow-hidden"
                    :class="isGridView ? '!opacity-100 !transform-none' : 'shrink-0 w-[90vw] sm:w-[480px] md:w-[520px] lg:w-[560px]'"
                    :style="`transition-delay: ${isGridView ? 0 : index * 0.1}s;`"
                    :aria-label="`Project: ${project.title}`"
                    @mouseenter="!isGridView && (isHovered = true)"
                    @mouseleave="!isGridView && (isHovered = false)"
                    @touchstart="!isGridView && (isHovered = true)"
                    @touchend="!isGridView && (isHovered = false)"
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

                                <!-- Preview Image Button -->
                                <button
                                    v-if="project.image"
                                    type="button"
                                    class="p-2.5 rounded-lg border border-violet-500/20 bg-violet-500/10 text-violet-400
                                           hover:bg-violet-500/20 hover:border-violet-500/40 transition-colors
                                           flex items-center justify-center flex-shrink-0"
                                    :aria-label="`Preview ${project.title} screenshot`"
                                    :title="`Preview ${project.title}`"
                                    @click="openLightbox(project.image as string, project.title)"
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
                                        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                                        <circle cx="8.5" cy="8.5" r="1.5" />
                                        <polyline points="21 15 16 10 5 21" />
                                    </svg>
                                </button>
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

    <!-- ── Lightbox Modal ── -->
    <Teleport to="body">
        <Transition name="lightbox">
            <div
                v-if="lightboxImage"
                class="lightbox-backdrop"
                role="dialog"
                aria-modal="true"
                :aria-label="`${lightboxTitle} preview`"
                @click.self="closeLightbox"
                @keydown="onKeydown"
                tabindex="-1"
            >
                <!-- Close button -->
                <button
                    type="button"
                    class="lightbox-close"
                    aria-label="Close preview"
                    @click="closeLightbox"
                >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                        <line x1="18" y1="6" x2="6" y2="18" />
                        <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                </button>

                <!-- Image container -->
                <div class="lightbox-inner" @click.stop>
                    <p class="lightbox-title">{{ lightboxTitle }}</p>
                    <img
                        :src="lightboxImage"
                        :alt="`${lightboxTitle} full preview`"
                        class="lightbox-img"
                    />
                </div>
            </div>
        </Transition>
    </Teleport>
</template>

<style scoped>
.scroll-bleed {
    width: 100%;
    padding-left: 1rem;
    padding-right: 1rem;
}
@media (min-width: 640px) {
    .scroll-bleed {
        padding-left: 1.5rem;
        padding-right: 1.5rem;
    }
}
@media (min-width: 1024px) {
    .scroll-bleed {
        padding-left: max(2rem, calc((100vw - 72rem) / 2 + 2rem));
        padding-right: max(2rem, calc((100vw - 72rem) / 2 + 2rem));
    }
}

.hide-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none;
}
.hide-scrollbar::-webkit-scrollbar {
    display: none;
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

/* ── Lightbox ── */
.lightbox-backdrop {
    position: fixed;
    inset: 0;
    z-index: 9999;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1rem;
    background: rgba(7, 12, 30, 0.92);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
}

.lightbox-close {
    position: fixed;
    top: 1.25rem;
    right: 1.25rem;
    z-index: 10000;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 9999px;
    background: rgba(255, 255, 255, 0.08);
    border: 1px solid rgba(255, 255, 255, 0.12);
    color: #cbd5e1;
    cursor: pointer;
    transition: background 0.2s, color 0.2s;
}
.lightbox-close:hover {
    background: rgba(255, 255, 255, 0.16);
    color: #fff;
}

.lightbox-inner {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.875rem;
    max-width: min(90vw, 1100px);
    max-height: 90vh;
}

.lightbox-title {
    font-size: 0.875rem;
    font-weight: 600;
    color: #94a3b8;
    letter-spacing: 0.04em;
}

.lightbox-img {
    display: block;
    max-width: 100%;
    max-height: calc(90vh - 3rem);
    width: auto;
    height: auto;
    border-radius: 0.875rem;
    box-shadow: 0 25px 60px rgba(0, 0, 0, 0.7), 0 0 0 1px rgba(255,255,255,0.06);
    object-fit: contain;
}

/* Transition */
.lightbox-enter-active,
.lightbox-leave-active {
    transition: opacity 0.22s ease, transform 0.22s ease;
}
.lightbox-enter-from,
.lightbox-leave-to {
    opacity: 0;
    transform: scale(0.96);
}
</style>

