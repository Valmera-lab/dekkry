import Link from 'next/link';

export function Footer() {
  return (
    <footer className="border-t border-brand-gray-200 mt-0 bg-brand-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <div className="text-2xl font-black tracking-[0.15em] text-brand-black mb-3">DEKKRY</div>
            <p className="text-sm text-brand-gray-400 leading-relaxed max-w-xs">
              Clean cuts. Raw energy. Built for the streets.
            </p>
          </div>
          <div>
            <div className="text-xs font-semibold tracking-widest uppercase text-brand-gray-400 mb-4">Shop</div>
            <div className="flex flex-col gap-2">
              {[
                { label: 'All Products', href: '/products' },
                { label: 'Tops', href: '/products?category=tops' },
                { label: 'Bottoms', href: '/products?category=bottoms' },
                { label: 'Outerwear', href: '/products?category=outerwear' },
              ].map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="text-sm text-brand-gray-400 hover:text-brand-black transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <div className="text-xs font-semibold tracking-widest uppercase text-brand-gray-400 mb-4">Info</div>
            <div className="flex flex-col gap-2">
              <Link href="/about" className="text-sm text-brand-gray-400 hover:text-brand-black transition-colors">About Us</Link>
              <Link href="/shipping" className="text-sm text-brand-gray-400 hover:text-brand-black transition-colors">Shipping</Link>
            </div>
          </div>
        </div>
        <div className="border-t border-brand-gray-200 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-brand-gray-400">© 2025 DEKKRY. All rights reserved.</p>
          <p className="text-xs text-brand-gray-400">Made with precision.</p>
        </div>
      </div>
    </footer>
  );
}
