'use client';
import { Product } from '@/types';
import Image from 'next/image';
import { useState } from 'react';
import { formatPrice, cn } from '@/lib/utils';
import { useCartStore } from '@/lib/cart-store';
import { ShoppingBag, Check } from 'lucide-react';
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
    if (!selectedSize) {
      setError('Select a size');
      return;
    }
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
      <div className="max-w-7xl mx-auto px-6 sm:px-10 py-10">

        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-[10px] text-brand-gray-600 mb-10 uppercase tracking-widest">
          <Link href="/" className="hover:text-brand-white transition-colors">Home</Link>
          <span>/</span>
          <Link href="/products" className="hover:text-brand-white transition-colors">Shop</Link>
          <span>/</span>
          <span className="text-brand-gray-400">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
          {/* Images */}
          <div className="flex flex-col-reverse sm:flex-row gap-3">
            {/* Thumbnails */}
            {displayImages.length > 1 && (
              <div className="flex sm:flex-col gap-2 overflow-x-auto sm:overflow-visible no-scrollbar">
                {displayImages.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    className={cn(
                      'relative flex-shrink-0 w-14 h-18 sm:w-16 sm:h-20 overflow-hidden border transition-colors',
                      selectedImage === i ? 'border-brand-accent' : 'border-brand-gray-700 hover:border-brand-gray-500'
                    )}
                  >
                    <Image src={img} alt="" fill className="object-cover bg-brand-gray-800" sizes="64px" loading="lazy" />
                  </button>
                ))}
              </div>
            )}
            {/* Main image */}
            <div className="relative flex-1 aspect-[3/4] bg-brand-gray-800 overflow-hidden">
              <Image
                src={displayImages[selectedImage] || displayImages[0]}
                alt={product.name}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
            </div>
          </div>

          {/* Details */}
          <div className="flex flex-col pt-0 lg:pt-4">
            <p className="text-[10px] font-bold tracking-[0.35em] uppercase text-brand-gray-500 mb-3">
              {product.category}
            </p>
            <h1 className="text-3xl sm:text-4xl font-black tracking-[-0.02em] text-brand-white mb-4 leading-tight">
              {product.name}
            </h1>

            {reviewCount > 0 && (
              <a href="#reviews" className="flex items-center gap-2 mb-5 w-fit group">
                <StarRating rating={averageRating} size={14} />
                <span className="text-xs text-brand-gray-500 group-hover:text-brand-white transition-colors">
                  {averageRating.toFixed(1)} · {reviewCount} review{reviewCount !== 1 ? 's' : ''}
                </span>
              </a>
            )}

            <p className="text-3xl font-black text-brand-white mb-6">{formatPrice(product.price)}</p>

            <p className="text-sm text-brand-gray-500 leading-relaxed mb-8">{product.description}</p>

            {/* Color */}
            {product.variants.length > 1 && (
              <div className="mb-6">
                <p className="text-[10px] font-bold tracking-[0.3em] uppercase text-brand-gray-500 mb-3">
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
                        selectedColor === v.color
                          ? 'border-brand-accent scale-110'
                          : 'border-brand-gray-600 hover:border-brand-gray-400'
                      )}
                      style={{ backgroundColor: v.colorHex || '#444' }}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Size */}
            <div className="mb-8">
              <p className="text-[10px] font-bold tracking-[0.3em] uppercase text-brand-gray-500 mb-3">
                Size {selectedSize && <span className="text-brand-white">— {selectedSize}</span>}
              </p>
              <div className="flex gap-2 flex-wrap">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => { setSelectedSize(size); setError(''); }}
                    className={cn(
                      'min-w-[52px] h-10 text-[10px] font-bold tracking-wider uppercase border transition-all duration-200',
                      selectedSize === size
                        ? 'border-brand-accent bg-brand-accent text-brand-black'
                        : 'border-brand-gray-700 text-brand-gray-400 hover:border-brand-gray-500 hover:text-brand-white'
                    )}
                  >
                    {size}
                  </button>
                ))}
              </div>
              {error && <p className="text-red-400 text-xs mt-2">{error}</p>}
            </div>

            {/* Add to bag */}
            <button
              onClick={handleAddToCart}
              className={cn(
                'w-full py-4 font-black text-xs tracking-[0.3em] uppercase flex items-center justify-center gap-3 transition-all duration-200',
                added
                  ? 'bg-green-400 text-brand-black'
                  : 'bg-brand-accent text-brand-black hover:bg-brand-white'
              )}
            >
              {added ? (
                <><Check size={16} strokeWidth={3} /> In the Bag</>
              ) : (
                <><ShoppingBag size={16} strokeWidth={2} /> Add to Bag</>
              )}
            </button>

            <div className="mt-6 pt-6 border-t border-brand-gray-800 space-y-2">
              <p className="text-[11px] text-brand-gray-600">→ Ships worldwide · ~2 week delivery</p>
              <p className="text-[11px] text-brand-gray-600">→ Secure checkout via Stripe</p>
            </div>
          </div>
        </div>

        <div id="reviews" />
      </div>
    </div>
  );
}
