import { notFound } from "next/navigation";
import { getGuideBySlug } from "@/lib/database/content";
import GuideEditForm from "@/components/admin/GuideEditForm";

type Props = { params: Promise<{ slug: string }> };

export default async function AdminGuideEditPage({ params }: Props) {
  const { slug } = await params;
  const guide = await getGuideBySlug(slug);
  if (!guide) notFound();

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900">Edit {guide.title}</h1>
      <div className="mt-6 max-w-2xl">
        <GuideEditForm guide={guide} />
      </div>
    </div>
  );
}
