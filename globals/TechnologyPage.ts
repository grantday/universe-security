import type { GlobalConfig } from "payload";

import { iconKeyOptions } from "../lib/payload/constants";

export const TechnologyPage: GlobalConfig = {
  slug: "technology-page",
  label: "Technology Page",
  access: { read: () => true },
  fields: [
    { name: "title", type: "text", required: true },
    { name: "intro", type: "textarea", required: true },
    {
      name: "stack",
      type: "array",
      minRows: 1,
      fields: [
        { name: "title", type: "text", required: true },
        { name: "body", type: "textarea", required: true },
        { name: "icon", type: "select", required: true, options: iconKeyOptions },
        { name: "badge", type: "text" },
      ],
    },
    { name: "dataSecurityHeading", type: "text", required: true },
    {
      name: "dataSecurity",
      type: "array",
      minRows: 1,
      fields: [
        { name: "title", type: "text", required: true },
        { name: "body", type: "textarea", required: true },
        { name: "icon", type: "select", required: true, options: iconKeyOptions },
      ],
    },
    { name: "ctaLabel", type: "text", required: true },
    { name: "ctaHref", type: "text", required: true },
  ],
};
