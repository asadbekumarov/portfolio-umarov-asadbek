<script setup lang="ts">
const { locale, locales, setLocale } = useI18n();

const currentLocale = computed(() => locale.value);
const availableLocales = computed(() => {
  return locales.value.filter((loc) => loc.code !== currentLocale.value);
});

const switchLanguage = (localeCode: string) => {
  setLocale(localeCode);
};

// Get locale path for navigation
const localePath = useLocalePath();

// Add reactive state for dropdown
const showDropdown = ref(false);

// Close dropdown when clicking outside
onMounted(() => {
  const handleClickOutside = (event: MouseEvent) => {
    const target = event.target as HTMLElement;
    if (!target.closest('.relative')) {
      showDropdown.value = false;
    }
  };

  document.addEventListener('click', handleClickOutside);
  
  onUnmounted(() => {
    document.removeEventListener('click', handleClickOutside);
  });
});
</script>

<template>
  <div class="relative">
    <!-- Dropdown Button -->
    <button
      class="flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-200 bg-slate-800/50 border border-slate-700/50 hover:bg-slate-700/50 hover:border-slate-600/50 focus:outline-none focus:ring-2 focus:ring-sky-500/50 focus:ring-offset-2 focus:ring-offset-slate-900"
      @click="showDropdown = !showDropdown"
      :aria-expanded="showDropdown"
      aria-haspopup="listbox"
    >
      <!-- Current Locale Flag/Icon -->
      <div class="flex items-center gap-2">
        <span class="text-sm font-medium text-slate-200">
          {{ currentLocale === 'uz' ? '🇺🇿 UZ' : '🇺🇸 EN' }}
        </span>
        <!-- Dropdown Arrow -->
        <svg
          class="w-4 h-4 text-slate-400 transition-transform duration-200"
          :class="{ 'rotate-180': showDropdown }"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>
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
        class="absolute top-full left-0 mt-2 w-48 bg-slate-800/95 backdrop-blur-lg border border-slate-700/50 rounded-lg shadow-xl z-50"
        role="listbox"
      >
        <div class="py-1">
          <button
            v-for="loc in availableLocales"
            :key="loc.code"
            class="w-full flex items-center gap-3 px-3 py-2 text-sm transition-colors duration-150 hover:bg-slate-700/50 focus:outline-none focus:bg-slate-700/50"
            @click="switchLanguage(loc.code)"
            role="option"
            :aria-selected="loc.code === currentLocale"
          >
            <!-- Language Flag -->
            <span class="text-lg">
              {{ loc.code === 'uz' ? '🇺🇿' : '🇺🇸' }}
            </span>
            <!-- Language Name -->
            <span class="font-medium text-slate-200">
              {{ loc.name }}
            </span>
            <!-- Current Indicator -->
            <svg
              v-if="loc.code === currentLocale"
              class="w-4 h-4 text-sky-500 ml-auto"
              fill="currentColor"
              viewBox="0 0 20 20"
              aria-hidden="true"
            >
              <path
                fill-rule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clip-rule="evenodd"
              />
            </svg>
          </button>
        </div>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
/* Additional styles if needed */
.relative {
  position: relative;
}

/* Smooth transitions */
.transition-all {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}

/* Focus styles */
.focus\:ring-2:focus {
  --tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);
  --tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color);
  box-shadow: var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow, 0 0 #0000);
}

/* Backdrop blur */
.backdrop-blur-lg {
  --tw-backdrop-blur: blur(16px);
  backdrop-filter: var(--tw-backdrop-blur) var(--tw-backdrop-brightness) var(--tw-backdrop-contrast) var(--tw-backdrop-grayscale) var(--tw-backdrop-hue-rotate) var(--tw-backdrop-invert) var(--tw-backdrop-opacity) var(--tw-backdrop-saturate) var(--tw-backdrop-sepia);
}
</style>
