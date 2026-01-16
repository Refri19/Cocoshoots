// app/(admin)/layout.tsx
'use client'; // Change to client component to use session hooks

import AdminSidebar from "@/app/ui/adminsidebar";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
        // If the middleware didn't catch them, this client-side check will
        if (status === "unauthenticated") {
            router.push("/login");
        }
    }, [status, router]);

    // Show a loading state while checking the session
    if (status === "loading") {
        return (
            <div className="flex h-screen items-center justify-center ">
                <p className="text-slate-500 font-medium">Verifying Session...</p>
            </div>
        );
    }

    // Only render the sidebar and content if authenticated
    if (!session) return null;

    return (
        <div className="min-h-screen ">
            <AdminSidebar />

            <div className="pl-64 flex flex-col min-h-screen">
                <header className="sticky top-0 z-40 h-16 bg-white/80 backdrop-blur-md border-b border-slate-200 flex items-center justify-between px-8">
                    <h2 className="text-sm font-semibold text-slate-700 uppercase tracking-wider">
                        System Overview
                    </h2>
                    <div className="h-8 w-8 rounded-full border border-slate-300" />
                </header>

                <main className="p-8 flex-1">
                    <div className="max-w-7xl mx-auto">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}