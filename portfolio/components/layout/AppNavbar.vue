<script setup lang="ts">
const { t } = useI18n()

import { navLinks } from '~/data'

const isMenuOpen = ref(false)
const isScrolled = ref(false)

// Body scroll lock on mobile menu open
watch(isMenuOpen, (open) => {
  if (typeof document !== 'undefined') {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
  }
})

let ticking = false
const handleScroll = (): void => {
  if (!ticking) {
    requestAnimationFrame(() => {
      isScrolled.value = window.scrollY > 24
      ticking = false
    })
    ticking = true
  }
}

const handleResize = (): void => {
  if (window.innerWidth >= 1024 && isMenuOpen.value) {
    isMenuOpen.value = false
  }
}

const handleKeydown = (e: KeyboardEvent): void => {
  if (e.key === 'Escape' && isMenuOpen.value) {
    isMenuOpen.value = false
  }
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
  window.addEventListener('resize', handleResize, { passive: true })
  window.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  window.removeEventListener('resize', handleResize)
  window.removeEventListener('keydown', handleKeydown)
  if (typeof document !== 'undefined') {
    document.body.style.overflow = ''
  }
})

const { scrollToTop: navScrollToTop, scrollToSection: navScrollToSection } = useNavigation()

const scrollToTop = (): void => {
  if (isMenuOpen.value) {
    isMenuOpen.value = false
  }
  setTimeout(() => {
    navScrollToTop()
  }, 60)
}

const scrollToSection = (href: string): void => {
  isMenuOpen.value = false
  setTimeout(() => {
    navScrollToSection(href)
  }, 60)
}
</script>

<template>
  <nav
    :class="[
      'fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-none outline-none',
      isScrolled || isMenuOpen ? 'py-3 sm:py-3.5 bg-[#030712]/95 backdrop-blur-md' : 'py-4 sm:py-5 bg-transparent',
    ]"
    role="navigation"
    aria-label="Main navigation"
  >
    <div class="section-container">
      <div class="relative z-50 flex items-center justify-between gap-3">
        <!-- Logo -->
        <a
          href="#"
          class="group flex items-center focus-visible:outline-none shrink-0 select-none py-1"
          aria-label="Umarov.A — back to top"
          @click.prevent="scrollToTop"
        >
          <span class="font-cloudes text-2xl sm:text-3xl tracking-wide text-white group-hover:text-[#0145F2] transition-colors duration-200">
            Umarov<span class="text-[#0145F2]">.A</span>
          </span>
        </a>

        <!-- Desktop Navigation -->
        <ul class="hidden lg:flex items-center gap-1" role="list">
          <li v-for="link in navLinks" :key="link.href">
            <a
              :href="link.href"
              class="relative text-sm px-3.5 py-2 rounded-lg transition-all duration-200 text-slate-200 hover:text-[#0145F2] hover:bg-white/5 focus-visible:outline-none"
              @click.prevent="scrollToSection(link.href)"
            >
              {{ t(link.labelKey) }}
            </a>
          </li>
        </ul>

        <!-- Desktop Language -->
        <div class="hidden lg:flex items-center gap-5">
          <LanguageSwitcher />
        </div>

        <!-- Mobile / Tablet Right Actions -->
        <div class="flex lg:hidden items-center gap-2 sm:gap-3">
          <LanguageSwitcher />
          <button
            type="button"
            class="p-2.5 rounded-xl transition-all duration-200 hover:bg-white/10 active:scale-95 text-slate-200 border-none outline-none focus-visible:outline-none"
            :aria-label="isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'"
            :aria-expanded="isMenuOpen"
            aria-controls="mobile-menu"
            @click="isMenuOpen = !isMenuOpen"
          >
            <Transition name="icon-swap" mode="out-in">
              <svg
                v-if="!isMenuOpen"
                key="open"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                aria-hidden="true"
              >
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
              <svg
                v-else
                key="close"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                aria-hidden="true"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </Transition>
          </button>
        </div>
      </div>
    </div>

    <!-- Fullscreen Mobile Menu Overlay -->
    <Transition name="overlay-fade">
      <div
        v-if="isMenuOpen"
        id="mobile-menu"
        class="lg:hidden fixed inset-0 z-40 flex flex-col h-[100dvh] overflow-y-auto overscroll-contain bg-[#030712]"
      >
        <div
          class="relative flex flex-col flex-1 pt-20 sm:pt-24 pb-8 px-6 max-w-lg mx-auto w-full"
          style="padding-bottom: max(2rem, env(safe-area-inset-bottom));"
        >
          <!-- Navigation links list starting right below header -->
          <ul class="flex flex-col gap-1.5 mt-4 sm:mt-6 flex-1" role="list">
            <li
              v-for="(link, index) in navLinks"
              :key="link.href"
            >
              <a
                :href="link.href"
                :style="{
                  transitionDelay: isMenuOpen ? `${40 + index * 35}ms` : '0ms',
                }"
                class="menu-link group flex items-center py-3.5 px-3 rounded-xl border-b border-white/[0.06] hover:bg-white/[0.04] active:bg-white/[0.08] transition-colors"
                @click.prevent="scrollToSection(link.href)"
              >
                <span
                  class="text-lg sm:text-xl font-bold tracking-tight text-white transition-colors duration-200 group-hover:text-[#0145F2]"
                >
                  {{ t(link.labelKey) }}
                </span>
              </a>
            </li>
          </ul>

          <!-- Bottom info & copyright -->
          <div class="pt-6 mt-6 border-t border-white/[0.08] flex items-center justify-between text-xs text-slate-400 font-mono">
            <span class="font-semibold text-slate-300">Asadbek Umarov</span>
            <span>AU © 2026</span>
          </div>
        </div>
      </div>
    </Transition>
  </nav>
</template>

<style scoped>
/* Overlay animatsiya */
.overlay-fade-enter-active {
  transition: opacity 0.3s ease;
}
.overlay-fade-leave-active {
  transition: opacity 0.2s ease;
}
.overlay-fade-enter-from,
.overlay-fade-leave-to {
  opacity: 0;
}

/* Link animatsiya */
.menu-link {
  opacity: 1;
  transform: translateY(0);
  transition:
    opacity 0.3s ease,
    transform 0.3s cubic-bezier(0.16, 1, 0.3, 1),
    color 0.2s ease;
}

.overlay-fade-enter-from .menu-link,
.overlay-fade-leave-to .menu-link {
  opacity: 0;
  transform: translateY(12px);
}

/* Icon swap */
.icon-swap-enter-active,
.icon-swap-leave-active {
  transition: opacity 0.15s ease, transform 0.15s ease;
}
.icon-swap-enter-from {
  opacity: 0;
  transform: rotate(-45deg) scale(0.8);
}
.icon-swap-leave-to {
  opacity: 0;
  transform: rotate(45deg) scale(0.8);
}
</style>
