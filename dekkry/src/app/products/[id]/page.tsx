import { getProductById, getAllProducts } from '@/lib/products-db';
import { getReviewsByProduct, getAverageRating, getRatingBreakdown } from '@/lib/reviews-db';
import { notFound } from 'next/navigation';
import { ProductPageClient } from './ProductPageClient';
import { ReviewsSection } from '@/components/product/ReviewsSection';

export const revalidate = 60;

export async function generateStaticParams() {
  const products = getAllProducts();
  return products.map((p) => ({ id: p.id }));
}

interface Props {
  params: { id: string };
}

export default function ProductPage({ params }: Props) {
  const product = getProductById(params.id);
  if (!product) notFound();

  const reviews = getReviewsByProduct(params.id);
  const averageRating = getAverageRating(params.id);
  const breakdown = getRatingBreakdown(params.id);

  return (
    <>
      <ProductPageClient product={product} averageRating={averageRating} reviewCount={reviews.length} />
      <ReviewsSection reviews={reviews} averageRating={averageRating} breakdown={breakdown} />
    </>
  );
}
