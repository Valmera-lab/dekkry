'use client';
import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Package, ShoppingCart, Download, Lock } from 'lucide-react';

const NAV = [
  { href: '/admin/orders', label: 'Orders', icon: ShoppingCart },
  { href: '/admin/import', label: 'Import Products', icon: Download },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [authed, setAuthed] = useState(false);
  const [pw, setPw] = useState('');
  const [err, setErr] = useState('');
  const pathname = usePathname();

  if (!authed) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="w-full max-w-sm">
          <div className="text-center mb-8">
            <Lock size={32} className="mx-auto text-brand-accent mb-3" />
            <h1 className="text-2xl font-black tracking-wider">ADMIN</h1>
            <p className="text-brand-gray-500 text-sm mt-1">Enter your password to continue</p>
          </div>
          <div className="space-y-4">
            <input
              type="password"
              value={pw}
              onChange={(e) => setPw(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  if (pw === (process.env.NEXT_PUBLIC_ADMIN_PASSWORD || 'dekkry2025')) {
                    setAuthed(true);
                  } else {
                    setErr('Incorrect password');
                  }
                }
              }}
              placeholder="Password"
              className="w-full bg-brand-gray-900 border border-brand-gray-700 text-brand-white px-4 py-3 focus:outline-none focus:border-brand-accent"
            />
            {err && <p className="text-red-400 text-xs">{err}</p>}
            <button
              onClick={() => {
                if (pw === (process.env.NEXT_PUBLIC_ADMIN_PASSWORD || 'dekkry2025')) {
                  setAuthed(true);
                } else {
                  setErr('Incorrect password');
                }
              }}
              className="w-full bg-brand-accent text-brand-black font-black text-sm tracking-widest uppercase py-3 hover:bg-white transition-colors"
            >
              Enter
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-56 bg-brand-gray-900 border-r border-brand-gray-800 flex-shrink-0">
        <div className="p-6 border-b border-brand-gray-800">
          <div className="text-sm font-black tracking-widest uppercase">DEKKRY</div>
          <div className="text-xs text-brand-gray-500 mt-1">Admin Panel</div>
        </div>
        <nav className="p-4 space-y-1">
          {NAV.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className={cn(
                'flex items-center gap-3 px-3 py-2 text-sm font-semibold tracking-wide rounded transition-colors',
                pathname === href
                  ? 'bg-brand-accent text-brand-black'
                  : 'text-brand-gray-400 hover:text-brand-white hover:bg-brand-gray-800'
              )}
            >
              <Icon size={15} />
              {label}
            </Link>
          ))}
        </nav>
      </aside>

      {/* Content */}
      <main className="flex-1 p-8 overflow-auto">{children}</main>
    </div>
  );
}
