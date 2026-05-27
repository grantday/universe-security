import "server-only";

import type { ContactPage } from "@/payload-types";
import { getPayloadGlobal, patchPayloadGlobal } from "@/lib/studio/patch-global";

export type StudioContactPage = Pick<
  ContactPage,
  | "title"
  | "intro"
  | "formHeading"
  | "formIntro"
  | "emergencyHeading"
  | "emergencyNote"
  | "officeHeading"
>;

export async function getStudioContactPage() {
  const doc = await getPayloadGlobal("contact-page", 0);
  return {
    page: {
      title: doc.title,
      intro: doc.intro,
      formHeading: doc.formHeading,
      formIntro: doc.formIntro,
      emergencyHeading: doc.emergencyHeading,
      emergencyNote: doc.emergencyNote,
      officeHeading: doc.officeHeading,
    },
    updatedAt: doc.updatedAt ?? null,
  };
}

export async function saveStudioContactPage(page: StudioContactPage) {
  await patchPayloadGlobal("contact-page", page, ["/contact"]);
  return getStudioContactPage();
}
