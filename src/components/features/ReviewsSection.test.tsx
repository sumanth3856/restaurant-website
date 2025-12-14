
import { render, screen } from '@testing-library/react';
import { vi, describe, it, expect } from 'vitest';
import ReviewsSection from './ReviewsSection';
import * as reviewActions from '@/app/actions/reviews';

vi.mock('@/app/actions/reviews', () => ({
    getApprovedReviews: vi.fn(),
}));

vi.mock('@/components/ui/FadeIn', () => ({
    FadeIn: ({ children }: { children: React.ReactNode }) => <div>{children}</div>
}));

// Mock sub-components
vi.mock('./ReviewsList', () => ({
    ReviewsList: ({ reviews }: { reviews: any[] }) => (
        <div data-testid="reviews-list">Reviews: {reviews.length}</div>
    )
}));

vi.mock('./ReviewForm', () => ({
    ReviewForm: () => <div data-testid="review-form">Review Form</div>
}));

describe('ReviewsSection', () => {
    it('renders reviews list and form', async () => {
        const mockReviews = [{ id: 1, name: 'Alice', comment: 'Loved it' }];
        vi.mocked(reviewActions.getApprovedReviews).mockResolvedValue(mockReviews as any);

        const Result = await ReviewsSection();
        render(Result!);

        expect(screen.getByText('Guest')).toBeInTheDocument();
        expect(screen.getByTestId('reviews-list')).toHaveTextContent('Reviews: 1');
        expect(screen.getByTestId('review-form')).toBeInTheDocument();
    });
});
