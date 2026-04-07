'use client';

import { useState } from 'react';
import Sidebar from '@/components/layout/Sidebar';
import Navbar from '@/components/layout/Navbar';
import ProtectedRoute from '@/components/ProtectedRoute';

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <ProtectedRoute>
            <div className="min-h-screen bg-surface-50 dark:bg-surface-950">
                <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
                <Navbar onMenuClick={() => setSidebarOpen(true)} />

                <main className="lg:ml-[var(--sidebar-width)] pt-[var(--navbar-height)]">
                    <div className="p-4 lg:p-6 max-w-7xl mx-auto">
                        {children}
                    </div>
                </main>
            </div>
        </ProtectedRoute>
    );
}
