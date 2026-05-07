import type { Metadata } from "next";
import {
  Building2,
  HardHat,
  Landmark,
  PartyPopper,
  School,
  Shield,
  ShoppingBag,
  Truck,
  Warehouse,
} from "lucide-react";
import { IndustryCard } from "@/components/IndustryCard";

export const metadata: Metadata = {
  title: "Industries",
  description:
    "Security programmes for residential, retail, banking, construction, logistics, schools, industrial, government, and events in Zimbabwe.",
};

const industries = [
  { title: "Residential", blurb: "Estates and homes with smart alarms, CCTV, and patrol coordination.", icon: Building2 },
  { title: "Retail", blurb: "Shrinkage control, after-hours monitoring, and visible deterrence.", icon: ShoppingBag },
  { title: "Banking", blurb: "High-trust environments with strict access and escalation protocols.", icon: Landmark },
  { title: "Construction", blurb: "Site guarding, perimeter breaches, and equipment protection.", icon: HardHat },
  { title: "Logistics", blurb: "Depots, yards, and convoy escorts with GPS-backed response.", icon: Truck },
  { title: "Schools", blurb: "Safe campuses with controlled access and incident-ready communication.", icon: School },
  { title: "Industrial", blurb: "High-risk plants and warehouses with layered physical + tech security.", icon: Warehouse },
  { title: "Government", blurb: "Compliance-led deployments with confidentiality and auditability.", icon: Shield },
  { title: "Events", blurb: "Crowd management, access zones, and emergency coordination.", icon: PartyPopper },
] as const;

export default function IndustriesPage() {
  return (
    <div className="bg-slate-50 py-14 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h1 className="font-display text-4xl font-bold tracking-tight text-brand-900">Industries</h1>
        <p className="mt-4 max-w-2xl text-lg text-slate-600">
          Sector-specific playbooks backed by our 24/7 control centre and licensed response teams.
        </p>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {industries.map((ind) => (
            <IndustryCard key={ind.title} title={ind.title} blurb={ind.blurb} icon={ind.icon} />
          ))}
        </div>
      </div>
    </div>
  );
}
