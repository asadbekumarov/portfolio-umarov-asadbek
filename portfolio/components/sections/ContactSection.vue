<script setup lang="ts">
import { contacts } from '~/data';
</script>

<template>
    <section
        id="contact"
        class="section-padding relative"
        aria-labelledby="contact-heading"
    >

        <!-- Bottom glow — teal for visual variety -->
        <div
            class="pointer-events-none absolute inset-0 contact-glow"
            aria-hidden="true"
        />

        <div class="section-container relative">
            <!-- ── Section Header ── -->
            <div class="text-center mb-10 sm:mb-14 px-2">
                <span class="section-label mb-3 scroll-animate">
                    {{ $t('contact.label') }}
                </span>

                <h2
                    id="contact-heading"
                    class="section-title mt-2 scroll-animate delay-100"
                >
                    {{ $t('contact.title') }} <span class="gradient-text">{{ $t('contact.title_accent') }}</span>
                </h2>

                <p
                    class="mt-4 max-w-lg mx-auto text-sm sm:text-base leading-relaxed scroll-animate delay-200 text-slate-400/45"
                >
                    {{ $t('contact.description') }}
                </p>
            </div>

            <!-- ── Contact Cards Grid ── -->
            <div class="max-w-3xl mx-auto">
                <div class="grid sm:grid-cols-2 gap-3 sm:gap-4 mb-8">
                    <a
                        v-for="(card, index) in contacts"
                        :key="card.icon"
                        :href="card.href"
                        :target="card.external ? '_blank' : undefined"
                        :rel="card.external ? 'noopener noreferrer' : undefined"
                        class="glass-card flex items-center gap-3 sm:gap-4 p-4 sm:p-5 group scroll-animate"
                        :style="`transition-delay: ${0.1 + index * 0.08}s;`"
                        :aria-label="`${$t(card.labelKey)}: ${card.value}`"
                    >
                        <!-- Icon box — blue accent -->
                        <div
                            class="w-11 h-11 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors duration-200 bg-sky-500/10 border border-sky-500/20"
                            aria-hidden="true"
                        >
                            <!-- Email -->
                            <svg
                                v-if="card.icon === 'email'"
                                width="18"
                                height="18"
                                class="sm:w-5 sm:h-5"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="#0284c7"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                            >
                                <path
                                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                />
                            </svg>

                            <!-- Phone -->
                            <svg
                                v-else-if="card.icon === 'phone'"
                                width="18"
                                height="18"
                                class="sm:w-5 sm:h-5"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="#0284c7"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                            >
                                <path
                                    d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.63A2 2 0 012 .18h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.41 8a16 16 0 006.59 6.59l1.18-1.34a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"
                                />
                            </svg>

                            <!-- LinkedIn -->
                            <svg
                                v-else-if="card.icon === 'linkedin'"
                                width="18"
                                height="18"
                                class="sm:w-5 sm:h-5"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="#0284c7"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                            >
                                <path
                                    d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"
                                />
                                <circle cx="4" cy="4" r="2" />
                            </svg>

                            <!-- Telegram -->
                            <svg
                                v-else-if="card.icon === 'telegram'"
                                width="18"
                                height="18"
                                class="sm:w-5 sm:h-5"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="#0284c7"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                            >
                                <path d="M21.5 2L2 9.5l7.5 3L18 6l-6 8.5L17.5 22z" />
                            </svg>
                        </div>

                        <!-- Text -->
                        <div class="flex-1 min-w-0">
                            <p
                                class="text-xs font-semibold mb-0.5 text-slate-400/40"
                            >
                                {{ $t(card.labelKey) }}
                            </p>
                            <p
                                class="text-sm font-semibold truncate transition-colors duration-200 text-slate-200 group-hover:text-sky-500"
                            >
                                {{ card.value }}
                            </p>
                        </div>

                        <!-- External link arrow -->
                        <svg
                            v-if="card.external"
                            class="flex-shrink-0 transition-colors duration-200 text-slate-400/20 group-hover:text-slate-200"
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            aria-hidden="true"
                        >
                            <path
                                d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3"
                            />
                        </svg>
                    </a>
                </div>

                <!-- ── Primary CTA ── -->
                <div class="text-center scroll-animate delay-400">
                    <!-- Decorative "or" divider -->
                    <div class="flex items-center gap-4 mb-8">
                        <div
                            class="flex-1 h-px bg-slate-200/5"
                            aria-hidden="true"
                        />
                        <span
                            class="text-xs font-semibold tracking-widest uppercase text-slate-400/20 whitespace-nowrap"
                        >
                            {{ $t('contact.divider_text') }}
                        </span>
                        <div
                            class="flex-1 h-px bg-slate-200/5"
                            aria-hidden="true"
                        />
                    </div>

                    <a
                        href="mailto:asadbekumarov922@gmail.com"
                        class="btn-primary w-full sm:w-auto justify-center py-3.5 px-6 sm:px-10 text-sm sm:text-base"
                    >
                        <svg
                            width="18"
                            height="18"
                            class="flex-shrink-0"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            aria-hidden="true"
                        >
                            <path
                                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                            />
                        </svg>
                        {{ $t('contact.cta_email') }}
                    </a>
                </div>
            </div>
        </div>
    </section>
</template>

<style scoped>
.contact-glow {
    background: radial-gradient(
        ellipse 65% 45% at 50% 105%,
        rgba(4, 124, 88, 0.08) 0%,
        transparent 68%
    );
}
</style>
