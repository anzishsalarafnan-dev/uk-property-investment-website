export interface Guide {
  slug: string;
  title: string;
  type: "city-guide" | "area-report" | "calculator" | "special";
  citySlug?: string;
  description: string;
  previewImages: string[];
  pdfPath: string;
}
