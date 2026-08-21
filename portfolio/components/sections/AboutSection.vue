<script setup lang="ts">
const { t } = useI18n()

import { stats, quickInfo } from '~/data';
import { MapPin, Briefcase, Clock, Target, Linkedin, Github, ExternalLink } from 'lucide-vue-next';

// Rich text translations
const description1 = computed(() =>
  t('about.description_1', {
    name: `<strong class="text-slate-200 font-semibold">Asadbek Umarov</strong>`,
    tech: `<strong class="text-slate-200 font-semibold">React, Next.js, React Native</strong>`,
  })
)

const description2 = computed(() =>
  t('about.description_2', {
    projects: `<strong class="text-slate-200 font-semibold">an e-commerce platform and a multi-service Telegram app</strong>`,
    tools: `<strong class="text-slate-200 font-semibold">TypeScript, Tailwind CSS, RTK Query</strong>`,
    focus: `<strong class="text-slate-200 font-semibold">clean architecture, responsive design, and real-world performance</strong>`,
  })
)

const description3 = computed(() =>
  t('about.description_3', {
    roles: `<strong class="text-slate-200 font-semibold">Internship, Entry-level</strong>`,
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
            class="space-y-5 leading-relaxed text-[0.9375rem] scroll-animate delay-200 text-slate-400/80"
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
                       transition-colors duration-200"
                aria-hidden="true"
              >
                <!-- Location -->
                <MapPin v-if="item.icon === 'location'" class="w-[18px] h-[18px] text-sky-400" :stroke-width="1.75" />

                <!-- Status -->
                <Briefcase v-else-if="item.icon === 'status'" class="w-[18px] h-[18px] text-sky-400" :stroke-width="1.75" />

                <!-- Availability -->
                <Clock v-else-if="item.icon === 'availability'" class="w-[18px] h-[18px] text-sky-400" :stroke-width="1.75" />

                <!-- Focus -->
                <Target v-else-if="item.icon === 'focus'" class="w-[18px] h-[18px] text-sky-400" :stroke-width="1.75" />
              </div>

              <div class="min-w-0">
                <p class="text-xs font-medium mb-0.5 text-slate-500">
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
            <div class="relative z-10 flex justify-center">
              <img
                src="/user.jpg"
                alt="Asadbek Umarov"
                class="w-full h-72 object-cover rounded-xl shadow-md"
                loading="lazy"
                width="400"
                height="288"
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
              <p class="text-2xl font-black gradient-text">
                {{ stat.value }}
              </p>
              <p class="text-xs font-medium mt-1.5 leading-tight text-slate-500">
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
                     transition-colors duration-200 bg-sky-500/10 border border-sky-500/25"
            >
              <Linkedin class="w-[18px] h-[18px] text-sky-500" :stroke-width="2" aria-hidden="true" />
            </div>

            <div class="flex-1 min-w-0">
              <p class="text-sm font-semibold transition-colors duration-200 text-slate-200 group-hover:text-sky-400/80">
                {{ t('about.ctas.linkedin') }}
              </p>
              <p class="text-xs truncate mt-0.5 text-slate-500">
                asadbek-umarov-ab9385376
              </p>
            </div>

            <ExternalLink
              class="w-[15px] h-[15px] flex-shrink-0 transition-colors duration-200 text-slate-200/25 group-hover:text-sky-400/50"
              :stroke-width="2"
              aria-hidden="true"
            />
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
                     transition-colors duration-200 bg-emerald-500/10 border border-emerald-500/25"
            >
              <Github class="w-[18px] h-[18px] text-emerald-500" :stroke-width="2" aria-hidden="true" />
            </div>

            <div class="flex-1 min-w-0">
              <p class="text-sm font-semibold transition-colors duration-200 text-slate-200 group-hover:text-emerald-400/80">
                {{ t('about.ctas.portfolio') }}
              </p>
              <p class="text-xs truncate mt-0.5 text-slate-500">
                github.com/asadbekumarov
              </p>
            </div>

            <ExternalLink
              class="w-[15px] h-[15px] flex-shrink-0 transition-colors duration-200 text-slate-200/25 group-hover:text-emerald-400/50"
              :stroke-width="2"
              aria-hidden="true"
            />
          </a>
        </div>
      </div>
    </div>
  </section>
</template>
