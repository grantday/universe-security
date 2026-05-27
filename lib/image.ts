import type { Media } from "@/payload-types";

const baseUrl =
  process.env.NEXT_PUBLIC_SERVER_URL ||
  process.env.NEXT_PUBLIC_SITE_URL ||
  "http://localhost:3000";

export function imageUrl(
  media: Media | number | null | undefined,
  size?: "thumbnail" | "card" | "hero",
): string {
  if (media == null || typeof media === "number") return "";
  const path =
    size && media.sizes?.[size]?.url
      ? media.sizes[size]?.url
      : media.url;
  if (!path) return "";
  if (path.startsWith("http")) return path;
  const prefix = baseUrl.replace(/\/$/, "");
  return `${prefix}${path.startsWith("/") ? path : `/${path}`}`;
}

export function imageAlt(media: Media | number | null | undefined): string {
  if (media == null || typeof media === "number") return "";
  return media.alt || "";
}
