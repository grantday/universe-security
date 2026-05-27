export type StudioNavItem = {
  label: string;
  href?: string;
  badge?: string;
  children?: StudioNavItem[];
  disabled?: boolean;
};

export const studioNav: StudioNavItem[] = [
  { label: "Dashboard", href: "/studio" },
  {
    label: "Home page",
    href: "/studio/home",
    children: [
      { label: "Layered hero", href: "/studio/home/hero-slides" },
      { label: "Trust badges", href: "/studio/home/trust-badges" },
      { label: "Response metrics", href: "/studio/home/response-metrics" },
      { label: "Section headers", href: "/studio/home/sections" },
    ],
  },
  { label: "Site & SEO", href: "/studio/site" },
  {
    label: "Pages",
    href: "/studio/pages",
    children: [
      { label: "Solutions", href: "/studio/pages/solutions" },
      { label: "Industries", href: "/studio/pages/industries" },
      { label: "Company", href: "/studio/pages/company" },
      { label: "Technology", href: "/studio/pages/technology" },
      { label: "Contact", href: "/studio/pages/contact" },
      { label: "Control Centre", href: "/studio/pages/control-centre" },
      { label: "Incident flow steps", href: "/studio/control-centre/steps" },
    ],
  },
  {
    label: "Collections",
    href: "/studio/collections",
    children: [
      { label: "Services", href: "/studio/collections/services" },
      { label: "Insights", href: "/studio/collections/insights" },
      { label: "Client logos", href: "/studio/collections/client-logos" },
      { label: "Industries", href: "/studio/collections/industries" },
      { label: "Testimonials", href: "/studio/collections/testimonials" },
      { label: "Response metrics", href: "/studio/collections/metrics" },
      { label: "Value props", href: "/studio/collections/value-props" },
    ],
  },
  { label: "Contact inbox", href: "/studio/inbox" },
];
