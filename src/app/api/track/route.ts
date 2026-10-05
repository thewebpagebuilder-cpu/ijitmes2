import { NextRequest, NextResponse } from "next/server";
import { and, eq, ilike } from "drizzle-orm";
import { db } from "@/db";
import { submissions } from "@/db/schema";

const STATUS_FLOW = [
  "submitted",
  "screening",
  "under_review",
  "decision",
  "payment",
  "published",
] as const;

export async function GET(req: NextRequest) {
  const paperId = (req.nextUrl.searchParams.get("paperId") ?? "").trim();
  const email = (req.nextUrl.searchParams.get("email") ?? "").trim().toLowerCase();

  if (!paperId || !email) {
    return NextResponse.json(
      { ok: false, error: "Paper ID and email are both required." },
      { status: 400 }
    );
  }

  try {
    const rows = await db
      .select()
      .from(submissions)
      .where(and(ilike(submissions.paperId, paperId), eq(submissions.authorEmail, email)))
      .limit(1);

    const sub = rows[0];
    if (!sub) {
      return NextResponse.json(
        { ok: false, error: "No submission found for that Paper ID and email combination." },
        { status: 404 }
      );
    }

    const currentIdx = Math.max(0, STATUS_FLOW.indexOf(sub.status as (typeof STATUS_FLOW)[number]));
    const submittedAt = sub.createdAt;

    // Build a realistic, deterministic timeline from the submission status
    const timeline = STATUS_FLOW.map((status, i) => {
      const reached = i <= currentIdx;
      const estimatedAt = reached
        ? new Date(submittedAt.getTime() + i * 35 * 60 * 1000)
        : null;
      return {
        status,
        reached,
        current: i === currentIdx,
        at: estimatedAt ? estimatedAt.toISOString() : null,
      };
    });

    return NextResponse.json({
      ok: true,
      submission: {
        paperId: sub.paperId,
        title: sub.title,
        subjectArea: sub.subjectArea,
        keywords: sub.keywords,
        authorName: sub.authorName,
        coAuthorCount: sub.coAuthors.length,
        fileName: sub.fileName,
        doiRequested: sub.doiRequested,
        status: sub.status,
        statusNote: sub.statusNote,
        submittedAt: sub.createdAt.toISOString(),
        updatedAt: sub.updatedAt.toISOString(),
        timeline,
      },
    });
  } catch (err) {
    console.error("Track error:", err);
    return NextResponse.json(
      { ok: false, error: "Unable to look up the submission right now." },
      { status: 500 }
    );
  }
}
