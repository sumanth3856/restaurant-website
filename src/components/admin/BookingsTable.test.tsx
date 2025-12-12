import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import BookingsTable from './BookingsTable';
import { describe, it, expect, vi, beforeEach } from 'vitest';

// Mock Supabase
const mocks = vi.hoisted(() => {
    const update = vi.fn();
    const eq = vi.fn(() => ({ error: null }));
    const from = vi.fn(() => ({
        update: update.mockReturnValue({ eq }),
    }));
    return {
        from,
        update,
        eq,
    };
});

vi.mock('@/lib/supabase/client', () => ({
    createClient: () => ({
        from: mocks.from,
    }),
}));

vi.mock('next/navigation', () => ({
    useRouter: () => ({
        refresh: vi.fn(),
    }),
}));

const mockBookings: any[] = [
    {
        id: '1',
        created_at: '2025-12-12T10:00:00Z',
        date: '2025-12-25',
        time: '19:00',
        party_size: 4,
        name: 'Alice Smith',
        email: 'alice@example.com',
        phone: '123-456-7890',
        status: 'pending',
    },
    {
        id: '2',
        created_at: '2025-12-12T11:00:00Z',
        date: '2025-12-26',
        time: '20:00',
        party_size: 2,
        name: 'Bob Jones',
        email: 'bob@example.com',
        phone: '098-765-4321',
        status: 'confirmed',
    },
];

describe('BookingsTable', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('renders bookings correctly', () => {
        render(<BookingsTable initialBookings={mockBookings} />);

        expect(screen.getByText('Alice Smith')).toBeInTheDocument();
        expect(screen.getByText('Bob Jones')).toBeInTheDocument();
        expect(screen.getByText('Pending')).toBeInTheDocument();
        expect(screen.getByText('Confirmed')).toBeInTheDocument();
    });

    it('filters bookings', () => {
        render(<BookingsTable initialBookings={mockBookings} />);

        // Filter by Pending
        fireEvent.click(screen.getByText('pending'));
        expect(screen.getByText('Alice Smith')).toBeInTheDocument();
        expect(screen.queryByText('Bob Jones')).not.toBeInTheDocument();

        // Filter by Confirmed
        fireEvent.click(screen.getByText('confirmed'));
        expect(screen.queryByText('Alice Smith')).not.toBeInTheDocument();
        expect(screen.getByText('Bob Jones')).toBeInTheDocument();
    });

    it('updates booking status', async () => {
        render(<BookingsTable initialBookings={mockBookings} />);

        // Find Confirm button for Alice (pending)
        const confirmBtns = screen.getAllByTitle('Confirm');
        fireEvent.click(confirmBtns[0]);

        await waitFor(() => {
            expect(mocks.from).toHaveBeenCalledWith('bookings');
            expect(mocks.update).toHaveBeenCalledWith({ status: 'confirmed' });
            expect(mocks.eq).toHaveBeenCalledWith('id', '1');
        });
    });
});
