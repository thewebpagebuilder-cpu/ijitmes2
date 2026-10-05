import { NextRequest, NextResponse } from "next/server";
import { and, desc, eq, ilike, or, sql } from "drizzle-orm";
import { db } from "@/db";
import { publishedPapers } from "@/db/schema";

export async function GET(req: NextRequest) {
  const q = (req.nextUrl.searchParams.get("q") ?? "").trim().slice(0, 120);
  const area = (req.nextUrl.searchParams.get("area") ?? "").trim().slice(0, 160);
  const volume = Number(req.nextUrl.searchParams.get("volume") ?? "");
  const issue = Number(req.nextUrl.searchParams.get("issue") ?? "");

  try {
    const conditions = [];
    if (q) {
      const pattern = `%${q.replace(/[%_]/g, "")}%`;
      conditions.push(
        or(
          ilike(publishedPapers.title, pattern),
          ilike(publishedPapers.authors, pattern),
          ilike(publishedPapers.keywords, pattern),
          ilike(publishedPapers.publishedId, pattern),
          ilike(publishedPapers.abstract, pattern)
        )
      );
    }
    if (area) conditions.push(eq(publishedPapers.area, area));
    if (Number.isFinite(volume) && volume > 0)
      conditions.push(eq(publishedPapers.volume, volume));
    if (Number.isFinite(issue) && issue > 0)
      conditions.push(eq(publishedPapers.issue, issue));

    const where = conditions.length ? and(...conditions) : undefined;

    const [papers, byIssue] = await Promise.all([
      db
        .select()
        .from(publishedPapers)
        .where(where)
        .orderBy(desc(publishedPapers.publishedAt))
        .limit(50),
      db
        .select({
          volume: publishedPapers.volume,
          issue: publishedPapers.issue,
          issuePeriod: publishedPapers.issuePeriod,
          count: sql<number>`count(*)::int`,
        })
        .from(publishedPapers)
        .groupBy(publishedPapers.volume, publishedPapers.issue, publishedPapers.issuePeriod)
        .orderBy(desc(publishedPapers.volume), desc(publishedPapers.issue)),
    ]);

    return NextResponse.json({ ok: true, papers, issues: byIssue });
  } catch (err) {
    console.error("Papers search error:", err);
    return NextResponse.json(
      { ok: false, error: "Search is unavailable right now." },
      { status: 500 }
    );
  }
}
