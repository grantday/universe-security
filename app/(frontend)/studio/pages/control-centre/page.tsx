import { ControlCentrePageEditor } from "@/components/studio/ControlCentrePageEditor";
import { StudioShell } from "@/components/studio/StudioShell";

export const dynamic = "force-dynamic";

export default function StudioControlCentrePageRoute() {
  return (
    <StudioShell
      title="Control Centre page"
      breadcrumbs={[
        { label: "Studio", href: "/studio" },
        { label: "Pages", href: "/studio/pages" },
        { label: "Control Centre" },
      ]}
    >
      <ControlCentrePageEditor />
    </StudioShell>
  );
}
