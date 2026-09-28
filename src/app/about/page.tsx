import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn about our mission helping UK and overseas investors navigate the property market with live data and transparent guidance.",
};

export default function AboutPage() {
  const stats = [
    { label: "UK Cities Covered", value: "8" },
    { label: "Areas Analysed", value: "14+" },
    { label: "Data Updated", value: "Daily" },
    { label: "Data Source", value: "UK Land Registry" },
  ];

  const values = [
    { title: "Live Data, Not Guesswork", text: "Pricing figures are refreshed daily from the UK Land Registry, an official government source — not stale quarterly reports." },
    { title: "Transparent Valuations", text: "Our instant valuation tool shows exactly how an estimate is calculated, and is always labelled as an estimate, never a formal appraisal." },
    { title: "Privacy By Design", text: "When you list a property or submit a buying request, your contact details are never shown publicly — only our team can see them." },
    { title: "No Sugar-Coating", text: "We show risks and trade-offs alongside opportunities, area by area, so you can make an informed decision either way." },
  ];

  return (
    <div>
      <section className="relative overflow-hidden bg-[var(--navy-deep)] py-20 text-white">
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--navy-deep)] via-slate-900 to-black opacity-95" />
        <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-widest text-[var(--gold-light)]">About Us</p>
          <h1 className="mt-4 text-3xl font-bold sm:text-4xl">Helping Investors Navigate UK Property, With Real Data</h1>
          <p className="mx-auto mt-4 max-w-2xl text-slate-300">
            We combine live market data with clear, practical guidance so investors — whether
            based in the UK or overseas — can compare cities and areas with confidence.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="rounded-xl bg-slate-50 p-5 text-center">
              <p className="text-2xl font-bold text-slate-900">{s.value}</p>
              <p className="mt-1 text-xs text-slate-600">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-slate-900">Our Story</h2>
        <p className="mt-4 text-slate-600">
          Property investment is often presented as simple, but new investors consistently
          discover the same gap: pricing data that&apos;s months out of date, area guides written
          once and never revisited, and no easy way to see what a property is actually worth
          today. We built this platform to close that gap — pulling live pricing directly from
          the UK Land Registry, refreshing it daily, and pairing it with honest, area-by-area
          analysis rather than generic marketing copy.
        </p>
        <p className="mt-4 text-slate-600">
          What started as a simple city comparison tool has grown into a full platform: an
          interactive map, instant valuations, a marketplace connecting buyers and sellers, and
          an AI assistant that can answer questions in any language, day or night — all grounded
          in the same real data that powers the rest of the site.
        </p>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-slate-900">What We Stand For</h2>
        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
          {values.map((v) => (
            <div key={v.title} className="rounded-xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
              <h3 className="font-bold text-slate-900">{v.title}</h3>
              <p className="mt-2 text-sm text-slate-600">{v.text}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
