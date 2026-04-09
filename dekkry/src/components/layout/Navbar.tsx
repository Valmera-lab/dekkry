'use client';
import Link from 'next/link';
import { useCartStore } from '@/lib/cart-store';
import { useState } from 'react';
import { cn } from '@/lib/utils';

export function Navbar() {
  const totalItems = useCartStore((s) => s.totalItems());
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 mix-blend-difference">
        <div className="flex items-center justify-between px-5 sm:px-8 h-12">
          <Link
            href="/"
            className="text-sm font-black tracking-[0.15em] text-white uppercase hover:opacity-70 transition-opacity"
          >
            DEKKRY
          </Link>

          <div className="hidden md:flex items-center gap-10">
            {[
              { href: '/products', label: 'Shop' },
              { href: '/about', label: 'About' },
              { href: '/shipping', label: 'Shipping' },
            ].map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-[10px] font-bold tracking-[0.3em] uppercase text-white hover:opacity-60 transition-opacity"
              >
                {l.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-5">
            <Link href="/cart" className="relative text-white hover:opacity-60 transition-opacity">
              <span className="text-[10px] font-bold tracking-[0.3em] uppercase">
                Bag{totalItems > 0 ? ` (${totalItems})` : ''}
              </span>
            </Link>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden text-white text-[10px] font-bold tracking-[0.3em] uppercase"
            >
              {menuOpen ? 'Close' : 'Menu'}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile fullscreen menu */}
      <div className={cn(
        'fixed inset-0 z-40 bg-brand-black flex flex-col justify-between p-8 transition-all duration-500',
        menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      )}>
        <div className="flex justify-between items-start pt-14">
          <div className="space-y-2">
            {[
              { href: '/products', label: 'Shop' },
              { href: '/about', label: 'About' },
              { href: '/shipping', label: 'Shipping' },
              { href: '/cart', label: 'Bag' },
            ].map((l) => (
              <div key={l.href}>
                <Link
                  href={l.href}
                  onClick={() => setMenuOpen(false)}
                  className="block text-[56px] leading-[1.05] font-black tracking-[-0.03em] text-brand-white hover:text-brand-accent transition-colors"
                >
                  {l.label}
                </Link>
              </div>
            ))}
          </div>
        </div>
        <p className="text-[10px] font-bold tracking-[0.35em] uppercase text-brand-gray-600">DEKKRY SS25</p>
      </div>

      <div className="h-12" />
    </>
  );
}
