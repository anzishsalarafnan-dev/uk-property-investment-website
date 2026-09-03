"use client";

import { useState } from "react";
import { formatGBP } from "@/lib/utils/format";

export default function MortgageCalculator() {
  const [price, setPrice] = useState(250000);
  const [deposit, setDeposit] = useState(50000);
  const [rate, setRate] = useState(5.5);
  const [years, setYears] = useState(25);

  const loan = Math.max(price - deposit, 0);
  const monthlyRate = rate / 100 / 12;
  const numPayments = years * 12;
  const monthlyPayment =
    monthlyRate === 0
      ? loan / numPayments
      : (loan * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -numPayments));
  const totalPaid = monthlyPayment * numPayments;
  const totalInterest = totalPaid - loan;

  return (
    <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
      <div className="space-y-5">
        <Field label="Property price" value={price} onChange={setPrice} prefix="£" />
        <Field label="Deposit" value={deposit} onChange={setDeposit} prefix="£" />
        <Field label="Interest rate (%)" value={rate} onChange={setRate} step={0.1} />
        <Field label="Mortgage term (years)" value={years} onChange={setYears} />
      </div>

      <div className="rounded-xl bg-slate-50 p-8">
        <p className="text-sm text-slate-500">Monthly payment</p>
        <p className="mt-1 text-3xl font-bold text-slate-900">
          {formatGBP(Math.round(monthlyPayment))}
        </p>
        <div className="mt-6 space-y-2 border-t border-slate-200 pt-4">
          <Row label="Loan amount" value={formatGBP(loan)} />
          <Row label="Total interest" value={formatGBP(Math.round(totalInterest))} />
          <Row label="Total repaid" value={formatGBP(Math.round(totalPaid))} />
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
  step = 1,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  prefix?: string;
  step?: number;
}) {
  return (
    <div>
      <label className="text-sm font-medium text-slate-700">{label}</label>
      <div className="mt-1 flex items-center rounded-md border border-slate-300 focus-within:border-slate-500">
        {prefix && <span className="pl-3 text-sm text-slate-500">{prefix}</span>}
        <input
          type="number"
          step={step}
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
