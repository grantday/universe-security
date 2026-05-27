import type { GlobalConfig } from "payload";

import { iconKeyOptions, imageThemeOptions } from "../lib/payload/constants";

export const HomePage: GlobalConfig = {
  slug: "home-page",
  label: "Home Page",
  access: {
    read: () => true,
  },
  fields: [
    {
      type: "tabs",
      tabs: [
        {
          label: "Hero",
          fields: [
            {
              name: "heroSlides",
              type: "array",
              minRows: 1,
              labels: { singular: "Slide", plural: "Slides" },
              fields: [
                { name: "id", type: "text", required: true },
                { name: "eyebrow", type: "text", required: true },
                { name: "title", type: "text", required: true },
                { name: "body", type: "textarea", required: true },
                {
                  name: "theme",
                  type: "select",
                  required: true,
                  options: imageThemeOptions,
                },
                { name: "seed", type: "text", required: true, admin: { description: "Stable id for image placeholder generation" } },
                {
                  name: "image",
                  type: "upload",
                  relationTo: "media",
                },
                {
                  name: "imageUrl",
                  type: "text",
                  admin: { description: "Optional image URL (used when no media upload is set)" },
                },
                {
                  name: "ctaPrimary",
                  type: "group",
                  fields: [
                    { name: "href", type: "text", required: true },
                    { name: "label", type: "text", required: true },
                  ],
                },
                {
                  name: "ctaSecondary",
                  type: "group",
                  fields: [
                    { name: "href", type: "text", required: true },
                    { name: "label", type: "text", required: true },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: "Trust strip",
          fields: [
            {
              name: "trustBadges",
              type: "array",
              minRows: 1,
              labels: { singular: "Badge", plural: "Badges" },
              fields: [
                {
                  name: "icon",
                  type: "select",
                  required: true,
                  options: iconKeyOptions,
                },
                { name: "label", type: "text", required: true },
              ],
            },
          ],
        },
        {
          label: "Sections",
          fields: [
            {
              type: "group",
              name: "coreServices",
              label: "Core services header",
              fields: [
                { name: "heading", type: "text", required: true },
                { name: "intro", type: "textarea", required: true },
              ],
            },
            {
              type: "group",
              name: "controlCentrePreview",
              label: "Control Centre preview",
              fields: [
                { name: "heading", type: "text", required: true },
                { name: "intro", type: "textarea", required: true },
                { name: "ctaHref", type: "text", required: true },
                { name: "ctaLabel", type: "text", required: true },
              ],
            },
            {
              type: "group",
              name: "whyChoose",
              label: "Why choose (header only — pillars use Value Props collection)",
              fields: [
                { name: "heading", type: "text", required: true },
                { name: "intro", type: "textarea", required: true },
              ],
            },
            {
              type: "group",
              name: "kpisSection",
              label: "KPI band header",
              fields: [
                { name: "heading", type: "text", required: true },
                { name: "intro", type: "textarea", required: true },
              ],
            },
            {
              type: "group",
              name: "testimonialsSection",
              label: "Testimonials header",
              fields: [
                { name: "heading", type: "text", required: true },
                { name: "intro", type: "textarea", required: true },
              ],
            },
            {
              type: "group",
              name: "contactCta",
              label: "Contact CTA",
              fields: [
                { name: "heading", type: "text", required: true },
                { name: "intro", type: "textarea", required: true },
                {
                  name: "primaryCta",
                  type: "group",
                  fields: [
                    { name: "href", type: "text", required: true },
                    { name: "label", type: "text", required: true },
                  ],
                },
                {
                  name: "secondaryCta",
                  type: "group",
                  fields: [
                    { name: "href", type: "text", required: true },
                    { name: "label", type: "text", required: true },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};
