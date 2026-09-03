import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Property Investment Calculators",
  description: "Free mortgage, rental yield, and rent-vs-buy calculators for UK property investors.",
};

const TOOLS = [
  {
    href: "/resources/mortgage-calculator",
    title: "Mortgage Calculator",
    description: "Estimate your monthly mortgage payment and total interest.",
  },
  {
    href: "/resources/rental-yield-calculator",
    title: "Rental Yield Calculator",
    description: "Calculate gross and net rental yield for any property.",
  },
  {
    href: "/resources/rent-vs-buy",
    title: "Rent vs Buy Calculator",
    description: "Compare the true cost of renting versus buying over time.",
  },
];

export default function ResourcesPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-slate-900">Free Calculators</h1>
      <p className="mt-3 max-w-xl text-slate-600">
        Free tools to help you plan and evaluate UK property investments.
      </p>
      <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3">
        {TOOLS.map((tool) => (
          <Link
            key={tool.href}
            href={tool.href}
            className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-slate-200 transition-all hover:-translate-y-1 hover:shadow-xl"
          >
            <h2 className="font-bold text-slate-900">{tool.title}</h2>
            <p className="mt-2 text-sm text-slate-600">{tool.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
