import { getAllCities, getAllAreas } from "@/lib/database/content";
import MapLoader from "@/components/map/MapLoader";

export const revalidate = 3600;

export default async function MapPage() {
  const [cities, areas] = await Promise.all([getAllCities(), getAllAreas()]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-slate-900">Explore on the Map</h1>
      <p className="mt-3 max-w-xl text-slate-600">
        Browse UK cities and areas visually. Click a marker for pricing, yield, and a link to full
        details.
      </p>
      <div className="mt-10">
        <MapLoader cities={cities} areas={areas} />
      </div>
    </div>
  );
}
