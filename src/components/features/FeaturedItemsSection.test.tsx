
import { render, screen } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import FeaturedItemsSection from './FeaturedItemsSection';
import { createClient } from '@/lib/supabase/server';

// Mock Supabase
vi.mock('@/lib/supabase/server', () => ({
    createClient: vi.fn(),
}));

// Mock FadeIn to render children directly
vi.mock('@/components/ui/FadeIn', () => ({
    FadeIn: ({ children }: { children: React.ReactNode }) => <div>{children}</div>
}));

describe('FeaturedItemsSection', () => {
    const mockSupabase = {
        from: vi.fn(),
    };

    beforeEach(() => {
        vi.clearAllMocks();
        vi.mocked(createClient).mockResolvedValue(mockSupabase as any);
    });

    it('renders nothing if fetch fails', async () => {
        mockSupabase.from.mockReturnValue({
            select: vi.fn().mockReturnValue({
                limit: vi.fn().mockReturnValue({
                    order: vi.fn().mockResolvedValue({ data: null, error: { message: 'Fail' } })
                })
            })
        });

        const result = await FeaturedItemsSection();
        expect(result).toBeNull();
    });

    it('renders items when fetch succeeds', async () => {
        const mockItems = [
            { id: 1, name: 'Burger', price: 10, image: '/burger.jpg', category: 'Main' },
            { id: 2, name: 'Pizza', price: 12, image: '/pizza.jpg', category: 'Main' },
        ];

        mockSupabase.from.mockReturnValue({
            select: vi.fn().mockReturnValue({
                limit: vi.fn().mockReturnValue({
                    order: vi.fn().mockResolvedValue({ data: mockItems, error: null })
                })
            })
        });

        const Result = await FeaturedItemsSection();
        // Since Result is a Promise<JSX.Element>, resolving it gives the element.
        // We can render that element.
        render(Result!);

        expect(screen.getByText('Curated')).toBeInTheDocument();
        expect(screen.getByText('Burger')).toBeInTheDocument();
        expect(screen.getByText('Pizza')).toBeInTheDocument();
    });
});
