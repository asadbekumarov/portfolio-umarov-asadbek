<script setup lang="ts">
import smartlifeImg from '~/assets/images/smartlife.webp';
import dnkImg from '~/assets/images/dnk-expert.webp';
const { t, locale } = useI18n()

const scrollToSection = (hash: string): void => {
  const el = document.querySelector(hash)
  if (el) el.scrollIntoView({ behavior: 'smooth' })
}

const windowOpen = (url: string): void => {
  if (typeof window !== 'undefined' && url) {
    window.open(url, '_blank', 'noopener,noreferrer')
  }
}

const techStack = [
  { name: 'React.js',      icon: 'react'      },
  { name: 'Next.js',       icon: 'nextjs'     },
  { name: 'TypeScript',    icon: 'typescript' },
  { name: 'Tailwind CSS',  icon: 'tailwind'   },
  { name: 'React Native',  icon: 'mobile'     },
]

// Window width for responsive 3D card presentation
const windowWidth = ref(1200)
const updateSize = () => {
  if (typeof window !== 'undefined') {
    windowWidth.value = window.innerWidth
  }
}

onMounted(() => {
  updateSize()
  window.addEventListener('resize', updateSize, { passive: true })
})

onUnmounted(() => {
  if (typeof window !== 'undefined') {
    window.removeEventListener('resize', updateSize)
  }
})

const isSmall = computed(() => windowWidth.value < 640)
const cardWidth = computed(() => (windowWidth.value < 360 ? 285 : windowWidth.value < 640 ? 315 : 430))
const cardHeight = computed(() => (windowWidth.value < 640 ? 245 : 305))
const cardDistX = computed(() => (windowWidth.value < 640 ? 20 : 42))
const cardDistY = computed(() => (windowWidth.value < 640 ? 24 : 48))

// Faqat Smart Life va DNA-Technology kartochkalari (i18n bilan)
const heroCards = computed(() => [
  {
    key: 'smart_life',
    title: 'Smart Life',
    subtitle: t('hero.cards.smart_life_sub'),
    badge: t('hero.cards.live_badge'),
    image: smartlifeImg,
    link: 'https://www.smartlife.uz/uz',
    technologies: ['Next.js', 'TypeScript', 'RTK Query'],
  },
  {
    key: 'dna_technology',
    title: 'DNA-Technology',
    subtitle: t('hero.cards.dna_sub'),
    badge: t('hero.cards.live_badge'),
    image: dnkImg,
    link: 'https://dnk-expert.vercel.app/uz',
    technologies: ['Next.js', 'TypeScript', 'REST API'],
  },
])
</script>

