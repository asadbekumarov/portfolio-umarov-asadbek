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
        <AppNavbar />
        <main id="main-content">
             <HeroSection />
             <AboutSection />
             <SkillsSection />
             <ExperienceSection />
             <ProjectsSection />
            <EducationSection />
            <ContactSection />
        </main>
        <AppFooter />
    </div>
</template>
