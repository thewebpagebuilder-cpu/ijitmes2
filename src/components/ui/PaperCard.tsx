import { AreaChart, Download, FileText, Quote, Users } from "lucide-react";
import type { PublishedPaper } from "@/db/schema";

const AREA_SHORT: Record<string, string> = {
  "Computer Engineering": "Comp. Engg.",
  "Civil Engineering": "Civil Engg.",
  "Electrical Engineering": "Electrical Engg.",
  "Artificial Intelligence": "Artificial Intelligence",
  "Mechanical Engineering": "Mech. Engg.",
  "Science & Applied Sciences": "Appl. Sciences",
  "Electronics & Telecommunication": "E&TC",
  "Information Technology": "Info. Technology",
};

export default function PaperCard({ paper }: { paper: PublishedPaper }) {
  return (
    <article className="card card-hover group relative flex h-full flex-col overflow-hidden p-6">
      <div className="absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 bg-gradient-to-r from-brand-700 via-brand-500 to-gold-500 transition-transform duration-500 group-hover:scale-x-100" />

      <div className="flex flex-wrap items-center gap-2 text-[0.68rem] font-bold uppercase tracking-[0.12em]">
        <span className="rounded-full bg-ink-50 px-2.5 py-1 text-ink-600 ring-1 ring-ink-100">
          {AREA_SHORT[paper.area] ?? paper.area}
        </span>
        <span className="rounded-full bg-gold-100 px-2.5 py-1 text-gold-700">
          {paper.publishedId}
        </span>
      </div>

      <h3 className="mt-4 font-serif-display text-[1.18rem] font-semibold leading-snug text-ink-900 transition-colors group-hover:text-ink-600">
        {paper.title}
      </h3>

      <p className="mt-2.5 flex items-start gap-1.5 text-[0.82rem] font-medium text-ink-500">
        <Users className="mt-[3px] h-3.5 w-3.5 shrink-0 text-gold-600" />
        {paper.authors}
      </p>

      <p className="mt-3 line-clamp-3 flex-1 text-[0.85rem] leading-relaxed text-ink-500">
        {paper.abstract}
      </p>

      <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t hairline pt-4 text-[0.75rem] text-ink-500">
        <span className="flex items-center gap-1.5">
          <FileText className="h-3.5 w-3.5 text-ink-400" />
          Vol. {paper.volume}, Issue {paper.issue} · pp. {paper.pages}
        </span>
        <span className="flex items-center gap-3.5">
          <span className="flex items-center gap-1" title="Citations">
            <Quote className="h-3.5 w-3.5 text-ink-400" />
            {paper.citations}
          </span>
          <span className="flex items-center gap-1" title="Downloads">
            <Download className="h-3.5 w-3.5 text-ink-400" />
            {paper.downloads.toLocaleString("en-IN")}
          </span>
          <span className="flex items-center gap-1" title="Views">
            <AreaChart className="h-3.5 w-3.5 text-ink-400" />
            {(paper.downloads * 3 + paper.citations * 41).toLocaleString("en-IN")}
          </span>
        </span>
      </div>

      {paper.doi ? (
        <p className="mt-3 truncate text-[0.72rem] text-ink-400">
          DOI:&nbsp;
          <span className="font-medium text-ink-600">
            https://doi.org/{paper.doi}
          </span>
        </p>
      ) : null}
    </article>
  );
}
