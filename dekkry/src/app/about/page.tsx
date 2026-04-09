import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="bg-brand-black">

      {/* Hero */}
      <section className="min-h-[70vh] flex flex-col justify-end px-6 sm:px-10 pb-16 pt-32 border-b border-brand-gray-800">
        <div className="max-w-7xl mx-auto w-full">
          <p className="text-[10px] font-semibold tracking-[0.4em] text-brand-gray-500 uppercase mb-6">Who We Are</p>
          <h1
            className="font-black tracking-[-0.04em] leading-none text-brand-white mb-8"
            style={{ fontSize: 'clamp(52px, 12vw, 140px)' }}
          >
            Built for<br />the real ones.
          </h1>
          <p className="text-sm text-brand-gray-400 max-w-md leading-relaxed">
            No hype. No hollow drops. Just clothing that actually slaps — made for people who live life at full volume.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="px-6 sm:px-10 py-24 border-b border-brand-gray-800">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16">
          <div className="md:sticky md:top-24 self-start">
            <p className="text-[10px] font-semibold tracking-[0.4em] text-brand-gray-500 uppercase mb-4">The Story</p>
            <h2 className="text-4xl font-black tracking-[-0.03em] text-brand-white leading-tight">
              Started from a feeling,<br />not a formula.
            </h2>
          </div>
          <div className="space-y-6 text-sm text-brand-gray-400 leading-relaxed">
            <p>
              DEKKRY started because we were tired of settling. Tired of streetwear that looked sick online and fell apart after three washes. Tired of brands that sold a lifestyle they clearly didn&apos;t live.
            </p>
            <p>
              So we did it ourselves. Every piece in the DEKKRY catalogue is sourced with one question in mind: would we actually wear this? If the answer&apos;s anything less than a hard yes — it doesn&apos;t make the cut.
            </p>
            <p>
              We&apos;re not chasing trends. We&apos;re setting a standard. Clean silhouettes, premium fabrics, fits that work whether you&apos;re moving through the city or standing still. That&apos;s the DEKKRY way.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="px-6 sm:px-10 py-24 border-b border-brand-gray-800">
        <div className="max-w-7xl mx-auto">
          <p className="text-[10px] font-semibold tracking-[0.4em] text-brand-gray-500 uppercase mb-14">What We Stand For</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-12">
            {[
              { number: '01', title: 'Real Quality', desc: "Every piece is checked before it ships. We don't do \"good enough.\" Either it's right or it doesn't go out." },
              { number: '02', title: 'No Fluff', desc: "No gimmicks, no hollow collabs, no drops just for the hype. Just good clothing, every time." },
              { number: '03', title: 'Built to Last', desc: "Fast fashion is a waste of time and money. We build pieces you'll still be rocking in two years." },
            ].map((v) => (
              <div key={v.number}>
                <p className="text-5xl font-black text-brand-gray-800 mb-5">{v.number}</p>
                <h3 className="text-lg font-black text-brand-white mb-3">{v.title}</h3>
                <p className="text-sm text-brand-gray-500 leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quote */}
      <section className="px-6 sm:px-10 py-24 border-b border-brand-gray-800">
        <div className="max-w-7xl mx-auto">
          <blockquote
            className="font-black tracking-[-0.04em] leading-none text-brand-gray-800 select-none"
            style={{ fontSize: 'clamp(48px, 10vw, 130px)' }}
          >
            &ldquo;Dress like<br />you mean it.&rdquo;
          </blockquote>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 sm:px-10 py-20">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <p className="text-[10px] tracking-[0.4em] text-brand-gray-500 uppercase mb-2">Ready?</p>
            <h2 className="text-3xl font-black text-brand-white">The collection is live.</h2>
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
