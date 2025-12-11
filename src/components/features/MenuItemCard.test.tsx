import { render, screen } from '@testing-library/react';
import { MenuItemCard } from './MenuItemCard';
import { describe, it, expect } from 'vitest';

const mockItem = {
    id: '1',
    name: 'Test Dish',
    description: 'A delicious test dish',
    price: 15.99,
    category: 'Mains' as const,
    image: 'https://example.com/image.jpg',
    isAvailable: true,
    tags: ['Best Seller']
};

describe('MenuItemCard', () => {
    it('renders item details correctly', () => {
        render(<MenuItemCard item={mockItem} />);

        expect(screen.getByText('Test Dish')).toBeInTheDocument();
        expect(screen.getByText('A delicious test dish')).toBeInTheDocument();
        expect(screen.getByText('₹15.99')).toBeInTheDocument();
    });

    it('renders tags if present', () => {
        render(<MenuItemCard item={mockItem} />);
        expect(screen.getByText('Best Seller')).toBeInTheDocument();
    });

    it('renders image with correct src', () => {
        render(<MenuItemCard item={mockItem} />);
        const img = screen.getByRole('img');
        // The mock implementation passes src directly
        expect(img).toHaveAttribute('src', 'https://example.com/image.jpg');
    });
});
