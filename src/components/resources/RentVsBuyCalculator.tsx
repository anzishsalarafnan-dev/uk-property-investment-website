"use client";

import { useState } from "react";
import { formatGBP } from "@/lib/utils/format";

export default function RentVsBuyCalculator() {
  const [monthlyRent, setMonthlyRent] = useState(1200);
  const [propertyPrice, setPropertyPrice] = useState(250000);
  const [monthlyMortgage, setMonthlyMortgage] = useState(1300);
  const [monthlyMaintenance, setMonthlyMaintenance] = useState(150);
  const [years, setYears] = useState(5);

  const totalRentCost = monthlyRent * 12 * years;
  const totalBuyCost = (monthlyMortgage + monthlyMaintenance) * 12 * years;
  const difference = totalBuyCost - totalRentCost;

  return (
    <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
      <div className="space-y-5">
        <Field label="Monthly rent" value={monthlyRent} onChange={setMonthlyRent} prefix="£" />
        <Field label="Property price" value={propertyPrice} onChange={setPropertyPrice} prefix="£" />
        <Field label="Monthly mortgage payment" value={monthlyMortgage} onChange={setMonthlyMortgage} prefix="£" />
        <Field label="Monthly maintenance/service charge" value={monthlyMaintenance} onChange={setMonthlyMaintenance} prefix="£" />
        <Field label="Comparison period (years)" value={years} onChange={setYears} />
      </div>

      <div className="rounded-xl bg-slate-50 p-8">
        <p className="text-sm text-slate-500">
          Over {years} year{years !== 1 ? "s" : ""}
        </p>
        <div className="mt-4 space-y-3">
          <Row label="Total cost of renting" value={formatGBP(totalRentCost)} />
          <Row label="Total cost of buying" value={formatGBP(totalBuyCost)} />
          <div className="border-t border-slate-200 pt-3">
            <Row
              label={difference > 0 ? "Buying costs more by" : "Buying saves you"}
              value={formatGBP(Math.abs(difference))}
              highlight
            />
          </div>
        </div>
        <p className="mt-6 text-xs text-slate-500">
          This does not account for property value growth or equity built through mortgage repayments.
        </p>
      </div>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  prefix,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  prefix?: string;
}) {
  return (
    <div>
      <label className="text-sm font-medium text-slate-700">{label}</label>
      <div className="mt-1 flex items-center rounded-md border border-slate-300 focus-within:border-slate-500">
        {prefix && <span className="pl-3 text-sm text-slate-500">{prefix}</span>}
        <input
          type="number"
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="w-full rounded-md px-3 py-2 text-sm focus:outline-none"
        />
      </div>
    </div>
  );
}

function Row({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div className="flex justify-between text-sm">
      <span className="text-slate-500">{label}</span>
      <span className={highlight ? "text-lg font-bold text-slate-900" : "font-semibold text-slate-900"}>
        {value}
      </span>
    </div>
  );
}
