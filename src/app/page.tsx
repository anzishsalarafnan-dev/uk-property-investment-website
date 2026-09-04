import Link from "next/link";
import Image from "next/image";
import cities from "@/data/cities.json";
import { getCityPhotoUrl } from "@/lib/utils/images";
import { formatGBP, formatPercent } from "@/lib/utils/format";
import NewsletterForm from "@/components/forms/NewsletterForm";

export default function HomePage() {
  return (
    <div>
      <section className="bg-slate-900 py-20 text-white sm:py-28">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight sm:text-5xl">
            UK Property Investment Guide 2026 — Cities, Areas & Live Valuations
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-300">
            Choose your city, explore areas, see prices, schools, hospitals, and 5-year growth. Get an instant PDF valuation for your property.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link href="/cities" className="rounded-md bg-white px-6 py-3 text-sm font-semibold text-slate-900 hover:bg-slate-100">
              Browse Cities
            </Link>
            <Link href="/guides" className="rounded-md border border-white px-6 py-3 text-sm font-semibold text-white hover:bg-white/10">
              Get Free Area Guide
            </Link>
            <Link href="/map" className="rounded-md border border-white px-6 py-3 text-sm font-semibold text-white hover:bg-white/10">
              Explore Map
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl bg-slate-50 px-4 py-16 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-slate-900">Featured Cities</h2>
        <p className="mt-2 text-slate-600">
          Live pricing and yield data across 8 major UK investment cities.
        </p>
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {cities.map((city) => (
            <Link
              key={city.slug}
              href={`/cities/${city.slug}`}
              className="group overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-slate-200 transition-all hover:-translate-y-1 hover:shadow-xl hover:ring-slate-300"
            >
              <div className="relative h-28">
                <Image
                  src={getCityPhotoUrl(city.slug, city.heroImage)}
                  alt={city.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 25vw"
                  className="object-cover"
                />
              </div>
              <div className="p-5">
                <h3 className="text-lg font-bold text-slate-900">{city.name}</h3>
                <p className="mt-1 text-sm text-slate-600">{city.tagline}</p>
                <div className="mt-4 space-y-2 border-t border-slate-100 pt-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-600">Avg. price</span>
                    <span className="font-semibold text-slate-900">{formatGBP(city.avgPrice)}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-600">Rental yield</span>
                    <span className="rounded-full bg-emerald-50 px-2 py-0.5 font-semibold text-emerald-700">
                      {formatPercent(city.avgYield)}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-16 text-center sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-slate-900">Get Monthly UK Market Updates</h2>
        <p className="mt-2 text-slate-600">
          New area reports and market trends, straight to your inbox. No spam.
        </p>
        <div className="mt-6 flex justify-center">
          <div className="w-full max-w-md">
            <NewsletterForm />
          </div>
        </div>
      </section>
    </div>
  );
}
