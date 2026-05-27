"use client";

import { clsx } from "clsx";
import { ChevronDown, ChevronUp, Pencil, Trash2 } from "lucide-react";

export function StudioItemCardGrid<T>({
  items,
  selectedIndex,
  getKey,
  onSelect,
  renderTitle,
  renderSubtitle,
  renderBadge,
  onEdit,
  onRemove,
  onMoveUp,
  onMoveDown,
  minItems = 1,
}: {
  items: T[];
  selectedIndex: number | null;
  getKey: (item: T, index: number) => string;
  onSelect?: (index: number) => void;
  renderTitle: (item: T) => string;
  renderSubtitle?: (item: T) => string;
  renderBadge?: (item: T) => string | undefined;
  onEdit: (index: number) => void;
  onRemove: (index: number) => void;
  onMoveUp?: (index: number) => void;
  onMoveDown?: (index: number) => void;
  minItems?: number;
}) {
  const canRemove = items.length > minItems;
  const showReorder = Boolean(onMoveUp && onMoveDown);

  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item, i) => {
        const selected = selectedIndex === i;
        const badge = renderBadge?.(item);
        const subtitle = renderSubtitle?.(item);

        const inner = (
          <>
            <div className="flex items-start justify-between gap-2">
              <span className="text-xs font-bold text-slate-400">#{i + 1}</span>
              {badge ? (
                <span className="max-w-[55%] truncate rounded bg-slate-100 px-2 py-0.5 text-[10px] font-medium text-slate-600">
                  {badge}
                </span>
              ) : null}
            </div>
            <p className="mt-2 font-display font-bold text-slate-900">{renderTitle(item)}</p>
            {subtitle ? <p className="mt-1 line-clamp-2 text-sm text-slate-600">{subtitle}</p> : null}
            <div className="mt-3 flex flex-wrap items-center gap-2">
              {showReorder ? (
                <div className="flex rounded-lg border border-slate-200">
                  <button
                    type="button"
                    disabled={i === 0}
                    onClick={(e) => {
                      e.stopPropagation();
                      onMoveUp?.(i);
                    }}
                    className="rounded-l-lg p-1.5 text-slate-600 hover:bg-slate-50 disabled:opacity-30"
                    aria-label="Move up"
                  >
                    <ChevronUp className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    disabled={i === items.length - 1}
                    onClick={(e) => {
                      e.stopPropagation();
                      onMoveDown?.(i);
                    }}
                    className="rounded-r-lg border-l border-slate-200 p-1.5 text-slate-600 hover:bg-slate-50 disabled:opacity-30"
                    aria-label="Move down"
                  >
                    <ChevronDown className="h-4 w-4" />
                  </button>
                </div>
              ) : null}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onEdit(i);
                }}
                className="inline-flex items-center gap-1 rounded-lg border border-slate-200 px-2 py-1 text-xs font-semibold text-slate-700 hover:bg-slate-50"
              >
                <Pencil className="h-3 w-3" aria-hidden />
                Edit
              </button>
              <button
                type="button"
                disabled={!canRemove}
                onClick={(e) => {
                  e.stopPropagation();
                  onRemove(i);
                }}
                className={clsx(
                  "inline-flex items-center gap-1 rounded-lg border px-2 py-1 text-xs font-semibold",
                  canRemove
                    ? "border-red-200 text-red-700 hover:bg-red-50"
                    : "cursor-not-allowed border-slate-100 text-slate-300",
                )}
              >
                <Trash2 className="h-3 w-3" aria-hidden />
                Delete
              </button>
            </div>
          </>
        );

        const cardClass = clsx(
          "rounded-xl border bg-white p-4 text-left shadow-sm transition-shadow",
          selected ? "border-[#2f4050] ring-2 ring-[#2f4050]/20" : "border-slate-200 hover:shadow-md",
        );

        if (onSelect) {
          return (
            <button key={getKey(item, i)} type="button" onClick={() => onSelect(i)} className={cardClass}>
              {inner}
            </button>
          );
        }

        return (
          <div key={getKey(item, i)} className={cardClass}>
            {inner}
          </div>
        );
      })}
    </div>
  );
}
