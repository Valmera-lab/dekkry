'use client';
import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/types';
import { formatPrice } from '@/lib/utils';
import { useState } from 'react';
import { StarRating } from './StarRating';

interface Props {
  product: Product;
  averageRating?: number;
  reviewCount?: number;
  priority?: boolean;
  large?: boolean;
}

export function ProductCard({ product, averageRating, reviewCount, priority = false, large = false }: Props) {
  const [hovered, setHovered] = useState(false);

  // Use first variant image as main if available
  const mainImg = product.variants[0]?.images?.[0] || product.images[0];

  return (
    <Link href={`/products/${product.id}`}>
      <div
        className="group cursor-pointer"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Image container */}
        <div className={`relative overflow-hidden bg-brand-gray-800 ${large ? 'aspect-[3/4]' : 'aspect-[3/4]'}`}>
          <Image
            src={mainImg}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
            sizes={large
              ? '(max-width: 640px) 100vw, 60vw'
              : '(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw'
            }
            priority={priority}
            loading={priority ? 'eager' : 'lazy'}
          />

          {/* Subtle hover overlay */}
          <div className="absolute inset-0 bg-brand-black/0 group-hover:bg-brand-black/20 transition-colors duration-300" />

          {/* Bottom label */}
          <div className="absolute bottom-0 left-0 right-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
            <div className="bg-brand-accent px-4 py-2.5 flex items-center justify-between">
              <span className="text-[10px] font-black tracking-[0.25em] uppercase text-brand-black">Quick View</span>
              <span className="text-[10px] font-black text-brand-black">{formatPrice(product.price)}</span>
            </div>
          </div>

          {/* Featured tag */}
          {product.featured && (
            <div className="absolute top-3 left-3">
              <span className="bg-brand-accent text-brand-black text-[9px] font-black tracking-[0.2em] uppercase px-2 py-1">
                Drop
              </span>
            </div>
          )}
        </div>

        {/* Info row */}
        <div className="pt-3 pb-1 flex items-start justify-between gap-2">
          <div className="min-w-0">
            <h3 className={`font-bold tracking-wide uppercase text-brand-white leading-tight truncate ${large ? 'text-sm' : 'text-xs'}`}>
              {product.name}
            </h3>
            {averageRating !== undefined && reviewCount !== undefined && reviewCount > 0 && (
              <div className="flex items-center gap-1.5 mt-1">
                <StarRating rating={averageRating} size={10} />
                <span className="text-[10px] text-brand-gray-500">({reviewCount})</span>
              </div>
            )}
          </div>
          <div className="flex-shrink-0 flex flex-col items-end gap-1.5">
            <span className={`font-black text-brand-white ${large ? 'text-sm' : 'text-xs'}`}>
              {formatPrice(product.price)}
            </span>
            {product.variants.length > 1 && (
              <div className="flex gap-1">
                {product.variants.slice(0, 3).map((v) => (
                  <div
                    key={v.color}
                    className="w-2.5 h-2.5 rounded-full border border-brand-gray-600"
                    style={{ backgroundColor: v.colorHex || '#555' }}
                    title={v.color}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
