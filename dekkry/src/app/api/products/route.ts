import { NextResponse } from 'next/server';
import { getAllProducts } from '@/lib/products-db';

export async function GET() {
  return NextResponse.json(getAllProducts());
}
