"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { clsx } from "clsx";
import { ChevronDown, ChevronUp, Pencil, Plus, Trash2, X } from "lucide-react";
import { imageThemeOptions } from "@/lib/payload/constants";
import type { ImageTheme } from "@/lib/content/schema";
import { LayeredHeroPreview } from "@/components/studio/LayeredHeroPreview";
import { StudioMediaIdField } from "@/components/studio/StudioMediaIdField";
import { createEmptySlide } from "@/lib/studio/hero-slides-client";
import type { StudioHeroSlide } from "@/lib/studio/types";

export function HeroSlidesEditor() {
  const [slides, setSlides] = useState<StudioHeroSlide[] | null>(null);
  const [previewIndex, setPreviewIndex] = useState(0);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [draft, setDraft] = useState<StudioHeroSlide | null>(null);
  const [status, setStatus] = useState("");
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    setStatus("");
    const res = await fetch("/api/studio/home/hero-slides", { credentials: "include" });
    setLoading(false);
    if (res.status === 401) {
      window.location.href = "/studio/login?next=/studio/home/hero-slides";
      return;
    }
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setStatus((data as { error?: string }).error ?? "Failed to load slides");
      return;
    }
    const data = (await res.json()) as { slides: StudioHeroSlide[] };
    setSlides(data.slides);
    setPreviewIndex(0);
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  function openEdit(index: number) {
    if (!slides) return;
    setPreviewIndex(index);
    setEditingIndex(index);
    setDraft({ ...slides[index]! });
  }

  function openNew() {
    if (!slides) return;
    const slide = createEmptySlide(slides.length);
    const nextIndex = slides.length;
    setPreviewIndex(nextIndex);
    setEditingIndex(nextIndex);
    setDraft(slide);
    setSlides([...slides, slide]);
  }

  function closeEditor() {
    if (editingIndex !== null && slides && editingIndex === slides.length - 1) {
      const last = slides[slides.length - 1];
      if (last && last.title === "Headline" && last.eyebrow === "New slide") {
        setSlides(slides.slice(0, -1));
      }
    }
    setEditingIndex(null);
    setDraft(null);
  }

  function applyDraft() {
    if (!slides || editingIndex === null || !draft) return;
    const next = [...slides];
    next[editingIndex] = draft;
    setSlides(next);
    setEditingIndex(null);
    setDraft(null);
  }

  function removeSlide(index: number) {
    if (!slides || slides.length <= 1) return;
    if (!window.confirm(`Delete slide "${slides[index]?.title}"?`)) return;
    setSlides(slides.filter((_, i) => i !== index));
    if (editingIndex === index) closeEditor();
  }

  function moveSlide(from: number, to: number) {
    if (!slides || to < 0 || to >= slides.length) return;
    const next = [...slides];
    const [removed] = next.splice(from, 1);
    next.splice(to, 0, removed!);
    setSlides(next);
    if (editingIndex === from) setEditingIndex(to);
    else if (editingIndex === to) setEditingIndex(from);
    if (previewIndex === from) setPreviewIndex(to);
    else if (previewIndex === to) setPreviewIndex(from);
  }

  async function saveAll() {
    if (!slides) return;
    setSaving(true);
    setStatus("");
    const res = await fetch("/api/studio/home/hero-slides", {
      method: "PUT",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ slides }),
    });
    setSaving(false);
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setStatus((data as { error?: string }).error ?? "Save failed");
      return;
    }
    const data = (await res.json()) as { slides: StudioHeroSlide[] };
    setSlides(data.slides);
    setStatus("Saved — layered homepage hero updated.");
  }

  const previewSlides = editingIndex !== null && draft ? slides!.map((s, i) => (i === editingIndex ? draft : s)) : slides!;
  const previewActiveIndex = editingIndex ?? previewIndex;

  if (loading) {
    return <p className="text-sm text-slate-600">Loading hero slides…</p>;
  }

  if (!slides) {
    return <p className="text-sm text-red-600">{status || "Could not load slides."}</p>;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
        <div>
          <p className="text-sm font-semibold text-slate-800">Layered homepage hero</p>
          <p className="mt-1 flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center rounded-full bg-[#2f4050]/10 px-3 py-1 text-sm font-bold text-[#2f4050]">
              {slides.length} {slides.length === 1 ? "slide" : "slides"}
            </span>
            <span className="text-xs text-slate-500">7.5s autoplay on the live site · order = list below</span>
          </p>
        </div>
        <button
          type="button"
          onClick={openNew}
          className="inline-flex items-center gap-2 rounded-lg bg-[#2f4050] px-4 py-2 text-sm font-semibold text-white hover:bg-brand-900"
        >
          <Plus className="h-4 w-4" aria-hidden />
          Add slide
        </button>
      </div>

      <LayeredHeroPreview slides={previewSlides} activeIndex={previewActiveIndex} />

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {slides.map((slide, i) => (
          <button
            key={`${slide.id}-${i}`}
            type="button"
            onClick={() => {
              setPreviewIndex(i);
              openEdit(i);
            }}
            className={clsx(
              "rounded-xl border bg-white p-4 text-left shadow-sm transition-shadow hover:shadow-md",
              (editingIndex === i || previewIndex === i) && "border-[#2f4050] ring-2 ring-[#2f4050]/20",
              (editingIndex !== i && previewIndex !== i) && "border-slate-200",
            )}
          >
            <div className="flex items-start justify-between gap-2">
              <span className="text-xs font-bold text-slate-400">#{i + 1}</span>
              <span className="rounded bg-slate-100 px-2 py-0.5 text-[10px] font-medium text-slate-600">{slide.theme}</span>
            </div>
            <p className="mt-2 line-clamp-1 text-xs font-semibold uppercase tracking-wide text-slate-500">{slide.eyebrow}</p>
            <p className="mt-1 font-display font-bold text-slate-900">{slide.title}</p>
            <div className="mt-3 flex flex-wrap items-center gap-2">
              <div className="flex rounded-lg border border-slate-200">
                <button
                  type="button"
                  disabled={i === 0}
                  onClick={(e) => {
                    e.stopPropagation();
                    moveSlide(i, i - 1);
                  }}
                  className="rounded-l-lg p-1.5 text-slate-600 hover:bg-slate-50 disabled:opacity-30"
                  aria-label="Move slide up"
                >
                  <ChevronUp className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  disabled={i === slides.length - 1}
                  onClick={(e) => {
                    e.stopPropagation();
                    moveSlide(i, i + 1);
                  }}
                  className="rounded-r-lg border-l border-slate-200 p-1.5 text-slate-600 hover:bg-slate-50 disabled:opacity-30"
                  aria-label="Move slide down"
                >
                  <ChevronDown className="h-4 w-4" />
                </button>
              </div>
              <span
                role="button"
                tabIndex={0}
                onClick={(e) => {
                  e.stopPropagation();
                  openEdit(i);
                }}
                onKeyDown={(e) => e.key === "Enter" && openEdit(i)}
                className="inline-flex items-center gap-1 rounded-lg border border-slate-200 px-2 py-1 text-xs font-semibold text-slate-700 hover:bg-slate-50"
              >
                <Pencil className="h-3 w-3" aria-hidden />
                Edit
              </span>
              <span
                role="button"
                tabIndex={0}
                onClick={(e) => {
                  e.stopPropagation();
                  removeSlide(i);
                }}
                onKeyDown={(e) => e.key === "Enter" && removeSlide(i)}
                className={clsx(
                  "inline-flex items-center gap-1 rounded-lg border px-2 py-1 text-xs font-semibold",
                  slides.length <= 1
                    ? "cursor-not-allowed border-slate-100 text-slate-300"
                    : "border-red-200 text-red-700 hover:bg-red-50",
                )}
              >
                <Trash2 className="h-3 w-3" aria-hidden />
                Delete
              </span>
            </div>
          </button>
        ))}
      </div>

      {status ? (
        <p
          className={clsx(
            "rounded-lg px-4 py-3 text-sm font-medium",
            status.startsWith("Saved") ? "bg-emerald-50 text-emerald-800" : "bg-red-50 text-red-800",
          )}
        >
          {status}
        </p>
      ) : null}

      <div className="flex justify-end">
        <button
          type="button"
          onClick={() => void saveAll()}
          disabled={saving}
          className="rounded-lg bg-[#2f4050] px-6 py-2.5 text-sm font-semibold text-white hover:bg-slate-700 disabled:opacity-60"
        >
          {saving ? "Saving…" : "Save & publish"}
        </button>
      </div>

      {editingIndex !== null && draft ? (
        <SlideEditorModal
          slide={draft}
          index={editingIndex}
          allSlides={previewSlides}
          onChange={setDraft}
          onClose={closeEditor}
          onSave={applyDraft}
        />
      ) : null}
    </div>
  );
}

