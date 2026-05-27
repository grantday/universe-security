"use client";

import { useEffect, useState } from "react";
import type { StudioSolutionsPage } from "@/lib/studio/solutions-page";
import {
  StudioField,
  StudioSaveButton,
  StudioStatusMessage,
  StudioTextArea,
} from "@/components/studio/studio-ui";
import { studioPut, useStudioFetch } from "@/components/studio/useStudioFetch";

type Payload = { page: StudioSolutionsPage };

export function SolutionsPageEditor() {
  const { data, setData, status, setStatus, loading } = useStudioFetch<Payload>(
    "/api/studio/pages/solutions",
    "/studio/pages/solutions",
  );
  const [page, setPage] = useState<StudioSolutionsPage | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (data?.page) setPage(data.page);
  }, [data]);

  function patch(p: Partial<StudioSolutionsPage>) {
    if (!page) return;
    setPage({ ...page, ...p });
  }

  async function save() {
    if (!page) return;
    setSaving(true);
    setStatus("");
    const result = await studioPut<Payload>("/api/studio/pages/solutions", { page });
    setSaving(false);
    if (!result.ok) {
      setStatus(result.error);
      return;
    }
    setData(result.data);
    setPage(result.data.page);
    setStatus("Saved — Solutions page updated.");
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
        <h3 className="font-display font-bold text-slate-900">Footer CTA block</h3>
        <div className="mt-4 space-y-4">
          <StudioField label="Heading" value={page.footerHeading} onChange={(footerHeading) => patch({ footerHeading })} />
          <StudioTextArea label="Intro" value={page.footerIntro} onChange={(footerIntro) => patch({ footerIntro })} />
          <div className="grid gap-4 sm:grid-cols-2">
            <StudioField label="CTA label" value={page.footerCtaLabel} onChange={(footerCtaLabel) => patch({ footerCtaLabel })} />
            <StudioField label="CTA link" value={page.footerCtaHref} onChange={(footerCtaHref) => patch({ footerCtaHref })} />
          </div>
        </div>
      </div>

      <StudioStatusMessage status={status} />
      <StudioSaveButton saving={saving} onClick={() => void save()} />
    </div>
  );
}
