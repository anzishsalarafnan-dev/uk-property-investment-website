import { getAllCities, getAllAreas, getAllGuides, getAllBlogPosts } from "@/lib/database/content";

type CachedData = {
  cities: Awaited<ReturnType<typeof getAllCities>>;
  areas: Awaited<ReturnType<typeof getAllAreas>>;
  guides: Awaited<ReturnType<typeof getAllGuides>>;
  blogPosts: Awaited<ReturnType<typeof getAllBlogPosts>>;
  fetchedAt: number;
};

let cache: CachedData | null = null;
const CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutes — content rarely changes minute-to-minute

async function getData(): Promise<CachedData> {
  if (cache && Date.now() - cache.fetchedAt < CACHE_TTL_MS) {
    return cache;
  }

  const [cities, areas, guides, blogPosts] = await Promise.all([
    getAllCities(),
    getAllAreas(),
    getAllGuides(),
    getAllBlogPosts(),
  ]);

  cache = { cities, areas, guides, blogPosts, fetchedAt: Date.now() };
  return cache;
}

/**
 * Simple keyword-based retrieval: finds cities/areas/guides/blog posts
 * whose name or content matches words from the user's question, and
 * returns them as context text for the AI to answer from — this keeps
 * answers grounded in real site data instead of the model inventing facts.
 * Data is cached in-memory for 5 minutes to avoid a slow database round
 * trip on every single chat message.
 */
export async function retrieveContext(query: string): Promise<string> {
  const q = query.toLowerCase();
  const words = q.split(/\s+/).filter((w) => w.length > 2);

  const { cities, areas, guides, blogPosts } = await getData();

  const matches = (text: string) => words.some((w) => text.toLowerCase().includes(w));

  const relevantCities = cities.filter((c) => matches(c.name) || matches(c.description));
  const relevantAreas = areas.filter((a) => matches(a.name) || matches(a.overview));
  const relevantGuides = guides.filter((g) => matches(g.title) || matches(g.description || ""));
  const relevantPosts = blogPosts.filter((p) => matches(p.title) || matches(p.excerpt));

  const citiesToShow = relevantCities.length > 0 ? relevantCities : cities.slice(0, 8);

  let context = "";

  context += "## UK Cities Data\n";
  citiesToShow.forEach((c) => {
    context += `- ${c.name}: avg price £${c.avgPrice}, rental yield ${c.avgYield}%, 5yr growth ${c.growthRate}%. ${c.tagline}\n`;
  });

  if (relevantAreas.length > 0) {
    context += "\n## Relevant Areas\n";
    relevantAreas.slice(0, 5).forEach((a) => {
      context += `- ${a.name} (in ${a.citySlug}): 1-bed from £${a.pricing.oneBed}, yield ${a.rentalYield}%, investment score ${a.investmentScore}/10. ${a.overview.slice(0, 300)}\n`;
    });
  }

  if (relevantGuides.length > 0) {
    context += "\n## Relevant Guides Available\n";
    relevantGuides.forEach((g) => {
      context += `- "${g.title}": ${g.description}\n`;
    });
  }

  if (relevantPosts.length > 0) {
    context += "\n## Relevant Blog Posts\n";
    relevantPosts.forEach((p) => {
      context += `- "${p.title}": ${p.excerpt}\n`;
    });
  }

  return context;
}
