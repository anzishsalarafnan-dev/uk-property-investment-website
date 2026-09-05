import type { Metadata } from "next";
import { getAllGuides } from "@/lib/database/content";
import GuideDownloadForm from "@/components/forms/GuideDownloadForm";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Free UK Property Investment Guides",
  description: "Download free city guides, area reports, and investor checklists for UK property investment.",
};

export default async function GuidesPage() {
  const guides = await getAllGuides();

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-slate-900">Free Investment Guides</h1>
      <p className="mt-3 max-w-xl text-slate-600">
        Download our free, in-depth guides covering UK cities, overseas buying, and investment
        checklists — no obligation, just useful data.
      </p>

      <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-2">
        {guides.map((guide) => (
          <div key={guide.slug} className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
            <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-600">
              {guide.type.replace("-", " ")}
            </span>
            <h2 className="mt-3 text-lg font-bold text-slate-900">{guide.title}</h2>
            <p className="mt-1 text-sm text-slate-600">{guide.description}</p>
            <div className="mt-5">
              <GuideDownloadForm guideSlug={guide.slug} guideTitle={guide.title} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
