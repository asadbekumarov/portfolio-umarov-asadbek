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

  app: {
    head: {
      htmlAttrs: { lang: "uz" },
      title: "Asadbek Umarov — Portfolio",
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { name: "description", content: "Asadbek Umarov — Frontend & Mobile Developer. React, Next.js va React Native yordamida zamonaviy veb va mobil ilovalar yarataman." },
        { name: "theme-color", content: "#0145F2" },
        { name: "color-scheme", content: "dark" },
        { name: "apple-mobile-web-app-capable", content: "yes" },
        { name: "apple-mobile-web-app-status-bar-style", content: "black-translucent" },
        { property: "og:type", content: "website" },
        { property: "og:site_name", content: "Asadbek Umarov — Portfolio" },
        { property: "og:title", content: "Asadbek Umarov — Portfolio" },
        { property: "og:description", content: "Frontend & Mobile Developer — React, Next.js va React Native" },
        { property: "og:image", content: "/og-image.png" },
        { property: "og:locale", content: "uz_UZ" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: "Asadbek Umarov — Portfolio" },
        { name: "twitter:description", content: "Frontend & Mobile Developer — React, Next.js va React Native" },
        { name: "twitter:image", content: "/og-image.png" },
      ],
      link: [
        { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
        { rel: "apple-touch-icon", href: "/favicon.svg" },
      ],
    },
  },

  i18n: {
    locales: [
      { code: "uz", name: "O'zbek", iso: "uz-UZ", file: "uz.json" },
      { code: "en", name: "English", iso: "en-US", file: "en.json" },
    ],
    defaultLocale: "uz",
    strategy: "prefix",
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