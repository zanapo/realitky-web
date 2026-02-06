import Image from "next/image";
import Link from "next/link";
import { MapPin, Maximize2 } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { formatArea, formatPrice } from "@/lib/formatters";
import type { Property } from "@/lib/types";

export const PropertyCard = ({ property }: { property: Property }) => (
  <Card className="overflow-hidden border-muted/60 transition-shadow hover:shadow-lg">
    <Link href={`/nemovitosti/${property.slug}`} className="block">
      <div className="relative h-56 w-full overflow-hidden">
        <Image
          src={property.images[0]}
          alt={property.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover"
        />
        <div className="absolute left-4 top-4 flex flex-wrap gap-2">
          <Badge variant="secondary" className="bg-white/90 text-foreground">
            {property.transactionType === "prodej" ? "Prodej" : "Pronájem"}
          </Badge>
          {property.features.includes("Top nabídka") && (
            <Badge className="bg-primary text-primary-foreground">
              Top nabídka
            </Badge>
          )}
        </div>
      </div>
    </Link>
    <CardContent className="space-y-3 p-5">
      <div>
        <h3 className="text-lg font-semibold">{property.title}</h3>
        <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
          <MapPin className="h-4 w-4" />
          {property.locality}
        </div>
      </div>
      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <span>{property.disposition}</span>
        <span className="flex items-center gap-2">
          <Maximize2 className="h-4 w-4" />
          {formatArea(property.area)} m²
        </span>
      </div>
      <div className="text-lg font-semibold text-foreground">
        {formatPrice(property.price, property.currency)}
      </div>
    </CardContent>
  </Card>
);
