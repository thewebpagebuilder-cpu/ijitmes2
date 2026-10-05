import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  FilePenLine,
  FileSearch,
  Inbox,
  ScanSearch,
  Send,
  UploadCloud,
} from "lucide-react";
import PageHero from "@/components/ui/PageHero";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal, { RevealItem, RevealStagger } from "@/components/motion/Reveal";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "How to Publish a Research Paper",
  description:
    "The ultimate guide to publishing your research paper with IJITMES — prepare, submit, peer review, acceptance and publication within 1–2 days.",
};

const STEPS = [
  {
    n: "Step 1",
    icon: FilePenLine,
    title: "Prepare your paper",
    lede: "Before submitting, make sure the manuscript meets the journal's submission requirements.",
    points: [
      "Review the author guidelines — adhering to them ensures your paper is formatted correctly.",
      "Run a plagiarism and quality check — research papers must be original and free of plagiarism.",
      "Have an experienced scholar review your work for insights and improvements.",
      "Copy your final content into the IJITMES paper template (.docx).",
    ],
  },
  {
    n: "Step 2",
    icon: UploadCloud,
    title: "Submit the manuscript",
    lede: "Submission takes about ten minutes through the online portal.",
    points: [
      "Submit via the online form on this website — no account creation needed.",
      "Attach your .docx manuscript and complete the author and address details.",
      "Receive your unique Paper ID instantly on screen.",
      "An email confirmation of receipt arrives immediately after submission.",
    ],
  },
  {
    n: "Step 3",
    icon: FileSearch,
    title: "Peer review",
    lede: "Experts check your paper for technical accuracy, clarity and significance.",
    points: [
      "The paper is sent to subject reviewers for detailed evaluation (peer review).",
      "Reviewers may suggest improvements to methodology, significance or clarity.",
      "If a revision is requested, make the change and upload the updated paper.",
      "If everything is in order, the paper moves straight to a decision.",
    ],
  },
  {
    n: "Step 4",
    icon: Inbox,
    title: "Acceptance & publication",
    lede: "The acceptance email confirms that your research will be published.",
    points: [
      "Receive the acceptance decision by email within 7–8 hours of submission.",
      `Settle the processing charge (${SITE.feeINR} India / ${SITE.feeUSD} international).`,
      "Your paper is typeset and published online within 3–4 hours.",
      "E-certificates are issued to every author; hard copies on request.",
    ],
  },
] as const;

export default function HowToPublishPage() {
  return (
    <>
      <PageHero
        eyebrow="The Complete Guide"
        title="How to publish your research paper"
        lede="Publishing a paper is a milestone in any academic journey. This guide walks you through the essential steps — from first draft to a live, citable article."
        crumbs={[{ label: "Home", href: "/" }, { label: "How to Publish" }]}
      />

      <section className="py-14 lg:py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          {/* Intro banner with the live-site illustration */}
          <Reveal variant="zoom" className="mb-10">
            <div className="card relative grid items-center gap-8 overflow-hidden p-8 sm:grid-cols-[1fr_260px] sm:p-10">
              <div className="aurora-light absolute inset-0" aria-hidden />
              <div className="relative">
                <span className="eyebrow">Four stages · One to two days</span>
                <h2 className="mt-3 font-serif-display text-2xl font-semibold text-ink-900 sm:text-3xl">
                  Your paper&apos;s journey, start to finish
                </h2>
                <p className="mt-3 text-[0.9rem] leading-relaxed text-ink-500">
                  Prepare the manuscript with our template, submit online, pass peer review,
                  and go live — with a decision in 7–8 hours and publication in 3–4 hours after
                  acceptance.
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {["Prepare", "Submit", "Review", "Publish"].map((s, i) => (
                    <span
                      key={s}
                      className="animate-bob inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-[0.74rem] font-bold text-brand-700 ring-1 ring-brand-100"
                      style={{ animationDelay: `${i * 0.2}s` }}
                    >
                      <span className="grid h-4.5 w-4.5 place-items-center rounded-full bg-brand-600 text-[0.6rem] text-white">
                        {i + 1}
                      </span>
                      {s}
                    </span>
                  ))}
                </div>
              </div>
              <div className="relative mx-auto w-full max-w-[260px]">
                <Image
                  src="/images/live/paperpublish.png"
                  alt="Illustration of the research publishing process"
                  width={520}
                  height={520}
                  className="animate-floaty h-auto w-full drop-shadow-xl"
                />
              </div>
            </div>
          </Reveal>

          <RevealStagger className="relative space-y-6" delayChildren={0.1}>
            {STEPS.map((s, i) => (
              <RevealItem key={s.n}>
                <div className="card card-hover relative overflow-hidden p-7 sm:p-9">
                  <div
                    className="absolute -right-6 -top-8 select-none font-serif-display text-[7rem] font-semibold leading-none text-paper-200"
                    aria-hidden
                  >
                    {i + 1}
                  </div>
                  <div className="relative grid gap-6 sm:grid-cols-[auto_1fr] sm:gap-8">
                    <span className="grid h-14 w-14 shrink-0 place-items-center rounded-xl bg-ink-900 text-gold-400">
                      <s.icon className="h-6 w-6" strokeWidth={1.6} />
                    </span>
                    <div>
                      <p className="text-[0.7rem] font-bold uppercase tracking-[0.2em] text-gold-600">
                        {s.n}
                      </p>
                      <h2 className="mt-1.5 font-serif-display text-2xl font-semibold text-ink-900">
                        {s.title}
                      </h2>
                      <p className="mt-2 text-[0.9rem] leading-relaxed text-ink-500">
                        {s.lede}
                      </p>
                      <ul className="mt-5 grid gap-2.5 sm:grid-cols-2">
                        {s.points.map((p) => (
                          <li key={p} className="flex gap-2.5 text-[0.85rem] leading-relaxed text-ink-600">
                            <BadgeCheck className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                            {p}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </RevealItem>
            ))}
          </RevealStagger>

          {/* Plagiarism reminder */}
          <Reveal>
            <div className="mt-8 flex items-start gap-4 rounded-xl border border-amber-200 bg-amber-50 p-6">
              <ScanSearch className="mt-0.5 h-6 w-6 shrink-0 text-amber-600" />
              <div>
                <h3 className="text-[0.95rem] font-bold text-amber-900">
                  One golden rule: originality
                </h3>
                <p className="mt-1.5 text-[0.86rem] leading-relaxed text-amber-900/80">
                  Every submission is screened for plagiarism before review.
                  Manuscripts that fail screening are rejected without entering
                  the process — so run your own check first.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t hairline bg-ink-950 py-16 text-white">
        <div className="mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
          <SectionHeading
            dark
            align="center"
            eyebrow="Ready When You Are"
            title="Start your publication journey today"
            lede={`Acceptance in 7–8 hours · published in 1–2 days · flat fee of ${SITE.feeINR}.`}
          />
          <Reveal delay={0.12}>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Link href="/submit" className="btn btn-gold !px-7 !py-3.5">
                <Send className="h-4 w-4" />
                Submit manuscript
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/charges" className="btn btn-ghost-light !px-7 !py-3.5">
                View processing charges
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
