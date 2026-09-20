import { notFound } from "next/navigation";
import { getBlogPostBySlug } from "@/lib/database/content";
import BlogEditForm from "@/components/admin/BlogEditForm";

type Props = { params: Promise<{ slug: string }> };

export default async function AdminBlogEditPage({ params }: Props) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  if (!post) notFound();

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900">Edit {post.title}</h1>
      <div className="mt-6 max-w-3xl">
        <BlogEditForm post={post} />
      </div>
    </div>
  );
}
