import { NextRequest, NextResponse } from 'next/server';
import { updateOrderStatus, getOrderById } from '@/lib/orders-db';

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { status, trackingNumber } = await req.json();
    const updated = updateOrderStatus(params.id, status, trackingNumber);
    if (!updated) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }
    return NextResponse.json(updated);
  } catch {
    return NextResponse.json({ error: 'Failed to update order' }, { status: 500 });
  }
}

export async function GET(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  const order = getOrderById(params.id);
  if (!order) {
    return NextResponse.json({ error: 'Order not found' }, { status: 404 });
  }
  return NextResponse.json(order);
}
