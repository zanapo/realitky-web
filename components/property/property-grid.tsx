import type { Property } from "@/lib/types";

import { PropertyCard } from "./property-card";

export const PropertyGrid = ({ properties }: { properties: Property[] }) => (
  <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
    {properties.map((property) => (
      <PropertyCard key={property.id} property={property} />
    ))}
  </div>
);
