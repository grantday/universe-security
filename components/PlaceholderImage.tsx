import Image from "next/image";
import { themedLocalImageUrl, type ImageTheme } from "@/lib/themed-images";

function svgDataUri(svg: string) {
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

function makeSvg(seed: string, label: string) {
  const safe = seed.replace(/[^a-z0-9]/gi, "").slice(0, 12) || "US";
  const initials = safe.slice(0, 2).toUpperCase();
  return `
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="800" viewBox="0 0 1200 800">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#EAF2FB"/>
      <stop offset="0.45" stop-color="#D6E7F7"/>
      <stop offset="1" stop-color="#0B2545"/>
    </linearGradient>
    <radialGradient id="r" cx="75%" cy="25%" r="70%">
      <stop offset="0" stop-color="rgba(30,91,168,0.35)"/>
      <stop offset="1" stop-color="rgba(255,255,255,0)"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="800" fill="url(#g)"/>
  <rect width="1200" height="800" fill="url(#r)"/>
  <g opacity="0.14" fill="#0B2545">
    <circle cx="160" cy="180" r="120"/>
    <circle cx="1040" cy="620" r="180"/>
    <circle cx="980" cy="160" r="70"/>
  </g>
  <g>
    <rect x="70" y="620" width="1060" height="110" rx="28" fill="rgba(255,255,255,0.78)"/>
    <text x="110" y="685" font-family="system-ui, -apple-system, Segoe UI, Roboto, Arial" font-size="34" font-weight="700" fill="#0B2545">${label}</text>
    <text x="110" y="725" font-family="system-ui, -apple-system, Segoe UI, Roboto, Arial" font-size="18" font-weight="600" fill="rgba(11,37,69,0.72)">Universe Security</text>
    <rect x="980" y="646" width="120" height="58" rx="18" fill="#0B2545"/>
    <text x="1040" y="685" text-anchor="middle" font-family="system-ui, -apple-system, Segoe UI, Roboto, Arial" font-size="22" font-weight="800" fill="#ffffff">${initials}</text>
  </g>
</svg>`.trim();
}

type Props = {
  seed: string;
  label: string;
  mode?: "photo" | "svg";
  theme?: ImageTheme;
  className?: string;
  priority?: boolean;
};

export function PlaceholderImage({
  seed,
  label,
  mode = "photo",
  theme,
  className = "",
  priority = false,
}: Props) {
  const useSvg = mode === "svg";
  const src = useSvg
    ? svgDataUri(makeSvg(seed, label))
    : theme
      ? themedLocalImageUrl(theme)
      : svgDataUri(makeSvg(seed, label));

  return (
    <div className={`relative overflow-hidden rounded-2xl border border-slate-200/70 shadow-card ${className}`}>
      <Image
        src={src}
        alt={label}
        fill
        sizes="(max-width: 1024px) 100vw, 50vw"
        priority={priority}
        unoptimized={useSvg}
        style={{ objectFit: "cover" }}
      />
    </div>
  );
}
