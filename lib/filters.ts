import type { Property, PropertyFilters } from "@/lib/types";

const conditionOptions = ["Novostavba", "Po rekonstrukci", "Původní stav"];

const normalizeString = (value: string) => value.trim().toLowerCase();

const toNumber = (value: string | undefined) => {
  if (!value) {
    return undefined;
  }
  const parsed = Number(value.replace(/\s/g, "").replace(",", "."));
  return Number.isFinite(parsed) ? parsed : undefined;
};

export const parseFilters = (
  searchParams: Record<string, string | string[] | undefined>
): PropertyFilters => {
  const getParam = (key: string) => {
    const value = searchParams[key];
    if (Array.isArray(value)) {
      return value[0];
    }
    return value;
  };

  const getArrayParam = (key: string) => {
    const value = searchParams[key];
    if (!value) return undefined;
    if (Array.isArray(value)) return value;
    return value.split(",").map((entry) => entry.trim());
  };

  return {
    transactionType: getParam("transactionType") as PropertyFilters["transactionType"],
    propertyType: getParam("propertyType") as PropertyFilters["propertyType"],
    disposition: getParam("disposition") as PropertyFilters["disposition"],
    locality: getParam("locality"),
    district: getParam("district"),
    priceFrom: toNumber(getParam("priceFrom")),
    priceTo: toNumber(getParam("priceTo")),
    areaFrom: toNumber(getParam("areaFrom")),
    areaTo: toNumber(getParam("areaTo")),
    condition: getParam("condition"),
    features: getArrayParam("features"),
    sort: getParam("sort") as PropertyFilters["sort"],
    page: Number(getParam("page") ?? 1) || 1,
    perPage: Number(getParam("perPage") ?? 9) || 9,
  };
};

export const filterProperties = (
  properties: Property[],
  filters: PropertyFilters
) => {
  const normalizedLocality = filters.locality
    ? normalizeString(filters.locality)
    : undefined;
  const normalizedDistrict = filters.district
    ? normalizeString(filters.district)
    : undefined;

  return properties.filter((property) => {
    if (filters.transactionType && property.transactionType !== filters.transactionType) {
      return false;
    }
    if (filters.propertyType && property.propertyType !== filters.propertyType) {
      return false;
    }
    if (filters.disposition && property.disposition !== filters.disposition) {
      return false;
    }
    if (
      normalizedLocality &&
      !normalizeString(property.locality).includes(normalizedLocality)
    ) {
      return false;
    }
    if (
      normalizedDistrict &&
      !normalizeString(property.district).includes(normalizedDistrict)
    ) {
      return false;
    }
    if (filters.priceFrom && property.price < filters.priceFrom) {
      return false;
    }
    if (filters.priceTo && property.price > filters.priceTo) {
      return false;
    }
    if (filters.areaFrom && property.area < filters.areaFrom) {
      return false;
    }
    if (filters.areaTo && property.area > filters.areaTo) {
      return false;
    }
    if (filters.condition) {
      const hasCondition = property.features.some((feature) =>
        conditionOptions.includes(feature)
      );
      if (!hasCondition || !property.features.includes(filters.condition)) {
        return false;
      }
    }
    if (filters.features && filters.features.length > 0) {
      const hasAll = filters.features.every((feature) =>
        property.features.includes(feature)
      );
      if (!hasAll) return false;
    }
    return true;
  });
};

export const sortProperties = (
  properties: Property[],
  filters: PropertyFilters
) => {
  const sorted = [...properties];
  switch (filters.sort) {
    case "price-asc":
      return sorted.sort((a, b) => a.price - b.price);
    case "price-desc":
      return sorted.sort((a, b) => b.price - a.price);
    case "area-desc":
      return sorted.sort((a, b) => b.area - a.area);
    default:
      return sorted.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
  }
};

export const paginate = <T,>(
  items: T[],
  page: number,
  perPage: number
) => {
  const safePage = Math.max(page, 1);
  const safePerPage = Math.max(perPage, 1);
  const total = items.length;
  const totalPages = Math.max(1, Math.ceil(total / safePerPage));
  const start = (safePage - 1) * safePerPage;
  const paged = items.slice(start, start + safePerPage);
  return { items: paged, total, page: safePage, perPage: safePerPage, totalPages };
};
