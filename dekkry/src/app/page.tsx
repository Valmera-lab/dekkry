import { getAllProducts } from '@/lib/products-db';
import { getAverageRating, getReviewsByProduct } from '@/lib/reviews-db';
import { ProductCard } from '@/components/product/ProductCard';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';

export const revalidate = 60;

export default function HomePage() {
  const allProducts = getAllProducts();
  const featured = allProducts.filter((p) => p.featured).slice(0, 3);
  const latest = allProducts.slice(0, 8);
  const heroImage = allProducts[0]?.images?.[0] || null;

  return (
    <div>
      {/* Hero */}
      <section className="relative min-h-[90vh] flex items-end pb-20 overflow-hidden">
        {heroImage ? (
          <div className="absolute inset-0">
            <Image
              src={heroImage}
              alt="DEKKRY"
              fill
              className="object-cover object-top scale-105"
              priority
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-brand-black via-brand-black/80 to-brand-black/20" />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-transparent to-brand-black/30" />
          </div>
        ) : (
          <>
            <div className="absolute inset-0 bg-gradient-to-b from-brand-gray-900 via-brand-black to-brand-black" />
            <div className="absolute inset-0 opacity-5">
              <div className="w-full h-full" style={{
                backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
                backgroundSize: '80px 80px'
              }} />
            </div>
          </>
        )}

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-3xl">
            <div className="text-xs font-semibold tracking-[0.4em] text-brand-accent uppercase mb-6">
              New Collection
            </div>
            <h1 className="text-7xl sm:text-9xl font-black tracking-[-0.02em] leading-none mb-6 text-brand-white drop-shadow-2xl">
              DEKKRY
            </h1>
            <p className="text-lg sm:text-xl text-brand-gray-300 mb-10 max-w-lg leading-relaxed drop-shadow-lg">
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
                className="inline-flex items-center gap-2 border border-brand-gray-400 text-brand-white font-semibold text-sm tracking-widest uppercase px-8 py-4 hover:border-brand-white hover:bg-white/10 transition-all duration-200"
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
              <ProductCard
                key={product.id}
                product={product}
                averageRating={getAverageRating(product.id)}
                reviewCount={getReviewsByProduct(product.id).length}
              />
            ))}
          </div>
        </section>
      )}

      {/* Statement banner */}
      <section className="bg-brand-accent py-6 overflow-hidden">
        <div className="flex whitespace-nowrap" style={{ animation: 'scroll 20s linear infinite' }}>
          {Array(8).fill(null).map((_, i) => (
            <span key={i} className="text-brand-black font-black text-sm tracking-[0.3em] uppercase mx-8 flex-shrink-0">
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
            <ProductCard
              key={product.id}
              product={product}
              averageRating={getAverageRating(product.id)}
              reviewCount={getReviewsByProduct(product.id).length}
            />
          ))}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="border-t border-brand-gray-800 py-24 text-center">
        <div className="text-xs font-semibold tracking-[0.4em] text-brand-accent uppercase mb-4">The Brand</div>
        <h2 className="text-5xl sm:text-6xl font-black tracking-tight mb-6">Built Different</h2>
        <p className="text-brand-gray-400 max-w-md mx-auto mb-10 text-sm leading-relaxed">
          DEKKRY isn&apos;t fast fashion. Every piece is sourced and quality-checked before it reaches you. No compromises.
        </p>
        <Link
          href="/products"
          className="inline-flex items-center gap-2 bg-brand-accent text-brand-black font-black text-sm tracking-widest uppercase px-10 py-4 hover:bg-white transition-colors duration-200"
        >
          Shop the Full Collection <ArrowRight size={16} />
        </Link>
      </section>
    </div>
  );
}
