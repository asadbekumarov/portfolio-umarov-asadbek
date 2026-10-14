    <script setup lang="ts">
const { t } = useI18n();

useScrollAnimation();
useCursorSpotlight();
useParallaxScroll();

useSeoMeta({
    title: () => t('seo.title'),
    description: () => t('seo.description'),
    ogTitle: () => t('seo.og_title'),
    ogDescription: () => t('seo.og_description'),
    twitterTitle: () => t('seo.twitter_title'),
    twitterDescription: () => t('seo.twitter_description'),
});
</script>

<template>
    <div class="page-canvas">
        <!-- ───────────────────────────────────────────
             LAYER 1 — Kursor spotlight (CSS var dan)
             ─────────────────────────────────────────── -->
        <div class="cursor-spotlight" aria-hidden="true" />

        <!-- ───────────────────────────────────────────
             LAYER 2 — Ambient glow orbs (static, floating)
             ─────────────────────────────────────────── -->
        <div class="glow-orbs" aria-hidden="true">
            <!-- Yuqori chap — Electric Blue -->
            <div class="orb orb-blue-tl" />
            <!-- O'ng pastki — Indigo -->
            <div class="orb orb-indigo-br" />
            <!-- Markaz — nozik cyan -->
            <div class="orb orb-cyan-c" />
        </div>

        <!-- ───────────────────────────────────────────
             Skip to main content (accessibility)
             ─────────────────────────────────────────── -->
        <a
            href="#main-content"
            class="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100]
                   focus:px-4 focus:py-2 focus:rounded-lg focus:bg-[#0145F2] focus:text-white
                   focus:text-sm focus:font-semibold focus:shadow-lg"
        >
            Skip to main content
        </a>

        <AppNavbar />
        <main id="main-content">
             <HeroSection />
             <!-- Tech stack marquee — hero va about orasida semantik ko'prik -->
             <TechMarquee />
             <AboutSection />
             <div class="max-w-xs mx-auto h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" aria-hidden="true" />
             <SkillsSection />
             <div class="max-w-xs mx-auto h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" aria-hidden="true" />
             <ExperienceSection />
             <div class="max-w-xs mx-auto h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" aria-hidden="true" />
             <ProjectsSection />
             <div class="max-w-xs mx-auto h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" aria-hidden="true" />
            <EducationSection />
            <div class="max-w-xs mx-auto h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" aria-hidden="true" />
            <ContactSection />
        </main>
        <AppFooter />
    </div>
</template>

<style scoped>
/* ═══════════════════════════════════════════════════════
   Page canvas — relative stacking context
   ═══════════════════════════════════════════════════════ */
.page-canvas {
    position: relative;
    min-height: 100vh;
    isolation: isolate; /* glow lar boshqa stacking context larni kirkirlatmasin */
}

/* ═══════════════════════════════════════════════════════
   Cursor Spotlight
   CSS --spotlight-x / --spotlight-y — useCursorSpotlight
   composable orqali requestAnimationFrame da yangilanadi.
   ═══════════════════════════════════════════════════════ */
.cursor-spotlight {
    pointer-events: none;
    position: fixed;
    inset: 0;
    z-index: 0;
    /* Kursor o'rnidan radial gradient taraladi */
    background: radial-gradient(
        600px circle at var(--spotlight-x, -400px) var(--spotlight-y, -400px),
        rgba(1, 69, 242, 0.10) 0%,
        rgba(1, 69, 242, 0.04) 35%,
        transparent 70%
    );
    /* GPU layer — repaint bo'lmasin */
    will-change: background;
    transition: background 0.05s linear;
}

/* ═══════════════════════════════════════════════════════
   Glow Orbs wrapper
   ═══════════════════════════════════════════════════════ */
.glow-orbs {
    pointer-events: none;
    position: fixed;
    inset: 0;
    z-index: 0;
    overflow: hidden;
}

/* ── Bazaviy orb stili ── */
.orb {
    position: absolute;
    border-radius: 50%;
    filter: blur(100px);
    /* will-change: translate — standalone translate property ni GPU ga ko'taradi;
       transform animatsiyalari (orbDrift) bilan compose bo'ladi, konflikt yo'q. */
    will-change: translate, opacity;
}

/* ── Yuqori-chap: Electric Blue — eng kuchli ── */
.orb-blue-tl {
    width: 560px;
    height: 560px;
    top: -140px;
    left: -120px;
    background: radial-gradient(circle, rgba(1, 69, 242, 0.28) 0%, transparent 70%);
    animation:
        orbPulse 9s ease-in-out infinite,
        orbDrift 18s ease-in-out infinite;
    /*
     * JS fallback: --parallax-y ni useParallaxScroll composable yangilaydi.
     * Standalone `translate` orbDrift (transform) dan mustaqil compose bo'ladi —
     * transform qiymatini o'zgartirmaydi, ustiga qo'shiladi.
     * 0.18 koeffitsienti: asta-sekin yuqoriga ko'tariladi (orqada qoladi).
     */
    translate: 0 calc(var(--parallax-y, 0px) * -0.18);
}

/* ── O'ng-pastki: Deep Indigo ── */
.orb-indigo-br {
    width: 480px;
    height: 480px;
    bottom: -100px;
    right: -80px;
    background: radial-gradient(circle, rgba(79, 38, 220, 0.22) 0%, transparent 70%);
    animation:
        orbPulse 11s ease-in-out infinite 2s,
        orbDrift  22s ease-in-out infinite reverse;
    /* Teskari yo'nalishda: pastga tushadi — depth illusion kuchayadi */
    translate: 0 calc(var(--parallax-y, 0px) * 0.12);
}

/* ── Markaz: nozik Cyan ── */
.orb-cyan-c {
    width: 360px;
    height: 360px;
    top: 42%;
    left: 50%;
    /* Boshlang'ich markazlash — parallax translate bilan compose bo'ladi */
    transform: translate(-50%, -50%);
    background: radial-gradient(circle, rgba(0, 196, 255, 0.10) 0%, transparent 68%);
    animation:
        orbPulse 14s ease-in-out infinite 1s;
    /* Eng sekin siljiydi — uchta orb orasida chuqurlik gradiyenti hosil bo'ladi */
    translate: 0 calc(var(--parallax-y, 0px) * -0.08);
}

/* ════════════════════════════════════════════════════
   CSS Scroll-Driven Animations (Progressive Enhancement)
   Chrome 115+, Edge 115+. Firefox/Safari: JS fallback.

   MUHIM: animation-timeline VA animation-range — animation
   shorthand dan KEYIN yozilishi shart. Shorthand reset qiladi.
   ════════════════════════════════════════════════════ */
@supports (animation-timeline: scroll()) {
    @keyframes parallax-rise {
        from { translate: 0    0px; }
        to   { translate: 0 -180px; }
    }
    @keyframes parallax-sink {
        from { translate: 0   0px; }
        to   { translate: 0 120px; }
    }
    @keyframes parallax-slow {
        from { translate: 0   0px; }
        to   { translate: 0 -80px; }
    }

    /* orb-blue-tl: tez parallax — ko'proq "yaqin" hissiyot */
    .orb-blue-tl {
        /* 1. animation shorthand — orqasida timeline: auto bo'ladi */
        animation:
            orbPulse    9s  ease-in-out infinite,
            orbDrift    18s ease-in-out infinite,
            parallax-rise linear;
        /* 2. shorthand dan KEYIN override — bo'lmasac shorthand reset qiladi */
        animation-timeline: auto,   auto,   scroll(root block);
        animation-range:    normal, normal, 0% 100%;
        /* JS fallback translate o'chiriladi — CSS o'zi boshqaradi */
        translate: none;
    }

    /* orb-indigo-br: o'rta parallax — pastga siljiydi */
    .orb-indigo-br {
        animation:
            orbPulse    11s ease-in-out infinite 2s,
            orbDrift    22s ease-in-out infinite reverse,
            parallax-sink linear;
        animation-timeline: auto,   auto,   scroll(root block);
        animation-range:    normal, normal, 0% 100%;
        translate: none;
    }

    /* orb-cyan-c: eng sekin parallax — arka plan hissiyoti */
    .orb-cyan-c {
        animation:
            orbPulse     14s ease-in-out infinite 1s,
            parallax-slow linear;
        animation-timeline: auto,   scroll(root block);
        animation-range:    normal, 0% 100%;
        /* transform: translate(-50%, -50%) saqlash kerak — alohida qiymat */
        translate: none;
    }
}

/* ── Mobile performance optimization: disable heavy blur orbs on mobile devices ── */
@media (max-width: 768px) {
    .glow-orbs { display: none !important; }
    .cursor-spotlight { display: none !important; }
}

/* ── Vestibular trigger guard: reduced motion → hamma effektlar o'chiriladi ── */
@media (prefers-reduced-motion: reduce) {
    .orb {
        animation: none;
        translate: none !important;
    }
    .cursor-spotlight { display: none; }
}
</style>

