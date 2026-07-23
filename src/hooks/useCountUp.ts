import { useEffect, useState } from "react";

type UseCountUpOptions = {
  to: number;
  enabled: boolean;
  duration?: number;
  reduceMotion?: boolean;
};

/** Conta de 0 até `to` quando `enabled` fica true. */
export function useCountUp({
  to,
  enabled,
  duration = 1400,
  reduceMotion = false,
}: UseCountUpOptions): number {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!enabled) {
      setValue(0);
      return;
    }

    if (reduceMotion) {
      setValue(to);
      return;
    }

    let frame = 0;
    const start = performance.now();

    const tick = (now: number) => {
      const progress = Math.min(1, (now - start) / duration);
      const eased = 1 - (1 - progress) ** 3;
      setValue(Math.round(to * eased));
      if (progress < 1) {
        frame = requestAnimationFrame(tick);
      }
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [to, enabled, duration, reduceMotion]);

  return value;
}
