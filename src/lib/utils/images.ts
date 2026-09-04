/**
 * Placeholder photography via Lorem Picsum (free, legal, no API key).
 * Seeded by slug so each city/area always gets the same consistent image.
 * When real licensed photography is available, replace with actual URLs
 * in cities.json / areas.json ("heroImage" / "images" fields).
 */
export function getCityPhotoUrl(slug: string, width = 800, height = 500): string {
  return `https://picsum.photos/seed/city-${slug}/${width}/${height}`;
}

export function getAreaPhotoUrl(slug: string, width = 800, height = 500): string {
  return `https://picsum.photos/seed/area-${slug}/${width}/${height}`;
}
