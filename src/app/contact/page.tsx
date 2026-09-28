import type { Metadata } from "next";
import ContactForm from "@/components/forms/ContactForm";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with our UK property investment team about an area, a valuation, or an investment strategy.",
};

export default function ContactPage() {
  const channels = [
    { title: "General Enquiries", text: "Questions about an area, city, or our data sources." },
    { title: "Valuation Support", text: "Help interpreting your instant valuation report." },
    { title: "Buying & Selling", text: "Support with a listing or a buyer enquiry on the marketplace." },
  ];

  return (
    <div>
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-slate-900">Contact Us</h1>
        <p className="mt-3 max-w-xl text-slate-600">
          Have a question about an area, a valuation, or an investment strategy? Send us a
          message and we&apos;ll get back to you within one business day.
        </p>

        <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <ContactForm />
          </div>

          <div className="space-y-4">
            {channels.map((c) => (
              <div key={c.title} className="rounded-xl bg-slate-50 p-4">
                <h3 className="text-sm font-bold text-slate-900">{c.title}</h3>
                <p className="mt-1 text-xs text-slate-600">{c.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
