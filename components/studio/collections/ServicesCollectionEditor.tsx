"use client";

import { imageThemeOptions } from "@/lib/payload/constants";
import type { ImageTheme } from "@/lib/content/schema";
import type { StudioService } from "@/lib/studio/collections/services";
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

const API = "/api/studio/collections/services";
const categories = [
  { label: "Home", value: "home" },
  { label: "Business", value: "business" },
  { label: "Industrial", value: "industrial" },
  { label: "Specialised", value: "specialised" },
] as const;

export function ServicesCollectionEditor() {
  const s = useStudioItems<StudioService>(API, "/studio/collections/services");

  function openNew() {
    const item: StudioService = {
      title: "New service",
      slug: "new-service",
      category: "home",
      description: "Description",
      theme: "guards",
      bullets: ["Bullet point"],
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
    return <p className="text-sm text-slate-600">Loading services…</p>;
  }

  return (
    <div className="space-y-6">
      <StudioListHeader
        title="Services"
        count={s.list.length}
        countLabel="services"
        description="Solution cards on homepage and /solutions."
        onAdd={openNew}
        addLabel="+ Add service"
      />
      <StudioMediaHint />
      <StudioItemCardGrid
        items={s.list}
        selectedIndex={s.editIndex}
        getKey={(row, i) => String(row.payloadId ?? `new-${i}`)}
        renderTitle={(row) => row.title}
        renderSubtitle={(row) => row.category}
        renderBadge={(row) => row.slug}
        onEdit={openEdit}
        onRemove={remove}
        onMoveUp={s.moveUp}
        onMoveDown={s.moveDown}
        minItems={1}
      />
      <StudioStatusMessage status={s.status} />
      <StudioSaveButton saving={s.saving} onClick={() => void s.save("Saved — services updated on site.")} />
      {s.editIndex !== null && s.draft ? (
        <StudioEditModal title={`Edit service ${s.editIndex + 1}`} onClose={() => s.closeEdit()} onApply={s.applyDraft}>
          <StudioField label="Title" value={s.draft.title} onChange={(v) => s.setDraft({ ...s.draft!, title: v })} />
          <StudioField label="Slug" value={s.draft.slug} onChange={(v) => s.setDraft({ ...s.draft!, slug: v })} hint="URL-safe, e.g. business-security" />
          <label className="block text-sm font-semibold text-slate-700">
            Category
            <select
              className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 font-normal"
              value={s.draft.category}
              onChange={(e) => s.setDraft({ ...s.draft!, category: e.target.value as StudioService["category"] })}
            >
              {categories.map((c) => (
                <option key={c.value} value={c.value}>
                  {c.label}
                </option>
              ))}
            </select>
          </label>
          <StudioTextArea label="Description" value={s.draft.description} onChange={(v) => s.setDraft({ ...s.draft!, description: v })} rows={3} />
          <label className="block text-sm font-semibold text-slate-700">
            Image theme
            <select
              className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 font-normal"
              value={s.draft.theme}
              onChange={(e) => s.setDraft({ ...s.draft!, theme: e.target.value as ImageTheme })}
            >
              {imageThemeOptions.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          </label>
          <StudioTextArea
            label="Bullet points (one per line)"
            value={s.draft.bullets.join("\n")}
            onChange={(v) => s.setDraft({ ...s.draft!, bullets: v.split("\n").map((l) => l.trim()).filter(Boolean) })}
            rows={4}
          />
          <StudioMediaIdField
            value={s.draft.imageId}
            onChange={(imageId) => s.setDraft({ ...s.draft!, imageId })}
          />
          <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
            <input type="checkbox" checked={s.draft.published} onChange={(e) => s.setDraft({ ...s.draft!, published: e.target.checked })} />
            Published
          </label>
        </StudioEditModal>
      ) : null}
    </div>
  );
}
