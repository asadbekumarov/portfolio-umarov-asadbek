export function useScrollAnimation() {
  let observer: IntersectionObserver | null = null;

  onMounted(() => {
    const elements = document.querySelectorAll<HTMLElement>('.scroll-animate');

    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -60px 0px',
      }
    );

    elements.forEach((el) => observer!.observe(el));
  });

  onUnmounted(() => {
    observer?.disconnect();
  });
}
