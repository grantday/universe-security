import { InsightsCollectionEditor } from "@/components/studio/collections/InsightsCollectionEditor";
import { StudioShell } from "@/components/studio/StudioShell";

export const dynamic = "force-dynamic";

export default function StudioInsightsPage() {
  return (
    <StudioShell
      title="Insights"
      breadcrumbs={[
        { label: "Studio", href: "/studio" },
        { label: "Collections", href: "/studio/collections" },
        { label: "Insights" },
      ]}
    >
      <InsightsCollectionEditor />
    </StudioShell>
  );
}
