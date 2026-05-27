import "server-only";

import type { IconKey } from "@/lib/content/schema";
import { getHomePageGlobal, patchHomePageGlobal } from "@/lib/studio/home-page";

export type StudioTrustBadge = {
  icon: IconKey;
  label: string;
};

export async function getStudioTrustBadges() {
  const home = await getHomePageGlobal(0);
  return {
    badges: (home.trustBadges ?? []).map((b) => ({
      icon: b.icon as IconKey,
      label: b.label,
    })),
    updatedAt: home.updatedAt ?? null,
  };
}

export async function saveStudioTrustBadges(badges: StudioTrustBadge[]) {
  if (badges.length < 1) {
    throw new Error("At least one trust badge is required.");
  }
  await patchHomePageGlobal({ trustBadges: badges });
  return getStudioTrustBadges();
}
