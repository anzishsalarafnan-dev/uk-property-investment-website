import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import cities from "@/data/cities.json";
import areasData from "@/data/areas.json";
import AreaTabs from "@/components/areas/AreaTabs";
import Image from "next/image";
import { formatGBP, formatPercent } from "@/lib/utils/format";
import { getAreaPhotoUrl } from "@/lib/utils/images";

type Props = { params: Promise<{ city: string; area: string }> };

function getArea(citySlug: string, areaSlug: string) {
  return areasData.find((a) => a.citySlug === citySlug && a.slug === areaSlug);
}

export async function generateStaticParams() {
  return areasData.map((a) => ({ city: a.citySlug, area: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { city: citySlug, area: areaSlug } = await params;
  const area = getArea(citySlug, areaSlug);
  if (!area) return {};
  return {
    title: `${area.name} Property Investment 2026`,
    description: area.overview.slice(0, 155),
  };
}

export default async function AreaDetailPage({ params }: Props) {
  const { city: citySlug, area: areaSlug } = await params;
  const city = cities.find((c) => c.slug === citySlug);
  const area = getArea(citySlug, areaSlug);
  if (!city || !area) notFound();

  return (
    <div>
      <section className="relative overflow-hidden py-14 text-white">
        <Image
          src={getAreaPhotoUrl(area.slug, 1600, 450)}
          alt={area.name}
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-slate-900/70" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Link href={`/cities/${city.slug}`} className="text-sm text-slate-300 hover:text-white">
            ← {city.name}
          </Link>
          <div className="mt-3 flex items-center gap-3">
            <h1 className="text-3xl font-bold">{area.name}</h1>
            <span className="rounded-full bg-white/10 px-3 py-1 text-sm font-semibold">
              Score {area.investmentScore}/10
            </span>
          </div>
          <p className="mt-1 text-sm text-slate-400">Last updated: {area.lastUpdated}</p>

          <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
            <div>
              <p className="text-xs text-slate-400">1-bed from</p>
              <p className="text-lg font-semibold">{formatGBP(area.pricing.oneBed)}</p>
            </div>
            <div>
              <p className="text-xs text-slate-400">2-bed from</p>
              <p className="text-lg font-semibold">{formatGBP(area.pricing.twoBed)}</p>
            </div>
            <div>
              <p className="text-xs text-slate-400">Rental yield</p>
              <p className="text-lg font-semibold text-emerald-400">{formatPercent(area.rentalYield)}</p>
            </div>
            <div>
              <p className="text-xs text-slate-400">5yr growth</p>
              <p className="text-lg font-semibold text-emerald-400">{formatPercent(area.growthProjection)}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
        <AreaTabs area={area} />

        <div className="mt-8 flex flex-wrap gap-4 rounded-xl bg-slate-50 p-6">
          <Link
            href="/valuation"
            className="rounded-md bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-slate-700"
          >
            Get Instant Valuation
          </Link>
          <Link
            href="/guides"
            className="rounded-md border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-700 hover:bg-white"
          >
            Download Full Area Report
          </Link>
          <Link
            href="/contact"
            className="rounded-md border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-700 hover:bg-white"
          >
            Email Us About This Area
          </Link>
        </div>
      </section>
    </div>
  );
}
