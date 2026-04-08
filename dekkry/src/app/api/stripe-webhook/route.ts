import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { saveOrder } from '@/lib/orders-db';
import { Order, OrderItem } from '@/types';
import { generateId } from '@/lib/utils';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
});

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  const body = await req.text();
  const sig = req.headers.get('stripe-signature')!;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    console.error('Webhook signature verification failed:', message);
    return NextResponse.json({ error: `Webhook Error: ${message}` }, { status: 400 });
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;

    try {
      const shipping = session.shipping_details;
      const customer = session.customer_details;

      const rawItems = session.metadata?.items ? JSON.parse(session.metadata.items) : [];

      const orderItems: OrderItem[] = rawItems.map((i: {
        productId: string;
        productName: string;
        size: string;
        color: string;
        quantity: number;
        price: number;
        sourceUrl: string;
      }) => ({
        productId: i.productId,
        productName: i.productName,
        size: i.size,
        color: i.color,
        quantity: i.quantity,
        price: i.price,
        sourceUrl: i.sourceUrl,
      }));

      const order: Order = {
        id: generateId(),
        customerName: customer?.name || 'Unknown',
        email: customer?.email || '',
        phone: customer?.phone || undefined,
        shippingAddress: {
          line1: shipping?.address?.line1 || '',
          line2: shipping?.address?.line2 || undefined,
          city: shipping?.address?.city || '',
          state: shipping?.address?.state || '',
          postalCode: shipping?.address?.postal_code || '',
          country: shipping?.address?.country || '',
        },
        items: orderItems,
        status: 'pending',
        stripeSessionId: session.id,
        totalAmount: (session.amount_total || 0) / 100,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      saveOrder(order);
      console.log('Order saved:', order.id);

      // Forward to Superagent automation
      const superagentWebhookUrl = process.env.SUPERAGENT_WEBHOOK_URL;
      if (superagentWebhookUrl) {
        for (const item of orderItems) {
          const payload = {
            orderId: order.id,
            customerName: order.customerName,
            email: order.email,
            phone: order.phone,
            shippingAddress: order.shippingAddress,
            productSourceUrl: item.sourceUrl,
            productName: item.productName,
            size: item.size,
            color: item.color,
            quantity: item.quantity,
            price: item.price,
          };

          try {
            await fetch(superagentWebhookUrl, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(payload),
            });
            console.log('Forwarded to Superagent:', item.productName);
          } catch (fwdErr) {
            console.error('Failed to forward to Superagent:', fwdErr);
          }
        }
      }
    } catch (err) {
      console.error('Error processing order:', err);
      return NextResponse.json({ error: 'Order processing failed' }, { status: 500 });
    }
  }

  return NextResponse.json({ received: true });
}
