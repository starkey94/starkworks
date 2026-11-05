export const SITE = {
  name: "Stark Electrical Work",
  tagline: "Dreams to Reality",
  rc: "2979226",
  phoneDisplay: "+234 813 791 0788",
  phoneE164: "+2348137910788",
  whatsapp: "https://wa.me/2348137910788",
  address: "Itanrin Street, Adjacent Omega Champion Church",
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=Itanrin+Street+Omega+Champion+Church",
  social: "@officialstarkworks",
  instagram: "https://www.instagram.com/officialstarkworks",
} as const;

export const NAV_LINKS = [
  { href: "#home", label: "Home" },
  { href: "#services", label: "Services" },
  { href: "#store", label: "Store / Materials" },
  { href: "#about", label: "About Us" },
  { href: "#contact", label: "Contact" },
] as const;

export const SERVICES = [
  "Domestic & Industrial Electrical Works",
  "Solar Installations",
  "Electrical Designs & Installations",
  "Electrical Supply / Procurement",
  "Consultation",
  "Training",
] as const;

export function whatsappLink(text?: string) {
  return text ? `${SITE.whatsapp}?text=${encodeURIComponent(text)}` : SITE.whatsapp;
}
