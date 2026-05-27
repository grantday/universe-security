import { NextResponse } from "next/server";
import { Resend } from "resend";
import { assessmentSchema, contactSchema } from "@/lib/validations";
import { rateLimit, getClientIp } from "@/lib/rate-limit";
import { getPayloadClient } from "@/lib/payload";

export async function POST(request: Request) {
  const ip = getClientIp(request.headers);
  const limited = rateLimit(`contact:${ip}`);
  if (!limited.ok) {
    return NextResponse.json(
      { error: `Too many requests. Try again in ${limited.retryAfter}s.` },
      { status: 429 },
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

  const isAssessment = b.leadType === "assessment";

  if (isAssessment) {
    const parsed = assessmentSchema.safeParse({
      siteType: b.siteType,
      siteSize: b.siteSize,
      services: b.services,
      urgency: b.urgency,
      name: b.name,
      phone: b.phone,
      email: b.email,
      notes: b.notes,
    });
    if (!parsed.success) {
      return NextResponse.json({ error: "Please check the assessment form and try again." }, { status: 400 });
    }
    const { name, phone, email, siteType, siteSize, services, urgency, notes } = parsed.data;
    const service = `Assessment: ${siteType} / ${siteSize}`;
    const message = [
      `Lead type: Security assessment wizard`,
      `Site type: ${siteType}`,
      `Site size: ${siteSize}`,
      `Urgency: ${urgency}`,
      `Services: ${services.join(", ")}`,
      notes?.trim() ? `Notes: ${notes.trim()}` : "",
    ]
      .filter(Boolean)
      .join("\n");

    if (process.env.PAYLOAD_SECRET) {
      try {
        const payload = await getPayloadClient();
        await payload.create({
          collection: "contact-submissions",
          data: {
            leadType: "assessment",
            name,
            phone,
            email,
            service,
            message,
            siteType,
            siteSize,
            urgency,
            servicesNeeded: services,
            sourceIp: ip,
          },
        });
      } catch (err) {
        console.warn("[contact] Failed to save assessment to Payload", err);
      }
    }

    const apiKey = process.env.RESEND_API_KEY;
    const to = process.env.CONTACT_TO_EMAIL;
    if (!apiKey || !to) {
      console.warn("[contact] Missing RESEND_API_KEY or CONTACT_TO_EMAIL");
      return NextResponse.json(
        { error: "Email is not configured. Set RESEND_API_KEY and CONTACT_TO_EMAIL." },
        { status: 503 },
      );
    }
    const resend = new Resend(apiKey);
    const from = process.env.RESEND_FROM ?? "Universe Security <onboarding@resend.dev>";
    const { error } = await resend.emails.send({
      from,
      to: [to],
      replyTo: email,
      subject: `Security assessment — ${siteType} (${urgency})`,
      text: `${message}\n\nContact: ${name} · ${phone} · ${email}`,
    });
    if (error) {
      console.error("[contact] Resend error", error);
      return NextResponse.json({ error: "Failed to send message" }, { status: 502 });
    }
    return NextResponse.json({ ok: true });
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

  if (process.env.PAYLOAD_SECRET) {
    try {
      const payload = await getPayloadClient();
      await payload.create({
        collection: "contact-submissions",
        data: { leadType: "contact", name, phone, email, service, message, sourceIp: ip },
      });
    } catch (err) {
      console.warn("[contact] Failed to save submission to Payload", err);
    }
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;

  if (!apiKey || !to) {
    console.warn("[contact] Missing RESEND_API_KEY or CONTACT_TO_EMAIL");
    return NextResponse.json(
      { error: "Email is not configured. Set RESEND_API_KEY and CONTACT_TO_EMAIL." },
      { status: 503 },
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
