import { defineField, defineType } from "sanity";

export const service = defineType({
  name: "service",
  title: "Service",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "category",
      type: "string",
      options: {
        list: [
          { title: "Home", value: "home" },
          { title: "Business", value: "business" },
          { title: "Industrial", value: "industrial" },
          { title: "Specialised", value: "specialised" },
        ],
      },
      validation: (r) => r.required(),
    }),
    defineField({ name: "shortDescription", type: "text", validation: (r) => r.required() }),
    defineField({ name: "image", type: "image", options: { hotspot: true } }),
    defineField({
      name: "features",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({ name: "order", type: "number", initialValue: 0 }),
    defineField({ name: "published", type: "boolean", initialValue: true }),
  ],
  orderings: [{ title: "Order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] }],
  preview: {
    select: { title: "title", subtitle: "category", media: "image" },
  },
});
