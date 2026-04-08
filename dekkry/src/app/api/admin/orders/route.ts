import { NextResponse } from 'next/server';
import { getAllOrders } from '@/lib/orders-db';

export async function GET() {
  try {
    const orders = getAllOrders();
    // Sort by newest first
    orders.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    return NextResponse.json(orders);
  } catch {
    return NextResponse.json({ error: 'Failed to fetch orders' }, { status: 500 });
  }
}
