import propertiesData from "@/content/properties.json";
import { filterProperties, sortProperties } from "@/lib/filters";
import type { Property, PropertyFilters } from "@/lib/types";

const properties = propertiesData as Property[];

export class MockPropertyDataSource {
  async getAll(): Promise<Property[]> {
    return properties;
  }

  async getBySlug(slug: string): Promise<Property | null> {
    return properties.find((property) => property.slug === slug) ?? null;
  }

  async getFeatured(count: number): Promise<Property[]> {
    return properties
      .filter((property) => property.features.includes("Top nabídka"))
      .slice(0, count);
  }

  async getLatest(count: number): Promise<Property[]> {
    return [...properties]
      .sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      )
      .slice(0, count);
  }

  async search(filters: PropertyFilters): Promise<Property[]> {
    const filtered = filterProperties(properties, filters);
    return sortProperties(filtered, filters);
  }
}
