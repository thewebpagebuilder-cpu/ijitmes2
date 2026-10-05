import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CalendarClock, Library } from "lucide-react";
import PageHero from "@/components/ui/PageHero";
import Reveal from "@/components/motion/Reveal";
import IssueBrowser from "@/components/papers/IssueBrowser";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Current Issue & Archive",
  description:
    "Browse the IJITMES digital library — search published papers by title, author, keyword or Paper ID across all volumes and issues.",
};

export default function IssuesPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  return (
    <>
      <PageHero
        eyebrow="Digital Library"
        title="Current issue & archive"
        lede="Every paper published by IJITMES is open access and permanently available here. Search by Paper ID, published ID, title, author name or keyword."
        crumbs={[{ label: "Home", href: "/" }, { label: "Current Issue" }]}
      >
        <div className="flex flex-wrap items-center gap-3">
          <span className="inline-flex items-center gap-2 rounded-full border border-gold-500/40 bg-gold-500/10 px-4 py-2 text-[0.8rem] font-semibold text-gold-300">
            <CalendarClock className="h-4 w-4" />
            Current: {SITE.currentIssueLabel} — {SITE.currentIssuePeriod}
          </span>
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-[0.8rem] font-semibold text-ink-200">
            <Library className="h-4 w-4" />
            Vol. 1 (2025) · Vol. 2 (2026)
          </span>
        </div>
      </PageHero>

      <section className="py-14 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Current-issue banner with the live-site cover image */}
          <Reveal variant="zoom" className="mb-10">
            <div className="card relative grid overflow-hidden lg:grid-cols-[1fr_1.2fr]">
              <div className="img-shine relative h-56 lg:h-full">
                <Image
                  src="/images/live/current-issue.jpg"
                  alt={`IJITMES ${SITE.currentIssueLabel}`}
                  fill
                  sizes="(max-width: 1024px) 100vw, 45vw"
                  className="animate-ken-burns object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/0 lg:to-white" />
              </div>
              <div className="relative p-8 lg:p-10">
                <div className="aurora-light absolute inset-0" aria-hidden />
                <div className="relative">
                  <span className="eyebrow">Now Publishing</span>
                  <h2 className="mt-3 font-serif-display text-2xl font-semibold text-ink-900 sm:text-3xl">
                    {SITE.currentIssueLabel} — {SITE.currentIssuePeriod}
                  </h2>
                  <p className="mt-3 max-w-lg text-[0.9rem] leading-relaxed text-ink-500">
                    The current issue is open for submissions. Accepted papers are added
                    continuously throughout the month and appear in the library below within
                    hours of publication.
                  </p>
                  <div className="mt-6 flex flex-wrap gap-3">
                    <Link href="/submit" className="btn btn-primary !py-3">
                      Submit to this issue
                    </Link>
                    <Link href="/charges" className="btn btn-outline !py-3">
                      Processing charges
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal>
            <IssueBrowserWrapper searchParams={searchParams} />
          </Reveal>
        </div>
      </section>
    </>
  );
}

async function IssueBrowserWrapper({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const initialArea = typeof params.area === "string" ? params.area : "";
  return <IssueBrowser initialArea={initialArea} />;
}
