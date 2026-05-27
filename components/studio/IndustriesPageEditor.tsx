"use client";

import { useEffect, useState } from "react";
import type { StudioIndustriesPage } from "@/lib/studio/industries-page";
import {
  StudioField,
  StudioSaveButton,
  StudioStatusMessage,
  StudioTextArea,
} from "@/components/studio/studio-ui";
import { studioPut, useStudioFetch } from "@/components/studio/useStudioFetch";

type Payload = { page: StudioIndustriesPage };

export function IndustriesPageEditor() {
  const { data, setData, status, setStatus, loading } = useStudioFetch<Payload>(
    "/api/studio/pages/industries",
    "/studio/pages/industries",
  );
  const [page, setPage] = useState<StudioIndustriesPage | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (data?.page) setPage(data.page);
  }, [data]);

  function patch(p: Partial<StudioIndustriesPage>) {
    if (!page) return;
    setPage({ ...page, ...p });
  }

  async function save() {
    if (!page) return;
    setSaving(true);
    setStatus("");
    const result = await studioPut<Payload>("/api/studio/pages/industries", { page });
    setSaving(false);
    if (!result.ok) {
      setStatus(result.error);
      return;
    }
    setData(result.data);
    setPage(result.data.page);
    setStatus("Saved — Industries page header updated.");
  }

  if (loading || !page) {
    return <p className="text-sm text-slate-600">{loading ? "Loading…" : status || "Could not load."}</p>;
  }

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <h3 className="font-display font-bold text-slate-900">Page header</h3>
        <p className="mt-1 text-sm text-slate-600">Title and intro above the industry cards on /industries.</p>
        <div className="mt-4 space-y-4">
          <StudioField label="Title" value={page.title} onChange={(title) => patch({ title })} />
          <StudioTextArea label="Intro" value={page.intro} onChange={(intro) => patch({ intro })} />
        </div>
      </div>
      <StudioStatusMessage status={status} />
      <StudioSaveButton saving={saving} onClick={save} />
    </div>
  );
}
