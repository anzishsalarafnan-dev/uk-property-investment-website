export const metadata = { title: "Privacy Policy" };

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-slate-900">Privacy Policy</h1>
      <div className="prose prose-slate mt-8 max-w-none text-slate-600">
        <p>
          We collect only the information you provide directly — such as your name, email, and
          WhatsApp number — when you download a guide, request a valuation, or contact us. This
          data is used solely to respond to your request and, where you have opted in, to send
          relevant market updates.
        </p>
        <p>
          We do not sell your data to third parties. You may request access to, correction of, or
          deletion of your data at any time by contacting us. Data is stored securely and retained
          only as long as necessary to provide our services.
        </p>
        <p>Under UK GDPR, you have the right to access, rectify, erase, and port your data.</p>
      </div>
    </div>
  );
}
