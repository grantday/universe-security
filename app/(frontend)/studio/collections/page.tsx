import Link from "next/link";
import { BarChart3, Briefcase, Building2, FileText, Layers, MessageSquareQuote, Users } from "lucide-react";
import { StudioMediaHint } from "@/components/studio/StudioMediaHint";
import { StudioShell } from "@/components/studio/StudioShell";

export const dynamic = "force-dynamic";

const links = [
  { href: "/studio/collections/services", title: "Services", description: "Solution cards and categories.", icon: Layers },
  { href: "/studio/collections/industries", title: "Industries", description: "Industry vertical cards.", icon: Building2 },
  { href: "/studio/collections/insights", title: "Insights", description: "News, alerts, and case studies.", icon: FileText },
  { href: "/studio/collections/client-logos", title: "Client logos", description: "Trust marquee on home and solutions.", icon: Users },
  { href: "/studio/collections/testimonials", title: "Testimonials", description: "Client quotes.", icon: MessageSquareQuote },
  {
    href: "/studio/collections/metrics",
    title: "Response metrics",
    description: "KPI numbers — prefer Home → Response metrics to edit with the section header.",
    icon: BarChart3,
  },
  { href: "/studio/collections/value-props", title: "Value props", description: "Why-us highlights.", icon: Briefcase },
];

export default function StudioCollectionsHubPage() {
  return (
    <StudioShell
      title="Collections"
      breadcrumbs={[{ label: "Studio", href: "/studio" }, { label: "Collections" }]}
    >
      <StudioMediaHint className="mb-6" />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md"
          >
            <link.icon className="h-8 w-8 text-[#2f4050]" aria-hidden />
            <p className="mt-3 font-display font-bold text-slate-900">{link.title}</p>
            <p className="mt-1 text-sm text-slate-600">{link.description}</p>
          </Link>
        ))}
      </div>
    </StudioShell>
  );
}
