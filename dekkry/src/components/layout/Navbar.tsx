'use client';
import Link from 'next/link';
import { ShoppingBag, Menu, X } from 'lucide-react';
import { useCartStore } from '@/lib/cart-store';
import { useState } from 'react';
import { cn } from '@/lib/utils';

export function Navbar() {
  const totalItems = useCartStore((s) => s.totalItems());
  const [menuOpen, setMenuOpen] = useState(false);

  const links = [
    { href: '/products', label: 'Shop' },
    { href: '/products?category=tops', label: 'Tops' },
    { href: '/products?category=bottoms', label: 'Bottoms' },
    { href: '/products?category=outerwear', label: 'Outerwear' },
  ];

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-brand-black/95 backdrop-blur-sm border-b border-brand-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="text-2xl font-black tracking-[0.15em] text-brand-white hover:text-brand-accent transition-colors duration-200">
              DEKKRY
            </Link>

            {/* Desktop nav */}
            <div className="hidden md:flex items-center gap-8">
              {links.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="text-xs font-semibold tracking-widest uppercase text-brand-gray-300 hover:text-brand-white transition-colors duration-200"
                >
                  {l.label}
                </Link>
              ))}
            </div>

            {/* Right actions */}
            <div className="flex items-center gap-4">
              <Link href="/cart" className="relative p-2 text-brand-gray-300 hover:text-brand-white transition-colors">
                <ShoppingBag size={20} />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-brand-accent text-brand-black text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </Link>
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="md:hidden p-2 text-brand-gray-300 hover:text-brand-white transition-colors"
              >
                {menuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        className={cn(
          'fixed inset-0 z-40 bg-brand-black md:hidden transition-all duration-300',
          menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        )}
      >
        <div className="flex flex-col items-center justify-center h-full gap-8">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setMenuOpen(false)}
              className="text-3xl font-black tracking-widest uppercase hover:text-brand-accent transition-colors"
            >
              {l.label}
            </Link>
          ))}
        </div>
      </div>

      {/* Spacer */}
      <div className="h-16" />
    </>
  );
}
