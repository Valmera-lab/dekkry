import reviewsData from '../../data/reviews.json';
import { Review } from '@/types';

const reviews: Review[] = reviewsData as Review[];

export function getReviewsByProduct(productId: string): Review[] {
  return reviews.filter((r) => r.productId === productId);
}

export function getAverageRating(productId: string): number {
  const r = getReviewsByProduct(productId);
  if (!r.length) return 0;
  return r.reduce((sum, rev) => sum + rev.rating, 0) / r.length;
}

export function getRatingBreakdown(productId: string): Record<number, number> {
  const r = getReviewsByProduct(productId);
  const breakdown: Record<number, number> = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
  r.forEach((rev) => { breakdown[rev.rating] = (breakdown[rev.rating] || 0) + 1; });
  return breakdown;
}
