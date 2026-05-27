import type { CollectionConfig } from "payload";

export const Metrics: CollectionConfig = {
  slug: "metrics",
  admin: {
    useAsTitle: "label",
    defaultColumns: ["label", "value", "order", "updatedAt"],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "label",
      type: "text",
      required: true,
    },
    {
      name: "value",
      type: "text",
      required: true,
      admin: { description: "Display value, e.g. < 8 min or 42" },
    },
    {
      name: "suffix",
      type: "text",
    },
    {
      name: "prefix",
      type: "text",
    },
    {
      name: "note",
      type: "textarea",
    },
    {
      name: "numericValue",
      type: "number",
      admin: { description: "Optional number for count-up animations." },
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
