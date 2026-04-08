'use client';
import { useEffect } from 'react';
import { useCartStore } from '@/lib/cart-store';
import Link from 'next/link';
import { CheckCircle, ArrowRight } from 'lucide-react';

export default function SuccessPage() {
  const clearCart = useCartStore((s) => s.clearCart);

  useEffect(() => {
    clearCart();
  }, [clearCart]);

  return (
    <div className="max-w-2xl mx-auto px-4 py-20 text-center">
      <div className="mb-8">
        <CheckCircle size={72} className="mx-auto text-brand-accent mb-6" />
        <h1 className="text-4xl font-black tracking-tight mb-4">Order Confirmed</h1>
        <p className="text-brand-gray-400 text-lg leading-relaxed">
          Your order is in. We're processing it now and will fulfil it shortly. You'll receive a confirmation email.
        </p>
      </div>

      <div className="bg-brand-gray-900 p-6 mb-8 text-left">
        <h2 className="text-xs font-semibold tracking-widest uppercase text-brand-gray-500 mb-4">What happens next</h2>
        <div className="space-y-3">
          {[
            'Your payment has been processed securely via Stripe',
            'Our system is now placing your order with our supplier',
            'Once dispatched, your tracking number will be emailed to you',
            'Estimated delivery: 7–14 business days',
          ].map((step, i) => (
            <div key={i} className="flex items-start gap-3">
              <span className="text-brand-accent font-black text-xs mt-0.5">{String(i + 1).padStart(2, '0')}</span>
              <p className="text-sm text-brand-gray-300">{step}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Link
          href="/products"
          className="inline-flex items-center justify-center gap-2 bg-brand-accent text-brand-black font-black text-sm tracking-widest uppercase px-8 py-4 hover:bg-white transition-colors"
        >
          Continue Shopping <ArrowRight size={16} />
        </Link>
        <Link
          href="/"
          className="inline-flex items-center justify-center border border-brand-gray-700 text-brand-white font-semibold text-sm tracking-widest uppercase px-8 py-4 hover:border-brand-white transition-colors"
        >
          Home
        </Link>
      </div>
    </div>
  );
}
