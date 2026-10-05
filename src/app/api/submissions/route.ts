import { NextRequest, NextResponse } from "next/server";
import { count } from "drizzle-orm";
import { db } from "@/db";
import { submissions } from "@/db/schema";
import { paperIdFromSerial } from "@/lib/site";

const MAX_FILE_SIZE = 8 * 1024 * 1024; // 8 MB
const ALLOWED_TYPES = [
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/msword",
];

function clean(v: FormDataEntryValue | null, max = 500): string {
  return typeof v === "string" ? v.trim().slice(0, max) : "";
}

export async function POST(req: NextRequest) {
  try {
    const form = await req.formData();

    const title = clean(form.get("title"));
    const abstract = clean(form.get("abstract"), 6000);
    const keywords = clean(form.get("keywords"));
    const subjectArea = clean(form.get("subjectArea"), 160);
    const authorName = clean(form.get("authorName"), 200);
    const authorEmail = clean(form.get("authorEmail"), 200).toLowerCase();
    const authorPhone = clean(form.get("authorPhone"), 40);
    const authorAffiliation = clean(form.get("authorAffiliation"), 300);
    const address = clean(form.get("address"), 600);
    const city = clean(form.get("city"), 100);
    const state = clean(form.get("state"), 100);
    const country = clean(form.get("country"), 100);
    const postalCode = clean(form.get("postalCode"), 20);
    const doiRequested = form.get("doiRequested") === "on";
    const hardCopyRequested = form.get("hardCopyRequested") === "on";

    // Co-authors arrive as JSON string
    let coAuthors: { name: string; affiliation: string }[] = [];
    const rawCo = form.get("coAuthors");
    if (typeof rawCo === "string" && rawCo.trim()) {
      try {
        const parsed = JSON.parse(rawCo);
        if (Array.isArray(parsed)) {
          coAuthors = parsed
            .filter((c) => c && typeof c.name === "string" && c.name.trim())
            .slice(0, 7)
            .map((c) => ({
              name: String(c.name).trim().slice(0, 200),
              affiliation: String(c.affiliation ?? "").trim().slice(0, 300),
            }));
        }
      } catch {
        coAuthors = [];
      }
    }

    const required: Record<string, string> = {
      title,
      abstract,
      keywords,
      subjectArea,
      authorName,
      authorEmail,
      authorPhone,
      authorAffiliation,
      address,
      city,
      state,
      country,
      postalCode,
    };
    for (const [key, value] of Object.entries(required)) {
      if (!value) {
        return NextResponse.json(
          { ok: false, error: `Missing required field: ${key}` },
          { status: 400 }
        );
      }
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(authorEmail)) {
      return NextResponse.json(
        { ok: false, error: "Please provide a valid email address." },
        { status: 400 }
      );
    }
    if (title.length < 10) {
      return NextResponse.json(
        { ok: false, error: "The paper title is too short (min. 10 characters)." },
        { status: 400 }
      );
    }
    if (abstract.length < 100) {
      return NextResponse.json(
        { ok: false, error: "The abstract is too short (min. 100 characters)." },
        { status: 400 }
      );
    }

    // Manuscript file (optional but strongly recommended)
    const file = form.get("manuscript");
    let fileName: string | null = null;
    let fileSize: number | null = null;
    let fileData: Buffer | null = null;
    if (file instanceof File && file.size > 0) {
      if (file.size > MAX_FILE_SIZE) {
        return NextResponse.json(
          { ok: false, error: "Manuscript file exceeds the 8 MB limit." },
          { status: 400 }
        );
      }
      const isWord =
        ALLOWED_TYPES.includes(file.type) ||
        /\.docx?$/i.test(file.name);
      if (!isWord) {
        return NextResponse.json(
          { ok: false, error: "Only .doc or .docx manuscript files are accepted." },
          { status: 400 }
        );
      }
      fileName = file.name.slice(0, 255);
      fileSize = file.size;
      fileData = Buffer.from(await file.arrayBuffer());
    }

    const year = new Date().getFullYear();
    const [{ value: total }] = await db.select({ value: count() }).from(submissions);
    const paperId = paperIdFromSerial(1001 + Number(total), year);

    await db.insert(submissions).values({
      paperId,
      title,
      abstract,
      keywords,
      subjectArea,
      doiRequested,
      hardCopyRequested,
      authorName,
      authorEmail,
      authorPhone,
      authorAffiliation,
      coAuthors,
      address,
      city,
      state,
      country,
      postalCode,
      fileName,
      fileSize,
      fileData,
      status: "submitted",
      statusNote: "Manuscript received and queued for plagiarism screening.",
    });

    return NextResponse.json({ ok: true, paperId });
  } catch (err) {
    console.error("Submission error:", err);
    return NextResponse.json(
      { ok: false, error: "Something went wrong while submitting. Please try again." },
      { status: 500 }
    );
  }
}
