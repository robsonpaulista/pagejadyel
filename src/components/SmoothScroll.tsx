import { useEffect, type ReactNode } from "react";
import Lenis from "lenis";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";
import { setLenisInstance } from "../lib/lenisBridge";

gsap.registerPlugin(ScrollTrigger);

type SmoothScrollProps = {
  children: ReactNode;
};

/** Smooth scroll global via Lenis — sincronizado com GSAP ScrollTrigger. */
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
    lenis.on("scroll", ScrollTrigger.update);

    return () => {
      setLenisInstance(null);
      lenis.destroy();
    };
  }, []);

  return children;
}
