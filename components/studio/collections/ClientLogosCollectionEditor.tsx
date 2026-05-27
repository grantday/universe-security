"use client";

import type { StudioClientLogo } from "@/lib/studio/collections/client-logos";
import { StudioEditModal } from "@/components/studio/StudioEditModal";
import { StudioItemCardGrid } from "@/components/studio/StudioItemCardGrid";
import { StudioMediaIdField } from "@/components/studio/StudioMediaIdField";
import { StudioField, StudioListHeader, StudioSaveButton, StudioStatusMessage } from "@/components/studio/studio-ui";
import { useStudioItems } from "@/components/studio/useStudioItems";

const API = "/api/studio/collections/client-logos";

export function ClientLogosCollectionEditor() {
  const s = useStudioItems<StudioClientLogo>(API, "/studio/collections/client-logos");

  function openNew() {
    const item: StudioClientLogo = {
      name: "New client",
      published: true,
      order: s.list.length,
      imageId: null,
      imageUrl: "",
    };
    s.setEditIndex(s.list.length);
    s.setDraft(item);
    s.setItems([...s.list, item]);
  }

  if (s.loading && !s.items) {
    return <p className="text-sm text-slate-600">Loading client logos…</p>;
  }

  return (
    <div className="space-y-6">
      <StudioListHeader
        title="Client logos"
        count={s.list.length}
        countLabel="entries"
        description="Shown in the trust marquee on the home page and solutions page."
        onAdd={openNew}
        addLabel="+ Add logo"
      />
      <StudioItemCardGrid
        items={s.list}
        selectedIndex={s.editIndex}
        getKey={(row, i) => String(row.payloadId ?? `new-${i}`)}
        renderTitle={(row) => row.name}
        renderSubtitle={() => "Marquee strip"}
        renderBadge={(row) => (row.published ? "Published" : "Hidden")}
        onEdit={(i) => {
          s.setEditIndex(i);
          s.setDraft({ ...s.list[i]! });
        }}
        onRemove={(i) => {
          if (!confirm(`Remove "${s.list[i]?.name}"?`)) return;
          s.setItems(s.list.filter((_, j) => j !== i));
        }}
        onMoveUp={s.moveUp}
        onMoveDown={s.moveDown}
        minItems={0}
      />
      <StudioStatusMessage status={s.status} />
      <StudioSaveButton saving={s.saving} onClick={() => void s.save("Saved — client logos updated.")} />
      {s.editIndex !== null && s.draft ? (
        <StudioEditModal title={`Edit ${s.draft.name}`} onClose={() => s.closeEdit()} onApply={s.applyDraft}>
          <StudioField label="Name" value={s.draft.name} onChange={(name) => s.setDraft({ ...s.draft!, name })} />
          <StudioMediaIdField label="Logo image ID" value={s.draft.imageId} onChange={(imageId) => s.setDraft({ ...s.draft!, imageId })} />
          <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
            <input type="checkbox" checked={s.draft.published} onChange={(e) => s.setDraft({ ...s.draft!, published: e.target.checked })} />
            Published
          </label>
        </StudioEditModal>
      ) : null}
    </div>
  );
}
