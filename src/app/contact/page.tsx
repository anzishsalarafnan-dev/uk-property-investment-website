import type { Metadata } from "next";
import ContactForm from "@/components/forms/ContactForm";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with our UK property investment team.",
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-slate-900">Contact Us</h1>
      <p className="mt-3 max-w-xl text-slate-500">
        Have a question about an area, a valuation, or an investment strategy? Send us a message
        and we&apos;ll get back to you within one business day.
      </p>
      <div className="mt-10">
        <ContactForm />
      </div>
    </div>
  );
}
