import { BadgeCheck, Building, Handshake, LineChart } from "lucide-react";

import { Breadcrumbs } from "@/components/breadcrumbs";
import { PageHeader } from "@/components/sections/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { buildMetadata } from "@/lib/seo/metadata";
import { breadcrumbJsonLd } from "@/lib/seo/jsonld";
import { siteConfig } from "@/lib/seo/site";

export const metadata = buildMetadata("Služby");

export default function ServicesPage() {
  const jsonLd = breadcrumbJsonLd([
    { name: "Domů", url: siteConfig.url },
    { name: "Služby", url: `${siteConfig.url}/sluzby` },
  ]);

  return (
    <div className="mx-auto max-w-6xl space-y-10 px-4 py-10 sm:px-6 lg:px-8">
      <Breadcrumbs items={[{ href: "/", label: "Domů" }, { label: "Služby" }]} />
      <PageHeader
        title="Kompletní servis na jednom místě"
        description="Od ocenění přes marketing až po právní servis. Vše je v našich rukou."
      />
      <div className="grid gap-6 md:grid-cols-2">
        {[
          {
            title: "Prodej nemovitostí",
            description:
              "Strategie prodeje, profesionální fotografie, cílená reklama.",
            icon: Building,
          },
          {
            title: "Pronájem nemovitostí",
            description:
              "Výběr prověřených nájemníků, správa smluv a předávací protokol.",
            icon: Handshake,
          },
          {
            title: "Ocenění zdarma",
            description:
              "Analýza trhu a srovnání s aktuální nabídkou v regionu.",
            icon: LineChart,
          },
          {
            title: "Právní servis",
            description:
              "Kompletní smluvní dokumentace a bezpečný převod nemovitosti.",
            icon: BadgeCheck,
          },
        ].map((service) => (
          <Card key={service.title}>
            <CardContent className="space-y-4 p-6">
              <service.icon className="h-8 w-8 text-primary" />
              <h3 className="text-lg font-semibold">{service.title}</h3>
              <p className="text-sm text-muted-foreground">
                {service.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </div>
  );
}
