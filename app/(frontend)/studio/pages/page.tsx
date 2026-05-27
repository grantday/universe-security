import Link from "next/link";
import { Building2, Cpu, Factory, Headphones, Layers, Radio } from "lucide-react";
import { StudioShell } from "@/components/studio/StudioShell";

export const dynamic = "force-dynamic";

const links = [
  { href: "/studio/pages/solutions", title: "Solutions", description: "Page intro and footer CTA.", icon: Layers },
  { href: "/studio/pages/industries", title: "Industries", description: "Page title, intro, and industry cards.", icon: Factory },
  { href: "/studio/pages/company", title: "Company", description: "Mission, vision, values, compliance.", icon: Building2 },
  { href: "/studio/pages/technology", title: "Technology", description: "Stack, data security, CTA.", icon: Cpu },
  { href: "/studio/pages/contact", title: "Contact", description: "Form and emergency copy.", icon: Headphones },
  {
    href: "/studio/pages/control-centre",
    title: "Control Centre",
    description: "Hero, features, and page CTA.",
    icon: Radio,
  },
  {
    href: "/studio/control-centre/steps",
    title: "Incident flow steps",
    description: "Ordered steps on homepage & Control Centre.",
    icon: Radio,
  },
];

export default function StudioPagesHubPage() {
  return (
    <StudioShell
      title="Pages"
      breadcrumbs={[{ label: "Studio", href: "/studio" }, { label: "Pages" }]}
    >
      <p className="mb-6 text-sm text-slate-600">Edit inner page content. Service and industry cards use Collections in the sidebar.</p>
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
