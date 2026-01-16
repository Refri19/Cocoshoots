// app/(admin)/dashboard/page.tsx
import {
    Users,
    Image as ImageIcon,
    Newspaper,
    MapPin,
    ArrowUpRight,
    ArrowDownRight
} from 'lucide-react';

export default function AdminDashboard() {
    const stats = [
        { name: 'Total Users', value: '1,284', icon: Users, change: '+12%', positive: true },
        { name: 'Images Uploaded', value: '452', icon: ImageIcon, change: '+5%', positive: true },
        { name: 'Active Blogs', value: '86', icon: Newspaper, change: '-2%', positive: false },
        { name: 'Total Venues', value: '12', icon: MapPin, change: '0%', positive: true },
    ];

    return (
        <div className="space-y-8">
            {/* Page Title */}
            <div>
                <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
                <p >Welcome back! Here is what's happening today.</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat) => (
                    <div key={stat.name} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between mb-4">
                            <div className="p-2 bg-slate-100 rounded-lg text-slate-700">
                                <stat.icon size={24} />
                            </div>
                            <span className={`flex items-center text-sm font-medium ${stat.positive ? 'text-green-600' : 'text-red-600'}`}>
                {stat.change}
                                {stat.positive ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
              </span>
                        </div>
                        <h3 className="text-slate-500 text-sm font-medium">{stat.name}</h3>
                        <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
                    </div>
                ))}
            </div>

            {/* Recent Activity Section */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-slate-200">
                    <h3 className="text-lg font-semibold text-slate-900">Recent System Activity</h3>
                </div>
                <div className="divide-y divide-slate-100">
                    {[1, 2, 3, 4, 5].map((item) => (
                        <div key={item} className="p-6 flex items-center justify-between hover:bg-slate-50 transition-colors">
                            <div className="flex items-center gap-4">
                                <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                                    <Users size={20} />
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-slate-900">New user registration</p>
                                    <p className="text-xs text-slate-500">2 minutes ago</p>
                                </div>
                            </div>
                            <button className="text-sm font-medium text-blue-600 hover:text-blue-800">
                                View details
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}