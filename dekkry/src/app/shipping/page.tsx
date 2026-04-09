import Link from 'next/link';
import { ArrowRight, Package, Clock, Globe } from 'lucide-react';

export default function ShippingPage() {
  return (
    <div className="bg-brand-cream">

      {/* Hero */}
      <section className="bg-brand-black text-brand-cream py-28">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="text-xs font-semibold tracking-[0.4em] text-brand-accent uppercase mb-6">Delivery</div>
          <h1 className="text-6xl sm:text-7xl font-black tracking-[-0.02em] leading-none mb-6">
            Shipping Info
          </h1>
          <p className="text-brand-gray-300 max-w-lg mx-auto leading-relaxed">
            We ship worldwide. Every order is handled with care and packed properly so your stuff arrives looking exactly how it left us.
          </p>
        </div>
      </section>

      {/* Key info cards */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {[
            {
              icon: Clock,
              title: 'Delivery Time',
              body: 'Orders typically arrive within 2 weeks of purchase. We\'ll keep you updated along the way.'
            },
            {
              icon: Globe,
              title: 'Ships Worldwide',
              body: 'We ship internationally. No matter where you are, we\'ll get it to you.'
            },
            {
              icon: Package,
              title: 'Secure Packaging',
              body: 'Every order is carefully packed to make sure it arrives in perfect condition.'
            },
          ].map((card) => (
            <div key={card.title} className="bg-brand-sand p-8 rounded-sm">
              <card.icon size={28} className="text-brand-black mb-4" strokeWidth={1.5} />
              <h3 className="text-lg font-black text-brand-black mb-3">{card.title}</h3>
              <p className="text-sm text-brand-gray-500 leading-relaxed">{card.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Details */}
      <section className="bg-brand-sand py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-xs font-semibold tracking-[0.4em] text-brand-gray-400 uppercase mb-12">The Details</div>

          <div className="space-y-10">
            {[
              {
                q: 'How long does shipping take?',
                a: 'All orders ship within 1–3 business days of purchase and arrive within approximately 2 weeks. International orders may occasionally take a little longer depending on customs in your country.'
              },
              {
                q: 'Do you ship internationally?',
                a: 'Yes — we ship worldwide. Wherever you are, we\'ll get your order to you.'
              },
              {
                q: 'Will I get a tracking number?',
                a: 'Yes. Once your order ships, you\'ll receive a tracking number so you can follow your package every step of the way.'
              },
              {
                q: 'What if my order is delayed?',
                a: 'Occasionally, international customs or carrier delays can push delivery times back slightly. If your order is significantly past the expected window, reach out and we\'ll look into it for you.'
              },
              {
                q: 'What about duties and taxes?',
                a: 'Import duties and taxes vary by country and are the responsibility of the buyer. We recommend checking your local customs rules before placing an order.'
              },
            ].map((item) => (
              <div key={item.q} className="border-b border-brand-gray-200 pb-10">
                <h3 className="text-lg font-black text-brand-black mb-3">{item.q}</h3>
                <p className="text-brand-gray-500 leading-relaxed text-sm">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 text-center">
        <div className="max-w-xl mx-auto px-4">
          <h2 className="text-3xl font-black text-brand-black mb-4">Ready to order?</h2>
          <p className="text-brand-gray-400 mb-8 text-sm">Browse the collection and find your next piece.</p>
          <Link
            href="/products"
            className="inline-flex items-center gap-2 bg-brand-black text-brand-cream font-black text-sm tracking-widest uppercase px-10 py-4 hover:bg-brand-gray-700 transition-colors duration-200"
          >
            Shop Now <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  );
}
