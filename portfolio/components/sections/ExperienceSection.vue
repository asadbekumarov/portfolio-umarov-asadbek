<script setup lang="ts">
import { experiences } from '~/data';
</script>

<template>
  <section
    id="experience"
    class="section-padding relative overflow-hidden py-12 sm:py-20"
    aria-labelledby="experience-heading"
  >

    <div
      class="pointer-events-none absolute inset-0 experience-glow opacity-80"
      aria-hidden="true"
    />

    <div class="section-container relative z-10 mx-auto max-w-5xl px-4 sm:px-6">
      <!-- ── Section Header ── -->
      <div class="text-center mb-12 sm:mb-16">
        <span class="section-label mb-3 inline-block text-xs sm:text-sm font-semibold tracking-wider text-[#0145f2] uppercase scroll-animate">
          {{ $t('experience.label') }}
        </span>
        <h2
          id="experience-heading"
          class="section-title text-2xl sm:text-4xl font-extrabold text-slate-100 scroll-animate delay-100"
        >
          {{ $t('experience.title') }}
          <span class="text-[#0145f2]">
            {{ $t('experience.title_accent') }}
          </span>
        </h2>
        <p
          class="mt-3 sm:mt-4 max-w-xl mx-auto text-sm sm:text-base leading-relaxed scroll-animate delay-200 text-slate-400"
        >
          {{ $t('experience.description') }}
        </p>
      </div>

      <!-- ── Timeline ── -->
      <div class="max-w-3xl mx-auto">
        <div
          v-for="(exp, index) in experiences"
          :key="exp.key + index"
          class="relative pb-8 sm:pb-12 last:pb-0 scroll-animate delay-200"
        >

          <!-- ── Card ── -->
          <div
            class="glass-card p-5 sm:p-7 md:p-8 rounded-2xl bg-slate-900/40 border border-slate-800/80 backdrop-blur-sm transition-colors duration-200"
          >
            <!-- Card header -->
            <div
              class="flex flex-col sm:flex-row sm:items-start justify-between gap-3 sm:gap-4 mb-4 sm:mb-5"
            >
              <div>
                <!-- Role -->
                <div class="flex flex-wrap items-center gap-2 mb-1.5">
                  <h3 class="text-base sm:text-lg font-bold text-slate-200">
                    {{ $t(`experience.items.${exp.key}.role`) }}
                  </h3>
                </div>

                <!-- Company · Type · Location -->
                <div
                  class="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs sm:text-sm"
                >
                  <span class="font-semibold text-sky-400">
                    {{ $t(`experience.items.${exp.key}.company`) }}
                  </span>
                  <span class="text-slate-600">·</span>
                  <span class="text-slate-400">
                    {{ $t(`experience.items.${exp.key}.type`) }}
                  </span>
                  <span class="text-slate-600">·</span>
                  <span class="text-slate-400">
                    {{ $t(`experience.items.${exp.key}.location`) }}
                  </span>
                </div>
              </div>

              <!-- Period badge -->
              <div class="self-start sm:self-auto flex-shrink-0">
                <span
                  class="inline-block text-xs font-semibold px-3 py-1.5 rounded-lg bg-[#0d2138]/80 border border-sky-500/20 text-slate-300 whitespace-nowrap"
                >
                  {{ exp.periodStart }} — {{ exp.current ? $t('experience.current') : exp.periodEnd }}
                </span>
              </div>
            </div>

            <!-- Horizontal divider -->
            <div
              class="w-full h-px mb-4 sm:mb-5 bg-sky-500/10"
              aria-hidden="true"
            />

            <!-- Description -->
            <p class="text-xs sm:text-sm leading-relaxed mb-4 sm:mb-5 text-slate-400">
              {{ $t(`experience.items.${exp.key}.description`) }}
            </p>

            <!-- Achievements list -->
            <ul
              class="space-y-2 sm:space-y-2.5"
              aria-label="Key achievements"
            >
              <li
                v-for="i in exp.achievementCount"
                :key="i"
                class="flex items-start gap-2.5 sm:gap-3 text-xs sm:text-sm text-slate-300"
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
                <span>{{ $t(`experience.items.${exp.key}.achievements.${i - 1}`) }}</span>
              </li>
            </ul>
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
    rgba(2, 132, 199, 0.08) 0%,
    transparent 70%
  );
}
</style>
