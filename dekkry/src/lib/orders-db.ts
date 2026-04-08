import { Order } from '@/types';
import fs from 'fs';
import path from 'path';

const DB_PATH = path.join(process.cwd(), 'data', 'orders.json');

function ensureDb() {
  const dir = path.dirname(DB_PATH);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  if (!fs.existsSync(DB_PATH)) {
    fs.writeFileSync(DB_PATH, JSON.stringify([], null, 2));
  }
}

export function getAllOrders(): Order[] {
  ensureDb();
  const raw = fs.readFileSync(DB_PATH, 'utf-8');
  return JSON.parse(raw);
}

export function getOrderById(id: string): Order | null {
  const orders = getAllOrders();
  return orders.find((o) => o.id === id) || null;
}

export function getOrderByStripeSession(sessionId: string): Order | null {
  const orders = getAllOrders();
  return orders.find((o) => o.stripeSessionId === sessionId) || null;
}

export function saveOrder(order: Order): void {
  ensureDb();
  const orders = getAllOrders();
  const idx = orders.findIndex((o) => o.id === order.id);
  if (idx >= 0) {
    orders[idx] = order;
  } else {
    orders.push(order);
  }
  fs.writeFileSync(DB_PATH, JSON.stringify(orders, null, 2));
}

export function updateOrderStatus(
  id: string,
  status: Order['status'],
  trackingNumber?: string
): Order | null {
  const orders = getAllOrders();
  const idx = orders.findIndex((o) => o.id === id);
  if (idx < 0) return null;
  orders[idx].status = status;
  orders[idx].updatedAt = new Date().toISOString();
  if (trackingNumber) orders[idx].trackingNumber = trackingNumber;
  fs.writeFileSync(DB_PATH, JSON.stringify(orders, null, 2));
  return orders[idx];
}
