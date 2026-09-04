"use client";

import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import Link from "next/link";
import L from "leaflet";
import cities from "@/data/cities.json";
import areas from "@/data/areas.json";
import { formatGBP, formatPercent } from "@/lib/utils/format";

// Fix default marker icons (Leaflet + Next.js/webpack issue)
const cityIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

const areaIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [17, 28],
  iconAnchor: [8, 28],
  popupAnchor: [1, -24],
});

export default function InteractiveMap() {
  const [showAreas, setShowAreas] = useState(true);

  return (
    <div>
      <div className="mb-4 flex gap-2">
        <button
          onClick={() => setShowAreas(false)}
          className={`rounded-md px-4 py-2 text-sm font-medium ${
            !showAreas ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-700"
          }`}
        >
          Cities
        </button>
        <button
          onClick={() => setShowAreas(true)}
          className={`rounded-md px-4 py-2 text-sm font-medium ${
            showAreas ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-700"
          }`}
        >
          Areas
        </button>
      </div>

      <div className="h-[600px] overflow-hidden rounded-xl ring-1 ring-slate-200">
        <MapContainer
          center={[54.5, -3.0]}
          zoom={6}
          scrollWheelZoom={true}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {!showAreas &&
            cities.map((city) => (
              <Marker key={city.slug} position={[city.latitude, city.longitude]} icon={cityIcon}>
                <Popup>
                  <div className="min-w-[180px]">
                    <p className="font-bold text-slate-900">{city.name}</p>
                    <p className="mt-1 text-xs text-slate-500">{city.tagline}</p>
                    <div className="mt-2 flex justify-between text-xs">
                      <span>Avg. price</span>
                      <span className="font-semibold">{formatGBP(city.avgPrice)}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span>Yield</span>
                      <span className="font-semibold text-emerald-600">{formatPercent(city.avgYield)}</span>
                    </div>
                    <Link
                      href={`/cities/${city.slug}`}
                      className="mt-2 block rounded bg-slate-900 px-3 py-1.5 text-center text-xs font-semibold text-white"
                    >
                      View Details
                    </Link>
                  </div>
                </Popup>
              </Marker>
            ))}

          {showAreas &&
            areas.map((area) => (
              <Marker key={area.slug} position={[area.latitude, area.longitude]} icon={areaIcon}>
                <Popup>
                  <div className="min-w-[180px]">
                    <p className="font-bold text-slate-900">{area.name}</p>
                    <p className="mt-1 text-xs text-slate-500">Score: {area.investmentScore}/10</p>
                    <div className="mt-2 flex justify-between text-xs">
                      <span>1-bed from</span>
                      <span className="font-semibold">{formatGBP(area.pricing.oneBed)}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span>Yield</span>
                      <span className="font-semibold text-emerald-600">{formatPercent(area.rentalYield)}</span>
                    </div>
                    <Link
                      href={`/cities/${area.citySlug}/${area.slug}`}
                      className="mt-2 block rounded bg-slate-900 px-3 py-1.5 text-center text-xs font-semibold text-white"
                    >
                      View Details
                    </Link>
                  </div>
                </Popup>
              </Marker>
            ))}
        </MapContainer>
      </div>
    </div>
  );
}
