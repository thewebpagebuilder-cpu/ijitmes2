"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  BadgeCheck,
  Banknote,
  CheckCircle2,
  CircleDashed,
  FileSearch,
  Globe2,
  Loader2,
  MailCheck,
  Radar,
  ScanSearch,
  Search,
  Users,
  XCircle,
} from "lucide-react";

type TimelineItem = {
  status: string;
  reached: boolean;
  current: boolean;
  at: string | null;
};

type Submission = {
  paperId: string;
  title: string;
  subjectArea: string;
  keywords: string;
  authorName: string;
  coAuthorCount: number;
  fileName: string | null;
  doiRequested: boolean;
  status: string;
  statusNote: string | null;
  submittedAt: string;
  timeline: TimelineItem[];
};

const STAGE_META: Record<string, { label: string; icon: React.ElementType; desc: string }> = {
  submitted: {
    label: "Submitted",
    icon: MailCheck,
    desc: "Manuscript received and logged with a unique Paper ID.",
  },
  screening: {
    label: "Plagiarism Screening",
    icon: ScanSearch,
    desc: "Automated originality check with industry-standard tools.",
  },
  under_review: {
    label: "Peer Review",
    icon: FileSearch,
    desc: "Evaluation by subject reviewers for rigour and relevance.",
  },
  decision: {
    label: "Decision",
    icon: BadgeCheck,
    desc: "Acceptance decision emailed to the corresponding author.",
  },
  payment: {
    label: "Processing Fee",
    icon: Banknote,
    desc: "Publication charge settled via UPI, card or PayPal.",
  },
  published: {
    label: "Published",
    icon: Globe2,
    desc: "Live in the current issue — open access, with e-certificates.",
  },
};

