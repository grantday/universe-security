import { TechnologyPageEditor } from "@/components/studio/TechnologyPageEditor";
import { StudioShell } from "@/components/studio/StudioShell";

export const dynamic = "force-dynamic";

export default function StudioTechnologyPageRoute() {
  return (
    <StudioShell
      title="Technology page"
      breadcrumbs={[
        { label: "Studio", href: "/studio" },
        { label: "Pages", href: "/studio/pages" },
        { label: "Technology" },
      ]}
    >
      <TechnologyPageEditor />
    </StudioShell>
  );
}
