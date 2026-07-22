import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product } from '@/data/products';

interface WishlistState {
  items: Product[];
  
  // Actions
  toggleWishlist: (product: Product) => void;
  removeItem: (productSlug: string) => void;
  hasItem: (productSlug: string) => boolean;
  clearWishlist: () => void;
}

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      items: [],

      toggleWishlist: (product: Product) => {
        set((state) => {
          const isItemInWishlist = state.items.some((item) => item.slug === product.slug);
          if (isItemInWishlist) {
            // Remove
            return { items: state.items.filter((item) => item.slug !== product.slug) };
          } else {
            // Add
            return { items: [...state.items, product] };
          }
        });
      },

      removeItem: (productSlug: string) => {
        set((state) => ({
          items: state.items.filter((item) => item.slug !== productSlug),
        }));
      },

      hasItem: (productSlug: string) => {
        const { items } = get();
        return items.some((item) => item.slug === productSlug);
      },

      clearWishlist: () => {
        set({ items: [] });
      },
    }),
    {
      name: 'al-hayat-wishlist-storage',
    }
  )
);
