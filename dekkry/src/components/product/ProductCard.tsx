'use client';
import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/types';
import { formatPrice } from '@/lib/utils';
import { useState } from 'react';
import { ShoppingBag } from 'lucide-react';
import { StarRating } from './StarRating';

interface Props {
  product: Product;
  averageRating?: number;
  reviewCount?: number;
  priority?: boolean;
}

export function ProductCard({ product, averageRating, reviewCount, priority = false }: Props) {
  const [hovered, setHovered] = useState(false);
  const secondImg = product.images[1] || product.images[0];

  return (
    <Link href={`/products/${product.id}`}>
      <div
        className="group cursor-pointer"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Image */}
        <div className="relative aspect-[3/4] overflow-hidden bg-brand-gray-100 mb-3">
          <Image
            src={hovered && product.images[1] ? secondImg : product.images[0]}
            alt={product.name}
            fill
            className="object-cover transition-all duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            priority={priority}
            loading={priority ? 'eager' : 'lazy'}
          />
          {/* Quick add overlay */}
          <div className="absolute bottom-0 left-0 right-0 bg-brand-black/90 py-3 px-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 flex items-center justify-center gap-2">
            <ShoppingBag size={14} className="text-brand-accent" />
            <span className="text-xs font-semibold tracking-widest uppercase text-brand-cream">
              Quick View
            </span>
          </div>
          {/* Featured badge */}
          {product.featured && (
            <div className="absolute top-3 left-3 bg-brand-accent text-brand-black text-[10px] font-black tracking-widest uppercase px-2 py-1">
              Drop
            </div>
          )}
        </div>

        {/* Info */}
        <div>
          <h3 className="text-xs font-semibold tracking-wider uppercase text-brand-black mb-1 line-clamp-1">
            {product.name}
          </h3>
          {averageRating !== undefined && reviewCount !== undefined && reviewCount > 0 && (
            <div className="flex items-center gap-1.5 mb-1.5">
              <StarRating rating={averageRating} size={11} />
              <span className="text-[10px] text-brand-gray-400">({reviewCount})</span>
            </div>
          )}
          <div className="flex items-center justify-between">
            <span className="text-sm font-bold text-brand-black">
              {formatPrice(product.price)}
            </span>
            <div className="flex gap-1">
              {product.variants.slice(0, 3).map((v) => (
                <div
                  key={v.color}
                  className="w-3 h-3 rounded-full border border-brand-gray-300"
                  style={{ backgroundColor: v.colorHex || '#888' }}
                  title={v.color}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
