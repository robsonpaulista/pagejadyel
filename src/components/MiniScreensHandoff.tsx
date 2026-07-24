import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { MousePointer2 } from "lucide-react";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { scrollToElement } from "../lib/lenisBridge";
import "./MiniScreensHandoff.css";

export type MiniScreenPreview = {
  id: string;
  tone: "light" | "dark";
  tag: string;
  title: string;
  meta: string;
};

type MiniScreensHandoffProps = {
  id?: string;
  /** id do elemento de destino (sem #) */
  targetId: string;
  label?: string;
  bandMax?: string;
  previews: readonly MiniScreenPreview[];
  activeIndex?: number;
  className?: string;
  pinClassName?: string;
  "aria-labelledby"?: string;
  children: ReactNode;
};

const EASE = [0.22, 1, 0.36, 1] as const;

function PreviewCard({
  preview,
  progress,
  isActive,
  children,
}: {
  preview: MiniScreenPreview;
  progress: MotionValue<number>;
  isActive: boolean;
  children?: ReactNode;
}) {
  const opacity = useTransform(
    progress,
    [0.08, 0.28, 0.88, 0.96],
    isActive ? [0, 1, 1, 0] : [0, 1, 0.45, 0],
  );
  const scale = useTransform(
    progress,
    isActive ? [0, 0.68, 0.76, 0.82] : [0, 1],
    isActive ? [1, 1, 0.93, 1] : [1, 1],
  );

  return (
    <motion.article
      className={[
        "mini-handoff__card",
        `mini-handoff__card--${preview.tone}`,
        isActive ? "mini-handoff__card--active" : null,
      ]
        .filter(Boolean)
        .join(" ")}
      style={{ opacity, scale }}
      aria-hidden="true"
    >
      <div className="mini-handoff__chrome">
        <span />
        <span />
        <span />
      </div>
      <p className="mini-handoff__tag">{preview.tag}</p>
      <p className="mini-handoff__title">{preview.title}</p>
      <p className="mini-handoff__meta">{preview.meta}</p>
      {children}
    </motion.article>
  );
}

function jumpToId(targetId: string, onComplete?: () => void): void {
  const target = document.getElementById(targetId);
  if (!target) {
    onComplete?.();
    return;
  }

  const nav =
    parseFloat(
      getComputedStyle(document.documentElement).getPropertyValue("--nav-h"),
    ) || 52;

  scrollToElement(target, {
    offset: -nav,
    immediate: true,
    onComplete,
  });

  const { pathname, search } = window.location;
  window.history.replaceState(null, "", `${pathname}${search}#${targetId}`);
}

/**
 * Faixa branca + mini telas + clique do mouse → fade → página alvo.
 */
