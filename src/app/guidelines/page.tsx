import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, Mail } from "lucide-react";
import PageHero from "@/components/ui/PageHero";
import Reveal from "@/components/motion/Reveal";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Author Guidelines",
  description:
    "IJITMES author guidelines — manuscript preparation, structure, submission process, ethical considerations and post-acceptance procedures.",
};

const SECTIONS = [
  {
    n: "01",
    title: "Scope & Focus",
    body: "IJITMES publishes original research articles, reviews, case studies and short communications across engineering, science and technology. Submissions should contribute to the advancement of knowledge in the field and align with the journal's aim to disseminate high-quality, impactful research.",
    points: [],
  },
  {
    n: "02",
    title: "Paper Preparation",
    body: "Prepare your manuscript carefully against the following general requirements.",
    groups: [
      {
        h: "2.1 General Requirements",
        points: [
          "Language — all papers must be written in English. Authors whose first language is not English are encouraged to have the manuscript professionally edited before submission.",
          "Originality — the manuscript must be original, unpublished and not under consideration elsewhere.",
          "Word count — research articles should not exceed 10,000 words including references and figures; review articles may run longer with editor approval.",
          "Format — prepare with a standard word processor (e.g. Microsoft Word) and save as .doc or .docx using the IJITMES paper template.",
        ],
      },
      {
        h: "2.2 Paper Structure",
        points: [
          "Title page — a concise, informative title; full names, affiliations and email addresses of all authors; corresponding author's contact details; acknowledgement of funding sources where applicable.",
          "Abstract — a summary of 150–250 words covering objective, methods, results and conclusions, followed by 4–6 keywords.",
          "Main text — Introduction (background, rationale, objectives), Methods (design, data collection, analysis), Results (findings with tables and figures), Discussion (interpretation and comparison with existing literature).",
          "References — follow a consistent citation style; every reference cited in the text must appear in the reference list.",
          "Tables & figures — placed after the references, each with a descriptive title and legend where applicable.",
        ],
      },
      {
        h: "2.3 Supplementary Materials",
        points: [
          "Datasets, videos and additional figures may be submitted as supplementary material and published online alongside the article. Reference them clearly in the manuscript.",
        ],
      },
    ],
    points: [],
  },
  {
    n: "03",
    title: "Submission Process",
    body: "All manuscripts are submitted through the online portal — create a submission, complete the form and upload the manuscript and any supplementary files.",
    groups: [
      {
        h: "3.1 Peer Review",
        points: [
          "Initial screening — the editorial team evaluates every submission for scope, compliance and plagiarism before review.",
          "Peer review — qualifying manuscripts are sent to subject reviewers for detailed evaluation of methodology, clarity and significance.",
          "Revisions — if reviewers request changes, authors resubmit the revised manuscript within the specified timeframe.",
          "Final decision — the editorial team decides acceptance, revision or rejection based on reviewer recommendations.",
        ],
      },
    ],
    points: [],
  },
  {
    n: "04",
    title: "Ethical Considerations",
    body: "",
    points: [
      "Plagiarism — authors must ensure their work is free of plagiarism, including self-plagiarism. All submissions are screened with detection software.",
      "Conflicts of interest — disclose any potential conflicts of interest within the manuscript.",
      "Ethical approvals — research involving human participants or animals must include a statement of the ethical approvals obtained.",
    ],
  },
  {
    n: "05",
    title: "Post-Acceptance",
    body: "",
    groups: [
      {
        h: "5.1 Proofs",
        points: [
          "After acceptance, authors receive page proofs for final approval. Review them carefully and return within 10 days — only minor corrections are possible at this stage.",
        ],
      },
      {
        h: "5.2 Publication Fee",
        points: [
          `A flat processing charge of ${SITE.feeINR} (Indian authors) or ${SITE.feeUSD} (international authors) covers open access, peer review, typesetting and certificates.`,
        ],
      },
      {
        h: "5.3 Open Access",
        points: [
          "All IJITMES articles are open access — freely available to the global research community immediately on publication, with authors retaining copyright.",
        ],
      },
    ],
    points: [],
  },
] as const;

