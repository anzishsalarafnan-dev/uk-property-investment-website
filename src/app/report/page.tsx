import type { Metadata } from "next";
import ReportCheckout from "@/components/payments/ReportCheckout";

export const metadata: Metadata = {
  title: "Premium Investment Report",
  description: "Get a detailed, in-depth PDF investment report for your chosen UK city or area.",
};

export default function ReportPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-slate-900">Premium Investment Report</h1>
      <p className="mt-3 text-slate-600">
        A comprehensive PDF report covering pricing trends, rental yield analysis, growth
        forecasts, and area comparisons — tailored to the city or area of your choice.
      </p>

      <div className="mt-10 rounded-xl bg-white p-8 shadow-sm ring-1 ring-slate-200">
        <h2 className="text-xl font-bold text-slate-900">What's included</h2>
        <ul className="mt-4 space-y-2 text-sm text-slate-600">
          <li>• 15+ page detailed PDF analysis</li>
          <li>• 5-year price and yield projections</li>
          <li>• Comparison with 3 similar areas</li>
          <li>• Delivered instantly to your email</li>
        </ul>

        <div className="mt-8 border-t border-slate-100 pt-6">
          <ReportCheckout />
        </div>
      </div>
    </div>
  );
}
