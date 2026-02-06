import Link from "next/link";
import { ArrowRight, Building2, Shield, Sparkles, Star, Users } from "lucide-react";

import { HeroSearch } from "@/components/sections/hero-search";
import { BlogCard } from "@/components/sections/blog-card";
import { PropertyGrid } from "@/components/property/property-grid";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { getBlogPosts } from "@/lib/blog";
import { getPropertyDataSource } from "@/lib/datasources";
import { buildMetadata } from "@/lib/seo/metadata";
import { breadcrumbJsonLd, realEstateAgentJsonLd } from "@/lib/seo/jsonld";
import { siteConfig } from "@/lib/seo/site";

export const metadata = buildMetadata("Domů");

export default async function HomePage() {
  const dataSource = getPropertyDataSource();
  const [featuredRaw, latestRaw, latestPosts] = await Promise.all([
    dataSource.getFeatured(6),
    dataSource.getLatest(6),
    Promise.resolve(getBlogPosts().slice(0, 3)),
  ]);
  const featured = featuredRaw.length > 0 ? featuredRaw : latestRaw;

  const jsonLd = [
    realEstateAgentJsonLd(),
    breadcrumbJsonLd([
      { name: "Domů", url: siteConfig.url },
    ]),
  ];

  return (
    <>
      <section className="bg-gradient-to-b from-muted/60 to-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div className="space-y-6">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">
              Luxusní realitní servis
            </p>
            <h1 className="text-4xl font-semibold leading-tight sm:text-5xl">
              Moderní realitní kancelář pro náročné klienty
            </h1>
            <p className="text-lg text-muted-foreground">
              Prémiová prezentace, osobní makléři a rychlé uzavření obchodů.
              Pomáháme prodávat a pronajímat nemovitosti s jistotou.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button asChild>
                <Link href="/nemovitosti">Zobrazit nabídky</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/o-nas">Poznat tým</Link>
              </Button>
            </div>
            <div className="flex flex-wrap gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Star className="h-4 w-4 text-primary" />
                350+ úspěšných prodejů
              </div>
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-primary" />
                Certifikovaní makléři
              </div>
            </div>
          </div>
          <HeroSearch />
        </div>
      </section>

      <section className="mx-auto max-w-7xl space-y-8 px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
              Top nabídky
            </p>
            <h2 className="mt-2 text-3xl font-semibold">Vybrané nemovitosti</h2>
          </div>
          <Button variant="outline" asChild>
            <Link href="/nemovitosti" className="flex items-center gap-2">
              Všechny nabídky
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
        <PropertyGrid properties={featured} />
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-3">
          {[
            {
              title: "Byty & apartmány",
              description: "Moderní i investiční byty v atraktivních lokalitách.",
              icon: Building2,
            },
            {
              title: "Rodinné domy",
              description: "Domy s pozemky, zahradou i novostavby na klíč.",
              icon: Users,
            },
            {
              title: "Komerce & investice",
              description: "Výnosné prostory a strategické lokality pro podnikání.",
              icon: Sparkles,
            },
          ].map((category) => (
            <Card key={category.title}>
              <CardContent className="space-y-4 p-6">
                <category.icon className="h-8 w-8 text-primary" />
                <h3 className="text-lg font-semibold">{category.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {category.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="bg-muted/40">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
                Proč my
              </p>
              <h2 className="mt-2 text-3xl font-semibold">
                Transparentní proces a osobní přístup
              </h2>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                "Precizní cenové odhady",
                "Prémiová prezentace nabídky",
                "Marketing na míru",
                "Právní servis",
                "Vlastní síť investorů",
                "24/7 podpora klientů",
              ].map((benefit) => (
                <div
                  key={benefit}
                  className="rounded-2xl border bg-white p-4 text-sm text-muted-foreground"
                >
                  {benefit}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl space-y-8 px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
              Novinky & poradna
            </p>
            <h2 className="mt-2 text-3xl font-semibold">
              Nejnovější články z praxe
            </h2>
          </div>
          <Button variant="outline" asChild>
            <Link href="/poradna">Všechny články</Link>
          </Button>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {latestPosts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <Separator className="mb-10" />
        <div className="grid gap-6 lg:grid-cols-3">
          {[
            {
              title: "Chci prodat",
              href: "/nabizim",
              description: "Získejte bezplatný odhad a marketing na míru.",
            },
            {
              title: "Chci pronajmout",
              href: "/nabizim",
              description: "Prověříme nájemníky a nastavíme bezpečný proces.",
            },
            {
              title: "Ocenění zdarma",
              href: "/kontakty",
              description: "Expresní odhad hodnoty do 48 hodin.",
            },
          ].map((cta) => (
            <Card key={cta.title} className="border-muted/60">
              <CardContent className="space-y-4 p-6">
                <h3 className="text-lg font-semibold">{cta.title}</h3>
                <p className="text-sm text-muted-foreground">{cta.description}</p>
                <Button variant="outline" asChild>
                  <Link href={cta.href}>Zjistit více</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {jsonLd.map((schema, index) => (
        <script
          key={`jsonld-${index}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  );
}
