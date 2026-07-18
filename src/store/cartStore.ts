import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product } from '@/data/products';

export interface CartItem {
  productId: string; // We'll use product slug as unique ID for now
  dbId?: number | string; // Database ID needed for order creation
  name: string;
  price: number; // Stored as a pure number for calculations
  quantity: number;
  image: string;
  category: string;
}

interface CartState {
  items: CartItem[];
  
  // Actions
  addItem: (product: Product, quantity: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  
  // Computed (these will be functions)
  getSubtotal: () => number;
  getTotalItems: () => number;
  getGrandTotal: (deliveryCharge?: number, discountAmount?: number) => number;
}

// Utility to parse string price like "₹499" to number 499
const parsePrice = (priceStr: string): number => {
  const numeric = priceStr.replace(/[^\d.]/g, '');
  return parseFloat(numeric) || 0;
};

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (product: Product, quantity: number) => {
        set((state) => {
          const existingItemIndex = state.items.findIndex(
            (item) => item.productId === product.slug
          );

          if (existingItemIndex >= 0) {
            // Update quantity of existing item
            const newItems = [...state.items];
            newItems[existingItemIndex].quantity += quantity;
            return { items: newItems };
          }

          // Add new item
          const newItem: CartItem = {
            productId: product.slug, // Using slug as ID for now
            dbId: product.id,
            name: product.name,
            price: parsePrice(product.price),
            quantity,
            image: product.img,
            category: product.category,
          };

          return { items: [...state.items, newItem] };
        });
      },

      removeItem: (productId: string) => {
        set((state) => ({
          items: state.items.filter((item) => item.productId !== productId),
        }));
      },

      updateQuantity: (productId: string, quantity: number) => {
        if (quantity < 1) return;
        
        set((state) => ({
          items: state.items.map((item) =>
            item.productId === productId ? { ...item, quantity } : item
          ),
        }));
      },

      clearCart: () => {
        set({ items: [] });
      },

      getSubtotal: () => {
        const { items } = get();
        return items.reduce((total, item) => total + item.price * item.quantity, 0);
      },

      getTotalItems: () => {
        const { items } = get();
        return items.reduce((total, item) => total + item.quantity, 0);
      },

      getGrandTotal: (deliveryCharge = 0, discountAmount = 0) => {
        const subtotal = get().getSubtotal();
        // Prevent negative total
        return Math.max(0, subtotal + deliveryCharge - discountAmount);
      },
    }),
    {
      name: 'al-hayat-cart-storage',
    }
  )
);
