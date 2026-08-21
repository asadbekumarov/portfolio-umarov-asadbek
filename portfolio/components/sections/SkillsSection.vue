<script setup lang="ts">
import { skillCategories } from '~/data';
</script>

<template>
  <section
    id="skills"
    class="section-padding relative overflow-hidden"
    aria-labelledby="skills-heading"
  >



    <div class="section-container relative">
      <!-- Header -->
      <div class="text-center mb-10 sm:mb-14">
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
          class="mt-4 max-w-xl mx-auto text-sm sm:text-base leading-relaxed scroll-animate delay-200 text-slate-400/70 px-2"
        >
          {{ $t('skills.description') }}
        </p>
      </div>

      <!-- Skills Grid -->
      <div
        class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5"
        role="list"
        aria-label="Skill categories"
      >
        <div
          v-for="(cat, index) in skillCategories"
          :key="cat.categoryKey"
          class="glass-card p-5 sm:p-6 group scroll-animate flex flex-col h-full"
          :style="`transition-delay: ${0.05 + index * 0.07}s;`"
          role="listitem"
        >
          <!-- Card header -->
          <div class="flex items-start gap-3 mb-4">
            <!-- Premium icon box -->
            <div
              class="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0
                     bg-sky-500/10 border border-sky-500/20 text-sky-400
                     transition-colors duration-200"
              aria-hidden="true"
            >
              <!-- Core -->
              <svg v-if="cat.icon === 'core'" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" />
              </svg>

              <!-- Frameworks -->
              <svg v-else-if="cat.icon === 'frameworks'" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">
                <polygon points="12 2 2 7 12 12 22 7 12 2" /><polyline points="2 17 12 22 22 17" /><polyline points="2 12 12 17 22 12" />
              </svg>

              <!-- Styling -->
              <svg v-else-if="cat.icon === 'styling'" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="13.5" cy="6.5" r=".5" fill="currentColor" /><circle cx="17.5" cy="10.5" r=".5" fill="currentColor" /><circle cx="8.5" cy="7.5" r=".5" fill="currentColor" /><circle cx="6.5" cy="12.5" r=".5" fill="currentColor" />
                <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z" />
              </svg>

              <!-- State -->
              <svg v-else-if="cat.icon === 'state'" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">
                <ellipse cx="12" cy="5" rx="9" ry="3" /><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" /><path d="M3 12c0 1.66 4 3 9 3s9-1.34 9-3" />
              </svg>

              <!-- Tools -->
              <svg v-else-if="cat.icon === 'tools'" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">
                <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
              </svg>

              <!-- Soft -->
              <svg v-else-if="cat.icon === 'soft'" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">
                <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" /><path d="M19 3v4" /><path d="M21 5h-4" />
              </svg>
            </div>

            <div class="min-w-0">
              <h3 class="text-sm font-semibold leading-tight text-slate-200">
                {{ $t(`${cat.categoryKey}.title`) }}
              </h3>
              <p class="text-xs mt-0.5 text-slate-500 leading-snug">
                {{ $t(`${cat.categoryKey}.description`) }}
              </p>
            </div>
          </div>

          <!-- Divider -->
          <div
            class="h-px w-full mb-4 bg-gradient-to-r from-sky-500/15 via-sky-500/10 to-transparent"
            aria-hidden="true"
          />

          <!-- Skill pills -->
          <div
            class="flex flex-wrap gap-2 mt-auto"
            role="list"
            :aria-label="`${$t(`${cat.categoryKey}.title`)} skills`"
          >
            <span
              v-for="skill in cat.skills"
              :key="skill.name"
              class="tag-pill inline-flex items-center gap-1.5
                     transition-colors duration-200"
              role="listitem"
            >
              <img
                v-if="!skill.isEmoji"
                :src="skill.icon"
                :alt="skill.name"
                class="w-3.5 h-3.5 object-contain flex-shrink-0"
                loading="lazy"
              />
              <span
                v-else
                class="text-[13px] leading-none flex-shrink-0"
                aria-hidden="true"
              >
                {{ skill.icon }}
              </span>
              <span>{{ skill.name }}</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>

@media (max-width: 380px) {
  .tag-pill {
    font-size: 0.7rem;
    padding: 0.25rem 0.55rem;
  }
}
</style>
