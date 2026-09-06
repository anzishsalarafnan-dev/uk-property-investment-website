import { calculateValuation } from "./valuation";
import type { Area } from "@/types/area";

const mockArea: Area = {
  slug: "test-area",
  citySlug: "test-city",
  name: "Test Area",
  images: [],
  investmentScore: 8,
  pricing: { studio: 100000, oneBed: 150000, twoBed: 200000, threeBed: 250000 },
  rentalYield: 6,
  growthProjection: 20,
  lastUpdated: "2026-01-01",
  overview: "Test overview",
  amenities: { schools: 1, hospitals: 1, transport: [], crimeRate: "Low" },
  faqs: [],
  latitude: 0,
  longitude: 0,
};

describe("calculateValuation", () => {
  it("returns the base price unchanged for average condition", () => {
    const result = calculateValuation(mockArea, "1-bed", "average");
    expect(result.medium).toBe(150000);
  });

  it("applies a positive adjustment for good condition", () => {
    const result = calculateValuation(mockArea, "1-bed", "good");
    expect(result.medium).toBeGreaterThan(150000);
  });

  it("applies a negative adjustment for needs-renovation condition", () => {
    const result = calculateValuation(mockArea, "1-bed", "needs-renovation");
    expect(result.medium).toBeLessThan(150000);
  });

  it("returns a low estimate below the medium estimate", () => {
    const result = calculateValuation(mockArea, "2-bed", "average");
    expect(result.low).toBeLessThan(result.medium);
  });

  it("returns a high estimate above the medium estimate", () => {
    const result = calculateValuation(mockArea, "2-bed", "average");
    expect(result.high).toBeGreaterThan(result.medium);
  });

  it("maps 'house' property type to three-bed pricing", () => {
    const result = calculateValuation(mockArea, "house", "average");
    expect(result.medium).toBe(250000);
  });

  it("includes the correct area slug in the result", () => {
    const result = calculateValuation(mockArea, "studio", "average");
    expect(result.areaSlug).toBe("test-area");
  });
});
