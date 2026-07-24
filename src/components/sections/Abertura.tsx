import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
  type Variants,
} from "framer-motion";
import { MousePointer2 } from "lucide-react";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { Button, Container, Highlight, NameLockup } from "../ui";
import { useIsDesktop } from "../../hooks/useIsDesktop";
import { scrollToElement } from "../../lib/lenisBridge";
import { JingleInvite } from "../JinglePlayer";
import { MANDATO_PREVIEWS } from "../miniScreenPreviews";
import type { MiniScreenPreview } from "../MiniScreensHandoff";
import jadyelBandeira from "../../assets/jadyel-bandeira.webp";
import "./Abertura.css";

const EASE = [0.22, 1, 0.36, 1] as const;

/** Máximo da faixa branca — não passa desse ponto */
const BAND_MAX = "30%";

const titleContainer: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08 },
  },
};

const titleWord: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: EASE },
  },
};

function Word({ children }: { children: string }) {
  return (
    <motion.span
      className="abertura__word"
      variants={titleWord}
      style={{ display: "inline-block" }}
    >
      {children}
    </motion.span>
  );
}

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

  const scale = useTransform(progress, [0, 1], [1, 1]);

  return (
    <motion.article
      className={[
        "abertura-preview",
        `abertura-preview--${preview.tone}`,
        preview.image ? "abertura-preview--print" : null,
        isActive ? "abertura-preview--active" : null,
      ]
        .filter(Boolean)
        .join(" ")}
      style={{ opacity, scale }}
      aria-hidden="true"
    >
      <div className="abertura-preview__chrome">
        <span />
        <span />
        <span />
      </div>
      {preview.image ? (
        <>
          <div className="abertura-preview__print">
            <img
              src={preview.image}
              alt=""
              loading="lazy"
              decoding="async"
              style={
                preview.imagePosition
                  ? { objectPosition: preview.imagePosition }
                  : undefined
              }
            />
          </div>
          <div className="abertura-preview__caption">
            <p className="abertura-preview__tag">{preview.tag}</p>
            <p className="abertura-preview__title">{preview.title}</p>
          </div>
        </>
      ) : (
        <>
          <p className="abertura-preview__tag">{preview.tag}</p>
          <p className="abertura-preview__title">{preview.title}</p>
          <p className="abertura-preview__meta">{preview.meta}</p>
        </>
      )}
      {children}
    </motion.article>
  );
}

function goToMandatoPage(onComplete?: () => void): void {
  const target =
    document.getElementById("nmand-abertura") ??
    document.getElementById("numeros-do-mandato");
  if (!target) {
    onComplete?.();
    return;
  }

  const nav =
    parseFloat(
      getComputedStyle(document.documentElement).getPropertyValue("--nav-h"),
    ) || 52;

  // Salto imediato sob o fade branco — sem scrolls manuais restantes
  scrollToElement(target, {
    offset: -nav,
    immediate: true,
    onComplete,
  });
}

/**
 * Home — faixa sobe até o máximo → mouse clica no card → fade → página real.
 */
