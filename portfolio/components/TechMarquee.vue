<script setup lang="ts">
/**
 * TechMarquee
 *
 * Seamless loop qoidasi:
 *  - Kontent aniq 2 marta takrorlanadi (flat list — group wrapper yo'q).
 *  - .marquee-track da CSS gap bilan barcha itemlar orasida bir xil masofa.
 *  - translateX(-50%) = birinchi nusxaning kengligi + ikkinchi nusxa boshidan
 *    to'liq bir nusxa o'tganda qiymat aynan 50% bo'ladi — uzilish yo'q.
 *  - Muammo bo'lgan .marquee-group wrapper olib tashlandi:
 *    u ikkita group orasida hisob-kitob chiqmagan bo'shliq qoldirardi.
 */

const topItems = [
  { name: 'React.js', icon: '/icons/react.svg' },
  { name: 'Next.js', icon: '/icons/nextjs.svg' },
  { name: 'TypeScript', icon: '/icons/typescript.svg' },
  { name: 'JavaScript', icon: '/icons/javascript.svg' },
  { name: 'Tailwind CSS', icon: '/icons/tailwind.svg' },
  { name: 'React Native', icon: '/icons/react-native.svg' },
  { name: 'HTML5', icon: '/icons/html5.svg' },
  { name: 'CSS3', icon: '/icons/css3.svg' },
  { name: 'Vue.js', icon: '/icons/vue.svg' },
  { name: 'Nuxt', icon: '/icons/nuxt.svg' },
];

const bottomItems = [
  { name: 'Git', icon: '/icons/git.svg' },
  { name: 'GitHub', icon: '/icons/github.svg' },
  { name: 'Redux Toolkit', icon: '/icons/redux.svg' },
  { name: 'Figma', icon: '/icons/figma.svg' },
  { name: 'VS Code', icon: '/icons/vscode.svg' },
  { name: 'npm', icon: '/icons/npm.svg' },
  { name: 'CSS Modules', icon: '/icons/cssmodules.svg' },
  { name: 'Expo', icon: '/icons/expo.svg' },
  { name: 'Supabase', icon: '/icons/supabase.svg' },
  { name: 'Vercel', icon: '/icons/vercel.svg' },
];
</script>

<template>
  <section class="marquee-section" aria-label="Technology stack showcase">
    <!-- ── Top row: left → right ── -->
    <div class="marquee-track-wrap" aria-hidden="true">
      <ul class="marquee-track marquee-ltr" role="list">
        <!--
          FLAT list — group wrapper yo'q.
          Gap hamma item orasida bir xil: na birinchi nusxaning oxiri,
          na ikkinchi nusxaning boshi alohida hisob-kitobsiz to'g'ri ishlaydi.
          translateX(-50%) = N ta item + (N-1) ta gap = birinchi nusxaning kengligi.
        -->
        <li
          v-for="(item, i) in [...topItems, ...topItems]"
          :key="`top-${i}`"
          class="marquee-item"
          :aria-hidden="i >= topItems.length ? 'true' : undefined"
        >
          <img
            :src="item.icon"
            :alt="item.name"
            width="20"
            height="20"
            loading="lazy"
            draggable="false"
            class="marquee-icon"
          />
          <span class="marquee-label">{{ item.name }}</span>
        </li>
      </ul>
    </div>

    <!-- ── Bottom row: right → left ── -->
    <div class="marquee-track-wrap" aria-hidden="true">
      <ul class="marquee-track marquee-rtl" role="list">
        <li
          v-for="(item, i) in [...bottomItems, ...bottomItems]"
          :key="`bot-${i}`"
          class="marquee-item"
          :aria-hidden="i >= bottomItems.length ? 'true' : undefined"
        >
          <img
            :src="item.icon"
            :alt="item.name"
            width="20"
            height="20"
            loading="lazy"
            draggable="false"
            class="marquee-icon"
          />
          <span class="marquee-label">{{ item.name }}</span>
        </li>
      </ul>
    </div>
  </section>
</template>

<style scoped>
/* ── Section ── */
.marquee-section {
  padding-block: 2.5rem;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  /* Edge fade — chap va o'ng tomonni xira qiladi */
  -webkit-mask-image: linear-gradient(
    to right,
    transparent 0%,
    black 10%,
    black 90%,
    transparent 100%
  );
  mask-image: linear-gradient(
    to right,
    transparent 0%,
    black 10%,
    black 90%,
    transparent 100%
  );
}

/* ── Track wrapper: overflow clip + hover pause ── */
.marquee-track-wrap {
  overflow: hidden;
}
.marquee-track-wrap:hover .marquee-track {
  animation-play-state: paused;
}

/* ── Track: FLAT flex list, gap bir xil ── */
.marquee-track {
  display: flex;
  align-items: center;
  /*
   * GAP — bu qiymat barcha item orasida, jumladan birinchi va ikkinchi
   * nusxa orasida ham bir xil bo'ladi. Shu tufayli loop seamless.
   */
  gap: 0.625rem;
  width: max-content;
  list-style: none;
  margin: 0;
  padding: 0;
  will-change: transform;
}

/* ── LTR: chapdan o'ngga ── */
.marquee-ltr {
  animation: marquee-ltr 32s linear infinite;
}

/* ── RTL: o'ngdan chapga ── */
.marquee-rtl {
  animation: marquee-rtl 38s linear infinite;
}

/*
 * translateX(-50%):
 *   Jami kenglik = 2 × (N items × item-width + (N-1) × gap)
 *   -50% = birinchi nusxa kengligi (gap shu kengilikka kiradi).
 *   Animatsiya tugaganda ikkinchi nusxa aynan birinchi nusxa turgan
 *   joyda bo'ladi → uzilish yo'q.
 */
@keyframes marquee-ltr {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-50%);
  }
}

@keyframes marquee-rtl {
  from {
    transform: translateX(-50%);
  }
  to {
    transform: translateX(0);
  }
}

/* ── Item ── */
.marquee-item {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  padding: 0.375rem 0.825rem;
  border-radius: 0.5rem;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.07);
  white-space: nowrap;
  flex-shrink: 0;
  cursor: default;
  transition:
    border-color 0.2s ease,
    background 0.2s ease;
}
.marquee-item:hover {
  border-color: rgba(1, 69, 242, 0.4);
  background: rgba(1, 69, 242, 0.09);
}

/* ── Icon ── */
.marquee-icon {
  width: 18px;
  height: 18px;
  object-fit: contain;
  flex-shrink: 0;
  opacity: 0.85;
  transition: opacity 0.2s ease;
}
.marquee-item:hover .marquee-icon {
  opacity: 1;
}

/* ── Label ── */
.marquee-label {
  font-size: 0.8rem;
  font-weight: 500;
  color: #6e83a0;
  transition: color 0.2s ease;
  user-select: none;
}
.marquee-item:hover .marquee-label {
  color: #c0d2ec;
}

/* ── prefers-reduced-motion ── */
@media (prefers-reduced-motion: reduce) {
  .marquee-track {
    animation: none !important;
    transform: none !important;
    flex-wrap: wrap;
    width: auto;
  }
  /* Ikkinchi nusxani (dublikat) yashiramiz */
  .marquee-item:nth-child(n + 11) {
    display: none;
  }
  .marquee-section {
    -webkit-mask-image: none;
    mask-image: none;
  }
}
</style>
