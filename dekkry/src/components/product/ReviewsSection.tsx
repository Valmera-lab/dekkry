import { Review } from '@/types';
import { StarRating } from './StarRating';
import { BadgeCheck } from 'lucide-react';

interface Props {
  reviews: Review[];
  averageRating: number;
  breakdown: Record<number, number>;
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
}

export function ReviewsSection({ reviews, averageRating, breakdown }: Props) {
  const total = reviews.length;

  return (
    <section className="border-t border-brand-gray-800 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          <div className="text-xs font-semibold tracking-[0.4em] text-brand-accent uppercase mb-2">Customer Reviews</div>
          <h2 className="text-3xl font-black tracking-tight">What People Are Saying</h2>
        </div>

        {total === 0 ? (
          <p className="text-brand-gray-500 text-sm">No reviews yet. Be the first.</p>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Summary */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <div className="flex items-end gap-4 mb-4">
                  <span className="text-7xl font-black leading-none">{averageRating.toFixed(1)}</span>
                  <div className="pb-2">
                    <StarRating rating={averageRating} size={20} className="mb-1" />
                    <p className="text-xs text-brand-gray-500">{total} review{total !== 1 ? 's' : ''}</p>
                  </div>
                </div>

                {/* Breakdown bars */}
                <div className="space-y-2 mt-6">
                  {[5, 4, 3, 2, 1].map((star) => {
                    const count = breakdown[star] || 0;
                    const pct = total > 0 ? (count / total) * 100 : 0;
                    return (
                      <div key={star} className="flex items-center gap-3">
                        <span className="text-xs text-brand-gray-400 w-4 text-right">{star}</span>
                        <div className="flex-1 h-1.5 bg-brand-gray-800 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-brand-accent rounded-full transition-all duration-500"
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                        <span className="text-xs text-brand-gray-500 w-4">{count}</span>
                      </div>
                    );
                  })}
                </div>

                <div className="mt-8 p-4 border border-brand-gray-800 bg-brand-gray-900/50">
                  <p className="text-xs text-brand-gray-400 leading-relaxed">
                    All reviews are from verified customers who purchased this product.
                  </p>
                </div>
              </div>
            </div>

            {/* Review list */}
            <div className="lg:col-span-2 space-y-8">
              {reviews.map((review) => (
                <div key={review.id} className="border-b border-brand-gray-800 pb-8 last:border-0">
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-bold text-brand-white">{review.author}</span>
                        {review.verified && (
                          <span className="flex items-center gap-1 text-[10px] text-green-400 font-semibold">
                            <BadgeCheck size={11} />
                            Verified
                          </span>
                        )}
                        {review.location && (
                          <span className="text-[10px] text-brand-gray-500">{review.location}</span>
                        )}
                      </div>
                      <StarRating rating={review.rating} size={13} />
                    </div>
                    <span className="text-xs text-brand-gray-500 whitespace-nowrap">{formatDate(review.date)}</span>
                  </div>

                  <h4 className="text-sm font-bold text-brand-white mb-2">{review.title}</h4>
                  <p className="text-sm text-brand-gray-400 leading-relaxed mb-3">{review.body}</p>

                  {(review.size || review.color) && (
                    <div className="flex gap-4">
                      {review.size && (
                        <span className="text-[10px] text-brand-gray-500 uppercase tracking-wider">
                          Size: <span className="text-brand-gray-300">{review.size}</span>
                        </span>
                      )}
                      {review.color && (
                        <span className="text-[10px] text-brand-gray-500 uppercase tracking-wider">
                          Colour: <span className="text-brand-gray-300">{review.color}</span>
                        </span>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
