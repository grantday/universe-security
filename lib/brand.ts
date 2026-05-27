/** Original Photoroom wordmark — dark ink on transparent (use on light backgrounds). */
export const DEFAULT_LOGO_PATH = "/brand/universe-security-logo.png";
/** Same artwork, inverted to light ink (use on dark backgrounds). */
export const DEFAULT_LOGO_LIGHT_PATH = "/brand/universe-security-logo-light.png";
export const DEFAULT_LOGO_MARK_PATH = "/brand/universe-security-mark.svg";

/** Invert custom dark uploads on dark surfaces when no light asset exists. */
export const LOGO_ON_DARK_IMAGE_CLASS = "brightness-0 invert";
/** Wordmark / mark ink on light backgrounds */
export const LOGO_INK_CLASS = "text-brand-900";

export function resolveLogoUrl(logoUrl?: string | null, onDark = false): string {
  const trimmed = logoUrl?.trim();
  if (!trimmed || trimmed === DEFAULT_LOGO_PATH || trimmed === DEFAULT_LOGO_LIGHT_PATH) {
    return onDark ? DEFAULT_LOGO_LIGHT_PATH : DEFAULT_LOGO_PATH;
  }
  if (trimmed === "/brand/universe-security-logo.svg") {
    return onDark ? DEFAULT_LOGO_LIGHT_PATH : DEFAULT_LOGO_PATH;
  }
  return trimmed;
}

export function isDefaultLogo(logoUrl?: string | null): boolean {
  const trimmed = logoUrl?.trim();
  return (
    !trimmed ||
    trimmed === DEFAULT_LOGO_PATH ||
    trimmed === DEFAULT_LOGO_LIGHT_PATH ||
    trimmed === "/brand/universe-security-logo.svg" ||
    trimmed === "/brand/universe-security-logo.png"
  );
}
