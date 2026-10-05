"use client";

import { useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  Check,
  Copy,
  FileText,
  FileUp,
  Loader2,
  PartyPopper,
  Plus,
  Send,
  Trash2,
  X,
} from "lucide-react";
import { DOMAINS, SITE } from "@/lib/site";

type CoAuthor = { name: string; affiliation: string };

const STEPS = [
  { id: 1, label: "Paper Details" },
  { id: 2, label: "Main Author" },
  { id: 3, label: "Co-Authors" },
  { id: 4, label: "Address" },
  { id: 5, label: "Review" },
];

const initialData = {
  title: "",
  subjectArea: "",
  abstract: "",
  keywords: "",
  doiRequested: false,
  hardCopyRequested: false,
  authorName: "",
  authorEmail: "",
  authorPhone: "",
  authorAffiliation: "",
  address: "",
  city: "",
  state: "",
  country: "India",
  postalCode: "",
};

export default function SubmitForm() {
  const [step, setStep] = useState(1);
  const [data, setData] = useState(initialData);
  const [coAuthors, setCoAuthors] = useState<CoAuthor[]>([]);
  const [file, setFile] = useState<File | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState("");
  const [paperId, setPaperId] = useState<string | null>(null);
  const [declared, setDeclared] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const set = (key: keyof typeof initialData) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const value =
      e.target.type === "checkbox"
        ? (e.target as HTMLInputElement).checked
        : e.target.value;
    setData((d) => ({ ...d, [key]: value }));
    setErrors((err) => ({ ...err, [key]: "" }));
  };

  const wordCount = useMemo(
    () => (data.abstract.trim() ? data.abstract.trim().split(/\s+/).length : 0),
    [data.abstract]
  );

  function validate(current: number): boolean {
    const e: Record<string, string> = {};
    if (current === 1) {
      if (data.title.trim().length < 10) e.title = "Enter a descriptive title (min. 10 characters).";
      if (!data.subjectArea) e.subjectArea = "Select a subject area.";
      if (data.abstract.trim().length < 100) e.abstract = "Abstract must be at least 100 characters.";
      if (wordCount > 300) e.abstract = "Abstract should not exceed 300 words.";
      if (!data.keywords.trim()) e.keywords = "Provide 4–6 keywords separated by commas.";
    }
    if (current === 2) {
      if (!data.authorName.trim()) e.authorName = "Author name is required.";
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.authorEmail)) e.authorEmail = "Enter a valid email address.";
      if (data.authorPhone.trim().length < 8) e.authorPhone = "Enter a valid phone number with country code.";
      if (!data.authorAffiliation.trim()) e.authorAffiliation = "Affiliation is required.";
    }
    if (current === 4) {
      if (!data.address.trim()) e.address = "Postal address is required.";
      if (!data.city.trim()) e.city = "City is required.";
      if (!data.state.trim()) e.state = "State is required.";
      if (!data.country.trim()) e.country = "Country is required.";
      if (!data.postalCode.trim()) e.postalCode = "Postal code is required.";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  const next = () => {
    if (validate(step)) setStep((s) => Math.min(5, s + 1));
  };
  const back = () => setStep((s) => Math.max(1, s - 1));

  function onFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (!f) return;
    if (!/\.docx?$/i.test(f.name)) {
      setErrors((err) => ({ ...err, manuscript: "Only .doc or .docx files are accepted." }));
      return;
    }
    if (f.size > 8 * 1024 * 1024) {
      setErrors((err) => ({ ...err, manuscript: "File exceeds the 8 MB limit." }));
      return;
    }
    setErrors((err) => ({ ...err, manuscript: "" }));
    setFile(f);
  }

  async function onSubmit() {
    if (!declared) {
      setErrors((e) => ({ ...e, declared: "Please accept the declaration to proceed." }));
      return;
    }
    setSubmitting(true);
    setServerError("");
    try {
      const form = new FormData();
      Object.entries(data).forEach(([k, v]) => form.set(k, String(v)));
      if (data.doiRequested) form.set("doiRequested", "on");
      if (data.hardCopyRequested) form.set("hardCopyRequested", "on");
      form.set("coAuthors", JSON.stringify(coAuthors));
      if (file) form.set("manuscript", file);

      const res = await fetch("/api/submissions", { method: "POST", body: form });
      const json = await res.json();
      if (!res.ok || !json.ok) throw new Error(json.error || "Submission failed");
      setPaperId(json.paperId);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      setServerError(err instanceof Error ? err.message : "Submission failed. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  if (paperId) return <SuccessPanel paperId={paperId} email={data.authorEmail} />;

  return (
    <div className="card overflow-hidden">
      {/* Step indicator */}
      <div className="border-b hairline bg-paper-100/70 px-6 py-5 sm:px-8">
        <ol className="flex items-center justify-between gap-2">
          {STEPS.map((s, i) => {
            const done = step > s.id;
            const active = step === s.id;
            return (
              <li key={s.id} className="flex flex-1 items-center gap-2 last:flex-none">
                <button
                  type="button"
                  onClick={() => s.id < step && setStep(s.id)}
                  className="flex items-center gap-2.5"
                  aria-current={active ? "step" : undefined}
                >
                  <span
                    className={`grid h-8 w-8 shrink-0 place-items-center rounded-full text-[0.78rem] font-bold transition-all ${
                      done
                        ? "bg-emerald-500 text-white"
                        : active
                          ? "bg-ink-900 text-white ring-4 ring-ink-900/15"
                          : "bg-white text-ink-400 ring-1 ring-paper-300"
                    }`}
                  >
                    {done ? <Check className="h-4 w-4" /> : s.id}
                  </span>
                  <span
                    className={`hidden text-[0.76rem] font-semibold md:block ${
                      active ? "text-ink-900" : done ? "text-emerald-700" : "text-ink-400"
                    }`}
                  >
                    {s.label}
                  </span>
                </button>
                {i < STEPS.length - 1 && (
                  <span
                    className={`h-[2px] min-w-3 flex-1 rounded-full transition-colors ${
                      step > s.id ? "bg-emerald-400" : "bg-paper-300"
                    }`}
                  />
                )}
              </li>
            );
          })}
        </ol>
      </div>

      <div className="p-6 sm:p-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -24 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          >
            {step === 1 && (
              <div className="space-y-5">
                <StepTitle title="Paper Details" desc="Tell us about the research you are submitting." />
                <div>
                  <label className="field-label" htmlFor="title">Paper Title *</label>
                  <input
                    id="title"
                    className={`field ${errors.title ? "field-error" : ""}`}
                    placeholder="e.g. A Lightweight CNN for Real-Time Pothole Detection on Edge Devices"
                    value={data.title}
                    onChange={set("title")}
                  />
                  <ErrorText msg={errors.title} />
                </div>
                <div>
                  <label className="field-label" htmlFor="subjectArea">Subject Area *</label>
                  <select
                    id="subjectArea"
                    className={`field ${errors.subjectArea ? "field-error" : ""}`}
                    value={data.subjectArea}
                    onChange={set("subjectArea")}
                  >
                    <option value="">Select a subject area…</option>
                    {DOMAINS.map((d) => (
                      <option key={d.id} value={d.name}>{d.name}</option>
                    ))}
                    <option value="Interdisciplinary">Interdisciplinary / Other</option>
                  </select>
                  <ErrorText msg={errors.subjectArea} />
                </div>
                <div>
                  <div className="flex items-center justify-between">
                    <label className="field-label" htmlFor="abstract">Abstract *</label>
                    <span className={`text-[0.72rem] font-semibold ${wordCount > 300 ? "text-red-600" : "text-ink-400"}`}>
                      {wordCount}/300 words
                    </span>
                  </div>
                  <textarea
                    id="abstract"
                    rows={5}
                    className={`field resize-y ${errors.abstract ? "field-error" : ""}`}
                    placeholder="A concise summary (150–250 words) covering the objective, methods, results and conclusions."
                    value={data.abstract}
                    onChange={set("abstract")}
                  />
                  <ErrorText msg={errors.abstract} />
                </div>
                <div>
                  <label className="field-label" htmlFor="keywords">Keywords *</label>
                  <input
                    id="keywords"
                    className={`field ${errors.keywords ? "field-error" : ""}`}
                    placeholder="edge computing, deep learning, road safety, CNN"
                    value={data.keywords}
                    onChange={set("keywords")}
                  />
                  <p className="mt-1.5 text-[0.72rem] text-ink-400">4–6 keywords, separated by commas.</p>
                  <ErrorText msg={errors.keywords} />
                </div>
                {/* File upload */}
                <div>
                  <label className="field-label">Manuscript File (.docx)</label>
                  <button
                    type="button"
                    onClick={() => fileRef.current?.click()}
                    className={`flex w-full items-center gap-4 rounded-lg border-2 border-dashed px-5 py-6 text-left transition-colors ${
                      errors.manuscript
                        ? "border-red-300 bg-red-50"
                        : file
                          ? "border-emerald-300 bg-emerald-50"
                          : "border-paper-300 bg-paper-100/50 hover:border-ink-300 hover:bg-paper-100"
                    }`}
                  >
                    <span className={`grid h-11 w-11 shrink-0 place-items-center rounded-lg ${file ? "bg-emerald-100 text-emerald-700" : "bg-white text-ink-500 ring-1 ring-paper-300"}`}>
                      {file ? <FileText className="h-5 w-5" /> : <FileUp className="h-5 w-5" />}
                    </span>
                    <span className="min-w-0 flex-1">
                      {file ? (
                        <>
                          <span className="block truncate text-[0.88rem] font-semibold text-emerald-800">{file.name}</span>
                          <span className="mt-0.5 block text-[0.74rem] text-emerald-700">
                            {(file.size / 1024).toFixed(0)} KB — click to replace
                          </span>
                        </>
                      ) : (
                        <>
                          <span className="block text-[0.88rem] font-semibold text-ink-800">
                            Click to upload your manuscript
                          </span>
                          <span className="mt-0.5 block text-[0.74rem] text-ink-400">
                            .doc or .docx · max 8 MB · IJITMES template preferred
                          </span>
                        </>
                      )}
                    </span>
                    {file && (
                      <span
                        role="button"
                        tabIndex={0}
                        aria-label="Remove file"
                        onClick={(e) => {
                          e.stopPropagation();
                          setFile(null);
                          if (fileRef.current) fileRef.current.value = "";
                        }}
                        className="rounded-full p-1.5 text-emerald-700 hover:bg-emerald-100"
                      >
                        <X className="h-4 w-4" />
                      </span>
                    )}
                  </button>
                  <input
                    ref={fileRef}
                    type="file"
                    accept=".doc,.docx"
                    className="hidden"
                    onChange={onFileChange}
                  />
                  <ErrorText msg={errors.manuscript} />
                </div>
                <div className="grid gap-3 rounded-lg bg-paper-100/70 p-4 sm:grid-cols-2">
                  <label className="flex cursor-pointer items-start gap-2.5 text-[0.82rem] text-ink-700">
                    <input type="checkbox" className="mt-0.5 h-4 w-4 accent-gold-600" checked={data.doiRequested} onChange={set("doiRequested")} />
                    <span>
                      <strong className="font-semibold">Assign a DOI</strong> (+₹150 / $3)
                      <span className="mt-0.5 block text-[0.74rem] text-ink-400">Optional — permanent identifier for your paper.</span>
                    </span>
                  </label>
                  <label className="flex cursor-pointer items-start gap-2.5 text-[0.82rem] text-ink-700">
                    <input type="checkbox" className="mt-0.5 h-4 w-4 accent-gold-600" checked={data.hardCopyRequested} onChange={set("hardCopyRequested")} />
                    <span>
                      <strong className="font-semibold">Hard-copy certificate</strong> (+₹300)
                      <span className="mt-0.5 block text-[0.74rem] text-ink-400">Optional — printed certificate &amp; paper copy by post.</span>
                    </span>
                  </label>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-5">
                <StepTitle title="Main Author" desc="The corresponding author — all notifications go to this person." />
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label className="field-label" htmlFor="authorName">Full Name *</label>
                    <input id="authorName" className={`field ${errors.authorName ? "field-error" : ""}`} placeholder="Dr. Priya Deshmukh" value={data.authorName} onChange={set("authorName")} />
                    <ErrorText msg={errors.authorName} />
                  </div>
                  <div>
                    <label className="field-label" htmlFor="authorEmail">Email Address *</label>
                    <input id="authorEmail" type="email" className={`field ${errors.authorEmail ? "field-error" : ""}`} placeholder="priya.deshmukh@university.edu" value={data.authorEmail} onChange={set("authorEmail")} />
                    <ErrorText msg={errors.authorEmail} />
                  </div>
                  <div>
                    <label className="field-label" htmlFor="authorPhone">Mobile Number *</label>
                    <input id="authorPhone" className={`field ${errors.authorPhone ? "field-error" : ""}`} placeholder="+91 98XXXXXXXX" value={data.authorPhone} onChange={set("authorPhone")} />
                    <ErrorText msg={errors.authorPhone} />
                  </div>
                  <div>
                    <label className="field-label" htmlFor="authorAffiliation">Affiliation / Institution *</label>
                    <input id="authorAffiliation" className={`field ${errors.authorAffiliation ? "field-error" : ""}`} placeholder="Department, Institute, City" value={data.authorAffiliation} onChange={set("authorAffiliation")} />
                    <ErrorText msg={errors.authorAffiliation} />
                  </div>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-5">
                <StepTitle
                  title="Co-Authors"
                  desc={`Optional — the fee covers up to ${"5"} authors (India) / 7 authors (international).`}
                />
                <AnimatePresence initial={false}>
                  {coAuthors.map((co, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                      className="flex items-end gap-3 rounded-lg border hairline bg-paper-100/50 p-4"
                    >
                      <div className="grid flex-1 gap-3 sm:grid-cols-2">
                        <div>
                          <label className="field-label">Co-Author {i + 1} Name</label>
                          <input
                            className="field"
                            placeholder="Full name"
                            value={co.name}
                            onChange={(e) =>
                              setCoAuthors((list) => list.map((c, j) => (j === i ? { ...c, name: e.target.value } : c)))
                            }
                          />
                        </div>
                        <div>
                          <label className="field-label">Affiliation</label>
                          <input
                            className="field"
                            placeholder="Institution"
                            value={co.affiliation}
                            onChange={(e) =>
                              setCoAuthors((list) => list.map((c, j) => (j === i ? { ...c, affiliation: e.target.value } : c)))
                            }
                          />
                        </div>
                      </div>
                      <button
                        type="button"
                        aria-label={`Remove co-author ${i + 1}`}
                        onClick={() => setCoAuthors((list) => list.filter((_, j) => j !== i))}
                        className="grid h-11 w-11 shrink-0 place-items-center rounded-lg border border-red-200 text-red-500 transition-colors hover:bg-red-50"
                      >
                        <Trash2 className="h-4.5 w-4.5" />
                      </button>
                    </motion.div>
                  ))}
                </AnimatePresence>
                {coAuthors.length < 7 && (
                  <button
                    type="button"
                    onClick={() => setCoAuthors((list) => [...list, { name: "", affiliation: "" }])}
                    className="flex w-full items-center justify-center gap-2 rounded-lg border-2 border-dashed border-paper-300 py-4 text-[0.85rem] font-semibold text-ink-600 transition-colors hover:border-ink-300 hover:bg-paper-100"
                  >
                    <Plus className="h-4.5 w-4.5" />
                    Add co-author ({coAuthors.length}/7)
                  </button>
                )}
                <p className="text-[0.78rem] text-ink-400">
                  No co-authors? Continue to the next step.
                </p>
              </div>
            )}

            {step === 4 && (
              <div className="space-y-5">
                <StepTitle title="Correspondence Address" desc="Used for certificates and the hard-copy dispatch (if requested)." />
                <div>
                  <label className="field-label" htmlFor="address">Street Address *</label>
                  <textarea id="address" rows={2} className={`field resize-y ${errors.address ? "field-error" : ""}`} placeholder="Department / street / landmark" value={data.address} onChange={set("address")} />
                  <ErrorText msg={errors.address} />
                </div>
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label className="field-label" htmlFor="city">City *</label>
                    <input id="city" className={`field ${errors.city ? "field-error" : ""}`} placeholder="Nashik" value={data.city} onChange={set("city")} />
                    <ErrorText msg={errors.city} />
                  </div>
                  <div>
                    <label className="field-label" htmlFor="state">State / Province *</label>
                    <input id="state" className={`field ${errors.state ? "field-error" : ""}`} placeholder="Maharashtra" value={data.state} onChange={set("state")} />
                    <ErrorText msg={errors.state} />
                  </div>
                  <div>
                    <label className="field-label" htmlFor="country">Country *</label>
                    <input id="country" className={`field ${errors.country ? "field-error" : ""}`} placeholder="India" value={data.country} onChange={set("country")} />
                    <ErrorText msg={errors.country} />
                  </div>
                  <div>
                    <label className="field-label" htmlFor="postalCode">Postal Code *</label>
                    <input id="postalCode" className={`field ${errors.postalCode ? "field-error" : ""}`} placeholder="422003" value={data.postalCode} onChange={set("postalCode")} />
                    <ErrorText msg={errors.postalCode} />
                  </div>
                </div>
              </div>
            )}

            {step === 5 && (
              <div className="space-y-6">
                <StepTitle title="Review & Submit" desc="Verify every detail — this information appears verbatim on publication and certificates." />
                <dl className="grid gap-x-8 gap-y-5 rounded-xl border hairline bg-paper-100/50 p-6 sm:grid-cols-2">
                  <ReviewItem label="Paper title" value={data.title} wide />
                  <ReviewItem label="Subject area" value={data.subjectArea} />
                  <ReviewItem label="Keywords" value={data.keywords} />
                  <ReviewItem label="Abstract length" value={`${wordCount} words`} />
                  <ReviewItem label="Manuscript file" value={file ? file.name : "Not attached (will be requested)"} />
                  <ReviewItem label="Main author" value={`${data.authorName} — ${data.authorAffiliation}`} />
                  <ReviewItem label="Contact" value={`${data.authorEmail} · ${data.authorPhone}`} />
                  <ReviewItem
                    label="Co-authors"
                    value={coAuthors.length ? coAuthors.filter((c) => c.name).map((c) => c.name).join(", ") : "None"}
                    wide
                  />
                  <ReviewItem label="Address" value={`${data.address}, ${data.city}, ${data.state}, ${data.country} — ${data.postalCode}`} wide />
                  <ReviewItem
                    label="Extras"
                    value={`${data.doiRequested ? "DOI requested; " : ""}${data.hardCopyRequested ? "Hard-copy certificate requested" : ""}${!data.doiRequested && !data.hardCopyRequested ? "None" : ""}`}
                    wide
                  />
                </dl>

                <label className="flex cursor-pointer items-start gap-3 rounded-lg border hairline bg-white p-4">
                  <input
                    type="checkbox"
                    className="mt-0.5 h-4 w-4 accent-gold-600"
                    checked={declared}
                    onChange={(e) => {
                      setDeclared(e.target.checked);
                      setErrors((err) => ({ ...err, declared: "" }));
                    }}
                  />
                  <span className="text-[0.83rem] leading-relaxed text-ink-600">
                    I declare that this manuscript is original, unpublished, free of
                    plagiarism and not under consideration elsewhere. I agree to the{" "}
                    <a href="/terms" className="font-semibold text-ink-900 underline">terms &amp; conditions</a> and
                    the publication charge of {SITE.feeINR} / {SITE.feeUSD} payable on acceptance.
                  </span>
                </label>
                <ErrorText msg={errors.declared} />
                {serverError && (
                  <p className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-[0.85rem] font-medium text-red-700">
                    {serverError}
                  </p>
                )}
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Nav buttons */}
        <div className="mt-8 flex items-center justify-between border-t hairline pt-6">
          <button
            type="button"
            onClick={back}
            disabled={step === 1}
            className="btn btn-outline disabled:cursor-not-allowed disabled:opacity-40"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </button>
          <span className="text-[0.74rem] font-semibold uppercase tracking-[0.14em] text-ink-400">
            Step {step} of 5
          </span>
          {step < 5 ? (
            <button type="button" onClick={next} className="btn btn-primary">
              Continue
              <ArrowRight className="h-4 w-4" />
            </button>
          ) : (
            <button
              type="button"
              onClick={onSubmit}
              disabled={submitting}
              className="btn btn-gold disabled:opacity-60"
            >
              {submitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Submitting…
                </>
              ) : (
                <>
                  <Send className="h-4 w-4" />
                  Submit Manuscript
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

/* ── Sub-components ──────────────────────────────────────────────────────── */

function StepTitle({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="border-b hairline pb-4">
      <h2 className="font-serif-display text-xl font-semibold text-ink-900">{title}</h2>
      <p className="mt-1 text-[0.84rem] text-ink-500">{desc}</p>
    </div>
  );
}

function ErrorText({ msg }: { msg?: string }) {
  if (!msg) return null;
  return <p className="mt-1.5 text-[0.76rem] font-semibold text-red-600">{msg}</p>;
}

function ReviewItem({ label, value, wide }: { label: string; value: string; wide?: boolean }) {
  return (
    <div className={wide ? "sm:col-span-2" : ""}>
      <dt className="text-[0.68rem] font-bold uppercase tracking-[0.14em] text-ink-400">{label}</dt>
      <dd className="mt-1 text-[0.88rem] font-medium leading-relaxed text-ink-800">{value || "—"}</dd>
    </div>
  );
}

function SuccessPanel({ paperId, email }: { paperId: string; email: string }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(paperId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard unavailable */
    }
  };
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="card overflow-hidden"
    >
      <div className="relative bg-ink-950 px-8 py-12 text-center text-white sm:px-12">
        <div className="grid-dark absolute inset-0" aria-hidden />
        <div className="relative">
          <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-emerald-500/15 text-emerald-400 ring-1 ring-emerald-400/40">
            <PartyPopper className="h-7 w-7" />
          </span>
          <h2 className="mt-6 font-serif-display text-3xl font-semibold sm:text-4xl">
            Manuscript received
          </h2>
          <p className="mx-auto mt-3 max-w-md text-[0.92rem] leading-relaxed text-ink-200">
            Your paper has been submitted successfully and queued for screening.
            A confirmation email is on its way to{" "}
            <strong className="font-semibold text-white">{email}</strong>.
          </p>
        </div>
      </div>
      <div className="px-8 py-10 text-center sm:px-12">
        <p className="text-[0.72rem] font-bold uppercase tracking-[0.2em] text-ink-400">
          Your unique Paper ID
        </p>
        <div className="mx-auto mt-3 flex w-fit items-center gap-3 rounded-xl border-2 border-dashed border-gold-400 bg-gold-100/60 px-6 py-4">
          <span className="font-serif-display text-2xl font-bold tracking-wide text-ink-900 sm:text-3xl">
            {paperId}
          </span>
          <button
            type="button"
            onClick={copy}
            aria-label="Copy Paper ID"
            className="grid h-10 w-10 place-items-center rounded-lg bg-white text-ink-600 ring-1 ring-paper-300 transition-colors hover:text-ink-900"
          >
            {copied ? <BadgeCheck className="h-5 w-5 text-emerald-600" /> : <Copy className="h-5 w-5" />}
          </button>
        </div>
        <div className="mx-auto mt-8 grid max-w-lg gap-3 text-left sm:grid-cols-3">
          {[
            { n: "1", t: "Screening begins", d: "Plagiarism check starts immediately." },
            { n: "2", t: "Decision in 7–8 hrs", d: "The acceptance email arrives shortly." },
            { n: "3", t: "Published in 3–4 hrs", d: "Goes live after the fee payment." },
          ].map((s) => (
            <div key={s.n} className="rounded-lg bg-paper-100/70 p-4">
              <p className="font-serif-display text-lg font-semibold text-gold-600">{s.n}</p>
              <p className="mt-1 text-[0.8rem] font-bold text-ink-900">{s.t}</p>
              <p className="mt-0.5 text-[0.74rem] leading-snug text-ink-500">{s.d}</p>
            </div>
          ))}
        </div>
        <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
          <a href="/track" className="btn btn-primary">Track your paper</a>
          <a href="/" className="btn btn-outline">Back to home</a>
        </div>
      </div>
    </motion.div>
  );
}
