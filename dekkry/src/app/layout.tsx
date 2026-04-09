import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  weight: ['400', '500', '700', '800', '900'],
});

export const metadata: Metadata = {
  title: 'DEKKRY — Premium Streetwear',
  description: 'Clean cuts. Raw energy. Built for the streets.',
  keywords: 'streetwear, dekkry, fashion, clothing, premium',
  openGraph: {
    title: 'DEKKRY',
    description: 'Clean cuts. Raw energy.',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="bg-brand-black text-brand-white min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
