"use client";

import { useEffect, useRef } from "react";
import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";

export default function RingStat({
  value,
  suffix = "%",
  label,
  size = 120,
  dark = false,
}: {
  value: number;
  suffix?: string;
  label: string;
  size?: number;
  dark?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const mv = useMotionValue(0);
  const spring = useSpring(mv, { duration: 1800, bounce: 0 });
  const r = 44;
  const c = 2 * Math.PI * r;
  const dash = useTransform(spring, (v) => c - (c * v) / 100);
  const numRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (inView) mv.set(value);
  }, [inView, mv, value]);

  useEffect(
    () =>
      spring.on("change", (v) => {
        if (numRef.current) numRef.current.textContent = `${Math.round(v)}${suffix}`;
      }),
    [spring, suffix]
  );

  return (
    <div ref={ref} className="flex flex-col items-center text-center">
      <div className="relative" style={{ width: size, height: size }}>
        <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90">
          <circle cx="50" cy="50" r={r} fill="none" strokeWidth="6" className={dark ? "stroke-white/10" : "stroke-paper-200"} />
          <motion.circle
            cx="50"
            cy="50"
            r={r}
            fill="none"
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray={c}
            style={{ strokeDashoffset: dash }}
            className="stroke-gold-500"
          />
        </svg>
        <span
          ref={numRef}
          className={`absolute inset-0 grid place-items-center font-serif-display text-2xl font-semibold ${
            dark ? "text-white" : "text-ink-900"
          }`}
        >
          0{suffix}
        </span>
      </div>
      <p className={`mt-3 text-[0.7rem] font-bold uppercase tracking-[0.14em] ${dark ? "text-ink-300" : "text-ink-500"}`}>
        {label}
      </p>
    </div>
  );
}
