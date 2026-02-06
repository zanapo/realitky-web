import { Breadcrumbs } from "@/components/breadcrumbs";
import { OfferForm } from "@/components/forms/offer-form";
import { PageHeader } from "@/components/sections/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { buildMetadata } from "@/lib/seo/metadata";
import { breadcrumbJsonLd } from "@/lib/seo/jsonld";
import { siteConfig } from "@/lib/seo/site";

export const metadata = buildMetadata("Nabízím nemovitost");

export default function OfferPage() {
  const jsonLd = breadcrumbJsonLd([
    { name: "Domů", url: siteConfig.url },
    { name: "Nabízím", url: `${siteConfig.url}/nabizim` },
  ]);

  return (
    <div className="mx-auto max-w-5xl space-y-10 px-4 py-10 sm:px-6 lg:px-8">
      <Breadcrumbs items={[{ href: "/", label: "Domů" }, { label: "Nabízím" }]} />
      <PageHeader
        title="Nabízím nemovitost"
        description="Pošlete nám základní informace a připravíme nabídku na míru."
      />
      <Card>
        <CardContent className="p-6">
          <OfferForm />
        </CardContent>
      </Card>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </div>
  );
}
