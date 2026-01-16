// components/AdminSidebar.tsx
import Link from 'next/link';
import {LayoutDashboard, Users, NewspaperIcon, LogOut, CameraIcon} from 'lucide-react';

const navItems = [
    { name: 'Dashboard', href: 'dashboard', icon: LayoutDashboard },
    { name: 'Image upload', href: 'image', icon: CameraIcon },
    {name: 'Blog Creaton ', href: 'blog-creaton', icon: NewspaperIcon },
    {name: 'View Venues', href: 'venues', icon: NewspaperIcon },
    { name: 'View Users', href: 'user-viewer', icon: Users },

];

export default function AdminSidebar() {
    return (
        <aside className="fixed inset-y-0 left-0 w-64 bg-slate-900 text-white flex flex-col border-r border-slate-800 z-50">
            <div className="p-6 text-2xl font-bold border-b border-slate-800 shrink-0">
                AdminPanel
            </div>

            {/* Scrollable area for nav items */}
            <nav className="flex-1 p-4 space-y-2 overflow-y-auto custom-scrollbar">
                {navItems.map((item) => (
                    <Link
                        key={item.name}
                        href={item.href}
                        className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-800 transition-colors group"
                    >
                        <item.icon size={20} className="text-slate-400 group-hover:text-white" />
                        <span className="font-medium">{item.name}</span>
                    </Link>
                ))}
            </nav>

            <div className="p-4 border-t border-slate-800 shrink-0">
                <button className="flex items-center gap-3 px-4 py-3 w-full text-red-400 hover:bg-red-950/30 rounded-lg transition-colors">
                    <LogOut size={20} />
                    <span>Logout</span>
                </button>
            </div>
        </aside>
    );
}