import type { GlobalConfig } from "payload";

export const IndustriesPage: GlobalConfig = {
  slug: "industries-page",
  label: "Industries Page",
  access: { read: () => true },
  fields: [
    { name: "title", type: "text", required: true },
    { name: "intro", type: "textarea", required: true },
  ],
};
