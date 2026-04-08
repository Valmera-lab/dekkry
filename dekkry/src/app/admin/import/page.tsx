'use client';
import { useState } from 'react';
import { Download, Save, RefreshCw, Plus, Trash2 } from 'lucide-react';

interface ParsedProduct {
  name: string;
  description: string;
  price: number;
  images: string[];
  sizes: string[];
  colors: string[];
  sourceUrl: string;
}

export default function ImportPage() {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [parsed, setParsed] = useState<ParsedProduct | null>(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');

  async function handleFetch() {
    if (!url.trim()) return;
    setLoading(true);
    setError('');
    setParsed(null);
    try {
      const res = await fetch('/api/admin/scrape', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url }),
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setParsed(data);
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : 'Failed to fetch product';
      setError(message);
    } finally {
      setLoading(false);
    }
  }

  async function handleSave() {
    if (!parsed) return;
    setSaving(true);
    try {
      const res = await fetch('/api/admin/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...parsed, sourceUrl: url }),
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : 'Failed to save product';
      setError(message);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="max-w-3xl">
      <div className="mb-8">
        <h1 className="text-3xl font-black tracking-tight mb-2">Import Product</h1>
        <p className="text-brand-gray-500 text-sm">Paste a MuleBuy product URL to import it into your store.</p>
      </div>

      {/* URL input */}
      <div className="flex gap-3 mb-8">
        <input
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://mulebuy.com/product?id=..."
          className="flex-1 bg-brand-gray-900 border border-brand-gray-700 text-brand-white px-4 py-3 text-sm focus:outline-none focus:border-brand-accent placeholder-brand-gray-600"
        />
        <button
          onClick={handleFetch}
          disabled={loading || !url.trim()}
          className="flex items-center gap-2 bg-brand-accent text-brand-black font-black text-xs tracking-widest uppercase px-6 py-3 hover:bg-white transition-colors disabled:opacity-50"
        >
          {loading ? <RefreshCw size={14} className="animate-spin" /> : <Download size={14} />}
          {loading ? 'Fetching...' : 'Fetch'}
        </button>
      </div>

      {error && (
        <div className="bg-red-900/20 border border-red-800 text-red-400 text-sm p-4 mb-6">
          {error}
        </div>
      )}

      {/* Parsed data form */}
      {parsed && (
        <div className="space-y-6">
          <div className="border-b border-brand-gray-800 pb-2 mb-4">
            <h2 className="text-sm font-black tracking-widest uppercase text-brand-gray-400">Extracted Data — Edit Before Saving</h2>
          </div>

          <div>
            <label className="block text-xs font-semibold tracking-widest uppercase text-brand-gray-500 mb-2">Product Name</label>
            <input
              value={parsed.name}
              onChange={(e) => setParsed({ ...parsed, name: e.target.value })}
              className="w-full bg-brand-gray-900 border border-brand-gray-700 text-brand-white px-4 py-3 text-sm focus:outline-none focus:border-brand-accent"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold tracking-widest uppercase text-brand-gray-500 mb-2">Description</label>
            <textarea
              value={parsed.description}
              onChange={(e) => setParsed({ ...parsed, description: e.target.value })}
              rows={3}
              className="w-full bg-brand-gray-900 border border-brand-gray-700 text-brand-white px-4 py-3 text-sm focus:outline-none focus:border-brand-accent resize-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold tracking-widest uppercase text-brand-gray-500 mb-2">Price (£)</label>
            <input
              type="number"
              value={parsed.price}
              onChange={(e) => setParsed({ ...parsed, price: parseFloat(e.target.value) })}
              className="w-48 bg-brand-gray-900 border border-brand-gray-700 text-brand-white px-4 py-3 text-sm focus:outline-none focus:border-brand-accent"
            />
          </div>

          {/* Images */}
          <div>
            <label className="block text-xs font-semibold tracking-widest uppercase text-brand-gray-500 mb-2">
              Images ({parsed.images.length})
            </label>
            <div className="grid grid-cols-4 gap-3 mb-3">
              {parsed.images.map((img, i) => (
                <div key={i} className="relative aspect-square bg-brand-gray-800 overflow-hidden group">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={img} alt="" className="w-full h-full object-cover" />
                  <button
                    onClick={() => setParsed({ ...parsed, images: parsed.images.filter((_, j) => j !== i) })}
                    className="absolute top-1 right-1 bg-red-500 text-white p-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Trash2 size={10} />
                  </button>
                </div>
              ))}
            </div>
            <input
              placeholder="Add image URL..."
              className="w-full bg-brand-gray-900 border border-brand-gray-700 text-brand-white px-4 py-2 text-sm focus:outline-none focus:border-brand-accent"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  const val = (e.target as HTMLInputElement).value.trim();
                  if (val) {
                    setParsed({ ...parsed, images: [...parsed.images, val] });
                    (e.target as HTMLInputElement).value = '';
                  }
                }
              }}
            />
          </div>

          {/* Sizes */}
          <div>
            <label className="block text-xs font-semibold tracking-widest uppercase text-brand-gray-500 mb-2">Sizes</label>
            <div className="flex gap-2 flex-wrap">
              {['S', 'M', 'L', 'XL', 'XXL'].map((size) => (
                <button
                  key={size}
                  onClick={() => {
                    const sizes = parsed.sizes.includes(size)
                      ? parsed.sizes.filter((s) => s !== size)
                      : [...parsed.sizes, size];
                    setParsed({ ...parsed, sizes });
                  }}
                  className={`w-12 h-10 text-xs font-bold border transition-colors ${
                    parsed.sizes.includes(size)
                      ? 'border-brand-accent bg-brand-accent text-brand-black'
                      : 'border-brand-gray-700 text-brand-gray-400'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Colors */}
          <div>
            <label className="block text-xs font-semibold tracking-widest uppercase text-brand-gray-500 mb-2">Colors</label>
            <div className="flex gap-2 flex-wrap mb-2">
              {parsed.colors.map((color, i) => (
                <span key={i} className="flex items-center gap-1 bg-brand-gray-800 px-3 py-1 text-xs">
                  {color}
                  <button onClick={() => setParsed({ ...parsed, colors: parsed.colors.filter((_, j) => j !== i) })}>
                    <Trash2 size={10} className="text-red-400" />
                  </button>
                </span>
              ))}
            </div>
            <input
              placeholder="Add colour (e.g. Black)..."
              className="w-full bg-brand-gray-900 border border-brand-gray-700 text-brand-white px-4 py-2 text-sm focus:outline-none focus:border-brand-accent"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  const val = (e.target as HTMLInputElement).value.trim();
                  if (val) {
                    setParsed({ ...parsed, colors: [...parsed.colors, val] });
                    (e.target as HTMLInputElement).value = '';
                  }
                }
              }}
            />
          </div>

          <button
            onClick={handleSave}
            disabled={saving}
            className={`flex items-center gap-2 font-black text-sm tracking-widest uppercase px-8 py-4 transition-colors ${
              saved
                ? 'bg-green-500 text-brand-black'
                : 'bg-brand-accent text-brand-black hover:bg-white'
            } disabled:opacity-50`}
          >
            <Save size={16} />
            {saved ? 'Saved!' : saving ? 'Saving...' : 'Save Product'}
          </button>
        </div>
      )}

      {/* Bulk import helper */}
      <div className="mt-12 border border-brand-gray-800 p-6">
        <h3 className="text-sm font-black tracking-widest uppercase mb-3">Your MuleBuy Links</h3>
        <p className="text-xs text-brand-gray-500 mb-4">Quick-paste any of your product links:</p>
        <div className="space-y-2 max-h-64 overflow-y-auto no-scrollbar">
          {[
            'https://mulebuy.com/product?id=903913002851&platform=TAOBAO',
            'https://mulebuy.com/product?id=965410559753&platform=TAOBAO',
            'https://mulebuy.com/product?id=885213176913&platform=TAOBAO',
            'https://mulebuy.com/product?id=952145287625&platform=TAOBAO',
            'https://mulebuy.com/product?id=912588536138&platform=TAOBAO',
            'https://mulebuy.com/product?id=931719525623&platform=TAOBAO',
            'https://mulebuy.com/product?id=1019223341961&platform=TAOBAO',
            'https://mulebuy.com/product?id=903628839009&platform=TAOBAO',
            'https://mulebuy.com/product?id=935921818475&platform=TAOBAO',
            'https://mulebuy.com/product?id=895377966659&platform=TAOBAO',
            'https://mulebuy.com/product?id=887560658574&platform=TAOBAO',
            'https://mulebuy.com/product?id=913077954029&platform=TAOBAO',
            'https://mulebuy.com/product?id=910779713274&platform=TAOBAO',
            'https://mulebuy.com/product?id=1006200446563&platform=TAOBAO',
            'https://mulebuy.com/product?id=962737887126&platform=TAOBAO',
            'https://mulebuy.com/product?id=912802087288&platform=TAOBAO',
            'https://mulebuy.com/product?id=886882452912&platform=TAOBAO',
            'https://mulebuy.com/product?id=887293479337&platform=TAOBAO',
            'https://mulebuy.com/product?id=964875364604&platform=TAOBAO',
            'https://mulebuy.com/product?id=906658572471&platform=TAOBAO',
            'https://mulebuy.com/product?id=911201764779&platform=TAOBAO',
            'https://mulebuy.com/product?id=918834762085&platform=TAOBAO',
            'https://mulebuy.com/product?id=919087290520&platform=TAOBAO',
          ].map((link, i) => (
            <button
              key={i}
              onClick={() => setUrl(link)}
              className="w-full text-left text-xs text-brand-gray-500 hover:text-brand-accent px-3 py-1.5 hover:bg-brand-gray-900 transition-colors font-mono truncate"
            >
              {link}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
