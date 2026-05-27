import Link from "next/link";
import { Images, Award, FileText, BarChart3 } from "lucide-react";
import { StudioShell } from "@/components/studio/StudioShell";

export const dynamic = "force-dynamic";

const links = [
  {
    href: "/studio/home/hero-slides",
    title: "Layered hero",
    description: "Dark layered carousel on the homepage — preview matches the live site.",
    icon: Images,
  },
  {
    href: "/studio/home/trust-badges",
    title: "Trust badges",
    description: "Icon strip below the hero.",
    icon: Award,
  },
  {
    href: "/studio/home/response-metrics",
    title: "Response metrics",
    description: "Homepage KPI band — section heading, intro, and metric numbers in one place.",
    icon: BarChart3,
  },
  {
    href: "/studio/home/sections",
    title: "Section headers",
    description: "Headings and intro text for other homepage blocks.",
    icon: FileText,
  },
];

export default function StudioHomeHubPage() {
  return (
    <StudioShell
      title="Home page"
      breadcrumbs={[{ label: "Studio", href: "/studio" }, { label: "Home page" }]}
    >
      <p className="mb-6 text-sm text-slate-600">Choose a homepage section to edit.</p>
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
