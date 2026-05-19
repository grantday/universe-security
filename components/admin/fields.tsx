"use client";

import type { ReactNode } from "react";

export function Field({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <label className="mt-3 block text-sm font-semibold text-slate-700">
      {label}
      <input
        className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 font-normal"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </label>
  );
}

export function TextArea({
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
    <label className="mt-3 block text-sm font-semibold text-slate-700">
      {label}
      <textarea
        className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 font-normal"
        rows={rows}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </label>
  );
}

export function SectionCard({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-card">
      <h2 className="font-display text-lg font-bold text-brand-900">{title}</h2>
      <div className="mt-4 grid gap-1">{children}</div>
    </section>
  );
}

export function StringListEditor({
  label,
  items,
  onChange,
}: {
  label: string;
  items: string[];
  onChange: (items: string[]) => void;
}) {
  return (
    <div className="mt-4">
      <p className="text-sm font-semibold text-slate-700">{label}</p>
      {items.map((item, i) => (
        <div key={i} className="mt-2 flex gap-2">
          <input
            className="flex-1 rounded-lg border border-slate-200 px-3 py-2 text-sm"
            value={item}
            onChange={(e) => {
              const next = [...items];
              next[i] = e.target.value;
              onChange(next);
            }}
          />
          <button
            type="button"
            className="text-sm text-red-600"
            onClick={() => onChange(items.filter((_, j) => j !== i))}
          >
            Remove
          </button>
        </div>
      ))}
      <button
        type="button"
        className="mt-2 text-sm font-semibold text-brand-700"
        onClick={() => onChange([...items, ""])}
      >
        + Add item
      </button>
    </div>
  );
}
