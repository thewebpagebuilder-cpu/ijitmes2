import type { Metadata } from "next";
import { Clock3, Mail, MapPin, MessageSquareText, Send } from "lucide-react";
import PageHero from "@/components/ui/PageHero";
import Reveal, { RevealItem, RevealStagger } from "@/components/motion/Reveal";
import ContactForm from "@/components/forms/ContactForm";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact the IJITMES editorial office for submission queries, payment support, reviewer registration and conference partnerships.",
};

const CHANNELS = [
  {
    icon: MapPin,
    title: "Editorial Office",
    lines: ["Mahalaxmi Temple, Pimpalgoan Khamb", "Nashik, Maharashtra, India"],
  },
  {
    icon: Mail,
    title: "Email",
    lines: [SITE.email, "Submissions, payments & support"],
    href: `mailto:${SITE.email}`,
  },
  {
    icon: Clock3,
    title: "Response Time",
    lines: ["Within a few hours", "24/7 chat support for authors"],
  },
];

const TOPICS = [
  "Submission & review queries",
  "Payment assistance",
  "Join as a reviewer",
  "Conference proceedings",
  "Indexing & certificates",
  "General enquiry",
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Get in Touch"
        title="Contact the editorial office"
        lede="Questions about a submission, payment or certificate — or interested in reviewing for the journal? Send us a message."
        crumbs={[{ label: "Home", href: "/" }, { label: "Contact" }]}
      />

      <section className="py-14 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Channels */}
          <RevealStagger className="grid gap-5 sm:grid-cols-3">
            {CHANNELS.map((c) => (
              <RevealItem key={c.title}>
                <div className="card card-hover h-full p-6">
                  <span className="grid h-12 w-12 place-items-center rounded-lg bg-ink-900 text-gold-400">
                    <c.icon className="h-5.5 w-5.5" strokeWidth={1.7} />
                  </span>
                  <h3 className="mt-4 font-serif-display text-lg font-semibold text-ink-900">
                    {c.title}
                  </h3>
                  <p className="mt-1.5 text-[0.86rem] leading-relaxed text-ink-500">
                    {c.href ? (
                      <a href={c.href} className="font-semibold text-ink-800 underline decoration-gold-500 decoration-2 underline-offset-4 hover:text-ink-600">
                        {c.lines[0]}
                      </a>
                    ) : (
                      c.lines[0]
                    )}
                    <br />
                    {c.lines[1]}
                  </p>
                </div>
              </RevealItem>
            ))}
          </RevealStagger>

          <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_360px]">
            <Reveal>
              <div className="card p-7 sm:p-9">
                <h2 className="flex items-center gap-3 font-serif-display text-2xl font-semibold text-ink-900">
                  <MessageSquareText className="h-6 w-6 text-gold-600" />
                  Send a message
                </h2>
                <p className="mt-2 text-[0.88rem] text-ink-500">
                  Fill in the form and the editorial team will reply to your
                  email — usually within a few hours.
                </p>
                <div className="mt-7">
                  <ContactForm />
                </div>
              </div>
            </Reveal>

            <div className="space-y-5 lg:sticky lg:top-32 lg:self-start">
              <Reveal delay={0.1}>
                <div className="card p-6">
                  <h3 className="text-[0.78rem] font-bold uppercase tracking-[0.16em] text-ink-500">
                    Common topics
                  </h3>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {TOPICS.map((t) => (
                      <li
                        key={t}
                        className="rounded-full border hairline bg-paper-100/60 px-3.5 py-1.5 text-[0.76rem] font-semibold text-ink-600"
                      >
                        {t}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
              <Reveal delay={0.16}>
                <div className="relative overflow-hidden rounded-xl bg-ink-950 p-7 text-white">
                  <div className="grid-dark absolute inset-0" aria-hidden />
                  <div className="relative">
                    <h3 className="font-serif-display text-xl font-semibold">
                      Reviewer call
                    </h3>
                    <p className="mt-2 text-[0.87rem] leading-relaxed text-ink-300">
                      {SITE.name} reviewers are active worldwide. If you hold a
                      PhD or equivalent experience in one of our domains, join
                      the reviewer panel.
                    </p>
                    <a href={`mailto:${SITE.email}?subject=Reviewer%20Application`} className="btn btn-gold mt-5 !py-3">
                      <Send className="h-4 w-4" />
                      Apply by email
                    </a>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
