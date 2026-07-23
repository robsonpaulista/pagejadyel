import type { HTMLAttributes, ReactNode } from "react";
import "./Container.css";

type ContainerProps = {
  children: ReactNode;
  className?: string;
  grid?: boolean;
} & Omit<HTMLAttributes<HTMLDivElement>, "className" | "children">;

export function Container({
  children,
  className,
  grid = false,
  ...rest
}: ContainerProps) {
  const classes = ["container", grid ? "grid-12" : null, className]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={classes} {...rest}>
      {children}
    </div>
  );
}