function SlideEditorModal({
  slide,
  index,
  allSlides,
  onChange,
  onClose,
  onSave,
}: {
  slide: StudioHeroSlide;
  index: number;
  allSlides: StudioHeroSlide[];
  onChange: (slide: StudioHeroSlide) => void;
  onClose: () => void;
  onSave: () => void;
}) {
  function patch(partial: Partial<StudioHeroSlide>) {
    onChange({ ...slide, ...partial });
  }

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/40 p-4 sm:p-8">
      <div
        role="dialog"
        aria-labelledby="slide-editor-title"
        className="w-full max-w-5xl rounded-xl border border-slate-200 bg-white shadow-xl"
      >
        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
          <div>
            <h2 id="slide-editor-title" className="font-display text-lg font-bold text-slate-900">
              Edit slide {index + 1}
            </h2>
            <p className="text-xs text-slate-500">Preview updates as you type · Apply, then Save & publish.</p>
          </div>
          <button type="button" onClick={onClose} className="rounded-lg p-2 text-slate-500 hover:bg-slate-100" aria-label="Close">
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="border-b border-slate-100 px-6 py-4">
          <LayeredHeroPreview slides={allSlides} activeIndex={index} compact />
        </div>
        <div className="max-h-[50vh] space-y-4 overflow-y-auto px-6 py-5">
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Slide ID" value={slide.id} onChange={(v) => patch({ id: v })} hint="Unique key, e.g. control, guards" />
            <Field label="Image seed" value={slide.seed} onChange={(v) => patch({ seed: v })} hint="Used when no image uploaded" />
          </div>
          <Field label="Eyebrow" value={slide.eyebrow} onChange={(v) => patch({ eyebrow: v })} />
          <Field label="Headline" value={slide.title} onChange={(v) => patch({ title: v })} />
          <TextArea label="Body" value={slide.body} onChange={(v) => patch({ body: v })} rows={3} />
          <label className="block text-sm font-semibold text-slate-700">
            Visual theme
            <select
              className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 font-normal"
              value={slide.theme}
              onChange={(e) => patch({ theme: e.target.value as ImageTheme })}
            >
              {imageThemeOptions.map((t) => (
                <option key={t.value} value={t.value}>
                  {t.label}
                </option>
              ))}
            </select>
          </label>
          <Field
            label="Image URL (optional)"
            value={slide.imageUrl ?? ""}
            onChange={(v) => patch({ imageUrl: v })}
            hint="Leave empty when using a Payload media ID below."
          />
          <StudioMediaIdField
            label="Hero image ID"
            value={slide.imageId}
            onChange={(imageId) => patch({ imageId })}
          />
          {slide.imageUrl ? (
            <div className="relative aspect-video w-full max-w-xs overflow-hidden rounded-lg border border-slate-200">
              <Image src={slide.imageUrl} alt="" fill className="object-cover" sizes="320px" unoptimized />
            </div>
          ) : null}
          <div className="grid gap-4 sm:grid-cols-2">
            <Field
              label="Primary CTA label"
              value={slide.ctaPrimary.label}
              onChange={(v) => patch({ ctaPrimary: { ...slide.ctaPrimary, label: v } })}
            />
            <Field
              label="Primary CTA link"
              value={slide.ctaPrimary.href}
              onChange={(v) => patch({ ctaPrimary: { ...slide.ctaPrimary, href: v } })}
            />
            <Field
              label="Secondary CTA label"
              value={slide.ctaSecondary.label}
              onChange={(v) => patch({ ctaSecondary: { ...slide.ctaSecondary, label: v } })}
            />
            <Field
              label="Secondary CTA link"
              value={slide.ctaSecondary.href}
              onChange={(v) => patch({ ctaSecondary: { ...slide.ctaSecondary, href: v } })}
            />
          </div>
        </div>
        <div className="flex justify-end gap-3 border-t border-slate-200 px-6 py-4">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onSave}
            className="rounded-lg bg-[#2f4050] px-4 py-2 text-sm font-semibold text-white hover:bg-brand-900"
          >
            Apply to list
          </button>
        </div>
      </div>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  hint,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  hint?: string;
}) {
  return (
    <label className="block text-sm font-semibold text-slate-700">
      {label}
      <input
        className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 font-normal text-slate-900"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      {hint ? <span className="mt-1 block text-xs font-normal text-slate-500">{hint}</span> : null}
    </label>
  );
}

function TextArea({
  label,
  value,
  onChange,
  rows = 3,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  rows?: number;
}) {
  return (
    <label className="block text-sm font-semibold text-slate-700">
      {label}
      <textarea
        className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 font-normal text-slate-900"
        rows={rows}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </label>
  );
}
