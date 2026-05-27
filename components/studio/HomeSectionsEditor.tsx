"use client";

import { useEffect, useState } from "react";
import type { StudioHomeSections } from "@/lib/studio/home-sections";
import {
  StudioField,
  StudioSaveButton,
  StudioStatusMessage,
  StudioTextArea,
} from "@/components/studio/studio-ui";
import { studioPut, useStudioFetch } from "@/components/studio/useStudioFetch";

type Payload = { sections: StudioHomeSections };

const SECTION_META: { key: keyof StudioHomeSections; title: string; note?: string }[] = [
  { key: "coreServices", title: "Core services", note: "Service cards come from the Services collection." },
  { key: "controlCentrePreview", title: "Control Centre preview" },
  { key: "whyChoose", title: "Why choose us", note: "Pillars come from Value Props collection." },
  { key: "testimonialsSection", title: "Testimonials", note: "Quotes come from Testimonials collection." },
  { key: "contactCta", title: "Contact CTA" },
];

export function HomeSectionsEditor() {
  const { data, setData, status, setStatus, loading } = useStudioFetch<Payload>(
    "/api/studio/home/sections",
    "/studio/home/sections",
  );
  const [sections, setSections] = useState<StudioHomeSections | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (data?.sections) setSections(data.sections);
  }, [data]);

  async function save() {
    if (!sections) return;
    setSaving(true);
    setStatus("");
    const result = await studioPut<Payload>("/api/studio/home/sections", { sections });
    setSaving(false);
    if (!result.ok) {
      setStatus(result.error);
      return;
    }
    setData(result.data);
    setSections(result.data.sections);
    setStatus("Saved — homepage section copy updated.");
  }

  if (loading || !sections) {
    return <p className="text-sm text-slate-600">{loading ? "Loading sections…" : status || "Could not load."}</p>;
  }

  return (
    <div className="space-y-6">
      <p className="text-sm text-slate-600">
        Edit headings and intro text for homepage blocks. Response metrics (heading + numbers) live under{" "}
        <a href="/studio/home/response-metrics" className="font-semibold text-[#2f4050] underline">
          Home → Response metrics
        </a>
        . Other linked lists are under Collections.
      </p>

      {SECTION_META.map(({ key, title, note }) => (
        <SectionCard key={key} title={title} note={note}>
          {key === "controlCentrePreview" ? (
            <ControlCentreFields
              value={sections.controlCentrePreview}
              onChange={(v) => setSections({ ...sections, controlCentrePreview: v })}
            />
          ) : key === "contactCta" ? (
            <ContactCtaFields value={sections.contactCta} onChange={(v) => setSections({ ...sections, contactCta: v })} />
          ) : (
            <HeaderFields
              value={sections[key] as { heading: string; intro: string }}
              onChange={(v) => setSections({ ...sections, [key]: v })}
            />
          )}
        </SectionCard>
      ))}

      <StudioStatusMessage status={status} />
      <StudioSaveButton saving={saving} onClick={() => void save()} />
    </div>
  );
}

function SectionCard({ title, note, children }: { title: string; note?: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <h3 className="font-display text-base font-bold text-slate-900">{title}</h3>
      {note ? <p className="mt-1 text-xs text-slate-500">{note}</p> : null}
      <div className="mt-4 space-y-4">{children}</div>
    </div>
  );
}

function HeaderFields({
  value,
  onChange,
}: {
  value: { heading: string; intro: string };
  onChange: (v: { heading: string; intro: string }) => void;
}) {
  return (
    <>
      <StudioField label="Heading" value={value.heading} onChange={(heading) => onChange({ ...value, heading })} />
      <StudioTextArea label="Intro" value={value.intro} onChange={(intro) => onChange({ ...value, intro })} />
    </>
  );
}

function ControlCentreFields({
  value,
  onChange,
}: {
  value: StudioHomeSections["controlCentrePreview"];
  onChange: (v: StudioHomeSections["controlCentrePreview"]) => void;
}) {
  return (
    <>
      <HeaderFields value={value} onChange={(h) => onChange({ ...value, ...h })} />
      <div className="grid gap-4 sm:grid-cols-2">
        <StudioField label="CTA label" value={value.ctaLabel} onChange={(ctaLabel) => onChange({ ...value, ctaLabel })} />
        <StudioField label="CTA link" value={value.ctaHref} onChange={(ctaHref) => onChange({ ...value, ctaHref })} />
      </div>
    </>
  );
}

function ContactCtaFields({
  value,
  onChange,
}: {
  value: StudioHomeSections["contactCta"];
  onChange: (v: StudioHomeSections["contactCta"]) => void;
}) {
  return (
    <>
      <HeaderFields value={value} onChange={(h) => onChange({ ...value, ...h })} />
      <div className="grid gap-4 sm:grid-cols-2">
        <StudioField
          label="Primary CTA label"
          value={value.primaryCta.label}
          onChange={(label) => onChange({ ...value, primaryCta: { ...value.primaryCta, label } })}
        />
        <StudioField
          label="Primary CTA link"
          value={value.primaryCta.href}
          onChange={(href) => onChange({ ...value, primaryCta: { ...value.primaryCta, href } })}
        />
        <StudioField
          label="Secondary CTA label"
          value={value.secondaryCta.label}
          onChange={(label) => onChange({ ...value, secondaryCta: { ...value.secondaryCta, label } })}
        />
        <StudioField
          label="Secondary CTA link"
          value={value.secondaryCta.href}
          onChange={(href) => onChange({ ...value, secondaryCta: { ...value.secondaryCta, href } })}
        />
      </div>
    </>
  );
}
