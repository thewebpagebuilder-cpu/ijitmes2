import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  Activity,
  Archive,
  BrainCircuit,
  Building2,
  Cog,
  Cpu,
  FlaskConical,
  Globe2,
  Landmark,
  Leaf,
  Network,
  Radio,
  Sigma,
  Zap,
} from "lucide-react";
import PageHero from "@/components/ui/PageHero";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal, { RevealItem, RevealStagger } from "@/components/motion/Reveal";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "About the Journal",
  description:
    "Aims, scope and editorial policies of IJITMES — a peer-reviewed, open-access, monthly journal for engineering, science and technology research.",
};

const SCOPE = [
  { icon: Cpu, text: "Advances in mechanical, civil, electrical, electronics and computer engineering" },
  { icon: BrainCircuit, text: "Developments in information technology, artificial intelligence and robotics" },
  { icon: Network, text: "Interdisciplinary research bridging science and engineering" },
  { icon: Activity, text: "Applied sciences with industrial and practical applications" },
  { icon: Leaf, text: "Environmental engineering and sustainable technology solutions" },
  { icon: Sigma, text: "Mathematical modelling, simulations and computational methods" },
  { icon: FlaskConical, text: "Modern trends in materials science, nanotechnology and smart systems" },
  { icon: Landmark, text: "Original research, review papers, case studies and technical notes" },
];

