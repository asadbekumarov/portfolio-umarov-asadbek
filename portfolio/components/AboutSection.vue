<script setup lang="ts">
const { t } = useI18n()

interface StatItem {
  value: string
  labelKey: string
}

interface InfoItem {
  icon: 'location' | 'status' | 'availability' | 'focus'
  labelKey: string
  valueKey: string
}

const stats: StatItem[] = [
  { value: '4+', labelKey: 'about.stats.projects' },
  { value: '1+', labelKey: 'about.stats.experience' },
  { value: '100%', labelKey: 'about.stats.remote' },
]

const quickInfo: InfoItem[] = [
  {
    icon: 'location',
    labelKey: 'about.info.location',
    valueKey: 'hero.location',
  },
  {
    icon: 'status',
    labelKey: 'about.info.status',
    valueKey: 'about.info.open_to_work',
  },
  {
    icon: 'availability',
    labelKey: 'about.info.availability',
    valueKey: 'about.info.remote_onsite',
  },
  {
    icon: 'focus',
    labelKey: 'about.info.focus',
    valueKey: 'about.info.focus_value',
  },
]

// Rich text translations
const description1 = computed(() =>
  t('about.description_1', {
    name: `<strong class="text-slate-200 font-semibold">Asadbek Umarov</strong>`,
    role: `<strong class="text-slate-200 font-semibold">Junior Frontend & Mobile Developer</strong>`,
    tech: `<strong class="text-slate-200 font-semibold">React, Next.js, React Native</strong>`,
  })
)

const description2 = computed(() =>
  t('about.description_2', {
    projects: `<strong class="text-slate-200 font-semibold">e-commerce platforms, dashboards, blog systems</strong>`,
    tools: `<strong class="text-slate-200 font-semibold">TypeScript, Tailwind CSS</strong>`,
    focus: `<strong class="text-slate-200 font-semibold">clean UI, responsive layouts, optimized performance</strong>`,
  })
)

const description3 = computed(() =>
  t('about.description_3', {
    roles: `<strong class="text-slate-200 font-semibold">Junior, Internship</strong>`,
    availability: `<strong class="text-slate-200 font-semibold">remote, on-site</strong>`,
  })
)
</script>

