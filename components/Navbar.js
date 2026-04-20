import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useCart } from '../context/CartContext';

export default function Navbar() {
  const { totalItems } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        background: scrolled ? 'rgba(10,10,10,0.97)' : 'transparent',
        borderBottom: scrolled ? '1px solid #2a2a2a' : '1px solid transparent',
        transition: 'all 0.3s ease',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        padding: '0 24px',
        height: '60px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        {/* Logo */}
        <Link href="/" style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '28px', letterSpacing: '0.15em', color: '#f5f5f0' }}>
          DEKKRY
        </Link>

        {/* Desktop nav */}
        <div style={{ display: 'flex', gap: '32px', alignItems: 'center' }} className="desktop-nav">
          <Link href="/shop" style={{ fontSize: '12px', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#888', transition: 'color 0.2s' }}
            onMouseEnter={e => e.target.style.color = '#f5f5f0'}
            onMouseLeave={e => e.target.style.color = '#888'}>
            Shop
          </Link>
          <Link href="/shop?cat=T-Shirts" style={{ fontSize: '12px', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#888', transition: 'color 0.2s' }}
            onMouseEnter={e => e.target.style.color = '#f5f5f0'}
            onMouseLeave={e => e.target.style.color = '#888'}>
            Tees
          </Link>
          <Link href="/shop?cat=Hoodies" style={{ fontSize: '12px', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#888', transition: 'color 0.2s' }}
            onMouseEnter={e => e.target.style.color = '#f5f5f0'}
            onMouseLeave={e => e.target.style.color = '#888'}>
            Hoodies
          </Link>
          <Link href="/shop?cat=Jackets" style={{ fontSize: '12px', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#888', transition: 'color 0.2s' }}
            onMouseEnter={e => e.target.style.color = '#f5f5f0'}
            onMouseLeave={e => e.target.style.color = '#888'}>
            Jackets
          </Link>
        </div>

        {/* Right side */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <Link href="/cart" style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#f5f5f0" strokeWidth="1.5">
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
              <line x1="3" y1="6" x2="21" y2="6"/>
              <path d="M16 10a4 4 0 01-8 0"/>
            </svg>
            {totalItems > 0 && (
              <span style={{
                position: 'absolute', top: '-8px', right: '-8px',
                background: '#e8ff00', color: '#0a0a0a',
                borderRadius: '50%', width: '18px', height: '18px',
                fontSize: '10px', fontWeight: 900,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                {totalItems}
              </span>
            )}
          </Link>

          {/* Mobile menu button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            style={{ background: 'none', border: 'none', color: '#f5f5f0', display: 'none' }}
            className="mobile-menu-btn">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {menuOpen
                ? <><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></>
                : <><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></>
              }
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div style={{
          position: 'fixed', top: '60px', left: 0, right: 0, bottom: 0,
          background: '#0a0a0a', zIndex: 99,
          display: 'flex', flexDirection: 'column', padding: '40px 24px', gap: '24px',
        }}>
          {['Shop', 'T-Shirts', 'Hoodies', 'Jackets', 'Bottoms', 'Accessories'].map(item => (
            <Link key={item} href={item === 'Shop' ? '/shop' : `/shop?cat=${item}`}
              onClick={() => setMenuOpen(false)}
              style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '48px', letterSpacing: '0.05em', color: '#f5f5f0', borderBottom: '1px solid #1a1a1a', paddingBottom: '16px' }}>
              {item}
            </Link>
          ))}
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
        }
      `}</style>
    </>
  );
}
