import MenuForm from "@/components/admin/MenuForm";

export default function AddMenuPage() {
    return (
        <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-serif font-bold text-primary mb-6">Add New Dish</h1>
            <div className="bg-card p-6 rounded-xl border border-border shadow-sm">
                <MenuForm />
            </div>
        </div>
    );
}
