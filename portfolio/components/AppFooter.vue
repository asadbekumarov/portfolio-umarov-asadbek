<script setup lang="ts">
const { t } = useI18n()

interface SocialLink {
  labelKey: string
  href: string
  icon: 'linkedin' | 'github' | 'telegram' | 'globe' | 'email' | 'phone'
  external: boolean
}

interface NavLink {
  labelKey: string
  href: string
}

const currentYear = new Date().getFullYear()

const navLinks: NavLink[] = [
  { labelKey: 'nav.about', href: '#about' },
  { labelKey: 'nav.skills', href: '#skills' },
  { labelKey: 'nav.experience', href: '#experience' },
  { labelKey: 'nav.projects', href: '#projects' },
  { labelKey: 'nav.education', href: '#education' },
  { labelKey: 'nav.contact', href: '#contact' },
]

const socialLinks: SocialLink[] = [
  {
    labelKey: 'footer.social.linkedin',
    href: 'https://www.linkedin.com/in/asadbek-umarov-ab9385376',
    icon: 'linkedin',
    external: true,
  },
  {
    labelKey: 'footer.social.github',
    href: 'https://github.com/asadbekumarov',
    icon: 'github',
    external: true,
  },
  {
    labelKey: 'footer.social.telegram',
    href: 'https://t.me/asadbek_umarov',
    icon: 'telegram',
    external: true,
  },
  {
    labelKey: 'footer.social.portfolio',
    href: 'https://portfolio-umarov-asadbek.vercel.app/',
    icon: 'globe',
    external: true,
  },
  {
    labelKey: 'footer.social.email',
    href: 'mailto:asadbekumarov922@gmail.com',
    icon: 'email',
    external: false,
  },
  {
    labelKey: 'footer.social.phone',
    href: 'tel:+998772687865',
    icon: 'phone',
    external: true,
  },
]

const scrollToTop = (): void => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const scrollToSection = (href: string): void => {
  const el = document.querySelector(href)
  if (el) el.scrollIntoView({ behavior: 'smooth' })
}
</script>

