"use client";



import type { StudioMetric } from "@/lib/studio/collections/metrics";

import { MetricsItemsPanel } from "@/components/studio/MetricsItemsPanel";

import { StudioSaveButton, StudioStatusMessage } from "@/components/studio/studio-ui";

import { useStudioItems } from "@/components/studio/useStudioItems";



const API = "/api/studio/collections/metrics";



export function MetricsCollectionEditor() {

  const s = useStudioItems<StudioMetric>(API, "/studio/collections/metrics");



  function openNew() {

    const item: StudioMetric = {

      label: "New metric",

      value: "0",

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

    if (!confirm(`Remove "${s.list[i]?.label}"?`)) return;

    s.setItems(s.list.filter((_, j) => j !== i));

  }



  if (s.loading && !s.items) {

    return <p className="text-sm text-slate-600">Loading metrics…</p>;

  }



  return (

    <div className="space-y-6">

      <p className="text-sm text-slate-600">

        Same data as{" "}

        <a href="/studio/home/response-metrics" className="font-semibold text-[#2f4050] underline">

          Home → Response metrics

        </a>

        . Use that page to edit the section heading and numbers together.

      </p>

      <MetricsItemsPanel

        list={s.list}

        editIndex={s.editIndex}

        draft={s.draft}

        onAdd={openNew}

        onEdit={openEdit}

        onRemove={remove}

        onMoveUp={s.moveUp}

        onMoveDown={s.moveDown}

        onCloseEdit={() => s.closeEdit()}

        onApplyDraft={s.applyDraft}

        onDraftChange={(d) => s.setDraft(d)}

        title="All KPI metrics"

        description="Numbers shown in stats sections across the site."

      />

      <StudioStatusMessage status={s.status} />

      <StudioSaveButton saving={s.saving} onClick={() => void s.save("Saved — metrics updated.")} />

    </div>

  );

}

