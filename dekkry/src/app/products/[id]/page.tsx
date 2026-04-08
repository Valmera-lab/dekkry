import { getProductById, getAllProducts } from '@/lib/products-db';
import { notFound } from 'next/navigation';
import { ProductPageClient } from './ProductPageClient';

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
  return <ProductPageClient product={product} />;
}
