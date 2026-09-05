"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import Link from "next/link";
import L from "leaflet";
import Fuse from "fuse.js";
import { formatGBP, formatPercent } from "@/lib/utils/format";
import type { City } from "@/types/city";
import type { Area } from "@/types/area";

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
  | { type: "city"; data: City }
  | { type: "area"; data: Area };


function FlyToLocation({ lat, lng, zoom }: { lat: number; lng: number; zoom: number }) {
  const map = useMap();
  useEffect(() => {
    map.flyTo([lat, lng], zoom, { duration: 1.2 });
  }, [lat, lng, zoom, map]);
  return null;
}

function getWhatsappUrl(name: string): string {
  const message = "Hi, I am interested in investment opportunities in " + name + ". Can you tell me more?";
  return "https://wa.me/?text=" + encodeURIComponent(message);
}

export default function InteractiveMap({ cities, areas }: { cities: City[]; areas: Area[] }) {
  const [showAreas, setShowAreas] = useState(true);
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<SearchResult | null>(null);
  const [flyTarget, setFlyTarget] = useState<{ lat: number; lng: number; zoom: number } | null>(null);
  const [highlightIndex, setHighlightIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const fuse = useMemo(() => {
    const searchIndex: SearchResult[] = [
      ...cities.map((c) => ({ type: "city" as const, data: c })),
      ...areas.map((a) => ({ type: "area" as const, data: a })),
    ];
    return new Fuse(searchIndex, { keys: ["data.name"], threshold: 0.3, distance: 100 });
  }, [cities, areas]);

  const suggestions = useMemo(() => {
    if (query.trim().length === 0) return [];
    return fuse.search(query).slice(0, 8).map((r) => r.item);
  }, [query, fuse]);

  useEffect(() => {
    setHighlightIndex(0);
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

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (suggestions.length === 0) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightIndex((i) => Math.min(i + 1, suggestions.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      selectResult(suggestions[highlightIndex]);
    } else if (e.key === "Escape") {
      setQuery("");
      inputRef.current?.blur();
    }
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
            onKeyDown={handleKeyDown}
            placeholder="Search any city or area"
            className="w-full rounded-md border border-slate-300 px-4 py-2.5 text-sm focus:border-slate-500 focus:outline-none"
          />
          {suggestions.length > 0 && !selected && (
            <div className="absolute z-[1000] mt-1 w-full overflow-hidden rounded-md bg-white shadow-lg ring-1 ring-slate-200">
              {suggestions.map((s, i) => (
                <button
                  key={s.type + "-" + s.data.slug}
                  onClick={() => selectResult(s)}
                  onMouseEnter={() => setHighlightIndex(i)}
                  className={"flex w-full items-center justify-between px-4 py-2.5 text-left text-sm " + (i === highlightIndex ? "bg-slate-100" : "hover:bg-slate-50")}
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
            className={"rounded-md px-4 py-2.5 text-sm font-medium " + (!showAreas ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-700")}
          >
            Cities
          </button>
          <button
            onClick={() => setShowAreas(true)}
            className={"rounded-md px-4 py-2.5 text-sm font-medium " + (showAreas ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-700")}
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
              attribution='&copy; OpenStreetMap contributors'
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
                        href={"/cities/" + city.slug}
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
                        href={"/cities/" + area.citySlug + "/" + area.slug}
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
          {!selected && (
            <div>
              <p className="text-sm text-slate-500">
                Search for a city or area above, or click a marker on the map to see details here.
              </p>
              <p className="mt-3 text-xs text-slate-400">
                Tip: use arrow keys and Enter to navigate search results quickly.
              </p>
            </div>
          )}

          {selected && selected.type === "city" && (
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

              <div className="mt-5 space-y-2">
                <Link
                  href={"/cities/" + selected.data.slug}
                  className="block rounded-md bg-slate-900 px-4 py-2.5 text-center text-sm font-semibold text-white hover:bg-slate-700"
                >
                  View Full Details
                </Link>
                <Link
                  href="/valuation"
                  className="block rounded-md border border-slate-300 px-4 py-2.5 text-center text-sm font-semibold text-slate-700 hover:bg-white"
                >
                  Get Instant Valuation
                </Link>
                  <a
                  href={getWhatsappUrl(selected.data.name)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block rounded-md bg-emerald-600 px-4 py-2.5 text-center text-sm font-semibold text-white hover:bg-emerald-700"
                >
                  WhatsApp an Agent
                </a>
              </div>
            </div>
          )}

          {selected && selected.type === "area" && (
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

              <div className="mt-5 space-y-2">
                <Link
                  href={"/cities/" + selected.data.citySlug + "/" + selected.data.slug}
                  className="block rounded-md bg-slate-900 px-4 py-2.5 text-center text-sm font-semibold text-white hover:bg-slate-700"
                >
                  View Full Details
                </Link>
                <Link
                  href="/valuation"
                  className="block rounded-md border border-slate-300 px-4 py-2.5 text-center text-sm font-semibold text-slate-700 hover:bg-white"
                >
                  Get Instant Valuation
                </Link>
                  <a
                  href={getWhatsappUrl(selected.data.name)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block rounded-md bg-emerald-600 px-4 py-2.5 text-center text-sm font-semibold text-white hover:bg-emerald-700"
                >
                  WhatsApp an Agent
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
