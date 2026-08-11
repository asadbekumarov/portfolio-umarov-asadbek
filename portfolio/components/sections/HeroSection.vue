<script setup lang="ts">
const { t } = useI18n()

const techStack = [
  'React.js',
  'TypeScript',
  'Next.js',
  'Tailwind CSS',
  'React Native',
]

const scrollToSection = (hash: string): void => {
  const el = document.querySelector(hash)
  if (el) el.scrollIntoView({ behavior: 'smooth' })
}
</script>

<template>
  <section
    id="hero"
    class="relative min-h-screen flex items-center bg-grid overflow-hidden"
    aria-label="Introduction"
  >
    <!-- Background orbs -->
    <div class="pointer-events-none absolute orb-blue" aria-hidden="true" />
    <div class="pointer-events-none absolute orb-teal" aria-hidden="true" />

    <div class="section-container relative z-10 pt-32 pb-24 w-full">
      <div class="max-w-4xl mx-auto text-center">
        <h1
          class="font-black tracking-tight leading-[0.95] mb-6 hero-title scroll-animate"
        >
          <span class="text-slate-200">{{ t('hero.name') }}</span>
          <br />
          <span class="gradient-text-animated">{{ t('hero.surname') }}</span>
        </h1>

        <p
          class="text-base sm:text-lg leading-relaxed max-w-2xl mx-auto mb-8
                 text-slate-400/80 hero-tagline scroll-animate"
        >
          {{ t('hero.tagline') }}
        </p>

        <!-- Tech Stack Pills -->
        <div
          class="flex flex-wrap items-center justify-center gap-2 mb-12 hero-tech scroll-animate"
        >
          <span
            v-for="tech in techStack"
            :key="tech"
            class="px-3 py-1 rounded-full text-xs font-medium
                   bg-white/5 border border-white/10 text-slate-300/80
                   transition-colors duration-200 hover:border-sky-500/30 hover:text-sky-300"
          >
            {{ tech }}
          </span>
        </div>

        <div
          class="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-8 hero-ctas scroll-animate"
        >
          <a
            href="#projects"
            class="btn-primary"
            @click.prevent="scrollToSection('#projects')"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2.25"
              stroke-linecap="round"
              stroke-linejoin="round"
              aria-hidden="true"
            >
              <rect x="2" y="3" width="20" height="14" rx="2" />
              <line x1="8" y1="21" x2="16" y2="21" />
              <line x1="12" y1="17" x2="12" y2="21" />
            </svg>
            {{ t('hero.cta_view') }}
          </a>

          <a
            href="#contact"
            class="btn-secondary"
            @click.prevent="scrollToSection('#contact')"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2.25"
              stroke-linecap="round"
              stroke-linejoin="round"
              aria-hidden="true"
            >
              <path
                d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"
              />
              <polyline points="22,6 12,13 2,6" />
            </svg>
            {{ t('hero.cta_contact') || 'Contact Me' }}
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.orb-blue {
  top: -220px;
  right: -120px;
  width: 750px;
  height: 750px;
  border-radius: 50%;
  background: radial-gradient(
    circle,
    rgba(2, 132, 199, 0.13) 0%,
    transparent 68%
  );
  filter: blur(55px);
}

.orb-teal {
  bottom: -150px;
  left: -180px;
  width: 560px;
  height: 560px;
  border-radius: 50%;
  background: radial-gradient(
    circle,
    rgba(4, 124, 88, 0.09) 0%,
    transparent 68%
  );
  filter: blur(65px);
}

.hero-badge {
  animation: fadeUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.05s both;
}

.hero-title {
  font-size: clamp(2.75rem, 9vw, 5.25rem);
  animation: fadeUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.12s both;
}

.hero-tagline {
  animation: fadeUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.22s both;
}

.hero-tech {
  animation: fadeUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.28s both;
}

.hero-ctas {
  animation: fadeUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.36s both;
}
</style>
