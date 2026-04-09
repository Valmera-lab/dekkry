'use client';
import { Product } from '@/types';
import Image from 'next/image';
import { useState } from 'react';
import { formatPrice, cn } from '@/lib/utils';
import { useCartStore } from '@/lib/cart-store';
import Link from 'next/link';
import { StarRating } from '@/components/product/StarRating';

interface Props {
  product: Product;
  averageRating?: number;
  reviewCount?: number;
}

export function ProductPageClient({ product, averageRating = 0, reviewCount = 0 }: Props) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState(product.variants[0]?.color || '');
  const [added, setAdded] = useState(false);
  const [error, setError] = useState('');
  const addItem = useCartStore((s) => s.addItem);

  const currentVariant = product.variants.find((v) => v.color === selectedColor) ?? product.variants[0];
  const imgs = (currentVariant?.images?.length) ? currentVariant.images : product.images;

  function handleAdd() {
    if (!selectedSize) { setError('Select a size'); return; }
    setError('');
    addItem({
      productId: product.id,
      productName: product.name,
      productImage: imgs[0],
      price: product.price,
      size: selectedSize,
      color: selectedColor,
      quantity: 1,
      sourceUrl: product.sourceUrl,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2200);
  }

  return (
    <div className="bg-brand-black min-h-screen">

      {/* Breadcrumb — dead simple */}
      <div className="px-5 sm:px-8 py-3 border-b border-brand-gray-800">
        <div className="flex items-center gap-2 font-bold text-[8px] tracking-[0.35em] uppercase text-brand-gray-700">
          <Link href="/" className="hover:text-brand-white transition-colors">Home</Link>
          <span>/</span>
          <Link href="/products" className="hover:text-brand-white transition-colors">Shop</Link>
          <span>/</span>
          <span className="text-brand-gray-600">{product.category}</span>
        </div>
      </div>

      {/* Split layout — full height on desktop */}
      <div className="lg:grid lg:grid-cols-2 lg:min-h-[calc(100vh-44px)]">

        {/* LEFT: photo — full bleed, no padding at all */}
        <div className="relative bg-brand-gray-900 aspect-[3/4] lg:aspect-auto lg:h-full">
          <Image
            src={imgs[selectedImage] ?? imgs[0]}
            alt={product.name}
            fill
            className="object-cover"
            sizes="(max-width:1024px) 100vw, 50vw"
            priority
          />

          {/* Thumbnails overlaid at bottom */}
          {imgs.length > 1 && (
            <div className="absolute bottom-3 left-3 flex gap-1.5">
              {imgs.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  className={cn(
                    'relative w-10 h-12 overflow-hidden flex-shrink-0 transition-opacity duration-200',
                    selectedImage === i ? 'opacity-100 ring-1 ring-brand-lime' : 'opacity-35 hover:opacity-65'
                  )}
                >
                  <Image src={img} alt="" fill className="object-cover" sizes="40px" loading="lazy" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* RIGHT: info — clean, no boxes */}
        <div className="px-6 sm:px-10 py-10 flex flex-col gap-5">

          {/* Category */}
          <span className="font-bold text-[8px] tracking-[0.6em] uppercase text-brand-gray-600">
            {product.category}
          </span>

          {/* Name */}
          <h1
            className="font-black tracking-[-0.03em] leading-none text-brand-white"
            style={{ fontSize: 'clamp(28px, 4.5vw, 54px)' }}
          >
            {product.name}
          </h1>

          {/* Rating */}
          {reviewCount > 0 && (
            <a href="#reviews" className="flex items-center gap-2 group w-fit">
              <StarRating rating={averageRating} size={11} />
              <span className="font-bold text-[9px] tracking-wide text-brand-gray-600 group-hover:text-brand-white transition-colors">
                {averageRating.toFixed(1)} · {reviewCount} reviews
              </span>
            </a>
          )}

          {/* Price */}
          <p className="font-black text-3xl text-brand-white tracking-tight">{formatPrice(product.price)}</p>

          {/* Description */}
          <p className="text-[11px] text-brand-gray-500 leading-relaxed max-w-sm">{product.description}</p>

          {/* Divider */}
          <div className="h-px bg-brand-gray-800" />

          {/* Colour */}
          {product.variants.length > 1 && (
            <div>
              <p className="font-bold text-[8px] tracking-[0.5em] uppercase text-brand-gray-600 mb-3">
                Colour — <span className="text-brand-white">{selectedColor}</span>
              </p>
              <div className="flex gap-2">
                {product.variants.map((v) => (
                  <button
                    key={v.color}
                    title={v.color}
                    onClick={() => { setSelectedColor(v.color); setSelectedImage(0); }}
                    className={cn(
                      'w-6 h-6 rounded-full border-2 transition-all',
                      selectedColor === v.color
                        ? 'border-brand-lime scale-110'
                        : 'border-brand-gray-700 hover:border-brand-gray-500'
                    )}
                    style={{ backgroundColor: v.colorHex ?? '#555' }}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Size */}
          <div>
            <p className="font-bold text-[8px] tracking-[0.5em] uppercase text-brand-gray-600 mb-3">
              Size {selectedSize && <span className="text-brand-white">— {selectedSize}</span>}
            </p>
            <div className="flex flex-wrap gap-1.5">
              {product.sizes.map((sz) => (
                <button
                  key={sz}
                  onClick={() => { setSelectedSize(sz); setError(''); }}
                  className={cn(
                    'font-black text-[9px] tracking-[0.25em] uppercase px-4 py-2.5 border transition-all duration-150',
                    selectedSize === sz
                      ? 'border-brand-lime bg-brand-lime text-brand-black'
                      : 'border-brand-gray-800 text-brand-gray-500 hover:border-brand-gray-600 hover:text-brand-white'
                  )}
                >
                  {sz}
                </button>
              ))}
            </div>
            {error && <p className="font-bold text-[9px] text-red-400 mt-2">{error}</p>}
          </div>

          {/* CTA — no border-radius, lime when normal, white when added */}
          <button
            onClick={handleAdd}
            className={cn(
              'w-full py-4 font-black text-[9px] tracking-[0.5em] uppercase transition-all duration-200 mt-2',
              added
                ? 'bg-brand-white text-brand-black'
                : 'bg-brand-lime text-brand-black hover:bg-brand-white'
            )}
          >
            {added ? '✓ ADDED' : 'ADD TO BAG'}
          </button>

          {/* Micro details */}
          <div className="pt-2 border-t border-brand-gray-800 space-y-1">
            <p className="font-bold text-[9px] tracking-[0.2em] text-brand-gray-700">→ Ships worldwide · ~2 weeks</p>
            <p className="font-bold text-[9px] tracking-[0.2em] text-brand-gray-700">→ Secure checkout via Stripe</p>
          </div>
        </div>
      </div>

      <div id="reviews" />
    </div>
  );
}
