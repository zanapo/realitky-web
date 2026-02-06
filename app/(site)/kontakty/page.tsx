import { Mail, MapPin, Phone } from "lucide-react";

import { Breadcrumbs } from "@/components/breadcrumbs";
import { ContactForm } from "@/components/forms/contact-form";
import { MapRenderer } from "@/components/map/map-renderer";
import { PageHeader } from "@/components/sections/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { buildMetadata } from "@/lib/seo/metadata";
import { breadcrumbJsonLd } from "@/lib/seo/jsonld";
import { siteConfig } from "@/lib/seo/site";

export const metadata = buildMetadata("Kontakty");

export default function ContactPage() {
  const jsonLd = breadcrumbJsonLd([
    { name: "Domů", url: siteConfig.url },
    { name: "Kontakty", url: `${siteConfig.url}/kontakty` },
  ]);

  return (
    <div className="mx-auto max-w-6xl space-y-10 px-4 py-10 sm:px-6 lg:px-8">
      <Breadcrumbs
        items={[{ href: "/", label: "Domů" }, { label: "Kontakty" }]}
      />
      <PageHeader
        title="Kontaktujte nás"
        description="Ozvěte se nám a domluvme si konzultaci nebo ocenění zdarma."
      />
      <div className="grid gap-8 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardContent className="p-6">
            <ContactForm />
          </CardContent>
        </Card>
        <Card>
          <CardContent className="space-y-4 p-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-primary" />
              {siteConfig.phone}
            </div>
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-primary" />
              {siteConfig.email}
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-primary" />
              {siteConfig.address}
            </div>
          </CardContent>
        </Card>
      </div>
      <MapRenderer lat={49.835} lng={18.292} />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </div>
  );
}
