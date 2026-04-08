import { NextRequest, NextResponse } from 'next/server';
import { saveProduct, getAllProducts } from '@/lib/products-db';
import { Product } from '@/types';
import { generateId } from '@/lib/utils';

export async function GET() {
  return NextResponse.json(getAllProducts());
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const product: Product = {
      id: body.id || generateId(),
      name: body.name,
      description: body.description || '',
      price: parseFloat(body.price) || 0,
      images: body.images || [],
      sizes: body.sizes || ['S', 'M', 'L', 'XL'],
      variants: body.colors
        ? body.colors.map((color: string) => ({
            color,
            sizes: body.sizes || ['S', 'M', 'L', 'XL'],
            images: body.images?.slice(0, 1) || [],
          }))
        : body.variants || [],
      sourceUrl: body.sourceUrl || '',
      category: body.category || 'uncategorized',
      featured: body.featured || false,
      createdAt: new Date().toISOString(),
    };

    saveProduct(product);
    return NextResponse.json({ success: true, product });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Failed to save product';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
