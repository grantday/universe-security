"use client";

import { clsx } from "clsx";

/** Universe Studio primary — matches layered hero and public header navy */
export const STUDIO_PRIMARY = "#2f4050";

export const studioBtnPrimary =
  "inline-flex items-center gap-2 rounded-lg bg-[#2f4050] px-4 py-2 text-sm font-semibold text-white hover:bg-slate-700";

export const studioBadge =
  "inline-flex items-center rounded-full bg-[#2f4050]/10 px-3 py-1 text-sm font-bold text-[#2f4050]";

export function StudioStatusMessage({ status }: { status: string }) {
  if (!status) return null;
  return (
    <p
      className={clsx(
        "rounded-lg px-4 py-3 text-sm font-medium",
        status.startsWith("Saved") ? "bg-emerald-50 text-emerald-800" : "bg-red-50 text-red-800",
      )}
    >
      {status}
    </p>
  );
}

export function StudioSaveButton({
  saving,
  onClick,
  label = "Save & publish",
}: {
  saving: boolean;
  onClick: () => void;
  label?: string;
}) {
  return (
    <div className="flex justify-end">
      <button
        type="button"
        onClick={onClick}
        disabled={saving}
        className="rounded-lg bg-[#2f4050] px-6 py-2.5 text-sm font-semibold text-white hover:bg-slate-700 disabled:opacity-60"
      >
        {saving ? "Saving…" : label}
      </button>
    </div>
  );
}

export function StudioField({
  label,
  value,
  onChange,
  hint,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  hint?: string;
  type?: "text" | "email";
}) {
  return (
    <label className="block text-sm font-semibold text-slate-700">
      {label}
      <input
        type={type}
        className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 font-normal text-slate-900"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      {hint ? <span className="mt-1 block text-xs font-normal text-slate-500">{hint}</span> : null}
    </label>
  );
}

export function StudioTextArea({
  label,
  value,
  onChange,
  rows = 3,
  hint,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  rows?: number;
  hint?: string;
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
      {hint ? <span className="mt-1 block text-xs font-normal text-slate-500">{hint}</span> : null}
    </label>
  );
}

export function StudioListHeader({
  title,
  count,
  countLabel,
  description,
  onAdd,
  addLabel,
}: {
  title: string;
  count: number;
  countLabel: string;
  description: string;
  onAdd: () => void;
  addLabel: string;
}) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <div>
        <p className="text-sm text-slate-600">{title}</p>
        <p className="mt-1 flex items-center gap-2">
          <span className={studioBadge}>
            {count} {count === 1 ? countLabel.replace(/s$/, "") : countLabel}
          </span>
          <span className="text-xs text-slate-500">{description}</span>
        </p>
      </div>
      <button
        type="button"
        onClick={onAdd}
        className={studioBtnPrimary}
      >
        {addLabel}
      </button>
    </div>
  );
}
