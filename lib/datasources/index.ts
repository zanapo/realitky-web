import { cache } from "react";

import { FeedPropertyDataSource } from "@/lib/datasources/feed";
import { MockPropertyDataSource } from "@/lib/datasources/mock";
import type { Property, PropertyFilters } from "@/lib/types";

export type PropertyDataSource = {
  getAll: () => Promise<Property[]>;
  getBySlug: (slug: string) => Promise<Property | null>;
  getFeatured: (count: number) => Promise<Property[]>;
  getLatest: (count: number) => Promise<Property[]>;
  search: (filters: PropertyFilters) => Promise<Property[]>;
};

const buildDataSource = () => {
  if (process.env.DATA_SOURCE === "feed") {
    return new FeedPropertyDataSource();
  }
  return new MockPropertyDataSource();
};

export const getPropertyDataSource = cache(buildDataSource);