<template>
  <section
    id="about"
    class="section-padding relative"
    aria-labelledby="about-heading"
  >
    <!-- Top divider -->
    <div class="section-divider" aria-hidden="true" />

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid md:grid-cols-2 gap-8 lg:gap-12 xl:gap-16 items-start">
        <!-- ══════════════════════════════════════
             LEFT — Text Content
        ══════════════════════════════════════ -->
        <div class="w-full max-w-xl">
          <span class="section-label mb-3 scroll-animate">
            {{ t('about.label') }}
          </span>

          <h2
            id="about-heading"
            class="section-title mt-2 mb-8 scroll-animate delay-100"
          >
            {{ t('about.title') }}
            <span class="gradient-text">{{ t('about.title_accent') }}</span>
          </h2>

          <div
            class="space-y-5 leading-relaxed text-[0.9375rem] scroll-animate delay-200 text-slate-400/60"
          >
            <p v-html="description1"></p>
            <p v-html="description2"></p>
            <p v-html="description3"></p>
          </div>

          <!-- Quick Info Grid -->
          <div
            class="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-10 scroll-animate delay-300"
            aria-label="Quick information"
          >
            <div
              v-for="item in quickInfo"
              :key="item.labelKey"
              class="glass-card flex items-center gap-3.5 p-4 group"
            >
              <!-- Premium icon box -->
              <div
                class="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0
                       bg-sky-500/10 border border-sky-500/20 text-sky-400
                       transition-all duration-300 group-hover:bg-sky-500/15 group-hover:border-sky-500/35 group-hover:text-sky-300"
                aria-hidden="true"
              >
                <!-- Location -->
                <svg
                  v-if="item.icon === 'location'"
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.75"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>

                <!-- Status -->
                <svg
                  v-else-if="item.icon === 'status'"
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.75"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <rect width="20" height="14" x="2" y="7" rx="2" ry="2" />
                  <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                </svg>

                <!-- Availability -->
                <svg
                  v-else-if="item.icon === 'availability'"
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.75"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
                  <path d="M2 12h20" />
                </svg>

                <!-- Focus -->
                <svg
                  v-else-if="item.icon === 'focus'"
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.75"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z" />
                </svg>
              </div>

              <div class="min-w-0">
                <p class="text-xs font-medium mb-0.5 text-slate-400/40">
                  {{ t(item.labelKey) }}
                </p>
                <p class="text-sm font-semibold truncate text-slate-200">
                  {{ t(item.valueKey) }}
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
            <div
              class="absolute inset-0 pointer-events-none glow-backdrop"
              aria-hidden="true"
            />
            <div class="relative z-10 flex justify-center">
              <img
                src="/user.jpg"
                alt="Asadbek Umarov"
                class="w-full h-72 object-cover rounded-xl shadow-md"
              />
            </div>
          </div>

          <!-- Stats Row -->
          <div class="grid grid-cols-3 gap-3" aria-label="Professional stats">
            <div
              v-for="stat in stats"
              :key="stat.labelKey"
              class="glass-card p-5 text-center group"
            >
              <p
                class="text-2xl font-black gradient-text transition-transform duration-300 group-hover:scale-105"
              >
                {{ stat.value }}
              </p>
              <p
                class="text-xs font-medium mt-1.5 leading-tight text-slate-400/40"
              >
                {{ t(stat.labelKey) }}
              </p>
            </div>
          </div>

          <!-- LinkedIn Card -->
          <a
            href="https://www.linkedin.com/in/asadbek-umarov-ab9385376"
            target="_blank"
            rel="noopener noreferrer"
            class="glass-card flex items-center gap-4 p-5 group"
            aria-label="View Asadbek's LinkedIn profile"
          >
            <div
              class="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0
                     transition-all duration-300 bg-sky-500/10 border border-sky-500/25
                     group-hover:bg-sky-500/20 group-hover:border-sky-500/40"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#0284c7"
                stroke-width="2"
                aria-hidden="true"
              >
                <path
                  d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"
                />
                <circle cx="4" cy="4" r="2" />
              </svg>
            </div>

            <div class="flex-1 min-w-0">
              <p
                class="text-sm font-semibold transition-colors duration-200 text-slate-200 group-hover:text-sky-400"
              >
                {{ t('about.ctas.linkedin') }}
              </p>
              <p class="text-xs truncate mt-0.5 text-slate-400/40">
                asadbek-umarov-ab9385376
              </p>
            </div>

            <svg
              class="flex-shrink-0 transition-all duration-200 text-slate-200/25 group-hover:text-sky-400/60 group-hover:translate-x-0.5"
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              aria-hidden="true"
            >
              <path
                d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3"
              />
            </svg>
          </a>

          <!-- GitHub Card -->
          <a
            href="https://github.com/asadbekumarov"
            target="_blank"
            rel="noopener noreferrer"
            class="glass-card flex items-center gap-4 p-5 group"
            aria-label="View Asadbek's GitHub profile"
          >
            <div
              class="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0
                     transition-all duration-300 bg-emerald-500/10 border border-emerald-500/25
                     group-hover:bg-emerald-500/20 group-hover:border-emerald-500/40"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#10b981"
                stroke-width="2"
                aria-hidden="true"
              >
                <path
                  d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"
                />
                <path d="M9 18c-4.51 2-5-2-7-2" />
              </svg>
            </div>

            <div class="flex-1 min-w-0">
              <p
                class="text-sm font-semibold transition-colors duration-200 text-slate-200 group-hover:text-emerald-400"
              >
                {{ t('about.ctas.portfolio') }}
              </p>
              <p class="text-xs truncate mt-0.5 text-slate-400/40">
                github.com/asadbekumarov
              </p>
            </div>

            <svg
              class="flex-shrink-0 transition-all duration-200 text-slate-200/25 group-hover:text-emerald-400/60 group-hover:translate-x-0.5"
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              aria-hidden="true"
            >
              <path
                d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3"
              />
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
</style>
