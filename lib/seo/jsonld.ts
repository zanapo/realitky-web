import { siteConfig } from "@/lib/seo/site";

export const realEstateAgentJsonLd = () => ({
  "@context": "https://schema.org",
  "@type": "RealEstateAgent",
  name: siteConfig.name,
  url: siteConfig.url,
  logo: `${siteConfig.url}${siteConfig.logo}`,
  telephone: siteConfig.phone,
  email: siteConfig.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: siteConfig.address,
    addressLocality: "Ostrava",
    addressCountry: "CZ",
  },
});

export const breadcrumbJsonLd = (items: { name: string; url: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: item.name,
    item: item.url,
  })),
});
