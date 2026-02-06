import { Breadcrumbs } from "@/components/breadcrumbs";
import { PageHeader } from "@/components/sections/page-header";
import { buildMetadata } from "@/lib/seo/metadata";
import { breadcrumbJsonLd } from "@/lib/seo/jsonld";
import { siteConfig } from "@/lib/seo/site";

export const metadata = buildMetadata("Cookies");

export default function CookiesPage() {
  const jsonLd = breadcrumbJsonLd([
    { name: "Domů", url: siteConfig.url },
    { name: "Cookies", url: `${siteConfig.url}/cookies` },
  ]);

  return (
    <div className="mx-auto max-w-4xl space-y-8 px-4 py-10 sm:px-6 lg:px-8">
      <Breadcrumbs
        items={[{ href: "/", label: "Domů" }, { label: "Cookies" }]}
      />
      <PageHeader
        title="Cookies"
        description="Placeholder text pro zásady používání cookies."
      />
      <div className="space-y-4 text-sm text-muted-foreground">
        <p>
          Tento dokument bude doplněn o kompletní informace o používaných
          cookies, jejich účelu a možnostech správy.
        </p>
        <p>
          Do sekce uveďte typy cookies, dobu platnosti a možnosti odvolání
          souhlasu.
        </p>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </div>
  );
}
