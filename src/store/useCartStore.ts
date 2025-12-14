import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export interface CartItem {
    id: number;
    name: string;
    price: number;
    image?: string;
    quantity: number;
}

interface CartState {
    items: CartItem[];
    isOpen: boolean; // Controls Drawer visibility
    addItem: (item: Omit<CartItem, 'quantity'>) => void;
    removeItem: (id: number) => void;
    updateQuantity: (id: number, delta: number) => void;
    clearCart: () => void;
    toggleCart: () => void;
    setCartOpen: (open: boolean) => void;
    getCartTotal: () => number;
    getCartCount: () => number;
}

export const useCartStore = create<CartState>()(
    persist(
        (set, get) => ({
            items: [],
            isOpen: false,

            addItem: (newItem) => {
                const currentItems = get().items;
                const existingItem = currentItems.find((Item) => Item.id === newItem.id);

                if (existingItem) {
                    set({
                        items: currentItems.map((item) =>
                            item.id === newItem.id
                                ? { ...item, quantity: item.quantity + 1 }
                                : item
                        ),
                        // isOpen: true, // Removed auto-open
                    });
                } else {
                    set({
                        items: [...currentItems, { ...newItem, quantity: 1 }],
                        // isOpen: true, // Removed auto-open
                    });
                }
            },

            removeItem: (id) => {
                set({
                    items: get().items.filter((item) => item.id !== id),
                });
            },

            updateQuantity: (id, delta) => {
                const currentItems = get().items;
                const newItems = currentItems.map((item) => {
                    if (item.id === id) {
                        const newQuantity = Math.max(0, item.quantity + delta);
                        return { ...item, quantity: newQuantity };
                    }
                    return item;
                }).filter((item) => item.quantity > 0); // Remove if 0

                set({ items: newItems });
            },

            clearCart: () => set({ items: [] }),

            toggleCart: () => set({ isOpen: !get().isOpen }),
            setCartOpen: (open) => set({ isOpen: open }),

            getCartTotal: () => {
                return get().items.reduce((total, item) => total + item.price * item.quantity, 0);
            },

            getCartCount: () => {
                return get().items.reduce((count, item) => count + item.quantity, 0);
            },
        }),
        {
            name: 'maison-cart-storage',
            storage: createJSONStorage(() => localStorage),
            skipHydration: true, // We will hydrate manually if needed, or let Next.js handle it to prevent mismatch
        }
    )
);
