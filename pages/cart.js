import Head from 'next/head';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useCart } from '../context/CartContext';

const FALLBACK = 'https://img1.mulebuy.com/1902631052212543490/20260401/932cde3039021c2bd685c5e7cb92ca9a4a1cf1f022b9df77d1b1b0ccf186bf35.png';

export default function Cart() {
  const { items, removeItem, updateQty, subtotal, clearCart } = useCart();

  return (
    <>
      <Head>
        <title>Cart — DEKKRY</title>
        <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@300;400;500;600;700;900&display=swap" rel="stylesheet" />
      </Head>
      <Navbar />

      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '100px 24px 80px' }}>
        <h1 style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 'clamp(48px, 8vw, 80px)', letterSpacing: '0.04em', marginBottom: '40px' }}>
          YOUR BAG
        </h1>

        {items.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '100px 0' }}>
            <p style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '32px', color: '#333', marginBottom: '24px', letterSpacing: '0.08em' }}>
              YOUR BAG IS EMPTY
            </p>
            <p style={{ fontSize: '13px', color: '#555', marginBottom: '40px' }}>Don't sleep on the drop.</p>
            <Link href="/shop">
              <button style={{
                background: '#e8ff00', color: '#0a0a0a',
                border: 'none', padding: '16px 48px',
                fontSize: '11px', fontWeight: 900, letterSpacing: '0.2em', textTransform: 'uppercase',
                cursor: 'pointer',
              }}>
                Shop Now
              </button>
            </Link>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '60px', alignItems: 'flex-start' }} className="cart-grid">
            {/* Items */}
            <div>
              {items.map(item => (
                <div key={item.key} style={{
                  display: 'grid', gridTemplateColumns: '100px 1fr auto',
                  gap: '20px', padding: '24px 0',
                  borderBottom: '1px solid #1a1a1a', alignItems: 'center',
                }}>
                  <Link href={`/product/${item.product.id}`}>
                    <div style={{ aspectRatio: '3/4', background: '#111', overflow: 'hidden', cursor: 'pointer' }}>
                      <img
                        src={item.product.images?.[0] || FALLBACK}
                        onError={e => { e.target.src = FALLBACK; }}
                        alt={item.product.name}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    </div>
                  </Link>

                  <div>
                    <Link href={`/product/${item.product.id}`}>
                      <p style={{ fontSize: '13px', fontWeight: 600, marginBottom: '6px', letterSpacing: '0.02em', cursor: 'pointer' }}>{item.product.name}</p>
                    </Link>
                    <p style={{ fontSize: '11px', color: '#555', marginBottom: '4px', letterSpacing: '0.1em', textTransform: 'uppercase' }}>{item.color}</p>
                    <p style={{ fontSize: '11px', color: '#555', marginBottom: '16px', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Size: {item.size}</p>

                    {/* Qty */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0', border: '1px solid #2a2a2a', width: 'fit-content' }}>
                      <button
                        onClick={() => updateQty(item.key, item.qty - 1)}
                        style={{ background: 'none', border: 'none', color: '#888', padding: '8px 14px', fontSize: '16px', cursor: 'pointer', transition: 'color 0.15s' }}
                        onMouseEnter={e => e.target.style.color = '#f5f5f0'}
                        onMouseLeave={e => e.target.style.color = '#888'}>
                        −
                      </button>
                      <span style={{ padding: '8px 16px', fontSize: '13px', fontWeight: 600, borderLeft: '1px solid #2a2a2a', borderRight: '1px solid #2a2a2a' }}>
                        {item.qty}
                      </span>
                      <button
                        onClick={() => updateQty(item.key, item.qty + 1)}
                        style={{ background: 'none', border: 'none', color: '#888', padding: '8px 14px', fontSize: '16px', cursor: 'pointer', transition: 'color 0.15s' }}
                        onMouseEnter={e => e.target.style.color = '#f5f5f0'}
                        onMouseLeave={e => e.target.style.color = '#888'}>
                        +
                      </button>
                    </div>
                  </div>

                  <div style={{ textAlign: 'right' }}>
                    <p style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '22px', color: '#e8ff00', letterSpacing: '0.06em', marginBottom: '12px' }}>
                      £{(item.product.price * item.qty).toFixed(2)}
                    </p>
                    <button
                      onClick={() => removeItem(item.key)}
                      style={{ background: 'none', border: 'none', color: '#444', fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase', cursor: 'pointer', transition: 'color 0.2s' }}
                      onMouseEnter={e => e.target.style.color = '#ff2222'}
                      onMouseLeave={e => e.target.style.color = '#444'}>
                      Remove
                    </button>
                  </div>
                </div>
              ))}

              <button
                onClick={clearCart}
                style={{ background: 'none', border: 'none', color: '#333', fontSize: '11px', letterSpacing: '0.12em', textTransform: 'uppercase', cursor: 'pointer', marginTop: '20px', transition: 'color 0.2s' }}
                onMouseEnter={e => e.target.style.color = '#ff2222'}
                onMouseLeave={e => e.target.style.color = '#333'}>
                Clear Bag
              </button>
            </div>

            {/* Summary */}
            <div style={{ background: '#111', border: '1px solid #1a1a1a', padding: '32px' }}>
              <h2 style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '28px', letterSpacing: '0.08em', marginBottom: '24px' }}>
                ORDER SUMMARY
              </h2>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                <span style={{ fontSize: '12px', color: '#666', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Subtotal</span>
                <span style={{ fontSize: '14px', fontWeight: 600 }}>£{subtotal.toFixed(2)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px' }}>
                <span style={{ fontSize: '12px', color: '#666', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Shipping</span>
                <span style={{ fontSize: '12px', color: '#555' }}>Calculated at checkout</span>
              </div>
              <div style={{ borderTop: '1px solid #2a2a2a', paddingTop: '24px', display: 'flex', justifyContent: 'space-between', marginBottom: '32px' }}>
                <span style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '20px', letterSpacing: '0.08em' }}>TOTAL</span>
                <span style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '24px', color: '#e8ff00', letterSpacing: '0.06em' }}>£{subtotal.toFixed(2)}</span>
              </div>
              <button style={{
                width: '100%', padding: '18px',
                background: '#e8ff00', color: '#0a0a0a',
                border: 'none',
                fontSize: '12px', fontWeight: 900, letterSpacing: '0.2em', textTransform: 'uppercase',
                cursor: 'pointer', marginBottom: '12px',
              }}
                onMouseEnter={e => e.currentTarget.style.background = '#f5f5f0'}
                onMouseLeave={e => e.currentTarget.style.background = '#e8ff00'}>
                Checkout
              </button>
              <Link href="/shop">
                <button style={{
                  width: '100%', padding: '14px',
                  background: 'transparent', color: '#555',
                  border: '1px solid #2a2a2a',
                  fontSize: '11px', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase',
                  cursor: 'pointer',
                }}>
                  Continue Shopping
                </button>
              </Link>
            </div>
          </div>
        )}
      </div>

      <Footer />

      <style>{`
        @media (max-width: 768px) {
          .cart-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  );
}
