import { getAllProducts } from '@/lib/products-db';
import { getAverageRating, getReviewsByProduct } from '@/lib/reviews-db';
import { ProductCard } from '@/components/product/ProductCard';
import Link from 'next/link';
import Image from 'next/image';

export const revalidate = 3600;

export default function HomePage() {
  const all = getAllProducts();
  const featured = all.filter((p) => p.featured);
  const rest = all.filter((p) => !p.featured);

  const heroImg  = featured[0]?.variants[0]?.images?.[0] ?? featured[0]?.images?.[0];
  const img2     = featured[1]?.variants[0]?.images?.[0] ?? featured[1]?.images?.[0];
  const img3     = featured[2]?.variants[0]?.images?.[0] ?? featured[2]?.images?.[0];

  return (
    <div className="bg-brand-black" style={{ marginTop: '-44px' }}>

      {/* ══════════════════════════════════════
          HERO — full viewport, image fills it
          Type punches through the image
      ══════════════════════════════════════ */}
      <section className="relative h-screen min-h-[640px] overflow-hidden">

        {heroImg && (
          <Image
            src={heroImg}
            alt=""
            fill
            priority
            quality={90}
            sizes="100vw"
            className="object-cover object-center"
          />
        )}

        {/* Gradient — bottom-heavy so text reads */}
        <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-brand-black/20 to-transparent" />

        {/* Season tag — top left, tiny */}
        <div className="absolute top-14 left-5 sm:left-8 z-10">
          <span className="font-bold text-[9px] tracking-[0.5em] uppercase text-brand-white/40">SS25</span>
        </div>

        {/* DEKKRY — absolutely massive, sits across the bottom third
            Intentionally clips off the right edge */}
        <div className="absolute bottom-0 left-0 right-0 z-10 overflow-hidden">
          <h1
            className="font-black leading-[0.82] tracking-[-0.05em] text-brand-white whitespace-nowrap select-none pl-3 sm:pl-5"
            style={{ fontSize: 'clamp(100px, 24vw, 320px)' }}
          >
            DEKKRY
          </h1>

          {/* Subline row — sits tight under the giant type */}
          <div className="flex items-center justify-between px-4 sm:px-6 pb-6 pt-2">
            <p className="font-bold text-[10px] tracking-[0.15em] text-brand-white/50 uppercase max-w-[220px] leading-relaxed">
              Clean cuts.<br />Raw energy.
            </p>
            <Link
              href="/products"
              className="font-black text-[9px] tracking-[0.4em] uppercase text-brand-black bg-brand-lime px-5 py-2.5 hover:bg-brand-white transition-colors duration-150"
            >
              Shop
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          TICKER
      ══════════════════════════════════════ */}
      <div className="overflow-hidden border-t border-brand-gray-800 py-2.5">
        <div className="ticker-track flex whitespace-nowrap w-max">
          {Array(16).fill('DEKKRY ✦ SS25 ✦ NEW DROP ✦ STREETWEAR ✦ ').map((t, i) => (
            <span key={i} className="font-black text-[9px] tracking-[0.5em] uppercase text-brand-gray-700 mx-6 flex-shrink-0">
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* ══════════════════════════════════════
          FEATURED — Palace-style layout:
          NO card borders, NO boxes, just photos
          sitting next to each other with type
          floating independently
      ══════════════════════════════════════ */}
      {featured.length > 0 && (
        <section className="pt-16 pb-0">

          {/* Label floats left — no container */}
          <div className="px-5 sm:px-8 mb-4 flex items-center gap-4">
            <span className="font-black text-[8px] tracking-[0.6em] uppercase text-brand-gray-600">New</span>
            <div className="h-px flex-1 bg-brand-gray-800" />
            <Link
              href="/products"
              className="font-black text-[8px] tracking-[0.5em] uppercase text-brand-gray-600 hover:text-brand-lime transition-colors"
            >
              All →
            </Link>
          </div>

          {/* Three photos — no card wrapper, no shadow, no border-radius
              They just sit edge-to-edge with a 1px gap */}
          <div className="flex gap-px">
            {/* Big left photo */}
            {featured[0] && (
              <Link
                href={`/products/${featured[0].id}`}
                className="relative flex-[5] overflow-hidden group"
                style={{ aspectRatio: '2/3' }}
              >
                <Image
                  src={featured[0].variants[0]?.images?.[0] ?? featured[0].images[0]}
                  alt={featured[0].name}
                  fill
                  priority
                  sizes="50vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                />
                {/* Name sits on top of photo — bottom left */}
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <p className="font-black text-[10px] tracking-[0.2em] uppercase text-brand-white/80 leading-tight">
                    {featured[0].name}
                  </p>
                  <p className="font-bold text-[10px] text-brand-lime mt-0.5">
                    ${featured[0].price}
                  </p>
                </div>
              </Link>
            )}

            {/* Right column — two stacked */}
            <div className="flex-[3] flex flex-col gap-px">
              {featured[1] && (
                <Link
                  href={`/products/${featured[1].id}`}
                  className="relative overflow-hidden group flex-1"
                  style={{ aspectRatio: '3/2' }}
                >
                  <Image
                    src={featured[1].variants[0]?.images?.[0] ?? featured[1].images[0]}
                    alt={featured[1].name}
                    fill
                    priority
                    sizes="35vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-3">
                    <p className="font-black text-[9px] tracking-[0.2em] uppercase text-brand-white/80">
                      {featured[1].name}
                    </p>
                    <p className="font-bold text-[9px] text-brand-lime">${featured[1].price}</p>
                  </div>
                </Link>
              )}
              {featured[2] && (
                <Link
                  href={`/products/${featured[2].id}`}
                  className="relative overflow-hidden group flex-1"
                  style={{ aspectRatio: '3/2' }}
                >
                  <Image
                    src={featured[2].variants[0]?.images?.[0] ?? featured[2].images[0]}
                    alt={featured[2].name}
                    fill
                    sizes="35vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-3">
                    <p className="font-black text-[9px] tracking-[0.2em] uppercase text-brand-white/80">
                      {featured[2].name}
                    </p>
                    <p className="font-bold text-[9px] text-brand-lime">${featured[2].price}</p>
                  </div>
                </Link>
              )}
            </div>
          </div>
        </section>
      )}

      {/* ══════════════════════════════════════
          BIG STATEMENT TEXT
          Corteiz does this — raw, oversized,
          almost broken layout
      ══════════════════════════════════════ */}
      <section className="px-4 sm:px-6 py-14 overflow-hidden border-t border-brand-gray-800 mt-px">
        <p
          className="font-black leading-[0.88] tracking-[-0.04em] text-brand-gray-800 select-none"
          style={{ fontSize: 'clamp(60px, 15vw, 200px)' }}
        >
          NO FILLER.
        </p>
        <p
          className="font-black leading-[0.88] tracking-[-0.04em] text-brand-gray-800 select-none"
          style={{
            fontSize: 'clamp(60px, 15vw, 200px)',
            marginLeft: '8vw',
          }}
        >
          JUST HEAT.
        </p>
      </section>

      {/* ══════════════════════════════════════
          ALL PIECES — pure photo grid
          1px separator lines as the only structure
      ══════════════════════════════════════ */}
      <section className="border-t border-brand-gray-800">

        <div className="px-5 sm:px-8 py-5 flex items-center justify-between">
          <span className="font-black text-[8px] tracking-[0.6em] uppercase text-brand-gray-600">All Pieces</span>
          <Link
            href="/products"
            className="font-black text-[8px] tracking-[0.5em] uppercase text-brand-gray-600 hover:text-brand-lime transition-colors"
          >
            Full Catalogue →
          </Link>
        </div>

        {/* Grid: 2 cols mobile, 4 cols desktop, 1px gaps */}
        <div className="grid grid-cols-2 lg:grid-cols-4" style={{ gap: '1px', background: '#1c1a18' }}>
          {all.map((p, i) => (
            <Link
              key={p.id}
              href={`/products/${p.id}`}
              className="relative bg-brand-black group overflow-hidden block"
              style={{ aspectRatio: '3/4' }}
            >
              <Image
                src={p.variants[0]?.images?.[0] ?? p.images[0]}
                alt={p.name}
                fill
                sizes="(max-width: 1024px) 50vw, 25vw"
                className="object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                loading={i < 4 ? 'eager' : 'lazy'}
              />
              {/* Hover reveal — name + price */}
              <div className="absolute inset-0 bg-brand-black/0 group-hover:bg-brand-black/50 transition-all duration-300" />
              <div className="absolute bottom-0 left-0 right-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 p-3.5">
                <p className="font-black text-[9px] tracking-[0.2em] uppercase text-brand-white leading-tight">{p.name}</p>
                <p className="font-bold text-[9px] text-brand-lime mt-0.5">${p.price}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════
          BOTTOM — sparse, typographic
      ══════════════════════════════════════ */}
      <div className="border-t border-brand-gray-800 px-5 sm:px-8 py-5 flex items-center justify-between">
        <span className="font-bold text-[8px] tracking-[0.5em] uppercase text-brand-gray-700">Ships Worldwide</span>
        <Link
          href="/shipping"
          className="font-bold text-[8px] tracking-[0.5em] uppercase text-brand-gray-700 hover:text-brand-white transition-colors"
        >
          Delivery Info →
        </Link>
      </div>

    </div>
  );
}
