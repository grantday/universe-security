import type { CollectionConfig } from "payload";

import { iconKeyOptions } from "../lib/payload/constants";

export const Industries: CollectionConfig = {
  slug: "industries",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "order", "published", "updatedAt"],
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
      name: "blurb",
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
    },
  ],
};
