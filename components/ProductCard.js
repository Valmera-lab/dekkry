import { useState } from 'react';
import Link from 'next/link';

const FALLBACK = 'https://img1.mulebuy.com/1902631052212543490/20260401/932cde3039021c2bd685c5e7cb92ca9a4a1cf1f022b9df77d1b1b0ccf186bf35.png';

export default function ProductCard({ product }) {
  const [hovered, setHovered] = useState(false);
  const [imgErr, setImgErr] = useState(false);

  const img = (!imgErr && product.images?.[0]) ? product.images[0] : FALLBACK;
  const img2 = product.images?.[1] || img;

  return (
    <Link href={`/product/${product.id}`}>
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          background: '#111',
          cursor: 'pointer',
          transition: 'transform 0.2s',
          transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
        }}>
        {/* Image */}
        <div style={{ position: 'relative', aspectRatio: '3/4', overflow: 'hidden', background: '#1a1a1a' }}>
          <img
            src={hovered && img2 !== img ? img2 : img}
            onError={() => setImgErr(true)}
            alt={product.name}
            style={{
              width: '100%', height: '100%', objectFit: 'cover',
              transition: 'transform 0.4s ease',
              transform: hovered ? 'scale(1.04)' : 'scale(1)',
            }}
          />
          {product.featured && (
            <div style={{
              position: 'absolute', top: '12px', left: '12px',
              background: '#e8ff00', color: '#0a0a0a',
              fontSize: '9px', fontWeight: 900, letterSpacing: '0.15em',
              padding: '4px 8px', textTransform: 'uppercase',
            }}>
              NEW
            </div>
          )}
        </div>

        {/* Info */}
        <div style={{ padding: '14px 0' }}>
          <p style={{ fontSize: '11px', color: '#666', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '4px' }}>
            {product.category}
          </p>
          <p style={{ fontSize: '13px', fontWeight: 600, color: '#f5f5f0', marginBottom: '6px', letterSpacing: '0.02em', lineHeight: 1.3 }}>
            {product.name}
          </p>
          <p style={{ fontSize: '13px', fontWeight: 700, color: '#e8ff00', fontFamily: 'Bebas Neue, sans-serif', letterSpacing: '0.08em', fontSize: '16px' }}>
            £{product.price.toFixed(2)}
          </p>
        </div>
      </div>
    </Link>
  );
}
