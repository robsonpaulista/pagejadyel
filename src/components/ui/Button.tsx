import { motion, useReducedMotion } from "framer-motion";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import "./Button.css";

type ButtonVariant = "outline" | "solid";

type CommonProps = {
  children: ReactNode;
  variant?: ButtonVariant;
  arrow?: boolean;
  className?: string;
};

type ButtonAsButton = CommonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children"> & {
    href?: undefined;
  };

type ButtonAsLink = CommonProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "className" | "children"> & {
    href: string;
  };

type ButtonProps = ButtonAsButton | ButtonAsLink;

export function Button(props: ButtonProps) {
  const reduceMotion = useReducedMotion();
  const { children, variant = "outline", arrow = false, className, ...rest } =
    props;
  const classes = ["btn", `btn--${variant}`, className].filter(Boolean).join(" ");
  const content = (
    <>
      <span>{children}</span>
      {arrow ? (
        <span className="btn__arrow" aria-hidden="true">
          →
        </span>
      ) : null}
    </>
  );

  const motionProps = reduceMotion
    ? {}
    : {
        whileHover: { scale: 1.03 },
        whileTap: { scale: 0.97 },
      };

  if ("href" in rest && rest.href !== undefined) {
    const { href, ...linkRest } = rest;
    return (
      <motion.a
        className={classes}
        href={href}
        {...motionProps}
        {...linkRest}
      >
        {content}
      </motion.a>
    );
  }

  const buttonRest = rest as Omit<
    ButtonHTMLAttributes<HTMLButtonElement>,
    "className" | "children"
  >;

  return (
    <motion.button
      className={classes}
      type="button"
      {...motionProps}
      {...buttonRest}
    >
      {content}
    </motion.button>
  );
}
