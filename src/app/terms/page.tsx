import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import Reveal from "@/components/motion/Reveal";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description:
    "Terms and conditions for publishing with IJITMES — submission, originality, fees, copyright, open access and withdrawal policies.",
};

const TERMS = [
  {
    title: "1. Submission & Originality",
    body: [
      "Manuscripts submitted to IJITMES must be original, unpublished and not under consideration by any other journal or conference.",
      "By submitting, authors warrant that the work is free of plagiarism, including self-plagiarism, and that all listed authors have approved the submission.",
      "All submissions undergo automated plagiarism screening; manuscripts failing screening are rejected without entering review.",
    ],
  },
  {
    title: "2. Review & Acceptance",
    body: [
      "The editorial decision (acceptance, revision or rejection) is final and is communicated to the corresponding author by email.",
      "Where revisions are requested, authors must resubmit within the timeframe stated in the decision email.",
      "Acceptance is issued only after the manuscript clears screening and peer review.",
    ],
  },
  {
    title: "3. Publication Charges & Payment",
    body: [
      `A processing charge of ${SITE.feeINR} (Indian authors) or ${SITE.feeUSD} (international authors) applies, payable only after acceptance.`,
      "Optional extras (DOI assignment, hard-copy certificates) are charged additionally as stated on the charges page.",
      "Charges are non-refundable once the article has been published online, as editorial and production services are already rendered.",
      "No payment is requested at any point before formal acceptance.",
    ],
  },
  {
    title: "4. Copyright & Open Access",
    body: [
      "Authors retain the copyright of their published work.",
      "All articles are published open access and made freely available to readers worldwide immediately upon publication.",
      "Authors grant the journal the right to publish, distribute and archive the article online, including in indexing and abstracting services.",
    ],
  },
  {
    title: "5. Certificates & Published Records",
    body: [
      "E-certificates are issued to all listed authors following publication; hard-copy certificates are dispatched on request for an additional charge.",
      "Author names, affiliations and paper details are published exactly as provided at submission — authors are responsible for their accuracy.",
      "Each published paper receives a unique Published Paper ID; updates or corrections after publication follow the journal's correction policy.",
    ],
  },
  {
    title: "6. Withdrawal & Retraction",
    body: [
      "A manuscript may be withdrawn before acceptance by written request from the corresponding author.",
      "Post-publication retraction is reserved for serious ethical breaches (e.g. plagiarism, data fabrication) following a formal investigation by the Editor-in-Chief.",
      "Retracted articles remain in the archive with a clear retraction notice linked to the original record.",
    ],
  },
  {
    title: "7. Privacy",
    body: [
      "Personal information collected during submission is used solely for editorial processing, certification and communication regarding the submission.",
      "Manuscripts under review are confidential and shared only with assigned reviewers and editors.",
      "Author details are never sold or disclosed to third parties for marketing purposes.",
    ],
  },
] as const;

export default function TermsPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Terms & conditions"
        lede="The following terms govern submission, review, publication and use of the IJITMES platform. By submitting a manuscript, authors agree to these terms."
        crumbs={[{ label: "Home", href: "/" }, { label: "Terms & Conditions" }]}
      />
      <section className="py-14 lg:py-20">
        <div className="mx-auto max-w-4xl space-y-5 px-4 sm:px-6 lg:px-8">
          {TERMS.map((t, i) => (
            <Reveal key={t.title} delay={Math.min(i * 0.03, 0.1)}>
              <div className="card p-7 sm:p-9">
                <h2 className="font-serif-display text-xl font-semibold text-ink-900">
                  {t.title}
                </h2>
                <ul className="mt-4 space-y-2.5">
                  {t.body.map((p) => (
                    <li key={p} className="flex gap-3 text-[0.89rem] leading-relaxed text-ink-600">
                      <span className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-gold-500" />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
          <Reveal>
            <p className="rounded-lg bg-paper-100/70 p-5 text-[0.82rem] leading-relaxed text-ink-500">
              These terms were last updated for the {SITE.currentIssuePeriod}{" "}
              issue. Questions about these terms may be directed to{" "}
              <a href={`mailto:${SITE.email}`} className="font-semibold text-ink-800 underline">
                {SITE.email}
              </a>
              .
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
