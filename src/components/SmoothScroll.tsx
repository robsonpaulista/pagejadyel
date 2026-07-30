import { useEffect, type ReactNode } from "react";
import Lenis from "lenis";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";
import { setLenisInstance } from "../lib/lenisBridge";

gsap.registerPlugin(ScrollTrigger);

type SmoothScrollProps = {
  children: ReactNode;
};

/** Smooth scroll global via Lenis — sincronizado com GSAP ScrollTrigger (inclui pin/scrub). */
export function SmoothScroll({ children }: SmoothScrollProps) {
  useEffect(() => {
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReduced) return;

    const lenis = new Lenis({
      autoRaf: true,
      smoothWheel: true,
    });

    setLenisInstance(lenis);

    ScrollTrigger.scrollerProxy(document.body, {
      scrollTop(value) {
        if (arguments.length && typeof value === "number") {
          lenis.scrollTo(value, { immediate: true });
        }
        return lenis.scroll;
      },
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight,
        };
      },
    });

    lenis.on("scroll", ScrollTrigger.update);
    ScrollTrigger.defaults({ scroller: document.body });
    ScrollTrigger.refresh();

    return () => {
      setLenisInstance(null);
      ScrollTrigger.defaults({ scroller: undefined });
      lenis.destroy();
      ScrollTrigger.refresh();
    };
  }, []);

  return children;
}
