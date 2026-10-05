"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import {
  ChevronDown,
  Mail,
  MapPin,
  Menu,
  Radar,
  Send,
  X,
} from "lucide-react";
import Logo from "./Logo";
import { SITE, MAIN_NAV, AUTHOR_LINKS } from "@/lib/site";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [authorsOpen, setAuthorsOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setAuthorsOpen(false);
  }, [pathname]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-[60]">
      {/* Utility strip */}
      <div className="bg-gradient-to-r from-ink-950 via-brand-900 to-ink-950 text-[0.72rem] text-ink-200">
        <div className="mx-auto flex h-9 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
          <p className="hidden items-center gap-5 md:flex">
            <span className="flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5 text-gold-400" />
              Nashik, Maharashtra, India
            </span>
            <a
              href={`mailto:${SITE.email}`}
              className="flex items-center gap-1.5 transition-colors hover:text-white"
            >
              <Mail className="h-3.5 w-3.5 text-gold-400" />
              {SITE.email}
            </a>
          </p>
          <p className="md:hidden">Peer-Reviewed · Open Access · Monthly</p>
          <div className="flex items-center gap-4">
            <span className="hidden sm:block">
              {SITE.currentIssueLabel} — {SITE.currentIssuePeriod}
            </span>
            <Link
              href="/track"
              className="flex items-center gap-1.5 font-semibold text-gold-300 transition-colors hover:text-gold-200"
            >
              <Radar className="h-3.5 w-3.5" />
              Track Paper
            </Link>
          </div>
        </div>
      </div>

      {/* Main bar */}
      <div
        className={`border-b transition-all duration-300 ${
          scrolled
            ? "border-paper-200 bg-paper-50/90 shadow-[0_10px_36px_-18px_rgb(var(--tint)/0.35)] backdrop-blur-xl"
            : "border-transparent bg-paper-50"
        }`}
      >
        <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between gap-6 px-4 sm:px-6 lg:px-8">
          <Link href="/" aria-label="IJITMES home" className="shrink-0">
            <Logo />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
            {MAIN_NAV.slice(0, 2).map((item) => (
              <NavLink key={item.href} item={item} active={isActive(item.href)} />
            ))}

            {/* For Authors dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setAuthorsOpen(true)}
              onMouseLeave={() => setAuthorsOpen(false)}
            >
              <button
                type="button"
                aria-expanded={authorsOpen}
                className={`flex items-center gap-1.5 rounded-md px-3.5 py-2.5 text-[0.9rem] font-medium transition-colors ${
                  isActive("/submit") || isActive("/track") || isActive("/guidelines") || isActive("/how-to-publish")
                    ? "text-ink-900"
                    : "text-ink-600 hover:text-ink-900"
                }`}
              >
                For Authors
                <ChevronDown
                  className={`h-4 w-4 transition-transform duration-300 ${authorsOpen ? "rotate-180" : ""}`}
                />
              </button>
              <span
                className={`absolute left-3.5 right-3.5 top-[46px] h-[2px] origin-left rounded-full bg-gold-500 transition-transform duration-300 ${
                  authorsOpen ? "scale-x-100" : "scale-x-0"
                }`}
              />
              <AnimatePresence>
                {authorsOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 6, scale: 0.98 }}
                    transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute left-1/2 top-full w-[420px] -translate-x-1/2 pt-3"
                  >
                    <div className="card overflow-hidden p-2 shadow-[0_30px_60px_-20px_rgb(var(--tint)/0.35)]">
                      {AUTHOR_LINKS.map((link) => (
                        <Link
                          key={link.href}
                          href={link.href}
                          className="group flex items-start gap-3 rounded-lg px-3.5 py-3 transition-colors hover:bg-paper-100"
                        >
                          <span className="mt-[3px] h-1.5 w-1.5 rounded-full bg-gold-500 transition-transform group-hover:scale-150" />
                          <span>
                            <span className="block text-[0.9rem] font-semibold text-ink-900">
                              {link.label}
                            </span>
                            <span className="mt-0.5 block text-[0.78rem] leading-snug text-ink-500">
                              {link.description}
                            </span>
                          </span>
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {MAIN_NAV.slice(2).map((item) => (
              <NavLink key={item.href} item={item} active={isActive(item.href)} />
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/submit"
              className="btn btn-gold hidden !px-5 !py-3 sm:inline-flex"
            >
              <Send className="h-4 w-4" />
              Submit Paper
            </Link>
            <button
              type="button"
              aria-label="Open menu"
              onClick={() => setMobileOpen(true)}
              className="grid h-11 w-11 place-items-center rounded-md border border-paper-300 bg-white text-ink-800 lg:hidden"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[80] bg-ink-950/50 backdrop-blur-sm lg:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 320, damping: 34 }}
              className="fixed bottom-0 right-0 top-0 z-[90] flex w-[86%] max-w-sm flex-col bg-paper-50 shadow-2xl lg:hidden"
            >
              <div className="flex items-center justify-between border-b hairline px-5 py-4">
                <Logo />
                <button
                  type="button"
                  aria-label="Close menu"
                  onClick={() => setMobileOpen(false)}
                  className="grid h-10 w-10 place-items-center rounded-md border border-paper-300 bg-white text-ink-800"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <nav className="flex-1 overflow-y-auto px-5 py-6" aria-label="Mobile">
                <p className="mb-2 text-[0.68rem] font-bold uppercase tracking-[0.18em] text-ink-400">
                  Journal
                </p>
                <ul className="space-y-1">
                  {MAIN_NAV.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className={`block rounded-lg px-3 py-2.5 text-[0.95rem] font-medium ${
                          isActive(item.href)
                            ? "bg-ink-900 text-white"
                            : "text-ink-800 hover:bg-paper-100"
                        }`}
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
                <p className="mb-2 mt-7 text-[0.68rem] font-bold uppercase tracking-[0.18em] text-ink-400">
                  For Authors
                </p>
                <ul className="space-y-1">
                  {AUTHOR_LINKS.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className="block rounded-lg px-3 py-2.5 text-[0.95rem] font-medium text-ink-800 hover:bg-paper-100"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
              <div className="border-t hairline p-5">
                <Link href="/submit" className="btn btn-gold w-full">
                  <Send className="h-4 w-4" />
                  Submit Your Paper
                </Link>
                <p className="mt-3 text-center text-[0.72rem] text-ink-400">
                  Acceptance in 7–8 hrs · Publication in 1–2 days
                </p>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}

function NavLink({
  item,
  active,
}: {
  item: { label: string; href: string };
  active: boolean;
}) {
  return (
    <Link
      href={item.href}
      className={`group relative rounded-md px-3.5 py-2.5 text-[0.9rem] font-medium transition-colors ${
        active ? "text-ink-900" : "text-ink-600 hover:text-ink-900"
      }`}
    >
      {item.label}
      <span
        className={`absolute inset-x-3.5 bottom-1 h-[2px] origin-left rounded-full bg-gold-500 transition-transform duration-300 ${
          active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
        }`}
      />
    </Link>
  );
}
