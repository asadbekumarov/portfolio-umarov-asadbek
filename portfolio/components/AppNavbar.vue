<script setup lang="ts">
const { t } = useI18n();

interface NavLink {
    labelKey: string;
    href: string;
}

const isMenuOpen = ref(false);
const isScrolled = ref(false);

const navLinks: NavLink[] = [
    { labelKey: "nav.about", href: "#about" },
    { labelKey: "nav.skills", href: "#skills" },
    { labelKey: "nav.experience", href: "#experience" },
    { labelKey: "nav.projects", href: "#projects" },
    { labelKey: "nav.education", href: "#education" },
    { labelKey: "nav.contact", href: "#contact" },
];

const handleScroll = (): void => {
    isScrolled.value = window.scrollY > 24;
};

onMounted(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
});

onUnmounted(() => {
    window.removeEventListener("scroll", handleScroll);
});

const scrollToTop = (): void => {
    window.scrollTo({ top: 0, behavior: "smooth" });
};

const scrollToSection = (href: string): void => {
    isMenuOpen.value = false;
    const el = document.querySelector(href);
    if (el) {
        el.scrollIntoView({ behavior: "smooth" });
    }
};
</script>

<template>
    <nav
        :class="[
            'fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-none outline-none',
            isScrolled ? 'py-3' : 'py-5',
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
            <div class="flex items-center justify-between">
                <!-- ── Logo (Electric Blue) ── -->
                <a
                    href="#"
                    class="group flex items-center gap-2.5 focus-visible:outline-none"
                    aria-label="Asadbek Umarov — back to top"
                    @click.prevent="scrollToTop"
                >
                    <div
                        class="w-9 h-9 rounded-xl flex items-center justify-center text-xs font-black select-none transition-all duration-300 group-hover:scale-105 text-white"
                        style="
                            background-color: #0145F2;
                            box-shadow: 0 4px 14px rgba(1, 69, 242, 0.4);
                        "
                        aria-hidden="true"
                    >
                        AU
                    </div>
                </a>

                <!-- ── Desktop Navigation ── -->
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

                <!-- ── Desktop CTA & Language ── -->
                <div class="hidden md:flex items-center gap-5">
                    <LanguageSwitcher />
                </div>

                <!-- ── Mobile: Hamburger ── -->
                <button
                    class="md:hidden p-2 rounded-xl transition-all duration-200 hover:bg-white/5 text-slate-200 border-none outline-none"
                    :aria-label="
                        isMenuOpen
                            ? 'Close navigation menu'
                            : 'Open navigation menu'
                    "
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

        <!-- ── Mobile Drawer ── -->
        <Transition name="slide-down">
            <div
                v-if="isMenuOpen"
                id="mobile-menu"
                class="md:hidden mx-4 mt-2 rounded-2xl overflow-hidden shadow-2xl border-none"
                style="background: #0d1529;"
            >
                <ul class="flex flex-col p-3 gap-0.5" role="list">
                    <li v-for="link in navLinks" :key="link.href">
                        <a
                            :href="link.href"
                            class="flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 hover:bg-white/5 font-medium text-sm text-slate-200 hover:text-[#0145F2]"
                            @click.prevent="scrollToSection(link.href)"
                        >
                            <span
                                class="w-1.5 h-1.5 rounded-full flex-shrink-0"
                                style="background: #0145F2"
                                aria-hidden="true"
                            />
                            {{ t(link.labelKey) }}
                        </a>
                    </li>
                </ul>

                <div class="px-3 pb-3">
                    <div class="mb-4 flex justify-center">
                        <LanguageSwitcher />
                    </div>
                </div>
            </div>
        </Transition>
    </nav>
</template>

<style scoped>
/* Transitsiya effektlari */
.slide-down-enter-active,
.slide-down-leave-active {
    transition: opacity 0.22s ease, transform 0.22s cubic-bezier(0.4, 0, 0.2, 1);
}
.slide-down-enter-from,
.slide-down-leave-to {
    opacity: 0;
    transform: translateY(-10px) scale(0.97);
}

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
