import { motion, useReducedMotion, type Variants } from "framer-motion";
import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import "./Section.css";

type SectionProps = {
  children: ReactNode;
  id?: string;
  className?: string;
} & Omit<HTMLAttributes<HTMLElement>, "className" | "children" | "id">;

const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

export const Section = forwardRef<HTMLElement, SectionProps>(function Section(
  { children, id, className, ...rest },
  ref,
) {
  const reduceMotion = useReducedMotion();
  const classes = ["section", className].filter(Boolean).join(" ");

  if (reduceMotion) {
    return (
      <section ref={ref} id={id} className={classes} {...rest}>
        {children}
      </section>
    );
  }

  return (
    <motion.section
      ref={ref}
      id={id}
      className={classes}
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.12 }}
      {...rest}
    >
      {children}
    </motion.section>
  );
});
