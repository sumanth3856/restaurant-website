
import { describe, it, expect, beforeEach } from 'vitest';
import { useCartStore } from './useCartStore';

describe('useCartStore', () => {
    beforeEach(() => {
        useCartStore.setState({ items: [], isOpen: false });
        localStorage.clear();
    });

    it('adds a new item to the cart', () => {
        const item = { id: 1, name: 'Pizza', price: 10 };
        useCartStore.getState().addItem(item);

        const { items } = useCartStore.getState();
        expect(items).toHaveLength(1);
        expect(items[0]).toEqual({ ...item, quantity: 1 });
    });

    it('increments quantity if item already exists', () => {
        const item = { id: 1, name: 'Pizza', price: 10 };
        useCartStore.getState().addItem(item);
        useCartStore.getState().addItem(item);

        const { items } = useCartStore.getState();
        expect(items).toHaveLength(1);
        expect(items[0].quantity).toBe(2);
    });

    it('removes an item from the cart', () => {
        const item = { id: 1, name: 'Pizza', price: 10 };
        useCartStore.getState().addItem(item);
        useCartStore.getState().removeItem(1);

        const { items } = useCartStore.getState();
        expect(items).toHaveLength(0);
    });

    it('updates item quantity', () => {
        const item = { id: 1, name: 'Pizza', price: 10 };
        useCartStore.getState().addItem(item); // qty 1

        useCartStore.getState().updateQuantity(1, 1); // qty 2
        expect(useCartStore.getState().items[0].quantity).toBe(2);

        useCartStore.getState().updateQuantity(1, -1); // qty 1
        expect(useCartStore.getState().items[0].quantity).toBe(1);
    });

    it('removes item if quantity becomes 0', () => {
        const item = { id: 1, name: 'Pizza', price: 10 };
        useCartStore.getState().addItem(item);
        useCartStore.getState().updateQuantity(1, -1);

        expect(useCartStore.getState().items).toHaveLength(0);
    });

    it('clears the cart', () => {
        useCartStore.getState().addItem({ id: 1, name: 'Pizza', price: 10 });
        useCartStore.getState().clearCart();

        expect(useCartStore.getState().items).toHaveLength(0);
    });

    it('toggles cart visibility', () => {
        expect(useCartStore.getState().isOpen).toBe(false);
        useCartStore.getState().toggleCart();
        expect(useCartStore.getState().isOpen).toBe(true);
    });

    it('sets cart visibility', () => {
        useCartStore.getState().setCartOpen(true);
        expect(useCartStore.getState().isOpen).toBe(true);
    });

    it('calculates cart total', () => {
        useCartStore.getState().addItem({ id: 1, name: 'Pizza', price: 10 });
        useCartStore.getState().addItem({ id: 2, name: 'Burger', price: 5 });
        useCartStore.getState().updateQuantity(1, 1); // 2 Pizza (20) + 1 Burger (5) = 25

        expect(useCartStore.getState().getCartTotal()).toBe(25);
    });

    it('calculates cart count', () => {
        useCartStore.getState().addItem({ id: 1, name: 'Pizza', price: 10 });
        useCartStore.getState().updateQuantity(1, 2); // 3 Pizza

        expect(useCartStore.getState().getCartCount()).toBe(3);
    });
});
