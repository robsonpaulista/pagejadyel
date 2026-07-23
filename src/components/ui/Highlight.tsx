import type { ReactNode } from "react";
import "./Highlight.css";

export type AccentColor = "pink" | "orange" | "blue" | "amber" | "purple" | "yellow";

type HighlightProps = {
  children: ReactNode;
  color?: AccentColor;
};

export function Highlight({ children, color = "pink" }: HighlightProps) {
  return <em className={`highlight highlight--${color}`}>{children}</em>;
}
