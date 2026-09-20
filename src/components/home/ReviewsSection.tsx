import { supabase } from "@/lib/database/client";

export default async function ReviewsSection() {
  const { data: reviews } = await supabase
    .from("reviews")
    .select("name, rating, message")
    .eq("is_approved", true)
    .order("created_at", { ascending: false })
    .limit(6);

  if (!reviews || reviews.length === 0) return null;

  return (
    <section className="mx-auto max-w-7xl bg-white px-4 py-16 sm:px-6 lg:px-8">
      <h2 className="text-2xl font-bold text-slate-900">What Our Investors Say</h2>
      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {reviews.map((r: any, i: number) => (
          <div key={i} className="rounded-xl bg-slate-50 p-5 ring-1 ring-slate-200">
            <p className="text-[var(--gold)]">{"★".repeat(r.rating)}{"☆".repeat(5 - r.rating)}</p>
            <p className="mt-3 text-sm text-slate-700">{r.message}</p>
            <p className="mt-3 text-sm font-semibold text-slate-900">— {r.name}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
