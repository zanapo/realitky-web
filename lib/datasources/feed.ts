import { XMLParser } from "fast-xml-parser";

import { filterProperties, sortProperties } from "@/lib/filters";
import { slugify } from "@/lib/slugify";
import type { Property, PropertyFilters } from "@/lib/types";

type FeedPayload = Record<string, unknown> | unknown[];

const parser = new XMLParser({
  ignoreAttributes: false,
  attributeNamePrefix: "",
});

const parsePayload = async (url: string): Promise<FeedPayload> => {
  const response = await fetch(url, { next: { revalidate: 60 } });
  if (!response.ok) {
    throw new Error(`Feed request failed with status ${response.status}`);
  }
  const text = await response.text();
  const trimmed = text.trim();
  if (trimmed.startsWith("{") || trimmed.startsWith("[")) {
    return JSON.parse(trimmed) as FeedPayload;
  }
  return parser.parse(trimmed) as FeedPayload;
};

const extractItems = (payload: FeedPayload): Record<string, unknown>[] => {
  if (Array.isArray(payload)) {
    return payload as Record<string, unknown>[];
  }
  if (payload && typeof payload === "object") {
    const candidates = [
      (payload as Record<string, unknown>).properties,
      (payload as Record<string, unknown>).items,
      (payload as Record<string, unknown>).data,
      (payload as Record<string, unknown>).property,
    ];
    const found = candidates.find((item) => item !== undefined);
    if (Array.isArray(found)) {
      return found as Record<string, unknown>[];
    }
    if (found && typeof found === "object") {
      return [found as Record<string, unknown>];
    }
  }
  return [];
};

const toStringValue = (value: unknown, fallback = "") =>
  typeof value === "string" ? value : value == null ? fallback : String(value);

const toNumberValue = (value: unknown, fallback = 0) => {
  const parsed =
    typeof value === "number"
      ? value
      : typeof value === "string"
        ? Number(value.replace(/\s/g, "").replace(",", "."))
        : NaN;
  return Number.isFinite(parsed) ? parsed : fallback;
};

const mapItemToProperty = (item: Record<string, unknown>, index: number) => {
  const title = toStringValue(item.title ?? item.name ?? item.nazev, "");
  const slug =
    toStringValue(item.slug) ||
    slugify(title || `nemovitost-${index + 1}`);

  return {
    id: toStringValue(item.id ?? item.uuid ?? `${index + 1}`),
    slug,
    title: title || "Nemovitost",
    transactionType: toStringValue(
      item.transactionType ?? item.transaction ?? item.typ_obchodu,
      "prodej"
    ) as Property["transactionType"],
    propertyType: toStringValue(
      item.propertyType ?? item.type ?? item.typ_nemovitosti,
      "byt"
    ) as Property["propertyType"],
    disposition: toStringValue(
      item.disposition ?? item.dispozice,
      "2+kk"
    ) as Property["disposition"],
    locality: toStringValue(item.locality ?? item.lokalita, "Ostrava"),
    district: toStringValue(item.district ?? item.okres, "Moravskoslezský"),
    price: toNumberValue(item.price ?? item.cena, 0),
    currency: toStringValue(item.currency ?? item.mena, "CZK") as Property["currency"],
    area: toNumberValue(item.area ?? item.plocha, 0),
    description: toStringValue(item.description ?? item.popis, ""),
    images: Array.isArray(item.images)
      ? (item.images as unknown[]).map((image) => toStringValue(image))
      : ["/images/property-1.svg"],
    features: Array.isArray(item.features)
      ? (item.features as unknown[]).map((feature) => toStringValue(feature))
      : ["Původní stav"],
    lat: toNumberValue(item.lat ?? item.latitude, 49.834),
    lng: toNumberValue(item.lng ?? item.longitude, 18.282),
    agent: {
      name: toStringValue(item.agentName ?? item.makler, "Makléř"),
      phone: toStringValue(item.agentPhone ?? item.telefon, "+420 000 000 000"),
      email: toStringValue(item.agentEmail ?? item.email, "info@realitka.cz"),
      photo: toStringValue(
        item.agentPhoto ?? item.foto,
        "/images/agent-1.svg"
      ),
    },
    createdAt: toStringValue(item.createdAt ?? item.created, new Date().toISOString()),
    updatedAt: toStringValue(item.updatedAt ?? item.updated, new Date().toISOString()),
  } satisfies Property;
};

export class FeedPropertyDataSource {
  async getAll(): Promise<Property[]> {
    const url = process.env.PROPERTIES_FEED_URL;
    if (!url) {
      throw new Error("PROPERTIES_FEED_URL is not set.");
    }
    const payload = await parsePayload(url);
    return extractItems(payload).map(mapItemToProperty);
  }

  async getBySlug(slug: string): Promise<Property | null> {
    const properties = await this.getAll();
    return properties.find((property) => property.slug === slug) ?? null;
  }

  async getFeatured(count: number): Promise<Property[]> {
    const properties = await this.getAll();
    return properties
      .filter((property) => property.features.includes("Top nabídka"))
      .slice(0, count);
  }

  async getLatest(count: number): Promise<Property[]> {
    const properties = await this.getAll();
    return [...properties]
      .sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      )
      .slice(0, count);
  }

  async search(filters: PropertyFilters): Promise<Property[]> {
    const properties = await this.getAll();
    const filtered = filterProperties(properties, filters);
    return sortProperties(filtered, filters);
  }
}
