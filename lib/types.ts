export type TransactionType = "prodej" | "pronajem";
export type PropertyType =
  | "byt"
  | "dum"
  | "pozemek"
  | "komerce"
  | "chalupa"
  | "garaz";

export type Disposition =
  | "1+kk"
  | "1+1"
  | "2+kk"
  | "2+1"
  | "3+kk"
  | "3+1"
  | "4+kk"
  | "4+1"
  | "5+kk"
  | "5+1"
  | "6+kk"
  | "6+1"
  | "atyp";

export type Currency = "CZK" | "EUR";

export type Agent = {
  name: string;
  phone: string;
  email: string;
  photo: string;
};

export type Property = {
  id: string;
  slug: string;
  title: string;
  transactionType: TransactionType;
  propertyType: PropertyType;
  disposition: Disposition;
  locality: string;
  district: string;
  price: number;
  currency: Currency;
  area: number;
  description: string;
  images: string[];
  features: string[];
  lat: number;
  lng: number;
  agent: Agent;
  createdAt: string;
  updatedAt: string;
};

export type PropertyFilters = {
  transactionType?: TransactionType;
  propertyType?: PropertyType;
  disposition?: Disposition;
  locality?: string;
  district?: string;
  priceFrom?: number;
  priceTo?: number;
  areaFrom?: number;
  areaTo?: number;
  condition?: string;
  features?: string[];
  sort?: "newest" | "price-asc" | "price-desc" | "area-desc";
  page?: number;
  perPage?: number;
};

export type PaginatedResult<T> = {
  items: T[];
  total: number;
  page: number;
  perPage: number;
  totalPages: number;
};
