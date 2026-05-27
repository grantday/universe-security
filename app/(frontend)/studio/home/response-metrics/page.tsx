import { ResponseMetricsEditor } from "@/components/studio/ResponseMetricsEditor";
import { StudioShell } from "@/components/studio/StudioShell";

export const dynamic = "force-dynamic";

export default function StudioResponseMetricsPage() {
  return (
    <StudioShell
      title="Response metrics"
      breadcrumbs={[
        { label: "Studio", href: "/studio" },
        { label: "Home page", href: "/studio/home" },
        { label: "Response metrics" },
      ]}
    >
      <ResponseMetricsEditor />
    </StudioShell>
  );
}
