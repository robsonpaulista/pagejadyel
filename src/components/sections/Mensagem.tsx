import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type MouseEvent,
} from "react";
import envelopeBranco from "../../assets/envelopebranco1.png";
import envelopeMensagem from "../../assets/envelopemensagem.png";
import { scrollToElement } from "../../lib/lenisBridge";
import "./Mensagem.css";

const MAX_TILT_X = 16;
const MAX_TILT_Y = 22;
const spring = { stiffness: 220, damping: 22, mass: 0.6 };
const easeOut = [0.22, 1, 0.36, 1] as const;
const fadeTransition = { duration: 0.9, ease: easeOut };
const fadeInstant = { duration: 0 };
const noteInTransition = { duration: 0.85, ease: easeOut, delay: 0.28 };
const noteInInstant = { duration: 0, delay: 0 };
const letterTransition = { duration: 1.05, ease: easeOut };
const letterInstant = { duration: 0 };
const OPEN_HOLD_MS = 1100;
const LETTER_HOLD_MS = 4200;

type EnvelopePhase = "closed" | "open" | "letter";

const LETTER_PARAGRAPHS = [
  "Em 2022 fui eleito deputado federal sem nunca ter participado de uma eleição antes.",
  "Em um dos bolsos do paletó no dia de assumir o cargo, tinham algumas frases que não decorei, em outro, as propostas que apresentei durante a caminhada: Desenvolvimento econômico, infraestrutura, cuidado ambiental, apoio às rádios comunitárias, apoio à saúde...",
  "No bolso da camisa uma mensagem da minha mãe: “Filho, Deus te abençoe, não esqueça do que prometeu!, vá com CUIDADO, é um caminho desconhecido.”",
] as const;

function goToMandato(): void {
  const target =
    document.getElementById("env-mand-abertura") ??
    document.getElementById("mandato-apos-mensagem");
  if (!target) return;

  scrollToElement(target, {
    offset: 0,
    duration: 1.2,
  });

  const { pathname, search } = window.location;
  window.history.pushState(
    null,
    "",
    `${pathname}${search}#env-mand-abertura`,
  );
}

/** Lacre — fundo branco, JA e anel em cinza. */
function SeloJA() {
  return (
    <span className="selo">
      <span className="selo__wax" aria-hidden="true">
        <span className="selo__rim" />
        <span className="selo__inner">
          <span className="selo__letters">JA</span>
        </span>
        <span className="selo__shine" />
      </span>
    </span>
  );
}

