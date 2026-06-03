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

const THEME_FILES: Record<ImageTheme, string> = {
  guards: "guards.jpg",
  cctv: "cctv.jpg",
  controlRoom: "control-room.jpg",
  dispatch: "dispatch.jpg",
  response: "response.jpg",
  accessControl: "access-control.jpg",
  industrial: "industrial.jpg",
  residential: "residential.jpg",
  business: "business.jpg",
  events: "events.jpg",
  schools: "schools.jpg",
  government: "government.jpg",
  logistics: "logistics.jpg",
};

/** Curated security-themed photos (Pexels, stored under /public/images). */
export function themedLocalImagePath(theme: ImageTheme): string {
  return `/images/${THEME_FILES[theme]}`;
}

export function themedLocalImageUrl(theme: ImageTheme): string {
  if (process.env.DEPLOY_TARGET === "godaddy-shared") {
    return `https://picsum.photos/seed/universe-${theme}/1200/800`;
  }
  return themedLocalImagePath(theme);
}

/** @deprecated Use themedLocalImageUrl — kept for credits / legacy references. */
export function themedOnlineImageUrl(theme: ImageTheme, seed: string) {
  void seed;
  return themedLocalImageUrl(theme);
}

const INDUSTRY_THEME: Record<string, ImageTheme> = {
  Residential: "residential",
  Retail: "business",
  Banking: "accessControl",
  Construction: "industrial",
  Logistics: "logistics",
  Schools: "schools",
  Industrial: "industrial",
  Government: "government",
  Events: "events",
};

export function industryImageTheme(title: string): ImageTheme {
  return INDUSTRY_THEME[title] ?? "business";
}
