import Link from 'next/link';

export function Footer() {
  return (
    <footer className="border-t border-brand-gray-800 bg-brand-black">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-12">
          <div className="col-span-2 md:col-span-1">
            <div className="text-xl font-black tracking-[0.2em] text-brand-white mb-3">DEKKRY</div>
            <p className="text-xs text-brand-gray-500 leading-relaxed max-w-[180px]">
              Clean cuts. Raw energy. Built for the streets.
            </p>
          </div>
          <div>
            <div className="text-[9px] font-bold tracking-[0.35em] uppercase text-brand-gray-600 mb-4">Shop</div>
            <div className="flex flex-col gap-2.5">
              {[
                { label: 'All Products', href: '/products' },
                { label: 'Tops', href: '/products?category=tops' },
                { label: 'Bottoms', href: '/products?category=bottoms' },
                { label: 'Outerwear', href: '/products?category=outerwear' },
                { label: 'Accessories', href: '/products?category=accessories' },
              ].map((item) => (
                <Link key={item.label} href={item.href} className="text-xs text-brand-gray-500 hover:text-brand-white transition-colors">
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <div className="text-[9px] font-bold tracking-[0.35em] uppercase text-brand-gray-600 mb-4">Info</div>
            <div className="flex flex-col gap-2.5">
              <Link href="/about" className="text-xs text-brand-gray-500 hover:text-brand-white transition-colors">About Us</Link>
              <Link href="/shipping" className="text-xs text-brand-gray-500 hover:text-brand-white transition-colors">Shipping</Link>
            </div>
          </div>
          <div>
            <div className="text-[9px] font-bold tracking-[0.35em] uppercase text-brand-gray-600 mb-4">Brand</div>
            <p className="text-xs text-brand-gray-500 leading-relaxed">
              SS25 Collection<br />
              Premium Streetwear
            </p>
          </div>
        </div>

        <div className="border-t border-brand-gray-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-[10px] text-brand-gray-700">© 2025 DEKKRY. All rights reserved.</p>
          <p className="text-[10px] text-brand-gray-700 tracking-widest uppercase">Made with precision.</p>
        </div>
      </div>
    </footer>
  );
}
