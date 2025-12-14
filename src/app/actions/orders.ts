"use server";

import { createClient } from "@/lib/supabase/server";

export interface OrderState {
    success?: boolean;
    error?: string;
    orderId?: string;
}

export async function submitOrder(
    prevState: OrderState,
    formData: FormData
): Promise<OrderState> {
    const supabase = await createClient();

    // 1. Extract Data
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;
    const address = formData.get("address") as string;
    const totalAmount = parseFloat(formData.get("totalAmount") as string);
    const itemsJson = formData.get("items") as string;

    // 2. Validate
    if (!name || !email || !phone || !address || !itemsJson) {
        return { error: "Missing required fields." };
    }

    try {
        const items = JSON.parse(itemsJson);
        if (!Array.isArray(items) || items.length === 0) {
            return { error: "Cart is empty." };
        }

        // 3. Insert into Supabase
        const { data, error } = await supabase
            .from("orders")
            .insert({
                customer_details: { name, email, phone, address },
                items: items,
                total_amount: totalAmount,
                status: "pending",
            })
            .select("id")
            .single();

        if (error) {
            console.error("Order Insert Error:", error);
            return { error: "Failed to place order. Please try again." };
        }

        return { success: true, orderId: String(data.id) };

    } catch (err) {
        console.error("Unexpected Error:", err);
        return { error: "An unexpected error occurred." };
    }
}
