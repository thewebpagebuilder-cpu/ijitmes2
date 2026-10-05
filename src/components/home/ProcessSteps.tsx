"use client";

import { useRef } from "react";
import { motion, useInView, useScroll, useSpring, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { TiltCard } from "@/components/motion/Interactive";
import { PUBLICATION_STEPS } from "@/lib/site";

export default function ProcessSteps() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 85%", "end 55%"] });
  const line = useSpring(useTransform(scrollYProgress, [0, 1], [0, 1]), { stiffness: 90, damping: 24 });

  return (
    <div ref={ref} className="relative mt-14">
      {/* Progress rail (desktop) */}
      <div className="absolute left-0 right-0 top-[52px] hidden h-[2px] bg-paper-200 lg:block" aria-hidden>
        <motion.div
          style={{ scaleX: line }}
          className="h-full origin-left bg-gradient-to-r from-brand-600 via-gold-500 to-brand-600"
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {PUBLICATION_STEPS.map((s, i) => (
          <motion.div
            key={s.step}
            initial={{ opacity: 0, y: 40, rotateX: -16 }}
            animate={inView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
            transition={{ duration: 0.75, delay: 0.12 * i, ease: [0.22, 1, 0.36, 1] }}
            style={{ transformPerspective: 900 }}
            className="relative"
          >
            <TiltCard intensity={6}>
              <div className="card group relative h-full overflow-hidden p-6 transition-shadow duration-500 hover:shadow-[var(--shadow-lift)]">
                {/* Step bubble on the rail */}
                <div className="flex items-center justify-between">
                  <span className="relative grid h-11 w-11 place-items-center rounded-full bg-ink-900 font-serif-display text-[1.05rem] font-semibold text-gold-300 ring-4 ring-paper-50">
                    <motion.span
                      className="absolute inset-0 rounded-full bg-brand-500/40"
                      animate={{ scale: [1, 1.6], opacity: [0.6, 0] }}
                      transition={{ duration: 2.2, repeat: Infinity, delay: i * 0.4, ease: "easeOut" }}
                    />
                    <span className="relative">{s.step}</span>
                  </span>
                  <motion.span
                    animate={{ y: [0, -3, 0] }}
                    transition={{ duration: 2.6, repeat: Infinity, delay: i * 0.3, ease: "easeInOut" }}
                    className="rounded-full bg-gold-100 px-3 py-1.5 text-[0.68rem] font-bold uppercase tracking-[0.08em] text-gold-700"
                  >
                    {s.time}
                  </motion.span>
                </div>
                <h3 className="mt-5 font-serif-display text-[1.15rem] font-semibold text-ink-900 transition-colors group-hover:text-brand-700">
                  {s.title}
                </h3>
                <p className="mt-2.5 text-[0.85rem] leading-relaxed text-ink-500">{s.body}</p>
                <span className="mt-5 flex items-center gap-1.5 text-[0.76rem] font-bold uppercase tracking-[0.12em] text-brand-600 opacity-0 transition-all duration-300 group-hover:opacity-100">
                  Stage {i + 1} of 4
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                </span>
                <span className="absolute inset-x-0 bottom-0 h-[3px] origin-left scale-x-0 bg-gradient-to-r from-brand-600 to-gold-500 transition-transform duration-500 group-hover:scale-x-100" />
              </div>
            </TiltCard>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
