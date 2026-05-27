import type { GlobalConfig } from "payload";

export const ContactPage: GlobalConfig = {
  slug: "contact-page",
  label: "Contact Page",
  access: { read: () => true },
  fields: [
    { name: "title", type: "text", required: true },
    { name: "intro", type: "textarea", required: true },
    { name: "formHeading", type: "text", required: true },
    { name: "formIntro", type: "textarea", required: true },
    { name: "emergencyHeading", type: "text", required: true },
    { name: "emergencyNote", type: "textarea", required: true },
    { name: "officeHeading", type: "text", required: true },
  ],
};
