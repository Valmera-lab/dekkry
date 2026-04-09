import { getAllProducts } from '@/lib/products-db';
import { getAverageRating, getReviewsByProduct } from '@/lib/reviews-db';
import { ProductCard } from '@/components/product/ProductCard';
import Link from 'next/link';
import Image from 'next/image';

export const revalidate = 3600;

export default function HomePage() {
  const allProducts = getAllProducts();
  const featured = allProducts.filter((p) => p.featured);
  const latest = allProducts.slice(0, 8);

  const img1 = featured[0]?.variants[0]?.images?.[0] || featured[0]?.images?.[0];
  const img2 = featured[1]?.variants[0]?.images?.[0] || featured[1]?.images?.[0];
  const img3 = featured[2]?.variants[0]?.images?.[0] || featured[2]?.images?.[0];

  return (
    <div className="bg-brand-black overflow-x-hidden">

      {/* ─── HERO ─── */}
      <section className="relative h-screen min-h-[600px] overflow-hidden">
        {img1 && (
          <>
            <Image
              src={img1}
              alt="DEKKRY"
              fill
              className="object-cover object-center"
              priority
              quality={85}
              sizes="100vw"
            />
            {/* Dark gradient — heavier at bottom */}
            <div className="absolute inset-0 bg-gradient-to-b from-brand-black/60 via-transparent to-brand-black" />
            <div className="absolute inset-0 bg-brand-black/30" />
          </>
        )}

        {/* Top-left tag */}
        <div className="absolute top-16 left-5 sm:left-8 z-10">
          <span className="text-[9px] font-black tracking-[0.5em] uppercase text-brand-white/50">
            SS25 Collection
          </span>
        </div>

        {/* Top-right tag */}
        <div className="absolute top-16 right-5 sm:right-8 z-10 text-right">
          <span className="text-[9px] font-black tracking-[0.5em] uppercase text-brand-white/50">
            New Drop
          </span>
        </div>

        {/* Massive text — bleeds off right edge intentionally */}
        <div className="absolute bottom-0 left-0 right-0 z-10 pb-10 pl-4 sm:pl-6 overflow-hidden">
          <div
            className="font-black leading-[0.85] tracking-[-0.05em] text-brand-white select-none whitespace-nowrap"
            style={{ fontSize: 'clamp(96px, 22vw, 280px)' }}
          >
            DEKKRY
          </div>
          <div className="flex items-end justify-between px-1 sm:px-2 mt-3 pb-2">
            <p className="text-[11px] text-brand-white/50 max-w-[200px] leading-relaxed">
              Streetwear for those<br />who move different.
            </p>
            <Link
              href="/products"
              className="text-[10px] font-black tracking-[0.3em] uppercase bg-brand-accent text-brand-black px-6 py-3 hover:bg-white transition-colors duration-150 mr-2 sm:mr-0"
            >
              Shop
            </Link>
          </div>
        </div>
      </section>

      {/* ─── TICKER ─── */}
      <div className="border-y border-brand-gray-800 overflow-hidden py-2.5">
        <div className="flex whitespace-nowrap" style={{ animation: 'scroll 30s linear infinite' }}>
          {Array(8).fill(null).map((_, i) => (
            <span key={i} className="text-[9px] font-black tracking-[0.4em] uppercase text-brand-gray-700 mx-8 flex-shrink-0">
              DEKKRY ✦ SS25 ✦ PREMIUM STREETWEAR ✦ LIMITED DROPS ✦
            </span>
          ))}
        </div>
      </div>

      {/* ─── FEATURED — RAW GRID ─── */}
      <section className="py-16">
        {/* Section label — off-center, text sitting on the left edge */}
        <div className="px-5 sm:px-8 mb-6 flex items-baseline gap-6">
          <span className="text-[9px] font-black tracking-[0.5em] uppercase text-brand-gray-600">Featured</span>
          <span className="text-[9px] font-black tracking-[0.5em] uppercase text-brand-accent">— 03 pieces</span>
        </div>

        {/* Irregular featured layout */}
        <div className="grid grid-cols-10 gap-1.5 px-1.5">
          {/* Big card — 6 cols */}
          {featured[0] && (
            <div className="col-span-10 sm:col-span-6">
              <ProductCard
                product={featured[0]}
                averageRating={getAverageRating(featured[0].id)}
                reviewCount={getReviewsByProduct(featured[0].id).length}
                priority
                variant="tall"
              />
            </div>
          )}
          {/* Two stacked — 4 cols */}
          <div className="col-span-10 sm:col-span-4 flex flex-col gap-1.5">
            {featured[1] && (
              <ProductCard
                product={featured[1]}
                averageRating={getAverageRating(featured[1].id)}
                reviewCount={getReviewsByProduct(featured[1].id).length}
                priority
                variant="square"
              />
            )}
            {featured[2] && (
              <ProductCard
                product={featured[2]}
                averageRating={getAverageRating(featured[2].id)}
                reviewCount={getReviewsByProduct(featured[2].id).length}
                variant="square"
              />
            )}
          </div>
        </div>
      </section>

      {/* ─── BRUTAL STATEMENT ─── */}
      <section className="px-5 sm:px-8 py-12 border-t border-brand-gray-800 overflow-hidden">
        <p
          className="font-black leading-none tracking-[-0.05em] text-brand-gray-800 select-none whitespace-nowrap"
          style={{ fontSize: 'clamp(56px, 13vw, 180px)' }}
        >
          NO FILLER.
        </p>
        <p
          className="font-black leading-none tracking-[-0.05em] text-brand-gray-800 select-none whitespace-nowrap -mt-2 sm:-mt-4"
          style={{ fontSize: 'clamp(56px, 13vw, 180px)', transform: 'translateX(6vw)' }}
        >
          JUST HEAT.
        </p>
      </section>

      {/* ─── ALL PIECES ─── */}
      <section className="border-t border-brand-gray-800 py-14">
        <div className="px-5 sm:px-8 mb-8 flex items-baseline justify-between">
          <div className="flex items-baseline gap-6">
            <span className="text-[9px] font-black tracking-[0.5em] uppercase text-brand-gray-600">All Pieces</span>
            <span className="text-[9px] font-black tracking-[0.5em] uppercase text-brand-gray-700">— {latest.length} items</span>
          </div>
          <Link href="/products" className="text-[9px] font-black tracking-[0.4em] uppercase text-brand-gray-500 hover:text-brand-white transition-colors">
            Full Catalogue →
          </Link>
        </div>

        {/* Tight grid — no padding on sides for edge-to-edge feel */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-px bg-brand-gray-800">
          {latest.map((product, i) => (
            <div key={product.id} className="bg-brand-black">
              <ProductCard
                product={product}
                averageRating={getAverageRating(product.id)}
                reviewCount={getReviewsByProduct(product.id).length}
                priority={i < 4}
                variant="grid"
              />
            </div>
          ))}
        </div>
      </section>

      {/* ─── BOTTOM STRIP ─── */}
      <div className="border-t border-brand-gray-800 px-5 sm:px-8 py-8 flex items-center justify-between">
        <p className="text-[9px] font-black tracking-[0.4em] uppercase text-brand-gray-700">Ships Worldwide</p>
        <Link href="/shipping" className="text-[9px] font-black tracking-[0.4em] uppercase text-brand-gray-700 hover:text-brand-white transition-colors">
          Shipping Info →
        </Link>
      </div>

    </div>
  );
}
