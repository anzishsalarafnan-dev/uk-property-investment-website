import { supabaseAdmin } from "@/lib/database/client";
import { formatGBP } from "@/lib/utils/format";

export default async function AdminInquiriesPage() {
  const { data: inquiries } = await supabaseAdmin()
    .from("property_inquiries")
    .select("*, seller_listings(property_type, asking_price, city_slug)")
    .order("created_at", { ascending: false });

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900">Property Inquiries</h1>
      <p className="mt-1 text-sm text-slate-600">{inquiries?.length || 0} total inquiries</p>

      <div className="mt-6 space-y-3">
        {(inquiries || []).map((inq: any) => (
          <div key={inq.id} className="rounded-xl bg-white p-4 shadow-sm ring-1 ring-slate-200">
            <div className="flex items-start justify-between">
              <div>
                <p className="font-semibold text-slate-900">{inq.name}</p>
                <p className="text-xs text-slate-500">{inq.email}{inq.phone ? " \u00b7 " + inq.phone : ""}</p>
              </div>
              <span className="text-xs text-slate-400">{new Date(inq.created_at).toLocaleDateString("en-GB")}</span>
            </div>
            {inq.seller_listings && (
              <p className="mt-2 text-xs text-slate-600">
                Interested in: {inq.seller_listings.property_type} in {inq.seller_listings.city_slug || "N/A"} — {formatGBP(inq.seller_listings.asking_price)}
              </p>
            )}
            {inq.message && <p className="mt-2 text-sm text-slate-700">{inq.message}</p>}
          </div>
        ))}
        {(!inquiries || inquiries.length === 0) && <p className="text-sm text-slate-500">No inquiries yet.</p>}
      </div>
    </div>
  );
}
