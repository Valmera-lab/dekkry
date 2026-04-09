import { getAllProducts } from '@/lib/products-db';
import { getAverageRating, getReviewsByProduct } from '@/lib/reviews-db';
import { ProductCard } from '@/components/product/ProductCard';
import { Product } from '@/types';

export const revalidate = 3600;

const CATEGORIES = ['all', 'tops', 'bottoms', 'outerwear', 'accessories'];

interface Props {
  searchParams: { category?: string; sort?: string };
}

export default function ProductsPage({ searchParams }: Props) {
  const category = searchParams.category || 'all';
  const sort = searchParams.sort || 'newest';

  let products: Product[] = getAllProducts();

  if (category !== 'all') {
    products = products.filter((p) => p.category === category);
  }

  if (sort === 'price-asc') products.sort((a, b) => a.price - b.price);
  else if (sort === 'price-desc') products.sort((a, b) => b.price - a.price);

  return (
    <div className="bg-brand-black min-h-screen">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 py-14">

        {/* Header */}
        <div className="mb-12 border-b border-brand-gray-800 pb-8">
          <p className="text-[10px] font-semibold tracking-[0.4em] text-brand-gray-500 uppercase mb-3">SS25 Collection</p>
          <h1 className="text-5xl sm:text-6xl font-black tracking-[-0.03em] leading-none text-brand-white">Shop</h1>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-10 items-start sm:items-center justify-between">
          <div className="flex flex-wrap gap-1.5">
            {CATEGORIES.map((cat) => (
              <a
                key={cat}
                href={`/products${cat !== 'all' ? `?category=${cat}` : ''}`}
                className={`text-[10px] font-bold tracking-[0.25em] uppercase px-4 py-2 border transition-colors duration-200 ${
                  category === cat
                    ? 'border-brand-accent bg-brand-accent text-brand-black'
                    : 'border-brand-gray-700 text-brand-gray-500 hover:border-brand-gray-500 hover:text-brand-white'
                }`}
              >
                {cat}
              </a>
            ))}
          </div>
          <p className="text-[10px] text-brand-gray-600 tracking-widest uppercase">
            {products.length} {products.length === 1 ? 'piece' : 'pieces'}
          </p>
        </div>

        {/* Grid */}
        {products.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
            {products.map((product, index) => (
              <ProductCard
                key={product.id}
                product={product}
                averageRating={getAverageRating(product.id)}
                reviewCount={getReviewsByProduct(product.id).length}
                priority={index < 4}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-24">
            <p className="text-brand-gray-500">No pieces in this category yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}
