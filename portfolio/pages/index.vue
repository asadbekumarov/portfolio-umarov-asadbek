<script setup lang="ts">
useScrollAnimation();

useHead({
    title: "Asadbek Umarov — Frontend Developer",
    meta: [
        {
            name: "description",
            content:
                "Frontend Developer specializing in React, TypeScript & Next.js. Building fast, modern, and user-friendly web applications. Based in Tashkent, Uzbekistan — open to remote opportunities worldwide.",
        },
    ],
});
</script>

<template>
    <div class="min-h-screen" style="background-color: #030712">
        <!-- Skip to main content accessibility link -->
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
             <div class="max-w-xs mx-auto h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" aria-hidden="true" />
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
