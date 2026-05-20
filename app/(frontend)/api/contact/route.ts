import { NextResponse } from "next/server";
import { Resend } from "resend";
import { contactSchema } from "@/lib/validations";
import { getClientIp, rateLimit } from "@/lib/rate-limit";

export async function POST(request: Request) {
  const ip = getClientIp(request.headers);
  const limited = rateLimit(`contact:${ip}`);
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

  const parsed = contactSchema.safeParse({
    name: b.name,
    phone: b.phone,
    email: b.email,
    service: b.service,
    message: b.message,
  });

  if (!parsed.success) {
    return NextResponse.json({ error: "Please check the form fields and try again." }, { status: 400 });
  }

  const { name, phone, email, service, message } = parsed.data;
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;

  if (!apiKey || !to) {
    console.warn("[contact] Missing RESEND_API_KEY or CONTACT_TO_EMAIL");
    return NextResponse.json(
      { error: "Email is not configured. Set RESEND_API_KEY and CONTACT_TO_EMAIL." },
      { status: 503 }
    );
  }

  const resend = new Resend(apiKey);
  const from = process.env.RESEND_FROM ?? "Universe Security <onboarding@resend.dev>";
  const { error } = await resend.emails.send({
    from,
    to: [to],
    replyTo: email,
    subject: `Website enquiry — ${service}`,
    text: `Name: ${name}\nPhone: ${phone}\nEmail: ${email}\nService: ${service}\n\n${message}`,
  });

  if (error) {
    console.error("[contact] Resend error", error);
    return NextResponse.json({ error: "Failed to send message" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
