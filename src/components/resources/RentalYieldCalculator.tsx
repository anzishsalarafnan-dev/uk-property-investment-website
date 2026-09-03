"use client";

import { useState } from "react";
import { formatGBP, formatPercent } from "@/lib/utils/format";

export default function RentalYieldCalculator() {
  const [price, setPrice] = useState(220000);
  const [monthlyRent, setMonthlyRent] = useState(1100);
  const [annualExpenses, setAnnualExpenses] = useState(1500);

  const annualRent = monthlyRent * 12;
  const grossYield = price > 0 ? (annualRent / price) * 100 : 0;
  const netYield = price > 0 ? ((annualRent - annualExpenses) / price) * 100 : 0;

  return (
    <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
      <div className="space-y-5">
        <Field label="Property price" value={price} onChange={setPrice} prefix="£" />
        <Field label="Monthly rent" value={monthlyRent} onChange={setMonthlyRent} prefix="£" />
        <Field label="Annual expenses" value={annualExpenses} onChange={setAnnualExpenses} prefix="£" />
      </div>

      <div className="rounded-xl bg-slate-50 p-8">
        <p className="text-sm text-slate-500">Gross rental yield</p>
        <p className="mt-1 text-3xl font-bold text-emerald-600">{formatPercent(grossYield)}</p>
        <div className="mt-6 space-y-2 border-t border-slate-200 pt-4">
          <Row label="Annual rent" value={formatGBP(annualRent)} />
          <Row label="Net yield (after expenses)" value={formatPercent(netYield)} />
        </div>
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

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between text-sm">
      <span className="text-slate-500">{label}</span>
      <span className="font-semibold text-slate-900">{value}</span>
    </div>
  );
}
