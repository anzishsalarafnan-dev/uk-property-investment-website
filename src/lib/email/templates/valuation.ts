import { formatGBP } from "@/lib/utils/format";
import type { ValuationResult } from "@/types/property";

export function valuationEmailHtml(areaName: string, result: ValuationResult) {
  return `
  <div style="font-family: Arial, sans-serif; max-width: 480px; margin: 0 auto; color: #171717;">
    <h1 style="font-size: 20px;">Your Property Valuation Estimate</h1>
    <p style="color: #475569;">Here's your instant estimate for a property in <strong>${areaName}</strong>:</p>
    <div style="background: #f8fafc; border-radius: 8px; padding: 20px; margin: 20px 0;">
      <p style="margin: 0; font-size: 13px; color: #64748b;">Estimated value</p>
      <p style="margin: 4px 0 0; font-size: 28px; font-weight: bold;">${formatGBP(result.medium)}</p>
      <table style="width: 100%; margin-top: 16px; font-size: 14px;">
        <tr><td style="color: #64748b; padding: 4px 0;">Low estimate</td><td style="text-align: right; font-weight: 600;">${formatGBP(result.low)}</td></tr>
        <tr><td style="color: #64748b; padding: 4px 0;">High estimate</td><td style="text-align: right; font-weight: 600;">${formatGBP(result.high)}</td></tr>
      </table>
    </div>
    <p style="font-size: 12px; color: #94a3b8;">This is an estimate only, not a formal valuation, and not financial advice.</p>
  </div>`;
}
