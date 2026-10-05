"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FileSearch, Loader2, Search, X } from "lucide-react";
import PaperCard from "@/components/ui/PaperCard";
import { DOMAINS } from "@/lib/site";
import type { PublishedPaper } from "@/db/schema";

type IssueRow = {
  volume: number;
  issue: number;
  issuePeriod: string;
  count: number;
};

export default function IssueBrowser({ initialArea = "" }: { initialArea?: string }) {
  const [q, setQ] = useState("");
  const [debouncedQ, setDebouncedQ] = useState("");
  const [area, setArea] = useState(initialArea);
  const [selectedIssue, setSelectedIssue] = useState<{ volume: number; issue: number } | null>(null);
  const [papers, setPapers] = useState<PublishedPaper[]>([]);
  const [issues, setIssues] = useState<IssueRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Debounce search input
  useEffect(() => {
    const t = setTimeout(() => setDebouncedQ(q.trim()), 320);
    return () => clearTimeout(t);
  }, [q]);

  const fetchPapers = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const params = new URLSearchParams();
      if (debouncedQ) params.set("q", debouncedQ);
      if (area) params.set("area", area);
      if (selectedIssue) {
        params.set("volume", String(selectedIssue.volume));
        params.set("issue", String(selectedIssue.issue));
      }
      const res = await fetch(`/api/papers?${params.toString()}`);
      const json = await res.json();
      if (!res.ok || !json.ok) throw new Error(json.error || "Search failed");
      setPapers(json.papers);
      setIssues(json.issues);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Search failed");
    } finally {
      setLoading(false);
    }
  }, [debouncedQ, area, selectedIssue]);

  useEffect(() => {
    fetchPapers();
  }, [fetchPapers]);

  const hasFilters = useMemo(
    () => Boolean(debouncedQ || area || selectedIssue),
    [debouncedQ, area, selectedIssue]
  );

  const clearAll = () => {
    setQ("");
    setArea("");
    setSelectedIssue(null);
  };

  return (
    <div className="grid gap-8 lg:grid-cols-[290px_1fr]">
      {/* ── Sidebar: issues ── */}
      <aside className="space-y-6 lg:sticky lg:top-32 lg:self-start">
        <div className="card overflow-hidden">
          <div className="border-b hairline bg-paper-100/70 px-5 py-4">
            <h3 className="text-[0.76rem] font-bold uppercase tracking-[0.16em] text-ink-700">
              Browse by Issue
            </h3>
          </div>
          <ul className="scroll-thin max-h-[26rem] divide-y divide-paper-200 overflow-y-auto">
            <li>
              <button
                type="button"
                onClick={() => setSelectedIssue(null)}
                className={`flex w-full items-center justify-between px-5 py-3.5 text-left text-[0.85rem] font-medium transition-colors ${
                  !selectedIssue ? "bg-ink-900 text-white" : "text-ink-700 hover:bg-paper-100"
                }`}
              >
                All issues
                <span className={`text-[0.72rem] ${!selectedIssue ? "text-gold-300" : "text-ink-400"}`}>
                  {issues.reduce((n, i) => n + i.count, 0)} papers
                </span>
              </button>
            </li>
            {issues.map((i) => {
              const active = selectedIssue?.volume === i.volume && selectedIssue?.issue === i.issue;
              return (
                <li key={`${i.volume}-${i.issue}`}>
                  <button
                    type="button"
                    onClick={() => setSelectedIssue(active ? null : { volume: i.volume, issue: i.issue })}
                    className={`flex w-full items-center justify-between px-5 py-3.5 text-left text-[0.85rem] font-medium transition-colors ${
                      active ? "bg-ink-900 text-white" : "text-ink-700 hover:bg-paper-100"
                    }`}
                  >
                    <span>
                      Vol. {i.volume}, Issue {i.issue}
                      <span className={`block text-[0.7rem] font-normal ${active ? "text-ink-300" : "text-ink-400"}`}>
                        {i.issuePeriod}
                      </span>
                    </span>
                    <span className={`text-[0.72rem] ${active ? "text-gold-300" : "text-ink-400"}`}>
                      {i.count}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="card overflow-hidden">
          <div className="border-b hairline bg-paper-100/70 px-5 py-4">
            <h3 className="text-[0.76rem] font-bold uppercase tracking-[0.16em] text-ink-700">
              Subject Area
            </h3>
          </div>
          <ul className="divide-y divide-paper-200">
            {DOMAINS.map((d) => {
              const active = area === d.name;
              return (
                <li key={d.id}>
                  <button
                    type="button"
                    onClick={() => setArea(active ? "" : d.name)}
                    className={`flex w-full items-center justify-between px-5 py-3 text-left text-[0.82rem] font-medium transition-colors ${
                      active ? "bg-gold-100 text-gold-700" : "text-ink-600 hover:bg-paper-100"
                    }`}
                  >
                    {d.name.replace(" & Applied Sciences", "")}
                    {active && <X className="h-3.5 w-3.5" />}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </aside>

      {/* ── Main results ── */}
      <div>
        {/* Search bar */}
        <div className="card flex items-center gap-3 px-5 py-4">
          <Search className="h-5 w-5 shrink-0 text-ink-400" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search by Paper ID, title, author or keyword — e.g. “photovoltaic”"
            className="w-full bg-transparent text-[0.95rem] text-ink-900 placeholder:text-ink-400 focus:outline-none"
            aria-label="Search papers"
          />
          {q && (
            <button
              type="button"
              onClick={() => setQ("")}
              aria-label="Clear search"
              className="grid h-8 w-8 shrink-0 place-items-center rounded-full text-ink-400 hover:bg-paper-100 hover:text-ink-800"
            >
              <X className="h-4 w-4" />
            </button>
          )}
          {loading && <Loader2 className="h-4.5 w-4.5 shrink-0 animate-spin text-gold-600" />}
        </div>

        <div className="mt-4 flex items-center justify-between">
          <p className="text-[0.82rem] font-medium text-ink-500">
            {loading
              ? "Searching the library…"
              : `${papers.length} paper${papers.length === 1 ? "" : "s"} found`}
            {selectedIssue &&
              ` · Vol. ${selectedIssue.volume}, Issue ${selectedIssue.issue}`}
          </p>
          {hasFilters && (
            <button
              type="button"
              onClick={clearAll}
              className="text-[0.78rem] font-bold text-ink-600 underline decoration-gold-500 decoration-2 underline-offset-4 hover:text-ink-900"
            >
              Clear filters
            </button>
          )}
        </div>

        {error && (
          <p className="mt-6 rounded-lg border border-red-200 bg-red-50 px-5 py-4 text-[0.85rem] font-medium text-red-700">
            {error}
          </p>
        )}

        <AnimatePresence mode="popLayout">
          {!loading && !error && papers.length === 0 && (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="card mt-6 flex flex-col items-center px-6 py-16 text-center"
            >
              <span className="grid h-14 w-14 place-items-center rounded-full bg-paper-100 text-ink-400">
                <FileSearch className="h-6 w-6" />
              </span>
              <h3 className="mt-5 font-serif-display text-xl font-semibold text-ink-900">
                No papers match your search
              </h3>
              <p className="mt-2 max-w-sm text-[0.85rem] leading-relaxed text-ink-500">
                Try a different keyword, remove a filter, or search by a full
                Paper ID such as “IJITMES-2602”.
              </p>
              <button type="button" onClick={clearAll} className="btn btn-outline mt-6">
                Reset search
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mt-6 grid gap-5 xl:grid-cols-2">
          {papers.map((paper, i) => (
            <motion.div
              layout
              key={paper.publishedId}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: Math.min(i * 0.04, 0.3), ease: [0.22, 1, 0.36, 1] }}
            >
              <PaperCard paper={paper} />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
