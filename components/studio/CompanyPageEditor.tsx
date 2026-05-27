"use client";

import { useEffect, useState } from "react";
import type { StudioCompanyPage } from "@/lib/studio/company-page";
import { IconItemsEditor, type IconListItem } from "@/components/studio/IconItemsEditor";
import { StudioField, StudioSaveButton, StudioStatusMessage, StudioTextArea } from "@/components/studio/studio-ui";
import { studioPut, useStudioFetch } from "@/components/studio/useStudioFetch";

type Payload = { page: StudioCompanyPage };

function StoryBlock({
  label,
  value,
  onChange,
}: {
  label: string;
  value: StudioCompanyPage["mission"];
  onChange: (v: StudioCompanyPage["mission"]) => void;
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <h3 className="font-display font-bold text-slate-900">{label}</h3>
      <div className="mt-4 space-y-4">
        <StudioField label="Eyebrow" value={value.eyebrow ?? ""} onChange={(eyebrow) => onChange({ ...value, eyebrow })} />
        <StudioField label="Title" value={value.title} onChange={(title) => onChange({ ...value, title })} />
        <StudioTextArea label="Body" value={value.body} onChange={(body) => onChange({ ...value, body })} />
      </div>
    </div>
  );
}

export function CompanyPageEditor() {
  const { data, setData, status, setStatus, loading } = useStudioFetch<Payload>(
    "/api/studio/pages/company",
    "/studio/pages/company",
  );
  const [page, setPage] = useState<StudioCompanyPage | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (data?.page) setPage(data.page);
  }, [data]);

  async function save() {
    if (!page) return;
    setSaving(true);
    const result = await studioPut<Payload>("/api/studio/pages/company", { page });
    setSaving(false);
    if (!result.ok) {
      setStatus(result.error);
      return;
    }
    setData(result.data);
    setPage(result.data.page);
    setStatus("Saved — Company page updated.");
  }

  if (loading || !page) {
    return <p className="text-sm text-slate-600">{loading ? "Loading…" : status || "Could not load."}</p>;
  }

  const values: IconListItem[] = (page.values ?? []).map((v) => ({
    title: v.title,
    body: v.body,
    icon: v.icon,
  }));

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <StudioField label="Page title" value={page.title} onChange={(title) => setPage({ ...page, title })} />
      </div>
      <StoryBlock label="Mission" value={page.mission} onChange={(mission) => setPage({ ...page, mission })} />
      <StoryBlock label="Vision" value={page.vision} onChange={(vision) => setPage({ ...page, vision })} />
      <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <StudioField
          label="Values section heading"
          value={page.valuesHeading}
          onChange={(valuesHeading) => setPage({ ...page, valuesHeading })}
        />
      </div>
      <IconItemsEditor
        title="Company values"
        countLabel="values"
        description="Shown in the values grid on the Company page."
        items={values}
        onChange={(items) =>
          setPage({
            ...page,
            values: items.map((item) => ({ title: item.title, body: item.body, icon: item.icon })),
          })
        }
        addLabel="+ Add value"
      />
      <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <h3 className="font-display font-bold text-slate-900">Compliance</h3>
        <div className="mt-4 space-y-4">
          <StudioField
            label="Title"
            value={page.compliance.title}
            onChange={(title) => setPage({ ...page, compliance: { ...page.compliance, title } })}
          />
          <StudioTextArea
            label="Body"
            value={page.compliance.body}
            onChange={(body) => setPage({ ...page, compliance: { ...page.compliance, body } })}
          />
        </div>
      </div>
      <StudioStatusMessage status={status} />
      <StudioSaveButton saving={saving} onClick={() => void save()} />
    </div>
  );
}
