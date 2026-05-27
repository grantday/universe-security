import { NextResponse } from "next/server";
import { runPayloadSeed } from "@/lib/payload/seed";

/** POST to re-seed Payload. Requires ?secret=ADMIN_PASSWORD in production. */
export async function POST(request: Request) {
  if (process.env.NODE_ENV === "production") {
    const { searchParams } = new URL(request.url);
    const secret = searchParams.get("secret");
    const adminPassword = process.env.ADMIN_PASSWORD || process.env.PAYLOAD_ADMIN_PASSWORD;
    if (!secret || secret !== adminPassword) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  }

  try {
    const result = await runPayloadSeed();
    return NextResponse.json(result);
  } catch (err) {
    console.error("[dev/seed]", err);
    const message = err instanceof Error ? err.message : "Seed failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
