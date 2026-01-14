export default function AdminPage() {
    return (
        <div className="min-h-screen bg-gray-100 flex">
            {/* Sidebar */}
            <aside className="w-64 bg-slate-800 text-white p-6">
                <h2 className="text-xl font-bold mb-8">Admin Panel</h2>
                <nav className="space-y-4">
                    <div className="text-gray-400 hover:text-white cursor-pointer">Dashboard</div>
                    <div className="text-gray-400 hover:text-white cursor-pointer">Users</div>
                    <div className="text-gray-400 hover:text-white cursor-pointer">Settings</div>
                </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-8">
                <header className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-semibold">Dashboard Overview</h1>
                    <button className="bg-red-500 text-white px-4 py-2 rounded">Logout</button>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <StatCard title="Total Users" value="1,240" />
                    <StatCard title="Revenue" value="$12,400" />
                    <StatCard title="Active Sessions" value="45" />
                </div>
            </main>
        </div>
    );
}

function StatCard({ title, value }: { title: string; value: string }) {
    return (
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <p className="text-sm text-gray-500 uppercase font-bold">{title}</p>
            <p className="text-2xl font-semibold mt-1">{value}</p>
        </div>
    );
}