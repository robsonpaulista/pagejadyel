import type Lenis from "lenis";

let lenisInstance: Lenis | null = null;

export function setLenisInstance(instance: Lenis | null): void {
  lenisInstance = instance;
}

export function getLenisScroll(): number {
  return lenisInstance?.scroll ?? window.scrollY;
}

type ScrollToOptions = {
  offset?: number;
  duration?: number;
  immediate?: boolean;
  onComplete?: () => void;
};

/**
 * Scroll confiável com Lenis (usa scroll virtual + getBoundingClientRect).
 */
export function scrollToElement(
  element: HTMLElement,
  options?: ScrollToOptions,
): void {
  const offset = options?.offset ?? 0;
  const duration = options?.duration ?? 1.05;
  const immediate = options?.immediate ?? false;
  const onComplete = options?.onComplete;

  if (lenisInstance) {
    const y =
      lenisInstance.scroll + element.getBoundingClientRect().top + offset;

    lenisInstance.scrollTo(y, {
      immediate,
      duration: immediate ? undefined : duration,
      programmatic: true,
      force: true,
      onComplete,
    });
    return;
  }

  const top =
    element.getBoundingClientRect().top + window.scrollY + offset;
  window.scrollTo({ top, behavior: immediate ? "auto" : "smooth" });
  if (onComplete) {
    window.setTimeout(onComplete, immediate ? 0 : duration * 1000);
  }
}
