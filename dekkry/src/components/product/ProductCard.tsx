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
  // variant controls the card shape/feel
  variant?: 'tall' | 'square' | 'grid' | 'default';
  // legacy — kept for backwards compat
  large?: boolean;
}

export function ProductCard({
  product,
  averageRating,
  reviewCount,
  priority = false,
  variant = 'default',
  large,
}: Props) {
  const [hovered, setHovered] = useState(false);

  const mainImg = product.variants[0]?.images?.[0] || product.images[0];

  const aspectClass =
    variant === 'tall'    ? 'aspect-[2/3]' :
    variant === 'square'  ? 'aspect-square' :
    variant === 'grid'    ? 'aspect-[3/4]' :
    large                 ? 'aspect-[2/3]' :
                            'aspect-[3/4]';

  const imageSize =
    variant === 'tall'   ? '(max-width:640px) 100vw, 60vw' :
    variant === 'square' ? '(max-width:640px) 100vw, 40vw' :
                           '(max-width:640px) 50vw, 25vw';

  return (
    <Link href={`/products/${product.id}`}>
      <div
        className="group cursor-pointer"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Image */}
        <div className={`relative overflow-hidden bg-brand-gray-900 ${aspectClass}`}>
          <Image
            src={mainImg}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-[1.05]"
            sizes={imageSize}
            priority={priority}
            loading={priority ? 'eager' : 'lazy'}
          />

          {/* Hover overlay */}
          <div className="absolute inset-0 bg-brand-black/0 group-hover:bg-brand-black/25 transition-all duration-300" />

          {/* Bottom bar — slides up on hover */}
          <div className="absolute bottom-0 left-0 right-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
            <div className="bg-brand-accent px-4 py-2.5 flex items-center justify-between">
              <span className="text-[9px] font-black tracking-[0.3em] uppercase text-brand-black">
                {product.name}
              </span>
              <span className="text-[9px] font-black text-brand-black">{formatPrice(product.price)}</span>
            </div>
          </div>

          {/* Drop tag */}
          {product.featured && (
            <div className="absolute top-2.5 left-2.5">
              <span className="bg-brand-accent text-brand-black text-[8px] font-black tracking-[0.25em] uppercase px-2 py-0.5">
                New
              </span>
            </div>
          )}
        </div>

        {/* Info — minimal, tight */}
        {variant !== 'grid' && (
          <div className="pt-2.5 px-0.5">
            <div className="flex items-baseline justify-between gap-2">
              <h3 className="text-[10px] font-black tracking-[0.15em] uppercase text-brand-white leading-tight truncate">
                {product.name}
              </h3>
              <span className="text-[10px] font-black text-brand-gray-400 flex-shrink-0">
                {formatPrice(product.price)}
              </span>
            </div>
            {averageRating !== undefined && reviewCount !== undefined && reviewCount > 0 && (
              <div className="flex items-center gap-1.5 mt-1">
                <StarRating rating={averageRating} size={9} />
                <span className="text-[9px] text-brand-gray-600">({reviewCount})</span>
              </div>
            )}
          </div>
        )}

        {/* Grid variant — info is just a slim row */}
        {variant === 'grid' && (
          <div className="px-3 py-3 flex items-center justify-between">
            <h3 className="text-[9px] font-black tracking-[0.15em] uppercase text-brand-gray-400 truncate">
              {product.name}
            </h3>
            <span className="text-[9px] font-black text-brand-gray-500 ml-2 flex-shrink-0">
              {formatPrice(product.price)}
            </span>
          </div>
        )}
      </div>
    </Link>
  );
}
