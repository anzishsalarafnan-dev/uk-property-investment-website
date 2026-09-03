import Link from "next/link";
import type { Metadata } from "next";
import cities from "@/data/cities.json";
import { formatGBP, formatPercent } from "@/lib/utils/format";

export const metadata: Metadata = {
  title: "UK Cities for Property Investment",
  description:
    "Compare prices, rental yields, and growth rates across 8 major UK cities for property investment.",
};

export default function CitiesPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-slate-900">UK Cities for Property Investment</h1>
      <p className="mt-3 max-w-2xl text-slate-600">
        Compare average prices, rental yields, and 5-year growth projections across the UK&apos;s
        top investment cities, updated daily from live market data.
      </p>

      <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {cities.map((city) => (
          <Link
            key={city.slug}
            href={`/cities/${city.slug}`}
            className="group overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-slate-200 transition-all hover:-translate-y-1 hover:shadow-xl hover:ring-slate-300"
          >
            <div className="h-32 bg-gradient-to-br from-slate-800 to-slate-600" />
            <div className="p-5">
              <h2 className="text-lg font-bold text-slate-900">{city.name}</h2>
              <p className="mt-1 text-sm text-slate-600">{city.tagline}</p>
              <div className="mt-4 grid grid-cols-3 gap-2 border-t border-slate-100 pt-4 text-center">
                <div>
                  <p className="text-xs text-slate-500">Avg. price</p>
                  <p className="text-sm font-semibold text-slate-900">{formatGBP(city.avgPrice)}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500">Yield</p>
                  <p className="text-sm font-semibold text-emerald-600">{formatPercent(city.avgYield)}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500">Growth</p>
                  <p className="text-sm font-semibold text-slate-900">{formatPercent(city.growthRate)}</p>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <section className="mt-16 max-w-3xl">
        <h2 className="text-xl font-bold text-slate-900">Best UK Cities for Property Investment 2026</h2>
        <p className="mt-3 text-slate-600">
          The UK property market in 2026 continues to reward investors who look beyond London.
          Cities like Manchester, Birmingham, and Liverpool offer significantly higher rental
          yields than the capital, driven by regeneration, growing populations, and strong
          transport investment such as HS2. London remains the most liquid market for long-term
          capital growth, while Northern cities lead on cash flow. The right choice depends on
          your strategy — whether you prioritise yield, growth, or a balance of both.
        </p>
      </section>
    </div>
  );
}
