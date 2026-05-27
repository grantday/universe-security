import type { GlobalConfig } from "payload";

import { iconKeyOptions } from "../lib/payload/constants";

export const CompanyPage: GlobalConfig = {
  slug: "company-page",
  label: "Company Page",
  access: { read: () => true },
  fields: [
    { name: "title", type: "text", required: true },
    {
      name: "mission",
      type: "group",
      fields: [
        { name: "eyebrow", type: "text" },
        { name: "title", type: "text", required: true },
        { name: "body", type: "textarea", required: true },
      ],
    },
    {
      name: "vision",
      type: "group",
      fields: [
        { name: "eyebrow", type: "text" },
        { name: "title", type: "text", required: true },
        { name: "body", type: "textarea", required: true },
      ],
    },
    { name: "valuesHeading", type: "text", required: true },
    {
      name: "values",
      type: "array",
      minRows: 1,
      fields: [
        { name: "title", type: "text", required: true },
        { name: "body", type: "textarea", required: true },
        { name: "icon", type: "select", required: true, options: iconKeyOptions },
      ],
    },
    {
      name: "compliance",
      type: "group",
      fields: [
        { name: "title", type: "text", required: true },
        { name: "body", type: "textarea", required: true },
      ],
    },
  ],
};
