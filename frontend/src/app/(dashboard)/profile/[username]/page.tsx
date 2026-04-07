'use client';

import { useParams } from 'next/navigation';
import { MapPin, Calendar, Award, Users, Edit3, ExternalLink } from 'lucide-react';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';

export default function ProfilePage() {
    const params = useParams();
    const username = params.username as string;

    const user = {
        fullName: username.split(/(?=[A-Z])/).join(' ') || username,
        username,
        email: `${username}@college.edu`,
        bio: 'Passionate developer and tech enthusiast. Love building things that matter. Active member of CodeCraft Society.',
        college: 'Example University',
        department: 'Computer Science',
        year: 3,
        points: 1580,
        role: 'STUDENT' as const,
        joinedDate: 'January 2024',
        clubsJoined: 4,
        eventsAttended: 12,
        badges: [
            { name: 'Early Adopter', icon: '🌟' },
            { name: 'Event Enthusiast', icon: '🎯' },
            { name: 'Top Contributor', icon: '🏆' },
            { name: 'Mentor Star', icon: '⭐' },
        ],
    };

    return (
        <div className="space-y-6 animate-fade-in max-w-4xl mx-auto">
            {/* Profile Header */}
            <div className="glass-card overflow-hidden">
                <div className="h-36 bg-gradient-to-r from-primary-600 via-accent-600 to-primary-500 relative">
                    <div className="absolute inset-0 bg-black/10" />
                </div>
                <div className="px-6 pb-6">
                    <div className="flex flex-col sm:flex-row items-start sm:items-end gap-4 -mt-10">
                        <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-primary-400 to-accent-500 flex items-center justify-center text-white text-3xl font-bold border-4 border-white dark:border-surface-800 shadow-xl relative z-10">
                            {user.fullName.charAt(0)}
                        </div>
                        <div className="flex-1 pt-2 sm:pt-0 sm:pb-1">
                            <div className="flex items-center gap-2">
                                <h1 className="text-2xl font-bold font-display text-surface-900 dark:text-surface-100">{user.fullName}</h1>
                                <Badge variant="primary" size="sm">{user.role}</Badge>
                            </div>
                            <p className="text-surface-500 dark:text-surface-400">@{user.username}</p>
                        </div>
                        <Button variant="secondary" size="sm" leftIcon={<Edit3 className="w-4 h-4" />}>Edit Profile</Button>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-6">
                    {/* About */}
                    <div className="glass-card p-6">
                        <h2 className="text-lg font-semibold font-display text-surface-900 dark:text-surface-100 mb-3">About</h2>
                        <p className="text-surface-600 dark:text-surface-400 leading-relaxed">{user.bio}</p>
                        <div className="flex flex-wrap gap-4 mt-4 text-sm text-surface-500">
                            <div className="flex items-center gap-1.5"><MapPin className="w-4 h-4" />{user.college}</div>
                            <div className="flex items-center gap-1.5"><Calendar className="w-4 h-4" />Joined {user.joinedDate}</div>
                        </div>
                    </div>

                    {/* Badges */}
                    <div className="glass-card p-6">
                        <h2 className="text-lg font-semibold font-display text-surface-900 dark:text-surface-100 mb-4">Badges</h2>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                            {user.badges.map((badge) => (
                                <div key={badge.name} className="text-center p-4 rounded-xl bg-surface-50 dark:bg-surface-800/50 hover:bg-surface-100 dark:hover:bg-surface-800 transition-colors cursor-pointer">
                                    <div className="text-3xl mb-2">{badge.icon}</div>
                                    <p className="text-xs font-medium text-surface-700 dark:text-surface-300">{badge.name}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Activity */}
                    <div className="glass-card p-6">
                        <h2 className="text-lg font-semibold font-display text-surface-900 dark:text-surface-100 mb-4">Recent Activity</h2>
                        <div className="space-y-4">
                            {[
                                { action: 'Joined CodeCraft Society', time: '2 days ago', icon: '👥' },
                                { action: 'RSVP\'d to Web Dev Workshop', time: '3 days ago', icon: '📅' },
                                { action: 'Earned "Event Enthusiast" badge', time: '1 week ago', icon: '🏅' },
                                { action: 'Attended AI/ML Bootcamp', time: '2 weeks ago', icon: '🎓' },
                            ].map((activity, i) => (
                                <div key={i} className="flex items-start gap-3 py-2">
                                    <span className="text-xl">{activity.icon}</span>
                                    <div>
                                        <p className="text-sm font-medium text-surface-900 dark:text-surface-100">{activity.action}</p>
                                        <p className="text-xs text-surface-500">{activity.time}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Sidebar */}
                <div className="space-y-4">
                    <div className="glass-card p-5 space-y-4">
                        <h3 className="font-semibold text-surface-900 dark:text-surface-100">Stats</h3>
                        <div className="space-y-3">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2 text-sm text-surface-500">
                                    <Award className="w-4 h-4" />Points
                                </div>
                                <span className="font-bold text-surface-900 dark:text-surface-100">{user.points.toLocaleString()}</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2 text-sm text-surface-500">
                                    <Users className="w-4 h-4" />Clubs Joined
                                </div>
                                <span className="font-bold text-surface-900 dark:text-surface-100">{user.clubsJoined}</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2 text-sm text-surface-500">
                                    <Calendar className="w-4 h-4" />Events Attended
                                </div>
                                <span className="font-bold text-surface-900 dark:text-surface-100">{user.eventsAttended}</span>
                            </div>
                        </div>
                    </div>

                    <div className="glass-card p-5">
                        <h3 className="font-semibold text-surface-900 dark:text-surface-100 mb-3">Education</h3>
                        <p className="text-sm text-surface-700 dark:text-surface-300 font-medium">{user.college}</p>
                        <p className="text-sm text-surface-500">{user.department} • Year {user.year}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
