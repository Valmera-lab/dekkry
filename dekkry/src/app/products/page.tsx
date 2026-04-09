import { getAllProducts } from '@/lib/products-db';
import { Product } from '@/types';
import Image from 'next/image';
import Link from 'next/link';

export const revalidate = 3600;

const CATS = ['all', 'tops', 'bottoms', 'outerwear', 'accessories'];

interface Props {
  searchParams: { category?: string };
}

export default function ProductsPage({ searchParams }: Props) {
  const cat = searchParams.category || 'all';
  let products: Product[] = getAllProducts();
  if (cat !== 'all') products = products.filter((p) => p.category === cat);

  return (
    <div className="bg-brand-black min-h-screen">

      {/* Header */}
      <div className="px-5 sm:px-8 pt-8 pb-6 border-b border-brand-gray-800">
        <p className="font-bold text-[8px] tracking-[0.6em] uppercase text-brand-gray-700 mb-2">SS25</p>
        <h1
          className="font-black tracking-[-0.04em] leading-none text-brand-white"
          style={{ fontSize: 'clamp(48px, 11vw, 120px)' }}
        >
          Shop
        </h1>
      </div>

      {/* Filter tabs — no borders, just text */}
      <div className="px-5 sm:px-8 py-4 border-b border-brand-gray-800 flex items-center gap-5 overflow-x-auto no-scrollbar">
        {CATS.map((c) => (
          <a
            key={c}
            href={`/products${c !== 'all' ? `?category=${c}` : ''}`}
            className={`flex-shrink-0 font-black text-[9px] tracking-[0.4em] uppercase transition-colors duration-150 ${
              cat === c ? 'text-brand-lime' : 'text-brand-gray-600 hover:text-brand-white'
            }`}
          >
            {c}
          </a>
        ))}
        <span className="ml-auto flex-shrink-0 font-bold text-[8px] tracking-[0.4em] uppercase text-brand-gray-800">
          {products.length} items
        </span>
      </div>

      {/* Grid — pure photos, 1px separators */}
      {products.length > 0 ? (
        <div
          className="grid grid-cols-2 lg:grid-cols-4"
          style={{ gap: '1px', background: '#1c1a18' }}
        >
          {products.map((p, i) => (
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
              <div className="absolute inset-0 bg-brand-black/0 group-hover:bg-brand-black/55 transition-all duration-300" />
              <div className="absolute bottom-0 left-0 right-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 p-4">
                <p className="font-black text-[9px] tracking-[0.2em] uppercase text-brand-white leading-tight">{p.name}</p>
                <p className="font-bold text-[9px] text-brand-lime mt-0.5">${p.price}</p>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="flex items-center justify-center py-32">
          <p className="font-black text-[9px] tracking-[0.5em] uppercase text-brand-gray-700">Nothing yet</p>
        </div>
      )}
    </div>
  );
}
