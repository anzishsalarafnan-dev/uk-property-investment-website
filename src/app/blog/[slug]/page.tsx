import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getAllBlogPosts, getBlogPostBySlug } from "@/lib/database/content";

export const revalidate = 3600;

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const posts = await getAllBlogPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  if (!post) notFound();

  const paragraphs = post.content.split("\n\n");

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    author: { "@type": "Person", name: post.author },
    datePublished: post.publishedAt,
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      <Link href="/blog" className="text-sm text-slate-600 hover:text-slate-900">
        ← All Posts
      </Link>

      <span className="mt-4 inline-block rounded-full bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-600">
        {post.category}
      </span>
      <h1 className="mt-3 text-3xl font-bold text-slate-900">{post.title}</h1>
      <div className="mt-3 flex items-center gap-3 text-sm text-slate-600">
        <span>By {post.author}</span>
        <span>•</span>
        <span>{new Date(post.publishedAt).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}</span>
        <span>•</span>
        <span>{post.readTimeMinutes} min read</span>
      </div>

      <div className="prose prose-slate mt-10 max-w-none">
        {paragraphs.map((para, i) => (
          <p key={i} className="mb-4 text-slate-700 leading-relaxed">
            {para}
          </p>
        ))}
      </div>

      <div className="mt-12 rounded-xl bg-slate-50 p-6">
        <p className="font-semibold text-slate-900">Want personalised advice?</p>
        <p className="mt-1 text-sm text-slate-600">
          Get a free instant valuation or speak with our team about your investment goals.
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <Link
            href="/valuation"
            className="rounded-md bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-700"
          >
            Get Instant Valuation
          </Link>
          <Link
            href="/contact"
            className="rounded-md border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-white"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
}
