"use client";

import type { Dispatch, SetStateAction } from "react";
import type { HeroSlide, IconKey, ImageTheme, SiteContent } from "@/lib/content/schema";
import { Field, SectionCard, StringListEditor, TextArea } from "@/components/admin/fields";

const IMAGE_THEMES: ImageTheme[] = [
  "guards",
  "cctv",
  "controlRoom",
  "dispatch",
  "response",
  "accessControl",
  "industrial",
  "residential",
  "business",
  "events",
  "schools",
  "government",
  "logistics",
];

const ICON_KEYS: IconKey[] = [
  "clock",
  "radio",
  "shieldCheck",
  "mapPin",
  "users",
  "cpu",
  "shield",
  "headphones",
  "zap",
  "barChart3",
  "building2",
  "shoppingBag",
  "landmark",
  "hardHat",
  "truck",
  "school",
  "warehouse",
  "partyPopper",
  "activity",
  "shieldAlert",
  "scrollText",
  "camera",
  "mapPinned",
  "smartphone",
  "fileWarning",
  "lock",
  "keyRound",
  "clipboardList",
  "scale",
  "target",
  "heartHandshake",
  "lightbulb",
  "home",
  "factory",
  "check",
];

type Props = {
  tab: string;
  content: SiteContent;
  setContent: Dispatch<SetStateAction<SiteContent | null>>;
  onUploadLogo: (file: File) => void;
};

