import areasData from "@/data/areas.json";
import type { PropertyType, PropertyCondition, ValuationResult } from "@/types/property";

const CONDITION_MULTIPLIER: Record<PropertyCondition, number> = {
  good: 1.05,
  average: 1.0,
  "needs-renovation": 0.88,
};

const TYPE_KEY_MAP: Record<PropertyType, keyof (typeof areasData)[number]["pricing"]> = {
  studio: "studio",
  "1-bed": "oneBed",
  "2-bed": "twoBed",
  "3-bed": "threeBed",
  house: "threeBed",
};

export function calculateValuation(
  areaSlug: string,
  propertyType: PropertyType,
  condition: PropertyCondition
): ValuationResult | null {
  const area = areasData.find((a) => a.slug === areaSlug);
  if (!area) return null;

  const basePrice = area.pricing[TYPE_KEY_MAP[propertyType]];
  const adjusted = basePrice * CONDITION_MULTIPLIER[condition];

  return {
    low: Math.round(adjusted * 0.93),
    medium: Math.round(adjusted),
    high: Math.round(adjusted * 1.07),
    areaSlug,
    generatedAt: new Date().toISOString(),
  };
}
