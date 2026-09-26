import type { Metadata } from "next";
import ReportCheckout from "@/components/payments/ReportCheckout";

export const metadata: Metadata = {
  title: "Premium Investment Report",
  description: "Get a detailed, in-depth PDF investment report for your chosen UK city or area.",
};

export default function ReportPage() {
  return (
    <div>
      <section className="relative overflow-hidden bg-[var(--navy-deep)] py-20 text-white">
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--navy-deep)] via-slate-900 to-black opacity-95" />
        <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-[var(--gold)] opacity-10 blur-3xl" />
        <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-widest text-[var(--gold-light)]">Premium Report</p>
          <h1 className="mt-4 text-3xl font-bold sm:text-4xl">In-Depth Investment Analysis</h1>
          <p className="mx-auto mt-4 max-w-xl text-slate-300">
            A comprehensive PDF report covering pricing trends, rental yield analysis, growth
            forecasts, and area comparisons — tailored to the city or area of your choice.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2">
          <div>
            <h2 className="text-xl font-bold text-slate-900">What&apos;s included</h2>
            <ul className="mt-4 space-y-3 text-sm text-slate-600">
              <li className="flex items-start gap-2">
                <span className="mt-0.5 text-[var(--gold)]">✓</span> 15+ page detailed PDF analysis
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5 text-[var(--gold)]">✓</span> 5-year price and yield projections
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5 text-[var(--gold)]">✓</span> Comparison with 3 similar areas
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5 text-[var(--gold)]">✓</span> Delivered instantly to your email
              </li>
            </ul>
          </div>

          <div className="rounded-xl bg-white p-6 shadow-lg ring-1 ring-slate-200">
            <p className="text-sm text-slate-500">One-time payment</p>
            <p className="mt-1 text-3xl font-bold text-slate-900">£29.00</p>
            <div className="mt-6">
              <ReportCheckout />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
