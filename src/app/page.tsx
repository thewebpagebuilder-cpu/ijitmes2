import Image from "next/image";
import Link from "next/link";
import { desc } from "drizzle-orm";
import {
  ArrowRight,
  Award,
  BadgeCheck,
  BellRing,
  BookOpenCheck,
  BrainCircuit,
  Building2,
  Cpu,
  Cog,
  FileCheck2,
  FlaskConical,
  Globe2,
  Landmark,
  Megaphone,
  MessageSquareText,
  Network,
  Radar,
  Radio,
  ScanSearch,
  ScrollText,
  Send,
  ShieldCheck,
  Zap,
  type LucideIcon,
} from "lucide-react";
import Reveal, { RevealItem, RevealStagger } from "@/components/motion/Reveal";
import Counter from "@/components/motion/Counter";
import { WordReveal, WordSwap } from "@/components/motion/AnimatedText";
import { Magnetic, Parallax, Pop, TiltCard } from "@/components/motion/Interactive";
import Orbit from "@/components/motion/Orbit";
import GalleryMarquee from "@/components/motion/Gallery";
import ProcessSteps from "@/components/home/ProcessSteps";
import RingStat from "@/components/home/RingStat";
import SectionHeading from "@/components/ui/SectionHeading";
import PaperCard from "@/components/ui/PaperCard";
import { db } from "@/db";
import { publishedPapers, type PublishedPaper } from "@/db/schema";
import { SITE, DOMAINS, GALLERY_ROWS } from "@/lib/site";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const latestPapers = await db
    .select()
    .from(publishedPapers)
    .orderBy(desc(publishedPapers.publishedAt))
    .limit(3)
    .catch(() => []);

  return (
    <>
      <AnnouncementBar />
      <Hero />
      <TrustStrip />
      <ProcessSection />
      <AboutSection />
      <GallerySection />
      <DomainsSection />
      <LatestSection papers={latestPapers} />
      <PlagiarismSection />
      <CtaBand />
    </>
  );
}

/* ── Announcement ticker ─────────────────────────────────────────────────── */

