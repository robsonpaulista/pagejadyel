import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { HandHeart } from "lucide-react";
import "./IntroSplash.css";

/**
 * Abertura reveladora — mesma mecânica do coração no Hospital do Amor
 * (scale 1→18 + fade), com a mão acolhendo um coração (cuidado).
 */
export function IntroSplash() {
  const reduceMotion = useReducedMotion();
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (reduceMotion) {
      setDone(true);
      return;
    }

    document.documentElement.classList.add("intro-locked");
    const timer = window.setTimeout(() => {
      setDone(true);
      document.documentElement.classList.remove("intro-locked");
    }, 2000);

    return () => {
      window.clearTimeout(timer);
      document.documentElement.classList.remove("intro-locked");
    };
  }, [reduceMotion]);

  if (done || reduceMotion) return null;

  return (
    <motion.div
      className="intro-splash"
      aria-hidden="true"
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 0.55, ease: [0.43, 0.13, 0.23, 0.96], delay: 1.35 }}
    >
      <motion.div
        className="intro-splash__mark"
        initial={{ scale: 1, opacity: 1 }}
        animate={{ scale: 18, opacity: 0 }}
        transition={{
          duration: 1.5,
          ease: [0.43, 0.13, 0.23, 0.96],
          delay: 0.3,
        }}
      >
        <HandHeart className="intro-splash__hands" strokeWidth={1.75} />
      </motion.div>
    </motion.div>
  );
}
