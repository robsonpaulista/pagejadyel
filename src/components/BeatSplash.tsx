import { useCallback, useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { refreshScrollLayout } from "../lib/lenisBridge";
import { BeatPowderScene } from "./BeatPowderScene";
import "./BeatSplash.css";

type Phase = "boot" | "in" | "peak" | "out" | "gap";

const CYCLES = 3;
/** Pausa inicial sem texto */
const BOOT_S = 0.7;
/** Fade-in */
const IN_S = 1.1;
/** Hold com efeito */
const PEAK_S = 0.75;
/** Fade-out */
const OUT_S = 1.25;
/** Pausa entre ciclos (após sumir) */
const GAP_S = 0.4;
/** Pausa final após o 3º fade-out, antes de ir pra home */
const END_S = 0.55;

/**
 * Splash — partículas + "O JADYEL CHEGOOOUUUU"
 * Carrega sem texto → fade in / out exatamente 3 vezes → home.
 */
export function BeatSplash() {
  const reduceMotion = useReducedMotion();
  const [done, setDone] = useState(false);
  const [leaving, setLeaving] = useState(false);
  const titleRef = useRef<HTMLParagraphElement>(null);
  const opacityRef = useRef(0);
  const pulseRef = useRef(0);
  const phaseRef = useRef<Phase>("boot");
  const phaseAgeRef = useRef(0);
  const cycleRef = useRef(0);
  const leavingRef = useRef(false);
  const doneRef = useRef(false);

  const unlock = useCallback(() => {
    document.documentElement.classList.remove("intro-locked");
    requestAnimationFrame(() => refreshScrollLayout());
  }, []);

  const finish = useCallback(() => {
    if (leavingRef.current || doneRef.current) return;
    leavingRef.current = true;
    setLeaving(true);
    unlock();
    window.setTimeout(() => {
      doneRef.current = true;
      setDone(true);
    }, 480);
  }, [unlock]);

  useEffect(() => {
    if (reduceMotion) {
      doneRef.current = true;
      setDone(true);
      unlock();
      return;
    }

    document.documentElement.classList.add("intro-locked");
    return () => unlock();
  }, [reduceMotion, unlock]);

  useEffect(() => {
    if (reduceMotion || done) return;
    let frame = 0;
    let last = performance.now();

    const setPhase = (next: Phase) => {
      phaseRef.current = next;
      phaseAgeRef.current = 0;
    };

    const startCycle = () => {
      cycleRef.current += 1;
      setPhase("in");
      // Punch na entrada, sincronizado com o pó
      pulseRef.current = 0.7;
    };

    const tick = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      phaseAgeRef.current += dt;
      pulseRef.current = Math.max(0, pulseRef.current - dt * 1.4);

      const phase = phaseRef.current;
      const age = phaseAgeRef.current;

      if (phase === "boot") {
        opacityRef.current = 0;
        if (age >= BOOT_S) startCycle();
      } else if (phase === "in") {
        opacityRef.current = Math.min(1, age / IN_S);
        if (opacityRef.current >= 1) setPhase("peak");
      } else if (phase === "peak") {
        opacityRef.current = 1;
        if (age >= PEAK_S) setPhase("out");
      } else if (phase === "out") {
        opacityRef.current = Math.max(0, 1 - age / OUT_S);
        if (opacityRef.current <= 0) setPhase("gap");
      } else if (phase === "gap") {
        opacityRef.current = 0;
        if (cycleRef.current >= CYCLES) {
          if (age >= END_S) {
            finish();
            return;
          }
        } else if (age >= GAP_S) {
          startCycle();
        }
      }

      const el = titleRef.current;
      if (el) {
        const punch = pulseRef.current;
        const opacity = Math.min(
          1,
          opacityRef.current * 0.92 + punch * 0.12,
        );
        const scale = 1 + punch * 0.045;
        el.style.opacity = String(opacity);
        el.style.transform = `translate(-50%, -50%) scale(${scale})`;
      }

      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [reduceMotion, done, finish]);

  /** Batidas só reforçam o efeito enquanto o texto está visível — não iniciam ciclo */
  const onBeat = useCallback((power: number) => {
    const phase = phaseRef.current;
    if (phase === "in" || phase === "peak") {
      pulseRef.current = Math.min(1, 0.28 + power * 0.55);
    }
  }, []);

  if (done || reduceMotion) return null;

  return (
    <div
      className={`beat-splash${leaving ? " beat-splash--out" : ""}`}
      role="dialog"
      aria-label="Abertura da campanha"
      aria-modal="true"
    >
      <button
        type="button"
        className="beat-splash__hit"
        onClick={finish}
        aria-label="Entrar na página"
      />

      <div className="beat-splash__stage">
        <BeatPowderScene onBeat={onBeat} />
      </div>

      <p ref={titleRef} className="beat-splash__title">
        O JADYEL CHEGOOOUUUU
      </p>

      <p className="beat-splash__hint">Toque para entrar</p>
    </div>
  );
}
