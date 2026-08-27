<script setup lang="ts">
const { t } = useI18n()
import { MapPin, Briefcase, Clock, Code2, Linkedin, Github } from 'lucide-vue-next'

const techBadges = [
  { name: 'React.js',     color: '#61dafb' },
  { name: 'Next.js',      color: '#ffffff' },
  { name: 'TypeScript',   color: '#3178c6' },
  { name: 'Tailwind CSS', color: '#38bdf8' },
  { name: 'RTK Query',    color: '#a78bfa' },
]

const bentoStats = [
  { value: '1+',   labelUz: 'Yillik tajriba',        suffix: '' },
  { value: '5K+',  labelUz: 'Tranzaksiya', suffix: '' },
  { value: '100%', labelUz: 'Clean code', suffix: '' },
]

const quickInfoItems = [
  { icon: 'location',     labelUz: 'Joylashuv',    valueUz: "Toshkent, UZ" },
  { icon: 'status',       labelUz: 'Holat',         valueUz: 'Ishga tayyor' },
  { icon: 'availability', labelUz: 'Format',   valueUz: 'Masofaviy / Ofis' },
  { icon: 'focus',        labelUz: "Yo'nalish",     valueUz: 'Frontend' },
]
</script>

<template>
  <section
    id="about"
    class="py-20 sm:py-28 relative bg-[#080c14]"
    aria-labelledby="about-heading"
  >
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">

      <!-- Section Title for Mobile (Hidden on Desktop where it's in the Bio card) -->
      <div class="md:hidden mb-8 text-center">
        <span class="text-xs font-bold tracking-widest uppercase text-blue-500 mb-3 block">
          {{ t('about.label') }}
        </span>
        <h2 id="about-heading" class="text-3xl font-bold text-white mt-2" style="font-family: 'Space Grotesk', sans-serif;">
          {{ t('about.title') }}
          <span class="text-blue-500"> {{ t('about.title_accent') }}</span>
        </h2>
      </div>

      <!-- Bento Grid Layout -->
      <div class="grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-6 auto-rows-[minmax(0,auto)]">
        
        <!-- 1. Photo Card (Tall, Spans 2 Rows on Desktop) -->
        <div class="md:col-span-5 lg:col-span-4 md:row-span-2 relative overflow-hidden rounded-[2rem] border border-[#1e293b] bg-[#0d1522] group h-64 md:h-full min-h-[300px] shadow-lg shadow-black/20">
          <img
            src="/user.jpg"
            alt="Asadbek Umarov"
            class="absolute inset-0 w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
            loading="lazy"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-[#080c14]/90 via-[#080c14]/20 to-transparent pointer-events-none"></div>
          <div class="absolute bottom-0 left-0 p-6 sm:p-8 w-full z-10">
            <h3 class="text-2xl sm:text-3xl font-bold text-white mb-1.5" style="font-family: 'Space Grotesk', sans-serif;">Asadbek Umarov</h3>
            <p class="text-blue-400 font-semibold tracking-wide text-sm uppercase">Frontend Developer</p>
          </div>
        </div>

        <!-- 2. Bio Card (Wide) -->
        <div class="md:col-span-7 lg:col-span-8 p-6 sm:p-8 lg:p-10 rounded-[2rem] border border-[#1e293b] bg-[#0d1522] hover:border-slate-700 transition-colors shadow-lg shadow-black/20 flex flex-col justify-center">
          <div class="hidden md:block mb-6">
            <span class="text-xs font-bold tracking-widest uppercase text-blue-500 mb-2 block">
              {{ t('about.label') }}
            </span>
            <h2 class="text-3xl lg:text-4xl font-bold text-white" style="font-family: 'Space Grotesk', sans-serif;">
              {{ t('about.title') }} <span class="text-blue-500">{{ t('about.title_accent') }}</span>
            </h2>
          </div>
          
          <p class="text-lg sm:text-xl font-medium text-slate-200 leading-relaxed mb-5">
            Dasturlashga bo'lgan ishtiyoqim real muammolarni hal qiluvchi, tezkor va qulay interfeyslar yaratishga qaratilgan.
          </p>
          <p class="text-sm sm:text-base text-slate-400 leading-relaxed">
            <strong class="text-white font-semibold">React.js, Next.js</strong> va <strong class="text-white font-semibold">TypeScript</strong> yordamida ishlab chiqarishga tayyor ilovalar quraman. 
            Haqiqiy foydalanuvchilarga xizmat qiluvchi <strong class="text-white font-semibold">e-commerce platforma</strong> va <strong class="text-white font-semibold">5 000+ buyurtmani</strong> qayta ishlagan multi-xizmat Telegram WebApp ilovasini yaratdim. 
            Asosiy e'tiborim toza arxitektura, moslashuvchan dizayn va yuqori ishlash unumdorligiga qaratiladi.
          </p>
        </div>

        <!-- 3. Stats Card (Wide) -->
        <div class="md:col-span-7 lg:col-span-8 p-6 sm:p-8 rounded-[2rem] border border-[#1e293b] bg-[#0d1522] hover:border-slate-700 transition-colors shadow-lg shadow-black/20 flex items-center">
          <div class="grid grid-cols-3 gap-2 sm:gap-4 divide-x divide-slate-800/60 w-full">
            <div
              v-for="stat in bentoStats"
              :key="stat.value"
              class="flex flex-col items-center justify-center px-2 text-center"
            >
              <span class="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-2" style="font-family: 'Space Grotesk', sans-serif;">{{ stat.value }}</span>
              <span class="text-[10px] sm:text-xs text-blue-400 uppercase tracking-wider font-semibold">{{ stat.labelUz }}</span>
            </div>
          </div>
        </div>

        <!-- 4. Tech Stack -->
        <div class="md:col-span-6 lg:col-span-5 p-6 sm:p-8 rounded-[2rem] border border-[#1e293b] bg-[#0d1522] hover:border-slate-700 transition-colors shadow-lg shadow-black/20">
          <h3 class="text-xs font-bold tracking-wider uppercase text-slate-500 mb-5">Texnologiyalar</h3>
          <div class="flex flex-wrap gap-2.5">
            <span
              v-for="badge in techBadges"
              :key="badge.name"
              class="inline-flex items-center gap-2 bg-[#080c14] border border-[#1e293b] text-slate-300 rounded-xl px-3.5 py-2 text-sm font-medium hover:border-blue-500/30 transition-colors"
            >
              <span 
                class="w-1.5 h-1.5 rounded-full" 
                :style="{ backgroundColor: badge.color, boxShadow: `0 0 8px ${badge.color}80` }"
                aria-hidden="true" 
              />
              {{ badge.name }}
            </span>
          </div>
        </div>

        <!-- 5. Quick Info -->
        <div class="md:col-span-6 lg:col-span-4 p-6 sm:p-8 rounded-[2rem] border border-[#1e293b] bg-[#0d1522] hover:border-slate-700 transition-colors shadow-lg shadow-black/20">
          <h3 class="text-xs font-bold tracking-wider uppercase text-slate-500 mb-5">Qisqacha</h3>
          <ul class="space-y-4">
            <li
              v-for="item in quickInfoItems"
              :key="item.icon"
              class="flex items-center justify-between gap-4"
            >
              <div class="flex items-center gap-3">
                <MapPin        v-if="item.icon === 'location'"     class="w-4 h-4 text-blue-500" :stroke-width="2.5" aria-hidden="true" />
                <Briefcase     v-else-if="item.icon === 'status'"  class="w-4 h-4 text-blue-500" :stroke-width="2.5" aria-hidden="true" />
                <Clock         v-else-if="item.icon === 'availability'" class="w-4 h-4 text-blue-500" :stroke-width="2.5" aria-hidden="true" />
                <Code2         v-else-if="item.icon === 'focus'"   class="w-4 h-4 text-blue-500" :stroke-width="2.5" aria-hidden="true" />
                <span class="text-sm font-medium text-slate-400">{{ item.labelUz }}</span>
              </div>
              <span class="text-sm font-bold text-slate-200 text-right">{{ item.valueUz }}</span>
            </li>
          </ul>
        </div>

        <!-- 6. Socials -->
        <div class="md:col-span-12 lg:col-span-3 p-6 sm:p-8 rounded-[2rem] border border-[#1e293b] bg-[#0d1522] hover:border-slate-700 transition-colors shadow-lg shadow-black/20 flex flex-col justify-center">
          <h3 class="text-xs font-bold tracking-wider uppercase text-slate-500 mb-5">Tarmoqlar</h3>
          <div class="flex flex-row lg:flex-col gap-3 h-full justify-center">
            <a
              href="https://www.linkedin.com/in/asadbek-umarov-ab9385376"
              target="_blank"
              rel="noopener noreferrer"
              class="flex-1 flex flex-col sm:flex-row lg:flex-col xl:flex-row items-center justify-center gap-3 bg-[#080c14] border border-[#1e293b] rounded-2xl p-4 hover:bg-[#1e293b] hover:border-blue-500/30 transition-all text-slate-300 group"
              aria-label="LinkedIn"
            >
              <Linkedin class="w-6 h-6 text-blue-500 group-hover:scale-110 transition-transform" />
              <span class="font-bold text-sm hidden sm:block lg:hidden xl:block">LinkedIn</span>
            </a>
            <a
              href="https://github.com/asadbekumarov"
              target="_blank"
              rel="noopener noreferrer"
              class="flex-1 flex flex-col sm:flex-row lg:flex-col xl:flex-row items-center justify-center gap-3 bg-[#080c14] border border-[#1e293b] rounded-2xl p-4 hover:bg-[#1e293b] hover:border-slate-400/50 transition-all text-slate-300 group"
              aria-label="GitHub"
            >
              <Github class="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
              <span class="font-bold text-sm hidden sm:block lg:hidden xl:block">GitHub</span>
            </a>
          </div>
        </div>

      </div>
    </div>
  </section>
</template>

<style scoped>
/* All styling is done with Tailwind CSS */
</style>
