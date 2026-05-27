import { NextResponse } from "next/server";
import { runPayloadSeed } from "@/lib/payload/seed";

/** Dev-only: POST to re-seed Payload from content/site-content.json */
export async function POST() {
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json({ error: "Not available in production" }, { status: 404 });
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
