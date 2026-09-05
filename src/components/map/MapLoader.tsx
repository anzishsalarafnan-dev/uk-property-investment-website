"use client";

import dynamic from "next/dynamic";
import type { City } from "@/types/city";
import type { Area } from "@/types/area";

const InteractiveMap = dynamic(() => import("@/components/map/InteractiveMap"), {
  ssr: false,
  loading: () => (
    <div className="flex h-[600px] items-center justify-center rounded-xl bg-slate-50 text-slate-600">
      Loading map...
    </div>
  ),
});

export default function MapLoader({ cities, areas }: { cities: City[]; areas: Area[] }) {
  return <InteractiveMap cities={cities} areas={areas} />;
}
