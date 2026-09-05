import { notFound } from "next/navigation";
import { getAreaBySlugOnly } from "@/lib/database/content";
import AreaEditForm from "@/components/admin/AreaEditForm";

type Props = { params: Promise<{ slug: string }> };

export default async function AdminAreaEditPage({ params }: Props) {
  const { slug } = await params;
  const area = await getAreaBySlugOnly(slug);
  if (!area) notFound();

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900">Edit {area.name}</h1>
      <div className="mt-6 max-w-2xl">
        <AreaEditForm area={area} />
      </div>
    </div>
  );
}
