import { HeroSlidesEditor } from "@/components/studio/HeroSlidesEditor";
import { StudioShell } from "@/components/studio/StudioShell";

export const dynamic = "force-dynamic";

export default function HeroSlidesPage() {
  return (
    <StudioShell
      title="Layered hero"
      breadcrumbs={[
        { label: "Studio", href: "/studio" },
        { label: "Home", href: "/studio/home" },
        { label: "Layered hero" },
      ]}
    >
      <p className="mb-6 text-sm text-slate-600">
        Dark navy carousel with stacked image layers on the homepage. Visitors see copy on the left and layered cards on the
        right.
      </p>
      <HeroSlidesEditor />
    </StudioShell>
  );
}
