"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { SITE } from "@/lib/site";

export default function Logo({
  dark = false,
  compact = false,
}: {
  dark?: boolean;
  compact?: boolean;
}) {
  return (
    <span className="flex items-center gap-3">
      <motion.span
        whileHover={{ rotate: 12, scale: 1.08 }}
        transition={{ type: "spring", stiffness: 300, damping: 14 }}
        className={`relative grid shrink-0 place-items-center overflow-hidden rounded-full bg-white ring-1 ${
          dark ? "ring-white/30" : "ring-brand-100"
        } ${compact ? "h-10 w-10" : "h-12 w-12"} shadow-[0_6px_18px_-6px_rgb(var(--tint)/0.4)]`}
      >
        <Image
          src="/images/live/logo.jpg"
          alt="IJITMES logo"
          fill
          sizes="48px"
          priority
          className="object-contain p-[2px]"
        />
      </motion.span>
      {!compact && (
        <span className="leading-none">
          <span
            className={`block font-serif-display text-[1.35rem] font-semibold tracking-tight ${
              dark ? "text-white" : "text-brand-700"
            }`}
          >
            {SITE.name}
          </span>
          <span
            className={`mt-1 block text-[0.6rem] font-semibold uppercase tracking-[0.14em] ${
              dark ? "text-ink-300" : "text-ink-500"
            }`}
          >
            Open Access Journal · Est. {SITE.established}
          </span>
        </span>
      )}
    </span>
  );
}
