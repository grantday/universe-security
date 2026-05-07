import { Building2, Factory, Home } from "lucide-react";
import { ServiceCard } from "@/components/ServiceCard";

export function CoreServices() {
  return (
    <section className="bg-slate-50 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <h2 className="font-display text-3xl font-bold tracking-tight text-brand-900 sm:text-4xl">
            Core security services
          </h2>
          <p className="mt-4 text-slate-600">
            From smart homes to high-risk industrial sites, we align technology, trained personnel, and control-room
            oversight to one operating model.
          </p>
        </div>
        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          <ServiceCard
            title="Home Security"
            description="Residential protection with smart integration and panic pathways."
            icon={Home}
            items={[
              "Alarm systems & monitoring",
              "CCTV & perimeter protection",
              "Smart integration",
              "Panic response",
            ]}
          />
          <ServiceCard
            title="Business Security"
            description="Commercial coverage with access control and transparent reporting."
            icon={Building2}
            items={[
              "Guarding & patrols",
              "Access control",
              "CCTV monitoring",
              "Risk assessments & asset protection",
            ]}
          />
          <ServiceCard
            title="Industrial Security"
            description="High-risk environments, logistics, and loss prevention."
            icon={Factory}
            items={[
              "Site guarding",
              "Logistics escort",
              "High-risk protection",
              "Loss prevention",
            ]}
          />
        </div>
      </div>
    </section>
  );
}
