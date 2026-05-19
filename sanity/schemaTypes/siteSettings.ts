import { defineField, defineType } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site settings",
  type: "document",
  fields: [
    defineField({ name: "companyName", type: "string", validation: (r) => r.required() }),
    defineField({ name: "tagline", type: "string", validation: (r) => r.required() }),
    defineField({ name: "phonePrimary", type: "string", validation: (r) => r.required() }),
    defineField({ name: "phoneEmergency", type: "string", validation: (r) => r.required() }),
    defineField({ name: "email", type: "string", validation: (r) => r.required() }),
    defineField({ name: "address", type: "text", validation: (r) => r.required() }),
    defineField({
      name: "logo",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "socialLinks",
      type: "array",
      of: [{ type: "socialLink" }],
    }),
  ],
  preview: {
    prepare: () => ({ title: "Site settings" }),
  },
});
