
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { submitReview, getApprovedReviews, updateReviewStatus, deleteReview } from './reviews';
import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

vi.mock('@/lib/supabase/server', () => ({
    createClient: vi.fn(),
}));

vi.mock('next/cache', () => ({
    revalidatePath: vi.fn(),
}));

// Mock Logger to avoid console spam
vi.mock('@/lib/logger', () => ({
    logger: {
        error: vi.fn(),
    }
}));

describe('reviewActions', () => {
    const mockSupabase = {
        from: vi.fn(),
    };

    beforeEach(() => {
        vi.clearAllMocks();
        vi.mocked(createClient).mockResolvedValue(mockSupabase as any);
    });

    describe('submitReview', () => {
        it('submits a valid review', async () => {
            const formData = new FormData();
            formData.append('name', 'John');
            formData.append('rating', '5');
            formData.append('comment', 'Great!');

            mockSupabase.from.mockReturnValue({
                insert: vi.fn().mockResolvedValue({ error: null }),
            });

            const result = await submitReview(formData);
            expect(result.success).toBe(true);
        });

        it('returns error if missing fields', async () => {
            const formData = new FormData();
            // Missing name/rating
            const result = await submitReview(formData);
            expect(result.success).toBe(false);
            expect(result.error).toBe('Name and rating are required');
        });

        it('handles db error', async () => {
            const formData = new FormData();
            formData.append('name', 'John');
            formData.append('rating', '5');

            mockSupabase.from.mockReturnValue({
                insert: vi.fn().mockResolvedValue({ error: { message: 'DB Error' } }),
            });

            const result = await submitReview(formData);
            expect(result.success).toBe(false);
            expect(result.error).toBe('Failed to submit review');
        });
    });

    describe('getApprovedReviews', () => {
        it('fetches approved reviews', async () => {
            const mockData = [{ id: 1, name: 'John' }];
            mockSupabase.from.mockReturnValue({
                select: vi.fn().mockReturnValue({
                    eq: vi.fn().mockReturnValue({
                        order: vi.fn().mockReturnValue({
                            limit: vi.fn().mockResolvedValue({ data: mockData, error: null })
                        })
                    })
                })
            });

            const data = await getApprovedReviews();
            expect(data).toHaveLength(1);
            expect(data[0].name).toBe('John');
        });

        it('returns empty array on error', async () => {
            mockSupabase.from.mockReturnValue({
                select: vi.fn().mockReturnValue({
                    eq: vi.fn().mockReturnValue({
                        order: vi.fn().mockReturnValue({
                            limit: vi.fn().mockResolvedValue({ data: null, error: { message: 'Fail' } })
                        })
                    })
                })
            });

            const data = await getApprovedReviews();
            expect(data).toEqual([]);
        });
    });

    describe('updateReviewStatus', () => {
        it('updates status', async () => {
            mockSupabase.from.mockReturnValue({
                update: vi.fn().mockReturnValue({
                    eq: vi.fn().mockResolvedValue({ error: null }),
                }),
            });

            const result = await updateReviewStatus(1, 'approved');
            expect(result.success).toBe(true);
            expect(revalidatePath).toHaveBeenCalled();
        });
    });

    describe('deleteReview', () => {
        it('deletes review', async () => {
            mockSupabase.from.mockReturnValue({
                delete: vi.fn().mockReturnValue({
                    eq: vi.fn().mockResolvedValue({ error: null }),
                }),
            });

            const result = await deleteReview(1);
            expect(result.success).toBe(true);
            expect(revalidatePath).toHaveBeenCalled();
        });
    });
});
