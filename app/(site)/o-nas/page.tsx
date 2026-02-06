import { Award, HeartHandshake, Users } from "lucide-react";

import { Breadcrumbs } from "@/components/breadcrumbs";
import { PageHeader } from "@/components/sections/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { buildMetadata } from "@/lib/seo/metadata";
import { breadcrumbJsonLd } from "@/lib/seo/jsonld";
import { siteConfig } from "@/lib/seo/site";

export const metadata = buildMetadata("O nás");

export default function AboutPage() {
  const jsonLd = breadcrumbJsonLd([
    { name: "Domů", url: siteConfig.url },
    { name: "O nás", url: `${siteConfig.url}/o-nas` },
  ]);

  return (
    <div className="mx-auto max-w-6xl space-y-10 px-4 py-10 sm:px-6 lg:px-8">
      <Breadcrumbs items={[{ href: "/", label: "Domů" }, { label: "O nás" }]} />
      <PageHeader
        title="Realitní dům s osobním přístupem"
        description="Jsme tým profesionálů, kteří spojují moderní marketing, precizní servis a hlubokou znalost regionu."
      />
      <div className="grid gap-6 md:grid-cols-3">
        {[
          {
            title: "Zkušený tým",
            description:
              "Každý makléř je certifikovaný a pravidelně prochází školením.",
            icon: Users,
          },
          {
            title: "Etický kodex",
            description:
              "Držíme se transparentních postupů a férových smluvních podmínek.",
            icon: HeartHandshake,
          },
          {
            title: "Špičková prezentace",
            description:
              "Prémiové fotografie, video a marketingová podpora jsou standardem.",
            icon: Award,
          },
        ].map((item) => (
          <Card key={item.title}>
            <CardContent className="space-y-4 p-6">
              <item.icon className="h-8 w-8 text-primary" />
              <h3 className="text-lg font-semibold">{item.title}</h3>
              <p className="text-sm text-muted-foreground">{item.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="rounded-3xl border bg-muted/30 p-8 text-muted-foreground">
        <p>
          Od prvního setkání až po podpis smlouvy jsme vaším partnerem. Věříme v
          dlouhodobé vztahy a budujeme důvěru, která je na realitním trhu
          klíčová.
        </p>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </div>
  );
}
