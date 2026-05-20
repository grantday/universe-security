import { NextResponse } from "next/server";
import { z } from "zod";
import { adminSessionCookieOptions, signAdminSessionToken, verifyAdminPassword } from "@/lib/content/auth";

const bodySchema = z.object({ password: z.string().min(1) });

export async function POST(request: Request) {
  if (!process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: "Set ADMIN_PASSWORD in Vercel environment variables." }, { status: 503 });
  }

  const json = await request.json().catch(() => null);
  const parsed = bodySchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  if (!verifyAdminPassword(parsed.data.password)) {
    return NextResponse.json({ error: "Invalid password" }, { status: 401 });
  }

  const token = await signAdminSessionToken();
  const response = NextResponse.json({ ok: true });
  response.cookies.set("us_admin_session", token, adminSessionCookieOptions());
  return response;
}