<template>
  <footer
    class="relative bg-[#060a12] border-t border-white/[0.06] text-slate-300 overflow-hidden"
    role="contentinfo"
  >
    <!-- Top accent line -->
    <div
      class="pointer-events-none absolute top-0 left-0 right-0 h-px footer-accent-line"
      aria-hidden="true"
    />

    <!-- Background glow -->
    <div
      class="pointer-events-none absolute -bottom-20 left-1/2 -translate-x-1/2 w-[420px] h-[180px] bg-[#0145F2]/[0.08] blur-[100px] rounded-full"
      aria-hidden="true"
    />

    <div class="section-container pt-14 sm:pt-16 pb-8 relative z-10">
      <!-- ── Top Main Grid ── -->
      <div
        class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-white/[0.05]"
      >
        <!-- Brand Column -->
        <div class="lg:col-span-4 flex flex-col items-center sm:items-start text-center sm:text-left">
          <!-- Logo -->
          <a
            href="#"
            class="inline-flex items-center gap-3 mb-4 group focus-visible:outline-none"
            aria-label="Asadbek Umarov — back to top"
            @click.prevent="scrollToTop"
          >
            <div
              class="w-10 h-10 rounded-xl flex items-center justify-center text-xs font-black select-none
                     text-white
                     bg-[#0145F2]"
              aria-hidden="true"
            >
              AU
            </div>
            <span
              class="text-base font-bold tracking-wide text-white
                     transition-colors duration-200"
            >
              Asadbek Umarov
            </span>
          </a>

          <p class="text-xs leading-relaxed max-w-xs text-slate-400/80 mb-5">
            {{ t('footer.tagline') }}
          </p>

        </div>

        <!-- Navigation -->
        <div class="lg:col-span-4 flex flex-col items-center sm:items-start">
          <p class="text-[11px] font-bold tracking-widest uppercase mb-4 text-slate-500">
            {{ t('nav.navigation') || 'Navigation' }}
          </p>
          <ul
            class="grid grid-cols-2 gap-x-10 gap-y-2.5 text-center sm:text-left"
            role="list"
          >
            <li v-for="link in navLinks" :key="link.href">
              <a
                :href="link.href"
                class="text-sm font-medium text-slate-300 hover:text-[#0145F2]
                       transition-colors duration-200"
                @click.prevent="scrollToSection(link.href)"
              >
                {{ t(link.labelKey) }}
              </a>
            </li>
          </ul>
        </div>

        <!-- Connect -->
        <div class="lg:col-span-4 flex flex-col items-center sm:items-start">
          <p class="text-[11px] font-bold tracking-widest uppercase mb-4 text-slate-500">
            {{ t('nav.connect') || 'Connect' }}
          </p>

          <!-- Social Icons -->
          <div class="flex flex-wrap gap-2.5 justify-center sm:justify-start mb-5">
            <a
              v-for="social in socialLinks"
              :key="social.icon"
              :href="social.href"
              :target="social.external ? '_blank' : undefined"
              :rel="social.external ? 'noopener noreferrer' : undefined"
              :aria-label="t(social.labelKey)"
              class="w-9 h-9 rounded-xl flex items-center justify-center
                     transition-colors duration-200
                     bg-white/[0.04] border border-white/[0.08]
                     text-slate-400 hover:text-white
                     hover:bg-white/[0.08] hover:border-white/[0.15]"
            >
              <!-- LinkedIn -->
              <svg
                v-if="social.icon === 'linkedin'"
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path
                  d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"
                />
                <circle cx="4" cy="4" r="2" />
              </svg>

              <!-- GitHub -->
              <svg
                v-else-if="social.icon === 'github'"
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path
                  d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"
                />
                <path d="M9 18c-4.51 2-5-2-7-2" />
              </svg>

              <!-- Telegram -->
              <svg
                v-else-if="social.icon === 'telegram'"
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <line x1="22" y1="2" x2="11" y2="13" />
                <polygon points="22 2 15 22 11 13 2 9 22 2" />
              </svg>

              <!-- Globe -->
              <svg
                v-else-if="social.icon === 'globe'"
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <circle cx="12" cy="12" r="10" />
                <line x1="2" y1="12" x2="22" y2="12" />
                <path
                  d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"
                />
              </svg>

              <!-- Email -->
              <svg
                v-else-if="social.icon === 'email'"
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
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
                v-else-if="social.icon === 'phone'"
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path
                  d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.63A2 2 0 012 .18h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.41 8a16 16 0 006.59 6.59l1.18-1.34a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"
                />
              </svg>
            </a>
          </div>

          <p class="text-xs text-slate-500 font-mono tracking-wide">
            asadbekumarov922@gmail.com
          </p>
        </div>
      </div>

      <!-- ── Bottom Bar ── -->
      <div
        class="pt-8 flex flex-col sm:flex-row items-center justify-between gap-5 text-xs text-slate-500"
      >
        <p class="text-center sm:text-left order-2 sm:order-1">
          © {{ currentYear }} Asadbek Umarov.
          {{ t('footer.all_rights_reserved') || 'All rights reserved.' }}
        </p>

        <div class="flex items-center gap-4 order-1 sm:order-2">
          <!-- Back to Top -->
          <button
            class="flex items-center gap-2 px-3.5 py-1.5 rounded-xl
                   bg-white/[0.04] border border-white/[0.08]
                   text-slate-400 hover:text-white
                   hover:bg-white/[0.08] hover:border-white/[0.15]
                   transition-colors duration-200"
            aria-label="Back to top"
            @click="scrollToTop"
          >
            <span class="text-xs font-medium">Top</span>
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M18 15l-6-6-6 6" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer-accent-line {
  background: linear-gradient(
    90deg,
    transparent 0%,
    rgba(1, 69, 242, 0.55) 50%,
    transparent 100%
  );
}
</style>
