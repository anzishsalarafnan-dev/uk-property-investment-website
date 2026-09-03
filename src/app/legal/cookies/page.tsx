export const metadata = { title: "Cookie Policy" };

export default function CookiesPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-slate-900">Cookie Policy</h1>
      <div className="prose prose-slate mt-8 max-w-none text-slate-600">
        <p>
          We use essential cookies to run this website, and optional analytics cookies to
          understand how visitors use it. You can control or disable non-essential cookies via
          your browser settings or our cookie consent banner.
        </p>
      </div>
    </div>
  );
}