<template>
  <section
    id="hero"
    class="relative min-h-screen flex items-center overflow-hidden"
    aria-label="Introduction"
  >
    <div class="section-container relative z-10 w-full py-28 sm:py-32">
      <div class="hero-grid">

        <!-- ═══════════════════════════════
             LEFT — Text / CTA
             ═══════════════════════════════ -->
        <div class="hero-left relative z-20">

          <!-- H1 -->
          <h1 class="hero-title" v-memo="[locale]">
            <span class="hero-name">{{ t('hero.name') }} {{ t('hero.surname') }}</span>
            <span class="hero-role">{{ t('hero.role') }}</span>
          </h1>

          <!-- Subtext -->
          <p class="hero-sub hero-tagline" v-memo="[locale]">
            {{ t('hero.tagline') }}
          </p>

          <!-- Tech badges with icons -->
          <ul class="tech-list hero-tech" aria-label="Tech stack">
            <li v-for="tech in techStack" :key="tech.name" class="tech-badge">
              <!-- React icon -->
              <svg v-if="tech.icon === 'react'" class="tech-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
                <circle cx="12" cy="12" r="2.25" fill="currentColor" stroke="none" />
                <ellipse cx="12" cy="12" rx="10" ry="4" stroke="currentColor" />
                <ellipse cx="12" cy="12" rx="10" ry="4" stroke="currentColor" transform="rotate(60 12 12)" />
                <ellipse cx="12" cy="12" rx="10" ry="4" stroke="currentColor" transform="rotate(120 12 12)" />
              </svg>
              <!-- Next.js icon -->
              <svg v-else-if="tech.icon === 'nextjs'" class="tech-icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="1.5" />
                <path d="M8 16V8l8 8V8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
              <!-- TypeScript icon -->
              <svg v-else-if="tech.icon === 'typescript'" class="tech-icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" stroke-width="1.5" />
                <path d="M13 12h3.5M14.75 12v5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                <path d="M7 12h3v1.5a1.5 1.5 0 1 1-3 0V12Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
              <!-- Tailwind icon -->
              <svg v-else-if="tech.icon === 'tailwind'" class="tech-icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M6 13c1-4 3.5-6 7-6s5 2.5 4 5c1-2.5 3.5-3.5 5-2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                <path d="M3 18c1-4 3.5-6 7-6s5 2.5 4 5c1-2.5 3.5-3.5 5-2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
              </svg>
              <!-- Mobile icon -->
              <svg v-else-if="tech.icon === 'mobile'" class="tech-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <rect x="7" y="2" width="10" height="20" rx="2" />
                <circle cx="12" cy="18" r="0.5" fill="currentColor" />
              </svg>
              {{ tech.name }}
            </li>
          </ul>

          <!-- CTA buttons -->
          <div class="cta-row hero-ctas">
            <a href="#projects" class="btn-primary" @click.prevent="scrollToSection('#projects')">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.25" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <rect x="2" y="7" width="20" height="14" rx="2" />
                <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
              </svg>
              {{ t('hero.cta_view') }}
            </a>
            <a
              href="/resume.pdf"
              target="_blank"
              download="Asadbek_Umarov_Resume.pdf"
              class="btn-secondary"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.25" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              {{ t('footer.download_cv') }}
            </a>
          </div>
        </div>

        <!-- ═══════════════════════════════
             RIGHT — Continuous Looping Project Cards
             ═══════════════════════════════ -->
        <div class="hero-right hero-code-wrap flex items-center justify-center relative z-10 w-full mt-10 lg:mt-0">
          <div class="card-swap-stage" aria-label="Featured projects showcase">
            <VCardSwap
              :item-count="heroCards.length"
              :width="cardWidth"
              :height="cardHeight"
              :card-distance="cardDistX"
              :vertical-distance="cardDistY"
              :delay="3200"
              :pause-on-hover="true"
              :skew-amount="isSmall ? 2 : 4"
              easing="linear"
              @card-click="(i) => heroCards[i]?.link && windowOpen(heroCards[i]?.link)"
            >
              <template #default="{ index }">
                <div class="project-card-inner">
                  <!-- Project Cover Image -->
                  <div class="pc-image-wrap">
                    <img
                      :src="heroCards[index]?.image"
                      :alt="heroCards[index]?.title"
                      class="pc-image"
                      width="430"
                      height="180"
                      :loading="index === 0 ? 'eager' : 'lazy'"
                      :decoding="index === 0 ? 'auto' : 'async'"
                    />
                    <div class="pc-image-overlay" />
                    <!-- Badge -->
                    <div class="pc-badge">
                      <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      <span>{{ heroCards[index]?.badge }}</span>
                    </div>
                  </div>

                  <!-- Project Meta -->
                  <div class="pc-content">
                    <div class="flex items-center justify-between gap-2">
                      <h2 class="pc-title">{{ heroCards[index]?.title }}</h2>
                      <span class="pc-sub">{{ heroCards[index]?.subtitle }}</span>
                    </div>

                    <div class="pc-footer">
                      <div class="pc-techs">
                        <span
                          v-for="tech in heroCards[index]?.technologies"
                          :key="tech"
                          class="pc-tech-pill"
                        >{{ tech }}</span>
                      </div>

                      <span
                        class="pc-link cursor-pointer"
                        aria-hidden="true"
                      >
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                          <polyline points="15 3 21 3 21 9" />
                          <line x1="10" y1="14" x2="21" y2="3" />
                        </svg>
                        {{ t('hero.open_project') }}
                      </span>
                    </div>
                  </div>
                </div>
              </template>
            </VCardSwap>
          </div>
        </div>

      </div>
    </div>

    <!-- Gradual Blur layer at bottom of Hero section (desktop only) -->
    <GradualBlur
      class="hidden sm:block"
      position="bottom"
      height="6rem"
      :strength="2.5"
      :div-count="6"
      curve="bezier"
      :exponential="true"
      :opacity="1"
    />
  </section>
</template>

<style scoped>
/* ─── Background ─── */
.hero-bg {
  background-color: #030f1d;
}

/* ─── CardSwap stage ─────────────────────────────────────────────── */
.card-swap-stage {
  position: relative;
  width: 480px;
  height: 420px;
  overflow: visible;
  display: flex;
  align-items: center;
  justify-content: center;
}

@media (max-width: 640px) {
  .card-swap-stage {
    width: 100%;
    max-width: 350px;
    height: 310px;
  }
  .pc-image-wrap {
    height: 135px;
  }
}

.project-card-inner {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  background: #090e1a;
  border-radius: 1rem;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.08);
}

.pc-image-wrap {
  position: relative;
  height: 180px;
  width: 100%;
  overflow: hidden;
  background: #050811;
}

