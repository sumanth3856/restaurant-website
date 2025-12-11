export default function AdminSettings() {
    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-serif font-bold text-primary">Settings</h1>
                <p className="text-muted-foreground">Manage your restaurant preferences.</p>
            </div>

            <div className="bg-card max-w-2xl border border-border rounded-xl p-8 space-y-6">
                <div className="space-y-4">
                    <h2 className="text-xl font-bold">General Information</h2>

                    <div className="grid gap-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">Restaurant Name</label>
                            <input
                                type="text"
                                defaultValue="Maison Delish"
                                className="w-full p-2 rounded bg-secondary/30 border border-input"
                                readOnly
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">Contact Email</label>
                            <input
                                type="email"
                                defaultValue="info@maisondelish.com"
                                className="w-full p-2 rounded bg-secondary/30 border border-input"
                            />
                        </div>
                    </div>
                </div>

                <div className="h-px bg-border my-6" />

                <div className="space-y-4">
                    <h2 className="text-xl font-bold">Admin Credentials</h2>
                    <p className="text-sm text-muted-foreground">
                        To update your password, please contact the system administrator.
                    </p>
                    <button disabled className="px-4 py-2 bg-secondary text-muted-foreground rounded cursor-not-allowed">
                        Update Password
                    </button>
                </div>

                <div className="h-px bg-border my-6" />

                <div className="flex justify-end">
                    <button className="px-6 py-2 bg-primary text-primary-foreground font-bold rounded hover:bg-primary/90 transition-colors shadow-sm">
                        Save Changes
                    </button>
                </div>

            </div>
        </div>
    );
}