export function MiniScreensHandoff({
  id,
  targetId,
  label = "Continuar",
  bandMax = "30%",
  previews,
  activeIndex = 0,
  className,
  pinClassName,
  "aria-labelledby": ariaLabelledBy,
  children,
}: MiniScreensHandoffProps) {
  const reduceMotion = useReducedMotion();
  const trackRef = useRef<HTMLDivElement>(null);
  const openedRef = useRef(false);
  const handoffRef = useRef<"idle" | "out" | "in">("idle");
  const [handoff, setHandoff] = useState<"idle" | "out" | "in">("idle");
  handoffRef.current = handoff;

  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start start", "end end"],
  });

  const bandHeight = useTransform(
    scrollYProgress,
    reduceMotion ? [0, 1] : [0, 0.05, 0.55, 1],
    reduceMotion ? ["0%", "0%"] : ["0%", "12%", bandMax, bandMax],
  );
  const labelOpacity = useTransform(
    scrollYProgress,
    [0.12, 0.28, 0.78, 0.88],
    [0, 1, 1, 0],
  );
  const contentFade = useTransform(
    scrollYProgress,
    [0, 0.15, 0.42],
    [1, 1, 0.22],
  );

  const cursorOpacity = useTransform(
    scrollYProgress,
    [0.55, 0.62, 0.82, 0.9],
    [0, 1, 1, 0],
  );
  const cursorX = useTransform(scrollYProgress, [0.55, 0.68], [56, 0]);
  const cursorY = useTransform(
    scrollYProgress,
    [0.55, 0.68, 0.76, 0.8],
    [40, 0, 12, 0],
  );
  const cursorScale = useTransform(
    scrollYProgress,
    [0.68, 0.76, 0.8],
    [1, 0.78, 1],
  );
  const cursorHintOpacity = useTransform(
    scrollYProgress,
    [0.58, 0.64, 0.76, 0.84],
    [0, 1, 1, 0],
  );

  useMotionValueEvent(scrollYProgress, "change", (progress) => {
    if (reduceMotion) return;
    if (progress >= 0.8 && !openedRef.current) {
      openedRef.current = true;
      setHandoff("out");
    }
    if (progress < 0.68 && handoffRef.current === "idle") {
      openedRef.current = false;
    }
  });

  useEffect(() => {
    if (handoff !== "out") return;
    const timer = window.setTimeout(() => {
      jumpToId(targetId, () => {
        requestAnimationFrame(() => setHandoff("in"));
      });
    }, 300);
    return () => window.clearTimeout(timer);
  }, [handoff, targetId]);

  useEffect(() => {
    if (handoff !== "in") return;
    const timer = window.setTimeout(() => setHandoff("idle"), 650);
    return () => window.clearTimeout(timer);
  }, [handoff]);

  if (reduceMotion) {
    return (
      <section
        id={id}
        aria-labelledby={ariaLabelledBy}
        className={["mini-handoff__pin", pinClassName, className]
          .filter(Boolean)
          .join(" ")}
      >
        {children}
      </section>
    );
  }

  return (
    <div
      ref={trackRef}
      id={id}
      className={["mini-handoff", className].filter(Boolean).join(" ")}
    >
      <section
        aria-labelledby={ariaLabelledBy}
        className={["mini-handoff__pin", pinClassName].filter(Boolean).join(" ")}
      >
        <div className="mini-handoff__stage">
          <motion.div
            className="mini-handoff__content"
            style={{ opacity: contentFade }}
          >
            {children}
          </motion.div>

          <motion.div
            className="mini-handoff__band"
            aria-hidden="true"
            style={{ height: bandHeight }}
          >
            <div className="mini-handoff__band-inner">
              <motion.p
                className="mini-handoff__label"
                style={{ opacity: labelOpacity }}
              >
                {label}
              </motion.p>
              <div className="mini-handoff__grid">
                {previews.map((preview, index) => {
                  const isActive = index === activeIndex;
                  return (
                    <PreviewCard
                      key={preview.id}
                      preview={preview}
                      progress={scrollYProgress}
                      isActive={isActive}
                    >
                      {isActive ? (
                        <motion.div
                          className="mini-handoff__cursor"
                          style={{
                            opacity: cursorOpacity,
                            x: cursorX,
                            y: cursorY,
                            scale: cursorScale,
                          }}
                        >
                          <MousePointer2
                            className="mini-handoff__cursor-icon"
                            strokeWidth={2.25}
                            aria-hidden
                          />
                          <motion.span
                            className="mini-handoff__cursor-hint"
                            style={{ opacity: cursorHintOpacity }}
                          >
                            Abrir
                          </motion.span>
                        </motion.div>
                      ) : null}
                    </PreviewCard>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <motion.div
        className="mini-handoff__fade"
        aria-hidden="true"
        initial={false}
        animate={{ opacity: handoff === "out" ? 1 : 0 }}
        transition={{
          duration: handoff === "out" ? 0.28 : 0.6,
          ease: EASE,
        }}
        style={{ pointerEvents: handoff === "out" ? "auto" : "none" }}
      />
    </div>
  );
}
