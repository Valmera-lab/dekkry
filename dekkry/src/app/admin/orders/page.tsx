'use client';
import { useEffect, useState } from 'react';
import { Order } from '@/types';
import { formatPrice } from '@/lib/utils';
import { RefreshCw } from 'lucide-react';

const STATUS_COLORS: Record<string, string> = {
  pending: 'bg-yellow-500/20 text-yellow-400',
  processing: 'bg-blue-500/20 text-blue-400',
  fulfilled: 'bg-purple-500/20 text-purple-400',
  shipped: 'bg-green-500/20 text-green-400',
  cancelled: 'bg-red-500/20 text-red-400',
};

const STATUSES = ['pending', 'processing', 'fulfilled', 'shipped', 'cancelled'];

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState<string | null>(null);

  async function loadOrders() {
    setLoading(true);
    const res = await fetch('/api/admin/orders');
    const data = await res.json();
    setOrders(data);
    setLoading(false);
  }

  useEffect(() => { loadOrders(); }, []);

  async function updateStatus(orderId: string, status: string, trackingNumber?: string) {
    setUpdating(orderId);
    await fetch(`/api/admin/orders/${orderId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status, trackingNumber }),
    });
    await loadOrders();
    setUpdating(null);
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-black tracking-tight mb-1">Orders</h1>
          <p className="text-brand-gray-500 text-sm">{orders.length} total orders</p>
        </div>
        <button onClick={loadOrders} className="flex items-center gap-2 text-xs text-brand-gray-400 hover:text-brand-white">
          <RefreshCw size={14} /> Refresh
        </button>
      </div>

      {loading ? (
        <div className="text-brand-gray-500 text-sm">Loading orders...</div>
      ) : orders.length === 0 ? (
        <div className="text-center py-20 text-brand-gray-600">No orders yet.</div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order.id} className="bg-brand-gray-900 border border-brand-gray-800 p-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <span className="font-black text-sm tracking-wider">#{order.id.toUpperCase().slice(0, 8)}</span>
                    <span className={`text-xs font-semibold tracking-wider uppercase px-2 py-0.5 rounded ${STATUS_COLORS[order.status]}`}>
                      {order.status}
                    </span>
                  </div>
                  <p className="text-sm text-brand-gray-400">{order.customerName} · {order.email}</p>
                  <p className="text-xs text-brand-gray-600 mt-0.5">
                    {new Date(order.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-lg font-bold">{formatPrice(order.totalAmount)}</span>
                  <select
                    value={order.status}
                    disabled={updating === order.id}
                    onChange={(e) => updateStatus(order.id, e.target.value)}
                    className="bg-brand-gray-800 border border-brand-gray-700 text-brand-white text-xs px-3 py-2 focus:outline-none"
                  >
                    {STATUSES.map((s) => (
                      <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Items */}
              <div className="border-t border-brand-gray-800 pt-4 space-y-2">
                {order.items.map((item, i) => (
                  <div key={i} className="flex items-center justify-between text-sm">
                    <div>
                      <span className="font-semibold">{item.productName}</span>
                      <span className="text-brand-gray-500 ml-2">— {item.color} / {item.size} × {item.quantity}</span>
                    </div>
                    <span className="text-brand-gray-400">{formatPrice(item.price * item.quantity)}</span>
                  </div>
                ))}
              </div>

              {/* Shipping */}
              <div className="border-t border-brand-gray-800 pt-3 mt-3 text-xs text-brand-gray-500">
                <span className="font-semibold text-brand-gray-400">Ship to: </span>
                {order.shippingAddress.line1}, {order.shippingAddress.city}, {order.shippingAddress.postalCode}, {order.shippingAddress.country}
              </div>

              {/* Tracking */}
              <div className="mt-3 flex items-center gap-2">
                <input
                  placeholder="Add tracking number..."
                  defaultValue={order.trackingNumber || ''}
                  className="bg-brand-gray-800 border border-brand-gray-700 text-brand-white text-xs px-3 py-2 focus:outline-none flex-1 max-w-xs"
                  onBlur={(e) => {
                    if (e.target.value !== (order.trackingNumber || '')) {
                      updateStatus(order.id, order.status, e.target.value);
                    }
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
