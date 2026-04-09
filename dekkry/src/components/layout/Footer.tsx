import Link from 'next/link';

export function Footer() {
  return (
    <footer className="border-t border-brand-gray-800 bg-brand-black">
      <div className="px-5 sm:px-8 py-10">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-8">
          {/* Left */}
          <div>
            <p className="font-black text-[13px] tracking-[0.18em] text-brand-white uppercase mb-4">DEKKRY</p>
            <div className="flex flex-col gap-2">
              {[
                { href: '/products', label: 'Shop' },
                { href: '/about', label: 'About' },
                { href: '/shipping', label: 'Shipping' },
                { href: '/cart', label: 'Bag' },
              ].map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="font-bold text-[9px] tracking-[0.35em] uppercase text-brand-gray-600 hover:text-brand-white transition-colors w-fit"
                >
                  {l.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Right — big muted type */}
          <p
            className="font-black tracking-[-0.04em] leading-none text-brand-gray-800 select-none text-right"
            style={{ fontSize: 'clamp(40px, 8vw, 96px)' }}
          >
            SS25
          </p>
        </div>

        <div className="border-t border-brand-gray-800 mt-8 pt-5 flex items-center justify-between">
          <p className="font-bold text-[8px] tracking-[0.4em] uppercase text-brand-gray-800">
            © 2025 DEKKRY
          </p>
          <p className="font-bold text-[8px] tracking-[0.4em] uppercase text-brand-gray-800">
            Ships Worldwide
          </p>
        </div>
      </div>
    </footer>
  );
}
