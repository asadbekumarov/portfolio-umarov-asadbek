<script setup lang="ts">
const { locale, locales, setLocale } = useI18n();
const router = useRouter();

const currentLocale = computed(() => locale.value);
const availableLocales = computed(() => {
  return locales.value.filter((loc) => loc.code !== currentLocale.value);
});

const showDropdown = ref(false);

const SCROLL_KEY = 'lang-switch-scroll';
const HASH_KEY = 'lang-switch-hash';

const restoreScroll = () => {
  const storedY = sessionStorage.getItem(SCROLL_KEY);
  if (storedY == null) return false;
  const y = Number(storedY);
  const storedHash = sessionStorage.getItem(HASH_KEY);

  if (storedHash && storedHash.length > 1 && typeof window !== 'undefined') {
    const el = document.getElementById(storedHash.slice(1));
    if (el) {
      el.scrollIntoView({ block: 'start', behavior: 'auto' });
    } else {
      window.scrollTo(0, y);
    }
  } else {
    window.scrollTo(0, y);
  }
  return true;
};

const cleanup = () => {
  sessionStorage.removeItem(SCROLL_KEY);
  sessionStorage.removeItem(HASH_KEY);
};

const switchLanguage = async (localeCode: string) => {
  const savedScrollY = window.scrollY;
  const savedHash = window.location.hash || '';
  sessionStorage.setItem(SCROLL_KEY, String(savedScrollY));
  if (savedHash) sessionStorage.setItem(HASH_KEY, savedHash);

  showDropdown.value = false;

  await setLocale(localeCode);

  // Scrollni router scroll resetidan keyin 2 bosqichda tiklash
  await nextTick();
  requestAnimationFrame(() => {
    if (restoreScroll()) {
      requestAnimationFrame(() => {
        restoreScroll();
        window.setTimeout(() => {
          restoreScroll();
          cleanup();
        }, 80);
      });
    }
  });
};

// Har qanday locale o'zgargandan keyin yana bir marta javobgarlik bilan tiklash
watch(() => locale.value, () => {
  nextTick(() => {
    requestAnimationFrame(() => {
      restoreScroll();
      window.setTimeout(() => {
        if (restoreScroll()) cleanup();
      }, 120);
    });
  });
}, { flush: 'post' });

// Router har bir navigatsiyadan keyin til o'zgarish bo'lsa scrollni tiklash
onMounted(() => {
  const handleClickOutside = (event: MouseEvent) => {
    const target = event.target as HTMLElement;
    if (!target.closest('.relative')) {
      showDropdown.value = false;
    }
  };

  document.addEventListener('click', handleClickOutside);

  onBeforeUnmount(() => {
    document.removeEventListener('click', handleClickOutside);
  });
});
</script>

<template>
  <div class="relative">
    <!-- Dropdown Button -->
    <button
      class="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg transition-colors duration-200
             bg-white/[0.04] border border-white/[0.08] text-slate-200
             hover:bg-white/[0.08] hover:border-white/[0.15]
             focus:outline-none"
      @click="showDropdown = !showDropdown"
      :aria-expanded="showDropdown"
      aria-haspopup="listbox"
    >
      <!-- Current Locale Code -->
      <span class="text-xs sm:text-sm font-semibold tracking-wide uppercase select-none">
        {{ currentLocale }}
      </span>
      <!-- Dropdown Arrow -->
      <svg
        class="w-3.5 h-3.5 text-slate-400 transition-transform duration-200 shrink-0"
        :class="{ 'rotate-180': showDropdown }"
        fill="none"
        stroke="currentColor"
        stroke-width="2.25"
        stroke-linecap="round"
        stroke-linejoin="round"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <polyline points="6 9 12 15 18 9" />
      </svg>
    </button>

    <!-- Dropdown Menu -->
    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="transform scale-95 opacity-0"
      enter-to-class="transform scale-100 opacity-100"
      leave-active-class="transition duration-75 ease-in"
      leave-from-class="transform scale-100 opacity-100"
      leave-to-class="transform scale-95 opacity-0"
    >
      <div
        v-if="showDropdown"
        class="absolute top-full right-0 mt-2 w-40 rounded-xl
               bg-[#0a1124]/95 backdrop-blur-md border border-white/[0.08] z-50"
        role="listbox"
      >
        <div class="py-1">
          <button
            v-for="loc in availableLocales"
            :key="loc.code"
            class="w-full flex items-center gap-3 px-3 py-2 text-sm transition-colors duration-150
                   text-slate-200 hover:bg-white/[0.08] focus:outline-none"
            @click="switchLanguage(loc.code)"
            role="option"
            :aria-selected="loc.code === currentLocale"
          >
            <!-- Language Code -->
            <span class="text-xs font-semibold tracking-wide uppercase w-7 shrink-0 text-slate-400">
              {{ loc.code }}
            </span>
            <!-- Language Name -->
            <span class="font-medium flex-1 text-left">
              {{ loc.name }}
            </span>
            <!-- Current Indicator -->
            <svg
              v-if="loc.code === currentLocale"
              class="w-4 h-4 text-[#0145F2] shrink-0"
              fill="none"
              stroke="currentColor"
              stroke-width="2.5"
              stroke-linecap="round"
              stroke-linejoin="round"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </button>
        </div>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.relative {
  position: relative;
}
</style>
