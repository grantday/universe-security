import { SiteSettingsEditor } from "@/components/studio/SiteSettingsEditor";
import { StudioShell } from "@/components/studio/StudioShell";

export const dynamic = "force-dynamic";

export default function SiteSettingsPage() {
  return (
    <StudioShell
      title="Site settings"
      breadcrumbs={[{ label: "Studio", href: "/studio" }, { label: "Site settings" }]}
    >
      <SiteSettingsEditor />
    </StudioShell>
  );
}
