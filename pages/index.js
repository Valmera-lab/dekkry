import Head from 'next/head';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ProductCard from '../components/ProductCard';
import { getFeatured, products } from '../lib/products';

const featured = getFeatured();
const newArrivals = products.slice(0, 4);

export default function Home() {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => { setLoaded(true); }, []);

  return (
    <>
      <Head>
        <title>DEKKRY — Not For Everyone</title>
        <meta name="description" content="DEKKRY streetwear. Not for everyone. Made for those who move different." />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@300;400;500;600;700;900&display=swap" rel="stylesheet" />
      </Head>

      <Navbar />

      {/* HERO */}
      <section style={{
        minHeight: '100vh',
        background: '#0a0a0a',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        padding: '0 24px 80px',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Background texture */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(ellipse at 60% 40%, #1a1a1a 0%, #0a0a0a 70%)',
          zIndex: 0,
        }} />

        {/* Big hero text */}
        <div style={{ position: 'relative', zIndex: 1, maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
          {/* Ticker */}
          <div style={{
            overflow: 'hidden', borderTop: '1px solid #1a1a1a', borderBottom: '1px solid #1a1a1a',
            padding: '10px 0', marginBottom: '60px',
          }}>
            <div style={{
              display: 'flex', gap: '80px', whiteSpace: 'nowrap',
              animation: 'ticker 20s linear infinite',
              fontFamily: 'Bebas Neue, sans-serif', fontSize: '14px', letterSpacing: '0.2em', color: '#333',
            }}>
              {Array(6).fill('DEKKRY · NOT FOR EVERYONE · THE MOVEMENT CONTINUES · ').map((t, i) => (
                <span key={i}>{t}</span>
              ))}
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', alignItems: 'flex-end', gap: '40px' }}>
            <div>
              <p style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#555', marginBottom: '20px' }}>
                SS25 COLLECTION
              </p>
              <h1 style={{
                fontFamily: 'Bebas Neue, sans-serif',
                fontSize: 'clamp(80px, 14vw, 180px)',
                letterSpacing: '-0.01em',
                lineHeight: 0.9,
                color: '#f5f5f0',
                opacity: loaded ? 1 : 0,
                transform: loaded ? 'translateY(0)' : 'translateY(40px)',
                transition: 'all 1s ease',
              }}>
                DEKKRY
              </h1>
              <div style={{ display: 'flex', alignItems: 'center', gap: '24px', marginTop: '40px', flexWrap: 'wrap' }}>
                <Link href="/shop">
                  <button style={{
                    background: '#e8ff00', color: '#0a0a0a',
                    border: 'none', padding: '16px 40px',
                    fontSize: '11px', fontWeight: 900, letterSpacing: '0.2em', textTransform: 'uppercase',
                    cursor: 'pointer', transition: 'all 0.2s',
                  }}
                    onMouseEnter={e => { e.target.style.background = '#f5f5f0'; }}
                    onMouseLeave={e => { e.target.style.background = '#e8ff00'; }}>
                    Shop Now
                  </button>
                </Link>
                <Link href="/shop" style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#555', borderBottom: '1px solid #333', paddingBottom: '2px', transition: 'color 0.2s' }}
                  onMouseEnter={e => e.target.style.color = '#f5f5f0'}
                  onMouseLeave={e => e.target.style.color = '#555'}>
                  View All
                </Link>
              </div>
            </div>

            <div style={{ textAlign: 'right' }}>
              <p style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '120px', lineHeight: 1, color: '#1a1a1a', userSelect: 'none' }}>25</p>
            </div>
          </div>
        </div>
      </section>

      {/* MARQUEE DIVIDER */}
      <div style={{
        background: '#e8ff00', overflow: 'hidden',
        padding: '12px 0', borderTop: '1px solid #d4e800',
      }}>
        <div style={{
          display: 'flex', gap: '60px', whiteSpace: 'nowrap',
          animation: 'ticker 15s linear infinite',
          fontFamily: 'Bebas Neue, sans-serif', fontSize: '18px', letterSpacing: '0.2em', color: '#0a0a0a',
        }}>
          {Array(8).fill('DEKKRY · FORCE OF HABIT · BORN ON THE STREET · ').map((t, i) => (
            <span key={i}>{t}</span>
          ))}
        </div>
      </div>

      {/* FEATURED GRID */}
      <section style={{ maxWidth: '1200px', margin: '0 auto', padding: '80px 24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '40px' }}>
          <div>
            <p style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#555', marginBottom: '8px' }}>
              — New Drops
            </p>
            <h2 style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 'clamp(36px, 6vw, 64px)', letterSpacing: '0.05em', lineHeight: 1 }}>
              LATEST PIECES
            </h2>
          </div>
          <Link href="/shop" style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#555', borderBottom: '1px solid #2a2a2a', paddingBottom: '2px' }}>
            See All
          </Link>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '2px' }}>
          {featured.slice(0, 8).map(p => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* BRAND STATEMENT */}
      <section style={{
        background: '#111',
        borderTop: '1px solid #1a1a1a',
        borderBottom: '1px solid #1a1a1a',
        padding: '100px 24px',
        textAlign: 'center',
      }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <p style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#444', marginBottom: '24px' }}>
            The Ethos
          </p>
          <h2 style={{
            fontFamily: 'Bebas Neue, sans-serif',
            fontSize: 'clamp(40px, 7vw, 80px)',
            letterSpacing: '0.03em',
            lineHeight: 1.1,
            color: '#f5f5f0',
            marginBottom: '32px',
          }}>
            NOT FOR EVERYONE.<br />
            <span style={{ color: '#e8ff00' }}>MADE FOR THOSE<br />WHO MOVE DIFFERENT.</span>
          </h2>
          <p style={{ fontSize: '13px', color: '#555', lineHeight: 1.9, maxWidth: '500px', margin: '0 auto 40px' }}>
            DEKKRY was built on the streets, not in boardrooms. Every piece is a statement. Wear it if you mean it.
          </p>
          <Link href="/shop">
            <button style={{
              background: 'transparent', color: '#f5f5f0',
              border: '1px solid #333', padding: '14px 40px',
              fontSize: '11px', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase',
              cursor: 'pointer', transition: 'all 0.3s',
            }}
              onMouseEnter={e => { e.currentTarget.style.background = '#e8ff00'; e.currentTarget.style.color = '#0a0a0a'; e.currentTarget.style.border = '1px solid #e8ff00'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#f5f5f0'; e.currentTarget.style.border = '1px solid #333'; }}>
              Enter The Store
            </button>
          </Link>
        </div>
      </section>

      {/* CATEGORIES */}
      <section style={{ maxWidth: '1200px', margin: '0 auto', padding: '80px 24px' }}>
        <p style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#555', marginBottom: '8px' }}>
          — Browse By Category
        </p>
        <h2 style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 'clamp(36px, 5vw, 56px)', letterSpacing: '0.05em', marginBottom: '40px' }}>
          THE RANGE
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '2px' }}>
          {['T-Shirts', 'Hoodies', 'Jackets', 'Bottoms', 'Long Sleeves', 'Accessories'].map(cat => (
            <Link key={cat} href={`/shop?cat=${cat}`}>
              <div style={{
                background: '#111', padding: '32px 24px',
                border: '1px solid #1a1a1a',
                transition: 'all 0.2s',
                cursor: 'pointer',
              }}
                onMouseEnter={e => { e.currentTarget.style.background = '#e8ff00'; e.currentTarget.querySelector('span').style.color = '#0a0a0a'; e.currentTarget.querySelector('p').style.color = '#0a0a0a44'; }}
                onMouseLeave={e => { e.currentTarget.style.background = '#111'; e.currentTarget.querySelector('span').style.color = '#f5f5f0'; e.currentTarget.querySelector('p').style.color = '#444'; }}>
                <span style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '24px', letterSpacing: '0.08em', color: '#f5f5f0', display: 'block', marginBottom: '8px', transition: 'color 0.2s' }}>
                  {cat.toUpperCase()}
                </span>
                <p style={{ fontSize: '11px', color: '#444', transition: 'color 0.2s' }}>
                  {products.filter(p => p.category === cat).length} pieces
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <Footer />

      <style>{`
        @keyframes ticker {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </>
  );
}
