export type PropertyType = "studio" | "1-bed" | "2-bed" | "3-bed" | "house";
export type PropertyCondition = "good" | "average" | "needs-renovation";

export interface ValuationRequest {
  propertyType: PropertyType;
  sizeSqFt?: number;
  condition: PropertyCondition;
  areaSlug: string;
  email: string;
}

export interface ValuationResult {
  low: number;
  medium: number;
  high: number;
  areaSlug: string;
  generatedAt: string;
}
