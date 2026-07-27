<script setup lang="ts">
const { t, locale } = useI18n();
const route = useRoute();

// Dynamic SEO meta tags
const seoData = computed(() => ({
  title: t('seo.title'),
  description: t('seo.description'),
  author: t('seo.author'),
  keywords: t('seo.keywords'),
  ogTitle: t('seo.og_title'),
  ogDescription: t('seo.og_description'),
  twitterTitle: t('seo.twitter_title'),
  twitterDescription: t('seo.twitter_description'),
  currentLocale: locale.value,
  canonicalUrl: `https://portfolio-umarov-asadbek.vercel.app${route.path}`,
}));

// Set SEO head
useHead({
  title: seoData.value.title,
  htmlAttrs: {
    lang: seoData.value.currentLocale === 'uz' ? 'uz-UZ' : 'en-US',
  },
  meta: [
    { charset: 'utf-8' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    { name: 'description', content: seoData.value.description },
    { name: 'author', content: seoData.value.author },
    { name: 'keywords', content: seoData.value.keywords },
    { name: 'robots', content: 'index, follow' },
    { name: 'theme-color', content: '#0284c7' },
    
    // Open Graph
    { property: 'og:type', content: 'website' },
    { property: 'og:title', content: seoData.value.ogTitle },
    { property: 'og:description', content: seoData.value.ogDescription },
    { property: 'og:locale', content: seoData.value.currentLocale === 'uz' ? 'uz_UZ' : 'en_US' },
    { property: 'og:url', content: seoData.value.canonicalUrl },
    
    // Twitter / X
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: seoData.value.twitterTitle },
    { name: 'twitter:description', content: seoData.value.twitterDescription },
    
    // Additional SEO
    { name: 'format-detection', content: 'telephone=no' },
    { name: 'msapplication-TileColor', content: '#0284c7' },
    { name: 'application-name', content: seoData.value.title },
  ],
  link: [
    { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
    { rel: 'canonical', href: seoData.value.canonicalUrl },
    { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
    { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
    { 
      rel: 'stylesheet', 
      href: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap' 
    },
  ],
});

// JSON-LD structured data for SEO
useSchemaOrg([
  {
    '@type': 'Person',
    name: 'Asadbek Umarov',
    jobTitle: 'Junior Frontend Developer',
    description: seoData.value.description,
    url: seoData.value.canonicalUrl,
    sameAs: [
      'https://www.linkedin.com/in/asadbek-umarov-ab9385376',
      'https://portfolio-umarov-asadbek.vercel.app'
    ],
    knowsAbout: ['React', 'TypeScript', 'Next.js', 'Nuxt', 'Vue.js', 'Frontend Development'],
    worksFor: {
      '@type': 'Organization',
      name: 'Freelance'
    },
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Tashkent',
      addressCountry: 'Uzbekistan'
    }
  }
]);
</script>

<template>
  <NuxtPage />
</template>
