/**
 * Returns the best available photo for a city: a real curated landmark
 * photo when one exists in the data, otherwise a consistent Picsum
 * placeholder seeded by slug.
 */
export function getCityPhotoUrl(
  slug: string,
  heroImage: string | undefined,
  width = 800,
  height = 500
): string {
  if (heroImage && heroImage.startsWith("http")) {
    return `${heroImage}?w=${width}&h=${height}&fit=crop&auto=format&q=80`;
  }
  return `https://picsum.photos/seed/city-${slug}/${width}/${height}`;
}

export function getAreaPhotoUrl(slug: string, width = 800, height = 500): string {
  return `https://picsum.photos/seed/area-${slug}/${width}/${height}`;
}
