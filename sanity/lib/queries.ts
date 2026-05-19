export const siteSettingsQuery = `*[_type == "siteSettings"][0]{
  companyName,
  tagline,
  phonePrimary,
  phoneEmergency,
  email,
  address,
  logo,
  socialLinks
}`;

export const homeHeroQuery = `*[_type == "homeHero"][0]{
  eyebrow,
  headline,
  subheadline,
  primaryCta,
  secondaryCta,
  slides[]{image, caption, alt},
  trustBadges
}`;

export const servicesQuery = `*[_type == "service" && published == true] | order(order asc){
  _id,
  title,
  "slug": slug.current,
  category,
  shortDescription,
  image,
  features,
  order
}`;

export const controlCentreStepsQuery = `*[_type == "controlCentreStep"] | order(order asc){
  _id,
  title,
  description,
  icon,
  order
}`;

export const valuePropsQuery = `*[_type == "valueProp"] | order(order asc){
  _id,
  title,
  description,
  icon,
  order
}`;

export const metricsQuery = `*[_type == "metric"] | order(order asc){
  _id,
  label,
  value,
  numericValue,
  suffix,
  caveat,
  order
}`;

export const testimonialsQuery = `*[_type == "testimonial" && published == true]{
  _id,
  quote,
  authorRole,
  authorOrg,
  location
}`;

export const insightsTeaserQuery = `*[_type == "insight" && defined(publishedAt)] | order(publishedAt desc)[0...3]{
  _id,
  title,
  "slug": slug.current,
  excerpt,
  coverImage,
  publishedAt,
  tags,
  author->{name, role}
}`;

export const insightBySlugQuery = `*[_type == "insight" && slug.current == $slug][0]{
  _id,
  title,
  "slug": slug.current,
  excerpt,
  coverImage,
  body,
  publishedAt,
  tags,
  author->{name, role, avatar, bio}
}`;
