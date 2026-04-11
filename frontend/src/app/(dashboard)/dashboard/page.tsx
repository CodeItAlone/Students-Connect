'use client';

import { useEffect, useState, useCallback } from 'react';
import { Sparkles, TrendingUp, Users, Calendar, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import { useClubStore } from '@/stores/clubStore';
import { useEventStore } from '@/stores/eventStore';
import api from '@/lib/api';
import { DashboardStats } from '@/types';

export default function DiscoveryPage() {
    const { clubs, fetchClubs, isLoading: clubsLoading } = useClubStore();
    const { events, fetchEvents, isLoading: eventsLoading } = useEventStore();
    
    const [statsData, setStatsData] = useState<DashboardStats | null>(null);
    const [isStatsLoading, setIsStatsLoading] = useState(true);

    const fetchStats = useCallback(async () => {
        try {
            const response = await api.get<DashboardStats>('/stats/dashboard');
            setStatsData(response.data);
        } catch (error) {
            console.error('Failed to fetch dashboard stats:', error);
            // Fallback to zero if failed and no data yet
            setStatsData(prev => prev || { activeClubs: 0, upcomingEvents: 0, studentsConnected: 0 });
        } finally {
            setIsStatsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchClubs(0);
        fetchEvents(0);
        fetchStats();

        // Auto-refresh every 30 seconds
        const interval = setInterval(fetchStats, 30000);
        
        // Cleanup interval on unmount
        return () => clearInterval(interval);
    }, [fetchClubs, fetchEvents, fetchStats]);

    const formatValue = (val: number | undefined) => {
        if (val === undefined) return '...';
        if (val > 999) return `${(val / 1000).toFixed(1)}K+`;
        return val.toString();
    };

    const stats = [
        { 
            label: 'Active Clubs', 
            value: isStatsLoading ? '...' : formatValue(statsData?.activeClubs), 
            icon: Users, 
            color: 'from-primary-500 to-primary-600' 
        },
        { 
            label: 'Upcoming Events', 
            value: isStatsLoading ? '...' : formatValue(statsData?.upcomingEvents), 
            icon: Calendar, 
            color: 'from-accent-500 to-accent-600' 
        },
        { 
            label: 'Students Connected', 
            value: isStatsLoading ? '...' : formatValue(statsData?.studentsConnected), 
            icon: TrendingUp, 
            color: 'from-emerald-500 to-emerald-600' 
        },
    ];

    const featuredClubs = clubs.slice(0, 4);
    const upcomingEvents = events.slice(0, 3);

    return (
        <div className="space-y-8 animate-fade-in">
            {/* Welcome Section */}
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary-600 via-primary-700 to-accent-700 p-8 lg:p-10 text-white">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />
                <div className="relative z-10">
                    <div className="flex items-center gap-2 mb-3">
                        <Sparkles className="w-5 h-5 text-amber-300" />
                        <span className="text-sm font-medium text-primary-200">Your Discovery Feed</span>
                    </div>
                    <h1 className="text-3xl lg:text-4xl font-bold font-display mb-3">
                        One Platform. Every Opportunity.
                    </h1>
                    <p className="text-primary-100 max-w-lg text-lg">
                        Discover clubs, events, mentors, and opportunities tailored to your interests.
                    </p>
                    <div className="flex gap-3 mt-6">
                        <Link href="/clubs">
                            <Button variant="secondary" size="lg" rightIcon={<ArrowRight className="w-4 h-4" />}>
                                Explore Clubs
                            </Button>
                        </Link>
                        <Link href="/events">
                            <Button
                                variant="ghost"
                                size="lg"
                                className="text-white hover:bg-white/10 border border-white/20"
                            >
                                View Events
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {stats.map((stat) => {
                    const Icon = stat.icon;
                    return (
                        <div
                            key={stat.label}
                            className="glass-card p-5 flex items-center gap-4 hover-lift"
                        >
                            <div
                                className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-md`}
                            >
                                <Icon className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-surface-900 dark:text-surface-100 font-display">
                                    {stat.value}
                                </p>
                                <p className="text-sm text-surface-500 dark:text-surface-400">{stat.label}</p>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Featured Clubs */}
            <div>
                <div className="flex items-center justify-between mb-5">
                    <div>
                        <h2 className="section-title">Featured Clubs</h2>
                        <p className="section-subtitle">Popular communities you might like</p>
                    </div>
                    <Link href="/clubs">
                        <Button variant="ghost" size="sm" rightIcon={<ArrowRight className="w-4 h-4" />}>
                            View All
                        </Button>
                    </Link>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {featuredClubs.map((club) => (
                        <Link key={club.id} href={`/clubs/${club.slug}`}>
                            <div className="glass-card overflow-hidden hover-lift cursor-pointer group">
                                <div 
                                    className="h-28 bg-gradient-to-br from-primary-400 to-accent-500 relative"
                                    style={club.bannerUrl ? { backgroundImage: `url(${club.bannerUrl})`, backgroundSize: 'cover' } : {}}
                                >
                                    <div className="absolute inset-0 bg-black/10" />
                                </div>
                                <div className="p-4 space-y-2">
                                    <div className="flex items-center gap-2">
                                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center text-white font-bold text-xs -mt-6 relative z-10 border-2 border-white dark:border-surface-800">
                                            {club.logoUrl ? (
                                                <img src={club.logoUrl} alt="" className="w-full h-full object-cover rounded-lg" />
                                            ) : club.name.charAt(0)}
                                        </div>
                                        <h3 className="text-sm font-semibold text-surface-900 dark:text-surface-100 truncate group-hover:text-primary-600 transition-colors">
                                            {club.name}
                                        </h3>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-xs text-surface-500">{club.memberCount} members</span>
                                        <Badge variant="primary" size="sm">{club.category}</Badge>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                    {clubsLoading && (
                        Array(4).fill(0).map((_, i) => (
                            <div key={i} className="glass-card h-48 animate-pulse bg-surface-100 dark:bg-surface-800" />
                        ))
                    )}
                </div>
            </div>

            {/* Upcoming Events */}
            <div>
                <div className="flex items-center justify-between mb-5">
                    <div>
                        <h2 className="section-title">Upcoming Events</h2>
                        <p className="section-subtitle">Don&apos;t miss out on these events</p>
                    </div>
                    <Link href="/events">
                        <Button variant="ghost" size="sm" rightIcon={<ArrowRight className="w-4 h-4" />}>
                            View All
                        </Button>
                    </Link>
                </div>
                <div className="space-y-3">
                    {upcomingEvents.map((event) => (
                        <div
                            key={event.id}
                            className="glass-card p-4 flex items-center gap-4 hover-lift cursor-pointer"
                        >
                            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-accent-100 to-primary-100 dark:from-accent-900/30 dark:to-primary-900/30 flex flex-col items-center justify-center">
                                <span className="text-xs font-medium text-accent-600 dark:text-accent-400">
                                    {new Date(event.startDate).toLocaleDateString('en-US', { month: 'short' })}
                                </span>
                                <span className="text-lg font-bold text-surface-900 dark:text-surface-100">
                                    {new Date(event.startDate).getDate()}
                                </span>
                            </div>
                            <div className="flex-1 min-w-0">
                                <h3 className="font-semibold text-surface-900 dark:text-surface-100">
                                    {event.title}
                                </h3>
                                <p className="text-sm text-surface-500 dark:text-surface-400">
                                    By {event.club?.name || 'Club'}
                                </p>
                            </div>
                            <Badge
                                variant={event.type === 'WORKSHOP' ? 'primary' : 'warning'}
                                size="sm"
                            >
                                {event.type}
                            </Badge>
                        </div>
                    ))}
                    {eventsLoading && (
                        Array(3).fill(0).map((_, i) => (
                            <div key={i} className="glass-card h-20 animate-pulse bg-surface-100 dark:bg-surface-800" />
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}
