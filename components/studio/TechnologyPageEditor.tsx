"use client";

import { useEffect, useState } from "react";
import type { StudioTechnologyPage } from "@/lib/studio/technology-page";
import { IconItemsEditor, type IconListItem } from "@/components/studio/IconItemsEditor";
import { StudioField, StudioSaveButton, StudioStatusMessage, StudioTextArea } from "@/components/studio/studio-ui";
import { studioPut, useStudioFetch } from "@/components/studio/useStudioFetch";

type Payload = { page: StudioTechnologyPage };

export function TechnologyPageEditor() {
  const { data, setData, status, setStatus, loading } = useStudioFetch<Payload>(
    "/api/studio/pages/technology",
    "/studio/pages/technology",
  );
  const [page, setPage] = useState<StudioTechnologyPage | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (data?.page) setPage(data.page);
  }, [data]);

  async function save() {
    if (!page) return;
    setSaving(true);
    const result = await studioPut<Payload>("/api/studio/pages/technology", { page });
    setSaving(false);
    if (!result.ok) {
      setStatus(result.error);
      return;
    }
    setData(result.data);
    setPage(result.data.page);
    setStatus("Saved — Technology page updated.");
  }

  if (loading || !page) {
    return <p className="text-sm text-slate-600">{loading ? "Loading…" : status || "Could not load."}</p>;
  }

  const stack: IconListItem[] = (page.stack ?? []).map((s) => ({
    title: s.title,
    body: s.body,
    icon: s.icon,
    badge: s.badge ?? undefined,
  }));

  const dataSecurity: IconListItem[] = (page.dataSecurity ?? []).map((s) => ({
    title: s.title,
    body: s.body,
    icon: s.icon,
  }));

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <StudioField label="Page title" value={page.title} onChange={(title) => setPage({ ...page, title })} />
        <div className="mt-4">
          <StudioTextArea label="Intro" value={page.intro} onChange={(intro) => setPage({ ...page, intro })} />
        </div>
      </div>

      <IconItemsEditor
        title="Technology stack"
        countLabel="items"
        description="Platform capabilities listed on the Technology page."
        items={stack}
        showBadge
        onChange={(items) =>
          setPage({
            ...page,
            stack: items.map((item) => ({
              title: item.title,
              body: item.body,
              icon: item.icon,
              badge: item.badge || undefined,
            })),
          })
        }
        addLabel="+ Add stack item"
      />

      <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <StudioField
          label="Data security heading"
          value={page.dataSecurityHeading}
          onChange={(dataSecurityHeading) => setPage({ ...page, dataSecurityHeading })}
        />
      </div>

      <IconItemsEditor
        title="Data security"
        countLabel="items"
        description="Security and compliance highlights."
        items={dataSecurity}
        onChange={(items) =>
          setPage({
            ...page,
            dataSecurity: items.map((item) => ({ title: item.title, body: item.body, icon: item.icon })),
          })
        }
        addLabel="+ Add item"
      />

      <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <h3 className="font-display font-bold text-slate-900">Footer CTA</h3>
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
