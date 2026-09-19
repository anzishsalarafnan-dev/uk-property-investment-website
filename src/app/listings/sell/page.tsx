import { getApprovedSellerListings, getAllCities } from "@/lib/database/content";
import { formatGBP } from "@/lib/utils/format";

export const revalidate = 600;

export default async function SellListingsPage() {
  const [listings, cities] = await Promise.all([getApprovedSellerListings(), getAllCities()]);
  const cityName = (slug: string | null) => cities.find((c) => c.slug === slug)?.name || "UK";

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-slate-900">Properties for Sale</h1>
      <p className="mt-3 text-slate-600">Listed by our sellers. Contact us to enquire.</p>
      <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {listings.map((l) => (
          <div key={l.id} className="rounded-xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
            <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-600">{cityName(l.citySlug)}</span>
            <h2 className="mt-3 font-bold text-slate-900">{l.propertyType} {l.bedrooms ? "— " + l.bedrooms + " bed" : ""}</h2>
            <p className="mt-2 text-xl font-bold text-slate-900">{formatGBP(l.askingPrice)}</p>
            {l.description && <p className="mt-2 text-sm text-slate-600">{l.description}</p>}
          </div>
        ))}
        {listings.length === 0 && <p className="text-sm text-slate-500">No listings yet.</p>}
      </div>
    </div>
  );
}
