import { HomeSectionsEditor } from "@/components/studio/HomeSectionsEditor";
import { StudioShell } from "@/components/studio/StudioShell";

export const dynamic = "force-dynamic";

export default function HomeSectionsPage() {
  return (
    <StudioShell
      title="Section headers"
      breadcrumbs={[
        { label: "Studio", href: "/studio" },
        { label: "Home", href: "/studio" },
        { label: "Section headers" },
      ]}
    >
      <HomeSectionsEditor />
    </StudioShell>
  );
}
