import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function ShippingPage() {
  return (
    <div className="bg-brand-black">

      {/* Hero */}
      <section className="px-6 sm:px-10 pt-20 pb-16 border-b border-brand-gray-800">
        <div className="max-w-7xl mx-auto">
          <p className="text-[10px] font-semibold tracking-[0.4em] text-brand-gray-500 uppercase mb-6">Delivery</p>
          <h1 className="text-5xl sm:text-7xl font-black tracking-[-0.03em] leading-none text-brand-white mb-6">
            Shipping Info
          </h1>
          <p className="text-sm text-brand-gray-400 max-w-md leading-relaxed">
            We ship worldwide. Every order is packed carefully so your stuff arrives exactly as it left us.
          </p>
        </div>
      </section>

      {/* Key facts */}
      <section className="px-6 sm:px-10 py-20 border-b border-brand-gray-800">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-10">
          {[
            { label: 'Delivery Time', value: '~2 weeks', sub: 'From order to your door.' },
            { label: 'Coverage', value: 'Worldwide', sub: 'We ship everywhere.' },
            { label: 'Tracking', value: 'Included', sub: 'Every order gets a tracking number.' },
          ].map((f) => (
            <div key={f.label} className="border-t border-brand-gray-800 pt-6">
              <p className="text-[10px] font-bold tracking-[0.35em] uppercase text-brand-gray-500 mb-3">{f.label}</p>
              <p className="text-3xl font-black text-brand-white mb-2">{f.value}</p>
              <p className="text-xs text-brand-gray-500">{f.sub}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="px-6 sm:px-10 py-20 border-b border-brand-gray-800">
        <div className="max-w-3xl mx-auto">
          <p className="text-[10px] font-semibold tracking-[0.4em] text-brand-gray-500 uppercase mb-12">FAQ</p>
          <div className="space-y-10">
            {[
              {
                q: 'How long does shipping take?',
                a: 'All orders arrive within approximately 2 weeks. International orders may take a little longer depending on customs in your country.'
              },
              {
                q: 'Do you ship internationally?',
                a: "Yes — we ship worldwide. Wherever you are, we'll get your order to you."
              },
              {
                q: 'Will I get a tracking number?',
                a: "Yes. Once your order ships, you'll receive a tracking number to follow your package every step of the way."
              },
              {
                q: 'What about duties and taxes?',
                a: 'Import duties and taxes vary by country and are the responsibility of the buyer. We recommend checking your local customs rules before ordering.'
              },
            ].map((item) => (
              <div key={item.q} className="border-b border-brand-gray-800 pb-10">
                <h3 className="text-base font-black text-brand-white mb-3">{item.q}</h3>
                <p className="text-sm text-brand-gray-500 leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 sm:px-10 py-20">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <p className="text-[10px] tracking-[0.4em] text-brand-gray-500 uppercase mb-2">Ready to order?</p>
            <h2 className="text-3xl font-black text-brand-white">Browse the collection.</h2>
          </div>
          <Link
            href="/products"
            className="inline-flex items-center gap-3 bg-brand-accent text-brand-black font-black text-xs tracking-[0.25em] uppercase px-8 py-4 hover:bg-brand-white transition-colors duration-200 group"
          >
            Shop Now <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>
    </div>
  );
}