const DOMAIN_CHIPS = [
  { icon: Cpu, label: "Computer Engineering" },
  { icon: Building2, label: "Civil Engineering" },
  { icon: Zap, label: "Electrical Engineering" },
  { icon: Radio, label: "Electronics & Telecommunication" },
  { icon: Cog, label: "Mechanical Engineering" },
  { icon: BrainCircuit, label: "Artificial Intelligence" },
  { icon: Network, label: "Information Technology" },
  { icon: FlaskConical, label: "Science & Applied Sciences" },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About IJITMES"
        title="Advancing knowledge, rapidly and responsibly"
        lede={`${SITE.name} is a peer-reviewed, open-access, low-cost and fast-processing journal serving the global engineering and science research community since ${SITE.established}.`}
        crumbs={[{ label: "Home", href: "/" }, { label: "About" }]}
      />

      {/* Mission */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-[1fr_0.85fr] lg:gap-16 lg:px-8">
          <div>
            <SectionHeading
              eyebrow="Our Mission"
              title="A dependable platform for high-impact, affordable publication"
            />
            <Reveal delay={0.1}>
              <div className="mt-6 space-y-4 text-[0.95rem] leading-relaxed text-ink-500">
                <p>
                  The primary aim of the journal is to give researchers,
                  academics and practitioners a platform to share cutting-edge
                  research, novel methodologies and emerging trends that drive
                  technological progress and scientific discovery.
                </p>
                <p>
                  We invite national and international conferences to publish
                  their proceedings online, and we treat speed as a feature of
                  quality — not a compromise of it. Every manuscript is
                  plagiarism-screened and peer-reviewed, yet authors still
                  receive a first decision within 7–8 hours and publication
                  within 1–2 days.
                </p>
                <p>
                  Authors follow their paper online with a unique Paper ID and
                  receive email and SMS notifications at every stage of the
                  publication process — from first submission to the moment the
                  article goes live.
                </p>
              </div>
            </Reveal>
          </div>
          <Reveal delay={0.12}>
            <div className="relative">
              <div className="drop-shadow-cover overflow-hidden rounded-lg">
                <Image
                  src="/images/journal-cover.jpg"
                  alt="IJITMES journal cover"
                  width={800}
                  height={1067}
                  className="h-auto w-full"
                />
              </div>
              <div className="card absolute -bottom-6 -left-6 hidden px-5 py-4 shadow-lg sm:block">
                <p className="text-[0.66rem] font-bold uppercase tracking-[0.18em] text-ink-400">
                  Publishing since
                </p>
                <p className="font-serif-display text-3xl font-semibold text-ink-900">
                  {SITE.established}
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Scope */}
      <section className="border-t hairline bg-paper-100/60 py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Aims & Scope"
            title="What we publish"
            lede="Our scope includes, but is not limited to, the following areas of engineering, science and technology research."
          />
          <RevealStagger className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {SCOPE.map((s) => (
              <RevealItem key={s.text}>
                <div className="card card-hover h-full p-6">
                  <span className="grid h-11 w-11 place-items-center rounded-lg bg-gold-100 text-gold-700">
                    <s.icon className="h-5 w-5" strokeWidth={1.8} />
                  </span>
                  <p className="mt-4 text-[0.88rem] font-medium leading-relaxed text-ink-700">
                    {s.text}
                  </p>
                </div>
              </RevealItem>
            ))}
          </RevealStagger>

          <Reveal className="mt-10">
            <div className="flex flex-wrap items-center gap-2.5">
              {DOMAIN_CHIPS.map((d) => (
                <span
                  key={d.label}
                  className="inline-flex items-center gap-2 rounded-full border hairline bg-white px-4 py-2 text-[0.78rem] font-semibold text-ink-600 shadow-sm"
                >
                  <d.icon className="h-3.5 w-3.5 text-gold-600" />
                  {d.label}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Facts strip */}
      <section className="bg-ink-950 py-16 text-white lg:py-20">
        <div className="grid-dark absolute" aria-hidden />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[1fr_auto]">
            <div>
              <SectionHeading
                dark
                eyebrow="Publication Frequency"
                title="Twelve issues a year, published monthly"
                lede="A continuous publication model ensures timely dissemination of accepted research. Each monthly issue spans engineering, technology and applied sciences — reflecting current innovations and modern trends."
              />
            </div>
            <Reveal delay={0.15} className="flex items-center">
              <div className="grid grid-cols-3 gap-4">
                {[
                  { v: "12", l: "Issues / year" },
                  { v: "1–2", l: "Days to publish" },
                  { v: "24/7", l: "Author support" },
                ].map((m) => (
                  <div
                    key={m.l}
                    className="min-w-[8rem] rounded-xl border border-white/10 bg-white/5 p-5 text-center backdrop-blur-sm"
                  >
                    <p className="font-serif-display text-3xl font-semibold text-gold-300">{m.v}</p>
                    <p className="mt-1.5 text-[0.68rem] font-medium uppercase tracking-[0.14em] text-ink-300">
                      {m.l}
                    </p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Journal details table */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <SectionHeading
                eyebrow="Journal Facts"
                title="Editorial & publishing details"
                lede="Key information about the journal for authors, librarians and indexing services."
              />
              <Reveal delay={0.12}>
                <div className="mt-8 flex flex-wrap gap-4">
                  <Link href="/submit" className="btn btn-primary">
                    Submit a manuscript
                  </Link>
                  <Link href="/guidelines" className="btn btn-outline">
                    Author guidelines
                  </Link>
                </div>
              </Reveal>
            </div>
            <Reveal delay={0.1}>
              <dl className="card divide-y divide-paper-200">
                {[
                  ["Journal title", SITE.fullName],
                  ["Abbreviation", SITE.shortName],
                  ["Publisher", `${SITE.name} Editorial Office, Nashik, India`],
                  ["Frequency", "Monthly — 12 issues per year"],
                  ["Model", "Open access · Peer-reviewed · Online"],
                  ["First decision", "7–8 hours from submission"],
                  ["Time to publish", "3–4 hours after acceptance and payment"],
                  ["Processing charge", `${SITE.feeINR} (India) · ${SITE.feeUSD} (international)`],
                  ["Established", SITE.established],
                  ["Contact", SITE.email],
                ].map(([k, v]) => (
                  <div key={k} className="grid gap-1 px-6 py-4 sm:grid-cols-[200px_1fr] sm:gap-6">
                    <dt className="text-[0.72rem] font-bold uppercase tracking-[0.14em] text-ink-400">
                      {k}
                    </dt>
                    <dd className="text-[0.88rem] font-medium leading-relaxed text-ink-800">{v}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Conferences CTA */}
      <section className="pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="card relative overflow-hidden p-10 lg:p-14">
              <div
                className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-gold-200/50 blur-[80px]"
                aria-hidden
              />
              <div className="relative grid items-center gap-8 lg:grid-cols-[auto_1fr_auto]">
                <span className="grid h-16 w-16 place-items-center rounded-xl bg-ink-900 text-gold-400">
                  <Archive className="h-7 w-7" strokeWidth={1.6} />
                </span>
                <div>
                  <h3 className="font-serif-display text-2xl font-semibold text-ink-900">
                    Conference proceedings welcome
                  </h3>
                  <p className="mt-2 max-w-2xl text-[0.92rem] leading-relaxed text-ink-500">
                    {SITE.name} invites national and international conferences to
                    publish their research proceedings online. Organisers receive
                    a dedicated issue schedule and bulk submission support.
                  </p>
                </div>
                <Link href="/contact" className="btn btn-gold">
                  <Globe2 className="h-4 w-4" />
                  Partner with us
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
