import Link from 'next/link';

export default function Footer() {
  return (
    <footer style={{
      borderTop: '1px solid #1a1a1a',
      marginTop: '80px',
      padding: '60px 24px 40px',
      background: '#0a0a0a',
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '40px', marginBottom: '60px' }}>
          <div>
            <h3 style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '32px', letterSpacing: '0.1em', marginBottom: '16px' }}>DEKKRY</h3>
            <p style={{ fontSize: '12px', color: '#555', lineHeight: 1.8, maxWidth: '220px' }}>
              Not for everyone. Made for those who move different.
            </p>
          </div>
          <div>
            <h4 style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#888', marginBottom: '16px' }}>Shop</h4>
            {['All Products', 'T-Shirts', 'Hoodies', 'Jackets', 'Bottoms', 'Accessories'].map(cat => (
              <Link key={cat} href={cat === 'All Products' ? '/shop' : `/shop?cat=${cat}`}
                style={{ display: 'block', fontSize: '12px', color: '#555', marginBottom: '10px', transition: 'color 0.2s' }}
                onMouseEnter={e => e.target.style.color = '#f5f5f0'}
                onMouseLeave={e => e.target.style.color = '#555'}>
                {cat}
              </Link>
            ))}
          </div>
          <div>
            <h4 style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#888', marginBottom: '16px' }}>Info</h4>
            {['About', 'Sizing Guide', 'Shipping', 'Returns', 'Contact'].map(item => (
              <a key={item} href="#"
                style={{ display: 'block', fontSize: '12px', color: '#555', marginBottom: '10px', transition: 'color 0.2s' }}
                onMouseEnter={e => e.target.style.color = '#f5f5f0'}
                onMouseLeave={e => e.target.style.color = '#555'}>
                {item}
              </a>
            ))}
          </div>
          <div>
            <h4 style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#888', marginBottom: '16px' }}>Connect</h4>
            {['Instagram', 'TikTok', 'Twitter / X'].map(item => (
              <a key={item} href="#"
                style={{ display: 'block', fontSize: '12px', color: '#555', marginBottom: '10px', transition: 'color 0.2s' }}
                onMouseEnter={e => e.target.style.color = '#e8ff00'}
                onMouseLeave={e => e.target.style.color = '#555'}>
                {item}
              </a>
            ))}
          </div>
        </div>

        <div style={{ borderTop: '1px solid #1a1a1a', paddingTop: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
          <p style={{ fontSize: '11px', color: '#444', letterSpacing: '0.08em' }}>© {new Date().getFullYear()} DEKKRY. ALL RIGHTS RESERVED.</p>
          <p style={{ fontSize: '11px', color: '#333', letterSpacing: '0.06em' }}>THE MOVEMENT CONTINUES.</p>
        </div>
      </div>
    </footer>
  );
}
