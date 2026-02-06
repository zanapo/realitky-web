import { describe, expect, it } from "vitest";

import { filterProperties, parseFilters } from "@/lib/filters";
import type { Property } from "@/lib/types";

const sample: Property[] = [
  {
    id: "1",
    slug: "test-1",
    title: "Test 1",
    transactionType: "prodej",
    propertyType: "byt",
    disposition: "2+kk",
    locality: "Ostrava",
    district: "Ostrava-město",
    price: 5000000,
    currency: "CZK",
    area: 60,
    description: "Test",
    images: ["/images/property-1.svg"],
    features: ["Balkon", "Novostavba"],
    lat: 49.8,
    lng: 18.2,
    agent: {
      name: "Makléř",
      phone: "+420 000 000 000",
      email: "a@b.cz",
      photo: "/images/agent-1.svg",
    },
    createdAt: "2026-01-01T10:00:00.000Z",
    updatedAt: "2026-01-02T10:00:00.000Z",
  },
  {
    id: "2",
    slug: "test-2",
    title: "Test 2",
    transactionType: "pronajem",
    propertyType: "dum",
    disposition: "4+kk",
    locality: "Opava",
    district: "Opava",
    price: 25000,
    currency: "CZK",
    area: 120,
    description: "Test",
    images: ["/images/property-2.svg"],
    features: ["Zahrada", "Původní stav"],
    lat: 49.9,
    lng: 18.0,
    agent: {
      name: "Makléř",
      phone: "+420 000 000 000",
      email: "a@b.cz",
      photo: "/images/agent-1.svg",
    },
    createdAt: "2026-01-03T10:00:00.000Z",
    updatedAt: "2026-01-04T10:00:00.000Z",
  },
];

describe("filters", () => {
  it("parses numeric filter values", () => {
    const filters = parseFilters({ priceFrom: "1000000", areaTo: "80" });
    expect(filters.priceFrom).toBe(1000000);
    expect(filters.areaTo).toBe(80);
  });

  it("filters by transaction type", () => {
    const filtered = filterProperties(sample, { transactionType: "prodej" });
    expect(filtered).toHaveLength(1);
    expect(filtered[0].slug).toBe("test-1");
  });

  it("filters by condition (features)", () => {
    const filtered = filterProperties(sample, { condition: "Novostavba" });
    expect(filtered).toHaveLength(1);
    expect(filtered[0].slug).toBe("test-1");
  });
});
