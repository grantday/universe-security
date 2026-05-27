"use client";

import { useEffect, useState } from "react";
import type { StudioMetric } from "@/lib/studio/collections/metrics";
import type { StudioKpisSection } from "@/lib/studio/response-metrics";
import { MetricsItemsPanel } from "@/components/studio/MetricsItemsPanel";
import {
  StudioField,
  StudioSaveButton,
  StudioStatusMessage,
  StudioTextArea,
} from "@/components/studio/studio-ui";
import { studioPut, useStudioFetch } from "@/components/studio/useStudioFetch";

const API = "/api/studio/home/response-metrics";

type Payload = {
  kpisSection: StudioKpisSection;
  items: StudioMetric[];
  updatedAt: string | null;
};

export function ResponseMetricsEditor() {
  const { data, setData, status, setStatus, loading } = useStudioFetch<Payload>(API, "/studio/home/response-metrics");
  const [kpisSection, setKpisSection] = useState<StudioKpisSection | null>(null);
  const [items, setItems] = useState<StudioMetric[] | null>(null);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [draft, setDraft] = useState<StudioMetric | null>(null);
  const [saving, setSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState("");

  useEffect(() => {
    if (!data) return;
    setKpisSection(data.kpisSection);
    setItems(data.items);
  }, [data]);

  const list = items ?? [];

  function move(list: StudioMetric[], from: number, to: number) {
    if (to < 0 || to >= list.length) return list;
    const next = [...list];
    const [row] = next.splice(from, 1);
    next.splice(to, 0, row!);
    return next;
  }

  function openNew() {
    const item: StudioMetric = {
      label: "New metric",
      value: "0",
      published: true,
      order: list.length,
    };
    setEditIndex(list.length);
    setDraft(item);
    setItems([...list, item]);
  }

  function openEdit(i: number) {
    setEditIndex(i);
    setDraft({ ...list[i]! });
  }

  function remove(i: number) {
    if (!confirm(`Remove "${list[i]?.label}"?`)) return;
    setItems(list.filter((_, j) => j !== i));
    if (editIndex === i) {
      setEditIndex(null);
      setDraft(null);
    }
  }

  function applyDraft() {
    if (editIndex === null || !draft) return;
    setItems(list.map((row, i) => (i === editIndex ? draft : row)));
    setEditIndex(null);
    setDraft(null);
  }

  async function save() {
    if (!kpisSection || !items) return;
    setSaving(true);
    setSaveStatus("");
    const result = await studioPut<Payload>(API, { kpisSection, items });
    setSaving(false);
    if (!result.ok) {
      setSaveStatus(result.error);
      return;
    }
    setData(result.data);
    setKpisSection(result.data.kpisSection);
    setItems(result.data.items);
    setSaveStatus("Saved — response metrics section updated.");
  }

  if (loading || !kpisSection || !items) {
    return (
      <p className="text-sm text-slate-600">
        {loading ? "Loading response metrics…" : status || saveStatus || "Could not load."}
      </p>
    );
  }

  return (
    <div className="space-y-8">
      <p className="text-sm text-slate-600">
        Edit the homepage <strong>Response metrics</strong> band: section heading and intro, plus the KPI numbers shown
        below.
      </p>

      <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <h3 className="font-display text-base font-bold text-slate-900">Section header</h3>
        <p className="mt-1 text-xs text-slate-500">Heading and intro above the metric cards on the homepage.</p>
        <div className="mt-4 space-y-4">
          <StudioField
            label="Heading"
            value={kpisSection.heading}
            onChange={(heading) => setKpisSection({ ...kpisSection, heading })}
          />
          <StudioTextArea
            label="Intro"
            value={kpisSection.intro}
            onChange={(intro) => setKpisSection({ ...kpisSection, intro })}
          />
        </div>
      </div>

      <MetricsItemsPanel
        list={list}
        editIndex={editIndex}
        draft={draft}
        onAdd={openNew}
        onEdit={openEdit}
        onRemove={remove}
        onMoveUp={(i) => setItems(move(list, i, i - 1))}
        onMoveDown={(i) => setItems(move(list, i, i + 1))}
        onCloseEdit={() => {
          setEditIndex(null);
          setDraft(null);
        }}
        onApplyDraft={applyDraft}
        onDraftChange={setDraft}
      />

      <StudioStatusMessage status={saveStatus || status} />
      <StudioSaveButton saving={saving} onClick={() => void save()} />
    </div>
  );
}
