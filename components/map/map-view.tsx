"use client";

import "leaflet/dist/leaflet.css";

import { MapContainer, Marker, TileLayer } from "react-leaflet";
import L from "leaflet";

import { cn } from "@/lib/utils";

const markerIcon = new L.Icon({
  iconUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

type MapViewProps = {
  lat: number;
  lng: number;
  className?: string;
};

export const MapView = ({ lat, lng, className }: MapViewProps) => (
  <div className={cn("h-80 w-full overflow-hidden rounded-2xl", className)}>
    <MapContainer
      center={[lat, lng]}
      zoom={13}
      scrollWheelZoom={false}
      className="h-full w-full"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[lat, lng]} icon={markerIcon} />
    </MapContainer>
  </div>
);
