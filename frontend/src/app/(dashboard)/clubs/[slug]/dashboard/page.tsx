'use client';

import { useParams } from 'next/navigation';
import { Users, Calendar, TrendingUp, Settings, Plus, BarChart3 } from 'lucide-react';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';

export default function ClubDashboardPage() {
    const params = useParams();
    const slug = params.slug as string;
    const clubName = slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');

    const stats = [
        { label: 'Total Members', value: '234', change: '+12 this week', icon: Users, color: 'from-primary-500 to-primary-600' },
        { label: 'Events This Month', value: '5', change: '+2 from last month', icon: Calendar, color: 'from-accent-500 to-accent-600' },
        { label: 'Engagement Rate', value: '73%', change: '+5% this week', icon: TrendingUp, color: 'from-emerald-500 to-emerald-600' },
        { label: 'Active Discussions', value: '18', change: '+3 today', icon: BarChart3, color: 'from-amber-500 to-amber-600' },
    ];

    return (
        <div className="space-y-6 animate-fade-in">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold font-display text-surface-900 dark:text-surface-100">
                        {clubName} Dashboard
                    </h1>
                    <p className="text-surface-500 dark:text-surface-400 mt-1">Manage your club and track engagement</p>
                </div>
                <div className="flex gap-2">
                    <Button variant="primary" leftIcon={<Plus className="w-4 h-4" />}>Create Event</Button>
                    <Button variant="ghost" leftIcon={<Settings className="w-4 h-4" />}>Settings</Button>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((stat) => {
                    const Icon = stat.icon;
                    return (
                        <div key={stat.label} className="glass-card p-5 hover-lift">
                            <div className="flex items-center justify-between mb-3">
                                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-sm`}>
                                    <Icon className="w-5 h-5 text-white" />
                                </div>
                                <Badge variant="success" size="sm">{stat.change}</Badge>
                            </div>
                            <p className="text-2xl font-bold text-surface-900 dark:text-surface-100 font-display">{stat.value}</p>
                            <p className="text-sm text-surface-500 dark:text-surface-400 mt-1">{stat.label}</p>
                        </div>
                    );
                })}
            </div>

            {/* Recent Members & Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="glass-card p-6">
                    <h2 className="text-lg font-semibold font-display text-surface-900 dark:text-surface-100 mb-4">Recent Members</h2>
                    <div className="space-y-3">
                        {['Alice Wang', 'Bob Smith', 'Carol Davis', 'Dan Kim', 'Eve Brown'].map((name, i) => (
                            <div key={i} className="flex items-center gap-3 py-2">
                                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary-300 to-accent-400 flex items-center justify-center text-white text-xs font-bold">
                                    {name.charAt(0)}
                                </div>
                                <div className="flex-1">
                                    <p className="text-sm font-medium text-surface-900 dark:text-surface-100">{name}</p>
                                    <p className="text-xs text-surface-500">Joined {i + 1} day{i > 0 ? 's' : ''} ago</p>
                                </div>
                                <Badge variant="primary" size="sm">Member</Badge>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="glass-card p-6">
                    <h2 className="text-lg font-semibold font-display text-surface-900 dark:text-surface-100 mb-4">Recent Activity</h2>
                    <div className="space-y-4">
                        {[
                            { action: 'New event created', detail: 'Web Dev Workshop', time: '2 hours ago' },
                            { action: 'New member joined', detail: 'Alice Wang', time: '5 hours ago' },
                            { action: 'Announcement posted', detail: 'Meeting schedule update', time: '1 day ago' },
                            { action: 'Event completed', detail: 'AI/ML Bootcamp', time: '2 days ago' },
                        ].map((activity, i) => (
                            <div key={i} className="flex items-start gap-3">
                                <div className="w-2 h-2 rounded-full bg-primary-500 mt-2 flex-shrink-0" />
                                <div>
                                    <p className="text-sm font-medium text-surface-900 dark:text-surface-100">{activity.action}</p>
                                    <p className="text-xs text-surface-500">{activity.detail} • {activity.time}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
