import Head from 'next/head';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ProductCard from '../components/ProductCard';
import { products, categories } from '../lib/products';

const sortOptions = [
  { label: 'Newest', value: 'newest' },
  { label: 'Price: Low', value: 'price-asc' },
  { label: 'Price: High', value: 'price-desc' },
];

export default function Shop() {
  const router = useRouter();
  const { cat } = router.query;
  const [activeCategory, setActiveCategory] = useState('All');
  const [sort, setSort] = useState('newest');

  useEffect(() => {
    if (cat) setActiveCategory(cat);
    else setActiveCategory('All');
  }, [cat]);

  let filtered = activeCategory === 'All' ? products : products.filter(p => p.category === activeCategory);

  if (sort === 'price-asc') filtered = [...filtered].sort((a, b) => a.price - b.price);
  else if (sort === 'price-desc') filtered = [...filtered].sort((a, b) => b.price - a.price);

  return (
    <>
      <Head>
        <title>Shop — DEKKRY</title>
        <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@300;400;500;600;700;900&display=swap" rel="stylesheet" />
      </Head>
      <Navbar />

      {/* Header */}
      <section style={{ paddingTop: '100px', paddingBottom: '40px', padding: '100px 24px 40px', maxWidth: '1200px', margin: '0 auto' }}>
        <p style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#555', marginBottom: '8px' }}>
          — All Products
        </p>
        <h1 style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 'clamp(48px, 8vw, 96px)', letterSpacing: '0.03em', lineHeight: 0.9 }}>
          {activeCategory === 'All' ? 'THE DROP' : activeCategory.toUpperCase()}
        </h1>
      </section>

      {/* Filters */}
      <div style={{
        position: 'sticky', top: '60px', zIndex: 50,
        background: 'rgba(10,10,10,0.97)', backdropFilter: 'blur(10px)',
        borderBottom: '1px solid #1a1a1a',
        padding: '0 24px',
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', overflowX: 'auto', gap: '8px', paddingBottom: '1px' }}>
          <div style={{ display: 'flex', gap: '2px', minWidth: 'max-content' }}>
            {categories.map(cat => (
              <button key={cat}
                onClick={() => {
                  setActiveCategory(cat);
                  router.push(cat === 'All' ? '/shop' : `/shop?cat=${cat}`, undefined, { shallow: true });
                }}
                style={{
                  background: activeCategory === cat ? '#e8ff00' : 'transparent',
                  color: activeCategory === cat ? '#0a0a0a' : '#555',
                  border: 'none', padding: '14px 16px',
                  fontSize: '11px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase',
                  cursor: 'pointer', transition: 'all 0.15s', whiteSpace: 'nowrap',
                }}>
                {cat}
              </button>
            ))}
          </div>
          <select
            value={sort}
            onChange={e => setSort(e.target.value)}
            style={{
              background: '#111', color: '#888', border: '1px solid #1a1a1a',
              padding: '8px 12px', fontSize: '11px', letterSpacing: '0.1em',
              cursor: 'pointer', outline: 'none',
            }}>
            {sortOptions.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
        </div>
      </div>

      {/* Grid */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2px 24px 80px' }}>
        <div style={{ marginBottom: '20px', marginTop: '20px' }}>
          <p style={{ fontSize: '11px', color: '#444', letterSpacing: '0.1em' }}>{filtered.length} PIECES</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '2px' }}>
          {filtered.map(p => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>

      <Footer />
    </>
  );
}
