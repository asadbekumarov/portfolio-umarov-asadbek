/**
 * useParallaxScroll
 *
 * Faqat CSS scroll-driven animations (animation-timeline: scroll())
 * qo'llab-quvvatlamaydigan brauzerlarda ishlaydi — JS fallback sifatida.
 *
 * Vazifasi: window.scrollY ni `--parallax-y` CSS custom property orqali
 * :root ga uzatish. CSS bu qiymatni `translate: 0 calc(var(--parallax-y) * N)`
 * ko'rinishida orblarga qo'llaydi — sof `transform` ga tegmaydi,
 * shuning uchun mavjud orbPulse / orbDrift animatsiyalar bilan compose bo'ladi.
 *
 * Har doim faqat transform/translate ni animate qiladi — layout o'zgarmaydi.
 * background-attachment: fixed ishlatilmaydi (iOS Safari muammosi).
 */
export function useParallaxScroll() {
  // SSR guard
  if (import.meta.server) return;

  onMounted(() => {
    // 1. Vestibular trigger — reduced motion so'ragan foydalanuvchida to'liq o'chirish
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mq.matches) return;

    // 2. CSS scroll-driven animations mavjud bo'lsa JS kerak emas —
    //    index.vue @supports bloki o'zi hal qiladi
    if (CSS.supports('animation-timeline', 'scroll()')) return;

    // 3. rAF-throttled scroll listener — passive: true → main thread bloklanmaydi
    let ticking = false;

    const update = () => {
      document.documentElement.style.setProperty(
        '--parallax-y',
        `${window.scrollY}px`,
      );
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(update);
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    update(); // Sahifa yuklanganda boshlang'ich qiymatni o'rnat

    // Cleanup
    onUnmounted(() => {
      window.removeEventListener('scroll', onScroll);
    });
  });
}
