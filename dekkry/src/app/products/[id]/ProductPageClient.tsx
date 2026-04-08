'use client';
import { Product } from '@/types';
import Image from 'next/image';
import { useState } from 'react';
import { formatPrice, cn } from '@/lib/utils';
import { useCartStore } from '@/lib/cart-store';
import { ShoppingBag, Check } from 'lucide-react';
import Link from 'next/link';

interface Props {
  product: Product;
}

export function ProductPageClient({ product }: Props) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState(product.variants[0]?.color || '');
  const [added, setAdded] = useState(false);
  const [error, setError] = useState('');
  const addItem = useCartStore((s) => s.addItem);

  const currentVariant = product.variants.find((v) => v.color === selectedColor) || product.variants[0];
  const displayImages = currentVariant?.images?.length ? currentVariant.images : product.images;

  function handleAddToCart() {
    if (!selectedSize) {
      setError('Please select a size');
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <nav className="flex items-center gap-2 text-xs text-brand-gray-500 mb-8">
        <Link href="/" className="hover:text-brand-white transition-colors">Home</Link>
        <span>/</span>
        <Link href="/products" className="hover:text-brand-white transition-colors">Shop</Link>
        <span>/</span>
        <span className="text-brand-gray-300">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Images */}
        <div className="flex flex-col-reverse sm:flex-row gap-4">
          {/* Thumbnails */}
          <div className="flex sm:flex-col gap-2 overflow-x-auto sm:overflow-y-auto no-scrollbar">
            {displayImages.map((img, i) => (
              <button
                key={i}
                onClick={() => setSelectedImage(i)}
                className={cn(
                  'relative flex-shrink-0 w-16 h-20 sm:w-20 sm:h-24 overflow-hidden border-2 transition-colors',
                  selectedImage === i ? 'border-brand-accent' : 'border-transparent'
                )}
              >
                <Image src={img} alt="" fill className="object-cover" sizes="80px" />
              </button>
            ))}
          </div>
          {/* Main image */}
          <div className="relative flex-1 aspect-[3/4] bg-brand-gray-900 overflow-hidden">
            <Image
              src={displayImages[selectedImage] || displayImages[0]}
              alt={product.name}
              fill
              className="object-cover transition-all duration-500"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
          </div>
        </div>

        {/* Details */}
        <div className="flex flex-col">
          <div className="text-xs font-semibold tracking-[0.4em] text-brand-accent uppercase mb-2">
            {product.category}
          </div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-4">{product.name}</h1>
          <div className="text-3xl font-bold mb-6">{formatPrice(product.price)}</div>

          <p className="text-brand-gray-400 text-sm leading-relaxed mb-8">{product.description}</p>

          {/* Color selector */}
          {product.variants.length > 0 && (
            <div className="mb-6">
              <div className="text-xs font-semibold tracking-widest uppercase text-brand-gray-400 mb-3">
                Colour: <span className="text-brand-white">{selectedColor}</span>
              </div>
              <div className="flex gap-2">
                {product.variants.map((v) => (
                  <button
                    key={v.color}
                    onClick={() => { setSelectedColor(v.color); setSelectedImage(0); }}
                    title={v.color}
                    className={cn(
                      'w-8 h-8 rounded-full border-2 transition-all',
                      selectedColor === v.color ? 'border-brand-accent scale-110' : 'border-brand-gray-600 hover:border-brand-gray-400'
                    )}
                    style={{ backgroundColor: v.colorHex || '#333' }}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Size selector */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-3">
              <div className="text-xs font-semibold tracking-widest uppercase text-brand-gray-400">
                Size {selectedSize && <span className="text-brand-white">— {selectedSize}</span>}
              </div>
              <button className="text-xs text-brand-gray-500 underline hover:text-brand-gray-300">Size Guide</button>
            </div>
            <div className="flex gap-2 flex-wrap">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => { setSelectedSize(size); setError(''); }}
                  className={cn(
                    'w-14 h-10 text-xs font-bold tracking-wider uppercase border transition-all duration-200',
                    selectedSize === size
                      ? 'border-brand-accent bg-brand-accent text-brand-black'
                      : 'border-brand-gray-700 text-brand-gray-300 hover:border-brand-gray-400'
                  )}
                >
                  {size}
                </button>
              ))}
            </div>
            {error && <p className="text-red-400 text-xs mt-2">{error}</p>}
          </div>

          {/* Add to cart */}
          <button
            onClick={handleAddToCart}
            className={cn(
              'w-full py-4 font-black text-sm tracking-widest uppercase flex items-center justify-center gap-3 transition-all duration-200',
              added
                ? 'bg-green-500 text-brand-black'
                : 'bg-brand-accent text-brand-black hover:bg-brand-white'
            )}
          >
            {added ? (
              <><Check size={18} /> Added to Bag</>
            ) : (
              <><ShoppingBag size={18} /> Add to Bag</>
            )}
          </button>

          <div className="mt-6 border-t border-brand-gray-800 pt-6 space-y-2">
            <div className="flex items-center gap-2 text-xs text-brand-gray-500">
              <span className="w-1 h-1 bg-brand-accent rounded-full" />
              Free UK shipping on orders over £100
            </div>
            <div className="flex items-center gap-2 text-xs text-brand-gray-500">
              <span className="w-1 h-1 bg-brand-accent rounded-full" />
              Secure checkout via Stripe
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
