import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

const TAGS = [
  "siteSettings",
  "homeHero",
  "service",
  "controlCentreStep",
  "valueProp",
  "metric",
  "testimonial",
  "insight",
  "author",
] as const;

export async function POST(request: Request) {
  const secret = request.headers.get("x-sanity-webhook-secret");
  if (!process.env.SANITY_REVALIDATE_SECRET || secret !== process.env.SANITY_REVALIDATE_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: { _type?: string } = {};
  try {
    body = await request.json();
  } catch {
    body = {};
  }

  if (body._type && TAGS.includes(body._type as (typeof TAGS)[number])) {
    revalidateTag(body._type);
  } else {
    TAGS.forEach((tag) => revalidateTag(tag));
  }

  return NextResponse.json({ revalidated: true, now: Date.now() });
}
