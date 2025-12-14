import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import BookingsTable from './BookingsTable';
import * as bookingActions from '@/app/actions/bookingActions';
import { useRouter } from 'next/navigation';

// Mock dependencies
vi.mock('@/lib/supabase/client', () => ({
    createClient: () => ({
        // We don't need to mock supabase calls if the component only uses it for initial state or we mock the actions?
        // The component uses createClient but seemingly doesn't use it for the updates, it uses server actions.
        // It uses it for... wait, looking at BookingsTable.tsx: line 29 `const supabase = createClient();`
        // But it *doesn't seem to use* `supabase` variable anywhere in the updated component!
        // It uses `updateBookingStatus` from actions.
    }),
}));

vi.mock('next/navigation', () => ({
    useRouter: vi.fn(),
}));

// Mock the server action
vi.mock('@/app/actions/bookingActions', () => ({
    updateBookingStatus: vi.fn(),
}));

describe('BookingsTable', () => {
    const mockBookings = [
        {
            id: '1',
            created_at: '2024-03-20T10:00:00Z',
            date: '2024-03-25',
            time: '19:00',
            party_size: 4,
            name: 'Alice',
            email: 'alice@example.com',
            phone: '123-456-7890',
            status: 'pending' as const,
            requests: 'Vegetarian',
        },
        {
            id: '2',
            created_at: '2024-03-21T11:00:00Z',
            date: '2024-03-26',
            time: '20:00',
            party_size: 2,
            name: 'Bob',
            email: 'bob@example.com',
            phone: '098-765-4321',
            status: 'confirmed' as const,
        },
        {
            id: '3',
            created_at: '2024-03-22T12:00:00Z',
            date: '2024-03-27',
            time: '18:00',
            party_size: 6,
            name: 'Charlie',
            email: 'charlie@example.com',
            phone: '111-222-3333',
            status: 'cancelled' as const,
        }
    ];

    const mockRouter = { refresh: vi.fn() };

    beforeEach(() => {
        vi.clearAllMocks();
        vi.mocked(useRouter).mockReturnValue(mockRouter as any);
    });

    it('renders empty state when no bookings match filter', () => {
        render(<BookingsTable initialBookings={[]} />);
        expect(screen.getByText('No bookings found')).toBeInTheDocument();
    });

    it('filters bookings by status', () => {
        render(<BookingsTable initialBookings={mockBookings} />);

        // Default shows all
        expect(screen.getByText('Alice')).toBeInTheDocument();
        expect(screen.getByText('Bob')).toBeInTheDocument();
        expect(screen.getByText('Charlie')).toBeInTheDocument();

        // Filter by Pending
        fireEvent.click(screen.getByText('pending'));
        expect(screen.getByText('Alice')).toBeInTheDocument();
        expect(screen.queryByText('Bob')).not.toBeInTheDocument();

        // Filter by Confirmed
        fireEvent.click(screen.getByText('confirmed'));
        expect(screen.queryByText('Alice')).not.toBeInTheDocument();
        expect(screen.getByText('Bob')).toBeInTheDocument();
    });

    it('cancels a pending booking', async () => {
        render(<BookingsTable initialBookings={mockBookings} />);
        const cancelBtn = screen.getAllByTitle('Cancel')[0]; // Alice is first
        fireEvent.click(cancelBtn);

        await waitFor(() => {
            expect(bookingActions.updateBookingStatus).toHaveBeenCalledWith(1, 'cancelled');
            expect(mockRouter.refresh).toHaveBeenCalled();
        });
    });

    it('confirms a pending booking', async () => {
        render(<BookingsTable initialBookings={mockBookings} />);
        const confirmBtn = screen.getAllByTitle('Confirm')[0];
        fireEvent.click(confirmBtn);

        await waitFor(() => {
            expect(bookingActions.updateBookingStatus).toHaveBeenCalledWith(1, 'confirmed');
        });
    });

    it('handles non-pending interactions (options menu)', async () => {
        render(<BookingsTable initialBookings={mockBookings} />);

        // Filter to confirmed to find Bob easier
        fireEvent.click(screen.getByText('confirmed'));
        const optionsBtn = screen.getByTitle('Options');

        // Open menu
        fireEvent.click(optionsBtn);
        expect(screen.getByText('Mark as Pending')).toBeInTheDocument();
        expect(screen.getByText('Go Back')).toBeInTheDocument();

        // Click Go Back -> Closes menu
        fireEvent.click(screen.getByText('Go Back'));
        expect(screen.queryByText('Mark as Pending')).not.toBeInTheDocument();

        // Open again and Mark as Pending
        fireEvent.click(optionsBtn);
        fireEvent.click(screen.getByText('Mark as Pending'));

        await waitFor(() => {
            expect(bookingActions.updateBookingStatus).toHaveBeenCalledWith(2, 'pending');
        });
    });

    it('handles error during status update', async () => {
        // Mock error
        const errorMock = vi.spyOn(bookingActions, 'updateBookingStatus').mockRejectedValueOnce(new Error('Update failed'));
        const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => { });
        const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => { });

        render(<BookingsTable initialBookings={mockBookings} />);
        const confirmBtn = screen.getAllByTitle('Confirm')[0];
        fireEvent.click(confirmBtn);

        await waitFor(() => {
            expect(consoleSpy).toHaveBeenCalledWith('Error updating status:', expect.any(Error));
            expect(alertSpy).toHaveBeenCalledWith('Failed to update status');
        });

        consoleSpy.mockRestore();
        alertSpy.mockRestore();
    });
});
