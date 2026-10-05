import type { Metadata } from "next";
import { CircleHelp, IdCard, KeyRound } from "lucide-react";
import PageHero from "@/components/ui/PageHero";
import Reveal from "@/components/motion/Reveal";
import TrackForm from "@/components/forms/TrackForm";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Track Manuscript",
  description:
    "Track your IJITMES manuscript status online using your Paper ID and email address. Follow every stage from submission to publication.",
};

export default function TrackPage() {
  return (
    <>
      <PageHero
        eyebrow="Author Area"
        title="Track your manuscript"
        lede="Log in with your Paper ID and the email address used at submission to see the live status of your paper."
        crumbs={[{ label: "Home", href: "/" }, { label: "Track Paper" }]}
      />

      <section className="py-14 lg:py-20">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[1fr_340px] lg:px-8">
          <Reveal>
            <TrackForm />
          </Reveal>

          <div className="space-y-5 lg:sticky lg:top-32 lg:self-start">
            <Reveal delay={0.1}>
              <div className="card p-6">
                <h3 className="flex items-center gap-2 font-serif-display text-lg font-semibold text-ink-900">
                  <KeyRound className="h-5 w-5 text-gold-600" />
                  How to log in
                </h3>
                <ol className="mt-4 space-y-3.5 text-[0.85rem] leading-relaxed text-ink-600">
                  <li className="flex gap-3">
                    <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-ink-900 text-[0.7rem] font-bold text-white">1</span>
                    Find your Paper ID — it is issued instantly when you submit and emailed to you.
                  </li>
                  <li className="flex gap-3">
                    <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-ink-900 text-[0.7rem] font-bold text-white">2</span>
                    Enter the Paper ID along with the corresponding author&apos;s email.
                  </li>
                  <li className="flex gap-3">
                    <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-ink-900 text-[0.7rem] font-bold text-white">3</span>
                    See the stage-by-stage progress and the latest editorial note.
                  </li>
                </ol>
              </div>
            </Reveal>

            <Reveal delay={0.16}>
              <div className="rounded-xl border border-ink-100 bg-ink-50 p-5">
                <p className="flex items-center gap-2 text-[0.85rem] font-bold text-ink-800">
                  <IdCard className="h-4.5 w-4.5 text-ink-600" />
                  Trying it out?
                </p>
                <p className="mt-2 text-[0.8rem] leading-relaxed text-ink-600">
                  Use the demo submission — Paper ID{" "}
                  <code className="rounded bg-white px-1.5 py-0.5 text-[0.74rem] font-bold text-ink-900 ring-1 ring-ink-200">
                    IJITMES-2026-0901
                  </code>{" "}
                  with email{" "}
                  <code className="rounded bg-white px-1.5 py-0.5 text-[0.74rem] font-bold text-ink-900 ring-1 ring-ink-200">
                    demo@ijitmes.com
                  </code>
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.22}>
              <div className="flex items-start gap-3 p-1 text-[0.8rem] leading-relaxed text-ink-500">
                <CircleHelp className="mt-0.5 h-4.5 w-4.5 shrink-0 text-gold-600" />
                <p>
                  Lost your Paper ID? Email{" "}
                  <a href={`mailto:${SITE.email}`} className="font-semibold text-ink-800 underline">
                    {SITE.email}
                  </a>{" "}
                  from your registered address and we will resend it.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
