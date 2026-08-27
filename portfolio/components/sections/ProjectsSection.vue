<script setup lang="ts">
import { ref, computed } from 'vue';
import { projects } from '~/data';

const showAll = ref(false);
const INITIAL_SHOW = 4;

const visibleProjects = computed(() =>
    showAll.value ? projects : projects.slice(0, INITIAL_SHOW)
);
const hasMore = computed(() => projects.length > INITIAL_SHOW);

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
        class="py-20 sm:py-28 relative bg-[#080c14]"
        aria-labelledby="projects-heading"
    >
        <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <!-- ── Section Header ── -->
            <div class="text-center mb-12 sm:mb-16">
                <span class="text-xs font-bold tracking-widest uppercase text-blue-500 mb-3 block">
                    {{ $t('projects.label') }}
                </span>
                <h2
                    id="projects-heading"
                    class="text-3xl sm:text-4xl md:text-5xl font-bold text-white mt-2"
                    style="font-family: 'Space Grotesk', sans-serif;"
                >
                    {{ $t('projects.title') }} <span class="text-blue-500">{{ $t('projects.title_accent') }}</span>
                </h2>
                <p
                    class="mt-4 max-w-xl mx-auto text-sm sm:text-base leading-relaxed text-slate-400"
                >
                    {{ $t('projects.description') }}
                </p>
            </div>

            <!-- ── Bento Grid ── -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <article
                    v-for="project in visibleProjects"
                    :key="project.key"
                    class="flex flex-col bg-[#0d1522] rounded-2xl border border-[#1e293b] p-6 hover:border-slate-600 transition-colors duration-300 group"
                >
                    <!-- Top Row: Category & Status -->
                    <div class="flex items-center justify-between gap-4 mb-4">
                        <span class="text-xs font-bold tracking-wider uppercase text-slate-400">
                            {{ $t(`projects.categories.${project.categoryKey}`) }}
                        </span>
                        
                        <!-- Status Badge -->
                        <div 
                            class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-semibold tracking-wide uppercase border"
                            :class="
                                project.statusKey.includes('development')
                                ? 'bg-amber-500/10 text-amber-500 border-amber-500/20'
                                : 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20'
                            "
                        >
                            <span 
                                class="w-1.5 h-1.5 rounded-full animate-pulse"
                                :class="
                                    project.statusKey.includes('development')
                                    ? 'bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.8)]'
                                    : 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]'
                                "
                            ></span>
                            {{ $t(project.statusKey) }}
                        </div>
                    </div>

                    <!-- Title -->
                    <h3 class="text-xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">
                        {{ project.title }}
                    </h3>

                    <!-- Description -->
                    <p class="text-sm text-slate-400 leading-relaxed line-clamp-3 mb-6 flex-1">
                        {{ $t(`projects.items.${project.key}.description`) }}
                    </p>

                    <!-- Tech Stack Pills -->
                    <div class="flex flex-wrap gap-2 mb-6">
                        <span
                            v-for="tech in project.technologies"
                            :key="tech"
                            class="bg-slate-800/70 text-slate-300 border border-slate-700/60 rounded-lg px-2.5 py-1 text-xs font-medium"
                        >
                            {{ tech }}
                        </span>
                    </div>

                    <!-- Footer Actions -->
                    <div class="flex items-center gap-3 mt-auto">
                        <a
                            v-if="project.link"
                            :href="project.link"
                            target="_blank"
                            rel="noopener noreferrer"
                            class="flex-1 bg-blue-600 hover:bg-blue-500 text-white rounded-xl py-2.5 px-4 text-center text-sm font-semibold transition-colors flex items-center justify-center gap-2"
                        >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                            {{ $t('projects.actions.preview') }}
                        </a>
                        <button
                            v-else-if="project.image"
                            @click="openLightbox(project.image as string, project.title)"
                            class="flex-1 bg-blue-600 hover:bg-blue-500 text-white rounded-xl py-2.5 px-4 text-center text-sm font-semibold transition-colors flex items-center justify-center gap-2"
                        >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2" /><circle cx="8.5" cy="8.5" r="1.5" /><polyline points="21 15 16 10 5 21" /></svg>
                            {{ $t('projects.actions.screenshot') }}
                        </button>
                        <a
                            v-if="project.github"
                            :href="project.github"
                            target="_blank"
                            rel="noopener noreferrer"
                            class="border border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white rounded-xl px-5 py-2.5 text-sm font-semibold transition-colors flex items-center justify-center gap-2"
                            :class="{ 'flex-1': !project.link }"
                        >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
                            {{ $t('projects.actions.github') }}
                        </a>
                    </div>
                </article>
            </div>

            <!-- ── View All / Show Less Toggle ── -->
            <div
                v-if="hasMore"
                class="flex justify-center mt-10"
            >
                <button
                    class="inline-flex items-center gap-2 px-6 py-2.5 text-sm font-semibold text-blue-400 bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/20 rounded-full transition-all"
                    @click="showAll = !showAll"
                >
                    <span>{{ showAll ? $t('projects.show_less') : $t('projects.view_all') }}</span>
                    <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        class="transition-transform duration-300"
                        :class="{ 'rotate-180': showAll }"
                    >
                        <polyline points="6 9 12 15 18 9"/>
                    </svg>
                </button>
            </div>
        </div>

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
    </section>
</template>

<style scoped>
@keyframes glow {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.6; }
}
.bg-amber-500 {
    animation: glow 2s ease-in-out infinite;
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
