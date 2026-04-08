import base44 from "base44-sdk";

export default async function receiveOrder(payload: Record<string, unknown>) {
  const {
    orderId, customerName, email, phone, shippingAddress,
    productSourceUrl, productName, size, color, quantity, price,
  } = payload as {
    orderId: string; customerName: string; email: string; phone?: string;
    shippingAddress: { line1: string; line2?: string; city: string; state: string; postalCode: string; country: string; };
    productSourceUrl: string; productName: string; size: string; color: string;
    quantity: number; price: number;
  };

  if (!orderId || !email || !productSourceUrl) {
    return new Response(JSON.stringify({ error: "Missing required fields" }), { status: 400, headers: { "Content-Type": "application/json" } });
  }

  try {
    const existing = await base44.asServiceRole.entities.Order.filter({ orderId, productSourceUrl });
    if (existing && existing.length > 0) {
      return new Response(JSON.stringify({ ok: true, skipped: true, id: existing[0].id }), { status: 200, headers: { "Content-Type": "application/json" } });
    }

    const record = await base44.asServiceRole.entities.Order.create({
      orderId, customerName, email,
      phone: phone || "",
      shippingLine1: shippingAddress?.line1 || "",
      shippingLine2: shippingAddress?.line2 || "",
      shippingCity: shippingAddress?.city || "",
      shippingState: shippingAddress?.state || "",
      shippingPostalCode: shippingAddress?.postalCode || "",
      shippingCountry: shippingAddress?.country || "",
      productSourceUrl, productName, size, color,
      quantity: Number(quantity) || 1,
      price: Number(price) || 0,
      totalLinePrice: (Number(quantity) || 1) * (Number(price) || 0),
      status: "pending",
      notes: "",
    });

    return new Response(JSON.stringify({ ok: true, id: record.id }), { status: 201, headers: { "Content-Type": "application/json" } });
  } catch (err) {
    return new Response(JSON.stringify({ error: "Internal error", detail: String(err) }), { status: 500, headers: { "Content-Type": "application/json" } });
  }
}
