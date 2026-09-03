"use client";

import { useState } from "react";
import type { Area } from "@/types/area";
import { formatGBP, formatPercent } from "@/lib/utils/format";

const TABS = ["Overview", "Pricing", "Amenities", "FAQs"] as const;

export default function AreaTabs({ area }: { area: Area }) {
  const [active, setActive] = useState<(typeof TABS)[number]>("Overview");

  return (
    <div>
      <div className="flex gap-1 overflow-x-auto border-b border-slate-200">
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActive(tab)}
            className={`whitespace-nowrap px-4 py-3 text-sm font-medium transition-colors ${
              active === tab
                ? "border-b-2 border-slate-900 text-slate-900"
                : "text-slate-500 hover:text-slate-800"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="py-6">
        {active === "Overview" && (
          <p className="max-w-3xl text-slate-600">{area.overview}</p>
        )}

        {active === "Pricing" && (
          <div className="max-w-md overflow-hidden rounded-lg ring-1 ring-slate-200">
            <table className="w-full text-sm">
              <tbody>
                {(
                  [
                    ["Studio", area.pricing.studio],
                    ["1 Bedroom", area.pricing.oneBed],
                    ["2 Bedroom", area.pricing.twoBed],
                    ["3 Bedroom", area.pricing.threeBed],
                  ] as const
                ).map(([label, price]) => (
                  <tr key={label} className="border-b border-slate-100 last:border-0">
                    <td className="px-4 py-3 text-slate-600">{label}</td>
                    <td className="px-4 py-3 text-right font-semibold text-slate-900">
                      {formatGBP(price)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {active === "Amenities" && (
          <div className="grid max-w-md grid-cols-2 gap-4">
            <div className="rounded-lg bg-slate-50 p-4">
              <p className="text-xs text-slate-400">Schools nearby</p>
              <p className="text-lg font-semibold text-slate-900">{area.amenities.schools}</p>
            </div>
            <div className="rounded-lg bg-slate-50 p-4">
              <p className="text-xs text-slate-400">Hospitals nearby</p>
              <p className="text-lg font-semibold text-slate-900">{area.amenities.hospitals}</p>
            </div>
            <div className="col-span-2 rounded-lg bg-slate-50 p-4">
              <p className="text-xs text-slate-400">Transport links</p>
              <p className="text-sm font-medium text-slate-900">
                {area.amenities.transport.join(", ")}
              </p>
            </div>
            <div className="col-span-2 rounded-lg bg-slate-50 p-4">
              <p className="text-xs text-slate-400">Crime rate</p>
              <p className="text-sm font-medium text-slate-900">{area.amenities.crimeRate}</p>
            </div>
          </div>
        )}

        {active === "FAQs" && (
          <div className="max-w-2xl space-y-4">
            {area.faqs.map((faq) => (
              <div key={faq.question} className="rounded-lg bg-slate-50 p-4">
                <p className="font-semibold text-slate-900">{faq.question}</p>
                <p className="mt-1 text-sm text-slate-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
