"use client";

import dynamic from "next/dynamic";

import { mapProvider } from "@/lib/map-provider";
import { cn } from "@/lib/utils";

const LeafletMap = dynamic(() => import("./map-view").then((m) => m.MapView), {
  ssr: false,
});

type MapRendererProps = {
  lat: number;
  lng: number;
  className?: string;
};

export const MapRenderer = ({ lat, lng, className }: MapRendererProps) => {
  if (mapProvider === "google") {
    return (
      <div
        className={cn(
          "flex h-80 items-center justify-center rounded-2xl border border-dashed text-sm text-muted-foreground",
          className
        )}
      >
        Google Maps adapter není zatím aktivní.
      </div>
    );
  }

  return <LeafletMap lat={lat} lng={lng} className={className} />;
};
