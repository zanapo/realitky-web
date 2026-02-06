import Link from "next/link";
import { Filter } from "lucide-react";

import { Breadcrumbs } from "@/components/breadcrumbs";
import { PropertyFilters } from "@/components/property/property-filters";
import { PaginationLinks } from "@/components/property/pagination-links";
import { PropertyGrid } from "@/components/property/property-grid";
import { SortSelect } from "@/components/property/sort-select";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { getPropertyDataSource } from "@/lib/datasources";
import { paginate, parseFilters } from "@/lib/filters";
import { buildMetadata } from "@/lib/seo/metadata";
import { breadcrumbJsonLd } from "@/lib/seo/jsonld";
import { siteConfig } from "@/lib/seo/site";

export const metadata = buildMetadata("Nemovitosti");

type ListingPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function ListingPage({ searchParams }: ListingPageProps) {
  const resolvedSearchParams = await searchParams;
  const filters = parseFilters(resolvedSearchParams);
  const dataSource = getPropertyDataSource();
  const filtered = await dataSource.search(filters);
  const pagination = paginate(filtered, filters.page ?? 1, filters.perPage ?? 9);

  const jsonLd = breadcrumbJsonLd([
    { name: "Domů", url: siteConfig.url },
    { name: "Nemovitosti", url: `${siteConfig.url}/nemovitosti` },
  ]);

  const baseParams = Object.fromEntries(
    Object.entries(resolvedSearchParams).map(([key, value]) => [
      key,
      Array.isArray(value) ? value.join(",") : value,
    ])
  );

  return (
    <div className="mx-auto max-w-7xl space-y-8 px-4 py-10 sm:px-6 lg:px-8">
      <Breadcrumbs
        items={[
          { href: "/", label: "Domů" },
          { label: "Nemovitosti" },
        ]}
      />
      <div className="flex flex-col gap-6 lg:flex-row">
        <aside className="hidden w-72 shrink-0 lg:block">
          <Card className="p-6">
            <PropertyFilters />
          </Card>
        </aside>
        <div className="flex-1 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-semibold">Nemovitosti</h1>
              <p className="text-sm text-muted-foreground">
                Nalezeno {pagination.total} nabídek
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" className="gap-2 lg:hidden">
                    <Filter className="h-4 w-4" />
                    Filtry
                  </Button>
                </SheetTrigger>
                <SheetContent className="w-full max-w-sm">
                  <SheetHeader>
                    <SheetTitle>Filtry</SheetTitle>
                  </SheetHeader>
                  <div className="mt-6">
                    <PropertyFilters />
                  </div>
                </SheetContent>
              </Sheet>
              <SortSelect />
            </div>
          </div>
          {pagination.items.length > 0 ? (
            <PropertyGrid properties={pagination.items} />
          ) : (
            <Card className="p-10 text-center text-sm text-muted-foreground">
              Pro zvolené filtry jsme nenašli žádné nabídky.
            </Card>
          )}
          <PaginationLinks
            page={pagination.page}
            totalPages={pagination.totalPages}
            baseParams={baseParams}
          />
          <Button variant="outline" asChild className="w-full md:w-auto">
            <Link href="/kontakty">Chci poradit s výběrem</Link>
          </Button>
        </div>
      </div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </div>
  );
}
