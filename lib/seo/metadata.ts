import type { Metadata } from "next";

import { siteConfig } from "@/lib/seo/site";

export const buildMetadata = (
  title: string,
  description?: string
): Metadata => {
  const metaDescription = description ?? siteConfig.description;
  return {
    title: `${title} | ${siteConfig.name}`,
    description: metaDescription,
    metadataBase: new URL(siteConfig.url),
    openGraph: {
      title: `${title} | ${siteConfig.name}`,
      description: metaDescription,
      url: siteConfig.url,
      siteName: siteConfig.name,
      images: [{ url: siteConfig.logo, width: 512, height: 512 }],
      locale: "cs_CZ",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${siteConfig.name}`,
      description: metaDescription,
      images: [siteConfig.logo],
    },
  };
};
