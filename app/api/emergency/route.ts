import { NextResponse } from "next/server";
import { Resend } from "resend";
import { emergencySchema } from "@/lib/validations";
import { getClientIp, rateLimit } from "@/lib/rate-limit";

export async function POST(request: Request) {
  const ip = getClientIp(request.headers);
  const limited = rateLimit(`emergency:${ip}`);
  if (!limited.ok) {
    return NextResponse.json(
      { error: `Too many requests. Try again in ${limited.retryAfter}s.` },
      { status: 429 }
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  if (typeof body !== "object" || body === null) {
    return NextResponse.json({ error: "Invalid body" }, { status: 400 });
  }

  const b = body as Record<string, unknown>;
  if (typeof b.website === "string" && b.website.length > 0) {
    return NextResponse.json({ error: "Bad request" }, { status: 400 });
  }

  const num = (v: unknown) => {
    if (typeof v === "number" && Number.isFinite(v)) return v;
    if (typeof v === "string" && v.trim() !== "") {
      const n = Number(v);
      if (Number.isFinite(n)) return n;
    }
    return undefined;
  };

  const parsed = emergencySchema.safeParse({
    name: b.name,
    note: b.note,
    lat: num(b.lat),
    lng: num(b.lng),
  });

  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const { name, note, lat, lng } = parsed.data;
  const location =
    lat !== undefined && lng !== undefined ? `https://maps.google.com/?q=${lat},${lng}` : "Not provided";

  console.info("[emergency]", new Date().toISOString(), { ip, name, note, location });

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.EMERGENCY_TO_EMAIL;

  if (!apiKey || !to) {
    console.warn("[emergency] Missing RESEND_API_KEY or EMERGENCY_TO_EMAIL");
    return NextResponse.json(
      { error: "Alert channel not configured. Set RESEND_API_KEY and EMERGENCY_TO_EMAIL." },
      { status: 503 }
    );
  }

  const resend = new Resend(apiKey);
  const from = process.env.RESEND_FROM ?? "Universe Security Alerts <onboarding@resend.dev>";
  const { error } = await resend.emails.send({
    from,
    to: [to],
    subject: "[PRIORITY] Silent emergency alert",
    text: `Silent alert submitted via website.\nIP: ${ip}\nName: ${name ?? "(not provided)"}\nNote: ${note ?? "(none)"}\nLocation: ${location}\nTime: ${new Date().toISOString()}`,
  });

  if (error) {
    console.error("[emergency] Resend error", error);
    return NextResponse.json({ error: "Failed to send alert" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
