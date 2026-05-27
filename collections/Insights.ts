import type { CollectionConfig } from "payload";

export const Insights: CollectionConfig = {
  slug: "insights",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "published", "publishedAt", "updatedAt"],
    listSearchableFields: ["title", "slug"],
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
    },
    {
      name: "contentType",
      type: "select",
      defaultValue: "article",
      options: [
        { label: "Article", value: "article" },
        { label: "Case study", value: "case-study" },
      ],
      required: true,
    },
    {
      name: "excerpt",
      type: "textarea",
      required: true,
    },
    {
      name: "caseStudy",
      type: "group",
      admin: {
        condition: (_, siblingData) => siblingData?.contentType === "case-study",
      },
      fields: [
        { name: "problem", type: "textarea", required: true },
        { name: "approach", type: "textarea", required: true },
        {
          name: "metrics",
          type: "array",
          minRows: 1,
          labels: { singular: "Metric", plural: "Metrics" },
          fields: [
            { name: "label", type: "text", required: true },
            { name: "value", type: "text", required: true },
          ],
        },
      ],
    },
    {
      name: "content",
      type: "richText",
      required: true,
    },
    {
      name: "published",
      type: "checkbox",
      defaultValue: false,
    },
    {
      name: "publishedAt",
      type: "date",
      admin: {
        date: { pickerAppearance: "dayAndTime" },
      },
    },
    {
      name: "heroImage",
      type: "upload",
      relationTo: "media",
    },
  ],
};
