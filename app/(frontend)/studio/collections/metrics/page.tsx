import { MetricsCollectionEditor } from "@/components/studio/collections/MetricsCollectionEditor";
import { StudioShell } from "@/components/studio/StudioShell";

export const dynamic = "force-dynamic";

export default function StudioMetricsPage() {
  return (
    <StudioShell
      title="Response metrics"
      breadcrumbs={[
        { label: "Studio", href: "/studio" },
        { label: "Collections", href: "/studio/collections" },
        { label: "Response metrics" },
      ]}
    >
      <MetricsCollectionEditor />
    </StudioShell>
  );
}
