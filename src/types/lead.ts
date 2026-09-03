export interface Lead {
  id: string;
  name: string;
  email: string;
  whatsapp?: string;
  interestedCity?: string;
  interestedArea?: string;
  budgetRange?: string;
  source: string;
  score: number;
  createdAt: string;
}
