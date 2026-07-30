import { useEffect, useRef, useState } from "react";

type UseCountUpOptions = {
  to: number;
  enabled: boolean;
  duration?: number;
  reduceMotion?: boolean;
  onComplete?: () => void;
};

/** Conta de 0 até `to` quando `enabled` fica true. */
export function useCountUp({
  to,
  enabled,
  duration = 1400,
  reduceMotion = false,
  onComplete,
}: UseCountUpOptions): number {
  const [value, setValue] = useState(0);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  useEffect(() => {
    if (!enabled) {
      setValue(0);
      return;
    }

    if (reduceMotion) {
      setValue(to);
      onCompleteRef.current?.();
      return;
    }

    let frame = 0;
    let completed = false;
    const start = performance.now();

    const tick = (now: number) => {
      const progress = Math.min(1, (now - start) / duration);
      const eased = 1 - (1 - progress) ** 3;
      setValue(Math.round(to * eased));
      if (progress < 1) {
        frame = requestAnimationFrame(tick);
      } else if (!completed) {
        completed = true;
        onCompleteRef.current?.();
      }
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [to, enabled, duration, reduceMotion]);

  return value;
}
