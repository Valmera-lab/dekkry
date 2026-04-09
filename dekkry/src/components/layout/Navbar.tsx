'use client';
import Link from 'next/link';
import { useCartStore } from '@/lib/cart-store';
import { useState, useEffect } from 'react';

export function Navbar() {
  const totalItems = useCartStore((s) => s.totalItems());
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      {/* NAV — absolutely minimal, sits over hero */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
          scrolled ? 'bg-brand-black/95 backdrop-blur-sm' : 'bg-transparent'
        }`}
      >
        <div className="flex items-center justify-between px-5 sm:px-8 h-11">
          {/* Logo */}
          <Link
            href="/"
            className="font-black text-[13px] tracking-[0.18em] text-brand-white uppercase leading-none"
            onClick={() => setOpen(false)}
          >
            DEKKRY
          </Link>

          {/* Right side: bag + menu toggle */}
          <div className="flex items-center gap-6">
            <Link
              href="/cart"
              className="font-bold text-[9px] tracking-[0.35em] uppercase text-brand-gray-400 hover:text-brand-white transition-colors"
            >
              {totalItems > 0 ? `BAG (${totalItems})` : 'BAG'}
            </Link>
            <button
              onClick={() => setOpen(!open)}
              className="font-bold text-[9px] tracking-[0.35em] uppercase text-brand-gray-400 hover:text-brand-white transition-colors"
            >
              {open ? 'CLOSE' : 'MENU'}
            </button>
          </div>
        </div>
      </nav>

      {/* FULLSCREEN MENU — Corteiz-style */}
      <div
        className={`fixed inset-0 z-40 bg-brand-black flex flex-col transition-all duration-500 ${
          open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Top row */}
        <div className="flex items-center justify-between px-5 sm:px-8 h-11 mt-0">
          <span className="font-black text-[13px] tracking-[0.18em] text-brand-white uppercase">DEKKRY</span>
          <button
            onClick={() => setOpen(false)}
            className="font-bold text-[9px] tracking-[0.35em] uppercase text-brand-gray-500"
          >
            CLOSE
          </button>
        </div>

        {/* Nav links — huge, left-aligned, touching bottom */}
        <div className="flex-1 flex flex-col justify-end px-5 sm:px-8 pb-16 gap-0">
          {[
            { href: '/products', label: 'Shop' },
            { href: '/about', label: 'About' },
            { href: '/shipping', label: 'Shipping' },
            { href: '/cart', label: totalItems > 0 ? `Bag (${totalItems})` : 'Bag' },
          ].map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block font-black leading-[0.9] tracking-[-0.04em] text-brand-white hover:text-brand-lime transition-colors duration-150"
              style={{ fontSize: 'clamp(64px, 14vw, 160px)' }}
            >
              {l.label}
            </Link>
          ))}
        </div>

        {/* Bottom strip */}
        <div className="px-5 sm:px-8 pb-8 flex items-center justify-between">
          <span className="font-bold text-[9px] tracking-[0.4em] uppercase text-brand-gray-700">SS25 Collection</span>
          <span className="font-bold text-[9px] tracking-[0.4em] uppercase text-brand-gray-700">Ships Worldwide</span>
        </div>
      </div>

      {/* Spacer — only on non-hero pages */}
      <div className="h-11 bg-brand-black" />
    </>
  );
}
