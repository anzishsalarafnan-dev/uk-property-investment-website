export const SITE_NAME = "UK Property Investment Guide";
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const CITIES_LIST = [
  "london",
  "manchester",
  "birmingham",
  "leeds",
  "liverpool",
  "glasgow",
  "bristol",
  "edinburgh",
] as const;

export const NAV_LINKS = [
  { label: "Cities", href: "/cities" },
  { label: "Map", href: "/map" },
  { label: "Valuation", href: "/valuation" },
  { label: "Guides", href: "/guides" },
  { label: "Blog", href: "/blog" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;