export default function TrackForm() {
  const [paperId, setPaperId] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState<Submission | null>(null);

  async function lookup(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setResult(null);
    try {
      const res = await fetch(
        `/api/track?paperId=${encodeURIComponent(paperId)}&email=${encodeURIComponent(email)}`
      );
      const json = await res.json();
      if (!res.ok || !json.ok) throw new Error(json.error || "Lookup failed");
      setResult(json.submission);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Lookup failed. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-8">
      {/* Lookup form */}
      <form onSubmit={lookup} className="card p-6 sm:p-8">
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label className="field-label" htmlFor="paperId">Paper ID</label>
            <input
              id="paperId"
              className="field"
              placeholder="IJITMES-2026-0000"
              value={paperId}
              onChange={(e) => setPaperId(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="field-label" htmlFor="email">Registered Email</label>
            <input
              id="email"
              type="email"
              className="field"
              placeholder="you@university.edu"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="mt-6 flex flex-wrap items-center gap-4">
          <button type="submit" disabled={loading} className="btn btn-primary disabled:opacity-60">
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Looking up…
              </>
            ) : (
              <>
                <Search className="h-4 w-4" />
                Check status
              </>
            )}
          </button>
          {error && (
            <motion.p
              initial={{ opacity: 0, x: -6 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-2 text-[0.84rem] font-semibold text-red-600"
            >
              <XCircle className="h-4.5 w-4.5" />
              {error}
            </motion.p>
          )}
        </div>
      </form>

      {/* Result */}
      <AnimatePresence mode="wait">
        {result && (
          <motion.div
            key={result.paperId}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="card overflow-hidden"
          >
            {/* Header */}
            <div className="border-b hairline bg-paper-100/60 p-6 sm:p-8">
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="rounded-full bg-ink-900 px-3.5 py-1.5 text-[0.72rem] font-bold tracking-wide text-gold-300">
                  {result.paperId}
                </span>
                <span className="rounded-full bg-gold-100 px-3.5 py-1.5 text-[0.72rem] font-bold uppercase tracking-wide text-gold-700">
                  {STAGE_META[result.status]?.label ?? result.status}
                </span>
                {result.doiRequested && (
                  <span className="rounded-full bg-ink-50 px-3.5 py-1.5 text-[0.72rem] font-bold text-ink-600 ring-1 ring-ink-100">
                    DOI requested
                  </span>
                )}
              </div>
              <h2 className="mt-4 font-serif-display text-xl font-semibold leading-snug text-ink-900 sm:text-2xl">
                {result.title}
              </h2>
              <p className="mt-2.5 flex flex-wrap items-center gap-x-5 gap-y-1.5 text-[0.8rem] text-ink-500">
                <span className="flex items-center gap-1.5">
                  <Users className="h-3.5 w-3.5 text-gold-600" />
                  {result.authorName}
                  {result.coAuthorCount > 0 && ` + ${result.coAuthorCount} co-author${result.coAuthorCount > 1 ? "s" : ""}`}
                </span>
                <span className="flex items-center gap-1.5">
                  <Radar className="h-3.5 w-3.5 text-gold-600" />
                  {result.subjectArea}
                </span>
                <span>
                  Submitted{" "}
                  {new Date(result.submittedAt).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </span>
              </p>
            </div>

            {/* Timeline */}
            <div className="p-6 sm:p-8">
              <h3 className="mb-6 text-[0.72rem] font-bold uppercase tracking-[0.18em] text-ink-400">
                Publication pipeline
              </h3>
              <ol className="relative space-y-0">
                {result.timeline.map((item, i) => {
                  const meta = STAGE_META[item.status];
                  const Icon = meta?.icon ?? CircleDashed;
                  const isLast = i === result.timeline.length - 1;
                  return (
                    <li key={item.status} className="relative flex gap-5 pb-8 last:pb-0">
                      {!isLast && (
                        <span
                          className={`absolute left-[22px] top-11 h-[calc(100%-2.4rem)] w-[2px] rounded-full ${
                            item.reached && !item.current ? "bg-emerald-400" : "bg-paper-300"
                          }`}
                          aria-hidden
                        />
                      )}
                      <span
                        className={`z-10 grid h-11 w-11 shrink-0 place-items-center rounded-full ring-1 ${
                          item.current
                            ? "bg-ink-900 text-gold-400 ring-ink-800"
                            : item.reached
                              ? "bg-emerald-500 text-white ring-emerald-400"
                              : "bg-white text-ink-300 ring-paper-300"
                        }`}
                      >
                        {item.current ? (
                          <span className="relative flex">
                            <span className="absolute -inset-1 animate-ping rounded-full bg-ink-900/25" />
                            <Icon className="h-5 w-5" />
                          </span>
                        ) : item.reached ? (
                          <CheckCircle2 className="h-5 w-5" />
                        ) : (
                          <Icon className="h-5 w-5" />
                        )}
                      </span>
                      <div className="pt-1">
                        <p
                          className={`text-[0.92rem] font-bold ${
                            item.current
                              ? "text-ink-900"
                              : item.reached
                                ? "text-emerald-700"
                                : "text-ink-400"
                          }`}
                        >
                          {meta?.label ?? item.status}
                          {item.current && (
                            <span className="ml-2 rounded-full bg-gold-100 px-2 py-0.5 text-[0.62rem] font-bold uppercase tracking-wider text-gold-700">
                              In progress
                            </span>
                          )}
                        </p>
                        <p className="mt-1 text-[0.8rem] leading-relaxed text-ink-500">
                          {meta?.desc}
                        </p>
                        {item.at && (
                          <p className="mt-1 text-[0.72rem] font-semibold text-ink-400">
                            {new Date(item.at).toLocaleString("en-IN", {
                              day: "numeric",
                              month: "short",
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </p>
                        )}
                      </div>
                    </li>
                  );
                })}
              </ol>

              {result.statusNote && (
                <div className="mt-8 rounded-lg border border-ink-100 bg-ink-50 p-5">
                  <p className="text-[0.68rem] font-bold uppercase tracking-[0.16em] text-ink-500">
                    Editorial note
                  </p>
                  <p className="mt-1.5 text-[0.86rem] leading-relaxed text-ink-700">
                    {result.statusNote}
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
