import Reveal from "@/components/motion/Reveal";
import { WordReveal } from "@/components/motion/AnimatedText";

export default function SectionHeading({
  eyebrow,
  title,
  lede,
  align = "left",
  dark = false,
}: {
  eyebrow: string;
  title: string;
  lede?: string;
  align?: "left" | "center";
  dark?: boolean;
}) {
  const centered = align === "center";
  return (
    <div className={`max-w-2xl ${centered ? "mx-auto text-center" : ""}`}>
      <Reveal variant="down" y={12}>
        <span className={`eyebrow ${centered ? "eyebrow--center" : ""}`}>{eyebrow}</span>
      </Reveal>
      <h2
        className={`text-balance mt-4 font-serif-display text-3xl font-semibold leading-[1.12] sm:text-4xl lg:text-[2.75rem] ${
          dark ? "text-white" : "text-ink-900"
        }`}
      >
        <WordReveal text={title} delay={0.1} stagger={0.05} />
      </h2>
      {lede ? (
        <Reveal delay={0.35} variant="blur">
          <p className={`mt-4 text-[0.98rem] leading-relaxed ${dark ? "text-ink-300" : "text-ink-500"}`}>
            {lede}
          </p>
        </Reveal>
      ) : null}
    </div>
  );
}
