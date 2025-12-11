import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BookingForm } from './BookingForm';
import { describe, it, expect, vi, beforeEach } from 'vitest';

// Mock Supabase
const mocks = vi.hoisted(() => {
    const insert = vi.fn();
    const from = vi.fn(() => ({
        insert,
    }));
    return {
        insert,
        from,
    };
});

vi.mock('@/lib/supabase', () => ({
    supabase: {
        from: mocks.from,
    },
}));

describe('BookingForm Integration', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        // Default successful response
        mocks.insert.mockResolvedValue({ error: null });
    });

    it('submits the form successfully with valid data', async () => {
        render(<BookingForm />);

        // Fill out the form
        fireEvent.change(screen.getByLabelText(/Date/i), { target: { value: '2025-12-25' } });
        fireEvent.change(screen.getByLabelText(/Time/i), { target: { value: '19:00' } });
        fireEvent.change(screen.getByLabelText(/Guests/i), { target: { value: '4' } });
        fireEvent.change(screen.getByPlaceholderText(/John Doe/i), { target: { value: 'Jane Doe' } });
        fireEvent.change(screen.getByPlaceholderText(/john@example.com/i), { target: { value: 'jane@example.com' } });
        fireEvent.change(screen.getByPlaceholderText(/\(555\) 000-0000/i), { target: { value: '1234567890' } });

        // Submit
        const submitBtn = screen.getByRole('button', { name: /Confirm Reservation/i });
        fireEvent.click(submitBtn);

        // Expect Supabase to be called
        await waitFor(() => {
            expect(mocks.from).toHaveBeenCalledWith('bookings');
            expect(mocks.insert).toHaveBeenCalledWith([
                expect.objectContaining({
                    name: 'Jane Doe',
                    email: 'jane@example.com',
                    party_size: 4,
                }),
            ]);
        });

        // Expect Success Message
        expect(await screen.findByText(/Booking Confirmed!/i)).toBeInTheDocument();
    });

    it('displays error messages for invalid inputs', async () => {
        render(<BookingForm />);

        // Submit empty form
        const submitBtn = screen.getByRole('button', { name: /Confirm Reservation/i });
        fireEvent.click(submitBtn);

        // Validation errors should appear
        expect(await screen.findByText(/Date is required/i)).toBeInTheDocument();
        expect(await screen.findByText(/Time is required/i)).toBeInTheDocument();
        expect(await screen.findByText(/Name is required/i)).toBeInTheDocument();

        // Supabase should NOT be called
        expect(mocks.insert).not.toHaveBeenCalled();
    });
});
