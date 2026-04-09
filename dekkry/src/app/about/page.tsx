import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="bg-brand-cream">

      {/* Hero */}
      <section className="bg-brand-black text-brand-cream py-32">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="text-xs font-semibold tracking-[0.4em] text-brand-accent uppercase mb-6">Who We Are</div>
          <h1 className="text-6xl sm:text-8xl font-black tracking-[-0.02em] leading-none mb-8">
            Built for the<br />real ones.
          </h1>
          <p className="text-lg text-brand-gray-300 max-w-xl mx-auto leading-relaxed">
            No hype. No hollow drops. Just clothing that actually slaps — made for people who live their life at full volume.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
          <div className="sticky top-24">
            <div className="text-xs font-semibold tracking-[0.4em] text-brand-gray-400 uppercase mb-4">The Story</div>
            <h2 className="text-4xl font-black tracking-tight text-brand-black leading-tight">
              Started from a feeling,<br />not a formula.
            </h2>
          </div>
          <div className="space-y-6 text-brand-gray-500 leading-relaxed">
            <p>
              DEKKRY started because we were tired of settling. Tired of streetwear that looked sick online and fell apart after three washes. Tired of brands that sold a lifestyle they clearly didn&apos;t live.
            </p>
            <p>
              So we did it ourselves. Every piece in the DEKKRY catalogue is sourced with one question in mind: would we actually wear this? If the answer&apos;s anything less than a hard yes — it doesn&apos;t make the cut.
            </p>
            <p>
              We&apos;re not chasing trends. We&apos;re setting a standard. Clean silhouettes, premium fabrics, and fits that work whether you&apos;re moving through the city or standing still. That&apos;s the DEKKRY way.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-brand-sand py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-xs font-semibold tracking-[0.4em] text-brand-gray-400 uppercase mb-12 text-center">What We Stand For</div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-10">
            {[
              {
                number: '01',
                title: 'Real Quality',
                desc: 'Every piece is checked before it reaches you. We don\'t do "good enough." Either it\'s right or it doesn\'t ship.'
              },
              {
                number: '02',
                title: 'No Fluff',
                desc: 'We keep it clean. No gimmicks, no forced collabs, no limited drops just for the sake of hype. Just good clothing.'
              },
              {
                number: '03',
                title: 'Built to Last',
                desc: 'Fast fashion is a waste of everyone\'s time and money. We build pieces you\'ll still be rocking in two years.'
              },
            ].map((v) => (
              <div key={v.number}>
                <div className="text-4xl font-black text-brand-gray-200 mb-4">{v.number}</div>
                <h3 className="text-xl font-black text-brand-black mb-3">{v.title}</h3>
                <p className="text-sm text-brand-gray-500 leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Manifesto */}
      <section className="py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <blockquote className="text-3xl sm:text-4xl font-black text-brand-black leading-tight tracking-tight">
            &ldquo;Dress like you mean it.&rdquo;
          </blockquote>
          <p className="text-brand-gray-400 mt-6 text-sm tracking-widest uppercase">— The DEKKRY Ethos</p>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-brand-accent py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-black text-brand-black mb-4 tracking-tight">Ready to cop?</h2>
          <p className="text-brand-black/70 mb-8">The collection is live. No waitlist, no nonsense.</p>
          <Link
            href="/products"
            className="inline-flex items-center gap-2 bg-brand-black text-brand-cream font-black text-sm tracking-widest uppercase px-10 py-4 hover:bg-brand-gray-800 transition-colors duration-200"
          >
            Shop Now <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  );
}