export function Abertura() {
  const reduceMotion = useReducedMotion();
  const isDesktop = useIsDesktop();
  const skipHandoff = Boolean(reduceMotion || !isDesktop);
  const skipRef = useRef(skipHandoff);
  skipRef.current = skipHandoff;
  const trackRef = useRef<HTMLDivElement>(null);
  const openedRef = useRef(false);
  const handoffRef = useRef<"idle" | "out" | "in">("idle");
  const [handoff, setHandoff] = useState<"idle" | "out" | "in">("idle");
  handoffRef.current = handoff;
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start start", "end end"],
  });

  const afterTitleDelay = reduceMotion || skipHandoff ? 0 : 0.08 * 8 + 0.15;
  const skipEnter = Boolean(reduceMotion || skipHandoff);

  /*
    0–0.4   faixa sobe até BAND_MAX + mini telas
    0.4–0.72  mouse aponta e clica
    ≥0.72     fade out → página real com fade in
  */
  const titlesOpacity = useTransform(
    scrollYProgress,
    skipHandoff ? [0, 1] : [0, 0.1, 0.32],
    skipHandoff ? [1, 1] : [1, 1, 0],
  );
  const ctaOpacity = useTransform(
    scrollYProgress,
    skipHandoff ? [0, 1] : [0, 0.08, 0.28],
    skipHandoff ? [1, 1] : [1, 1, 0],
  );
  const cueOpacity = useTransform(
    scrollYProgress,
    skipHandoff ? [0, 1] : [0, 0.05, 0.18],
    skipHandoff ? [1, 1] : [1, 1, 0],
  );
  const brandOpacity = useTransform(
    scrollYProgress,
    skipHandoff ? [0, 1] : [0, 0.24, 0.38],
    skipHandoff ? [1, 1] : [1, 1, 0],
  );

  const photoScale = useTransform(
    scrollYProgress,
    skipHandoff ? [0, 1] : [0, 0.28, 0.4],
    skipHandoff ? [1, 1] : [1, 1, 1.02],
  );
  const photoX = useTransform(
    scrollYProgress,
    skipHandoff ? [0, 1] : [0, 0.28, 0.4],
    skipHandoff ? [0, 0] : [0, 0, -14],
  );

  const bandHeight = useTransform(
    scrollYProgress,
    skipHandoff ? [0, 1] : [0, 0.04, 0.4, 1],
    skipHandoff
      ? ["0%", "0%"]
      : ["0%", "12%", BAND_MAX, BAND_MAX],
  );
  const previewsLabelOpacity = useTransform(
    scrollYProgress,
    [0.1, 0.22, 0.7, 0.82],
    [0, 1, 1, 0],
  );

  const cursorOpacity = useTransform(
    scrollYProgress,
    [0.42, 0.5, 0.74, 0.84],
    [0, 1, 1, 0],
  );
  const cursorX = useTransform(scrollYProgress, [0.42, 0.55], [56, 0]);
  const cursorY = useTransform(
    scrollYProgress,
    [0.42, 0.55, 0.63, 0.68],
    [40, 0, 12, 0],
  );
  const cursorScale = useTransform(
    scrollYProgress,
    [0.55, 0.63, 0.68],
    [1, 0.78, 1],
  );
  const cursorHintOpacity = useTransform(
    scrollYProgress,
    [0.45, 0.52, 0.63, 0.74],
    [0, 1, 1, 0],
  );

  useMotionValueEvent(scrollYProgress, "change", (progress) => {
    if (skipRef.current) return;
    if (progress >= 0.72 && !openedRef.current) {
      openedRef.current = true;
      setHandoff("out");
    }
    // Não cancela handoff no meio do fade/navegação
    if (progress < 0.55 && handoffRef.current === "idle") {
      openedRef.current = false;
    }
  });

  useEffect(() => {
    if (skipHandoff) {
      openedRef.current = false;
      setHandoff("idle");
    }
  }, [skipHandoff]);

  useEffect(() => {
    if (skipHandoff || handoff !== "out") return;

    const timer = window.setTimeout(() => {
      goToMandatoPage(() => {
        // Garante paint na página nova antes do fade-in
        requestAnimationFrame(() => {
          setHandoff("in");
        });
      });
    }, 300);

    return () => window.clearTimeout(timer);
  }, [handoff, skipHandoff]);

  useEffect(() => {
    if (handoff !== "in") return;
    const timer = window.setTimeout(() => setHandoff("idle"), 650);
    return () => window.clearTimeout(timer);
  }, [handoff]);

  return (
    <div
      className={
        skipHandoff
          ? "abertura-track abertura-track--static"
          : "abertura-track"
      }
      id="abertura"
      ref={trackRef}
    >
      <section
        className="abertura abertura--pinned"
        aria-labelledby="abertura-heading"
      >
        <div className="abertura__stage">
          <motion.img
            className="abertura__photo"
            src={jadyelBandeira}
            alt="Jadyel Alencar sorrindo com a bandeira do Piauí sobre os ombros"
            style={
              skipHandoff
                ? undefined
                : { scale: photoScale, x: photoX }
            }
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: skipHandoff ? 0.45 : 0.85, ease: EASE, delay: skipHandoff ? 0 : 0.15 }}
          />

          <div className="abertura__fade" aria-hidden="true" />

          <Container className="abertura__inner">
            <div className="abertura__copy">
              <motion.div
                className="abertura__narrative"
                style={
                  skipHandoff ? undefined : { opacity: titlesOpacity }
                }
              >
                <motion.h1
                  id="abertura-heading"
                  className="headline abertura__headline"
                  variants={titleContainer}
                  initial={skipEnter ? false : "hidden"}
                  animate="show"
                >
                  <Word>Grandes</Word> <Word>causas.</Word>
                  <br />
                  <span className="abertura__purpose">
                    <Word>Um</Word> <Word>só</Word> <Word>propósito:</Word>
                  </span>
                  <br />
                  <Highlight color="yellow">
                    <Word>CUIDAR</Word> <Word>DO</Word> <Word>PIAUÍ</Word>
                  </Highlight>
                  <Word>.</Word>
                </motion.h1>

                <motion.p
                  className="lede abertura__lede abertura__lede--full"
                  initial={skipEnter ? false : { opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.6,
                    ease: EASE,
                    delay: afterTitleDelay,
                  }}
                >
                  Proteger as crianças, ampliar o acesso à saúde, cuidar dos
                  animais e levar obras para todos os cantos do estado. É assim
                  que o nosso mandato cuida do Piauí.
                </motion.p>
                <motion.p
                  className="lede abertura__lede abertura__lede--short"
                  initial={skipEnter ? false : { opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.45,
                    ease: EASE,
                    delay: afterTitleDelay,
                  }}
                >
                  Proteger as crianças, ampliar a saúde, cuidar dos animais e
                  levar obras a todo o Piauí.
                </motion.p>
              </motion.div>

              <motion.div
                className="abertura__signature"
                initial={skipEnter ? false : { opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.6,
                  ease: EASE,
                  delay: afterTitleDelay + 0.08,
                }}
                style={
                  skipHandoff ? undefined : { opacity: brandOpacity }
                }
              >
                <div className="abertura__brand">
                  <NameLockup
                    compact
                    subline={false}
                    className="abertura__lockup"
                  />
                  <p className="abertura__urn" aria-label="Número de urna 1000">
                    1000
                  </p>
                </div>
                <p className="abertura__slogan">O Piauí É PRA JÁ!</p>
              </motion.div>

              <motion.div
                className="abertura__actions"
                initial={skipEnter ? false : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.6,
                  ease: EASE,
                  delay: afterTitleDelay + 0.2,
                }}
                style={skipHandoff ? undefined : { opacity: ctaOpacity }}
              >
                <Button
                  href="#hospital-de-amor"
                  variant="solid"
                  arrow
                  className="abertura__cta"
                >
                  Conheça as causas
                </Button>
                <JingleInvite />
              </motion.div>

              <motion.a
                className="cue abertura__cue"
                href="#nmand-abertura"
                style={skipHandoff ? undefined : { opacity: cueOpacity }}
              >
                Role para conhecer as causas
                <span className="cue__arrow">↓</span>
              </motion.a>
            </div>
          </Container>

          <motion.div
            className="abertura__cover"
            aria-hidden="true"
            style={skipHandoff ? undefined : { height: bandHeight }}
          >
            {!skipHandoff ? (
              <div className="abertura__band">
                <div className="abertura-previews">
                  <motion.p
                    className="abertura-previews__label"
                    style={{ opacity: previewsLabelOpacity }}
                  >
                    O mandato em quatro telas
                  </motion.p>
                  <div className="abertura-previews__grid">
                    {MANDATO_PREVIEWS.map((preview, index) => {
                      const isActive = index === 0;
                      return (
                        <PreviewCard
                          key={preview.id}
                          preview={preview}
                          progress={scrollYProgress}
                          isActive={isActive}
                        >
                          {isActive ? (
                            <motion.div
                              className="abertura-cursor"
                              style={{
                                opacity: cursorOpacity,
                                x: cursorX,
                                y: cursorY,
                                scale: cursorScale,
                              }}
                            >
                              <MousePointer2
                                className="abertura-cursor__icon"
                                strokeWidth={2.25}
                                aria-hidden
                              />
                              <motion.span
                                className="abertura-cursor__hint"
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
              </div>
            ) : null}
          </motion.div>
        </div>
      </section>

      {/* Fade automático pós-clique → página real */}
      <motion.div
        className="abertura-handoff"
        aria-hidden="true"
        initial={false}
        animate={{
          opacity: handoff === "out" ? 1 : 0,
        }}
        transition={{
          duration: handoff === "out" ? 0.28 : 0.6,
          ease: EASE,
        }}
        style={{
          pointerEvents: handoff === "out" ? "auto" : "none",
        }}
      />
    </div>
  );
}
