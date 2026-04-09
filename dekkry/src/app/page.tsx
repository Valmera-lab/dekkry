import { getAllProducts } from '@/lib/products-db';
import { getAverageRating, getReviewsByProduct } from '@/lib/reviews-db';
import { ProductCard } from '@/components/product/ProductCard';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';

export const revalidate = 3600;

export default function HomePage() {
  const allProducts = getAllProducts();
  const featured = allProducts.filter((p) => p.featured).slice(0, 3);
  const latest = allProducts.slice(0, 8);
  const heroImage = allProducts[0]?.variants[0]?.images?.[0] || allProducts[0]?.images?.[0] || null;

  return (
    <div className="bg-brand-black">

      {/* HERO */}
      <section className="relative min-h-screen flex flex-col justify-end overflow-hidden grain">
        {heroImage && (
          <div className="absolute inset-0">
            <Image
              src={heroImage}
              alt="DEKKRY"
              fill
              className="object-cover object-center scale-[1.02]"
              priority
              sizes="100vw"
              quality={90}
            />
            {/* Heavy dark vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-brand-black/40 to-brand-black/20" />
            <div className="absolute inset-0 bg-gradient-to-r from-brand-black/70 to-transparent" />
          </div>
        )}

        {/* Top label */}
        <div className="relative z-10 flex items-center justify-between px-6 sm:px-10 pt-8 pb-0">
          <span className="text-[10px] font-semibold tracking-[0.4em] text-brand-white/40 uppercase">SS25</span>
          <span className="text-[10px] font-semibold tracking-[0.4em] text-brand-white/40 uppercase">New Arrival</span>
        </div>

        {/* Main hero content */}
        <div className="relative z-10 px-6 sm:px-10 pb-16 pt-32">
          <div className="max-w-7xl mx-auto">
            {/* Giant brand name */}
            <div className="overflow-hidden mb-2">
              <h1
                className="font-black leading-none tracking-[-0.04em] text-brand-white select-none"
                style={{ fontSize: 'clamp(80px, 18vw, 220px)' }}
              >
                DEKKRY
              </h1>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
              <p className="text-sm text-brand-white/50 max-w-xs leading-relaxed">
                Streetwear for those who move different. No compromise. No filler. Just heat.
              </p>
              <Link
                href="/products"
                className="group inline-flex items-center gap-3 bg-brand-accent text-brand-black font-black text-xs tracking-[0.25em] uppercase px-7 py-4 hover:bg-brand-white transition-colors duration-200 self-start sm:self-auto"
              >
                Shop Now
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom scroll hint */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1 opacity-30">
          <span className="text-[9px] tracking-[0.3em] uppercase text-brand-white">Scroll</span>
          <div className="w-px h-8 bg-brand-white/50" />
        </div>
      </section>

      {/* TICKER */}
      <section className="border-y border-brand-gray-800 py-3 overflow-hidden bg-brand-black">
        <div className="flex whitespace-nowrap" style={{ animation: 'scroll 25s linear infinite' }}>
          {Array(10).fill(null).map((_, i) => (
            <span key={i} className="text-[10px] font-black tracking-[0.35em] uppercase text-brand-gray-600 mx-10 flex-shrink-0">
              DEKKRY ✦ SS25 ✦ PREMIUM STREETWEAR ✦ LIMITED DROPS ✦ NEW COLLECTION ✦
            </span>
          ))}
        </div>
      </section>

      {/* FEATURED DROPS */}
      {featured.length > 0 && (
        <section className="py-20 px-6 sm:px-10">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-end justify-between mb-10">
              <div>
                <p className="text-[10px] font-semibold tracking-[0.4em] text-brand-accent uppercase mb-1">Featured</p>
                <h2 className="text-4xl sm:text-5xl font-black tracking-[-0.03em] leading-none">
                  Current Drops
                </h2>
              </div>
              <Link href="/products" className="hidden sm:flex items-center gap-2 text-[10px] font-bold tracking-[0.3em] uppercase text-brand-gray-500 hover:text-brand-white transition-colors group">
                All Pieces <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* Asymmetric grid */}
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
              {featured[0] && (
                <div className="sm:col-span-7">
                  <ProductCard
                    product={featured[0]}
                    averageRating={getAverageRating(featured[0].id)}
                    reviewCount={getReviewsByProduct(featured[0].id).length}
                    priority
                    large
                  />
                </div>
              )}
              <div className="sm:col-span-5 flex flex-col gap-3">
                {featured[1] && (
                  <ProductCard
                    product={featured[1]}
                    averageRating={getAverageRating(featured[1].id)}
                    reviewCount={getReviewsByProduct(featured[1].id).length}
                    priority
                  />
                )}
                {featured[2] && (
                  <ProductCard
                    product={featured[2]}
                    averageRating={getAverageRating(featured[2].id)}
                    reviewCount={getReviewsByProduct(featured[2].id).length}
                  />
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* STATEMENT STRIP */}
      <section className="py-16 px-6 sm:px-10 border-t border-brand-gray-800">
        <div className="max-w-7xl mx-auto">
          <p
            className="font-black tracking-[-0.04em] leading-none text-brand-gray-800 select-none"
            style={{ fontSize: 'clamp(48px, 10vw, 140px)' }}
          >
            BUILT FOR<br />THE REAL ONES
          </p>
        </div>
      </section>

      {/* ALL PIECES */}
      <section className="py-20 px-6 sm:px-10 border-t border-brand-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="text-[10px] font-semibold tracking-[0.4em] text-brand-gray-500 uppercase mb-1">Catalogue</p>
              <h2 className="text-4xl sm:text-5xl font-black tracking-[-0.03em] leading-none">All Pieces</h2>
            </div>
            <Link href="/products" className="hidden sm:flex items-center gap-2 text-[10px] font-bold tracking-[0.3em] uppercase text-brand-gray-500 hover:text-brand-white transition-colors group">
              Full Shop <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {latest.map((product, i) => (
              <ProductCard
                key={product.id}
                product={product}
                averageRating={getAverageRating(product.id)}
                reviewCount={getReviewsByProduct(product.id).length}
                priority={i < 4}
              />
            ))}
          </div>
        </div>
      </section>

      {/* SHIP STRIP */}
      <section className="border-t border-brand-gray-800 py-10 px-6 sm:px-10">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-1 h-8 bg-brand-accent flex-shrink-0" />
            <div>
              <p className="text-xs font-black tracking-wide uppercase text-brand-white">Ships Worldwide</p>
              <p className="text-xs text-brand-gray-500 mt-0.5">~2 week delivery · Secure checkout</p>
            </div>
          </div>
          <Link href="/shipping" className="text-[10px] font-bold tracking-[0.3em] uppercase text-brand-gray-500 hover:text-brand-white transition-colors">
            Shipping Info →
          </Link>
        </div>
      </section>

    </div>
  );
}
