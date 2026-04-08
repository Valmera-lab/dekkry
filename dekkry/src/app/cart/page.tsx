'use client';
import { useCartStore } from '@/lib/cart-store';
import Image from 'next/image';
import Link from 'next/link';
import { Minus, Plus, X, ArrowRight, ShoppingBag } from 'lucide-react';
import { formatPrice } from '@/lib/utils';
import { useState } from 'react';

export default function CartPage() {
  const { items, removeItem, updateQuantity, totalPrice, totalItems } = useCartStore();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleCheckout() {
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        setError(data.error || 'Something went wrong. Please try again.');
      }
    } catch {
      setError('Could not connect to checkout. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <ShoppingBag size={64} className="mx-auto text-brand-gray-700 mb-6" />
        <h1 className="text-3xl font-black mb-3">Your bag is empty</h1>
        <p className="text-brand-gray-500 mb-8">Add some pieces to get started.</p>
        <Link
          href="/products"
          className="inline-flex items-center gap-2 bg-brand-accent text-brand-black font-black text-sm tracking-widest uppercase px-8 py-4 hover:bg-white transition-colors"
        >
          Shop Now <ArrowRight size={16} />
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-black tracking-tight mb-10">Your Bag</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Items */}
        <div className="lg:col-span-2 space-y-6">
          {items.map((item) => (
            <div
              key={`${item.productId}-${item.size}-${item.color}`}
              className="flex gap-4 pb-6 border-b border-brand-gray-800"
            >
              <div className="relative w-24 h-32 flex-shrink-0 bg-brand-gray-900 overflow-hidden">
                <Image src={item.productImage} alt={item.productName} fill className="object-cover" sizes="96px" />
              </div>
              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-sm font-bold tracking-wide uppercase">{item.productName}</h3>
                    <p className="text-xs text-brand-gray-500 mt-1">
                      {item.color} / {item.size}
                    </p>
                  </div>
                  <button
                    onClick={() => removeItem(item.productId, item.size, item.color)}
                    className="text-brand-gray-600 hover:text-brand-white transition-colors p-1"
                  >
                    <X size={16} />
                  </button>
                </div>
                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center border border-brand-gray-700">
                    <button
                      onClick={() => updateQuantity(item.productId, item.size, item.color, item.quantity - 1)}
                      className="px-3 py-2 text-brand-gray-400 hover:text-brand-white transition-colors"
                    >
                      <Minus size={12} />
                    </button>
                    <span className="px-4 text-sm font-semibold">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.productId, item.size, item.color, item.quantity + 1)}
                      className="px-3 py-2 text-brand-gray-400 hover:text-brand-white transition-colors"
                    >
                      <Plus size={12} />
                    </button>
                  </div>
                  <span className="font-bold">{formatPrice(item.price * item.quantity)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="bg-brand-gray-900 p-6 h-fit">
          <h2 className="text-sm font-black tracking-widest uppercase mb-6">Order Summary</h2>
          <div className="space-y-3 mb-6">
            <div className="flex justify-between text-sm text-brand-gray-400">
              <span>Subtotal ({totalItems()} items)</span>
              <span>{formatPrice(totalPrice())}</span>
            </div>
            <div className="flex justify-between text-sm text-brand-gray-400">
              <span>Shipping</span>
              <span className="text-brand-accent">Calculated at checkout</span>
            </div>
          </div>
          <div className="border-t border-brand-gray-700 pt-4 flex justify-between font-bold text-lg mb-6">
            <span>Total</span>
            <span>{formatPrice(totalPrice())}</span>
          </div>

          {error && (
            <div className="bg-red-900/20 border border-red-800 text-red-400 text-xs p-3 mb-4">
              {error}
            </div>
          )}

          <button
            onClick={handleCheckout}
            disabled={loading}
            className="w-full bg-brand-accent text-brand-black font-black text-sm tracking-widest uppercase py-4 flex items-center justify-center gap-2 hover:bg-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Loading...' : 'Checkout'} {!loading && <ArrowRight size={16} />}
          </button>
          <p className="text-xs text-brand-gray-600 text-center mt-3">Secured by Stripe</p>
        </div>
      </div>
    </div>
  );
}
