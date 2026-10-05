"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Palette, X } from "lucide-react";

export type ThemeId = "signature" | "classic";

export const THEMES: {
  id: ThemeId;
  name: string;
  tagline: string;
  swatches: [string, string, string, string];
}[] = [
  {
    id: "signature",
    name: "Signature",
    tagline: "Magenta & orange — from the IJITMES logo",
    swatches: ["#b1245f", "#3f0d28", "#f28c28", "#fdfbfb"],
  },
  {
    id: "classic",
    name: "Classic",
    tagline: "Deep navy & antique gold",
    swatches: ["#0c1a30", "#2a4d80", "#bd901f", "#faf9f6"],
  },
];

export const THEME_STORAGE_KEY = "ijitmes-theme";

function applyTheme(id: ThemeId) {
  const root = document.documentElement;
  root.classList.add("theme-transition");
  root.dataset.theme = id;
  try {
    localStorage.setItem(THEME_STORAGE_KEY, id);
  } catch {
    /* storage unavailable */
  }
  window.setTimeout(() => root.classList.remove("theme-transition"), 700);
}

export default function ThemeSwitcher() {
  const [open, setOpen] = useState(false);
  const [theme, setTheme] = useState<ThemeId>("signature");
  const [hint, setHint] = useState(true);

  useEffect(() => {
    const current = document.documentElement.dataset.theme as ThemeId | undefined;
    if (current === "classic" || current === "signature") setTheme(current);
    const t = window.setTimeout(() => setHint(false), 7000);
    return () => window.clearTimeout(t);
  }, []);

  const choose = useCallback((id: ThemeId) => {
    setTheme(id);
    applyTheme(id);
  }, []);

  return (
    <div className="no-print fixed bottom-5 left-5 z-[65] flex flex-col items-start gap-3">
      <AnimatePresence>
        {open && (
          <motion.div
            key="panel"
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.96 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="card w-[300px] overflow-hidden shadow-[0_30px_70px_-24px_rgb(var(--tint)/0.5)]"
            role="dialog"
            aria-label="Choose colour theme"
          >
            <div className="flex items-center justify-between border-b hairline bg-paper-100/70 px-4 py-3">
              <p className="text-[0.7rem] font-bold uppercase tracking-[0.18em] text-ink-700">
                Colour theme
              </p>
              <button
                type="button"
                aria-label="Close theme panel"
                onClick={() => setOpen(false)}
                className="grid h-7 w-7 place-items-center rounded-md text-ink-500 hover:bg-paper-200 hover:text-ink-900"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <ul className="p-2">
              {THEMES.map((t) => {
                const active = theme === t.id;
                return (
                  <li key={t.id}>
                    <button
                      type="button"
                      onClick={() => choose(t.id)}
                      className={`group relative flex w-full items-center gap-3 rounded-lg px-3 py-3 text-left transition-colors ${
                        active ? "bg-ink-50 ring-1 ring-brand-200" : "hover:bg-paper-100"
                      }`}
                    >
                      {/* Mini preview */}
                      <span
                        className="relative grid h-12 w-16 shrink-0 grid-cols-4 overflow-hidden rounded-md ring-1 ring-black/10"
                        aria-hidden
                      >
                        {t.swatches.map((c, i) => (
                          <motion.span
                            key={c}
                            style={{ background: c }}
                            initial={false}
                            animate={{ scaleY: active ? 1 : 0.92 }}
                            transition={{ delay: i * 0.04 }}
                            className="h-full w-full origin-bottom"
                          />
                        ))}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block text-[0.86rem] font-bold text-ink-900">{t.name}</span>
                        <span className="block text-[0.72rem] leading-snug text-ink-500">
                          {t.tagline}
                        </span>
                      </span>
                      <span
                        className={`grid h-6 w-6 shrink-0 place-items-center rounded-full transition-all ${
                          active ? "bg-brand-600 text-white" : "bg-paper-200 text-transparent group-hover:bg-paper-300"
                        }`}
                      >
                        <Check className="h-3.5 w-3.5" />
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
            <p className="border-t hairline px-4 py-2.5 text-[0.68rem] leading-snug text-ink-400">
              Your choice is remembered on this device. Both palettes share the same layout —
              compare them on any page.
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex items-center gap-3">
        <motion.button
          type="button"
          onClick={() => {
            setOpen((o) => !o);
            setHint(false);
          }}
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.94 }}
          aria-expanded={open}
          aria-label="Switch colour theme"
          className="relative grid h-12 w-12 place-items-center rounded-full bg-ink-900 text-gold-300 shadow-[0_14px_30px_-10px_rgb(var(--tint)/0.6)] ring-1 ring-white/20"
        >
          {!open && (
            <span className="absolute inset-0 animate-pulse-ring rounded-full bg-brand-500/40" aria-hidden />
          )}
          <Palette className="relative h-5 w-5" />
          <span
            className="absolute -right-0.5 -top-0.5 h-3.5 w-3.5 rounded-full ring-2 ring-paper-50"
            style={{ background: theme === "classic" ? "#bd901f" : "#f28c28" }}
            aria-hidden
          />
        </motion.button>

        <AnimatePresence>
          {hint && !open && (
            <motion.span
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -8 }}
              transition={{ delay: 1.2, duration: 0.4 }}
              className="card hidden items-center gap-2 px-3.5 py-2 text-[0.74rem] font-semibold text-ink-700 sm:flex"
            >
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-brand-600" />
              Compare both colour themes
            </motion.span>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
