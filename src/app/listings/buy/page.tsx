import { getApprovedBuyerRequests, getAllCities } from "@/lib/database/content";
import { formatGBP } from "@/lib/utils/format";

export const revalidate = 600;

export default async function BuyListingsPage() {
  const [requests, cities] = await Promise.all([getApprovedBuyerRequests(), getAllCities()]);
  const cityName = (slug: string | null) => cities.find((c) => c.slug === slug)?.name || "UK";

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-slate-900">Buyers Looking</h1>
      <p className="mt-3 text-slate-600">Active buyer requirements. If you have a matching property, contact us.</p>
      <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {requests.map((r) => (
          <div key={r.id} className="rounded-xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
            <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-600">{cityName(r.citySlug)}</span>
            <h2 className="mt-3 font-bold text-slate-900">{r.propertyType} {r.bedroomsWanted ? "— " + r.bedroomsWanted + " bed" : ""}</h2>
            <p className="mt-2 text-xl font-bold text-slate-900">Up to {formatGBP(r.budgetMax)}</p>
            {r.requirements && <p className="mt-2 text-sm text-slate-600">{r.requirements}</p>}
          </div>
        ))}
        {requests.length === 0 && <p className="text-sm text-slate-500">No buyer requests yet.</p>}
      </div>
    </div>
  );
}
