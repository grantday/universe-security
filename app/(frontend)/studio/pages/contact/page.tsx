import { ContactPageEditor } from "@/components/studio/ContactPageEditor";
import { StudioShell } from "@/components/studio/StudioShell";

export const dynamic = "force-dynamic";

export default function StudioContactPageRoute() {
  return (
    <StudioShell
      title="Contact page"
      breadcrumbs={[
        { label: "Studio", href: "/studio" },
        { label: "Pages", href: "/studio/pages" },
        { label: "Contact" },
      ]}
    >
      <ContactPageEditor />
    </StudioShell>
  );
}
