"use client";

import { iconKeyOptions } from "@/lib/payload/constants";
import type { IconKey } from "@/lib/content/schema";
import type { StudioValueProp } from "@/lib/studio/collections/value-props";
import { StudioEditModal } from "@/components/studio/StudioEditModal";
import { StudioItemCardGrid } from "@/components/studio/StudioItemCardGrid";
import {
  StudioField,
  StudioListHeader,
  StudioSaveButton,
  StudioStatusMessage,
  StudioTextArea,
} from "@/components/studio/studio-ui";
import { useStudioItems } from "@/components/studio/useStudioItems";

const API = "/api/studio/collections/value-props";

export function ValuePropsCollectionEditor() {
  const s = useStudioItems<StudioValueProp>(API, "/studio/collections/value-props");

  function openNew() {
    const item: StudioValueProp = {
      title: "New value",
      body: "Description",
      icon: "shieldCheck",
      featured: false,
      published: true,
      order: s.list.length,
    };
    s.setEditIndex(s.list.length);
    s.setDraft(item);
    s.setItems([...s.list, item]);
  }

  function openEdit(i: number) {
    s.setEditIndex(i);
    s.setDraft({ ...s.list[i]! });
  }

  function remove(i: number) {
    if (!confirm(`Remove "${s.list[i]?.title}"?`)) return;
    s.setItems(s.list.filter((_, j) => j !== i));
  }

  if (s.loading && !s.items) {
    return <p className="text-sm text-slate-600">Loading value props…</p>;
  }

  return (
    <div className="space-y-6">
      <StudioListHeader
        title="Value propositions"
        count={s.list.length}
        countLabel="items"
        description="Why-us cards on the homepage."
        onAdd={openNew}
        addLabel="+ Add value prop"
      />
      <StudioItemCardGrid
        items={s.list}
        selectedIndex={s.editIndex}
        getKey={(row, i) => String(row.payloadId ?? `new-${i}`)}
        renderTitle={(row) => row.title}
        renderSubtitle={(row) => row.body}
        renderBadge={(row) => (row.featured ? "Featured" : row.icon)}
        onEdit={openEdit}
        onRemove={remove}
        onMoveUp={s.moveUp}
        onMoveDown={s.moveDown}
        minItems={0}
      />
      <StudioStatusMessage status={s.status} />
      <StudioSaveButton saving={s.saving} onClick={() => void s.save("Saved — value props updated.")} />
      {s.editIndex !== null && s.draft ? (
        <StudioEditModal title={`Edit value ${s.editIndex + 1}`} onClose={() => s.closeEdit()} onApply={s.applyDraft}>
          <StudioField label="Title" value={s.draft.title} onChange={(v) => s.setDraft({ ...s.draft!, title: v })} />
          <StudioTextArea label="Body" value={s.draft.body} onChange={(v) => s.setDraft({ ...s.draft!, body: v })} rows={3} />
          <label className="block text-sm font-semibold text-slate-700">
            Icon
            <select
              className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 font-normal"
              value={s.draft.icon}
              onChange={(e) => s.setDraft({ ...s.draft!, icon: e.target.value as IconKey })}
            >
              {iconKeyOptions.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          </label>
          <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
            <input type="checkbox" checked={s.draft.featured} onChange={(e) => s.setDraft({ ...s.draft!, featured: e.target.checked })} />
            Featured
          </label>
          <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
            <input type="checkbox" checked={s.draft.published} onChange={(e) => s.setDraft({ ...s.draft!, published: e.target.checked })} />
            Published
          </label>
        </StudioEditModal>
      ) : null}
    </div>
  );
}
