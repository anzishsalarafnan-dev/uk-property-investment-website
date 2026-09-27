import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Frequently Asked Questions",
  description: "Answers to common questions about UK property investment, valuations, and our platform.",
};

const FAQS = [
  { q: "Is my contact information kept private?", a: "Yes. When you list a property or submit a buyer request, your name, email, and phone number are never shown publicly — only our team can see them." },
  { q: "How accurate are the valuation estimates?", a: "Our instant valuations use live local market data, but they are estimates only, not formal valuations. We recommend a professional survey before making decisions." },
  { q: "Is there a fee to list a property?", a: "No, listing your property for sale is completely free. Approved listings appear publicly with photos and pricing, without your contact details." },
  { q: "How is market data kept up to date?", a: "City-level pricing data is updated daily from the UK Land Registry, a free and official government data source." },
  { q: "Can I get a detailed PDF report?", a: "Yes, our Premium Investment Report provides an in-depth analysis for a one-time fee, delivered to your email." },
];

export default function FAQPage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <h1 className="text-3xl font-bold text-slate-900">Frequently Asked Questions</h1>
      <div className="mt-10 space-y-6">
        {FAQS.map((faq, i) => (
          <div key={i} className="rounded-xl bg-slate-50 p-5">
            <h2 className="font-semibold text-slate-900">{faq.q}</h2>
            <p className="mt-2 text-sm text-slate-600">{faq.a}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
