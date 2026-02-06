import type { Currency } from "@/lib/types";

const currencyFormatters: Record<Currency, Intl.NumberFormat> = {
  CZK: new Intl.NumberFormat("cs-CZ", {
    style: "currency",
    currency: "CZK",
    maximumFractionDigits: 0,
  }),
  EUR: new Intl.NumberFormat("cs-CZ", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }),
};

export const formatPrice = (value: number, currency: Currency) =>
  currencyFormatters[currency].format(value);

export const formatArea = (value: number) =>
  new Intl.NumberFormat("cs-CZ", {
    maximumFractionDigits: 0,
  }).format(value);

export const formatDate = (value: string) =>
  new Intl.DateTimeFormat("cs-CZ", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(new Date(value));
