import { TestimonialsCollectionEditor } from "@/components/studio/collections/TestimonialsCollectionEditor";
import { StudioShell } from "@/components/studio/StudioShell";

export const dynamic = "force-dynamic";

export default function StudioTestimonialsPage() {
  return (
    <StudioShell
      title="Testimonials"
      breadcrumbs={[
        { label: "Studio", href: "/studio" },
        { label: "Collections", href: "/studio/collections" },
        { label: "Testimonials" },
      ]}
    >
      <TestimonialsCollectionEditor />
    </StudioShell>
  );
}
