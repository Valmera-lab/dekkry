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

  const currentVariant = product.variants.find((v) => v.color === selectedColor) || product.variants[0];
  const displayImages = (currentVariant?.images && currentVariant.images.length > 0)
    ? currentVariant.images
    : product.images;

  function handleAddToCart() {
    if (!selectedSize) { setError('Pick a size'); return; }
    setError('');
    addItem({
      productId: product.id,
      productName: product.name,
      productImage: displayImages[0],
      price: product.price,
      size: selectedSize,
      color: selectedColor,
      quantity: 1,
      sourceUrl: product.sourceUrl,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  return (
    <div className="bg-brand-black min-h-screen">

      {/* Breadcrumb */}
      <div className="px-5 sm:px-8 pt-6 pb-4 border-b border-brand-gray-800">
        <nav className="flex items-center gap-2 text-[9px] font-black tracking-[0.3em] uppercase text-brand-gray-700">
          <Link href="/" className="hover:text-brand-white transition-colors">Home</Link>
          <span>/</span>
          <Link href="/products" className="hover:text-brand-white transition-colors">Shop</Link>
          <span>/</span>
          <span className="text-brand-gray-500">{product.name}</span>
        </nav>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2">

        {/* IMAGE SIDE */}
        <div className="relative">
          <div className="relative w-full aspect-[3/4] bg-brand-gray-900">
            <Image
              src={displayImages[selectedImage] || displayImages[0]}
              alt={product.name}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
          </div>
          {displayImages.length > 1 && (
            <div className="absolute bottom-0 left-0 right-0 flex gap-1 p-2 bg-gradient-to-t from-brand-black/80 to-transparent">
              {displayImages.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  className={cn(
                    'relative flex-shrink-0 w-12 h-14 overflow-hidden transition-all duration-200',
                    selectedImage === i ? 'ring-1 ring-brand-accent opacity-100' : 'opacity-40 hover:opacity-70'
                  )}
                >
                  <Image src={img} alt="" fill className="object-cover" sizes="48px" loading="lazy" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* INFO SIDE */}
        <div className="px-6 sm:px-10 py-10 flex flex-col gap-6">
          <span className="text-[9px] font-black tracking-[0.5em] uppercase text-brand-gray-600">{product.category}</span>

          <div>
            <h1
              className="font-black tracking-[-0.03em] leading-none text-brand-white"
              style={{ fontSize: 'clamp(32px, 5vw, 56px)' }}
            >
              {product.name}
            </h1>
            {reviewCount > 0 && (
              <a href="#reviews" className="flex items-center gap-2 mt-3 w-fit group">
                <StarRating rating={averageRating} size={12} />
                <span className="text-[10px] text-brand-gray-600 group-hover:text-brand-white transition-colors">
                  {averageRating.toFixed(1)} ({reviewCount})
                </span>
              </a>
            )}
          </div>

          <p className="text-4xl font-black text-brand-white tracking-tight">{formatPrice(product.price)}</p>
          <p className="text-xs text-brand-gray-500 leading-relaxed max-w-sm">{product.description}</p>

          {product.variants.length > 1 && (
            <div>
              <p className="text-[9px] font-black tracking-[0.4em] uppercase text-brand-gray-600 mb-3">
                Colour — <span className="text-brand-white">{selectedColor}</span>
              </p>
              <div className="flex gap-2">
                {product.variants.map((v) => (
                  <button
                    key={v.color}
                    onClick={() => { setSelectedColor(v.color); setSelectedImage(0); }}
                    title={v.color}
                    className={cn(
                      'w-7 h-7 rounded-full border-2 transition-all duration-200',
                      selectedColor === v.color ? 'border-brand-accent scale-110' : 'border-brand-gray-700 hover:border-brand-gray-500'
                    )}
                    style={{ backgroundColor: v.colorHex || '#444' }}
                  />
                ))}
              </div>
            </div>
          )}

          <div>
            <p className="text-[9px] font-black tracking-[0.4em] uppercase text-brand-gray-600 mb-3">
              Size {selectedSize && <span className="text-brand-white">— {selectedSize}</span>}
            </p>
            <div className="flex flex-wrap gap-1.5">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => { setSelectedSize(size); setError(''); }}
                  className={cn(
                    'min-w-[48px] h-9 text-[9px] font-black tracking-[0.2em] uppercase border transition-all duration-150',
                    selectedSize === size
                      ? 'border-brand-accent bg-brand-accent text-brand-black'
                      : 'border-brand-gray-800 text-brand-gray-500 hover:border-brand-gray-600 hover:text-brand-white'
                  )}
                >
                  {size}
                </button>
              ))}
            </div>
            {error && <p className="text-red-400 text-[10px] mt-2 font-bold">{error}</p>}
          </div>

          <button
            onClick={handleAddToCart}
            className={cn(
              'w-full py-4 text-[10px] font-black tracking-[0.4em] uppercase transition-all duration-150',
              added ? 'bg-green-400 text-brand-black' : 'bg-brand-accent text-brand-black hover:bg-white'
            )}
          >
            {added ? '✓ Added to Bag' : 'Add to Bag'}
          </button>

          <div className="pt-2 border-t border-brand-gray-800 space-y-1.5">
            <p className="text-[10px] text-brand-gray-700 font-bold">→ Ships worldwide · ~2 week delivery</p>
            <p className="text-[10px] text-brand-gray-700 font-bold">→ Secure checkout via Stripe</p>
          </div>
        </div>
      </div>

      <div id="reviews" />
    </div>
  );
}
