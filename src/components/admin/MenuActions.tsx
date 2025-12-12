"use client";

import { useState } from "react";
import { Edit, Trash2, Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import Link from "next/link";
import { deleteMenuItem } from "@/app/actions/menuActions";

interface MenuActionsProps {
    id: string;
    imageUrl?: string;
}

export function MenuActions({ id, imageUrl }: MenuActionsProps) {
    const supabase = createClient();
    const router = useRouter();
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDelete = async () => {
        if (!confirm("Are you sure you want to delete this dish?")) return;

        setIsDeleting(true);
        try {
            await deleteMenuItem(id, imageUrl);
            // router.refresh() handled by revalidatePath, but useful for client-side feedback if needed immediately
        } catch (error) {
            console.error("Delete failed:", error);
            alert("Failed to delete item.");
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <div className="flex items-center gap-2">
            <Link
                href={`/admin/menu/edit/${id}`}
                className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                title="Edit"
            >
                <Edit className="w-5 h-5" />
            </Link>
            <button
                onClick={handleDelete}
                disabled={isDeleting}
                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
                title="Delete"
            >
                {isDeleting ? <Loader className="w-5 h-5 animate-spin" /> : <Trash2 className="w-5 h-5" />}
            </button>
        </div>
    );
}
