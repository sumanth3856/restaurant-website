'use server'

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function upsertMenuItem(data: any, id?: string) {
    const supabase = await createClient();

    let error;
    if (id) {
        // Update
        const response = await supabase
            .from('menu_items')
            .update(data)
            .eq('id', id);
        error = response.error;
    } else {
        // Create
        const response = await supabase
            .from('menu_items')
            .insert([data]);
        error = response.error;
    }

    if (error) {
        console.error("Database Error:", error);
        throw new Error('Failed to save menu item');
    }

    // Revalidate Admin and Public Menu pages
    revalidatePath('/admin/menu');
    revalidatePath('/admin');
    revalidatePath('/menu');
    revalidatePath('/'); // For landing page featured items
}

export async function deleteMenuItem(id: string, imageUrl?: string) {
    const supabase = await createClient();

    // 1. Delete Image if exists
    if (imageUrl) {
        const fileName = imageUrl.split('/').pop();
        if (fileName) {
            await supabase.storage.from('menu-images').remove([fileName]);
        }
    }

    // 2. Delete DB Record
    const { error } = await supabase
        .from('menu_items')
        .delete()
        .eq('id', id);

    if (error) {
        throw new Error('Failed to delete menu item');
    }

    // 3. Revalidate
    revalidatePath('/admin/menu');
    revalidatePath('/admin');
    revalidatePath('/menu');
    revalidatePath('/');
}
