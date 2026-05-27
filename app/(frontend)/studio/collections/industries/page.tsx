import { IndustriesCollectionEditor } from "@/components/studio/collections/IndustriesCollectionEditor";
import { StudioShell } from "@/components/studio/StudioShell";

export const dynamic = "force-dynamic";

export default function StudioIndustriesPage() {
  return (
    <StudioShell
      title="Industries"
      breadcrumbs={[
        { label: "Studio", href: "/studio" },
        { label: "Collections", href: "/studio/collections" },
        { label: "Industries" },
      ]}
    >
      <IndustriesCollectionEditor />
    </StudioShell>
  );
}
