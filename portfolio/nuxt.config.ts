// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: false },
  telemetry: false,

  components: [
    {
      path: '~/components',
      pathPrefix: false,
    },
  ],

  runtimeConfig: {
    public: {
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL || 'https://portfolio-umarov-asadbek.vercel.app',
    }
  },

  nitro: {
    preset: process.env.VERCEL ? "vercel" : (process.env.NITRO_PRESET || "node-server"),
    compressPublicAssets: true,
    prerender: {
      crawlLinks: true,
      routes: ["/uz", "/en"],
    },
    routeRules: {
      "/_nuxt/**": { headers: { "cache-control": "public, max-age=31536000, immutable" } },
      "/fonts/**": { headers: { "cache-control": "public, max-age=31536000, immutable" } },
      "/**/*.webp": { headers: { "cache-control": "public, max-age=31536000, immutable" } },
      "/**/*.png": { headers: { "cache-control": "public, max-age=31536000, immutable" } },
      "/**/*.svg": { headers: { "cache-control": "public, max-age=31536000, immutable" } },
    },
  },

  modules: [
    "@nuxtjs/tailwindcss",
    "@nuxtjs/i18n",
    "nuxt-schema-org",
    "@nuxt/fonts"
  ],

  features: {
    inlineStyles: true,
  },

  fonts: {
    families: [
      { name: 'Space Grotesk', weights: [500, 700, 800], display: 'swap' },
      { name: 'Inter', weights: [400, 500, 600, 700], display: 'optional' },
    ],
    defaults: {
      weights: [400, 500, 600, 700],
      styles: ['normal'],
      subsets: ['latin'],
    },
  },

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
    lazy: true,
    langDir: "locales",
    locales: [
      { code: "uz", name: "O'zbek", iso: "uz-UZ", file: "uz.json" },
      { code: "en", name: "English", iso: "en-US", file: "en.json" },
    ],
    defaultLocale: "uz",
    strategy: "prefix",
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