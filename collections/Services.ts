import type { CollectionConfig } from "payload";

import { imageThemeOptions } from "../lib/payload/constants";

export const Services: CollectionConfig = {
  slug: "services",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "published", "order", "updatedAt"],
    listSearchableFields: ["title", "description"],
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
      name: "slug",
      type: "text",
      required: true,
      unique: true,
      admin: { description: 'URL-safe identifier, e.g. "business-security"' },
    },
    {
      name: "category",
      type: "select",
      required: true,
      options: [
        { label: "Home Security", value: "home" },
        { label: "Business Security", value: "business" },
        { label: "Industrial Security", value: "industrial" },
        { label: "Specialised Services", value: "specialised" },
      ],
    },
    {
      name: "description",
      type: "textarea",
      required: true,
    },
    {
      name: "theme",
      type: "select",
      required: true,
      options: imageThemeOptions,
    },
    {
      name: "items",
      type: "array",
      minRows: 1,
      labels: { singular: "Bullet", plural: "Bullets" },
      fields: [{ name: "text", type: "text", required: true }],
    },
    {
      name: "image",
      type: "upload",
      relationTo: "media",
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
      admin: { description: "Lower numbers appear first." },
    },
  ],
};
