"use client";

import type { StudioTestimonial } from "@/lib/studio/collections/testimonials";
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

const API = "/api/studio/collections/testimonials";

export function TestimonialsCollectionEditor() {
  const s = useStudioItems<StudioTestimonial>(API, "/studio/collections/testimonials");

  function openNew() {
    const item: StudioTestimonial = {
      quote: "Quote text",
      author: "Author",
      org: "Organisation",
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
    if (!confirm(`Remove testimonial from ${s.list[i]?.author}?`)) return;
    s.setItems(s.list.filter((_, j) => j !== i));
  }

  if (s.loading && !s.items) {
    return <p className="text-sm text-slate-600">Loading testimonials…</p>;
  }

  return (
    <div className="space-y-6">
      <StudioListHeader
        title="Testimonials"
        count={s.list.length}
        countLabel="items"
        description="Quotes shown on the homepage."
        onAdd={openNew}
        addLabel="+ Add testimonial"
      />
      <StudioItemCardGrid
        items={s.list}
        selectedIndex={s.editIndex}
        getKey={(row, i) => String(row.payloadId ?? `new-${i}`)}
        renderTitle={(row) => row.author}
        renderSubtitle={(row) => row.quote}
        renderBadge={(row) => row.org}
        onEdit={openEdit}
        onRemove={remove}
        onMoveUp={s.moveUp}
        onMoveDown={s.moveDown}
        minItems={0}
      />
      <StudioStatusMessage status={s.status} />
      <StudioSaveButton saving={s.saving} onClick={() => void s.save("Saved — testimonials updated.")} />
      {s.editIndex !== null && s.draft ? (
        <StudioEditModal
          title={`Edit testimonial ${s.editIndex + 1}`}
          onClose={() => s.closeEdit()}
          onApply={s.applyDraft}
        >
          <StudioTextArea label="Quote" value={s.draft.quote} onChange={(v) => s.setDraft({ ...s.draft!, quote: v })} rows={4} />
          <StudioField label="Author" value={s.draft.author} onChange={(v) => s.setDraft({ ...s.draft!, author: v })} />
          <StudioField label="Organisation" value={s.draft.org} onChange={(v) => s.setDraft({ ...s.draft!, org: v })} />
          <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
            <input type="checkbox" checked={s.draft.published} onChange={(e) => s.setDraft({ ...s.draft!, published: e.target.checked })} />
            Published
          </label>
        </StudioEditModal>
      ) : null}
    </div>
  );
}
