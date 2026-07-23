import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type Variants,
} from "framer-motion";
import { useRef } from "react";
import { Button, Container, Highlight, NameLockup, Section } from "../ui";
import jadyelBandeira from "../../assets/jadyel-bandeira.webp";
import "./Abertura.css";

const EASE = [0.22, 1, 0.36, 1] as const;

const titleContainer: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
    },
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

export function Abertura() {
  const reduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const photoY = useTransform(
    scrollYProgress,
    [0, 1],
    reduceMotion ? [0, 0] : [0, 28],
  );

  const afterTitleDelay = reduceMotion ? 0 : 0.08 * 8 + 0.15;

  return (
    <Section
      ref={sectionRef}
      className="abertura"
      id="abertura"
      aria-labelledby="abertura-heading"
    >
      <div className="abertura__stage">
        <motion.img
          className="abertura__photo"
          src={jadyelBandeira}
          alt="Jadyel Alencar sorrindo com a bandeira do Piauí sobre os ombros"
          style={{ y: photoY }}
          initial={reduceMotion ? false : { opacity: 0, x: 48, scale: 1.04 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 0.85, ease: EASE, delay: 0.15 }}
        />
        <div className="abertura__fade" aria-hidden="true" />

        <Container className="abertura__inner">
          <div className="abertura__copy">
            <motion.h1
              id="abertura-heading"
              className="headline abertura__headline"
              variants={titleContainer}
              initial={reduceMotion ? false : "hidden"}
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
              className="lede"
              initial={reduceMotion ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASE, delay: afterTitleDelay }}
            >
              Proteger as crianças, ampliar o acesso à saúde, cuidar dos animais
              e levar obras para todos os cantos do estado. É assim que o nosso
              mandato cuida do Piauí.
            </motion.p>

            <motion.div
              className="abertura__brand"
              initial={reduceMotion ? false : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                ease: EASE,
                delay: afterTitleDelay + 0.08,
              }}
            >
              <NameLockup compact subline={false} className="abertura__lockup" />
              <motion.p
                className="abertura__urn"
                aria-label="Número de urna 1000"
                initial={
                  reduceMotion ? false : { opacity: 0, scale: 0.88, x: 12 }
                }
                animate={
                  reduceMotion
                    ? { opacity: 1, scale: 1, x: 0 }
                    : { opacity: 1, scale: [0.88, 1.04, 1], x: 0 }
                }
                transition={
                  reduceMotion
                    ? undefined
                    : {
                        duration: 1.2,
                        ease: EASE,
                        delay: afterTitleDelay + 0.12,
                        times: [0, 0.6, 1],
                      }
                }
              >
                1000
              </motion.p>
            </motion.div>

            <motion.p
              className="abertura__slogan"
              initial={reduceMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.55,
                ease: EASE,
                delay: afterTitleDelay + 0.14,
              }}
            >
              O Piauí É PRA JÁ!
            </motion.p>

            <motion.div
              className="abertura__actions"
              initial={reduceMotion ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                ease: EASE,
                delay: afterTitleDelay + 0.2,
              }}
            >
              <Button
                href="#hospital-de-amor"
                variant="solid"
                arrow
                className="abertura__cta"
              >
                Conheça as causas
              </Button>
              <div id="jingle-invite-root" />
            </motion.div>

            <a className="cue abertura__cue" href="#numeros-do-mandato">
              Role para conhecer as causas
              <span className="cue__arrow">↓</span>
            </a>
          </div>
        </Container>
      </div>
    </Section>
  );
}
