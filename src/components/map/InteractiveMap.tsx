"use client";

import { useState, useMemo, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import Link from "next/link";
import L from "leaflet";
import cities from "@/data/cities.json";
import areas from "@/data/areas.json";
import { formatGBP, formatPercent } from "@/lib/utils/format";

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

type SearchResult =
  | { type: "city"; data: (typeof cities)[number] }
  | { type: "area"; data: (typeof areas)[number] };

function FlyToLocation({ lat, lng, zoom }: { lat: number; lng: number; zoom: number }) {
  const map = useMap();
  map.flyTo([lat, lng], zoom, { duration: 1.2 });
  return null;
}

export default function InteractiveMap() {
  const [showAreas, setShowAreas] = useState(true);
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<SearchResult | null>(null);
  const [flyTarget, setFlyTarget] = useState<{ lat: number; lng: number; zoom: number } | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const suggestions = useMemo(() => {
    if (query.trim().length < 2) return [];
    const q = query.toLowerCase();
    const cityMatches: SearchResult[] = cities
      .filter((c) => c.name.toLowerCase().includes(q))
      .map((c) => ({ type: "city", data: c }));
    const areaMatches: SearchResult[] = areas
      .filter((a) => a.name.toLowerCase().includes(q))
      .map((a) => ({ type: "area", data: a }));
    return [...cityMatches, ...areaMatches].slice(0, 8);
  }, [query]);

  function selectResult(result: SearchResult) {
    setSelected(result);
    setQuery(result.data.name);
    setFlyTarget({
      lat: result.data.latitude,
      lng: result.data.longitude,
      zoom: result.type === "city" ? 12 : 15,
    });
    inputRef.current?.blur();
  }

  return (
    <div>
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelected(null);
            }}
            placeholder="Search city or area (e.g., Manchester, Stratford)"
            className="w-full rounded-md border border-slate-300 px-4 py-2.5 text-sm focus:border-slate-500 focus:outline-none"
          />
          {suggestions.length > 0 && !selected && (
            <div className="absolute z-[1000] mt-1 w-full rounded-md bg-white shadow-lg ring-1 ring-slate-200">
              {suggestions.map((s) => (
                <button
                  key={`${s.type}-${s.data.slug}`}
                  onClick={() => selectResult(s)}
                  className="flex w-full items-center justify-between px-4 py-2.5 text-left text-sm hover:bg-slate-50"
                >
                  <span className="font-medium text-slate-900">{s.data.name}</span>
                  <span className="text-xs text-slate-400">{s.type === "city" ? "City" : "Area"}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => setShowAreas(false)}
            className={`rounded-md px-4 py-2.5 text-sm font-medium ${
              !showAreas ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-700"
            }`}
          >
            Cities
          </button>
          <button
            onClick={() => setShowAreas(true)}
            className={`rounded-md px-4 py-2.5 text-sm font-medium ${
              showAreas ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-700"
            }`}
          >
            Areas
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="h-[600px] overflow-hidden rounded-xl ring-1 ring-slate-200 lg:col-span-2">
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

            {flyTarget && (
              <FlyToLocation lat={flyTarget.lat} lng={flyTarget.lng} zoom={flyTarget.zoom} />
            )}

            {!showAreas &&
              cities.map((city) => (
                <Marker key={city.slug} position={[city.latitude, city.longitude]} icon={cityIcon}>
                  <Popup>
                    <div className="min-w-[180px]">
                      <p className="font-bold text-slate-900">{city.name}</p>
                      <p className="mt-1 text-xs text-slate-500">{city.tagline}</p>
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

        <div className="rounded-xl bg-slate-50 p-6">
          {!selected ? (
            <p className="text-sm text-slate-500">
              Search for a city or area above, or click a marker on the map to see details here.
            </p>
          ) : selected.type === "city" ? (
            <div>
              <div className="h-32 rounded-lg bg-gradient-to-br from-slate-800 to-slate-600" />
              <h2 className="mt-4 text-xl font-bold text-slate-900">{selected.data.name}</h2>
              <p className="mt-1 text-sm text-slate-500">{selected.data.tagline}</p>
              <div className="mt-4 space-y-2 border-t border-slate-200 pt-4">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Avg. price</span>
                  <span className="font-semibold text-slate-900">{formatGBP(selected.data.avgPrice)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Rental yield</span>
                  <span className="font-semibold text-emerald-600">{formatPercent(selected.data.avgYield)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">5yr growth</span>
                  <span className="font-semibold text-emerald-600">{formatPercent(selected.data.growthRate)}</span>
                </div>
              </div>
              <p className="mt-4 text-sm text-slate-600">{selected.data.description}</p>
              <Link
                href={`/cities/${selected.data.slug}`}
                className="mt-5 block rounded-md bg-slate-900 px-4 py-2.5 text-center text-sm font-semibold text-white hover:bg-slate-700"
              >
                View Full Details
              </Link>
            </div>
          ) : (
            <div>
              <div className="h-32 rounded-lg bg-gradient-to-br from-slate-800 to-slate-600" />
              <div className="mt-4 flex items-center justify-between">
                <h2 className="text-xl font-bold text-slate-900">{selected.data.name}</h2>
                <span className="rounded-full bg-slate-900 px-2 py-0.5 text-xs font-semibold text-white">
                  {selected.data.investmentScore}/10
                </span>
              </div>
              <div className="mt-4 space-y-2 border-t border-slate-200 pt-4">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">1-bed from</span>
                  <span className="font-semibold text-slate-900">{formatGBP(selected.data.pricing.oneBed)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Rental yield</span>
                  <span className="font-semibold text-emerald-600">{formatPercent(selected.data.rentalYield)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">5yr growth</span>
                  <span className="font-semibold text-emerald-600">{formatPercent(selected.data.growthProjection)}</span>
                </div>
              </div>
              <p className="mt-4 text-sm text-slate-600">{selected.data.overview}</p>
              <Link
                href={`/cities/${selected.data.citySlug}/${selected.data.slug}`}
                className="mt-5 block rounded-md bg-slate-900 px-4 py-2.5 text-center text-sm font-semibold text-white hover:bg-slate-700"
              >
                View Full Details
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
