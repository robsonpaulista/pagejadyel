import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";
import { useJingle } from "./JinglePlayer";
import "./BeatPowderScene.css";

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
  /** 0 soft mist · 1 grain */
  kind: 0 | 1;
  r: number;
  g: number;
  b: number;
  spin: number;
};

const COLORS: ReadonlyArray<readonly [number, number, number]> = [
  [255, 190, 0], // amarelo campanha
  [255, 210, 70],
  [255, 200, 40],
  [255, 175, 0],
  [240, 180, 20],
  [255, 230, 120], // amarelo claro / névoa
];

const BPM = 116;
const BEAT = 60 / BPM;

type BeatPowderSceneProps = {
  /** Disparado a cada batida (power 0–1+) — para sincronizar UI */
  onBeat?: (power: number) => void;
};

/**
 * Pó / partículas saindo do bottom — vibram a cada batida (jingle ou pulso idle).
 * Fundo transparente: usa o branco/creme da home por baixo.
 */
export function BeatPowderScene({ onBeat }: BeatPowderSceneProps) {
  const reduceMotion = useReducedMotion();
  const jingle = useJingle();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  const jingleRef = useRef(jingle);
  jingleRef.current = jingle;
  const onBeatRef = useRef(onBeat);
  onBeatRef.current = onBeat;

  useEffect(() => {
    if (reduceMotion) return;

    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let particles: Particle[] = [];
    let frame = 0;
    let lastBeat = -1;
    let lastTs = performance.now();
    let idleAcc = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const { width, height } = wrap.getBoundingClientRect();
      canvas.width = Math.max(1, Math.floor(width * dpr));
      canvas.height = Math.max(1, Math.floor(height * dpr));
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(wrap);

    const spawnBurst = (power: number, w: number, h: number) => {
      // Cobertura em toda a largura da página
      const count = Math.floor(56 + power * 140);

      for (let i = 0; i < count; i++) {
        const color = COLORS[(Math.random() * COLORS.length) | 0];
        const angle = -Math.PI / 2 + (Math.random() - 0.5) * 1.05;
        const speed = (2.2 + Math.random() * 6.5) * (0.55 + power);
        const kind: 0 | 1 = Math.random() > 0.55 ? 1 : 0;
        const x = Math.random() * w;
        particles.push({
          x,
          y: h - 2 - Math.random() * 12,
          vx: Math.cos(angle) * speed * (0.25 + Math.random() * 0.9),
          vy: Math.sin(angle) * speed,
          life: 0,
          maxLife: 0.55 + Math.random() * (0.7 + power * 0.5),
          size:
            kind === 0
              ? 6 + Math.random() * 18 * power
              : 1.2 + Math.random() * 3.5,
          kind,
          r: color[0],
          g: color[1],
          b: color[2],
          spin: (Math.random() - 0.5) * 0.2,
        });
      }

      // Névoa densa ao longo de toda a base
      for (let i = 0; i < 18 + power * 22; i++) {
        const color = COLORS[(Math.random() * 4) | 0];
        particles.push({
          x: Math.random() * w,
          y: h - Math.random() * 18,
          vx: (Math.random() - 0.5) * 1.6,
          vy: -(1.2 + Math.random() * 3.2) * power,
          life: 0,
          maxLife: 0.9 + Math.random() * 0.8,
          size: 14 + Math.random() * 36,
          kind: 0,
          r: color[0],
          g: color[1],
          b: color[2],
          spin: 0,
        });
      }

      if (particles.length > 1400) {
        particles = particles.slice(-1100);
      }
    };

    const tick = (now: number) => {
      const dt = Math.min(0.033, (now - lastTs) / 1000);
      lastTs = now;

      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      const j = jingleRef.current;

      // Batidas: jingle tocando → BPM; senão pulso idle mais suave
      if (j.playing) {
        const t = j.currentTime;
        const beat = Math.floor(t / BEAT);
        if (beat !== lastBeat && beat >= 0) {
          lastBeat = beat;
          const downbeat = beat % 4 === 0;
          const power = j.refrainHit
            ? 1.15
            : downbeat
              ? 0.95
              : 0.55 + j.ambience * 0.35;
          spawnBurst(power, w, h);
          onBeatRef.current?.(power);
        }
      } else {
        idleAcc += dt;
        if (idleAcc >= BEAT * 6) {
          idleAcc = 0;
          spawnBurst(0.28, w, h);
          onBeatRef.current?.(0.28);
        }
      }

      ctx.clearRect(0, 0, w, h);

      // Brilho ao longo de toda a base
      if (j.playing && j.ambience > 0.4) {
        const g = ctx.createLinearGradient(0, h * 0.7, 0, h);
        g.addColorStop(0, "rgba(255, 190, 0, 0)");
        g.addColorStop(1, `rgba(255, 190, 0, ${0.14 * j.ambience})`);
        ctx.fillStyle = g;
        ctx.fillRect(0, h * 0.7, w, h * 0.3);
      }

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.life += dt;
        if (p.life >= p.maxLife) {
          particles.splice(i, 1);
          continue;
        }

        p.vy += 9.5 * dt; // gravidade leve
        p.vx *= 1 - 0.55 * dt;
        p.x += p.vx * 60 * dt;
        p.y += p.vy * 60 * dt;

        const t = p.life / p.maxLife;
        const fade = t < 0.15 ? t / 0.15 : 1 - (t - 0.15) / 0.85;
        const alpha = Math.max(0, fade) * (p.kind === 0 ? 0.28 : 0.85);

        if (p.kind === 0) {
          const rad = p.size * (1 + t * 0.85);
          const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, rad);
          grad.addColorStop(0, `rgba(${p.r},${p.g},${p.b},${alpha})`);
          grad.addColorStop(0.45, `rgba(${p.r},${p.g},${p.b},${alpha * 0.35})`);
          grad.addColorStop(1, `rgba(${p.r},${p.g},${p.b},0)`);
          ctx.fillStyle = grad;
          ctx.beginPath();
          ctx.arc(p.x, p.y, rad, 0, Math.PI * 2);
          ctx.fill();
        } else {
          ctx.fillStyle = `rgba(${p.r},${p.g},${p.b},${alpha})`;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      frame = requestAnimationFrame(tick);
    };

    // Primeira explosão de entrada
    spawnBurst(0.7, canvas.clientWidth || 800, canvas.clientHeight || 400);
    onBeatRef.current?.(0.7);
    frame = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frame);
      ro.disconnect();
    };
  }, [reduceMotion]);

  if (reduceMotion) return null;

  return (
    <div ref={wrapRef} className="beat-powder" aria-hidden="true">
      <canvas ref={canvasRef} className="beat-powder__canvas" />
    </div>
  );
}
