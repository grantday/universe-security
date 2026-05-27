import { ControlCentreStepsEditor } from "@/components/studio/ControlCentreStepsEditor";
import { StudioShell } from "@/components/studio/StudioShell";

export const dynamic = "force-dynamic";

export default function StudioControlCentreStepsPage() {
  return (
    <StudioShell
      title="Incident flow steps"
      breadcrumbs={[
        { label: "Studio", href: "/studio" },
        { label: "Pages", href: "/studio/pages" },
        { label: "Flow steps" },
      ]}
    >
      <ControlCentreStepsEditor />
    </StudioShell>
  );
}
