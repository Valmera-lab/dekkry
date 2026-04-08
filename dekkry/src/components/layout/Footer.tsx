import Link from 'next/link';

export function Footer() {
  return (
    <footer className="border-t border-brand-gray-800 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <div className="text-2xl font-black tracking-[0.15em] mb-3">DEKKRY</div>
            <p className="text-sm text-brand-gray-400 leading-relaxed max-w-xs">
              Clean cuts. Raw energy. Built for the streets.
            </p>
          </div>
          <div>
            <div className="text-xs font-semibold tracking-widest uppercase text-brand-gray-500 mb-4">Shop</div>
            <div className="flex flex-col gap-2">
              {['All Products', 'Tops', 'Bottoms', 'Outerwear', 'Accessories'].map((item) => (
                <Link
                  key={item}
                  href={`/products${item !== 'All Products' ? `?category=${item.toLowerCase()}` : ''}`}
                  className="text-sm text-brand-gray-400 hover:text-brand-white transition-colors"
                >
                  {item}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <div className="text-xs font-semibold tracking-widest uppercase text-brand-gray-500 mb-4">Info</div>
            <div className="flex flex-col gap-2">
              {['Shipping', 'Returns', 'Sizing Guide', 'Contact'].map((item) => (
                <span key={item} className="text-sm text-brand-gray-400">{item}</span>
              ))}
            </div>
          </div>
        </div>
        <div className="border-t border-brand-gray-800 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-brand-gray-600">© 2025 DEKKRY. All rights reserved.</p>
          <p className="text-xs text-brand-gray-600">Made with precision.</p>
        </div>
      </div>
    </footer>
  );
}
