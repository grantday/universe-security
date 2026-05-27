import { SolutionsPageEditor } from "@/components/studio/SolutionsPageEditor";
import { StudioShell } from "@/components/studio/StudioShell";

export const dynamic = "force-dynamic";

export default function StudioSolutionsPage() {
  return (
    <StudioShell
      title="Solutions page"
      breadcrumbs={[
        { label: "Studio", href: "/studio" },
        { label: "Pages", href: "/studio/pages" },
        { label: "Solutions" },
      ]}
    >
      <SolutionsPageEditor />
    </StudioShell>
  );
}
