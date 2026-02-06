import Link from "next/link";

import { Breadcrumbs } from "@/components/breadcrumbs";
import { PageHeader } from "@/components/sections/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata = buildMetadata("Rozcestník designů");

const variants = [
  { id: "design-1", title: "Design 1 — Modern clean" },
  { id: "design-2", title: "Design 2 — Soft emerald" },
  { id: "design-3", title: "Design 3 — Editorial warm" },
  { id: "design-4", title: "Design 4 — Rounded minimal" },
  { id: "design-5", title: "Design 5 — Elegant gold" },
];

export default function DesignIndexPage() {
  return (
    <div className="mx-auto max-w-5xl space-y-10 px-4 py-10 sm:px-6 lg:px-8">
      <Breadcrumbs items={[{ href: "/", label: "Domů" }, { label: "Rozcestník" }]} />
      <PageHeader
        title="Rozcestník designů"
        description="Vyberte si jednu z pěti variant. Každá varianta má vlastní vizuální styl napříč celým webem."
      />
      <div className="grid gap-6 md:grid-cols-2">
        {variants.map((variant) => (
          <Link key={variant.id} href={`/${variant.id}`}>
            <Card className="h-full transition-shadow hover:shadow-lg">
              <CardContent className="space-y-2 p-6">
                <p className="text-sm text-muted-foreground">{variant.id}</p>
                <h2 className="text-xl font-semibold">{variant.title}</h2>
                <p className="text-sm text-muted-foreground">
                  Otevřít variantu a projít celý web.
                </p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
