import { Breadcrumbs } from "@/components/breadcrumbs";
import { PageHeader } from "@/components/sections/page-header";
import { buildMetadata } from "@/lib/seo/metadata";
import { breadcrumbJsonLd } from "@/lib/seo/jsonld";
import { siteConfig } from "@/lib/seo/site";

export const metadata = buildMetadata("GDPR");

export default function GdprPage() {
  const jsonLd = breadcrumbJsonLd([
    { name: "Domů", url: siteConfig.url },
    { name: "GDPR", url: `${siteConfig.url}/gdpr` },
  ]);

  return (
    <div className="mx-auto max-w-4xl space-y-8 px-4 py-10 sm:px-6 lg:px-8">
      <Breadcrumbs items={[{ href: "/", label: "Domů" }, { label: "GDPR" }]} />
      <PageHeader
        title="GDPR"
        description="Placeholder text pro zásady ochrany osobních údajů."
      />
      <div className="space-y-4 text-sm text-muted-foreground">
        <p>
          Tento dokument bude doplněn o kompletní zásady zpracování osobních
          údajů v souladu s GDPR.
        </p>
        <p>
          Uveďte informace o správcích dat, účelu zpracování, dobu uchování a
          práva subjektů údajů.
        </p>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </div>
  );
}
