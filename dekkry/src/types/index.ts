export interface ProductVariant {
  color: string;
  colorHex?: string;
  sizes: string[];
  images: string[];
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  sizes: string[];
  variants: ProductVariant[];
  sourceUrl: string;
  category?: string;
  featured?: boolean;
  createdAt: string;
}

export interface CartItem {
  productId: string;
  productName: string;
  productImage: string;
  price: number;
  size: string;
  color: string;
  quantity: number;
  sourceUrl: string;
}

export interface Order {
  id: string;
  customerName: string;
  email: string;
  phone?: string;
  shippingAddress: {
    line1: string;
    line2?: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  items: OrderItem[];
  status: 'pending' | 'processing' | 'fulfilled' | 'shipped' | 'cancelled';
  stripeSessionId: string;
  totalAmount: number;
  trackingNumber?: string;
  createdAt: string;
  updatedAt: string;
}

export interface OrderItem {
  productId: string;
  productName: string;
  size: string;
  color: string;
  quantity: number;
  price: number;
  sourceUrl: string;
}
