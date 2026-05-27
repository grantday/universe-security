const FALLBACK = "https://universe-security.example.com";

/**
 * Public site origin for metadata, JSON-LD, sitemap — safe when env is missing or invalid.
 * Invalid `NEXT_PUBLIC_SITE_URL` (e.g. missing `https://`) would otherwise break `new URL()` and cause 500s.
 */
export function getPublicSiteUrl(): string {
  const fromEnv =
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.NEXT_PUBLIC_SERVER_URL ||
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : null);

  const raw = fromEnv?.trim();
  if (!raw) return FALLBACK;

  try {
    if (/^https?:\/\//i.test(raw)) {
      return new URL(raw).toString().replace(/\/$/, "");
    }
    return new URL(`https://${raw}`).toString().replace(/\/$/, "");
  } catch {
    return FALLBACK;
  }
}

export function getMetadataBaseUrl(): URL {
  try {
    return new URL(getPublicSiteUrl());
  } catch {
    return new URL(FALLBACK);
  }
}

/** Canonical URL for an insight article. */
export function insightArticlePath(slug: string): string {
  const clean = slug.trim().replace(/^\/+|\/+$/g, "");
  return `/insights/${encodeURIComponent(clean)}`;
}

export function insightArticleUrl(baseUrl: string, slug: string): string {
  return `${baseUrl.replace(/\/$/, "")}${insightArticlePath(slug)}`;
}

/**
 * Prefer the current request host (correct when sharing from localhost or production).
 * Falls back to env-based URL when headers are unavailable (build/ISR).
 */
export async function getRequestSiteUrl(): Promise<string> {
  try {
    const { headers } = await import("next/headers");
    const h = await headers();
    const host = h.get("x-forwarded-host")?.split(",")[0]?.trim() ?? h.get("host")?.trim();
    if (!host) return getPublicSiteUrl();

    const forwardedProto = h.get("x-forwarded-proto")?.split(",")[0]?.trim();
    const proto =
      forwardedProto ??
      (host.startsWith("localhost") || host.startsWith("127.0.0.1") ? "http" : "https");
    return `${proto}://${host}`.replace(/\/$/, "");
  } catch {
    return getPublicSiteUrl();
  }
}
