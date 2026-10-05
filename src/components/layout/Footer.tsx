import Link from "next/link";
import {
  ArrowUpRight,
  BadgeCheck,
  BookOpenCheck,
  CalendarClock,
  Mail,
  MapPin,
} from "lucide-react";
import Logo from "./Logo";
import { SITE, MAIN_NAV, AUTHOR_LINKS, DOMAINS } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-ink-950 text-ink-200">
      <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-brand-600 via-gold-500 to-brand-600 bg-[length:200%_100%] [animation:gradient-x_6s_ease_infinite]" aria-hidden />
      <div className="grid-dark pointer-events-none absolute inset-0" aria-hidden />
      <div className="aurora pointer-events-none absolute inset-0 opacity-60" aria-hidden />
      <div
        className="pointer-events-none absolute -top-40 left-1/2 h-80 w-[60rem] -translate-x-1/2 rounded-full bg-ink-600/20 blur-[110px]"
        aria-hidden
      />

      <div className="relative mx-auto max-w-7xl px-4 pb-10 pt-16 sm:px-6 lg:px-8">
        {/* Publisher strip */}
        <div className="mb-12 grid gap-6 rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm sm:grid-cols-3">
          <Meta icon={<BookOpenCheck className="h-5 w-5" />} label="Publisher">
            IJITMES Editorial Office, Nashik
          </Meta>
          <Meta icon={<CalendarClock className="h-5 w-5" />} label="Frequency">
            Monthly — 12 issues per year
          </Meta>
          <Meta icon={<BadgeCheck className="h-5 w-5" />} label="Established">
            {SITE.established} · Peer-reviewed · Open Access
          </Meta>
        </div>

        <div className="grid gap-10 lg:grid-cols-[1.35fr_1fr_1fr_1.2fr]">
          {/* About */}
          <div>
            <Logo dark />
            <p className="mt-5 max-w-sm text-[0.85rem] leading-relaxed text-ink-300">
              {SITE.fullName} — an international, peer-reviewed, open-access
              journal publishing original research across engineering, science
              and technology with rapid, transparent editorial processing.
            </p>
            <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-gold-500/40 bg-gold-500/10 px-4 py-2 text-[0.75rem] font-semibold text-gold-300">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-gold-400" />
              Call for Papers — {SITE.currentIssuePeriod} issue now open
            </div>
          </div>

          {/* Explore */}
          <nav aria-label="Explore">
            <h3 className="text-[0.72rem] font-bold uppercase tracking-[0.2em] text-gold-400">
              Explore
            </h3>
            <ul className="mt-5 space-y-2.5 text-[0.88rem]">
              {MAIN_NAV.map((item) => (
                <FooterLink key={item.href} href={item.href}>
                  {item.label}
                </FooterLink>
              ))}
              <FooterLink href="/terms">Terms &amp; Conditions</FooterLink>
            </ul>
          </nav>

          {/* Authors */}
          <nav aria-label="For authors">
            <h3 className="text-[0.72rem] font-bold uppercase tracking-[0.2em] text-gold-400">
              For Authors
            </h3>
            <ul className="mt-5 space-y-2.5 text-[0.88rem]">
              {AUTHOR_LINKS.map((item) => (
                <FooterLink key={item.href} href={item.href}>
                  {item.label}
                </FooterLink>
              ))}
            </ul>
          </nav>

          {/* Scope + contact */}
          <div>
            <h3 className="text-[0.72rem] font-bold uppercase tracking-[0.2em] text-gold-400">
              Subject Coverage
            </h3>
            <ul className="mt-5 flex flex-wrap gap-2">
              {DOMAINS.map((d) => (
                <li
                  key={d.id}
                  className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[0.72rem] text-ink-200"
                >
                  {d.name.replace(" & Applied Sciences", "")}
                </li>
              ))}
            </ul>
            <div className="mt-6 space-y-2.5 text-[0.85rem] text-ink-300">
              <p className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold-400" />
                {SITE.address}
              </p>
              <a
                href={`mailto:${SITE.email}`}
                className="flex items-center gap-2.5 transition-colors hover:text-white"
              >
                <Mail className="h-4 w-4 shrink-0 text-gold-400" />
                {SITE.email}
              </a>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-[0.78rem] text-ink-400 sm:flex-row">
          <p>
            © {new Date().getFullYear()} {SITE.name} — {SITE.shortName}. All
            rights reserved.
          </p>
          <a
            href={SITE.url}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 transition-colors hover:text-gold-300"
          >
            {SITE.url.replace("https://", "")}
            <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>
    </footer>
  );
}

function Meta({
  icon,
  label,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-3.5">
      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-lg border border-white/10 bg-white/5 text-gold-400">
        {icon}
      </span>
      <div>
        <p className="text-[0.66rem] font-bold uppercase tracking-[0.18em] text-ink-400">
          {label}
        </p>
        <p className="mt-0.5 text-[0.85rem] font-medium text-white">{children}</p>
      </div>
    </div>
  );
}

function FooterLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <li>
      <Link
        href={href}
        className="text-ink-300 transition-colors hover:text-gold-300"
      >
        {children}
      </Link>
    </li>
  );
}
