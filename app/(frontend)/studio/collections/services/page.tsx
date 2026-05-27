import { ServicesCollectionEditor } from "@/components/studio/collections/ServicesCollectionEditor";
import { StudioShell } from "@/components/studio/StudioShell";

export const dynamic = "force-dynamic";

export default function StudioServicesPage() {
  return (
    <StudioShell
      title="Services"
      breadcrumbs={[
        { label: "Studio", href: "/studio" },
        { label: "Collections", href: "/studio/collections" },
        { label: "Services" },
      ]}
    >
      <ServicesCollectionEditor />
    </StudioShell>
  );
}