.pc-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top;
}

.pc-image-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, #090e1a 0%, transparent 60%);
}

.pc-badge {
  position: absolute;
  top: 0.65rem;
  right: 0.65rem;
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.2rem 0.55rem;
  border-radius: 999px;
  background: rgba(8, 13, 26, 0.85);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.15);
  color: #4ade80;
  font-size: 0.6875rem;
  font-weight: 600;
  letter-spacing: 0.02em;
}

.pc-content {
  padding: 0.75rem 1rem 0.85rem;
  display: flex;
  flex-direction: column;
  gap: 0.45rem;
  flex: 1;
  justify-content: space-between;
}

.pc-title {
  font-family: 'Space Grotesk', 'Inter', sans-serif;
  font-size: 1.125rem;
  font-weight: 700;
  color: #ffffff;
  margin: 0;
  letter-spacing: -0.01em;
}

.pc-sub {
  font-size: 0.6875rem;
  color: #94a3b8;
  white-space: nowrap;
}

.pc-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  padding-top: 0.35rem;
  border-top: 1px solid rgba(255, 255, 255, 0.06);
}

.pc-techs {
  display: flex;
  flex-wrap: wrap;
  gap: 0.3rem;
}

.pc-tech-pill {
  font-size: 0.6875rem;
  font-family: monospace;
  padding: 0.15rem 0.45rem;
  border-radius: 0.375rem;
  background: rgba(1, 69, 242, 0.12);
  color: #6ea4ff;
  border: 1px solid rgba(1, 69, 242, 0.25);
  white-space: nowrap;
}

.pc-link {
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 0.75rem;
  font-weight: 600;
  color: #3b82f6;
  text-decoration: none;
  transition: color 0.2s ease;
  white-space: nowrap;
}
.pc-link:hover {
  color: #60a5fa;
}

/* ─── Grid ─── */
.hero-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 3rem;
  align-items: center;
}
@media (min-width: 1024px) {
  .hero-grid { grid-template-columns: 1.1fr 1fr; gap: 3.5rem; }
}

/* ─── Typography ─── */
.hero-title {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  margin-bottom: 1.25rem;
}
.hero-name {
  font-family: "Space Grotesk", "Inter", system-ui, sans-serif;
  font-size: clamp(2.5rem, 6vw, 4rem);
  font-weight: 800;
  color: #f0f4ff;
  letter-spacing: -0.02em;
  line-height: 1;
}
.hero-role {
  font-family: "Space Grotesk", "Inter", system-ui, sans-serif;
  font-size: clamp(1.125rem, 2.5vw, 1.5rem);
  font-weight: 500;
  color: #0145F2;
  letter-spacing: -0.01em;
  line-height: 1.3;
}
.hero-sub {
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Inter", sans-serif;
  font-size: clamp(0.9375rem, 1.6vw, 1.0625rem);
  line-height: 1.7;
  color: #7a8ea8;
  max-width: 54ch;
  margin-bottom: 1.75rem;
}

/* ─── Tech badges ─── */
.tech-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 2rem;
}
.tech-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  padding: 0.3rem 0.75rem;
  border-radius: 0.5rem;
  font-size: 0.8125rem;
  font-weight: 500;
  color: #94a8c4;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
  transition: border-color 0.2s, color 0.2s, background 0.2s;
}
.tech-badge:hover {
  border-color: rgba(1, 69, 242, 0.35);
  color: #c5d4ef;
  background: rgba(1, 69, 242, 0.07);
}
.tech-icon {
  width: 14px;
  height: 14px;
  flex-shrink: 0;
  color: #5580b8;
}

/* ─── CTA row ─── */
.cta-row {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  align-items: center;
}

/* ─── Entrance animations ─── */
.hero-badge     { animation: fadeUp 0.55s cubic-bezier(0.16, 1, 0.3, 1) 0.05s both; }
.hero-title     { /* LCP candidate: immediately visible */ }
.hero-tagline   { /* LCP candidate: immediately visible */ }
.hero-tech      { animation: fadeUp 0.55s cubic-bezier(0.16, 1, 0.3, 1) 0.20s both; }
.hero-ctas      { animation: fadeUp 0.55s cubic-bezier(0.16, 1, 0.3, 1) 0.25s both; }
.hero-code-wrap { animation: fadeUp 0.65s cubic-bezier(0.16, 1, 0.3, 1) 0.22s both; }

@media (max-width: 640px) {
  .hero-badge,
  .hero-tech,
  .hero-ctas,
  .hero-code-wrap {
    animation: none !important;
    opacity: 1 !important;
    transform: none !important;
  }
}
</style>