function AnnouncementBar() {
  const items = [
    `Call for Papers — ${SITE.currentIssueLabel} (${SITE.currentIssuePeriod})`,
    "Acceptance notification within 7–8 hours",
    `Publication within 3–4 hours of acceptance · Fee just ${SITE.feeINR}`,
    "E-certificates issued to all authors",
    "Plagiarism screening on every submission",
    "Conference proceedings welcome",
  ];
  const row = [...items, ...items];
  return (
    <div className="relative overflow-hidden border-b border-gold-500/30 bg-gold-100">
      <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 sm:px-6 lg:px-8">
        <span className="z-10 flex shrink-0 items-center gap-1.5 bg-gold-100 py-2 pr-2 text-[0.7rem] font-bold uppercase tracking-[0.14em] text-gold-700">
          <Megaphone className="h-3.5 w-3.5 animate-wiggle" />
          Latest
        </span>
        <div className="relative flex-1 overflow-hidden py-2 [mask-image:linear-gradient(90deg,transparent,black_6%,black_94%,transparent)]">
          <div className="animate-ticker flex w-max items-center gap-10">
            {row.map((text, i) => (
              <span key={i} className="flex items-center gap-2.5 whitespace-nowrap text-[0.78rem] font-medium text-ink-700">
                <span className="h-1.5 w-1.5 rounded-full bg-gold-600" />
                {text}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Hero ────────────────────────────────────────────────────────────────── */

function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="aurora-light absolute inset-0" aria-hidden />
      <div className="grid-paper absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" aria-hidden />

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 pb-20 pt-12 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:pb-28 lg:pt-16">
        <div>
          <Reveal variant="down" y={18}>
            <p className="inline-flex flex-wrap items-center gap-2 rounded-full border border-brand-200 bg-white/80 px-4 py-2 text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-brand-700 shadow-sm backdrop-blur">
              <BadgeCheck className="h-4 w-4 text-gold-600" />
              Peer-Reviewed · Open Access · Monthly · Est. {SITE.established}
            </p>
          </Reveal>

          <h1 className="mt-7 font-serif-display text-[2.8rem] font-semibold leading-[1.04] text-ink-950 sm:text-6xl lg:text-[4.3rem]">
            <WordReveal text="Publish your research in" delay={0.15} />
            <br />
            <span className="relative inline-block" style={{ color: "var(--hero-word)" }}>
              <WordSwap
                words={["Engineering.", "Science.", "Technology.", "AI Research."]}
                className="text-gradient-animate"
              />
            </span>
            <br />
            <WordReveal text="Reviewed in hours, live in days." delay={0.5} className="text-ink-800" />
          </h1>

          <Reveal delay={0.9} variant="blur">
            <p className="mt-7 max-w-xl text-[1.02rem] leading-relaxed text-ink-500">
              {SITE.fullName} publishes original work across engineering, science
              and technology — first decision in{" "}
              <strong className="font-semibold text-ink-800">7–8 hours</strong>,
              publication in{" "}
              <strong className="font-semibold text-ink-800">1–2 days</strong>, and a
              flat fee of <strong className="font-semibold text-ink-800">{SITE.feeINR}</strong>.
            </p>
          </Reveal>

          <Reveal delay={1.05}>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <Magnetic>
                <Link href="/submit" className="btn btn-primary !px-7 !py-4 !text-base">
                  <Send className="h-4.5 w-4.5" />
                  Submit Manuscript
                </Link>
              </Magnetic>
              <Magnetic strength={0.2}>
                <Link href="/track" className="btn btn-outline !px-7 !py-4 !text-base">
                  <Radar className="h-4.5 w-4.5" />
                  Track Your Paper
                </Link>
              </Magnetic>
            </div>
          </Reveal>

          <Reveal delay={1.2}>
            <dl className="mt-12 grid grid-cols-2 gap-6 border-t hairline pt-8 sm:grid-cols-4">
              <Stat value="7–8" unit="hrs" label="First decision" />
              <Stat value="3–4" unit="hrs" label="Accept → publish" />
              <Stat value="449" unit="₹" label="Flat fee, India" prefix />
              <Stat value="12" unit="×" label="Issues per year" />
            </dl>
          </Reveal>
        </div>

        <div className="relative lg:pl-6">
          <Orbit />
        </div>
      </div>

      {/* Scroll cue */}
      <div className="pointer-events-none absolute bottom-5 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-ink-400 lg:flex" aria-hidden>
        <span className="text-[0.6rem] font-bold uppercase tracking-[0.3em]">Scroll</span>
        <span className="flex h-8 w-5 items-start justify-center rounded-full border border-ink-300 p-1">
          <span className="animate-scroll-dot h-1.5 w-1.5 rounded-full bg-gold-500" />
        </span>
      </div>
    </section>
  );
}

function Stat({ value, unit, label, prefix = false }: { value: string; unit: string; label: string; prefix?: boolean }) {
  const numeric = parseInt(value, 10);
  const isNumeric = !Number.isNaN(numeric) && !value.includes("–");
  return (
    <div className="group">
      <dt className="sr-only">{label}</dt>
      <dd className="font-serif-display text-[2rem] font-semibold leading-none text-ink-900 transition-colors group-hover:text-brand-600">
        {isNumeric && prefix ? (
          <Counter to={numeric} prefix={unit} />
        ) : isNumeric ? (
          <>
            <Counter to={numeric} />
            <span className="ml-0.5 text-[1.1rem] text-gold-600">{unit}</span>
          </>
        ) : (
          <>
            {value}
            <span className="ml-0.5 text-[1.1rem] text-gold-600">{unit}</span>
          </>
        )}
      </dd>
      <dd className="mt-1.5 text-[0.75rem] font-medium uppercase tracking-[0.1em] text-ink-400">{label}</dd>
    </div>
  );
}

/* ── Trust strip ─────────────────────────────────────────────────────────── */

function TrustStrip() {
  const items: { icon: LucideIcon; text: string }[] = [
    { icon: BookOpenCheck, text: "Open Access Journal" },
    { icon: ShieldCheck, text: "Plagiarism-checked" },
    { icon: Award, text: "E-Certificates for Authors" },
    { icon: Globe2, text: "Worldwide Reviewer Network" },
    { icon: BellRing, text: "Email & SMS Updates" },
    { icon: MessageSquareText, text: "24/7 Author Support" },
  ];
  return (
    <section className="relative border-y hairline bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <RevealStagger className="grid grid-cols-2 divide-x divide-paper-200 sm:grid-cols-3 lg:grid-cols-6" delayChildren={0.07}>
          {items.map((item, i) => (
            <RevealItem key={item.text} variant="zoom" className="border-y border-paper-200 sm:border-y-0">
              <div className="group flex flex-col items-center gap-2.5 px-3 py-6 text-center transition-colors hover:bg-paper-100/70">
                <Pop>
                  <span
                    className="animate-bob grid h-10 w-10 place-items-center rounded-full bg-brand-50 text-brand-600 ring-1 ring-brand-100 transition-colors group-hover:bg-brand-600 group-hover:text-white"
                    style={{ animationDelay: `${i * 0.25}s` }}
                  >
                    <item.icon className="h-4.5 w-4.5" strokeWidth={1.8} />
                  </span>
                </Pop>
                <span className="text-[0.74rem] font-semibold leading-tight text-ink-600">{item.text}</span>
              </div>
            </RevealItem>
          ))}
        </RevealStagger>
      </div>
    </section>
  );
}

/* ── Publication process ─────────────────────────────────────────────────── */

function ProcessSection() {
  return (
    <section className="relative overflow-hidden py-20 lg:py-28">
      <Parallax speed={0.25} className="pointer-events-none absolute -right-24 top-10 opacity-[0.07]">
        <Image src="/images/live/logo.jpg" alt="" width={420} height={420} className="animate-spin-slower rounded-full" />
      </Parallax>
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow="Publication Process"
            title="From submission to publication in 1–2 days"
            lede="A transparent, four-stage pipeline. You are notified at every step by email and SMS, and can follow your Paper ID at any time."
          />
          <Reveal delay={0.1} variant="left">
            <Magnetic strength={0.2}>
              <Link href="/how-to-publish" className="btn btn-outline">
                Read the full guide
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Magnetic>
          </Reveal>
        </div>
        <ProcessSteps />
      </div>
    </section>
  );
}

/* ── About ───────────────────────────────────────────────────────────────── */

function AboutSection() {
  const benefits = [
    "Acceptance notification within 7–8 hours",
    "Published 3–4 hours after acceptance & payment",
    "Simple, fast online submission process",
    "Unique Paper ID to track your progress",
    "E-certificates for all publishing authors",
    "Hard-copy certificates available on request",
    "Online plagiarism check on every paper",
    "Quick review and publishing support",
    "Low publication fee to support research growth",
    "Monthly periodical — 12 issues per year",
    "Worldwide reviewer network",
    "24/7 chat support for authors",
  ];
  return (
    <section className="relative overflow-hidden bg-ink-950 py-20 text-white lg:py-28">
      <div className="aurora absolute inset-0 opacity-80" aria-hidden />
      <div className="grid-dark absolute inset-0" aria-hidden />

      <div className="relative mx-auto grid max-w-7xl gap-14 px-4 sm:px-6 lg:grid-cols-[1fr_1.1fr] lg:gap-20 lg:px-8">
        <div>
          <SectionHeading dark eyebrow="About the Journal" title="A modern home for engineering & science research" />
          <Reveal delay={0.1} variant="blur">
            <div className="mt-6 space-y-4 text-[0.94rem] leading-relaxed text-ink-200">
              <p>
                {SITE.name} ({SITE.fullName}) is a peer-reviewed, open-access, low-cost and
                fast-processing journal. It invites national and international conferences to
                publish their proceedings online, and offers researchers a dependable platform
                for high-quality, affordable publication.
              </p>
              <p>
                Authors track their paper online with a unique Paper ID and receive email and SMS
                notifications at every stage — from first screening to the moment the paper goes
                live in the current issue.
              </p>
            </div>
          </Reveal>

          {/* Photo from the live site */}
          <Reveal delay={0.2} variant="zoom" className="mt-8">
            <div className="border-beam img-shine relative overflow-hidden rounded-xl">
              <Image
                src="/images/live/about.jpg"
                alt="Researchers collaborating on a publication"
                width={1200}
                height={700}
                className="animate-ken-burns h-56 w-full object-cover sm:h-64"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-950/80 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-4">
                <p className="text-[0.8rem] font-semibold leading-snug">
                  Research reviewed by a worldwide
                  <br />
                  network of subject experts
                </p>
                <span className="grid h-12 w-12 shrink-0 place-items-center overflow-hidden rounded-full bg-white p-0.5">
                  <Image src="/images/live/logo.jpg" alt="" width={44} height={44} className="rounded-full" />
                </span>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.28}>
            <div className="mt-8 grid grid-cols-3 gap-4">
              {[
                { v: 8, s: "", l: "Research domains" },
                { v: 449, s: "", l: "INR flat fee", prefix: "₹" },
                { v: 100, s: "%", l: "Open access" },
              ].map((m) => (
                <div key={m.l} className="rounded-lg border border-white/10 bg-white/5 p-4 text-center backdrop-blur-sm transition-colors hover:border-gold-400/50">
                  <p className="font-serif-display text-2xl font-semibold text-gold-300">
                    <Counter to={m.v} prefix={m.prefix ?? ""} suffix={m.s} />
                  </p>
                  <p className="mt-1 text-[0.68rem] font-medium uppercase tracking-[0.12em] text-ink-300">{m.l}</p>
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.34}>
            <Magnetic>
              <Link href="/about" className="btn btn-gold mt-9">
                Aims &amp; scope
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Magnetic>
          </Reveal>
        </div>

        <RevealStagger className="grid content-start gap-3 sm:grid-cols-2" delayChildren={0.06}>
          {benefits.map((b, i) => (
            <RevealItem key={b} variant={i % 2 === 0 ? "left" : "right"}>
              <div className="group flex items-start gap-3 rounded-lg border border-white/10 bg-white/[0.04] px-4 py-3.5 backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-gold-500/50 hover:bg-white/[0.08]">
                <ShieldCheck className="mt-0.5 h-4.5 w-4.5 shrink-0 text-gold-400 transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110" />
                <span className="text-[0.85rem] font-medium leading-snug text-ink-100">{b}</span>
              </div>
            </RevealItem>
          ))}
        </RevealStagger>
      </div>
    </section>
  );
}

/* ── Gallery ─────────────────────────────────────────────────────────────── */

function GallerySection() {
  return (
    <section className="overflow-hidden border-b hairline bg-paper-100/50 py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          align="center"
          eyebrow="Research in Focus"
          title="Where modern research happens"
          lede="From civil structures to artificial intelligence — a glimpse of the disciplines our authors advance every month."
        />
      </div>
      <Reveal className="mt-12" variant="blur">
        <GalleryMarquee rows={GALLERY_ROWS} />
      </Reveal>
    </section>
  );
}

/* ── Domains ─────────────────────────────────────────────────────────────── */

const DOMAIN_ICONS: Record<string, LucideIcon> = {
  "computer-engineering": Cpu,
  "civil-engineering": Building2,
  "electrical-engineering": Zap,
  "artificial-intelligence": BrainCircuit,
  "mechanical-engineering": Cog,
  science: FlaskConical,
  "electronics-telecommunication": Radio,
  "information-technology": Network,
};

function DomainsSection() {
  return (
    <section className="relative py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          align="center"
          eyebrow="Areas of Coverage"
          title="Eight domains. One rigorous standard."
          lede="The journal welcomes original research articles, review papers, case studies and technical notes across the following disciplines."
        />
        <RevealStagger className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4" delayChildren={0.07}>
          {DOMAINS.map((d) => {
            const Icon = DOMAIN_ICONS[d.id] ?? Landmark;
            return (
              <RevealItem key={d.id} variant="flip">
                <TiltCard intensity={7}>
                  <Link
                    href={`/issues?area=${encodeURIComponent(d.name)}`}
                    className="card group block h-full overflow-hidden transition-shadow duration-500 hover:shadow-[var(--shadow-lift)]"
                  >
                    <div className="relative h-40 overflow-hidden">
                      <Image
                        src={d.image}
                        alt={d.name}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        className="object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-ink-950/85 via-ink-950/20 to-transparent" />
                      <span className="absolute bottom-3 left-4 grid h-11 w-11 place-items-center rounded-full bg-white text-brand-600 shadow-lg ring-[3px] ring-gold-500 transition-transform duration-500 group-hover:-translate-y-1 group-hover:rotate-[360deg]">
                        <Icon className="h-5 w-5" strokeWidth={1.9} />
                      </span>
                    </div>
                    <div className="p-5">
                      <h3 className="font-serif-display text-[1.08rem] font-semibold leading-snug text-ink-900 transition-colors group-hover:text-brand-700">
                        {d.name}
                      </h3>
                      <p className="mt-1.5 text-[0.8rem] font-medium text-ink-400">{d.count} sub-domains covered</p>
                      <span className="mt-4 flex items-center gap-1.5 text-[0.74rem] font-bold uppercase tracking-[0.12em] text-brand-600">
                        Browse papers
                        <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1.5" />
                      </span>
                    </div>
                  </Link>
                </TiltCard>
              </RevealItem>
            );
          })}
        </RevealStagger>
      </div>
    </section>
  );
}

/* ── Latest papers ───────────────────────────────────────────────────────── */

function LatestSection({ papers }: { papers: PublishedPaper[] }) {
  if (papers.length === 0) return null;
  return (
    <section className="relative overflow-hidden border-t hairline bg-paper-100/60 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow={`${SITE.currentIssueLabel} · ${SITE.currentIssuePeriod}`}
            title="Latest published research"
            lede="A selection of papers from the current issue. The full digital library is freely searchable by title, author, keyword or Paper ID."
          />
          <Reveal delay={0.1} variant="left">
            <Magnetic strength={0.2}>
              <Link href="/issues" className="btn btn-primary">
                <ScrollText className="h-4 w-4" />
                Browse current issue
              </Link>
            </Magnetic>
          </Reveal>
        </div>
        <RevealStagger className="mt-12 grid gap-6 md:grid-cols-3" delayChildren={0.12}>
          {papers.map((paper) => (
            <RevealItem key={paper.publishedId} variant="up" y={50}>
              <TiltCard intensity={5}>
                <PaperCard paper={paper} />
              </TiltCard>
            </RevealItem>
          ))}
        </RevealStagger>
      </div>
    </section>
  );
}

/* ── Plagiarism policy ───────────────────────────────────────────────────── */

function PlagiarismSection() {
  return (
    <section className="py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal variant="zoom" y={0}>
          <div className="card grid overflow-hidden lg:grid-cols-[0.95fr_1.05fr]">
            <div className="relative bg-ink-950 p-10 text-white lg:p-14">
              <div className="aurora absolute inset-0 opacity-70" aria-hidden />
              <div className="grid-dark absolute inset-0" aria-hidden />
              <div className="relative">
                <span className="eyebrow">Editorial Ethics</span>
                <h3 className="mt-4 font-serif-display text-3xl font-semibold leading-tight sm:text-4xl">
                  Zero tolerance for plagiarism
                </h3>
                <p className="mt-5 text-[0.94rem] leading-relaxed text-ink-200">
                  Every manuscript is screened with industry-standard plagiarism detection before
                  review. Our ethics policy protects the integrity of the scholarly record — and
                  the reputation of every author we publish.
                </p>

                <div className="img-shine relative mt-8 overflow-hidden rounded-xl bg-white p-3 shadow-2xl">
                  <Image
                    src="/images/live/plag-checker.jpg"
                    alt="Plagiarism screening of every manuscript"
                    width={800}
                    height={450}
                    className="h-auto w-full rounded-lg"
                  />
                  <span className="absolute right-5 top-5 inline-flex items-center gap-1.5 rounded-full bg-ink-900/90 px-3 py-1.5 text-[0.68rem] font-bold uppercase tracking-wider text-gold-300 backdrop-blur">
                    <ScanSearch className="h-3.5 w-3.5 animate-pulse" />
                    Screening live
                  </span>
                </div>

                <div className="mt-8 flex items-center justify-around gap-6">
                  <RingStat dark value={100} label="Submissions screened" />
                  <RingStat dark value={0} suffix="" label="Tolerance threshold" />
                </div>
              </div>
            </div>
            <div className="p-10 lg:p-14">
              <RevealStagger className="space-y-6" delayChildren={0.14}>
                {[
                  {
                    icon: FileCheck2,
                    title: "Screening before review",
                    body: "All manuscripts are checked with tools such as Plagiarism Checker X. Any paper failing initial screening is rejected outright and does not proceed.",
                  },
                  {
                    icon: ScanSearch,
                    title: "Clear definitions",
                    body: "Plagiarism means using another person's ideas, processes, findings or wording without appropriate credit — including self-plagiarism, such as submitting near-identical versions to multiple journals.",
                  },
                  {
                    icon: Landmark,
                    title: "Formal post-publication action",
                    body: "If plagiarism is found after publication, the Editor-in-Chief leads a formal investigation. Serious cases may trigger institutional notification, a published notice of concern, marked PDFs, or full retraction.",
                  },
                ].map((item) => (
                  <RevealItem key={item.title} variant="right">
                    <div className="group flex gap-4 rounded-xl p-3 transition-colors hover:bg-paper-100/80">
                      <Pop>
                        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-gold-100 text-gold-700 transition-colors group-hover:bg-brand-600 group-hover:text-white">
                          <item.icon className="h-5 w-5" strokeWidth={1.8} />
                        </span>
                      </Pop>
                      <div>
                        <h4 className="text-[0.98rem] font-bold text-ink-900">{item.title}</h4>
                        <p className="mt-1.5 text-[0.86rem] leading-relaxed text-ink-500">{item.body}</p>
                      </div>
                    </div>
                  </RevealItem>
                ))}
              </RevealStagger>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ── CTA band ─────────────────────────────────────────────────────────────── */

function CtaBand() {
  return (
    <section className="pb-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal variant="zoom">
          <div className="relative overflow-hidden rounded-2xl bg-ink-950 px-8 py-14 text-center text-white shadow-[0_40px_90px_-30px_rgb(var(--tint)/0.7)] sm:px-14 lg:py-20">
            <div className="aurora absolute inset-0" aria-hidden />
            <div className="grid-dark absolute inset-0" aria-hidden />
            <div className="rays absolute left-1/2 top-1/2 h-[900px] w-[900px] -translate-x-1/2 -translate-y-1/2 opacity-60" aria-hidden />

            <div className="relative">
              <div className="relative mx-auto h-20 w-20">
                <span className="absolute inset-0 animate-pulse-ring rounded-full bg-gold-400/40" />
                <span className="absolute inset-0 animate-pulse-ring rounded-full bg-gold-400/30 [animation-delay:0.8s]" />
                <span className="animate-float-soft relative grid h-20 w-20 place-items-center overflow-hidden rounded-full bg-white p-1 shadow-2xl ring-[3px] ring-gold-500">
                  <Image src="/images/live/logo.jpg" alt="IJITMES" width={72} height={72} className="rounded-full" />
                </span>
              </div>
              <h2 className="text-balance mx-auto mt-7 max-w-2xl font-serif-display text-3xl font-semibold leading-tight sm:text-4xl lg:text-[2.9rem]">
                <WordReveal text="Ready to publish your research?" stagger={0.08} />
              </h2>
              <Reveal delay={0.4} variant="blur">
                <p className="mx-auto mt-4 max-w-xl text-[0.98rem] leading-relaxed text-ink-200">
                  Join authors across {DOMAINS.length} disciplines. Submit today — receive your
                  decision within 7–8 hours and see your paper live in the {SITE.currentIssuePeriod}{" "}
                  issue.
                </p>
              </Reveal>
              <Reveal delay={0.55}>
                <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
                  <Magnetic>
                    <Link href="/submit" className="btn btn-gold !px-8 !py-4 !text-base">
                      <Send className="h-4.5 w-4.5" />
                      Submit Manuscript
                    </Link>
                  </Magnetic>
                  <Magnetic strength={0.2}>
                    <Link href="/guidelines" className="btn btn-ghost-light !px-8 !py-4 !text-base">
                      Read author guidelines
                    </Link>
                  </Magnetic>
                </div>
              </Reveal>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
