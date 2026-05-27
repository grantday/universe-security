import Link from "next/link";
import { StudioField } from "@/components/studio/studio-ui";

export function StudioMediaIdField({
  label = "Media ID (Payload)",
  value,
  onChange,
  hint = "Upload in Payload Media, then paste the numeric ID.",
}: {
  label?: string;
  value: number | null;
  onChange: (id: number | null) => void;
  hint?: string;
}) {
  return (
    <div className="space-y-2">
      <StudioField
        label={label}
        value={value != null ? String(value) : ""}
        onChange={(v) => onChange(v.trim() ? Number(v) : null)}
        hint={hint}
      />
      <Link
        href="/admin/collections/media"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block text-xs font-semibold text-[#2f4050] hover:underline"
      >
        Open Payload Media →
      </Link>
    </div>
  );
}
