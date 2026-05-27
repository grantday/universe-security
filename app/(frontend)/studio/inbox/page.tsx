import { ContactInboxEditor } from "@/components/studio/collections/ContactInboxEditor";
import { StudioShell } from "@/components/studio/StudioShell";

export const dynamic = "force-dynamic";

export default function StudioInboxPage() {
  return (
    <StudioShell
      title="Contact inbox"
      breadcrumbs={[{ label: "Studio", href: "/studio" }, { label: "Contact inbox" }]}
    >
      <ContactInboxEditor />
    </StudioShell>
  );
}
