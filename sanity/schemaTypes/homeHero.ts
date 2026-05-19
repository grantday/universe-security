import { defineArrayMember, defineField, defineType } from "sanity";

export const homeHero = defineType({
  name: "homeHero",
  title: "Home hero",
  type: "document",
  fields: [
    defineField({ name: "eyebrow", type: "string", validation: (r) => r.required() }),
    defineField({ name: "headline", type: "text", validation: (r) => r.required() }),
    defineField({ name: "subheadline", type: "text", validation: (r) => r.required() }),
    defineField({ name: "primaryCta", type: "cta", validation: (r) => r.required() }),
    defineField({ name: "secondaryCta", type: "cta", validation: (r) => r.required() }),
    defineField({
      name: "slides",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "image", type: "image", options: { hotspot: true }, validation: (r) => r.required() }),
            defineField({ name: "caption", type: "string" }),
            defineField({ name: "alt", type: "string", validation: (r) => r.required() }),
          ],
          preview: {
            select: { title: "caption", media: "image" },
          },
        }),
      ],
    }),
    defineField({
      name: "trustBadges",
      type: "array",
      of: [{ type: "string" }],
    }),
  ],
  preview: {
    prepare: () => ({ title: "Home hero" }),
  },
});
