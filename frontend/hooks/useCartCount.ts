import { create } from "zustand";

interface CartItem {
  id: string;
  name: string;
  quantity: number;
}

interface CartStore {
  cartCount: number;
  items: CartItem[];
  setCartCount: (count: number) => void;
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  fetchCartCount: () => Promise<void>;
  clearCart: () => void;
}

const useCartCount = create<CartStore>((set, get) => ({
  cartCount: 0,
  items: [],

  setCartCount: (count) => set({ cartCount: count }),

  addToCart: (item) => {
    const existing = get().items.find((i) => i.id === item.id);
    let newItems;
    if (existing) {
      newItems = get().items.map((i) =>
        i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
      );
    } else {
      newItems = [...get().items, item];
    }

    set({
      items: newItems,
      cartCount: newItems.reduce((sum, i) => sum + i.quantity, 0),
    });
  },

  removeFromCart: (id) => {
    const newItems = get().items.filter((i) => i.id !== id);
    set({
      items: newItems,
      cartCount: newItems.reduce((sum, i) => sum + i.quantity, 0),
    });
  },

  clearCart: () => set({ items: [], cartCount: 0 }),

  fetchCartCount: async () => {
    try {
      const res = await fetch("http://localhost:5000/api/carts");
      const data = await res.json();
      const count = data?.items?.reduce(
        (sum: number, item: any) => sum + item.quantity,
        0
      );
      set({
        cartCount: count || 0,
        items: data.items || [],
      });
    } catch (error) {
      console.error("Lỗi fetchCartCount:", error);
    }
  },
}));

export default useCartCount;
