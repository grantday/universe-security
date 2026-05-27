import type { GlobalConfig } from "payload";

export const SolutionsPage: GlobalConfig = {
  slug: "solutions-page",
  label: "Solutions Page",
  access: { read: () => true },
  fields: [
    { name: "title", type: "text", required: true },
    { name: "intro", type: "textarea", required: true },
    { name: "footerHeading", type: "text", required: true },
    { name: "footerIntro", type: "textarea", required: true },
    { name: "footerCtaLabel", type: "text", required: true },
    { name: "footerCtaHref", type: "text", required: true },
  ],
};
