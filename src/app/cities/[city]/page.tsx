import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import cities from "@/data/cities.json";
import areasData from "@/data/areas.json";
import { formatGBP, formatPercent } from "@/lib/utils/format";

type Props = { params: Promise<{ city: string }> };

function getCity(slug: string) {
  return cities.find((c) => c.slug === slug);
}

export async function generateStaticParams() {
  return cities.map((c) => ({ city: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { city: slug } = await params;
  const city = getCity(slug);
  if (!city) return {};
  return {
    title: `${city.name} Property Investment 2026`,
    description: `${city.name} average prices, rental yields, and growth projections. ${city.description}`,
  };
}

export default async function CityDetailPage({ params }: Props) {
  const { city: slug } = await params;
  const city = getCity(slug);
  if (!city) notFound();

  const areas = areasData.filter((a) => a.citySlug === slug);

  return (
    <div>
      <section className="bg-gradient-to-br from-slate-900 to-slate-700 py-16 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Link href="/cities" className="text-sm text-slate-300 hover:text-white">
            ← All Cities
          </Link>
          <h1 className="mt-3 text-4xl font-bold">{city.name}</h1>
          <p className="mt-2 max-w-2xl text-slate-300">{city.tagline}</p>
          <div className="mt-6 flex flex-wrap gap-6">
            <div>
              <p className="text-xs text-slate-400">Population</p>
              <p className="text-lg font-semibold">{city.population.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-xs text-slate-400">Avg. price</p>
              <p className="text-lg font-semibold">{formatGBP(city.avgPrice)}</p>
            </div>
            <div>
              <p className="text-xs text-slate-400">Rental yield</p>
              <p className="text-lg font-semibold text-emerald-400">{formatPercent(city.avgYield)}</p>
            </div>
            <div>
              <p className="text-xs text-slate-400">5yr growth</p>
              <p className="text-lg font-semibold text-emerald-400">{formatPercent(city.growthRate)}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <p className="max-w-3xl text-slate-600">{city.description}</p>

        <h2 className="mt-12 text-2xl font-bold text-slate-900">Areas in {city.name}</h2>
        {areas.length === 0 ? (
          <p className="mt-4 text-slate-600">
            Detailed area breakdowns for {city.name} are coming soon.
          </p>
        ) : (
          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {areas.map((area) => (
              <Link
                key={area.slug}
                href={`/cities/${city.slug}/${area.slug}`}
                className="rounded-xl bg-white p-5 shadow-sm ring-1 ring-slate-200 transition-all hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-slate-900">{area.name}</h3>
                  <span className="rounded-full bg-slate-900 px-2 py-0.5 text-xs font-semibold text-white">
                    {area.investmentScore}/10
                  </span>
                </div>
                <div className="mt-3 flex justify-between text-sm">
                  <span className="text-slate-600">1-bed from</span>
                  <span className="font-semibold text-slate-900">{formatGBP(area.pricing.oneBed)}</span>
                </div>
                <div className="mt-1 flex justify-between text-sm">
                  <span className="text-slate-600">Yield</span>
                  <span className="font-semibold text-emerald-600">{formatPercent(area.rentalYield)}</span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
