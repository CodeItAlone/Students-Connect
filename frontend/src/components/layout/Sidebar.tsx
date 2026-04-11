'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    Home,
    Users,
    Calendar,
    Briefcase,
    GraduationCap,
    Trophy,
    Settings,
    LogOut,
    X,
} from 'lucide-react';
import { useAuthStore } from '@/stores/authStore';

interface SidebarProps {
    isOpen: boolean;
    onClose: () => void;
}

const navItems = [
    { href: '/dashboard', label: 'Discovery', icon: Home },
    { href: '/clubs', label: 'Clubs', icon: Users },
    { href: '/events', label: 'Events', icon: Calendar },
    { href: '/opportunities', label: 'Opportunities', icon: Briefcase },
    { href: '/mentors', label: 'Mentors', icon: GraduationCap },
    { href: '/leaderboard', label: 'Leaderboard', icon: Trophy },
];

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
    const pathname = usePathname();
    const { user, logout } = useAuthStore();

    const isActive = (href: string) => {
        if (href === '/') return pathname === '/';
        return pathname.startsWith(href);
    };

    return (
        <>
            {/* Mobile overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
                    onClick={onClose}
                />
            )}

            {/* Sidebar */}
            <aside
                className={`fixed top-0 left-0 z-50 h-full w-[var(--sidebar-width)] bg-white dark:bg-surface-900 border-r border-surface-200 dark:border-surface-800 flex flex-col transition-transform duration-300 lg:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'
                    }`}
            >
                {/* Logo */}
                <div className="flex items-center justify-between px-6 h-[var(--navbar-height)] border-b border-surface-200 dark:border-surface-800">
                    <Link href="/" className="flex items-center gap-2.5">
                        <div className="w-10 h-10 rounded-xl overflow-hidden shadow-md border border-surface-200 dark:border-surface-800">
                            <img src="/logo.jpg" alt="Student Connect" className="w-full h-full object-cover" />
                        </div>
                        <div>
                            <h1 className="text-lg font-bold font-display gradient-text">Student Connect</h1>
                        </div>
                    </Link>
                    <button
                        onClick={onClose}
                        className="lg:hidden p-1.5 hover:bg-surface-100 dark:hover:bg-surface-800 rounded-lg"
                    >
                        <X className="w-5 h-5 text-surface-500" />
                    </button>
                </div>

                {/* Navigation */}
                <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto scrollbar-hide">
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        const active = isActive(item.href);
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                onClick={onClose}
                                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 group ${active
                                        ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300 shadow-sm'
                                        : 'text-surface-600 dark:text-surface-400 hover:bg-surface-50 dark:hover:bg-surface-800 hover:text-surface-900 dark:hover:text-surface-100'
                                    }`}
                            >
                                <Icon
                                    className={`w-5 h-5 transition-colors ${active
                                            ? 'text-primary-600 dark:text-primary-400'
                                            : 'text-surface-400 dark:text-surface-500 group-hover:text-surface-600 dark:group-hover:text-surface-300'
                                        }`}
                                />
                                {item.label}
                                {active && (
                                    <div className="ml-auto w-1.5 h-1.5 rounded-full bg-primary-500" />
                                )}
                            </Link>
                        );
                    })}
                </nav>

                {/* User Section */}
                <div className="p-3 border-t border-surface-200 dark:border-surface-800">
                    {user && (
                        <div className="flex items-center gap-3 px-3 py-2 mb-2">
                            {user.avatarUrl ? (
                                <img
                                    src={user.avatarUrl}
                                    alt={user.fullName}
                                    className="w-9 h-9 rounded-full object-cover"
                                />
                            ) : (
                                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary-400 to-accent-400 flex items-center justify-center text-white font-bold text-sm">
                                    {user.fullName.charAt(0)}
                                </div>
                            )}
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-semibold text-surface-900 dark:text-surface-100 truncate">
                                    {user.fullName}
                                </p>
                                <p className="text-xs text-surface-500 dark:text-surface-400 truncate">
                                    {user.points} points
                                </p>
                            </div>
                        </div>
                    )}
                    <Link
                        href={user ? `/profile/${user.username}` : '#'}
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-surface-600 dark:text-surface-400 hover:bg-surface-50 dark:hover:bg-surface-800 rounded-xl transition-all"
                    >
                        <Settings className="w-4 h-4" />
                        Settings
                    </Link>
                    <button
                        onClick={logout}
                        className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-xl transition-all"
                    >
                        <LogOut className="w-4 h-4" />
                        Sign Out
                    </button>
                </div>
            </aside>
        </>
    );
}
