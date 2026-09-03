export interface AreaPricing {
  studio: number;
  oneBed: number;
  twoBed: number;
  threeBed: number;
}

export interface Area {
  slug: string;
  citySlug: string;
  name: string;
  images: string[];
  investmentScore: number;
  pricing: AreaPricing;
  rentalYield: number;
  growthProjection: number;
  lastUpdated: string;
  overview: string;
  amenities: {
    schools: number;
    hospitals: number;
    transport: string[];
    crimeRate: string;
  };
  faqs: { question: string; answer: string }[];
}
