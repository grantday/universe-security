"use client";

import type { StudioMetric } from "@/lib/studio/collections/metrics";
import { StudioEditModal } from "@/components/studio/StudioEditModal";
import { StudioItemCardGrid } from "@/components/studio/StudioItemCardGrid";
import { StudioField, StudioListHeader } from "@/components/studio/studio-ui";

type MetricsItemsPanelProps = {
  list: StudioMetric[];
  editIndex: number | null;
  draft: StudioMetric | null;
  onAdd: () => void;
  onEdit: (index: number) => void;
  onRemove: (index: number) => void;
  onMoveUp: (index: number) => void;
  onMoveDown: (index: number) => void;
  onCloseEdit: () => void;
  onApplyDraft: () => void;
  onDraftChange: (draft: StudioMetric) => void;
  title?: string;
  description?: string;
};

export function MetricsItemsPanel({
  list,
  editIndex,
  draft,
  onAdd,
  onEdit,
  onRemove,
  onMoveUp,
  onMoveDown,
  onCloseEdit,
  onApplyDraft,
  onDraftChange,
  title = "Response metrics",
  description = "Numbers shown in the homepage response metrics band and other stats sections.",
}: MetricsItemsPanelProps) {
  return (
    <>
      <StudioListHeader
        title={title}
        count={list.length}
        countLabel="metrics"
        description={description}
        onAdd={onAdd}
        addLabel="+ Add metric"
      />
      <StudioItemCardGrid
        items={list}
        selectedIndex={editIndex}
        getKey={(row, i) => String(row.payloadId ?? `new-${i}`)}
        renderTitle={(row) => row.label}
        renderSubtitle={(row) => `${row.prefix ?? ""}${row.value}${row.suffix ?? ""}`}
        onEdit={onEdit}
        onRemove={onRemove}
        onMoveUp={onMoveUp}
        onMoveDown={onMoveDown}
        minItems={0}
      />
      {editIndex !== null && draft ? (
        <StudioEditModal title={`Edit metric ${editIndex + 1}`} onClose={onCloseEdit} onApply={onApplyDraft}>
          <StudioField label="Label" value={draft.label} onChange={(v) => onDraftChange({ ...draft, label: v })} />
          <StudioField label="Value" value={draft.value} onChange={(v) => onDraftChange({ ...draft, value: v })} />
          <StudioField
            label="Prefix"
            value={draft.prefix ?? ""}
            onChange={(v) => onDraftChange({ ...draft, prefix: v || undefined })}
          />
          <StudioField
            label="Suffix"
            value={draft.suffix ?? ""}
            onChange={(v) => onDraftChange({ ...draft, suffix: v || undefined })}
          />
          <StudioField label="Note" value={draft.note ?? ""} onChange={(v) => onDraftChange({ ...draft, note: v || undefined })} />
          <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
            <input
              type="checkbox"
              checked={draft.published}
              onChange={(e) => onDraftChange({ ...draft, published: e.target.checked })}
            />
            Published
          </label>
        </StudioEditModal>
      ) : null}
    </>
  );
}
