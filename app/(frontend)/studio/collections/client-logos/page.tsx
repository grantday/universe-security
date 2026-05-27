import { ClientLogosCollectionEditor } from "@/components/studio/collections/ClientLogosCollectionEditor";
import { StudioShell } from "@/components/studio/StudioShell";

export const dynamic = "force-dynamic";

export default function StudioClientLogosPage() {
  return (
    <StudioShell
      title="Client logos"
      breadcrumbs={[
        { label: "Studio", href: "/studio" },
        { label: "Collections", href: "/studio/collections" },
        { label: "Client logos" },
      ]}
    >
      <ClientLogosCollectionEditor />
    </StudioShell>
  );
}
