import type { Metadata } from "next";
import { AlertTriangle, Clock3, FileUp, MailCheck, Receipt, ShieldCheck } from "lucide-react";
import PageHero from "@/components/ui/PageHero";
import Reveal from "@/components/motion/Reveal";
import SubmitForm from "@/components/forms/SubmitForm";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Submit Manuscript",
  description:
    "Submit your research paper to IJITMES. Receive a unique Paper ID instantly, a decision within 7–8 hours and publication in 1–2 days.",
};

const NOTES = [
  {
    icon: FileUp,
    title: "Manuscript format",
    body: "Upload your paper as a .doc or .docx file (max 8 MB), prepared with the IJITMES paper template.",
  },
  {
    icon: MailCheck,
    title: "Instant Paper ID",
    body: "A unique Paper ID is generated on submission and sent to your email with confirmation of receipt.",
  },
  {
    icon: Clock3,
    title: "Rapid decision",
    body: "Acceptance notification within 7–8 hours; publication 3–4 hours after acceptance and fee payment.",
  },
  {
    icon: Receipt,
    title: "Transparent fee",
    body: `Flat processing charge of ${SITE.feeINR} (India) or ${SITE.feeUSD} (international). No hidden costs.`,
  },
];

export default function SubmitPage() {
  return (
    <>
      <PageHero
        eyebrow="Online Submission"
        title="Submit your manuscript"
        lede="Complete the form below — details are used verbatim for publication and certification, so please review them carefully before submitting."
        crumbs={[{ label: "Home", href: "/" }, { label: "Submit Paper" }]}
      />

      <section className="py-14 lg:py-20">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[1fr_340px] lg:px-8">
          <Reveal>
            <SubmitForm />
          </Reveal>

          {/* Sidebar */}
          <div className="space-y-5 lg:sticky lg:top-32 lg:self-start">
            <Reveal delay={0.1}>
              <div className="card divide-y divide-paper-200">
                <div className="p-6">
                  <h3 className="font-serif-display text-lg font-semibold text-ink-900">
                    Before you submit
                  </h3>
                </div>
                {NOTES.map((n) => (
                  <div key={n.title} className="flex gap-3.5 p-5">
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-ink-50 text-ink-700 ring-1 ring-ink-100">
                      <n.icon className="h-5 w-5" strokeWidth={1.8} />
                    </span>
                    <div>
                      <p className="text-[0.88rem] font-bold text-ink-900">{n.title}</p>
                      <p className="mt-1 text-[0.8rem] leading-relaxed text-ink-500">
                        {n.body}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.16}>
              <div className="rounded-xl border border-amber-200 bg-amber-50 p-5">
                <p className="flex items-center gap-2 text-[0.85rem] font-bold text-amber-800">
                  <AlertTriangle className="h-4.5 w-4.5" />
                  Important instructions
                </p>
                <ul className="mt-3 list-disc space-y-1.5 pl-5 text-[0.8rem] leading-relaxed text-amber-900/85">
                  <li>Fill all details carefully — they appear on your certificate.</li>
                  <li>Provide accurate author and affiliation details.</li>
                  <li>Ensure your paper passes a self-plagiarism check first.</li>
                  <li>
                    Need help? Write to{" "}
                    <a href={`mailto:${SITE.email}`} className="font-semibold underline">
                      {SITE.email}
                    </a>
                  </li>
                </ul>
              </div>
            </Reveal>

            <Reveal delay={0.22}>
              <div className="flex items-center gap-3 rounded-xl border border-emerald-200 bg-emerald-50 p-5">
                <ShieldCheck className="h-6 w-6 shrink-0 text-emerald-600" />
                <p className="text-[0.8rem] leading-relaxed text-emerald-900/90">
                  Your manuscript is stored securely and shared only with the
                  editorial team and assigned reviewers.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
