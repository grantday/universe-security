import { defineField, defineType } from "sanity";

export const testimonial = defineType({
  name: "testimonial",
  title: "Testimonial",
  type: "document",
  fields: [
    defineField({ name: "quote", type: "text", validation: (r) => r.required() }),
    defineField({ name: "authorRole", type: "string", validation: (r) => r.required() }),
    defineField({ name: "authorOrg", type: "string", validation: (r) => r.required() }),
    defineField({ name: "location", type: "string" }),
    defineField({ name: "published", type: "boolean", initialValue: true }),
  ],
  preview: {
    select: { title: "authorRole", subtitle: "authorOrg" },
  },
});
