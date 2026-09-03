export const metadata = { title: "Investment Disclaimer" };

export default function DisclaimerPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-slate-900">Investment Disclaimer</h1>
      <div className="prose prose-slate mt-8 max-w-none text-slate-600">
        <p>
          Prices, rental yields, and growth projections shown on this website are estimates based
          on available market data and are not guaranteed. Property investment carries risk,
          including the possible loss of capital. This website does not provide financial advice —
          please consult a qualified financial advisor before making investment decisions.
        </p>
      </div>
    </div>
  );
}
