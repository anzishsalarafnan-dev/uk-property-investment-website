import { supabase } from "@/lib/database/client";
import type { City } from "@/types/city";
import type { Area } from "@/types/area";
import type { Guide } from "@/types/guide";
import type { BlogPost } from "@/types/blog";

// Database rows use snake_case; our app types use camelCase.
// These mappers keep that conversion in one place.

function mapCity(row: any): City {
  return {
    slug: row.slug,
    name: row.name,
    tagline: row.tagline,
    heroImage: row.hero_image,
    population: row.population,
    avgPrice: row.avg_price,
    avgYield: Number(row.avg_yield),
    growthRate: Number(row.growth_rate),
    description: row.description,
    latitude: Number(row.latitude),
    longitude: Number(row.longitude),
  };
}

function mapArea(row: any): Area {
  return {
    slug: row.slug,
    citySlug: row.city_slug,
    name: row.name,
    images: row.images || [],
    investmentScore: Number(row.investment_score),
    pricing: row.pricing,
    rentalYield: Number(row.rental_yield),
    growthProjection: Number(row.growth_projection),
    lastUpdated: row.last_updated,
    overview: row.overview,
    amenities: row.amenities,
    faqs: row.faqs || [],
    latitude: Number(row.latitude),
    longitude: Number(row.longitude),
  };
}

export async function getAllCities(): Promise<City[]> {
  const { data, error } = await supabase.from("cities").select("*").order("name");
  if (error) {
    console.error("getAllCities error:", error.message);
    return [];
  }
  return (data || []).map(mapCity);
}

export async function getCityBySlug(slug: string): Promise<City | null> {
  const { data, error } = await supabase.from("cities").select("*").eq("slug", slug).single();
  if (error || !data) return null;
  return mapCity(data);
}

export async function getAllAreas(): Promise<Area[]> {
  const { data, error } = await supabase.from("areas").select("*").order("name");
  if (error) {
    console.error("getAllAreas error:", error.message);
    return [];
  }
  return (data || []).map(mapArea);
}

export async function getAreasByCity(citySlug: string): Promise<Area[]> {
  const { data, error } = await supabase.from("areas").select("*").eq("city_slug", citySlug);
  if (error) {
    console.error("getAreasByCity error:", error.message);
    return [];
  }
  return (data || []).map(mapArea);
}

export async function getAreaBySlug(citySlug: string, areaSlug: string): Promise<Area | null> {
  const { data, error } = await supabase
    .from("areas")
    .select("*")
    .eq("city_slug", citySlug)
    .eq("slug", areaSlug)
    .single();
  if (error || !data) return null;
  return mapArea(data);
}

export async function getAreaBySlugOnly(areaSlug: string): Promise<Area | null> {
  const { data, error } = await supabase.from("areas").select("*").eq("slug", areaSlug).single();
  if (error || !data) return null;
  return mapArea(data);
}
function mapGuide(row: any): Guide {
  return {
    slug: row.slug,
    title: row.title,
    type: row.type,
    citySlug: row.city_slug,
    description: row.description,
    previewImages: row.preview_images || [],
    pdfPath: row.pdf_path,
  };
}

function mapBlogPost(row: any): BlogPost {
  return {
    slug: row.slug,
    title: row.title,
    excerpt: row.excerpt,
    content: row.content,
    category: row.category,
    author: row.author,
    publishedAt: row.published_at,
    readTimeMinutes: row.read_time_minutes,
  };
}

export async function getAllGuides(): Promise<Guide[]> {
  const { data, error } = await supabase.from("guides").select("*").order("title");
  if (error) {
    console.error("getAllGuides error:", error.message);
    return [];
  }
  return (data || []).map(mapGuide);
}

export async function getGuideBySlug(slug: string): Promise<Guide | null> {
  const { data, error } = await supabase.from("guides").select("*").eq("slug", slug).single();
  if (error || !data) return null;
  return mapGuide(data);
}

export async function getAllBlogPosts(): Promise<BlogPost[]> {
  const { data, error } = await supabase
    .from("blog_posts")
    .select("*")
    .order("published_at", { ascending: false });
  if (error) {
    console.error("getAllBlogPosts error:", error.message);
    return [];
  }
  return (data || []).map(mapBlogPost);
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  const { data, error } = await supabase.from("blog_posts").select("*").eq("slug", slug).single();
  if (error || !data) return null;
  return mapBlogPost(data);
}
