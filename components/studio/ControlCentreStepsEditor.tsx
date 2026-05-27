"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { iconKeyOptions } from "@/lib/payload/constants";
import type { IconKey } from "@/lib/content/schema";
import type { StudioFlowStep } from "@/lib/studio/control-centre-steps";
import { StudioItemCardGrid } from "@/components/studio/StudioItemCardGrid";
import {
  StudioField,
  StudioListHeader,
  StudioSaveButton,
  StudioStatusMessage,
  StudioTextArea,
} from "@/components/studio/studio-ui";
import { studioPut, useStudioFetch } from "@/components/studio/useStudioFetch";

type Payload = { steps: StudioFlowStep[] };

export function ControlCentreStepsEditor() {
  const { data, setData, status, setStatus, loading } = useStudioFetch<Payload>(
    "/api/studio/control-centre/steps",
    "/studio/control-centre/steps",
  );
  const [steps, setSteps] = useState<StudioFlowStep[] | null>(null);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [draft, setDraft] = useState<StudioFlowStep | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (data?.steps) setSteps(data.steps);
  }, [data]);

  const list = steps ?? [];

  function openNew() {
    const step: StudioFlowStep = {
      title: "New step",
      body: "What happens in this stage of the flow.",
      icon: "radio",
      order: list.length,
      published: true,
    };
    setEditIndex(list.length);
    setDraft(step);
    setSteps([...list, step]);
  }

  function openEdit(i: number) {
    setEditIndex(i);
    setDraft({ ...list[i]! });
  }

  function closeEdit() {
    if (editIndex !== null && editIndex === list.length - 1 && draft?.title === "New step") {
      setSteps(list.slice(0, -1));
    }
    setEditIndex(null);
    setDraft(null);
  }

  function applyDraft() {
    if (editIndex === null || !draft) return;
    const next = [...list];
    next[editIndex] = draft;
    setSteps(next);
    setEditIndex(null);
    setDraft(null);
  }

  function remove(i: number) {
    if (list.length <= 1) return;
    if (!confirm(`Remove step "${list[i]?.title}"?`)) return;
    setSteps(list.filter((_, j) => j !== i));
  }

  function moveItem(from: number, to: number) {
    if (to < 0 || to >= list.length) return;
    const next = [...list];
    const [removed] = next.splice(from, 1);
    next.splice(to, 0, removed!);
    setSteps(next);
    if (editIndex === from) setEditIndex(to);
    else if (editIndex === to) setEditIndex(from);
  }

  async function save() {
    if (!steps) return;
    setSaving(true);
    const result = await studioPut<Payload>("/api/studio/control-centre/steps", { steps });
    setSaving(false);
    if (!result.ok) {
      setStatus(result.error);
      return;
    }
    setData(result.data);
    setSteps(result.data.steps);
    setStatus("Saved — homepage & Control Centre flow steps updated.");
  }

  if (loading && !data) {
    return <p className="text-sm text-slate-600">Loading flow steps…</p>;
  }

  return (
    <div className="space-y-6">
      <StudioListHeader
        title="Incident flow (homepage & Control Centre)"
        count={list.length}
        countLabel="steps"
        description="Ordered steps in the dark flow diagram. Use arrows to reorder, then save."
        onAdd={openNew}
        addLabel="+ Add step"
      />

      <StudioItemCardGrid
        items={list}
        selectedIndex={editIndex}
        getKey={(step, i) => `${step.payloadId ?? "new"}-${i}`}
        renderTitle={(step) => step.title}
        renderSubtitle={(step) => step.body}
        renderBadge={(step) => (step.published ? step.icon : "Hidden")}
        onEdit={openEdit}
        onRemove={remove}
        onMoveUp={(i) => moveItem(i, i - 1)}
        onMoveDown={(i) => moveItem(i, i + 1)}
        minItems={1}
      />

      <StudioStatusMessage status={status} />
      <StudioSaveButton saving={saving} onClick={() => void save()} />

      {editIndex !== null && draft ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
            <div className="flex justify-between">
              <h2 className="font-display text-lg font-bold">Edit step {editIndex + 1}</h2>
              <button type="button" onClick={closeEdit} aria-label="Close">
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="mt-4 space-y-4">
              <StudioField label="Title" value={draft.title} onChange={(title) => setDraft({ ...draft, title })} />
              <StudioTextArea label="Body" value={draft.body} onChange={(body) => setDraft({ ...draft, body })} rows={3} />
              <label className="block text-sm font-semibold text-slate-700">
                Icon
                <select
                  className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 font-normal"
                  value={draft.icon}
                  onChange={(e) => setDraft({ ...draft, icon: e.target.value as IconKey })}
                >
                  {iconKeyOptions.map((o) => (
                    <option key={o.value} value={o.value}>
                      {o.label}
                    </option>
                  ))}
                </select>
              </label>
              <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                <input
                  type="checkbox"
                  checked={draft.published}
                  onChange={(e) => setDraft({ ...draft, published: e.target.checked })}
                  className="rounded border-slate-300"
                />
                Published (visible on site)
              </label>
            </div>
            <div className="mt-6 flex justify-end gap-2">
              <button type="button" onClick={closeEdit} className="rounded-lg border px-4 py-2 text-sm font-semibold">
                Cancel
              </button>
              <button
                type="button"
                onClick={applyDraft}
                className="rounded-lg bg-[#2f4050] px-4 py-2 text-sm font-semibold text-white hover:bg-slate-700"
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
