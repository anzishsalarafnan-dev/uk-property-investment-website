import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn about our team and mission helping investors navigate the UK property market.",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-slate-900">About Us</h1>
      <p className="mt-6 text-slate-600">
        We help investors — both UK-based and overseas — make informed decisions in the UK
        property market. Our platform combines live market data with clear, practical guidance
        so you can compare cities and areas with confidence, not guesswork.
      </p>
      <p className="mt-4 text-slate-600">
        Our data is refreshed daily from major listing sites and the UK Land Registry, and every
        area page is written to answer the real questions investors ask: is this area good for
        investment, what will it cost, and what yield can I expect.
      </p>

      <h2 className="mt-12 text-xl font-bold text-slate-900">Our Approach</h2>
      <div className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-3">
        <div className="rounded-lg bg-slate-50 p-5">
          <h3 className="font-semibold text-slate-900">Live Data</h3>
          <p className="mt-2 text-sm text-slate-600">
            Pricing and yield figures are updated daily, not once a quarter.
          </p>
        </div>
        <div className="rounded-lg bg-slate-50 p-5">
          <h3 className="font-semibold text-slate-900">No Sugar-Coating</h3>
          <p className="mt-2 text-sm text-slate-600">
            We show risks and trade-offs alongside opportunities, area by area.
          </p>
        </div>
        <div className="rounded-lg bg-slate-50 p-5">
          <h3 className="font-semibold text-slate-900">Free Tools</h3>
          <p className="mt-2 text-sm text-slate-600">
            Valuation, mortgage, and yield calculators, free for every visitor.
          </p>
        </div>
      </div>
    </div>
  );
}
