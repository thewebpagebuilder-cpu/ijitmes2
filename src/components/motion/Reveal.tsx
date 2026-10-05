"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

type Variant = "up" | "down" | "left" | "right" | "zoom" | "blur" | "flip";

const EASE = [0.22, 1, 0.36, 1] as const;

function build(variant: Variant, distance: number, reduce: boolean): Variants {
  const d = reduce ? 0 : distance;
  switch (variant) {
    case "left":
      return { hidden: { opacity: 0, x: -d, filter: "blur(6px)" }, show: { opacity: 1, x: 0, filter: "blur(0px)" } };
    case "right":
      return { hidden: { opacity: 0, x: d, filter: "blur(6px)" }, show: { opacity: 1, x: 0, filter: "blur(0px)" } };
    case "down":
      return { hidden: { opacity: 0, y: -d, filter: "blur(6px)" }, show: { opacity: 1, y: 0, filter: "blur(0px)" } };
    case "zoom":
      return { hidden: { opacity: 0, scale: reduce ? 1 : 0.86, filter: "blur(8px)" }, show: { opacity: 1, scale: 1, filter: "blur(0px)" } };
    case "blur":
      return { hidden: { opacity: 0, filter: "blur(14px)" }, show: { opacity: 1, filter: "blur(0px)" } };
    case "flip":
      return { hidden: { opacity: 0, rotateX: reduce ? 0 : -28, y: d / 2, transformPerspective: 900 }, show: { opacity: 1, rotateX: 0, y: 0, transformPerspective: 900 } };
    default:
      return { hidden: { opacity: 0, y: d, filter: "blur(6px)" }, show: { opacity: 1, y: 0, filter: "blur(0px)" } };
  }
}

export default function Reveal({
  children,
  delay = 0,
  y = 36,
  variant = "up",
  duration = 0.8,
  className,
  once = true,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  variant?: Variant;
  duration?: number;
  className?: string;
  once?: boolean;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once, margin: "-60px" }}
      variants={build(variant, y, Boolean(reduce))}
      transition={{ duration, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

export function RevealStagger({
  children,
  className,
  delayChildren = 0.09,
}: {
  children: ReactNode;
  className?: string;
  delayChildren?: number;
}) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-60px" }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: delayChildren } } }}
    >
      {children}
    </motion.div>
  );
}

export function RevealItem({
  children,
  className,
  y = 34,
  variant = "up",
}: {
  children: ReactNode;
  className?: string;
  y?: number;
  variant?: Variant;
}) {
  const reduce = useReducedMotion();
  const v = build(variant, y, Boolean(reduce));
  return (
    <motion.div
      className={className}
      variants={{
        hidden: v.hidden,
        show: { ...(v.show as object), transition: { duration: 0.75, ease: EASE } },
      }}
    >
      {children}
    </motion.div>
  );
}
