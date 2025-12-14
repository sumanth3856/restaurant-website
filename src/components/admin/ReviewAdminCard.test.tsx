
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { vi, describe, it, expect } from 'vitest';
import { ReviewAdminCard } from './ReviewAdminCard'; // Assuming export
import * as reviewActions from '@/app/actions/reviews';

vi.mock('@/app/actions/reviews', () => ({
    updateReviewStatus: vi.fn(),
    deleteReview: vi.fn(),
}));

// Mock confirm dialog
global.confirm = vi.fn(() => true);

describe('ReviewAdminCard', () => {
    const mockReview = {
        id: 1,
        name: 'John',
        rating: 5,
        comment: 'Good',
        status: 'pending' as const,
        created_at: new Date().toISOString(),
    };

    it('renders review details', () => {
        render(<ReviewAdminCard review={mockReview} />);
        expect(screen.getByText('John')).toBeInTheDocument();
        expect(screen.getByText(/Good/)).toBeInTheDocument();
        expect(screen.getByText('5')).toBeInTheDocument();
    });

    it('shows approve/reject buttons for pending reviews', () => {
        render(<ReviewAdminCard review={mockReview} />);
        expect(screen.getByText('Approve')).toBeInTheDocument();
        expect(screen.getByText('Reject')).toBeInTheDocument();
    });

    it('calls updateReviewStatus on Approve', async () => {
        render(<ReviewAdminCard review={mockReview} />);
        fireEvent.click(screen.getByText('Approve'));

        await waitFor(() => {
            expect(reviewActions.updateReviewStatus).toHaveBeenCalledWith(1, 'approved');
        });
    });

    it('calls updateReviewStatus on Reject', async () => {
        render(<ReviewAdminCard review={mockReview} />);
        fireEvent.click(screen.getByText('Reject'));

        await waitFor(() => {
            expect(reviewActions.updateReviewStatus).toHaveBeenCalledWith(1, 'rejected');
        });
    });

    it('shows delete button for processed reviews', () => {
        render(<ReviewAdminCard review={{ ...mockReview, status: 'approved' }} />);
        expect(screen.queryByText('Approve')).not.toBeInTheDocument();
        expect(screen.getByText('Delete')).toBeInTheDocument();
    });

    it('calls deleteReview on Delete', async () => {
        render(<ReviewAdminCard review={{ ...mockReview, status: 'approved' }} />);
        fireEvent.click(screen.getByText('Delete'));

        await waitFor(() => {
            expect(reviewActions.deleteReview).toHaveBeenCalledWith(1);
        });
    });
});
