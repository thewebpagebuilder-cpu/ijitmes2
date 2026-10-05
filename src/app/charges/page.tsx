import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  BadgeIndianRupee,
  Check,
  CreditCard,
  FileBadge2,
  Globe2,
  Landmark,
  Mail,
  QrCode,
  ShieldCheck,
  Wallet,
} from "lucide-react";
import PageHero from "@/components/ui/PageHero";
import Reveal, { RevealItem, RevealStagger } from "@/components/motion/Reveal";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Processing Charges",
  description:
    "IJITMES publication charges — ₹449 for Indian authors and $17 for international authors, covering up to 5–7 authors, certificates, editing and indexing.",
};

const INCLUDED = [
  "Online open-access publication in the current issue",
  "E-certificates for every listed author",
  "Professional editing, typesetting and layout",
  "Indexing and digital library listing",
  "Unique Published Paper ID and permanent URL",
  "Email & SMS notifications at every stage",
];

export default function ChargesPage() {
  return (
    <>
      <PageHero
        eyebrow="Transparent Pricing"
        title="Publication charges"
        lede="One flat fee. No hidden costs. Charges are payable only after your paper is accepted — never before."
        crumbs={[{ label: "Home", href: "/" }, { label: "Processing Charges" }]}
      />

      <section className="py-14 lg:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <RevealStagger className="grid gap-6 lg:grid-cols-2" delayChildren={0.1}>
            {/* India */}
            <RevealItem>
              <div className="card card-hover relative h-full overflow-hidden">
                <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-gold-500 via-gold-300 to-gold-500" />
                <div className="p-8 sm:p-10">
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center gap-2 rounded-full bg-gold-100 px-4 py-1.5 text-[0.72rem] font-bold uppercase tracking-[0.14em] text-gold-700">
                      <BadgeIndianRupee className="h-4 w-4" />
                      Indian Authors
                    </span>
                    <span className="text-[0.74rem] font-semibold text-ink-400">
                      Per accepted paper
                    </span>
                  </div>
                  <div className="mt-7 flex items-end gap-3">
                    <span className="font-serif-display text-6xl font-semibold leading-none text-ink-900">
                      ₹449
                    </span>
                    <span className="pb-1.5 text-[0.85rem] font-medium text-ink-400">
                      INR · flat fee
                    </span>
                  </div>
                  <p className="mt-3 text-[0.86rem] leading-relaxed text-ink-500">
                    Includes up to <strong className="font-semibold text-ink-800">5 authors</strong> and{" "}
                    <strong className="font-semibold text-ink-800">20 pages</strong>.
                  </p>
                  <ul className="mt-7 space-y-2.5">
                    {INCLUDED.map((f) => (
                      <li key={f} className="flex gap-2.5 text-[0.86rem] leading-relaxed text-ink-600">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-7 space-y-2 rounded-lg bg-paper-100/70 p-5 text-[0.82rem] text-ink-600">
                    <p className="flex justify-between">
                      <span>Optional DOI assignment</span>
                      <strong className="font-semibold text-ink-900">+ ₹150</strong>
                    </p>
                    <p className="flex justify-between">
                      <span>Hard-copy certificate &amp; paper</span>
                      <strong className="font-semibold text-ink-900">+ ₹300</strong>
                    </p>
                  </div>
                  <div className="mt-7">
                    <p className="text-[0.72rem] font-bold uppercase tracking-[0.16em] text-ink-400">
                      Payment methods
                    </p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {[
                        { icon: QrCode, t: "UPI / QR" },
                        { icon: CreditCard, t: "Cards" },
                        { icon: Wallet, t: "Wallets" },
                        { icon: Landmark, t: "Netbanking" },
                      ].map((m) => (
                        <span
                          key={m.t}
                          className="inline-flex items-center gap-1.5 rounded-full border hairline bg-white px-3 py-1.5 text-[0.74rem] font-semibold text-ink-600"
                        >
                          <m.icon className="h-3.5 w-3.5 text-gold-600" />
                          {m.t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </RevealItem>

            {/* International */}
            <RevealItem>
              <div className="card card-hover relative h-full overflow-hidden">
                <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-ink-700 via-ink-400 to-ink-700" />
                <div className="p-8 sm:p-10">
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center gap-2 rounded-full bg-ink-50 px-4 py-1.5 text-[0.72rem] font-bold uppercase tracking-[0.14em] text-ink-700 ring-1 ring-ink-100">
                      <Globe2 className="h-4 w-4" />
                      International Authors
                    </span>
                    <span className="text-[0.74rem] font-semibold text-ink-400">
                      Per accepted paper
                    </span>
                  </div>
                  <div className="mt-7 flex items-end gap-3">
                    <span className="font-serif-display text-6xl font-semibold leading-none text-ink-900">
                      $17
                    </span>
                    <span className="pb-1.5 text-[0.85rem] font-medium text-ink-400">
                      USD · flat fee
                    </span>
                  </div>
                  <p className="mt-3 text-[0.86rem] leading-relaxed text-ink-500">
                    Includes up to <strong className="font-semibold text-ink-800">7 authors</strong> and{" "}
                    <strong className="font-semibold text-ink-800">26 pages</strong>.
                  </p>
                  <ul className="mt-7 space-y-2.5">
                    {INCLUDED.map((f) => (
                      <li key={f} className="flex gap-2.5 text-[0.86rem] leading-relaxed text-ink-600">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-7 space-y-2 rounded-lg bg-paper-100/70 p-5 text-[0.82rem] text-ink-600">
                    <p className="flex justify-between">
                      <span>Optional DOI assignment</span>
                      <strong className="font-semibold text-ink-900">+ $3</strong>
                    </p>
                    <p className="flex justify-between">
                      <span>Debit / credit cards supported</span>
                      <strong className="font-semibold text-ink-900">PayPal</strong>
                    </p>
                  </div>
                  <div className="mt-7">
                    <p className="text-[0.72rem] font-bold uppercase tracking-[0.16em] text-ink-400">
                      Payment methods
                    </p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {[
                        { icon: CreditCard, t: "PayPal" },
                        { icon: CreditCard, t: "Debit / Credit Cards" },
                      ].map((m) => (
                        <span
                          key={m.t}
                          className="inline-flex items-center gap-1.5 rounded-full border hairline bg-white px-3 py-1.5 text-[0.74rem] font-semibold text-ink-600"
                        >
                          <m.icon className="h-3.5 w-3.5 text-gold-600" />
                          {m.t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </RevealItem>
          </RevealStagger>

          {/* Payment flow */}
          <div className="mt-12 grid gap-6 lg:grid-cols-[1fr_1fr]">
            <Reveal>
              <div className="card h-full p-8">
                <h2 className="flex items-center gap-3 font-serif-display text-xl font-semibold text-ink-900">
                  <span className="grid h-10 w-10 place-items-center rounded-lg bg-ink-900 text-gold-400">
                    <QrCode className="h-5 w-5" />
                  </span>
                  How payment works
                </h2>
                <div className="mt-6 flex items-center gap-5 rounded-xl border border-gold-200 bg-gold-100/50 p-4">
                  <div className="img-shine relative h-28 w-28 shrink-0 overflow-hidden rounded-lg bg-white p-1.5 shadow-md ring-1 ring-paper-300">
                    <Image
                      src="/images/live/qr.jpg"
                      alt="IJITMES UPI payment QR code"
                      width={200}
                      height={200}
                      className="h-full w-full rounded object-contain"
                    />
                  </div>
                  <div>
                    <p className="text-[0.72rem] font-bold uppercase tracking-[0.16em] text-gold-700">
                      Scan to pay via UPI
                    </p>
                    <p className="mt-1 text-[0.84rem] leading-relaxed text-ink-600">
                      Indian authors can scan this official QR code with any UPI app after
                      acceptance, then email the screenshot with your Paper ID.
                    </p>
                  </div>
                </div>
                <ol className="mt-6 space-y-4">
                  {[
                    "Wait for your acceptance email — payment links are shared only after acceptance.",
                    "Pay via PayUmoney (UPI, cards, wallets, netbanking) or scan the UPI QR code in the acceptance email.",
                    "International authors pay through PayPal using any debit or credit card.",
                    `Send the payment screenshot to ${SITE.email} for verification.`,
                    "Your paper is published within 3–4 hours of verification.",
                  ].map((s, i) => (
                    <li key={s} className="flex gap-3.5 text-[0.88rem] leading-relaxed text-ink-600">
                      <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-gold-100 text-[0.74rem] font-bold text-gold-700">
                        {i + 1}
                      </span>
                      {s}
                    </li>
                  ))}
                </ol>
              </div>
            </Reveal>
            <Reveal delay={0.08}>
              <div className="flex h-full flex-col gap-6">
                <div className="card flex items-start gap-4 p-6">
                  <ShieldCheck className="mt-0.5 h-6 w-6 shrink-0 text-emerald-500" />
                  <div>
                    <h3 className="text-[0.95rem] font-bold text-ink-900">
                      No acceptance, no invoice
                    </h3>
                    <p className="mt-1 text-[0.85rem] leading-relaxed text-ink-500">
                      You are never asked for payment before your paper is
                      accepted. Every transaction receives a confirmation
                      receipt from the editorial office.
                    </p>
                  </div>
                </div>
                <div className="card flex items-start gap-4 p-6">
                  <FileBadge2 className="mt-0.5 h-6 w-6 shrink-0 text-gold-600" />
                  <div>
                    <h3 className="text-[0.95rem] font-bold text-ink-900">
                      Facing a payment issue?
                    </h3>
                    <p className="mt-1 text-[0.85rem] leading-relaxed text-ink-500">
                      Write to{" "}
                      <a href={`mailto:${SITE.email}`} className="font-semibold text-ink-800 underline">
                        {SITE.email}
                      </a>{" "}
                      with your Paper ID — the support team resolves most
                      queries within a few hours.
                    </p>
                  </div>
                </div>
                <div className="card relative flex-1 overflow-hidden bg-ink-950 p-6 text-white">
                  <div className="grid-dark absolute inset-0" aria-hidden />
                  <div className="relative flex items-center justify-between gap-4">
                    <div>
                      <h3 className="font-serif-display text-lg font-semibold">
                        Already accepted?
                      </h3>
                      <p className="mt-1 text-[0.84rem] text-ink-300">
                        Track your paper status before paying.
                      </p>
                    </div>
                    <Link href="/track" className="btn btn-gold !py-3">
                      Track paper
                    </Link>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Contact strip */}
          <Reveal className="mt-12">
            <p className="flex flex-wrap items-center justify-center gap-2 text-center text-[0.85rem] text-ink-500">
              <Mail className="h-4 w-4 text-gold-600" />
              For any payment clarification, contact the editorial office at
              <a href={`mailto:${SITE.email}`} className="font-bold text-ink-900 underline decoration-gold-500 decoration-2 underline-offset-4">
                {SITE.email}
              </a>
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
