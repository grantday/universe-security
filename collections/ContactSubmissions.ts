import type { CollectionConfig } from "payload";

export const ContactSubmissions: CollectionConfig = {
  slug: "contact-submissions",
  labels: { singular: "Contact submission", plural: "Contact submissions" },
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "email", "leadType", "service", "createdAt"],
  },
  access: {
    read: ({ req }) => Boolean(req.user),
    create: () => true,
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user),
  },
  fields: [
    {
      name: "leadType",
      type: "select",
      defaultValue: "contact",
      options: [
        { label: "Contact form", value: "contact" },
        { label: "Assessment wizard", value: "assessment" },
      ],
    },
    { name: "name", type: "text", required: true },
    { name: "phone", type: "text", required: true },
    { name: "email", type: "email", required: true },
    { name: "service", type: "text", required: true },
    { name: "message", type: "textarea", required: true },
    { name: "siteType", type: "text" },
    { name: "siteSize", type: "text" },
    { name: "urgency", type: "text" },
    { name: "servicesNeeded", type: "json" },
    { name: "sourceIp", type: "text" },
  ],
};
