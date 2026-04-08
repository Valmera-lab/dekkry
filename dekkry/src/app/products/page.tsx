import { getAllProducts } from '@/lib/products-db';
import { getAverageRating, getReviewsByProduct } from '@/lib/reviews-db';
import { ProductCard } from '@/components/product/ProductCard';
import { Product } from '@/types';

export const revalidate = 60;

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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="mb-10">
        <div className="text-xs font-semibold tracking-[0.4em] text-brand-accent uppercase mb-2">Catalogue</div>
        <h1 className="text-5xl font-black tracking-tight">Shop</h1>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-10 items-start sm:items-center justify-between">
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((cat) => (
            <a
              key={cat}
              href={`/products${cat !== 'all' ? `?category=${cat}` : ''}`}
              className={`text-xs font-semibold tracking-widest uppercase px-4 py-2 border transition-colors duration-200 ${
                category === cat
                  ? 'border-brand-accent bg-brand-accent text-brand-black'
                  : 'border-brand-gray-700 text-brand-gray-400 hover:border-brand-gray-400 hover:text-brand-white'
              }`}
            >
              {cat}
            </a>
          ))}
        </div>
        <select
          className="bg-brand-gray-900 border border-brand-gray-700 text-brand-gray-300 text-xs font-semibold tracking-wider uppercase px-4 py-2 focus:outline-none"
          defaultValue={sort}
          onChange={(e) => {
            const url = new URL(window.location.href);
            url.searchParams.set('sort', e.target.value);
            window.location.href = url.toString();
          }}
        >
          <option value="newest">Newest</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
        </select>
      </div>

      {/* Count */}
      <p className="text-xs text-brand-gray-500 mb-6">
        {products.length} {products.length === 1 ? 'piece' : 'pieces'}
      </p>

      {/* Grid */}
      {products.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              averageRating={getAverageRating(product.id)}
              reviewCount={getReviewsByProduct(product.id).length}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <p className="text-brand-gray-500 text-lg">No pieces in this category yet.</p>
        </div>
      )}
    </div>
  );
}
