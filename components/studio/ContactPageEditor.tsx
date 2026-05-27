"use client";

import { useEffect, useState } from "react";
import type { StudioContactPage } from "@/lib/studio/contact-page";
import { StudioField, StudioSaveButton, StudioStatusMessage, StudioTextArea } from "@/components/studio/studio-ui";
import { studioPut, useStudioFetch } from "@/components/studio/useStudioFetch";

type Payload = { page: StudioContactPage };

export function ContactPageEditor() {
  const { data, setData, status, setStatus, loading } = useStudioFetch<Payload>(
    "/api/studio/pages/contact",
    "/studio/pages/contact",
  );
  const [page, setPage] = useState<StudioContactPage | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (data?.page) setPage(data.page);
  }, [data]);

  function patch(p: Partial<StudioContactPage>) {
    if (!page) return;
    setPage({ ...page, ...p });
  }

  async function save() {
    if (!page) return;
    setSaving(true);
    const result = await studioPut<Payload>("/api/studio/pages/contact", { page });
    setSaving(false);
    if (!result.ok) {
      setStatus(result.error);
      return;
    }
    setData(result.data);
    setPage(result.data.page);
    setStatus("Saved — Contact page updated.");
  }

  if (loading || !page) {
    return <p className="text-sm text-slate-600">{loading ? "Loading…" : status || "Could not load."}</p>;
  }

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <h3 className="font-display font-bold text-slate-900">Page header</h3>
        <div className="mt-4 space-y-4">
          <StudioField label="Title" value={page.title} onChange={(title) => patch({ title })} />
          <StudioTextArea label="Intro" value={page.intro} onChange={(intro) => patch({ intro })} />
        </div>
      </div>
      <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <h3 className="font-display font-bold text-slate-900">Contact form</h3>
        <div className="mt-4 space-y-4">
          <StudioField label="Form heading" value={page.formHeading} onChange={(formHeading) => patch({ formHeading })} />
          <StudioTextArea label="Form intro" value={page.formIntro} onChange={(formIntro) => patch({ formIntro })} />
        </div>
      </div>
      <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <h3 className="font-display font-bold text-slate-900">Emergency block</h3>
        <div className="mt-4 space-y-4">
          <StudioField
            label="Emergency heading"
            value={page.emergencyHeading}
            onChange={(emergencyHeading) => patch({ emergencyHeading })}
          />
          <StudioTextArea
            label="Emergency note"
            value={page.emergencyNote}
            onChange={(emergencyNote) => patch({ emergencyNote })}
          />
        </div>
      </div>
      <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <StudioField label="Office section heading" value={page.officeHeading} onChange={(officeHeading) => patch({ officeHeading })} />
        <p className="mt-2 text-xs text-slate-500">Address and hours come from Site settings.</p>
      </div>
      <StudioStatusMessage status={status} />
      <StudioSaveButton saving={saving} onClick={() => void save()} />
    </div>
  );
}
