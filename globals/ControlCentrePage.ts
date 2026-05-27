import type { GlobalConfig } from "payload";

import { iconKeyOptions } from "../lib/payload/constants";

export const ControlCentrePage: GlobalConfig = {
  slug: "control-centre-page",
  label: "Control Centre Page",
  access: { read: () => true },
  fields: [
    { name: "heroTitle", type: "text", required: true },
    { name: "heroIntro", type: "textarea", required: true },
    {
      name: "features",
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
