import { supabaseAdmin } from "@/lib/database/client";
import ReviewApprovalRow from "@/components/admin/ReviewApprovalRow";

export default async function AdminReviewsPage() {
  const { data: reviews } = await supabaseAdmin()
    .from("reviews")
    .select("*")
    .order("created_at", { ascending: false });

  const pending = (reviews || []).filter((r) => !r.is_approved);
  const approved = (reviews || []).filter((r) => r.is_approved);

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900">Reviews</h1>
      <p className="mt-1 text-sm text-slate-600">{pending.length} pending, {approved.length} approved</p>

      <h2 className="mt-8 font-semibold text-slate-900">Pending Approval</h2>
      <div className="mt-3 space-y-3">
        {pending.length === 0 && <p className="text-sm text-slate-500">No pending reviews.</p>}
        {pending.map((review) => (
          <ReviewApprovalRow key={review.id} review={review} />
        ))}
      </div>

      <h2 className="mt-10 font-semibold text-slate-900">Approved (live on site)</h2>
      <div className="mt-3 space-y-3">
        {approved.length === 0 && <p className="text-sm text-slate-500">No approved reviews yet.</p>}
        {approved.map((review) => (
          <ReviewApprovalRow key={review.id} review={review} />
        ))}
      </div>
    </div>
  );
}
