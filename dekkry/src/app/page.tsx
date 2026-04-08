import { getAllProducts } from '@/lib/products-db';
import { ProductCard } from '@/components/product/ProductCard';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export const revalidate = 60;

export default function HomePage() {
  const allProducts = getAllProducts();
  const featured = allProducts.filter((p) => p.featured).slice(0, 3);
  const latest = allProducts.slice(0, 8);

  return (
    <div>
      {/* Hero */}
      <section className="relative min-h-[90vh] flex items-end pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-gray-900 via-brand-black to-brand-black" />
        {/* Grid lines accent */}
        <div className="absolute inset-0 opacity-5">
          <div className="w-full h-full" style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
            backgroundSize: '80px 80px'
          }} />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-3xl">
            <div className="text-xs font-semibold tracking-[0.4em] text-brand-accent uppercase mb-6">
              New Collection
            </div>
            <h1 className="text-7xl sm:text-9xl font-black tracking-[-0.02em] leading-none mb-6 text-brand-white">
              DEKKRY
            </h1>
            <p className="text-lg sm:text-xl text-brand-gray-400 mb-10 max-w-lg leading-relaxed">
              Premium streetwear engineered for those who move with purpose. Clean silhouettes. Uncompromising quality.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/products"
                className="inline-flex items-center gap-2 bg-brand-accent text-brand-black font-black text-sm tracking-widest uppercase px-8 py-4 hover:bg-white transition-colors duration-200"
              >
                Shop Now <ArrowRight size={16} />
              </Link>
              <Link
                href="/products?category=tops"
                className="inline-flex items-center gap-2 border border-brand-gray-700 text-brand-white font-semibold text-sm tracking-widest uppercase px-8 py-4 hover:border-brand-white transition-colors duration-200"
              >
                Explore
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured */}
      {featured.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="flex items-center justify-between mb-10">
            <div>
              <div className="text-xs font-semibold tracking-[0.4em] text-brand-accent uppercase mb-2">Drops</div>
              <h2 className="text-4xl font-black tracking-tight">Featured</h2>
            </div>
            <Link href="/products" className="text-sm font-semibold tracking-widest uppercase text-brand-gray-400 hover:text-brand-white flex items-center gap-1 transition-colors">
              View All <ArrowRight size={14} />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featured.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      )}

      {/* Statement banner */}
      <section className="bg-brand-accent py-6 overflow-hidden">
        <div className="whitespace-nowrap animate-[scroll_20s_linear_infinite]">
          {Array(6).fill(null).map((_, i) => (
            <span key={i} className="text-brand-black font-black text-sm tracking-[0.3em] uppercase mx-8">
              DEKKRY STREETWEAR ✦ NEW COLLECTION ✦ PREMIUM QUALITY ✦ LIMITED DROPS ✦
            </span>
          ))}
        </div>
      </section>

      {/* All products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="flex items-center justify-between mb-10">
          <div>
            <div className="text-xs font-semibold tracking-[0.4em] text-brand-accent uppercase mb-2">Catalogue</div>
            <h2 className="text-4xl font-black tracking-tight">All Pieces</h2>
          </div>
          <Link href="/products" className="text-sm font-semibold tracking-widest uppercase text-brand-gray-400 hover:text-brand-white flex items-center gap-1 transition-colors">
            Full Shop <ArrowRight size={14} />
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {latest.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}
