"use client";

import dynamic from "next/dynamic";

const InteractiveMap = dynamic(() => import("@/components/map/InteractiveMap"), {
  ssr: false,
  loading: () => (
    <div className="flex h-[600px] items-center justify-center rounded-xl bg-slate-50 text-slate-400">
      Loading map...
    </div>
  ),
});

export default function MapPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-slate-900">Explore on the Map</h1>
      <p className="mt-3 max-w-xl text-slate-600">
        Browse UK cities and areas visually. Click a marker for pricing, yield, and a link to full
        details.
      </p>
      <div className="mt-10">
        <InteractiveMap />
      </div>
    </div>
  );
}
