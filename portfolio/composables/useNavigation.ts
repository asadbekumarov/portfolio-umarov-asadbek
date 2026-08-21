export function useNavigation() {
  const scrollToSection = (hash: string): void => {
    const el = document.querySelector(hash)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  const scrollToTop = (): void => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return { scrollToSection, scrollToTop }
}
