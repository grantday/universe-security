import { CompanyPageEditor } from "@/components/studio/CompanyPageEditor";
import { StudioShell } from "@/components/studio/StudioShell";

export const dynamic = "force-dynamic";

export default function StudioCompanyPageRoute() {
  return (
    <StudioShell
      title="Company page"
      breadcrumbs={[
        { label: "Studio", href: "/studio" },
        { label: "Pages", href: "/studio/pages" },
        { label: "Company" },
      ]}
    >
      <CompanyPageEditor />
    </StudioShell>
  );
}
