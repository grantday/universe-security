import type { GlobalConfig } from "payload";

export const SiteSettings: GlobalConfig = {
  slug: "site-settings",
  label: "Site Settings",
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
    },
    {
      name: "tagline",
      type: "text",
      required: true,
    },
    {
      name: "description",
      type: "textarea",
      required: true,
    },
    {
      type: "row",
      fields: [
        {
          name: "email",
          type: "email",
          required: true,
        },
        {
          name: "officeHours",
          type: "text",
          required: true,
        },
      ],
    },
    {
      type: "row",
      fields: [
        {
          name: "salesPhone",
          type: "text",
          required: true,
          admin: { description: "E.164 or raw digits for tel: links" },
        },
        {
          name: "salesPhoneDisplay",
          type: "text",
          required: true,
        },
      ],
    },
    {
      type: "row",
      fields: [
        {
          name: "emergencyPhone",
          type: "text",
          required: true,
        },
        {
          name: "emergencyPhoneDisplay",
          type: "text",
          required: true,
        },
      ],
    },
    {
      name: "addressFull",
      type: "textarea",
      required: true,
    },
    {
      type: "collapsible",
      label: "Branding",
      fields: [
        {
          name: "logo",
          type: "upload",
          relationTo: "media",
        },
        {
          name: "logoMarkText",
          type: "text",
          maxLength: 2,
          defaultValue: "U",
        },
      ],
    },
    {
      type: "collapsible",
      label: "Certifications & compliance",
      fields: [
        {
          name: "certificationsHeading",
          type: "text",
          defaultValue: "Licensed, insured, and audit-ready",
        },
        {
          name: "certifications",
          type: "array",
          labels: { singular: "Certification", plural: "Certifications" },
          fields: [
            { name: "title", type: "text", required: true },
            { name: "body", type: "textarea", required: true },
          ],
        },
      ],
    },
    {
      type: "collapsible",
      label: "SEO & social",
      fields: [
        {
          name: "seoTitle",
          type: "text",
          admin: {
            description: "Optional. Used as the default Open Graph / Twitter title when set.",
          },
        },
        {
          name: "seoDescription",
          type: "textarea",
          maxLength: 160,
          admin: {
            description: "Optional meta description (120–160 characters ideal). Falls back to site description.",
          },
        },
        {
          name: "ogImage",
          type: "upload",
          relationTo: "media",
          admin: {
            description: "Recommended 1200×630 for link previews (Facebook, LinkedIn, WhatsApp).",
          },
        },
        {
          name: "twitterHandle",
          type: "text",
          admin: {
            description: "Without @, e.g. UniverseSecurity",
          },
        },
        {
          name: "robotsNoIndex",
          type: "checkbox",
          defaultValue: false,
          admin: {
            description: "Discourage search engines from indexing the whole site (staging only).",
          },
        },
      ],
    },
  ],
};
