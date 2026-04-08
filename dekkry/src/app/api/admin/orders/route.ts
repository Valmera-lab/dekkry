import { NextResponse } from 'next/server';
import { getAllOrders } from '@/lib/orders-db';

export async function GET() {
  try {
    const orders = getAllOrders();
    return NextResponse.json(orders.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()));
  } catch {
    return NextResponse.json({ error: 'Failed to load orders' }, { status: 500 });
  }
}
