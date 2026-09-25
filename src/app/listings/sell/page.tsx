import { getApprovedSellerListings, getAllCities } from "@/lib/database/content";
import { formatGBP } from "@/lib/utils/format";
import PropertyInquiryForm from "@/components/forms/PropertyInquiryForm";

export const revalidate = 600;

export default async function SellListingsPage() {
  const [listings, cities] = await Promise.all([getApprovedSellerListings(), getAllCities()]);
  const cityName = (slug: string | null) => cities.find((c) => c.slug === slug)?.name || "UK";

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-slate-900">Properties for Sale</h1>
      <p className="mt-3 text-slate-600">Listed by our sellers. Register your interest below any listing.</p>
      <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {listings.map((l) => (
          <div key={l.id} className="overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-slate-200">
            {l.photos.length > 0 ? (
              <div className="grid grid-cols-3 gap-0.5">
                {l.photos.slice(0, 3).map((url, i) => (
                  <img key={i} src={url} alt="" className="h-24 w-full object-cover" />
                ))}
              </div>
            ) : (
              <div className="h-24 bg-gradient-to-br from-slate-800 to-slate-600" />
            )}
            <div className="p-5">
              <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-600">{cityName(l.citySlug)}</span>
              <h2 className="mt-3 font-bold text-slate-900">{l.propertyType} {l.bedrooms ? "\u2014 " + l.bedrooms + " bed" : ""}</h2>
              {l.condition && <p className="mt-1 text-xs text-slate-500 capitalize">{l.condition.replace("-", " ")}</p>}
              <p className="mt-2 text-xl font-bold text-slate-900">{formatGBP(l.askingPrice)}</p>
              {l.description && <p className="mt-2 text-sm text-slate-600">{l.description}</p>}
              <PropertyInquiryForm listingId={l.id} />
            </div>
          </div>
        ))}
        {listings.length === 0 && <p className="text-sm text-slate-500">No listings yet.</p>}
      </div>
    </div>
  );
}
