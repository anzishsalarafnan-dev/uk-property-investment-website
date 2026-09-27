import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "How It Works",
  description: "How our UK property investment platform works for buyers, sellers, and investors.",
};

export default function HowItWorksPage() {
  const steps = [
    { title: "Explore Cities & Areas", text: "Browse live pricing, rental yields, and 5-year growth projections across 8 major UK cities." },
    { title: "Get an Instant Valuation", text: "Use our free tool to estimate your property's value based on live local market data." },
    { title: "Buy or Sell", text: "Browse properties for sale, or list your own — your contact details stay private until you choose to respond." },
    { title: "Get Expert Guidance", text: "Download free guides, read our blog, or contact our team for personalised advice." },
  ];

  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-slate-900">How It Works</h1>
      <p className="mt-3 max-w-xl text-slate-600">
        A simple, transparent process for investors, buyers, and sellers.
      </p>
      <div className="mt-12 space-y-8">
        {steps.map((step, i) => (
          <div key={i} className="flex gap-5">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-slate-900 text-sm font-bold text-white">
              {i + 1}
            </div>
            <div>
              <h2 className="font-bold text-slate-900">{step.title}</h2>
              <p className="mt-1 text-sm text-slate-600">{step.text}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
