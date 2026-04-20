import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem('dekkry-cart');
    if (saved) setItems(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem('dekkry-cart', JSON.stringify(items));
  }, [items]);

  const addItem = (product, size, color) => {
    const key = `${product.id}-${size}-${color}`;
    setItems(prev => {
      const existing = prev.find(i => i.key === key);
      if (existing) {
        return prev.map(i => i.key === key ? { ...i, qty: i.qty + 1 } : i);
      }
      return [...prev, { key, product, size, color, qty: 1 }];
    });
  };

  const removeItem = (key) => setItems(prev => prev.filter(i => i.key !== key));

  const updateQty = (key, qty) => {
    if (qty <= 0) return removeItem(key);
    setItems(prev => prev.map(i => i.key === key ? { ...i, qty } : i));
  };

  const clearCart = () => setItems([]);

  const totalItems = items.reduce((s, i) => s + i.qty, 0);
  const subtotal = items.reduce((s, i) => s + i.product.price * i.qty, 0);

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, updateQty, clearCart, totalItems, subtotal }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
