import Link from "next/link";
import { ImageIcon } from "lucide-react";

export function StudioMediaHint({ className }: { className?: string }) {
  return (
    <div
      className={
        className ??
        "flex gap-3 rounded-xl border border-slate-200 bg-slate-50/80 px-4 py-3 text-sm text-slate-600"
      }
    >
      <ImageIcon className="mt-0.5 h-5 w-5 shrink-0 text-[#2f4050]" aria-hidden />
      <p>
        Upload images in{" "}
        <Link href="/admin/collections/media" className="font-semibold text-[#2f4050] hover:underline">
          Payload Media
        </Link>{" "}
        (opens in a new tab), then paste the numeric <strong>Media ID</strong> into item fields. Order on this page
        matches what visitors see after you save.
      </p>
    </div>
  );
}
