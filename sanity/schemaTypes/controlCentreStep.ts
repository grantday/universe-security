import { defineField, defineType } from "sanity";

export const controlCentreStep = defineType({
  name: "controlCentreStep",
  title: "Control centre step",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "description", type: "text", validation: (r) => r.required() }),
    defineField({ name: "icon", type: "string", description: "Lucide icon name", validation: (r) => r.required() }),
    defineField({ name: "order", type: "number", initialValue: 0 }),
  ],
  orderings: [{ title: "Order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] }],
  preview: {
    select: { title: "title", subtitle: "icon" },
  },
});
