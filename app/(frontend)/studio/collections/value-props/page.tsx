import { ValuePropsCollectionEditor } from "@/components/studio/collections/ValuePropsCollectionEditor";
import { StudioShell } from "@/components/studio/StudioShell";

export const dynamic = "force-dynamic";

export default function StudioValuePropsPage() {
  return (
    <StudioShell
      title="Value props"
      breadcrumbs={[
        { label: "Studio", href: "/studio" },
        { label: "Collections", href: "/studio/collections" },
        { label: "Value props" },
      ]}
    >
      <ValuePropsCollectionEditor />
    </StudioShell>
  );
}
