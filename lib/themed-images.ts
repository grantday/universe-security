export type ImageTheme =
  | "guards"
  | "cctv"
  | "controlRoom"
  | "dispatch"
  | "response"
  | "accessControl"
  | "industrial"
  | "residential"
  | "business"
  | "events"
  | "schools"
  | "government"
  | "logistics";

const keywords: Record<ImageTheme, string[]> = {
  guards: ["security", "guard", "uniform"],
  cctv: ["cctv", "security-camera", "surveillance"],
  controlRoom: ["control-room", "monitoring", "operations"],
  dispatch: ["radio", "dispatch", "operations"],
  response: ["patrol", "security-vehicle", "response"],
  accessControl: ["access-control", "door", "security"],
  industrial: ["industrial", "warehouse", "factory"],
  residential: ["home", "residential", "neighborhood"],
  business: ["office", "commercial", "building"],
  events: ["event", "crowd", "stadium"],
  schools: ["school", "campus", "education"],
  government: ["government", "office", "security"],
  logistics: ["logistics", "truck", "warehouse"],
};

export function themedOnlineImageUrl(theme: ImageTheme, seed: string) {
  const q = keywords[theme].join(",");
  // Picsum doesn't support keyword search, so we seed by theme+seed to make imagery consistent.
  // If you want keyword-based photos, we can switch to a provider like Unsplash Source with fixed URLs.
  return `https://picsum.photos/seed/${encodeURIComponent(`${theme}-${seed}`)}/1200/800`;
}

