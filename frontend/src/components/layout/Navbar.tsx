'use client';

import { useState, useRef, useEffect } from 'react';
import { Bell, Search, Menu, Moon, Sun } from 'lucide-react';
import { useNotificationStore } from '@/stores/notificationStore';
import { useAuthStore } from '@/stores/authStore';
import Link from 'next/link';

interface NavbarProps {
    onMenuClick: () => void;
}

export default function Navbar({ onMenuClick }: NavbarProps) {
    const [isDark, setIsDark] = useState(false);
    const [showNotifications, setShowNotifications] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const notifRef = useRef<HTMLDivElement>(null);
    const { notifications, unreadCount, fetchNotifications } = useNotificationStore();
    const { user } = useAuthStore();

    useEffect(() => {
        fetchNotifications();
    }, [fetchNotifications]);

    useEffect(() => {
        const isDarkMode = document.documentElement.classList.contains('dark');
        setIsDark(isDarkMode);
    }, []);

    const toggleDarkMode = () => {
        document.documentElement.classList.toggle('dark');
        setIsDark(!isDark);
    };

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
                setShowNotifications(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <header className="fixed top-0 right-0 left-0 lg:left-[var(--sidebar-width)] h-[var(--navbar-height)] bg-white/80 dark:bg-surface-900/80 backdrop-blur-lg border-b border-surface-200 dark:border-surface-800 z-30 flex items-center px-4 lg:px-6 gap-4">
            {/* Menu Button (Mobile) */}
            <button
                onClick={onMenuClick}
                className="lg:hidden p-2 hover:bg-surface-100 dark:hover:bg-surface-800 rounded-xl transition-colors"
            >
                <Menu className="w-5 h-5 text-surface-600 dark:text-surface-300" />
            </button>

            {/* Search */}
            <div className="flex-1 max-w-md">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-surface-400" />
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search clubs, events, people..."
                        className="w-full pl-10 pr-4 py-2.5 bg-surface-50 dark:bg-surface-800 border border-surface-200 dark:border-surface-700 rounded-xl text-sm text-surface-900 dark:text-surface-100 placeholder-surface-400 dark:placeholder-surface-500 focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-500 transition-all"
                    />
                </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2">
                {/* Dark Mode Toggle */}
                <button
                    onClick={toggleDarkMode}
                    className="p-2.5 hover:bg-surface-100 dark:hover:bg-surface-800 rounded-xl transition-colors"
                >
                    {isDark ? (
                        <Sun className="w-5 h-5 text-amber-400" />
                    ) : (
                        <Moon className="w-5 h-5 text-surface-500" />
                    )}
                </button>

                {/* Notifications */}
                <div className="relative" ref={notifRef}>
                    <button
                        onClick={() => setShowNotifications(!showNotifications)}
                        className="relative p-2.5 hover:bg-surface-100 dark:hover:bg-surface-800 rounded-xl transition-colors"
                    >
                        <Bell className="w-5 h-5 text-surface-500 dark:text-surface-400" />
                        {unreadCount > 0 && (
                            <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-pulse-soft">
                                {unreadCount > 9 ? '9+' : unreadCount}
                            </span>
                        )}
                    </button>

                    {/* Notification Dropdown */}
                    {showNotifications && (
                        <div className="absolute right-0 top-full mt-2 w-80 bg-white dark:bg-surface-800 rounded-2xl shadow-2xl border border-surface-200 dark:border-surface-700 overflow-hidden animate-slide-down">
                            <div className="px-4 py-3 border-b border-surface-200 dark:border-surface-700">
                                <h3 className="font-semibold text-surface-900 dark:text-surface-100">
                                    Notifications
                                </h3>
                            </div>
                            <div className="max-h-80 overflow-y-auto">
                                {notifications.length > 0 ? (
                                    notifications.slice(0, 5).map((notif) => (
                                        <div
                                            key={notif.id}
                                            className={`px-4 py-3 border-b border-surface-100 dark:border-surface-700/50 hover:bg-surface-50 dark:hover:bg-surface-700/50 transition-colors cursor-pointer ${!notif.isRead ? 'bg-primary-50/30 dark:bg-primary-900/10' : ''
                                                }`}
                                        >
                                            <p className="text-sm font-medium text-surface-900 dark:text-surface-100">
                                                {notif.title}
                                            </p>
                                            <p className="text-xs text-surface-500 dark:text-surface-400 mt-0.5">
                                                {notif.message}
                                            </p>
                                        </div>
                                    ))
                                ) : (
                                    <div className="px-4 py-8 text-center text-sm text-surface-400">
                                        No notifications yet
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>

                {/* Profile */}
                {user && (
                    <Link href={`/profile/${user.username}`}>
                        <div className="flex items-center gap-2 pl-2">
                            {user.avatarUrl ? (
                                <img
                                    src={user.avatarUrl}
                                    alt={user.fullName}
                                    className="w-8 h-8 rounded-full object-cover ring-2 ring-surface-200 dark:ring-surface-700"
                                />
                            ) : (
                                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-400 to-accent-400 flex items-center justify-center text-white font-bold text-xs ring-2 ring-surface-200 dark:ring-surface-700">
                                    {user.fullName.charAt(0)}
                                </div>
                            )}
                        </div>
                    </Link>
                )}
            </div>
        </header>
    );
}
