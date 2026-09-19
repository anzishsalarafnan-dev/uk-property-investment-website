import { supabaseAdmin } from "@/lib/database/client";
import { formatGBP } from "@/lib/utils/format";
import MarketplaceRow from "@/components/admin/MarketplaceRow";

export default async function AdminMarketplacePage() {
  const sellersResult = await supabaseAdmin().from("seller_listings").select("*").order("created_at", { ascending: false });
  const buyersResult = await supabaseAdmin().from("buyer_requests").select("*").order("created_at", { ascending: false });
  const sellers = sellersResult.data || [];
  const buyers = buyersResult.data || [];

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900">Marketplace</h1>

      <h2 className="mt-8 font-semibold text-slate-900">Seller Listings ({sellers.length})</h2>
      <div className="mt-3 space-y-3">
        {sellers.map((s: any) => (
          <MarketplaceRow
            key={s.id}
            type="seller"
            id={s.id}
            name={s.name}
            email={s.email}
            phone={s.phone}
            summary={s.property_type + (s.bedrooms ? " — " + s.bedrooms + " bed" : "") + " — " + formatGBP(s.asking_price) + " in " + (s.city_slug || "N/A") + ". " + (s.description || "")}
            isApproved={s.is_approved}
          />
        ))}
        {sellers.length === 0 && <p className="text-sm text-slate-500">No seller listings.</p>}
      </div>

      <h2 className="mt-10 font-semibold text-slate-900">Buyer Requests ({buyers.length})</h2>
      <div className="mt-3 space-y-3">
        {buyers.map((b: any) => (
          <MarketplaceRow
            key={b.id}
            type="buyer"
            id={b.id}
            name={b.name}
            email={b.email}
            phone={b.phone}
            summary={b.property_type + (b.bedrooms_wanted ? " — " + b.bedrooms_wanted + " bed" : "") + " — up to " + formatGBP(b.budget_max) + " in " + (b.city_slug || "N/A") + ". " + (b.requirements || "")}
            isApproved={b.is_approved}
          />
        ))}
        {buyers.length === 0 && <p className="text-sm text-slate-500">No buyer requests.</p>}
      </div>
    </div>
  );
}
