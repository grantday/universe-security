export const siteConfig = {
  name: "Universe Security",
  tagline: "Intelligent Security. Real-Time Response. Total Control.",
  description:
    "Integrated protection services for residential, commercial, and industrial environments across Zimbabwe.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://universe-security.example.com",
  email: "hello@universesecurity.co.zw",
  salesPhone: "+263770000000",
  salesPhoneDisplay: "+263 77 000 0000",
  emergencyPhone: "+263779110000",
  emergencyPhoneDisplay: "+263 77 911 0000",
  address: {
    street: "123 Sam Nujoma St",
    city: "Harare",
    country: "Zimbabwe",
    full: "123 Sam Nujoma St, Harare, Zimbabwe",
  },
  currency: "USD",
  officeHours: "Mon–Fri 08:00–17:30 CAT · 24/7 Control Centre",
  mapEmbedUrl:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3820.5!2d31.05!3d-17.82!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTfCsDQ5JzEyLjAiUyAzMcKwMDMnMDAuMCJF!5e0!3m2!1sen!2szw!4v1",
} as const;

export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/solutions", label: "Solutions" },
  { href: "/industries", label: "Industries" },
  { href: "/control-centre", label: "Control Centre" },
  { href: "/technology", label: "Technology" },
  { href: "/insights", label: "Insights" },
  { href: "/company", label: "Company" },
  { href: "/contact", label: "Contact" },
] as const;

export const footerColumns = {
  about: {
    title: "About",
    links: [
      { href: "/company", label: "Company" },
      { href: "/contact", label: "Contact" },
    ],
  },
  solutions: {
    title: "Solutions",
    links: [
      { href: "/solutions#home", label: "Home Security" },
      { href: "/solutions#business", label: "Business Security" },
      { href: "/solutions#industrial", label: "Industrial Security" },
      { href: "/solutions#specialised", label: "Specialised" },
    ],
  },
  industries: {
    title: "Industries",
    links: [
      { href: "/industries", label: "All industries" },
      { href: "/control-centre", label: "Control Centre" },
      { href: "/technology", label: "Technology" },
    ],
  },
  legal: {
    title: "Legal & insights",
    links: [
      { href: "/insights", label: "Insights" },
      { href: "/privacy", label: "Privacy Policy" },
      { href: "/terms", label: "Terms" },
      { href: "/credits", label: "Image credits" },
      { href: "/contact", label: "Emergency contact" },
    ],
  },
} as const;
