/**
 * useCursorSpotlight
 * Kursorga ergashuvchi mayin Electric Blue nurini body background orqali
 * CSS custom property (--cx, --cy) ko'rinishida render qiladi.
 * GPU compositing uchun faqat CSS custom property yangilanadi —
 * DOM qayta render bo'lmaydi, brauzerni qotirmaydi.
 */
export function useCursorSpotlight() {
  if (import.meta.server) return;

  const raf = { id: 0 };
  // Target & current — smooth lerp uchun
  let tx = -200,
    ty = -200;
  let cx = -200,
    cy = -200;
  const LERP = 0.075; // [0..1] — qancha yumshoq ergashsin

  const setProps = () => {
    document.documentElement.style.setProperty('--spotlight-x', `${cx}px`);
    document.documentElement.style.setProperty('--spotlight-y', `${cy}px`);
  };

  const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

  const tick = () => {
    cx = lerp(cx, tx, LERP);
    cy = lerp(cy, ty, LERP);
    setProps();
    raf.id = requestAnimationFrame(tick);
  };

  const onMove = (e: MouseEvent) => {
    tx = e.clientX;
    ty = e.clientY;
  };

  onMounted(() => {
    const isPointerFine =
      typeof window !== 'undefined' &&
      window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    if (!isPointerFine) return;

    window.addEventListener('mousemove', onMove, { passive: true });
    raf.id = requestAnimationFrame(tick);
  });

  onUnmounted(() => {
    window.removeEventListener('mousemove', onMove);
    if (raf.id) cancelAnimationFrame(raf.id);
  });
}
