"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { iconKeyOptions } from "@/lib/payload/constants";
import type { IconKey } from "@/lib/content/schema";
import { StudioItemCardGrid } from "@/components/studio/StudioItemCardGrid";
import { StudioField, StudioListHeader, StudioTextArea } from "@/components/studio/studio-ui";

export type IconListItem = {
  title: string;
  body: string;
  icon: IconKey;
  badge?: string;
};

export function IconItemsEditor({
  title,
  countLabel,
  description,
  items,
  onChange,
  addLabel,
  showBadge,
  minItems = 1,
}: {
  title: string;
  countLabel: string;
  description: string;
  items: IconListItem[];
  onChange: (items: IconListItem[]) => void;
  addLabel: string;
  showBadge?: boolean;
  minItems?: number;
}) {
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [draft, setDraft] = useState<IconListItem | null>(null);

  function openNew() {
    const item: IconListItem = { title: "New item", body: "Description", icon: "shieldCheck" };
    setEditIndex(items.length);
    setDraft(item);
    onChange([...items, item]);
  }

  function openEdit(i: number) {
    setEditIndex(i);
    setDraft({ ...items[i]! });
  }

  function closeEdit() {
    if (editIndex !== null && editIndex === items.length - 1 && draft?.title === "New item") {
      onChange(items.slice(0, -1));
    }
    setEditIndex(null);
    setDraft(null);
  }

  function applyDraft() {
    if (editIndex === null || !draft) return;
    const next = [...items];
    next[editIndex] = draft;
    onChange(next);
    setEditIndex(null);
    setDraft(null);
  }

  function remove(i: number) {
    if (items.length <= minItems) return;
    if (!confirm(`Remove "${items[i]?.title}"?`)) return;
    onChange(items.filter((_, j) => j !== i));
  }

  function moveItem(from: number, to: number) {
    if (to < 0 || to >= items.length) return;
    const next = [...items];
    const [removed] = next.splice(from, 1);
    next.splice(to, 0, removed!);
    onChange(next);
    if (editIndex === from) setEditIndex(to);
    else if (editIndex === to) setEditIndex(from);
  }

  return (
    <>
      <StudioListHeader
        title={title}
        count={items.length}
        countLabel={countLabel}
        description={description}
        onAdd={openNew}
        addLabel={addLabel}
      />

      <StudioItemCardGrid
        items={items}
        selectedIndex={editIndex}
        getKey={(item, i) => `${item.title}-${i}`}
        renderTitle={(item) => item.title}
        renderSubtitle={(item) => item.body}
        renderBadge={(item) => (showBadge ? item.badge ?? item.icon : item.icon)}
        onEdit={openEdit}
        onRemove={remove}
        onMoveUp={(i) => moveItem(i, i - 1)}
        onMoveDown={(i) => moveItem(i, i + 1)}
        minItems={minItems}
      />

      {editIndex !== null && draft ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
            <div className="flex justify-between">
              <h2 className="font-display text-lg font-bold">Edit item {editIndex + 1}</h2>
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
              {showBadge ? (
                <StudioField
                  label="Badge (optional)"
                  value={draft.badge ?? ""}
                  onChange={(badge) => setDraft({ ...draft, badge })}
                />
              ) : null}
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
    </>
  );
}
