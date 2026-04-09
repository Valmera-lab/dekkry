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

      {/* Header — edge to edge */}
      <div className="px-5 sm:px-8 pt-10 pb-8 border-b border-brand-gray-800">
        <p className="text-[9px] font-black tracking-[0.5em] uppercase text-brand-gray-600 mb-3">SS25</p>
        <h1
          className="font-black tracking-[-0.04em] leading-none text-brand-white"
          style={{ fontSize: 'clamp(52px, 12vw, 120px)' }}
        >
          Shop
        </h1>
      </div>

      {/* Filters — tight, inline */}
      <div className="px-5 sm:px-8 py-5 border-b border-brand-gray-800 flex items-center gap-1 overflow-x-auto no-scrollbar">
        {CATEGORIES.map((cat) => (
          <a
            key={cat}
            href={`/products${cat !== 'all' ? `?category=${cat}` : ''}`}
            className={`flex-shrink-0 text-[9px] font-black tracking-[0.3em] uppercase px-4 py-2 transition-colors duration-150 ${
              category === cat
                ? 'bg-brand-accent text-brand-black'
                : 'text-brand-gray-600 hover:text-brand-white'
            }`}
          >
            {cat}
          </a>
        ))}
        <span className="ml-auto pl-6 text-[9px] font-black tracking-[0.3em] uppercase text-brand-gray-700 flex-shrink-0">
          {products.length} items
        </span>
      </div>

      {/* Grid — edge to edge, 1px gap creates the grid lines */}
      {products.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-px bg-brand-gray-800">
          {products.map((product, index) => (
            <div key={product.id} className="bg-brand-black">
              <ProductCard
                product={product}
                averageRating={getAverageRating(product.id)}
                reviewCount={getReviewsByProduct(product.id).length}
                priority={index < 4}
                variant="grid"
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="flex items-center justify-center py-32">
          <p className="text-[10px] font-black tracking-[0.4em] uppercase text-brand-gray-700">
            Nothing here yet
          </p>
        </div>
      )}
    </div>
  );
}
