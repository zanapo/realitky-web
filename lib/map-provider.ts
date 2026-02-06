export type MapProvider = "leaflet" | "google";

export const mapProvider =
  (process.env.NEXT_PUBLIC_MAP_PROVIDER as MapProvider) ?? "leaflet";
