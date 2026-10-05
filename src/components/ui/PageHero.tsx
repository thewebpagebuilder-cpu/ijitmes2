import Link from "next/link";
import Image from "next/image";
import { ChevronRight } from "lucide-react";
import Reveal from "@/components/motion/Reveal";
import { WordReveal } from "@/components/motion/AnimatedText";

export default function PageHero({
  eyebrow,
  title,
  lede,
  crumbs,
  children,
}: {
  eyebrow: string;
  title: string;
  lede?: string;
  crumbs: { label: string; href?: string }[];
  children?: React.ReactNode;
}) {
  return (
    <section className="relative overflow-hidden bg-ink-950">
      <div className="aurora absolute inset-0 opacity-90" aria-hidden />
      <div className="grid-dark absolute inset-0" aria-hidden />
      <div className="rays absolute -right-40 -top-56 h-[760px] w-[760px] opacity-70" aria-hidden />

      {/* Floating logo watermark */}
      <div className="pointer-events-none absolute -right-10 top-1/2 hidden -translate-y-1/2 opacity-[0.08] lg:block" aria-hidden>
        <Image
          src="/images/live/logo.jpg"
          alt=""
          width={380}
          height={380}
          className="animate-spin-slower rounded-full"
        />
      </div>

      {/* Drifting octagons (echo of the logo shape) */}
      {[
        { cls: "left-[8%] top-[18%] h-10 w-10", d: "0s" },
        { cls: "left-[30%] bottom-[12%] h-6 w-6", d: "1.2s" },
        { cls: "right-[28%] top-[14%] h-8 w-8", d: "2.1s" },
      ].map((o, i) => (
        <span
          key={i}
          className={`animate-floaty absolute ${o.cls} border border-gold-400/40`}
          style={{
            clipPath: "polygon(30% 0,70% 0,100% 30%,100% 70%,70% 100%,30% 100%,0 70%,0 30%)",
            animationDelay: o.d,
            background: "rgb(var(--accent-rgb) / 0.12)",
          }}
          aria-hidden
        />
      ))}

      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-gold-500/70 to-transparent" aria-hidden />

      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <Reveal variant="down" y={14}>
          <nav aria-label="Breadcrumb">
            <ol className="flex flex-wrap items-center gap-1 text-[0.75rem] font-medium text-ink-300">
              {crumbs.map((c, i) => (
                <li key={i} className="flex items-center gap-1">
                  {i > 0 && <ChevronRight className="h-3.5 w-3.5 text-ink-500" />}
                  {c.href ? (
                    <Link href={c.href} className="link-draw transition-colors hover:text-gold-300">
                      {c.label}
                    </Link>
                  ) : (
                    <span className="text-gold-300">{c.label}</span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        </Reveal>

        <Reveal delay={0.08}>
          <span className="eyebrow mt-8">{eyebrow}</span>
        </Reveal>
        <h1 className="text-balance mt-4 max-w-3xl font-serif-display text-4xl font-semibold leading-[1.08] text-white sm:text-5xl lg:text-[3.4rem]">
          <WordReveal text={title} delay={0.2} stagger={0.07} />
        </h1>
        {lede ? (
          <Reveal delay={0.5} variant="blur">
            <p className="mt-5 max-w-2xl text-[1rem] leading-relaxed text-ink-300">{lede}</p>
          </Reveal>
        ) : null}

        {children ? (
          <Reveal delay={0.65} className="mt-8">
            {children}
          </Reveal>
        ) : null}
      </div>
    </section>
  );
}
