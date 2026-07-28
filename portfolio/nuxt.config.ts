// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: process.env.NODE_ENV !== "production" },
  telemetry: false,

  nitro: {
    preset: "vercel",
  },

  modules: ["@nuxtjs/tailwindcss", "@nuxtjs/i18n", // Modul shu yerga qo'shildi
  "nuxt-schema-org", "@nuxt/fonts"],

  i18n: {
    locales: [
      { code: "uz", name: "O'zbek", iso: "uz-UZ", file: "uz.json" },
      { code: "en", name: "English", iso: "en-US", file: "en.json" },
    ],
    defaultLocale: "uz",
    strategy: "prefix_except_default",
    langDir: "locales",
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: "i18n_redirected",
      alwaysRedirect: true,
      fallbackLocale: "uz",
    },
  },

  css: ["~/assets/css/main.css"],

  vite: {
    build: {
      rollupOptions: {
        external: []
      }
    }
  },

  experimental: {
    payloadExtraction: false,
    appManifest: false
  },
});