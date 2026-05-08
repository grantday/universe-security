import { ServicesSlider } from "@/components/home/ServicesSlider";

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
        <ServicesSlider />
      </div>
    </section>
  );
}
