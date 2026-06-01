import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site-config";

export const runtime = "nodejs";
export const alt = siteConfig.name;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 64,
          background: "linear-gradient(135deg, #0B2545 0%, #13315C 45%, #1E5BA8 100%)",
          color: "white",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div style={{ fontSize: 56, fontWeight: 700, lineHeight: 1.1 }}>{siteConfig.name}</div>
        <div style={{ marginTop: 20, fontSize: 28, opacity: 0.92, maxWidth: 900 }}>{siteConfig.tagline}</div>
        <div style={{ marginTop: 32, fontSize: 20, opacity: 0.85 }}>Zimbabwe · 24/7 Control Centre</div>
      </div>
    ),
    { ...size }
  );
}
