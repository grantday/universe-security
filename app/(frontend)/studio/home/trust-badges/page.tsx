import { TrustBadgesEditor } from "@/components/studio/TrustBadgesEditor";
import { StudioShell } from "@/components/studio/StudioShell";

export const dynamic = "force-dynamic";

export default function TrustBadgesPage() {
  return (
    <StudioShell
      title="Trust badges"
      breadcrumbs={[
        { label: "Studio", href: "/studio" },
        { label: "Home", href: "/studio" },
        { label: "Trust badges" },
      ]}
    >
      <TrustBadgesEditor />
    </StudioShell>
  );
}
