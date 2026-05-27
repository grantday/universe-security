import { StudioShell } from "@/components/studio/StudioShell";
import { StudioDashboard } from "@/components/studio/StudioDashboard";

export const dynamic = "force-dynamic";

export default function StudioDashboardPage() {
  return (
    <StudioShell title="Dashboard">
      <StudioDashboard />
    </StudioShell>
  );
}
