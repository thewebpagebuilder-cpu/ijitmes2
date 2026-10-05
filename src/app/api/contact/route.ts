import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { contacts } from "@/db/schema";

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as Record<string, unknown>;

    const name = String(body.name ?? "").trim().slice(0, 160);
    const email = String(body.email ?? "").trim().toLowerCase().slice(0, 200);
    const mobile = String(body.mobile ?? "").trim().slice(0, 40);
    const subject = String(body.subject ?? "").trim().slice(0, 240);
    const message = String(body.message ?? "").trim().slice(0, 4000);

    if (!name || !subject || !message) {
      return NextResponse.json(
        { ok: false, error: "Name, subject and message are required." },
        { status: 400 }
      );
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { ok: false, error: "Please provide a valid email address." },
        { status: 400 }
      );
    }
    if (message.length < 10) {
      return NextResponse.json(
        { ok: false, error: "Your message is too short." },
        { status: 400 }
      );
    }

    await db.insert(contacts).values({ name, email, mobile, subject, message });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Contact error:", err);
    return NextResponse.json(
      { ok: false, error: "Unable to send your message right now." },
      { status: 500 }
    );
  }
}
