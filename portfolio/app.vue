<script setup lang="ts">
const { t, locale } = useI18n();
const route = useRoute();
const config = useRuntimeConfig();

const seoData = computed(() => ({
  title: t("seo.title"),
  description: t("seo.description"),
  author: t("seo.author"),
  keywords: t("seo.keywords"),

  ogTitle: t("seo.og_title"),
  ogDescription: t("seo.og_description"),

  ogImage:
    `${config.public.siteUrl}/og-image.png`,

  twitterTitle: t("seo.twitter_title"),
  twitterDescription: t("seo.twitter_description"),

  currentLocale: locale.value,

  canonicalUrl:
    `${config.public.siteUrl}${route.path}`,
}));

useHead(() => ({
  title: seoData.value.title,

  htmlAttrs: {
    lang: seoData.value.currentLocale === "uz" ? "uz-UZ" : "en-US",
  },

  meta: [
    { charset: "utf-8" },
    {
      name: "viewport",
      content: "width=device-width, initial-scale=1",
    },
    {
      name: "description",
      content: seoData.value.description,
    },
    {
      name: "author",
      content: seoData.value.author,
    },
    {
      name: "keywords",
      content: seoData.value.keywords,
    },
    {
      name: "robots",
      content: "index, follow",
    },
    {
      name: "theme-color",
      content: "#0284c7",
    },

    {
      property: "og:type",
      content: "website",
    },
    {
      property: "og:title",
      content: seoData.value.ogTitle,
    },
    {
      property: "og:description",
      content: seoData.value.ogDescription,
    },
    {
      property: "og:locale",
      content: seoData.value.currentLocale === "uz" ? "uz_UZ" : "en_US",
    },
    {
      property: "og:url",
      content: seoData.value.canonicalUrl,
    },
    {
      property: "og:image",
      content: seoData.value.ogImage,
    },
    {
      property: "og:image:width",
      content: "1200",
    },
    {
      property: "og:image:height",
      content: "630",
    },
    {
      property: "og:image:alt",
      content: "Asadbek Umarov Portfolio Preview",
    },

    {
      property: "og:site_name",
      content: "Asadbek Umarov Portfolio",
    },

    {
      name: "twitter:card",
      content: "summary_large_image",
    },
    {
      name: "twitter:title",
      content: seoData.value.twitterTitle,
    },
    {
      name: "twitter:description",
      content: seoData.value.twitterDescription,
    },
    {
      name: "twitter:image",
      content: seoData.value.ogImage,
    },

    {
      name: "format-detection",
      content: "telephone=no",
    },
    {
      name: "application-name",
      content: seoData.value.title,
    },
  ],

  link: [
    {
      rel: "icon",
      type: "image/svg+xml",
      href: "/favicon.svg",
    },
    {
      rel: "canonical",
      href: seoData.value.canonicalUrl,
    },
  ],
}));


// JSON-LD structured data
useSchemaOrg([
  {
    "@type": "Person",

    name: "Asadbek Umarov",

    jobTitle: "Frontend Developer",

    description:
      seoData.value.description,

    url:
      seoData.value.canonicalUrl,

    sameAs: [
      "https://www.linkedin.com/in/asadbek-umarov-ab9385376",
      config.public.siteUrl,
    ],

    knowsAbout: [
      "React",
      "TypeScript",
      "Next.js",
      "Nuxt",
      "Vue.js",
      "Frontend Development",
    ],

    worksFor: {
      "@type": "Organization",
      name: "Freelance",
    },

    address: {
      "@type": "PostalAddress",
      addressLocality: "Tashkent",
      addressCountry: "Uzbekistan",
    },
  },
]);
</script>


<template>
  <NuxtPage />
</template>