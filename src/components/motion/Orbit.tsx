"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Award, Clock3, Globe2, ShieldCheck } from "lucide-react";

const CHIPS = [
  { src: "/images/live/civil.jpg", label: "Civil" },
  { src: "/images/live/ai.jpg", label: "AI" },
  { src: "/images/live/science.jpg", label: "Science" },
  { src: "/images/live/electrical.webp", label: "Electrical" },
  { src: "/images/live/mechanical.jpg", label: "Mechanical" },
  { src: "/images/live/computer.jpg", label: "Computer" },
  { src: "/images/live/electronics.jpg", label: "E&TC" },
  { src: "/images/live/it.jpg", label: "IT" },
];

const ORBIT_SECONDS = 70;

export default function Orbit() {
  return (
    <div className="relative mx-auto aspect-square w-[min(520px,92vw)] select-none">
      {/* Rotating rays (like the logo's sunburst) */}
      <div className="rays absolute inset-[-14%] rounded-full" aria-hidden />

      {/* Soft glow */}
      <div
        className="absolute inset-[18%] rounded-full bg-brand-500/15 blur-3xl"
        aria-hidden
      />

      {/* Outer dashed ring */}
      <svg className="animate-spin-slower absolute inset-0 h-full w-full" viewBox="0 0 100 100" aria-hidden>
        <circle
          cx="50"
          cy="50"
          r="48.5"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.35"
          strokeDasharray="1.4 2.2"
          className="text-brand-400/70"
        />
      </svg>
      {/* Inner thin ring */}
      <svg className="animate-spin-rev-slow absolute inset-[9%] h-[82%] w-[82%]" viewBox="0 0 100 100" aria-hidden>
        <circle
          cx="50"
          cy="50"
          r="49"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.5"
          strokeDasharray="12 6"
          className="text-gold-400/70"
        />
      </svg>

      {/* Orbiting domain chips */}
      <div
        className="absolute inset-0"
        style={{ animation: `spin ${ORBIT_SECONDS}s linear infinite` }}
        aria-hidden
      >
        {CHIPS.map((chip, i) => {
          const angle = (i / CHIPS.length) * Math.PI * 2 - Math.PI / 2;
          const r = 48.5; // percent
          const left = 50 + r * Math.cos(angle);
          const top = 50 + r * Math.sin(angle);
          return (
            <div
              key={chip.label}
              className="absolute h-[15%] w-[15%] -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${left}%`, top: `${top}%` }}
            >
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.5 + i * 0.09, type: "spring", stiffness: 260, damping: 18 }}
                className="h-full w-full"
                style={{ animation: `spin-rev ${ORBIT_SECONDS}s linear infinite` }}
              >
                <div className="relative h-full w-full overflow-hidden rounded-full bg-white p-[3px] shadow-[0_10px_24px_-8px_rgb(var(--tint)/0.45)] ring-[3px] ring-gold-500">
                  <Image
                    src={chip.src}
                    alt=""
                    fill
                    sizes="90px"
                    className="rounded-full object-cover"
                  />
                </div>
              </motion.div>
            </div>
          );
        })}
      </div>

      {/* Centre logo */}
      <motion.div
        initial={{ scale: 0.6, opacity: 0, rotate: -12 }}
        animate={{ scale: 1, opacity: 1, rotate: 0 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
        className="absolute inset-[21%]"
      >
        <div className="animate-float-soft relative h-full w-full">
          <div className="absolute inset-0 rounded-full bg-white shadow-[0_30px_70px_-20px_rgb(var(--tint)/0.5)] ring-1 ring-brand-100" />
          <Image
            src="/images/live/logo.jpg"
            alt="IJITMES logo"
            fill
            sizes="300px"
            priority
            className="rounded-full object-contain p-[6%]"
          />
        </div>
      </motion.div>

      {/* Floating badges */}
      <FloatBadge
        className="left-[-6%] top-[14%] hidden sm:flex"
        delay={1.1}
        icon={<Clock3 className="h-4 w-4" />}
        title="7–8 hrs"
        sub="first decision"
      />
      <FloatBadge
        className="right-[-8%] top-[30%] hidden sm:flex"
        delay={1.3}
        icon={<ShieldCheck className="h-4 w-4" />}
        title="Plagiarism"
        sub="screened"
      />
      <FloatBadge
        className="bottom-[16%] left-[-10%] hidden sm:flex"
        delay={1.5}
        icon={<Award className="h-4 w-4" />}
        title="E-certificate"
        sub="every author"
      />
      <FloatBadge
        className="bottom-[8%] right-[-6%] hidden sm:flex"
        delay={1.7}
        icon={<Globe2 className="h-4 w-4" />}
        title="Open access"
        sub="worldwide"
      />
    </div>
  );
}

function FloatBadge({
  className,
  delay,
  icon,
  title,
  sub,
}: {
  className?: string;
  delay: number;
  icon: React.ReactNode;
  title: string;
  sub: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`card absolute z-10 items-center gap-2.5 px-3.5 py-2.5 shadow-lg ${className ?? ""}`}
    >
      <motion.span
        animate={{ y: [0, -3, 0] }}
        transition={{ duration: 3 + delay, repeat: Infinity, ease: "easeInOut" }}
        className="grid h-8 w-8 place-items-center rounded-full bg-gold-100 text-gold-700"
      >
        {icon}
      </motion.span>
      <span className="text-[0.74rem] font-bold leading-tight text-ink-900">
        {title}
        <span className="block font-medium text-ink-500">{sub}</span>
      </span>
    </motion.div>
  );
}