export function AdminPanelBody({ tab, content, setContent, onUploadLogo }: Props) {
  function patch(partial: Partial<SiteContent>) {
    setContent({ ...content, ...partial });
  }

  function updateSlide(index: number, slidePatch: Partial<HeroSlide>) {
    patch({
      heroSlides: content.heroSlides.map((s, i) => (i === index ? { ...s, ...slidePatch } : s)),
    });
  }

  if (tab === "Branding & site") {
    return (
      <>
        <SectionCard title="Branding">
          <p className="text-sm text-slate-600">Logo appears in the header when uploaded.</p>
          {content.branding.logoUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={content.branding.logoUrl} alt="Logo preview" className="mt-4 h-12 w-auto object-contain" />
          ) : null}
          <input
            type="file"
            accept="image/*"
            className="mt-4 block text-sm"
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) onUploadLogo(f);
            }}
          />
          <Field
            label="Logo mark text"
            value={content.branding.logoMarkText}
            onChange={(v) => patch({ branding: { ...content.branding, logoMarkText: v } })}
          />
        </SectionCard>
        <SectionCard title="Site details">
          <Field label="Company name" value={content.site.name} onChange={(v) => patch({ site: { ...content.site, name: v } })} />
          <Field label="Tagline" value={content.site.tagline} onChange={(v) => patch({ site: { ...content.site, tagline: v } })} />
          <TextArea
            label="Description"
            value={content.site.description}
            onChange={(v) => patch({ site: { ...content.site, description: v } })}
          />
          <Field label="Email" value={content.site.email} onChange={(v) => patch({ site: { ...content.site, email: v } })} />
          <Field
            label="Sales phone (display)"
            value={content.site.salesPhoneDisplay}
            onChange={(v) => patch({ site: { ...content.site, salesPhoneDisplay: v } })}
          />
          <Field
            label="Emergency phone (display)"
            value={content.site.emergencyPhoneDisplay}
            onChange={(v) => patch({ site: { ...content.site, emergencyPhoneDisplay: v } })}
          />
          <Field label="Address" value={content.site.addressFull} onChange={(v) => patch({ site: { ...content.site, addressFull: v } })} />
          <Field label="Office hours" value={content.site.officeHours} onChange={(v) => patch({ site: { ...content.site, officeHours: v } })} />
        </SectionCard>
      </>
    );
  }

  if (tab === "Hero slides") {
    return (
      <SectionCard title="Hero slides">
        {content.heroSlides.map((slide, i) => (
          <div key={slide.id} className="mb-8 rounded-xl border border-slate-100 p-4">
            <p className="mb-3 text-sm font-bold text-brand-900">Slide {i + 1}</p>
            <Field label="ID" value={slide.id} onChange={(v) => updateSlide(i, { id: v })} />
            <Field label="Eyebrow" value={slide.eyebrow} onChange={(v) => updateSlide(i, { eyebrow: v })} />
            <Field label="Title" value={slide.title} onChange={(v) => updateSlide(i, { title: v })} />
            <TextArea label="Body" value={slide.body} onChange={(v) => updateSlide(i, { body: v })} rows={2} />
            <label className="mt-2 block text-sm font-semibold text-slate-700">
              Theme
              <select
                className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 font-normal"
                value={slide.theme}
                onChange={(e) => updateSlide(i, { theme: e.target.value as ImageTheme })}
              >
                {IMAGE_THEMES.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </label>
            <Field label="Image URL" value={slide.imageUrl ?? ""} onChange={(v) => updateSlide(i, { imageUrl: v })} />
            <Field
              label="Primary CTA label"
              value={slide.ctaPrimary.label}
              onChange={(v) => updateSlide(i, { ctaPrimary: { ...slide.ctaPrimary, label: v } })}
            />
            <Field
              label="Primary CTA href"
              value={slide.ctaPrimary.href}
              onChange={(v) => updateSlide(i, { ctaPrimary: { ...slide.ctaPrimary, href: v } })}
            />
            <Field
              label="Secondary CTA label"
              value={slide.ctaSecondary.label}
              onChange={(v) => updateSlide(i, { ctaSecondary: { ...slide.ctaSecondary, label: v } })}
            />
            <Field
              label="Secondary CTA href"
              value={slide.ctaSecondary.href}
              onChange={(v) => updateSlide(i, { ctaSecondary: { ...slide.ctaSecondary, href: v } })}
            />
            {content.heroSlides.length > 1 ? (
              <button
                type="button"
                className="mt-2 text-sm text-red-600"
                onClick={() =>
                  patch({ heroSlides: content.heroSlides.filter((_, j) => j !== i) })
                }
              >
                Remove slide
              </button>
            ) : null}
          </div>
        ))}
        <button
          type="button"
          className="text-sm font-semibold text-brand-700"
          onClick={() => {
            const n = content.heroSlides.length + 1;
            const slide: HeroSlide = {
              id: `slide-${n}`,
              eyebrow: "New slide",
              title: "Headline",
              body: "Description",
              theme: "guards",
              seed: `slide-${n}`,
              imageUrl: "",
              ctaPrimary: { href: "/contact", label: "Contact us" },
              ctaSecondary: { href: "/solutions", label: "Solutions" },
            };
            patch({ heroSlides: [...content.heroSlides, slide] });
          }}
        >
          + Add slide
        </button>
      </SectionCard>
    );
  }

  if (tab === "Services") {
    return (
      <SectionCard title="Service cards (homepage slider)">
        {content.services.map((svc, i) => (
          <div key={svc.title + i} className="mb-6 rounded-xl border border-slate-100 p-4">
            <Field
              label="Title"
              value={svc.title}
              onChange={(v) => {
                const services = [...content.services];
                services[i] = { ...svc, title: v };
                patch({ services });
              }}
            />
            <TextArea
              label="Description"
              value={svc.description}
              onChange={(v) => {
                const services = [...content.services];
                services[i] = { ...svc, description: v };
                patch({ services });
              }}
              rows={2}
            />
            <label className="mt-2 block text-sm font-semibold text-slate-700">
              Theme
              <select
                className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 font-normal"
                value={svc.theme}
                onChange={(e) => {
                  const services = [...content.services];
                  services[i] = { ...svc, theme: e.target.value as ImageTheme };
                  patch({ services });
                }}
              >
                {IMAGE_THEMES.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </label>
            <StringListEditor
              label="Bullet items"
              items={svc.items}
              onChange={(items) => {
                const services = [...content.services];
                services[i] = { ...svc, items };
                patch({ services });
              }}
            />
          </div>
        ))}
      </SectionCard>
    );
  }

  if (tab === "KPIs & testimonials") {
    return (
      <>
        <SectionCard title="KPIs">
          {content.kpis.map((kpi, i) => (
            <div key={kpi.label + i} className="mb-4 rounded-lg border border-slate-100 p-3">
              <Field
                label="Label"
                value={kpi.label}
                onChange={(v) => {
                  const kpis = [...content.kpis];
                  kpis[i] = { ...kpi, label: v };
                  patch({ kpis });
                }}
              />
              <Field
                label="Value"
                value={kpi.value}
                onChange={(v) => {
                  const kpis = [...content.kpis];
                  kpis[i] = { ...kpi, value: v };
                  patch({ kpis });
                }}
              />
              <Field
                label="Prefix"
                value={kpi.prefix ?? ""}
                onChange={(v) => {
                  const kpis = [...content.kpis];
                  kpis[i] = { ...kpi, prefix: v || undefined };
                  patch({ kpis });
                }}
              />
              <Field
                label="Suffix"
                value={kpi.suffix ?? ""}
                onChange={(v) => {
                  const kpis = [...content.kpis];
                  kpis[i] = { ...kpi, suffix: v || undefined };
                  patch({ kpis });
                }}
              />
            </div>
          ))}
        </SectionCard>
        <SectionCard title="Testimonials">
          {content.testimonials.map((t, i) => (
            <div key={i} className="mb-4 rounded-lg border border-slate-100 p-3">
              <TextArea
                label="Quote"
                value={t.quote}
                onChange={(v) => {
                  const testimonials = [...content.testimonials];
                  testimonials[i] = { ...t, quote: v };
                  patch({ testimonials });
                }}
              />
              <Field
                label="Author"
                value={t.author}
                onChange={(v) => {
                  const testimonials = [...content.testimonials];
                  testimonials[i] = { ...t, author: v };
                  patch({ testimonials });
                }}
              />
              <Field
                label="Organisation"
                value={t.org}
                onChange={(v) => {
                  const testimonials = [...content.testimonials];
                  testimonials[i] = { ...t, org: v };
                  patch({ testimonials });
                }}
              />
            </div>
          ))}
        </SectionCard>
      </>
    );
  }

  if (tab === "Home sections") {
    const home = content.home;
    return (
      <>
        <SectionCard title="Trust strip badges">
          {home.trustBadges.map((b, i) => (
            <div key={i} className="mb-3 rounded-lg border border-slate-100 p-3">
              <label className="block text-sm font-semibold text-slate-700">
                Icon
                <select
                  className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 font-normal"
                  value={b.icon}
                  onChange={(e) => {
                    const trustBadges = [...home.trustBadges];
                    trustBadges[i] = { ...b, icon: e.target.value as IconKey };
                    patch({ home: { ...home, trustBadges } });
                  }}
                >
                  {ICON_KEYS.map((k) => (
                    <option key={k} value={k}>
                      {k}
                    </option>
                  ))}
                </select>
              </label>
              <Field
                label="Label"
                value={b.label}
                onChange={(v) => {
                  const trustBadges = [...home.trustBadges];
                  trustBadges[i] = { ...b, label: v };
                  patch({ home: { ...home, trustBadges } });
                }}
              />
            </div>
          ))}
        </SectionCard>
        <SectionCard title="Core services header">
          <Field
            label="Heading"
            value={home.coreServices.heading}
            onChange={(v) => patch({ home: { ...home, coreServices: { ...home.coreServices, heading: v } } })}
          />
          <TextArea
            label="Intro"
            value={home.coreServices.intro}
            onChange={(v) => patch({ home: { ...home, coreServices: { ...home.coreServices, intro: v } } })}
          />
        </SectionCard>
        <SectionCard title="Control centre preview">
          <Field
            label="Heading"
            value={home.controlCentrePreview.heading}
            onChange={(v) =>
              patch({ home: { ...home, controlCentrePreview: { ...home.controlCentrePreview, heading: v } } })
            }
          />
          <TextArea
            label="Intro"
            value={home.controlCentrePreview.intro}
            onChange={(v) =>
              patch({ home: { ...home, controlCentrePreview: { ...home.controlCentrePreview, intro: v } } })
            }
          />
          <Field
            label="CTA label"
            value={home.controlCentrePreview.ctaLabel}
            onChange={(v) =>
              patch({ home: { ...home, controlCentrePreview: { ...home.controlCentrePreview, ctaLabel: v } } })
            }
          />
          <Field
            label="CTA href"
            value={home.controlCentrePreview.ctaHref}
            onChange={(v) =>
              patch({ home: { ...home, controlCentrePreview: { ...home.controlCentrePreview, ctaHref: v } } })
            }
          />
        </SectionCard>
        <SectionCard title="Why choose + contact CTA">
          <Field
            label="Why choose heading"
            value={home.whyChoose.heading}
            onChange={(v) => patch({ home: { ...home, whyChoose: { ...home.whyChoose, heading: v } } })}
          />
          <TextArea
            label="Why choose intro"
            value={home.whyChoose.intro}
            onChange={(v) => patch({ home: { ...home, whyChoose: { ...home.whyChoose, intro: v } } })}
          />
          {home.whyChoose.pillars.map((p, i) => (
            <div key={i} className="mt-4 rounded-lg border border-slate-100 p-3">
              <Field
                label={`Pillar ${i + 1} title`}
                value={p.title}
                onChange={(v) => {
                  const pillars = [...home.whyChoose.pillars];
                  pillars[i] = { ...p, title: v };
                  patch({ home: { ...home, whyChoose: { ...home.whyChoose, pillars } } });
                }}
              />
              <TextArea
                label="Body"
                value={p.body}
                onChange={(v) => {
                  const pillars = [...home.whyChoose.pillars];
                  pillars[i] = { ...p, body: v };
                  patch({ home: { ...home, whyChoose: { ...home.whyChoose, pillars } } });
                }}
                rows={2}
              />
            </div>
          ))}
          <Field
            label="Contact CTA heading"
            value={home.contactCta.heading}
            onChange={(v) => patch({ home: { ...home, contactCta: { ...home.contactCta, heading: v } } })}
          />
          <TextArea
            label="Contact CTA intro"
            value={home.contactCta.intro}
            onChange={(v) => patch({ home: { ...home, contactCta: { ...home.contactCta, intro: v } } })}
          />
        </SectionCard>
      </>
    );
  }

  if (tab === "Pages") {
    const { pages } = content;
    return (
      <>
        <SectionCard title="Solutions page">
          <Field
            label="Title"
            value={pages.solutions.title}
            onChange={(v) => patch({ pages: { ...pages, solutions: { ...pages.solutions, title: v } } })}
          />
          <TextArea
            label="Intro"
            value={pages.solutions.intro}
            onChange={(v) => patch({ pages: { ...pages, solutions: { ...pages.solutions, intro: v } } })}
          />
          {pages.solutions.sections.map((sec, i) => (
            <div key={sec.id} className="mt-4 rounded-lg border border-slate-100 p-3">
              <Field
                label="Section title"
                value={sec.title}
                onChange={(v) => {
                  const sections = [...pages.solutions.sections];
                  sections[i] = { ...sec, title: v };
                  patch({ pages: { ...pages, solutions: { ...pages.solutions, sections } } });
                }}
              />
              <TextArea
                label="Lead"
                value={sec.lead}
                onChange={(v) => {
                  const sections = [...pages.solutions.sections];
                  sections[i] = { ...sec, lead: v };
                  patch({ pages: { ...pages, solutions: { ...pages.solutions, sections } } });
                }}
                rows={2}
              />
              <StringListEditor
                label="Items"
                items={sec.items}
                onChange={(items) => {
                  const sections = [...pages.solutions.sections];
                  sections[i] = { ...sec, items };
                  patch({ pages: { ...pages, solutions: { ...pages.solutions, sections } } });
                }}
              />
            </div>
          ))}
        </SectionCard>
        <SectionCard title="Industries page">
          <Field
            label="Title"
            value={pages.industries.title}
            onChange={(v) => patch({ pages: { ...pages, industries: { ...pages.industries, title: v } } })}
          />
          <TextArea
            label="Intro"
            value={pages.industries.intro}
            onChange={(v) => patch({ pages: { ...pages, industries: { ...pages.industries, intro: v } } })}
          />
          {pages.industries.items.map((item, i) => (
            <div key={item.title} className="mt-3 rounded-lg border border-slate-100 p-3">
              <Field
                label="Title"
                value={item.title}
                onChange={(v) => {
                  const items = [...pages.industries.items];
                  items[i] = { ...item, title: v };
                  patch({ pages: { ...pages, industries: { ...pages.industries, items } } });
                }}
              />
              <TextArea
                label="Blurb"
                value={item.blurb}
                onChange={(v) => {
                  const items = [...pages.industries.items];
                  items[i] = { ...item, blurb: v };
                  patch({ pages: { ...pages, industries: { ...pages.industries, items } } });
                }}
                rows={2}
              />
            </div>
          ))}
        </SectionCard>
        <SectionCard title="Contact page copy">
          <Field
            label="Title"
            value={pages.contact.title}
            onChange={(v) => patch({ pages: { ...pages, contact: { ...pages.contact, title: v } } })}
          />
          <TextArea
            label="Intro"
            value={pages.contact.intro}
            onChange={(v) => patch({ pages: { ...pages, contact: { ...pages.contact, intro: v } } })}
          />
          <Field
            label="Form heading"
            value={pages.contact.formHeading}
            onChange={(v) => patch({ pages: { ...pages, contact: { ...pages.contact, formHeading: v } } })}
          />
          <Field
            label="Emergency heading"
            value={pages.contact.emergencyHeading}
            onChange={(v) => patch({ pages: { ...pages, contact: { ...pages.contact, emergencyHeading: v } } })}
          />
        </SectionCard>
      </>
    );
  }

  return null;
}
