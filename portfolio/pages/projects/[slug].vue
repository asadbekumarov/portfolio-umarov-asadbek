<script setup lang="ts">
import { ref, computed } from 'vue';

const route = useRoute();
const { t } = useI18n();
const localePath = useLocalePath();

const slug = computed(() => (route.params.slug as string) || '');

// Faqat Darrov uchun case study sahifasi
if (slug.value !== 'darrov') {
  throw createError({
    statusCode: 404,
    statusMessage: 'Case study not found',
    fatal: true,
  });
}

useSeoMeta({
  title: () => t('case_study.darrov.seo.title'),
  description: () => t('case_study.darrov.seo.description'),
  ogTitle: () => t('case_study.darrov.seo.og_title'),
  ogDescription: () => t('case_study.darrov.seo.og_description'),
  twitterTitle: () => t('case_study.darrov.seo.twitter_title'),
  twitterDescription: () => t('case_study.darrov.seo.twitter_description'),
});

type SectionId =
  'problem' | 'role' | 'team' | 'decisions' | 'challenges' | 'results';

interface SectionTab {
  id: SectionId;
  num: string;
  titleKey: string;
}

const sections: SectionTab[] = [
  { id: 'problem', num: '01', titleKey: 'case_study.darrov.problem.title' },
  { id: 'role', num: '02', titleKey: 'case_study.darrov.role.title' },
  { id: 'team', num: '03', titleKey: 'case_study.darrov.team.title' },
  { id: 'decisions', num: '04', titleKey: 'case_study.darrov.decisions.title' },
  {
    id: 'challenges',
    num: '05',
    titleKey: 'case_study.darrov.challenges.title',
  },
  { id: 'results', num: '06', titleKey: 'case_study.darrov.results.title' },
];

const activeTab = ref<SectionId>('problem');
const currentIndex = computed(() =>
  sections.findIndex((s) => s.id === activeTab.value)
);

const prevTab = () => {
  if (currentIndex.value > 0) {
    activeTab.value = sections[currentIndex.value - 1].id;
  }
};

const nextTab = () => {
  if (currentIndex.value < sections.length - 1) {
    activeTab.value = sections[currentIndex.value + 1].id;
  }
};
</script>

