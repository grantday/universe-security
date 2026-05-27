import type { CollectionConfig } from "payload";

import { iconKeyOptions } from "../lib/payload/constants";

export const ControlCentreSteps: CollectionConfig = {
  slug: "control-centre-steps",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "order", "updatedAt"],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
    },
    {
      name: "body",
      type: "textarea",
      required: true,
    },
    {
      name: "icon",
      type: "select",
      required: true,
      options: iconKeyOptions,
    },
    {
      name: "published",
      type: "checkbox",
      defaultValue: true,
    },
    {
      name: "order",
      type: "number",
      defaultValue: 0,
    },
  ],
};