/** Página branca — tilt 3D + lacre JA que abre o envelope. */
export function Mensagem() {
  const reduceMotion = useReducedMotion();
  const stageRef = useRef<HTMLDivElement>(null);
  const [phase, setPhase] = useState<EnvelopePhase>("closed");

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const springX = useSpring(rawX, spring);
  const springY = useSpring(rawY, spring);

  const rotateX = useTransform(springY, [-0.5, 0.5], [MAX_TILT_X, -MAX_TILT_X]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-MAX_TILT_Y, MAX_TILT_Y]);
  const glareX = useTransform(springX, [-0.5, 0.5], [15, 85]);
  const glareY = useTransform(springY, [-0.5, 0.5], [20, 80]);
  const glareBg = useMotionTemplate`radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.45) 0%, rgba(255,255,255,0) 55%)`;

  const fade = reduceMotion ? fadeInstant : fadeTransition;
  const noteIn = reduceMotion ? noteInInstant : noteInTransition;
  const letterMove = reduceMotion ? letterInstant : letterTransition;

  const isClosed = phase === "closed";
  const isOpen = phase !== "closed";
  const isLetter = phase === "letter";

  const handleMove = useCallback(
    (event: MouseEvent<HTMLDivElement>) => {
      if (reduceMotion) return;
      const node = stageRef.current;
      if (!node) return;

      const rect = node.getBoundingClientRect();
      const px = (event.clientX - rect.left) / rect.width - 0.5;
      const py = (event.clientY - rect.top) / rect.height - 0.5;
      rawX.set(Math.max(-0.5, Math.min(0.5, px)));
      rawY.set(Math.max(-0.5, Math.min(0.5, py)));
    },
    [rawX, rawY, reduceMotion],
  );

  const handleLeave = useCallback(() => {
    rawX.set(0);
    rawY.set(0);
  }, [rawX, rawY]);

  const handleOpen = useCallback(() => {
    setPhase("open");
  }, []);

  const handleRevealLetter = useCallback(() => {
    setPhase((current) => (current === "open" ? "letter" : current));
  }, []);

  const handleGoToMandato = useCallback(() => {
    goToMandato();
  }, []);

  useEffect(() => {
    if (phase !== "open") return;

    const delayMs = reduceMotion
      ? 0
      : fadeTransition.duration * 1000 +
        noteInTransition.delay * 1000 +
        OPEN_HOLD_MS;
    const timer = window.setTimeout(() => {
      setPhase("letter");
    }, delayMs);

    return () => window.clearTimeout(timer);
  }, [phase, reduceMotion]);

  useEffect(() => {
    if (phase !== "letter") return;

    const delayMs = reduceMotion
      ? 600
      : letterTransition.duration * 1000 + LETTER_HOLD_MS;
    const timer = window.setTimeout(() => {
      goToMandato();
    }, delayMs);

    return () => window.clearTimeout(timer);
  }, [phase, reduceMotion]);

  return (
    <section id="mensagem" className="mensagem" aria-label="Envelope">
      <div
        ref={stageRef}
        className="mensagem__stage"
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
      >
        <motion.div
          className="mensagem__tilt"
          style={
            reduceMotion
              ? undefined
              : {
                  rotateX,
                  rotateY,
                  transformPerspective: 1100,
                }
          }
        >
          <div className="mensagem__frames">
            <motion.img
              className="mensagem__envelope mensagem__envelope--closed"
              src={envelopeBranco}
              alt=""
              draggable={false}
              initial={false}
              animate={{ opacity: isClosed ? 1 : 0 }}
              transition={fade}
            />
            <motion.img
              className="mensagem__envelope mensagem__envelope--message"
              src={envelopeMensagem}
              alt=""
              draggable={false}
              initial={false}
              animate={{
                opacity: isOpen ? (isLetter ? 0.72 : 1) : 0,
                scale: isLetter ? 0.94 : 1,
                y: isLetter ? 18 : 0,
              }}
              transition={isLetter ? letterMove : fade}
            />

            <motion.div
              className={`mensagem__card${isLetter ? " mensagem__card--letter" : ""}`}
              initial={false}
              animate={
                isClosed
                  ? {
                      opacity: 0,
                      left: "38.5%",
                      top: "28%",
                      width: "23%",
                      height: "20%",
                      y: 16,
                      scale: 0.98,
                    }
                  : isLetter
                    ? {
                        opacity: 1,
                        left: "10%",
                        top: "-6%",
                        width: "80%",
                        height: "118%",
                        y: 0,
                        scale: 1,
                      }
                    : {
                        opacity: 1,
                        left: "38.5%",
                        top: "26.5%",
                        width: "23%",
                        height: "22%",
                        y: 0,
                        scale: 1,
                      }
              }
              transition={isClosed ? noteIn : isLetter ? letterMove : noteIn}
              aria-hidden={isClosed}
              role={isClosed ? undefined : "button"}
              aria-label={
                isClosed
                  ? undefined
                  : isLetter
                    ? "Ir para a seção Mandato"
                    : "Puxar bilhete do envelope"
              }
              tabIndex={isClosed ? -1 : 0}
              onClick={
                phase === "open"
                  ? handleRevealLetter
                  : isLetter
                    ? handleGoToMandato
                    : undefined
              }
              onKeyDown={
                isClosed
                  ? undefined
                  : (event) => {
                      if (event.key === "Enter" || event.key === " ") {
                        event.preventDefault();
                        if (phase === "open") handleRevealLetter();
                        else if (isLetter) handleGoToMandato();
                      }
                    }
              }
            >
              <div className="mensagem__card-inner">
                <p className="mensagem__note-text">
                  <span className="mensagem__note-line">de Jadyel Alencar</span>
                  <span className="mensagem__note-line mensagem__note-line--soft">
                    para o povo do Piauí
                  </span>
                </p>

                {isLetter ? (
                  <motion.div
                    className="mensagem__letter-body"
                    initial={
                      reduceMotion ? false : { opacity: 0, y: 14 }
                    }
                    animate={{ opacity: 1, y: 0 }}
                    transition={
                      reduceMotion
                        ? letterInstant
                        : { duration: 0.75, ease: easeOut, delay: 0.4 }
                    }
                  >
                    {LETTER_PARAGRAPHS.map((paragraph) => (
                      <p key={paragraph.slice(0, 24)}>{paragraph}</p>
                    ))}
                  </motion.div>
                ) : null}
              </div>
            </motion.div>
          </div>

          <motion.button
            type="button"
            className="mensagem__seal-btn"
            aria-label="Abrir envelope"
            aria-hidden={!isClosed}
            tabIndex={isClosed ? 0 : -1}
            disabled={!isClosed}
            onClick={handleOpen}
            initial={false}
            animate={{
              opacity: isClosed ? 1 : 0,
              scale: isClosed ? 1 : 0.92,
            }}
            transition={fade}
            whileHover={
              reduceMotion || !isClosed ? undefined : { scale: 1.04 }
            }
            whileTap={
              reduceMotion || !isClosed ? undefined : { scale: 0.97 }
            }
          >
            <SeloJA />
          </motion.button>

          {!reduceMotion ? (
            <motion.span
              className="mensagem__glare"
              style={{ backgroundImage: glareBg }}
              aria-hidden="true"
            />
          ) : null}
        </motion.div>
      </div>
    </section>
  );
}