<template>
  <div class="case-study-page min-h-screen bg-[#030712] text-slate-200">
    <!-- ── Top Sticky Header ── -->
    <header
      class="sticky top-0 z-50 bg-[#030712]/90 backdrop-blur-md border-b border-slate-800/80 py-3.5"
    >
      <div
        class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4"
      >
        <NuxtLink
          :to="localePath('/#projects')"
          class="inline-flex items-center gap-2 text-sm font-semibold text-slate-300 hover:text-white transition-colors group"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="transition-transform duration-200 group-hover:-translate-x-1"
          >
            <polyline points="15 18 9 12 15 6" />
          </svg>
          <span>{{ $t('case_study.back_to_projects') }}</span>
        </NuxtLink>

        <div class="flex items-center gap-4">
          <NuxtLink
            :to="localePath('/')"
            class="font-cloudes text-xl sm:text-2xl tracking-wide text-white hover:text-[#0145F2] transition-colors"
            aria-label="Umarov.A — Home"
          >
            Umarov<span class="text-[#0145F2]">.A</span>
          </NuxtLink>
          <LanguageSwitcher />
        </div>
      </div>
    </header>

    <main class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
      <!-- ── Hero Banner ── -->
      <div class="mb-12 sm:mb-14">
        <!-- Badge -->
        <div
          class="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-blue-500/10 text-blue-400 border border-blue-500/20 mb-4"
        >
          <span class="w-1.5 h-1.5 rounded-full bg-blue-400" />
          {{ $t('case_study.badge') }}
        </div>

        <h1
          class="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight mb-4"
          style="font-family: 'Space Grotesk', sans-serif"
        >
          {{ $t('case_study.darrov.title') }}
        </h1>

        <p
          class="text-base sm:text-xl text-slate-400 leading-relaxed max-w-3xl mb-8"
        >
          {{ $t('case_study.darrov.subtitle') }}
        </p>

        <!-- Quick Metadata Cards Grid -->
        <div
          class="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 p-5 sm:p-6 bg-[#0d1522] rounded-2xl border border-slate-800"
        >
          <div>
            <span
              class="text-xs font-semibold uppercase tracking-wider text-slate-500 block mb-1"
            >
              {{ $t('case_study.quick_info.role_label') }}
            </span>
            <p class="text-sm font-semibold text-slate-200">
              {{ $t('case_study.darrov.meta.role') }}
            </p>
          </div>

          <div>
            <span
              class="text-xs font-semibold uppercase tracking-wider text-slate-500 block mb-1"
            >
              {{ $t('case_study.quick_info.team_label') }}
            </span>
            <p class="text-sm font-semibold text-slate-200">
              {{ $t('case_study.darrov.meta.team') }}
            </p>
          </div>

          <div>
            <span
              class="text-xs font-semibold uppercase tracking-wider text-slate-500 block mb-1"
            >
              {{ $t('case_study.quick_info.timeline_label') }}
            </span>
            <!-- TODO: Asadbek to'ldiradi -->
            <p class="text-sm font-semibold text-slate-300">
              {{ $t('case_study.darrov.meta.timeline') }}
            </p>
          </div>

          <div>
            <span
              class="text-xs font-semibold uppercase tracking-wider text-slate-500 block mb-1"
            >
              {{ $t('case_study.quick_info.live_label') }}
            </span>
            <a
              href="https://t.me/darrov_bot"
              target="_blank"
              rel="noopener noreferrer"
              class="text-sm font-semibold text-blue-400 hover:text-blue-300 transition-colors inline-flex items-center gap-1"
            >
              <span>t.me/darrov_bot</span>
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path
                  d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"
                />
                <polyline points="15 3 21 3 21 9" />
                <line x1="10" y1="14" x2="21" y2="3" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      <!-- ── Navigation Controls: Tabs (desktop) & Select (mobile) ── -->
      <div class="mb-8">
        <!-- Mobile Select (< sm) -->
        <div class="sm:hidden">
          <label
            for="section-select"
            class="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2"
          >
            {{ $t('case_study.nav.select_section') }}
          </label>
          <div class="relative">
            <select
              id="section-select"
              v-model="activeTab"
              class="w-full appearance-none bg-[#0d1522] border border-slate-700/80 hover:border-slate-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 rounded-xl px-4 py-3.5 text-white font-medium text-sm pr-10 outline-none transition-all cursor-pointer shadow-lg"
            >
              <option
                v-for="section in sections"
                :key="section.id"
                :value="section.id"
                class="bg-[#0d1522] text-slate-200 py-2"
              >
                {{ section.num }} • {{ $t(section.titleKey) }}
              </option>
            </select>
            <div
              class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3.5 text-slate-400"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </div>
          </div>
        </div>

        <!-- Desktop Pill Tabs (>= sm) -->
        <div class="hidden sm:block">
          <div
            class="p-1.5 rounded-2xl bg-[#0d1522] border border-slate-800 flex items-center gap-1.5 overflow-x-auto"
          >
            <button
              v-for="section in sections"
              :key="section.id"
              type="button"
              :class="[
                'flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs md:text-sm font-semibold transition-all whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500',
                activeTab === section.id
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30 font-bold'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60',
              ]"
              @click="activeTab = section.id"
            >
              <span
                :class="[
                  'text-[11px] font-mono px-1.5 py-0.5 rounded transition-colors',
                  activeTab === section.id
                    ? 'bg-white/20 text-white'
                    : 'bg-slate-800 text-slate-400',
                ]"
              >
                {{ section.num }}
              </span>
              <span>{{ $t(section.titleKey) }}</span>
            </button>
          </div>
        </div>
      </div>

      <!-- ── Active Section Content Card ── -->
      <div class="relative">
        <Transition name="tab-fade" mode="out-in">
          <!-- 1. Muammo (Problem) -->
          <section
            v-if="activeTab === 'problem'"
            key="problem"
            class="section-card"
          >
            <div class="flex items-center gap-3 mb-3">
              <div
                class="w-8 h-8 rounded-lg bg-red-500/10 text-red-400 border border-red-500/20 flex items-center justify-center font-bold text-sm"
              >
                01
              </div>
              <h2
                class="text-2xl sm:text-3xl font-bold text-white tracking-tight"
                style="font-family: 'Space Grotesk', sans-serif"
              >
                {{ $t('case_study.darrov.problem.title') }}
              </h2>
            </div>
            <p class="text-sm text-slate-400 mb-6">
              {{ $t('case_study.darrov.problem.subtitle') }}
            </p>

            <div class="content-box">
              <p class="text-slate-300 leading-relaxed whitespace-pre-line">
                {{ $t('case_study.darrov.problem.content') }}
              </p>
            </div>
          </section>

          <!-- 2. Mening rolim (My Role) -->
          <section
            v-else-if="activeTab === 'role'"
            key="role"
            class="section-card"
          >
            <div class="flex items-center gap-3 mb-3">
              <div
                class="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/20 flex items-center justify-center font-bold text-sm"
              >
                02
              </div>
              <h2
                class="text-2xl sm:text-3xl font-bold text-white tracking-tight"
                style="font-family: 'Space Grotesk', sans-serif"
              >
                {{ $t('case_study.darrov.role.title') }}
              </h2>
            </div>
            <p class="text-sm text-slate-400 mb-6">
              {{ $t('case_study.darrov.role.subtitle') }}
            </p>

            <div class="content-box">
              <p class="text-slate-300 leading-relaxed whitespace-pre-line">
                {{ $t('case_study.darrov.role.content') }}
              </p>
            </div>
          </section>

          <!-- 3. Jamoa (Team) -->
          <section
            v-else-if="activeTab === 'team'"
            key="team"
            class="section-card"
          >
            <div class="flex items-center gap-3 mb-3">
              <div
                class="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center justify-center font-bold text-sm"
              >
                03
              </div>
              <h2
                class="text-2xl sm:text-3xl font-bold text-white tracking-tight"
                style="font-family: 'Space Grotesk', sans-serif"
              >
                {{ $t('case_study.darrov.team.title') }}
              </h2>
            </div>
            <p class="text-sm text-slate-400 mb-6">
              {{ $t('case_study.darrov.team.subtitle') }}
            </p>

            <div class="content-box">
              <p class="text-slate-300 leading-relaxed whitespace-pre-line">
                {{ $t('case_study.darrov.team.content') }}
              </p>
            </div>
          </section>

          <!-- 4. Texnik qarorlar (Technical Decisions) -->
          <section
            v-else-if="activeTab === 'decisions'"
            key="decisions"
            class="section-card"
          >
            <div class="flex items-center gap-3 mb-3">
              <div
                class="w-8 h-8 rounded-lg bg-purple-500/10 text-purple-400 border border-purple-500/20 flex items-center justify-center font-bold text-sm"
              >
                04
              </div>
              <h2
                class="text-2xl sm:text-3xl font-bold text-white tracking-tight"
                style="font-family: 'Space Grotesk', sans-serif"
              >
                {{ $t('case_study.darrov.decisions.title') }}
              </h2>
            </div>
            <p class="text-sm text-slate-400 mb-6">
              {{ $t('case_study.darrov.decisions.subtitle') }}
            </p>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-5">
              <!-- Stack -->
              <div class="sub-card">
                <h3
                  class="text-lg font-bold text-white mb-2 flex items-center gap-2"
                >
                  <span class="w-2 h-2 rounded-full bg-blue-400" />
                  {{ $t('case_study.darrov.decisions.stack_title') }}
                </h3>
                <p
                  class="text-sm text-slate-300 leading-relaxed whitespace-pre-line"
                >
                  {{ $t('case_study.darrov.decisions.stack_content') }}
                </p>
              </div>

              <!-- State boshqaruvi -->
              <div class="sub-card">
                <h3
                  class="text-lg font-bold text-white mb-2 flex items-center gap-2"
                >
                  <span class="w-2 h-2 rounded-full bg-cyan-400" />
                  {{ $t('case_study.darrov.decisions.state_title') }}
                </h3>
                <p
                  class="text-sm text-slate-300 leading-relaxed whitespace-pre-line"
                >
                  {{ $t('case_study.darrov.decisions.state_content') }}
                </p>
              </div>

              <!-- Nega RTK Query? -->
              <div class="sub-card">
                <h3
                  class="text-lg font-bold text-white mb-2 flex items-center gap-2"
                >
                  <span class="w-2 h-2 rounded-full bg-purple-400" />
                  {{ $t('case_study.darrov.decisions.why_rtk_title') }}
                </h3>
                <p
                  class="text-sm text-slate-300 leading-relaxed whitespace-pre-line"
                >
                  {{ $t('case_study.darrov.decisions.why_rtk_content') }}
                </p>
              </div>
            </div>
          </section>

          <!-- 5. Qiyinchiliklar (Challenges) -->
          <section
            v-else-if="activeTab === 'challenges'"
            key="challenges"
            class="section-card"
          >
            <div class="flex items-center gap-3 mb-3">
              <div
                class="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20 flex items-center justify-center font-bold text-sm"
              >
                05
              </div>
              <h2
                class="text-2xl sm:text-3xl font-bold text-white tracking-tight"
                style="font-family: 'Space Grotesk', sans-serif"
              >
                {{ $t('case_study.darrov.challenges.title') }}
              </h2>
            </div>
            <p class="text-sm text-slate-400 mb-6">
              {{ $t('case_study.darrov.challenges.subtitle') }}
            </p>

            <div class="content-box">
              <p class="text-slate-300 leading-relaxed whitespace-pre-line">
                {{ $t('case_study.darrov.challenges.content') }}
              </p>
            </div>
          </section>

          <!-- 6. Natija (Results) -->
          <section
            v-else-if="activeTab === 'results'"
            key="results"
            class="section-card"
          >
            <div class="flex items-center gap-3 mb-3">
              <div
                class="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center justify-center font-bold text-sm"
              >
                06
              </div>
              <h2
                class="text-2xl sm:text-3xl font-bold text-white tracking-tight"
                style="font-family: 'Space Grotesk', sans-serif"
              >
                {{ $t('case_study.darrov.results.title') }}
              </h2>
            </div>
            <p class="text-sm text-slate-400 mb-6">
              {{ $t('case_study.darrov.results.subtitle') }}
            </p>

            <div class="content-box">
              <p class="text-slate-300 leading-relaxed whitespace-pre-line">
                {{ $t('case_study.darrov.results.content') }}
              </p>
            </div>
          </section>
        </Transition>

        <!-- ── Section Footer Stepper Controls ── -->
        <div
          class="mt-6 flex items-center justify-between gap-4 p-4 rounded-xl bg-[#0d1522] border border-slate-800"
        >
          <button
            type="button"
            :disabled="currentIndex === 0"
            class="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all disabled:opacity-40 disabled:cursor-not-allowed text-slate-300 hover:text-white hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
            @click="prevTab"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <polyline points="15 18 9 12 15 6" />
            </svg>
            <span>{{ $t('case_study.nav.prev') }}</span>
          </button>

          <div class="text-xs font-mono text-slate-400">
            <span class="text-white font-bold">{{ currentIndex + 1 }}</span> /
            {{ sections.length }}
          </div>

          <button
            type="button"
            :disabled="currentIndex === sections.length - 1"
            class="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all disabled:opacity-40 disabled:cursor-not-allowed bg-blue-600 hover:bg-blue-500 disabled:bg-slate-800 text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
            @click="nextTab"
          >
            <span>{{ $t('case_study.nav.next') }}</span>
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>
      </div>

      <!-- ── Bottom CTA ── -->
      <div
        class="mt-16 p-8 rounded-2xl bg-gradient-to-b from-[#0d1522] to-[#070d18] border border-slate-800 text-center"
      >
        <h3
          class="text-xl sm:text-2xl font-bold text-white mb-2"
          style="font-family: 'Space Grotesk', sans-serif"
        >
          {{ $t('case_study.cta.title') }}
        </h3>
        <p class="text-sm text-slate-400 mb-6 max-w-lg mx-auto">
          {{ $t('case_study.cta.description') }}
        </p>
        <div class="flex flex-wrap items-center justify-center gap-3">
          <a
            href="https://t.me/darrov_bot"
            target="_blank"
            rel="noopener noreferrer"
            class="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm transition-colors inline-flex items-center gap-2"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path
                d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"
              />
              <polyline points="15 3 21 3 21 9" />
              <line x1="10" y1="14" x2="21" y2="3" />
            </svg>
            {{ $t('case_study.actions.open_live') }}
          </a>
          <NuxtLink
            :to="localePath('/#projects')"
            class="px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white font-semibold text-sm transition-colors border border-slate-700 inline-flex items-center gap-2"
          >
            {{ $t('case_study.actions.view_all_projects') }}
          </NuxtLink>
        </div>
      </div>
    </main>

    <AppFooter />
  </div>
</template>

<style scoped>
.section-card {
  @apply p-6 sm:p-8 rounded-2xl bg-[#0d1522] border border-slate-800/90;
}
.content-box {
  @apply p-5 rounded-xl bg-[#070d18] border border-slate-800/60 min-h-[90px];
}
.sub-card {
  @apply p-5 rounded-xl bg-[#070d18] border border-slate-800/70 flex flex-col;
}

.tab-fade-enter-active,
.tab-fade-leave-active {
  transition:
    opacity 0.2s ease,
    transform 0.2s ease;
}

.tab-fade-enter-from {
  opacity: 0;
  transform: translateY(6px);
}

.tab-fade-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}
</style>
