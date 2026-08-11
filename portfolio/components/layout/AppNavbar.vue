<script setup lang="ts">
const { t } = useI18n()

import { navLinks } from '~/data';

const isMenuOpen = ref(false)
const isScrolled = ref(false)
let lockedScrollY = 0

watch(isMenuOpen, (open) => {
  if (open) {
    lockedScrollY = window.scrollY
    document.body.style.position = 'fixed'
    document.body.style.top = `-${lockedScrollY}px`
    document.body.style.left = '0'
    document.body.style.right = '0'
    document.body.style.width = '100%'
    document.body.style.overflow = 'hidden'
    document.documentElement.style.overflow = 'hidden'
  } else {
    document.body.style.position = ''
    document.body.style.top = ''
    document.body.style.left = ''
    document.body.style.right = ''
    document.body.style.width = ''
    document.body.style.overflow = ''
    document.documentElement.style.overflow = ''
    window.scrollTo(0, lockedScrollY)
  }
})



const handleScroll = (): void => {
  isScrolled.value = window.scrollY > 24
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})

const scrollToTop = (): void => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const scrollToSection = (href: string): void => {
  isMenuOpen.value = false
  const el = document.querySelector(href)
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' })
  }
}
</script>

<template>
  <nav
    :class="[
      'fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-none outline-none',
      isScrolled ? 'py-3' : 'py-4 sm:py-5',
    ]"
    :style="
      isScrolled
        ? 'background: rgba(8, 13, 26, 0.92); backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px); box-shadow: 0 10px 30px -10px rgba(0,0,0,0.5);'
        : 'background: transparent;'
    "
    role="navigation"
    aria-label="Main navigation"
  >
    <div class="section-container">
      <div class="relative z-50 flex items-center justify-between gap-3">
        <!-- Logo -->
        <a
          href="#"
          class="group flex items-center gap-2.5 focus-visible:outline-none shrink-0"
          aria-label="Asadbek Umarov — back to top"
          @click.prevent="scrollToTop"
        >
          <div
            class="w-8 h-8 sm:w-9 sm:h-9 rounded-xl flex items-center justify-center text-[11px] sm:text-xs font-black select-none text-white"
            style="
              background-color: #0145F2;
            "
            aria-hidden="true"
          >
            AU
          </div>
          <span class="hidden sm:block text-base font-bold tracking-wide text-white">
            Asadbek Umarov
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

        <!-- Mobile / Tablet -->
        <div class="flex lg:hidden items-center gap-2 sm:gap-3">
          <LanguageSwitcher />
          <button
            class="p-2 rounded-xl transition-all duration-200 hover:bg-white/5 text-slate-200 border-none outline-none"
            :aria-label="isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'"
            :aria-expanded="isMenuOpen"
            aria-controls="mobile-menu"
            @click="isMenuOpen = !isMenuOpen"
          >
            <Transition name="icon-swap" mode="out-in">
              <svg
                v-if="!isMenuOpen"
                key="open"
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                aria-hidden="true"
              >
                <path d="M3 12h18M3 6h18M3 18h18" />
              </svg>
              <svg
                v-else
                key="close"
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                aria-hidden="true"
              >
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </Transition>
          </button>
        </div>
      </div>
    </div>

    <!-- Fullscreen Overlay Menu -->
    <Transition name="overlay-fade" :duration="{ enter: 850, leave: 250 }">
      <div
        v-if="isMenuOpen"
        id="mobile-menu"
        class="lg:hidden fixed inset-0 z-40 flex flex-col h-[100dvh] overflow-hidden overscroll-none hide-scrollbar"
        style="background: #080d1a; touch-action: none;"
      >
        <!-- Grid texture -->
        <div
          class="pointer-events-none absolute inset-0 opacity-[0.06]"
          style="
            background-image: linear-gradient(#fff 1px, transparent 1px),
              linear-gradient(90deg, #fff 1px, transparent 1px);
            background-size: 48px 48px;
          "
          aria-hidden="true"
        />

        <!-- Soft glow -->
        <div
          class="pointer-events-none absolute -top-24 -right-24 w-72 h-72 rounded-full opacity-20 blur-3xl"
          style="background: #0145F2;"
          aria-hidden="true"
        />

        <div
          class="relative flex flex-col h-full pt-20 sm:pt-24 pb-6 px-5 sm:px-6"
          style="padding-bottom: max(1.5rem, env(safe-area-inset-bottom));"
        >
          <ul class="flex flex-col justify-center flex-1 gap-0.5 sm:gap-1" role="list">
            <li
              v-for="(link, index) in navLinks"
              :key="link.href"
              class="overflow-hidden"
            >
              <a
                :href="link.href"
                :style="{
                  transitionDelay: isMenuOpen ? `${80 + index * 60}ms` : '0ms',
                }"
                class="menu-link group flex items-baseline gap-3 sm:gap-4 py-2.5 sm:py-3 border-b border-white/5"
                @click.prevent="scrollToSection(link.href)"
              >
                <span
                  class="text-[11px] sm:text-xs font-mono tabular-nums text-[#0145F2] w-5 sm:w-6 shrink-0"
                  aria-hidden="true"
                >
                  {{ String(index + 1).padStart(2, '0') }}
                </span>
                <span
                  class="text-xl xs:text-2xl sm:text-3xl font-bold tracking-tight text-white transition-colors duration-200 group-hover:text-[#0145F2]"
                >
                  {{ t(link.labelKey) }}
                </span>
              </a>
            </li>
          </ul>

          <div class="relative pt-4 border-t border-white/5">
            <span class="text-xs text-slate-500 font-mono">AU © 2026</span>
          </div>
        </div>
      </div>
    </Transition>
  </nav>
</template>

<style scoped>
/* Scrollbarni to‘liq yashirish */
.hide-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
  overscroll-behavior: none;
}

.hide-scrollbar::-webkit-scrollbar {
  display: none;
  width: 0;
  height: 0;
  background: transparent;
}

#mobile-menu {
  overflow: hidden !important;
  overscroll-behavior: none;
  touch-action: none;
}

/* Overlay animatsiya */
.overlay-fade-enter-active {
  transition: opacity 0.35s ease;
}
.overlay-fade-leave-active {
  transition: opacity 0.25s ease;
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
    opacity 0.35s ease,
    transform 0.35s cubic-bezier(0.16, 1, 0.3, 1),
    color 0.2s ease;
}

.overlay-fade-enter-from .menu-link,
.overlay-fade-leave-to .menu-link {
  opacity: 0;
  transform: translateY(16px);
}

/* Icon swap */
.icon-swap-enter-active,
.icon-swap-leave-active {
  transition: opacity 0.12s ease, transform 0.12s ease;
}
.icon-swap-enter-from {
  opacity: 0;
  transform: rotate(-45deg) scale(0.7);
}
.icon-swap-leave-to {
  opacity: 0;
  transform: rotate(45deg) scale(0.7);
}
</style>
