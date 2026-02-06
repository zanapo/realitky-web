import { Breadcrumbs } from "@/components/breadcrumbs";
import { DemandForm } from "@/components/forms/demand-form";
import { PageHeader } from "@/components/sections/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { buildMetadata } from "@/lib/seo/metadata";
import { breadcrumbJsonLd } from "@/lib/seo/jsonld";
import { siteConfig } from "@/lib/seo/site";

export const metadata = buildMetadata("Hledám nemovitost");

export default function DemandPage() {
  const jsonLd = breadcrumbJsonLd([
    { name: "Domů", url: siteConfig.url },
    { name: "Hledám", url: `${siteConfig.url}/hledam` },
  ]);

  return (
    <div className="mx-auto max-w-5xl space-y-10 px-4 py-10 sm:px-6 lg:px-8">
      <Breadcrumbs items={[{ href: "/", label: "Domů" }, { label: "Hledám" }]} />
      <PageHeader
        title="Hledám nemovitost"
        description="Dejte nám vědět, co hledáte, a my vám připravíme nabídku na míru."
      />
      <Card>
        <CardContent className="p-6">
          <DemandForm />
        </CardContent>
      </Card>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </div>
  );
}
