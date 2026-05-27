import type { CollectionConfig } from "payload";

import { iconKeyOptions } from "../lib/payload/constants";

export const ValueProps: CollectionConfig = {
  slug: "value-props",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "featured", "order", "updatedAt"],
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
      name: "featured",
      type: "checkbox",
      defaultValue: false,
      admin: { description: "Renders as the large card when true." },
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
