"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, Loader2, MailCheck, Send, XCircle } from "lucide-react";

const initial = { name: "", email: "", mobile: "", subject: "", message: "" };

export default function ContactForm() {
  const [data, setData] = useState(initial);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [serverError, setServerError] = useState("");

  const set = (key: keyof typeof initial) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setData((d) => ({ ...d, [key]: e.target.value }));
    setErrors((err) => ({ ...err, [key]: "" }));
  };

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const errs: Record<string, string> = {};
    if (!data.name.trim()) errs.name = "Your name is required.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) errs.email = "Enter a valid email.";
    if (!data.subject.trim()) errs.subject = "A subject is required.";
    if (data.message.trim().length < 10) errs.message = "Please write at least a short message.";
    setErrors(errs);
    if (Object.keys(errs).length) return;

    setSending(true);
    setServerError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (!res.ok || !json.ok) throw new Error(json.error || "Failed to send");
      setSent(true);
    } catch (err) {
      setServerError(err instanceof Error ? err.message : "Failed to send. Please try again.");
    } finally {
      setSending(false);
    }
  }

  return (
    <AnimatePresence mode="wait">
      {sent ? (
        <motion.div
          key="done"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center rounded-xl border border-emerald-200 bg-emerald-50 px-8 py-14 text-center"
        >
          <span className="grid h-16 w-16 place-items-center rounded-full bg-emerald-100 text-emerald-600">
            <MailCheck className="h-8 w-8" />
          </span>
          <h3 className="mt-5 font-serif-display text-2xl font-semibold text-emerald-900">
            Message sent successfully
          </h3>
          <p className="mt-2 max-w-sm text-[0.9rem] leading-relaxed text-emerald-800/80">
            Thank you, {data.name.split(" ")[0]}. The editorial team will reply
            to <strong>{data.email}</strong> shortly.
          </p>
          <button
            type="button"
            onClick={() => {
              setSent(false);
              setData(initial);
            }}
            className="btn btn-outline mt-7"
          >
            Send another message
          </button>
        </motion.div>
      ) : (
        <motion.form
          key="form"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onSubmit={submit}
          className="grid gap-5 sm:grid-cols-2"
          noValidate
        >
          <div>
            <label className="field-label" htmlFor="c-name">Your Name *</label>
            <input
              id="c-name"
              className={`field ${errors.name ? "field-error" : ""}`}
              placeholder="Dr. Ananya Kulkarni"
              value={data.name}
              onChange={set("name")}
            />
            <Err msg={errors.name} />
          </div>
          <div>
            <label className="field-label" htmlFor="c-email">Your Email *</label>
            <input
              id="c-email"
              type="email"
              className={`field ${errors.email ? "field-error" : ""}`}
              placeholder="you@university.edu"
              value={data.email}
              onChange={set("email")}
            />
            <Err msg={errors.email} />
          </div>
          <div>
            <label className="field-label" htmlFor="c-mobile">Mobile No.</label>
            <input
              id="c-mobile"
              className="field"
              placeholder="+91 98XXXXXXXX (optional)"
              value={data.mobile}
              onChange={set("mobile")}
            />
          </div>
          <div>
            <label className="field-label" htmlFor="c-subject">Subject *</label>
            <input
              id="c-subject"
              className={`field ${errors.subject ? "field-error" : ""}`}
              placeholder="e.g. Query about certificate delivery"
              value={data.subject}
              onChange={set("subject")}
            />
            <Err msg={errors.subject} />
          </div>
          <div className="sm:col-span-2">
            <label className="field-label" htmlFor="c-message">Message *</label>
            <textarea
              id="c-message"
              rows={5}
              className={`field resize-y ${errors.message ? "field-error" : ""}`}
              placeholder="Write your query here… include your Paper ID if it relates to a submission."
              value={data.message}
              onChange={set("message")}
            />
            <Err msg={errors.message} />
          </div>
          {serverError && (
            <p className="flex items-center gap-2 text-[0.84rem] font-semibold text-red-600 sm:col-span-2">
              <XCircle className="h-4.5 w-4.5" />
              {serverError}
            </p>
          )}
          <div className="flex items-center gap-4 sm:col-span-2">
            <button type="submit" disabled={sending} className="btn btn-primary !px-8 disabled:opacity-60">
              {sending ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Sending…
                </>
              ) : (
                <>
                  <Send className="h-4 w-4" />
                  Send message
                </>
              )}
            </button>
            <p className="hidden items-center gap-2 text-[0.78rem] text-ink-400 sm:flex">
              <CheckCircle2 className="h-4 w-4 text-emerald-500" />
              Your details are never shared with third parties.
            </p>
          </div>
        </motion.form>
      )}
    </AnimatePresence>
  );
}

function Err({ msg }: { msg?: string }) {
  if (!msg) return null;
  return <p className="mt-1.5 text-[0.76rem] font-semibold text-red-600">{msg}</p>;
}
