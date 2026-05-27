"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { iconKeyOptions } from "@/lib/payload/constants";
import type { IconKey } from "@/lib/content/schema";
import type { StudioTrustBadge } from "@/lib/studio/trust-badges";
import { StudioItemCardGrid } from "@/components/studio/StudioItemCardGrid";
import {
  StudioField,
  StudioListHeader,
  StudioSaveButton,
  StudioStatusMessage,
} from "@/components/studio/studio-ui";
import { studioPut, useStudioFetch } from "@/components/studio/useStudioFetch";

type Payload = { badges: StudioTrustBadge[] };

export function TrustBadgesEditor() {
  const { data, setData, status, setStatus, loading } = useStudioFetch<Payload>(
    "/api/studio/home/trust-badges",
    "/studio/home/trust-badges",
  );
  const [badges, setBadges] = useState<StudioTrustBadge[] | null>(null);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [draft, setDraft] = useState<StudioTrustBadge | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (data?.badges) setBadges(data.badges);
  }, [data]);

  const list = badges ?? [];

  function openNew() {
    const badge: StudioTrustBadge = { icon: "shieldCheck", label: "New badge" };
    setEditIndex(list.length);
    setDraft(badge);
    setBadges([...list, badge]);
  }

  function openEdit(i: number) {
    setEditIndex(i);
    setDraft({ ...list[i]! });
  }

  function closeEdit() {
    if (editIndex !== null && editIndex === list.length - 1 && draft?.label === "New badge") {
      setBadges(list.slice(0, -1));
    }
    setEditIndex(null);
    setDraft(null);
  }

  function applyDraft() {
    if (editIndex === null || !draft) return;
    const next = [...list];
    next[editIndex] = draft;
    setBadges(next);
    setEditIndex(null);
    setDraft(null);
  }

  function remove(i: number) {
    if (list.length <= 1) return;
    if (!confirm(`Remove "${list[i]?.label}"?`)) return;
    setBadges(list.filter((_, j) => j !== i));
  }

  function moveItem(from: number, to: number) {
    if (to < 0 || to >= list.length) return;
    const next = [...list];
    const [removed] = next.splice(from, 1);
    next.splice(to, 0, removed!);
    setBadges(next);
    if (editIndex === from) setEditIndex(to);
    else if (editIndex === to) setEditIndex(from);
  }

  async function save() {
    const toSave = badges ?? list;
    setSaving(true);
    setStatus("");
    const result = await studioPut<Payload>("/api/studio/home/trust-badges", { badges: toSave });
    setSaving(false);
    if (!result.ok) {
      setStatus(result.error);
      return;
    }
    setData(result.data);
    setBadges(result.data.badges);
    setStatus("Saved — trust strip updated on homepage.");
  }

  if (loading && !data) {
    return <p className="text-sm text-slate-600">Loading trust badges…</p>;
  }

  return (
    <div className="space-y-6">
      <StudioListHeader
        title="Homepage trust strip"
        count={list.length}
        countLabel="badges"
        description="Icons and labels shown below the hero."
        onAdd={openNew}
        addLabel="+ Add badge"
      />

      <StudioItemCardGrid
        items={list}
        selectedIndex={editIndex}
        getKey={(badge, i) => `${badge.label}-${i}`}
        renderTitle={(badge) => badge.label}
        renderBadge={(badge) => badge.icon}
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
              <h2 className="font-display text-lg font-bold">Edit badge {editIndex + 1}</h2>
              <button type="button" onClick={closeEdit} aria-label="Close">
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="mt-4 space-y-4">
              <StudioField label="Label" value={draft.label} onChange={(v) => setDraft({ ...draft, label: v })} />
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
