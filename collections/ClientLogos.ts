import type { CollectionConfig } from "payload";

export const ClientLogos: CollectionConfig = {
  slug: "client-logos",
  labels: { singular: "Client logo", plural: "Client logos" },
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "published", "order"],
  },
  access: {
    read: () => true,
  },
  fields: [
    { name: "name", type: "text", required: true },
    {
      name: "logo",
      type: "upload",
      relationTo: "media",
      admin: { description: "Optional logo image. Name displays as text if omitted." },
    },
    { name: "published", type: "checkbox", defaultValue: true },
    { name: "order", type: "number", defaultValue: 0, admin: { position: "sidebar" } },
  ],
};
