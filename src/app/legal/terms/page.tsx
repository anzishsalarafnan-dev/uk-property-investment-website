export const metadata = { title: "Terms of Use" };

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-slate-900">Terms of Use</h1>
      <div className="prose prose-slate mt-8 max-w-none text-slate-600">
        <p>
          By using this website, you agree to use it for lawful purposes only. All content,
          including market data, guides, and valuations, is provided for informational purposes
          and does not constitute financial, legal, or investment advice.
        </p>
        <p>
          We make reasonable efforts to keep data accurate and up to date, but we do not guarantee
          its completeness or accuracy. You should conduct your own due diligence before making
          any investment decision.
        </p>
      </div>
    </div>
  );
}
