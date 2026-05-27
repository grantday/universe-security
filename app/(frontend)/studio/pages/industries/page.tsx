import Link from "next/link";
import { IndustriesPageEditor } from "@/components/studio/IndustriesPageEditor";
import { StudioShell } from "@/components/studio/StudioShell";

export const dynamic = "force-dynamic";

export default function StudioIndustriesPageSettings() {
  return (
    <StudioShell
      title="Industries page"
      breadcrumbs={[
        { label: "Studio", href: "/studio" },
        { label: "Pages", href: "/studio/pages" },
        { label: "Industries" },
      ]}
    >
      <p className="mb-6 text-sm text-slate-600">
        Edit the page header. Industry cards are managed under{" "}
        <Link href="/studio/collections/industries" className="font-semibold text-[#2f4050] hover:underline">
          Collections → Industries
        </Link>
        .
      </p>
      <IndustriesPageEditor />
    </StudioShell>
  );
}
