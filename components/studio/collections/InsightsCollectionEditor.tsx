"use client";

import type { StudioInsight } from "@/lib/studio/collections/insights";
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

const API = "/api/studio/collections/insights";

export function InsightsCollectionEditor() {
  const s = useStudioItems<StudioInsight>(API, "/studio/collections/insights");

  function openNew() {
    const item: StudioInsight = {
      title: "New article",
      slug: "new-article",
      contentType: "article",
      excerpt: "Short summary",
      body: "Article body text.",
      caseProblem: "",
      caseApproach: "",
      caseMetrics: [],
      published: false,
      publishedAt: new Date().toISOString().slice(0, 10),
      imageId: null,
      imageUrl: "",
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
    return <p className="text-sm text-slate-600">Loading insights…</p>;
  }

  return (
    <div className="space-y-6">
      <StudioListHeader
        title="Insights / news"
        count={s.list.length}
        countLabel="articles"
        description="Blog posts on /insights."
        onAdd={openNew}
        addLabel="+ Add article"
      />
      <StudioMediaHint />
      <StudioItemCardGrid
        items={s.list}
        selectedIndex={s.editIndex}
        getKey={(row, i) => String(row.payloadId ?? `new-${i}`)}
        renderTitle={(row) => row.title}
        renderSubtitle={(row) => row.excerpt}
        renderBadge={(row) =>
          row.contentType === "case-study" ? "Case study" : row.published ? row.publishedAt || "Published" : "Draft"
        }
        onEdit={openEdit}
        onRemove={remove}
        onMoveUp={s.moveUp}
        onMoveDown={s.moveDown}
        minItems={0}
      />
      <StudioStatusMessage status={s.status} />
      <StudioSaveButton saving={s.saving} onClick={() => void s.save("Saved — insights updated.")} />
      {s.editIndex !== null && s.draft ? (
        <StudioEditModal title={`Edit article ${s.editIndex + 1}`} onClose={() => s.closeEdit()} onApply={s.applyDraft}>
          <StudioField label="Title" value={s.draft.title} onChange={(v) => s.setDraft({ ...s.draft!, title: v })} />
          <StudioField label="Slug" value={s.draft.slug} onChange={(v) => s.setDraft({ ...s.draft!, slug: v })} />
          <label className="block text-sm font-semibold text-slate-700">
            Content type
            <select
              className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
              value={s.draft.contentType}
              onChange={(e) =>
                s.setDraft({ ...s.draft!, contentType: e.target.value as "article" | "case-study" })
              }
            >
              <option value="article">Article</option>
              <option value="case-study">Case study</option>
            </select>
          </label>
          <StudioTextArea label="Excerpt" value={s.draft.excerpt} onChange={(v) => s.setDraft({ ...s.draft!, excerpt: v })} rows={2} />
          {s.draft.contentType === "case-study" ? (
            <>
              <StudioTextArea
                label="Challenge"
                value={s.draft.caseProblem}
                onChange={(v) => s.setDraft({ ...s.draft!, caseProblem: v })}
                rows={3}
              />
              <StudioTextArea
                label="Approach"
                value={s.draft.caseApproach}
                onChange={(v) => s.setDraft({ ...s.draft!, caseApproach: v })}
                rows={3}
              />
              <p className="text-sm font-semibold text-slate-700">Results metrics (label · value per line)</p>
              <StudioTextArea
                label="Metrics"
                value={s.draft.caseMetrics.map((m) => `${m.label} | ${m.value}`).join("\n")}
                onChange={(v) => {
                  const caseMetrics = v
                    .split("\n")
                    .map((line) => line.trim())
                    .filter(Boolean)
                    .map((line) => {
                      const [label, value] = line.split("|").map((p) => p.trim());
                      return { label: label ?? "", value: value ?? "" };
                    });
                  s.setDraft({ ...s.draft!, caseMetrics });
                }}
                rows={4}
                hint="Example: Average response | 6 min"
              />
            </>
          ) : null}
          <StudioTextArea label="Body (plain text → formatted on save)" value={s.draft.body} onChange={(v) => s.setDraft({ ...s.draft!, body: v })} rows={8} />
          <StudioField label="Published date" value={s.draft.publishedAt} onChange={(v) => s.setDraft({ ...s.draft!, publishedAt: v })} hint="YYYY-MM-DD" />
          <StudioMediaIdField
            label="Hero image ID"
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
