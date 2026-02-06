import Link from "next/link";
import { ArrowRight, Building2, CheckCircle2, Shield, Sparkles, Star } from "lucide-react";

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
import { isVariant } from "@/lib/variants";

export const metadata = buildMetadata("Domů");

type VariantHomeProps = {
  params: Promise<{ variant: string }>;
};

export default async function VariantHomePage({ params }: VariantHomeProps) {
  const resolvedParams = await params;
  if (!isVariant(resolvedParams.variant)) {
    return null;
  }

  const dataSource = getPropertyDataSource();
  const [featuredRaw, latestRaw, latestPosts] = await Promise.all([
    dataSource.getFeatured(6),
    dataSource.getLatest(6),
    Promise.resolve(getBlogPosts().slice(0, 3)),
  ]);
  const featured = featuredRaw.length > 0 ? featuredRaw : latestRaw;

  const jsonLd = [
    realEstateAgentJsonLd(),
    breadcrumbJsonLd([{ name: "Domů", url: siteConfig.url }]),
  ];

  const variant = resolvedParams.variant;

  return (
    <>
      {variant === "design-1" && (
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
                    <Link href={`/${variant}/nemovitosti`}>Zobrazit nabídky</Link>
                  </Button>
                  <Button variant="outline" asChild>
                    <Link href={`/${variant}/o-nas`}>Poznat tým</Link>
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
                <Link href={`/${variant}/nemovitosti`} className="flex items-center gap-2">
                  Všechny nabídky
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
            <PropertyGrid properties={featured} />
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
        </>
      )}

      {variant === "design-2" && (
        <>
          <section className="bg-white">
            <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-20 sm:px-6 lg:grid-cols-[1.2fr_0.8fr] lg:px-8">
              <div className="space-y-6">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">
                  Green concierge realit
                </p>
                <h1 className="text-5xl font-semibold leading-tight">
                  Bydlení s důrazem na klid a kvalitu
                </h1>
                <p className="text-lg text-muted-foreground">
                  Spojujeme data, marketing a osobní servis. Najdeme vám ideální
                  nemovitost, nebo ji prodáme za nejlepší cenu.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Button size="lg" asChild>
                    <Link href={`/${variant}/nemovitosti`}>Vybrat nabídku</Link>
                  </Button>
                  <Button size="lg" variant="outline" asChild>
                    <Link href={`/${variant}/kontakty`}>Domluvit schůzku</Link>
                  </Button>
                </div>
                <div className="grid gap-3 text-sm text-muted-foreground sm:grid-cols-3">
                  {[
                    "Ocenění zdarma",
                    "Marketing do 48h",
                    "Prověření klienti",
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-primary" />
                      {item}
                    </div>
                  ))}
                </div>
              </div>
              <div className="rounded-3xl border bg-muted/30 p-6 shadow-lg">
                <HeroSearch />
              </div>
            </div>
          </section>

          <section className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[0.6fr_1fr] lg:px-8">
            <div className="space-y-6">
              <h2 className="text-3xl font-semibold">Top nabídky týdne</h2>
              <p className="text-muted-foreground">
                Pečlivě vybrané nemovitosti s nejvyšší přidanou hodnotou.
              </p>
              <Button variant="outline" asChild>
                <Link href={`/${variant}/nemovitosti`}>Zobrazit vše</Link>
              </Button>
            </div>
            <PropertyGrid properties={featured} />
          </section>
        </>
      )}

      {variant === "design-3" && (
        <>
          <section className="bg-muted/20">
            <div className="mx-auto flex max-w-7xl flex-col gap-10 px-4 py-20 sm:px-6 lg:px-8">
              <div className="flex flex-col items-start gap-6 lg:flex-row lg:items-end lg:justify-between">
                <div className="space-y-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.4em] text-muted-foreground">
                    Editorial real estate
                  </p>
                  <h1 className="text-5xl font-semibold leading-tight">
                    Prémiová prezentace nemovitostí
                  </h1>
                  <p className="max-w-2xl text-lg text-muted-foreground">
                    Kombinujeme strategii, vizuální storytelling a detailní
                    analytiku trhu.
                  </p>
                </div>
                <div className="flex flex-wrap gap-3">
                  <Button size="lg" asChild>
                    <Link href={`/${variant}/nabizim`}>Chci prodat</Link>
                  </Button>
                  <Button size="lg" variant="outline" asChild>
                    <Link href={`/${variant}/hledam`}>Chci koupit</Link>
                  </Button>
                </div>
              </div>
              <HeroSearch />
            </div>
          </section>

          <section className="mx-auto max-w-7xl space-y-8 px-4 py-16 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between">
              <h2 className="text-3xl font-semibold">Signature nabídky</h2>
              <Link href={`/${variant}/nemovitosti`} className="text-sm text-primary">
                Zobrazit vše
              </Link>
            </div>
            <PropertyGrid properties={featured} />
          </section>
        </>
      )}

      {variant === "design-4" && (
        <>
          <section className="bg-gradient-to-b from-white to-muted/40">
            <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:px-8">
              <div className="space-y-6">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">
                  Minimal & rounded
                </p>
                <h1 className="text-5xl font-semibold">
                  Bydlení, které má styl
                </h1>
                <p className="text-lg text-muted-foreground">
                  Moderní portfolio nemovitostí s důrazem na detail a design.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Button size="lg" asChild>
                    <Link href={`/${variant}/nemovitosti`}>Prohlédnout</Link>
                  </Button>
                  <Button size="lg" variant="outline" asChild>
                    <Link href={`/${variant}/sluzby`}>Naše služby</Link>
                  </Button>
                </div>
              </div>
              <div className="rounded-[32px] border bg-white p-6 shadow-xl">
                <HeroSearch />
              </div>
            </div>
          </section>

          <section className="mx-auto grid max-w-7xl gap-6 px-4 py-16 sm:px-6 lg:grid-cols-3 lg:px-8">
            {[
              {
                title: "Lifestyle byty",
                description: "Novostavby i designové rekonstrukce.",
              },
              {
                title: "Rodinné bydlení",
                description: "Domy s prostorem i soukromím.",
              },
              {
                title: "Investice",
                description: "Stabilní výnosy v ověřených lokalitách.",
              },
            ].map((item) => (
              <Card key={item.title} className="rounded-[28px]">
                <CardContent className="space-y-3 p-6">
                  <h3 className="text-lg font-semibold">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </section>
        </>
      )}

      {variant === "design-5" && (
        <>
          <section className="bg-white">
            <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-20 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
              <div className="space-y-6">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">
                  Elegant gold
                </p>
                <h1 className="text-5xl font-semibold leading-tight">
                  Diskrétní servis pro luxusní nemovitosti
                </h1>
                <p className="text-lg text-muted-foreground">
                  Nadstandardní klientská péče, exkluzivní nabídky a soukromé prohlídky.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Button size="lg" asChild>
                    <Link href={`/${variant}/nemovitosti`}>Exkluzivní nabídky</Link>
                  </Button>
                  <Button size="lg" variant="outline" asChild>
                    <Link href={`/${variant}/kontakty`}>Privátní konzultace</Link>
                  </Button>
                </div>
              </div>
              <div className="rounded-3xl border border-primary/20 bg-muted/20 p-6 shadow-xl">
                <HeroSearch />
              </div>
            </div>
          </section>

          <section className="mx-auto max-w-7xl space-y-8 px-4 py-16 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
                  Vybrané nabídky
                </p>
                <h2 className="mt-2 text-3xl font-semibold">Prémiové nemovitosti</h2>
              </div>
              <Button variant="outline" asChild>
                <Link href={`/${variant}/nemovitosti`} className="flex items-center gap-2">
                  Všechny nabídky
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
            <PropertyGrid properties={featured} />
          </section>
        </>
      )}

      <section className="mx-auto max-w-7xl space-y-8 px-4 pb-20 sm:px-6 lg:px-8">
        <Separator />
        <div className="grid gap-6 md:grid-cols-3">
          {latestPosts.map((post) => (
            <BlogCard key={post.id} post={post} />
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
