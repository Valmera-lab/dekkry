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
    <div className="bg-brand-cream">
      {/* Hero */}
      <section className="relative min-h-[90vh] flex items-end pb-20 overflow-hidden">
        {heroImage ? (
          <div className="absolute inset-0">
            <Image
              src={heroImage}
              alt="DEKKRY"
              fill
              className="object-cover object-top"
              priority
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-brand-black/80 via-brand-black/50 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-black/60 via-transparent to-transparent" />
          </div>
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-brand-sand to-brand-gray-200" />
        )}

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-3xl">
            <div className="text-xs font-semibold tracking-[0.4em] text-brand-accent uppercase mb-6">
              New Collection
            </div>
            <h1 className="text-7xl sm:text-9xl font-black tracking-[-0.02em] leading-none mb-6 text-white drop-shadow-2xl">
              DEKKRY
            </h1>
            <p className="text-lg sm:text-xl text-white/80 mb-10 max-w-lg leading-relaxed">
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
                href="/about"
                className="inline-flex items-center gap-2 border border-white/60 text-white font-semibold text-sm tracking-widest uppercase px-8 py-4 hover:border-white hover:bg-white/10 transition-all duration-200"
              >
                Our Story
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Marquee */}
      <section className="bg-brand-black py-4 overflow-hidden">
        <div className="flex whitespace-nowrap" style={{ animation: 'scroll 22s linear infinite' }}>
          {Array(8).fill(null).map((_, i) => (
            <span key={i} className="text-brand-cream font-black text-xs tracking-[0.3em] uppercase mx-8 flex-shrink-0">
              DEKKRY STREETWEAR ✦ NEW COLLECTION ✦ PREMIUM QUALITY ✦ LIMITED DROPS ✦
            </span>
          ))}
        </div>
      </section>

      {/* Featured */}
      {featured.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="flex items-center justify-between mb-10">
            <div>
              <div className="text-xs font-semibold tracking-[0.4em] text-brand-gray-400 uppercase mb-2">Drops</div>
              <h2 className="text-4xl font-black tracking-tight text-brand-black">Featured</h2>
            </div>
            <Link href="/products" className="text-sm font-semibold tracking-widest uppercase text-brand-gray-400 hover:text-brand-black flex items-center gap-1 transition-colors">
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

      {/* About teaser */}
      <section className="bg-brand-sand py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
              <div className="text-xs font-semibold tracking-[0.4em] text-brand-gray-400 uppercase mb-4">Who We Are</div>
              <h2 className="text-5xl font-black tracking-tight text-brand-black mb-6 leading-tight">
                Not a brand.<br />A mindset.
              </h2>
              <p className="text-brand-gray-500 leading-relaxed mb-8">
                DEKKRY was born from the idea that streetwear doesn&apos;t have to choose between looking good and feeling real. We source every piece with intention — no filler, no fluff.
              </p>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 text-brand-black font-bold text-sm tracking-widest uppercase border-b-2 border-brand-black pb-1 hover:border-brand-accent hover:text-brand-gray-600 transition-all duration-200"
              >
                Read Our Story <ArrowRight size={14} />
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-brand-gray-200 aspect-square rounded-sm" />
              <div className="bg-brand-gray-300 aspect-[3/4] rounded-sm mt-6" />
            </div>
          </div>
        </div>
      </section>

      {/* All products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="flex items-center justify-between mb-10">
          <div>
            <div className="text-xs font-semibold tracking-[0.4em] text-brand-gray-400 uppercase mb-2">Catalogue</div>
            <h2 className="text-4xl font-black tracking-tight text-brand-black">All Pieces</h2>
          </div>
          <Link href="/products" className="text-sm font-semibold tracking-widest uppercase text-brand-gray-400 hover:text-brand-black flex items-center gap-1 transition-colors">
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

      {/* Shipping teaser strip */}
      <section className="bg-brand-black text-brand-cream py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <div className="text-xs font-semibold tracking-[0.4em] text-brand-accent uppercase mb-2">Delivery</div>
            <p className="text-xl font-black">Ships worldwide in ~2 weeks.</p>
          </div>
          <Link
            href="/shipping"
            className="inline-flex items-center gap-2 border border-brand-cream/30 text-brand-cream font-semibold text-sm tracking-widest uppercase px-6 py-3 hover:border-brand-cream hover:bg-white/10 transition-all duration-200"
          >
            Shipping Info <ArrowRight size={14} />
          </Link>
        </div>
      </section>
    </div>
  );
}
