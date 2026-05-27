"use client";

import { useEffect, useState } from "react";
import type { StudioControlCentrePage } from "@/lib/studio/control-centre-page";
import { IconItemsEditor, type IconListItem } from "@/components/studio/IconItemsEditor";
import { StudioField, StudioSaveButton, StudioStatusMessage, StudioTextArea } from "@/components/studio/studio-ui";
import { studioPut, useStudioFetch } from "@/components/studio/useStudioFetch";

type Payload = { page: StudioControlCentrePage };

export function ControlCentrePageEditor() {
  const { data, setData, status, setStatus, loading } = useStudioFetch<Payload>(
    "/api/studio/pages/control-centre",
    "/studio/pages/control-centre",
  );
  const [page, setPage] = useState<StudioControlCentrePage | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (data?.page) setPage(data.page);
  }, [data]);

  async function save() {
    if (!page) return;
    setSaving(true);
    const result = await studioPut<Payload>("/api/studio/pages/control-centre", { page });
    setSaving(false);
    if (!result.ok) {
      setStatus(result.error);
      return;
    }
    setData(result.data);
    setPage(result.data.page);
    setStatus("Saved — Control Centre page updated.");
  }

  if (loading || !page) {
    return <p className="text-sm text-slate-600">{loading ? "Loading…" : status || "Could not load."}</p>;
  }

  const features: IconListItem[] = (page.features ?? []).map((f) => ({
    title: f.title,
    body: f.body,
    icon: f.icon,
  }));

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <h3 className="font-display font-bold text-slate-900">Hero</h3>
        <div className="mt-4 space-y-4">
          <StudioField label="Title" value={page.heroTitle} onChange={(heroTitle) => setPage({ ...page, heroTitle })} />
          <StudioTextArea label="Intro" value={page.heroIntro} onChange={(heroIntro) => setPage({ ...page, heroIntro })} />
        </div>
      </div>

      <IconItemsEditor
        title="Features"
        countLabel="features"
        description="Capability cards on the Control Centre page."
        items={features}
        onChange={(items) =>
          setPage({
            ...page,
            features: items.map((item) => ({ title: item.title, body: item.body, icon: item.icon })),
          })
        }
        addLabel="+ Add feature"
      />

      <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <h3 className="font-display font-bold text-slate-900">CTA</h3>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <StudioField label="CTA label" value={page.ctaLabel} onChange={(ctaLabel) => setPage({ ...page, ctaLabel })} />
          <StudioField label="CTA link" value={page.ctaHref} onChange={(ctaHref) => setPage({ ...page, ctaHref })} />
        </div>
      </div>

      <StudioStatusMessage status={status} />
      <StudioSaveButton saving={saving} onClick={() => void save()} />
    </div>
  );
}
