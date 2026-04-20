import Head from 'next/head';
import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import ProductCard from '../../components/ProductCard';
import { getProduct, products } from '../../lib/products';
import { useCart } from '../../context/CartContext';

const FALLBACK = 'https://img1.mulebuy.com/1902631052212543490/20260401/932cde3039021c2bd685c5e7cb92ca9a4a1cf1f022b9df77d1b1b0ccf186bf35.png';

export async function getStaticPaths() {
  return {
    paths: products.map(p => ({ params: { id: p.id } })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const product = getProduct(params.id);
  const related = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);
  return { props: { product, related } };
}

export default function ProductPage({ product, related }) {
  const [selectedImg, setSelectedImg] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState(product.colors[0] || '');
  const [added, setAdded] = useState(false);
  const [imgErr, setImgErr] = useState({});
  const { addItem } = useCart();
  const router = useRouter();

  const imgs = product.images?.length ? product.images : [FALLBACK];

  const handleAdd = () => {
    if (!selectedSize) return;
    addItem(product, selectedSize, selectedColor);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <>
      <Head>
        <title>{product.name} — DEKKRY</title>
        <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@300;400;500;600;700;900&display=swap" rel="stylesheet" />
      </Head>
      <Navbar />

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '80px 24px 60px' }}>
        {/* Breadcrumb */}
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '40px' }}>
          <Link href="/" style={{ fontSize: '11px', color: '#444', letterSpacing: '0.1em' }}>HOME</Link>
          <span style={{ color: '#333' }}>/</span>
          <Link href="/shop" style={{ fontSize: '11px', color: '#444', letterSpacing: '0.1em' }}>SHOP</Link>
          <span style={{ color: '#333' }}>/</span>
          <span style={{ fontSize: '11px', color: '#888', letterSpacing: '0.1em' }}>{product.name.toUpperCase()}</span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px' }} className="product-grid">
          {/* Images */}
          <div>
            {/* Main image */}
            <div style={{ aspectRatio: '3/4', background: '#111', overflow: 'hidden', marginBottom: '8px' }}>
              <img
                src={imgErr[selectedImg] ? FALLBACK : imgs[selectedImg]}
                onError={() => setImgErr(e => ({ ...e, [selectedImg]: true }))}
                alt={product.name}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
            {/* Thumbnails */}
            {imgs.length > 1 && (
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {imgs.map((img, i) => (
                  <div key={i}
                    onClick={() => setSelectedImg(i)}
                    style={{
                      width: '72px', height: '90px', background: '#111',
                      cursor: 'pointer', overflow: 'hidden',
                      border: selectedImg === i ? '2px solid #e8ff00' : '2px solid transparent',
                      transition: 'border 0.15s',
                    }}>
                    <img
                      src={imgErr[i] ? FALLBACK : img}
                      onError={() => setImgErr(e => ({ ...e, [i]: true }))}
                      alt=""
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <div style={{ paddingTop: '8px' }}>
            <p style={{ fontSize: '11px', color: '#555', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '12px' }}>
              {product.category}
            </p>
            <h1 style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 'clamp(32px, 4vw, 52px)', letterSpacing: '0.04em', lineHeight: 1.0, marginBottom: '16px' }}>
              {product.name}
            </h1>
            <p style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '36px', letterSpacing: '0.06em', color: '#e8ff00', marginBottom: '32px' }}>
              £{product.price.toFixed(2)}
            </p>
            <p style={{ fontSize: '13px', color: '#777', lineHeight: 1.8, marginBottom: '40px', maxWidth: '420px' }}>
              {product.description}
            </p>

            {/* Color */}
            <div style={{ marginBottom: '28px' }}>
              <p style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#555', marginBottom: '12px' }}>
                Colour — <span style={{ color: '#f5f5f0' }}>{selectedColor}</span>
              </p>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {product.colors.map(c => (
                  <button key={c}
                    onClick={() => setSelectedColor(c)}
                    style={{
                      background: selectedColor === c ? '#e8ff00' : '#111',
                      color: selectedColor === c ? '#0a0a0a' : '#888',
                      border: selectedColor === c ? '1px solid #e8ff00' : '1px solid #2a2a2a',
                      padding: '6px 12px', fontSize: '10px', fontWeight: 600, letterSpacing: '0.1em',
                      cursor: 'pointer', transition: 'all 0.15s', textTransform: 'uppercase',
                    }}>
                    {c}
                  </button>
                ))}
              </div>
            </div>

            {/* Size */}
            <div style={{ marginBottom: '32px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                <p style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#555' }}>
                  Size {!selectedSize && <span style={{ color: '#ff2222' }}>— select a size</span>}
                </p>
                <a href="#" style={{ fontSize: '11px', color: '#444', letterSpacing: '0.1em', borderBottom: '1px solid #2a2a2a' }}>Size Guide</a>
              </div>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {product.sizes.map(s => (
                  <button key={s}
                    onClick={() => setSelectedSize(s)}
                    style={{
                      background: selectedSize === s ? '#e8ff00' : '#111',
                      color: selectedSize === s ? '#0a0a0a' : '#888',
                      border: selectedSize === s ? '1px solid #e8ff00' : '1px solid #2a2a2a',
                      width: '52px', height: '52px',
                      fontSize: '12px', fontWeight: 700, letterSpacing: '0.05em',
                      cursor: 'pointer', transition: 'all 0.15s',
                    }}>
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Add to cart */}
            <button
              onClick={handleAdd}
              disabled={!selectedSize}
              style={{
                width: '100%', padding: '18px',
                background: added ? '#f5f5f0' : selectedSize ? '#e8ff00' : '#1a1a1a',
                color: added ? '#0a0a0a' : selectedSize ? '#0a0a0a' : '#444',
                border: 'none',
                fontSize: '12px', fontWeight: 900, letterSpacing: '0.2em', textTransform: 'uppercase',
                cursor: selectedSize ? 'pointer' : 'not-allowed',
                transition: 'all 0.2s',
                marginBottom: '16px',
              }}>
              {added ? '✓ Added to Bag' : selectedSize ? 'Add to Bag' : 'Select a Size'}
            </button>

            <a href={product.sourceUrl} target="_blank" rel="noopener noreferrer">
              <button style={{
                width: '100%', padding: '16px',
                background: 'transparent', color: '#555',
                border: '1px solid #2a2a2a',
                fontSize: '11px', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase',
                cursor: 'pointer', transition: 'all 0.2s',
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = '#555'; e.currentTarget.style.color = '#888'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = '#2a2a2a'; e.currentTarget.style.color = '#555'; }}>
                View Source →
              </button>
            </a>

            {/* Tags */}
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '32px' }}>
              {product.tags.map(tag => (
                <span key={tag} style={{
                  fontSize: '10px', color: '#333', letterSpacing: '0.12em', textTransform: 'uppercase',
                  border: '1px solid #1a1a1a', padding: '4px 8px',
                }}>
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <div style={{ marginTop: '100px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '32px' }}>
              <h2 style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '40px', letterSpacing: '0.05em' }}>
                YOU MIGHT LIKE
              </h2>
              <Link href={`/shop?cat=${product.category}`} style={{ fontSize: '11px', color: '#555', letterSpacing: '0.12em', borderBottom: '1px solid #2a2a2a', paddingBottom: '2px' }}>
                More {product.category}
              </Link>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '2px' }}>
              {related.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          </div>
        )}
      </div>

      <Footer />

      <style>{`
        @media (max-width: 768px) {
          .product-grid { grid-template-columns: 1fr !important; gap: 32px !important; }
        }
      `}</style>
    </>
  );
}
