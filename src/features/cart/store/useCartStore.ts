import { create } from "zustand";
import { persist } from "zustand/middleware";
import { BeatLicensePlan } from "@/features/beats/core/beat.license";

interface CartItem {
  productId: string;
  licenseId: BeatLicensePlan;
  name: string;
  price: number;
}

type CartStore = {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (productId: string) => void;
  clear: () => void;
  total: () => number;
  count: () => number;
};

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (item) =>
        set((state) => ({
          items: [
            ...state.items.filter((i) => i.productId !== item.productId),
            item,
          ],
        })),
      removeItem: (productId) =>
        set((state) => ({
          items: state.items.filter((i) => i.productId !== productId),
        })),
      clear: () => set({ items: [] }),
      total: () => get().items.reduce((sum, i) => sum + i.licenseId.price, 0),
      count: () => get().items.length,
    }),
    { name: "ibratt-cart", partialize: (state) => ({ items: state.items }) },
  ),
);
