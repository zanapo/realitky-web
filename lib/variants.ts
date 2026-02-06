export const variants = [
  "design-1",
  "design-2",
  "design-3",
  "design-4",
  "design-5",
] as const;

export type Variant = (typeof variants)[number];

export const isVariant = (value: string): value is Variant =>
  variants.includes(value as Variant);
