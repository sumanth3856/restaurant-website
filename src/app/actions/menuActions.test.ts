
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { upsertMenuItem, deleteMenuItem } from './menuActions';
import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

vi.mock('@/lib/supabase/server', () => ({
    createClient: vi.fn(),
}));

vi.mock('next/cache', () => ({
    revalidatePath: vi.fn(),
}));

describe('menuActions', () => {
    const mockSupabase = {
        from: vi.fn(),
        storage: {
            from: vi.fn(),
        },
    };

    beforeEach(() => {
        vi.clearAllMocks();
        vi.mocked(createClient).mockResolvedValue(mockSupabase as any);
    });

    describe('upsertMenuItem', () => {
        it('inserts a new item when no id is provided', async () => {
            mockSupabase.from.mockReturnValue({
                insert: vi.fn().mockResolvedValue({ error: null }),
            });

            await upsertMenuItem({ name: 'New Item' });

            expect(mockSupabase.from).toHaveBeenCalledWith('menu_items');
            expect(revalidatePath).toHaveBeenCalled();
        });

        it('updates an item when id is provided', async () => {
            mockSupabase.from.mockReturnValue({
                update: vi.fn().mockReturnValue({
                    eq: vi.fn().mockResolvedValue({ error: null }),
                }),
            });

            await upsertMenuItem({ name: 'Updated Item' }, 123);

            expect(mockSupabase.from).toHaveBeenCalledWith('menu_items');
            expect(revalidatePath).toHaveBeenCalled();
        });

        it('throws error on database failure', async () => {
            mockSupabase.from.mockReturnValue({
                insert: vi.fn().mockResolvedValue({ error: { message: 'DB Error' } }),
            });

            await expect(upsertMenuItem({ name: 'Fail' })).rejects.toThrow('Failed to save menu item');
        });
    });

    describe('deleteMenuItem', () => {
        it('deletes item and image', async () => {
            const removeMock = vi.fn().mockResolvedValue({ error: null });
            mockSupabase.storage.from.mockReturnValue({ remove: removeMock });
            mockSupabase.from.mockReturnValue({
                delete: vi.fn().mockReturnValue({
                    eq: vi.fn().mockResolvedValue({ error: null }),
                }),
            });

            await deleteMenuItem(123, 'http://supa.co/img.jpg');

            expect(mockSupabase.storage.from).toHaveBeenCalledWith('menu-images');
            expect(removeMock).toHaveBeenCalledWith(['img.jpg']);
            expect(mockSupabase.from).toHaveBeenCalledWith('menu_items');
            expect(revalidatePath).toHaveBeenCalled();
        });

        it('deletes item without image', async () => {
            mockSupabase.from.mockReturnValue({
                delete: vi.fn().mockReturnValue({
                    eq: vi.fn().mockResolvedValue({ error: null }),
                }),
            });

            await deleteMenuItem(123);

            expect(mockSupabase.storage.from).not.toHaveBeenCalled();
            expect(mockSupabase.from).toHaveBeenCalledWith('menu_items');
        });

        it('throws error on db delete failure', async () => {
            mockSupabase.from.mockReturnValue({
                delete: vi.fn().mockReturnValue({
                    eq: vi.fn().mockResolvedValue({ error: { message: 'Fail' } }),
                }),
            });

            await expect(deleteMenuItem(123)).rejects.toThrow('Failed to delete menu item');
        });
    });
});
