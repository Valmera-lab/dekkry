import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
      <div className="text-8xl font-black text-brand-gray-800 mb-4">404</div>
      <h1 className="text-2xl font-black mb-3">Page Not Found</h1>
      <p className="text-brand-gray-500 mb-8">The page you're looking for doesn't exist.</p>
      <Link href="/" className="bg-brand-accent text-brand-black font-black text-sm tracking-widest uppercase px-8 py-3 hover:bg-white transition-colors">
        Back Home
      </Link>
    </div>
  );
}
