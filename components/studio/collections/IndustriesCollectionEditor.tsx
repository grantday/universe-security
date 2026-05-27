"use client";

import { iconKeyOptions } from "@/lib/payload/constants";
import type { IconKey } from "@/lib/content/schema";
import type { StudioIndustry } from "@/lib/studio/collections/industries";
import { StudioEditModal } from "@/components/studio/StudioEditModal";
import { StudioItemCardGrid } from "@/components/studio/StudioItemCardGrid";
import { StudioMediaHint } from "@/components/studio/StudioMediaHint";
import { StudioMediaIdField } from "@/components/studio/StudioMediaIdField";
import {
  StudioField,
  StudioListHeader,
  StudioSaveButton,
  StudioStatusMessage,
  StudioTextArea,
} from "@/components/studio/studio-ui";
import { useStudioItems } from "@/components/studio/useStudioItems";

const API = "/api/studio/collections/industries";

export function IndustriesCollectionEditor() {
  const s = useStudioItems<StudioIndustry>(API, "/studio/collections/industries");

  function openNew() {
    const item: StudioIndustry = {
      title: "New industry",
      blurb: "Short description",
      icon: "building2",
      imageId: null,
      imageUrl: "",
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
    if (s.list.length <= 1) return;
    if (!confirm(`Remove "${s.list[i]?.title}"?`)) return;
    s.setItems(s.list.filter((_, j) => j !== i));
  }

  if (s.loading && !s.items) {
    return <p className="text-sm text-slate-600">Loading industries…</p>;
  }

  return (
    <div className="space-y-6">
      <StudioListHeader
        title="Industries"
        count={s.list.length}
        countLabel="industries"
        description="Industry cards on /industries. Edit the page title and intro under Pages → Industries."
        onAdd={openNew}
        addLabel="+ Add industry"
      />
      <StudioMediaHint />
      <StudioItemCardGrid
        items={s.list}
        selectedIndex={s.editIndex}
        getKey={(row, i) => String(row.payloadId ?? `new-${i}`)}
        renderTitle={(row) => row.title}
        renderSubtitle={(row) => row.blurb}
        renderBadge={(row) => (row.imageId != null ? `Media #${row.imageId}` : undefined)}
        onEdit={openEdit}
        onRemove={remove}
        onMoveUp={s.moveUp}
        onMoveDown={s.moveDown}
        minItems={1}
      />
      <StudioStatusMessage status={s.status} />
      <StudioSaveButton saving={s.saving} onClick={() => void s.save("Saved — industries updated.")} />
      {s.editIndex !== null && s.draft ? (
        <StudioEditModal title={`Edit industry ${s.editIndex + 1}`} onClose={() => s.closeEdit()} onApply={s.applyDraft}>
          <StudioField label="Title" value={s.draft.title} onChange={(v) => s.setDraft({ ...s.draft!, title: v })} />
          <StudioTextArea label="Blurb" value={s.draft.blurb} onChange={(v) => s.setDraft({ ...s.draft!, blurb: v })} rows={3} />
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
          <StudioMediaIdField value={s.draft.imageId} onChange={(imageId) => s.setDraft({ ...s.draft!, imageId })} />
          <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
            <input type="checkbox" checked={s.draft.published} onChange={(e) => s.setDraft({ ...s.draft!, published: e.target.checked })} />
            Published
          </label>
        </StudioEditModal>
      ) : null}
    </div>
  );
}
