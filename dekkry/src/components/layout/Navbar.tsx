'use client';
import Link from 'next/link';
import { ShoppingBag, X, Menu } from 'lucide-react';
import { useCartStore } from '@/lib/cart-store';
import { useState } from 'react';
import { cn } from '@/lib/utils';

export function Navbar() {
  const totalItems = useCartStore((s) => s.totalItems());
  const [menuOpen, setMenuOpen] = useState(false);

  const links = [
    { href: '/products', label: 'Shop' },
    { href: '/about', label: 'About' },
    { href: '/shipping', label: 'Shipping' },
  ];

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-brand-black/90 backdrop-blur-md border-b border-brand-gray-800/60">
        <div className="max-w-7xl mx-auto px-6 sm:px-10">
          <div className="flex items-center justify-between h-14">

            {/* Logo */}
            <Link href="/" className="text-xl font-black tracking-[0.2em] text-brand-white hover:text-brand-accent transition-colors duration-200">
              DEKKRY
            </Link>

            {/* Desktop links */}
            <div className="hidden md:flex items-center gap-8">
              {links.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="text-[10px] font-bold tracking-[0.3em] uppercase text-brand-gray-400 hover:text-brand-white transition-colors duration-200"
                >
                  {l.label}
                </Link>
              ))}
            </div>

            {/* Right */}
            <div className="flex items-center gap-5">
              <Link href="/cart" className="relative text-brand-gray-400 hover:text-brand-white transition-colors">
                <ShoppingBag size={18} strokeWidth={1.5} />
                {totalItems > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-brand-accent text-brand-black text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </Link>
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="md:hidden text-brand-gray-400 hover:text-brand-white transition-colors"
              >
                {menuOpen ? <X size={18} strokeWidth={1.5} /> : <Menu size={18} strokeWidth={1.5} />}
              </button>
            </div>

          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      <div className={cn(
        'fixed inset-0 z-40 bg-brand-black md:hidden flex flex-col justify-center transition-all duration-300',
        menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      )}>
        <div className="px-10 space-y-8">
          {links.map((l) => (
            <div key={l.href}>
              <Link
                href={l.href}
                onClick={() => setMenuOpen(false)}
                className="block text-5xl font-black tracking-[-0.02em] text-brand-white hover:text-brand-accent transition-colors"
              >
                {l.label}
              </Link>
            </div>
          ))}
        </div>
      </div>

      <div className="h-14" />
    </>
  );
}