export default function GuidelinesPage() {
  return (
    <>
      <PageHero
        eyebrow="For Authors"
        title="Author guidelines"
        lede="Welcome to IJITMES. To ensure a smooth submission and uphold the standards of the journal, please review and follow these guidelines carefully."
        crumbs={[{ label: "Home", href: "/" }, { label: "Author Guidelines" }]}
      />

      <section className="py-14 lg:py-20">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[260px_1fr] lg:px-8">
          {/* Sticky TOC */}
          <aside className="hidden lg:block">
            <div className="card sticky top-32 p-5">
              <p className="text-[0.7rem] font-bold uppercase tracking-[0.18em] text-ink-400">
                On this page
              </p>
              <nav className="mt-4 space-y-1" aria-label="Table of contents">
                {SECTIONS.map((s) => (
                  <a
                    key={s.n}
                    href={`#section-${s.n}`}
                    className="group flex items-baseline gap-3 rounded-md px-2.5 py-2 text-[0.84rem] font-medium text-ink-600 transition-colors hover:bg-paper-100 hover:text-ink-900"
                  >
                    <span className="font-serif-display text-[0.78rem] font-semibold text-gold-600">
                      {s.n}
                    </span>
                    {s.title}
                  </a>
                ))}
                <a
                  href="#contact-box"
                  className="group flex items-baseline gap-3 rounded-md px-2.5 py-2 text-[0.84rem] font-medium text-ink-600 transition-colors hover:bg-paper-100 hover:text-ink-900"
                >
                  <span className="font-serif-display text-[0.78rem] font-semibold text-gold-600">06</span>
                  Contact
                </a>
              </nav>
              <div className="mt-5 border-t hairline pt-4">
                <Link href="/submit" className="btn btn-gold w-full !py-3 text-[0.82rem]">
                  Submit manuscript
                </Link>
              </div>
            </div>
          </aside>

          {/* Content */}
          <div className="space-y-6">
            {SECTIONS.map((s, idx) => (
              <Reveal key={s.n} delay={Math.min(idx * 0.04, 0.12)}>
                <section
                  id={`section-${s.n}`}
                  className="card scroll-mt-32 p-7 sm:p-10"
                >
                  <div className="flex items-baseline gap-4">
                    <span className="font-serif-display text-[2.4rem] font-semibold leading-none text-ink-100">
                      {s.n}
                    </span>
                    <h2 className="font-serif-display text-2xl font-semibold text-ink-900">
                      {s.title}
                    </h2>
                  </div>
                  {s.body ? (
                    <p className="mt-4 text-[0.92rem] leading-relaxed text-ink-500">
                      {s.body}
                    </p>
                  ) : null}

                  {"groups" in s && s.groups
                    ? s.groups.map((g) => (
                        <div key={g.h} className="mt-7">
                          <h3 className="flex items-center gap-2.5 text-[0.95rem] font-bold text-ink-800">
                            <span className="h-1.5 w-1.5 rounded-full bg-gold-500" />
                            {g.h}
                          </h3>
                          <ul className="mt-3.5 space-y-2.5">
                            {g.points.map((p) => (
                              <li key={p} className="flex gap-3 text-[0.88rem] leading-relaxed text-ink-600">
                                <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-emerald-500" />
                                {p}
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))
                    : null}

                  {s.points.length > 0 && (
                    <ul className="mt-5 space-y-2.5">
                      {s.points.map((p) => (
                        <li key={p} className="flex gap-3 text-[0.88rem] leading-relaxed text-ink-600">
                          <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-emerald-500" />
                          {p}
                        </li>
                      ))}
                    </ul>
                  )}

                  {s.n === "03" && (
                    <div className="mt-7 rounded-lg bg-paper-100/70 p-5">
                      <p className="text-[0.84rem] leading-relaxed text-ink-600">
                        Ready to submit? Use the{" "}
                        <Link href="/submit" className="font-bold text-ink-900 underline decoration-gold-500 decoration-2 underline-offset-4">
                          online submission portal
                        </Link>{" "}
                        — you will receive a Paper ID and email confirmation immediately.
                      </p>
                    </div>
                  )}
                </section>
              </Reveal>
            ))}

            {/* Contact box */}
            <Reveal>
              <section
                id="contact-box"
                className="scroll-mt-32 overflow-hidden rounded-xl bg-ink-950 p-8 text-white sm:p-10"
              >
                <div className="flex flex-wrap items-center justify-between gap-6">
                  <div className="max-w-lg">
                    <h2 className="font-serif-display text-2xl font-semibold">
                      Questions about the guidelines?
                    </h2>
                    <p className="mt-2 text-[0.9rem] leading-relaxed text-ink-300">
                      The editorial office is here to help at every step of the
                      submission process — typically responding within a few hours.
                    </p>
                  </div>
                  <a href={`mailto:${SITE.email}`} className="btn btn-gold">
                    <Mail className="h-4 w-4" />
                    {SITE.email}
                  </a>
                </div>
              </section>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
