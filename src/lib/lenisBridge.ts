import type Lenis from "lenis";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let lenisInstance: Lenis | null = null;
/** Contador: >0 enquanto um scrollToElement está em andamento */
let programmaticDepth = 0;
/** Mantém o “congelamento” visual um pouco após o salto */
let jumpFreezeTimer: number | null = null;

export function setLenisInstance(instance: Lenis | null): void {
  lenisInstance = instance;
}

export function getLenisScroll(): number {
  return lenisInstance?.scroll ?? window.scrollY;
}

/** True durante salto de menu / handoff — ignore triggers de scrub. */
export function isProgrammaticScroll(): boolean {
  return programmaticDepth > 0;
}

/** Recalcula Lenis + ScrollTrigger após unlock de overflow (splash/menu). */
export function refreshScrollLayout(): void {
  lenisInstance?.resize();
  ScrollTrigger.refresh();
}

function setJumpFreeze(active: boolean, holdMs = 0): void {
  if (jumpFreezeTimer !== null) {
    window.clearTimeout(jumpFreezeTimer);
    jumpFreezeTimer = null;
  }

  if (active) {
    document.documentElement.classList.add("menu-jumping");
    window.dispatchEvent(new Event("menu-jump"));
    return;
  }

  if (holdMs > 0) {
    jumpFreezeTimer = window.setTimeout(() => {
      jumpFreezeTimer = null;
      if (programmaticDepth === 0) {
        document.documentElement.classList.remove("menu-jumping");
      }
    }, holdMs);
    return;
  }

  document.documentElement.classList.remove("menu-jumping");
}

type ScrollToOptions = {
  offset?: number;
  duration?: number;
  immediate?: boolean;
  onComplete?: () => void;
};

/**
 * Scroll confiável com Lenis.
 * Em saltos de menu (immediate), congela handoffs/scrub para não “passar” pelos efeitos.
 */
export function scrollToElement(
  element: HTMLElement,
  options?: ScrollToOptions,
): void {
  const offset = options?.offset ?? 0;
  const duration = options?.duration ?? 1.05;
  const immediate = options?.immediate ?? false;
  const onComplete = options?.onComplete;

  programmaticDepth += 1;
  let settled = false;

  if (immediate) {
    setJumpFreeze(true);
  }

  const settle = () => {
    if (settled) return;
    settled = true;
    programmaticDepth = Math.max(0, programmaticDepth - 1);
    if (immediate) {
      // Dá tempo do scroll/sticky assentarem sem disparar handoffs
      setJumpFreeze(false, 420);
      requestAnimationFrame(() => {
        ScrollTrigger.update();
      });
    }
    onComplete?.();
  };

  // Failsafe: nunca deixar a flag presa
  const failsafeMs = immediate ? 500 : Math.ceil(duration * 1000) + 400;
  const failsafe = window.setTimeout(settle, failsafeMs);

  if (lenisInstance) {
    // Alvo direto no elemento — evita erro de getBoundingClientRect em pins/sticky
    lenisInstance.scrollTo(element, {
      offset,
      immediate,
      duration: immediate ? undefined : duration,
      programmatic: true,
      force: true,
      lock: immediate,
      onComplete: () => {
        window.clearTimeout(failsafe);
        settle();
      },
    });
    return;
  }

  const top =
    element.getBoundingClientRect().top + window.scrollY + offset;
  window.scrollTo({ top, behavior: immediate ? "auto" : "smooth" });
  window.setTimeout(
    () => {
      window.clearTimeout(failsafe);
      settle();
    },
    immediate ? 0 : Math.ceil(duration * 1000),
  );
}
