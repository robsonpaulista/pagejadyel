import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import "./Section.css";

type SectionProps = {
  children: ReactNode;
  id?: string;
  className?: string;
} & Omit<HTMLAttributes<HTMLElement>, "className" | "children" | "id">;

export const Section = forwardRef<HTMLElement, SectionProps>(function Section(
  { children, id, className, ...rest },
  ref,
) {
  return (
    <section
      ref={ref}
      id={id}
      className={["section", className].filter(Boolean).join(" ")}
      {...rest}
    >
      {children}
    </section>
  );
});
