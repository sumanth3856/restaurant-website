import { render, screen, fireEvent, waitFor } from '@testing-library/react';

import { vi, describe, it, expect, beforeEach } from 'vitest';
import { BookingForm } from './BookingForm';
import { supabase } from '@/lib/supabase';
import * as emailActions from '@/app/actions/sendEmail';
import { toast } from 'sonner';
import { logger } from '@/lib/logger';

// Mock dependencies
vi.mock('@/lib/supabase', () => ({
    supabase: {
        from: vi.fn(() => ({
            insert: vi.fn().mockResolvedValue({ error: null })
        }))
    }
}));

vi.mock('@/app/actions/sendEmail', () => ({
    sendBookingConfirmationEmail: vi.fn(),
}));

vi.mock('sonner', () => ({
    toast: {
        error: vi.fn(),
        success: vi.fn(),
    }
}));

// Mock logger
vi.mock('@/lib/logger', () => ({
    logger: {
        error: vi.fn(),
    }
}));

describe('BookingForm', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        // Reset supabase mock
        vi.mocked(supabase.from).mockReturnValue({
            insert: vi.fn().mockResolvedValue({ error: null })
        } as any);
        vi.mocked(emailActions.sendBookingConfirmationEmail).mockResolvedValue({ success: true, data: { id: 'mock-id' } as any });
    });

    it('submits the form successfully with valid data', async () => {
        render(<BookingForm />);

        // Fill form
        fireEvent.change(screen.getByLabelText(/Date/i), { target: { value: '2024-12-25' } });
        fireEvent.change(screen.getByLabelText(/Time/i), { target: { value: '19:00' } });
        fireEvent.change(screen.getByLabelText(/Guests/i), { target: { value: '4' } });
        fireEvent.change(screen.getByLabelText(/Full Name/i), { target: { value: 'John Doe' } });
        fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'john@example.com' } });
        fireEvent.change(screen.getByLabelText(/Phone/i), { target: { value: '1234567890' } });

        fireEvent.submit(screen.getByRole('button', { name: /Confirm Reservation/i }));

        await waitFor(() => {
            expect(screen.getByText('Booking Confirmed!')).toBeInTheDocument();
        });

        // Click make another booking (reload)
        const reloadMock = vi.fn();
        Object.defineProperty(window, 'location', {
            configurable: true,
            writable: true,
            value: { reload: reloadMock }
        });

        fireEvent.click(screen.getByText('Make another booking'));
        expect(reloadMock).toHaveBeenCalled();
    });

    it('handles email failure but still shows success', async () => {
        // Mock email failure
        vi.mocked(emailActions.sendBookingConfirmationEmail).mockResolvedValue({
            success: false,
            error: 'SMTP Error'
        });

        render(<BookingForm />);

        // Fill form
        fireEvent.change(screen.getByLabelText(/Date/i), { target: { value: '2024-12-25' } });
        fireEvent.change(screen.getByLabelText(/Time/i), { target: { value: '19:00' } });
        fireEvent.change(screen.getByLabelText(/Guests/i), { target: { value: '2' } });
        fireEvent.change(screen.getByLabelText(/Full Name/i), { target: { value: 'Jane Doe' } });
        fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'jane@example.com' } });
        fireEvent.change(screen.getByLabelText(/Phone/i), { target: { value: '0987654321' } });

        fireEvent.submit(screen.getByRole('button', { name: /Confirm Reservation/i }));

        await waitFor(() => {
            // Still succeeds locally
            expect(screen.getByText('Booking Confirmed!')).toBeInTheDocument();
            // Logs error
            expect(logger.error).toHaveBeenCalledWith("Email failed but booking succeeded:", 'SMTP Error');
        });
    });

    it('handles database insertion error', async () => {
        // Mock supabase insert error
        vi.mocked(supabase.from).mockReturnValue({
            insert: vi.fn().mockResolvedValue({ error: { message: 'DB Error' } })
        } as any);

        render(<BookingForm />);

        // Fill form
        fireEvent.change(screen.getByLabelText(/Date/i), { target: { value: '2024-12-25' } });
        fireEvent.change(screen.getByLabelText(/Time/i), { target: { value: '19:00' } });
        fireEvent.change(screen.getByLabelText(/Guests/i), { target: { value: '2' } });
        fireEvent.change(screen.getByLabelText(/Full Name/i), { target: { value: 'Error User' } });
        fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'error@example.com' } });
        fireEvent.change(screen.getByLabelText(/Phone/i), { target: { value: '0000000000' } });

        fireEvent.submit(screen.getByRole('button', { name: /Confirm Reservation/i }));

        await waitFor(() => {
            expect(logger.error).toHaveBeenCalledWith("Booking error:", expect.anything());
            expect(toast.error).toHaveBeenCalledWith("Failed to create booking. Please try again.");
            expect(screen.queryByText('Booking Confirmed!')).not.toBeInTheDocument();
        });
    });
});
