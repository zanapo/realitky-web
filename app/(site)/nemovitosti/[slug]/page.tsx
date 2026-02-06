import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CheckCircle2, MapPin } from "lucide-react";

import { AgentCard } from "@/components/property/agent-card";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { ContactForm } from "@/components/forms/contact-form";
import { MapRenderer } from "@/components/map/map-renderer";
import { PropertyGrid } from "@/components/property/property-grid";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { formatArea, formatPrice } from "@/lib/formatters";
import { getPropertyDataSource } from "@/lib/datasources";
import { buildMetadata } from "@/lib/seo/metadata";
import { breadcrumbJsonLd } from "@/lib/seo/jsonld";
import { siteConfig } from "@/lib/seo/site";

type DetailPageProps = {
  params: { slug: string };
};

export async function generateMetadata({ params }: DetailPageProps) {
  const dataSource = getPropertyDataSource();
  const property = await dataSource.getBySlug(params.slug);
  if (!property) {
    return buildMetadata("Nemovitost nenalezena");
  }
  return buildMetadata(property.title, property.description);
}

export default async function PropertyDetailPage({ params }: DetailPageProps) {
  const dataSource = getPropertyDataSource();
  const property = await dataSource.getBySlug(params.slug);

  if (!property) {
    return notFound();
  }

  const similar = (await dataSource.getLatest(6)).filter(
    (item) => item.id !== property.id
  );

  const jsonLd = breadcrumbJsonLd([
    { name: "Domů", url: siteConfig.url },
    { name: "Nemovitosti", url: `${siteConfig.url}/nemovitosti` },
    { name: property.title, url: `${siteConfig.url}/nemovitosti/${property.slug}` },
  ]);

  return (
    <div className="mx-auto max-w-7xl space-y-10 px-4 py-10 sm:px-6 lg:px-8">
      <Breadcrumbs
        items={[
          { href: "/", label: "Domů" },
          { href: "/nemovitosti", label: "Nemovitosti" },
          { label: property.title },
        ]}
      />
      <div className="grid gap-10 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="secondary">
                {property.transactionType === "prodej" ? "Prodej" : "Pronájem"}
              </Badge>
              <Badge variant="outline">{property.propertyType}</Badge>
              <Badge variant="outline">{property.disposition}</Badge>
            </div>
            <h1 className="text-3xl font-semibold">{property.title}</h1>
            <div className="flex items-center gap-2 text-muted-foreground">
              <MapPin className="h-4 w-4" />
              {property.locality}
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {property.images.map((image, index) => (
              <div
                key={image}
                className={`relative overflow-hidden rounded-2xl ${
                  index === 0 ? "md:col-span-2 md:row-span-2" : ""
                }`}
              >
                <Image
                  src={image}
                  alt={property.title}
                  width={900}
                  height={600}
                  className="h-full w-full object-cover"
                />
              </div>
            ))}
          </div>

          <Card>
            <CardContent className="grid gap-6 p-6 md:grid-cols-3">
              <div>
                <p className="text-sm text-muted-foreground">Cena</p>
                <p className="text-2xl font-semibold">
                  {formatPrice(property.price, property.currency)}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Plocha</p>
                <p className="text-2xl font-semibold">
                  {formatArea(property.area)} m²
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Dispozice</p>
                <p className="text-2xl font-semibold">{property.disposition}</p>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">Popis nemovitosti</h2>
            <p className="text-muted-foreground">{property.description}</p>
          </div>

          <Separator />

          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-3">
              <h3 className="text-xl font-semibold">Výbava</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                {property.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
            <div className="space-y-3">
              <h3 className="text-xl font-semibold">Lokalita</h3>
              <MapRenderer lat={property.lat} lng={property.lng} />
            </div>
          </div>
        </div>

        <aside className="space-y-6">
          <AgentCard agent={property.agent} />
          <Card>
            <CardContent className="space-y-4 p-6">
              <h3 className="text-lg font-semibold">Napište nám</h3>
              <ContactForm />
            </CardContent>
          </Card>
        </aside>
      </div>

      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold">Podobné nabídky</h2>
          <Link href="/nemovitosti" className="text-sm text-primary">
            Zobrazit vše
          </Link>
        </div>
        <PropertyGrid properties={similar.slice(0, 3)} />
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </div>
  );
}
