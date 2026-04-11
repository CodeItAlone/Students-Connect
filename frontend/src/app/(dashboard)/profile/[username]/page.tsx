'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { MapPin, Calendar, Award, Users, Edit3, ExternalLink, Shield, Loader2, BookOpen } from 'lucide-react';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import api from '@/lib/api';
import { User, Club } from '@/types';
import Link from 'next/link';

export default function ProfilePage() {
    const params = useParams();
    const username = params.username as string;
    const [user, setUser] = useState<User | null>(null);
    const [joinedClubs, setJoinedClubs] = useState<Club[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchProfileData = async () => {
            setIsLoading(true);
            try {
                const [userRes, clubsRes] = await Promise.all([
                    api.get<User>(`/users/${username}`),
                    api.get<Club[]>(`/profile/${username}/clubs`)
                ]);
                setUser(userRes.data);
                setJoinedClubs(clubsRes.data);
            } catch (error) {
                console.error('Failed to fetch profile:', error);
            } finally {
                setIsLoading(false);
            }
        };

        if (username) {
            fetchProfileData();
        }
    }, [username]);

    if (isLoading) {
        return (
            <div className="h-[60vh] flex items-center justify-center">
                <Loader2 className="w-8 h-8 text-primary-600 animate-spin" />
            </div>
        );
    }

    if (!user) {
        return (
            <div className="text-center py-20 animate-fade-in">
                <div className="w-20 h-20 bg-surface-100 dark:bg-surface-800 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Shield className="w-10 h-10 text-surface-400" />
                </div>
                <h2 className="text-2xl font-bold text-surface-900 dark:text-surface-100">User not found</h2>
                <p className="text-surface-500 mt-2 max-w-sm mx-auto">The profile you are looking for does not exist or has been removed.</p>
                <Link href="/leaderboard">
                    <Button variant="primary" className="mt-8 rounded-full px-8">View Leaderboard</Button>
                </Link>
            </div>
        );
    }

    const joinedAtDate = new Date(user.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

    return (
        <div className="space-y-6 animate-fade-in max-w-5xl mx-auto">
            {/* Profile Header */}
            <div className="glass-card overflow-hidden rounded-[2.5rem]">
                <div className="h-48 bg-gradient-to-r from-primary-600 via-accent-600 to-primary-500 relative">
                    <div className="absolute inset-0 bg-black/10" />
                    <div className="absolute -bottom-1 inset-x-0 h-24 bg-gradient-to-t from-white dark:from-surface-900 to-transparent" />
                </div>
                <div className="px-8 pb-8">
                    <div className="flex flex-col md:flex-row items-center md:items-end gap-6 -mt-16 relative z-10">
                        <div className="w-32 h-32 rounded-3xl bg-gradient-to-br from-primary-400 to-accent-500 flex items-center justify-center text-white text-5xl font-black border-4 border-white dark:border-surface-900 shadow-2xl">
                            {user.fullName.charAt(0)}
                        </div>
                        <div className="flex-1 text-center md:text-left pt-2">
                            <div className="flex flex-col md:flex-row items-center gap-3">
                                <h1 className="text-3xl font-black font-display text-surface-900 dark:text-surface-100">{user.fullName}</h1>
                                <Badge variant="primary" size="md" className="rounded-full px-4">{user.role}</Badge>
                            </div>
                            <p className="text-surface-500 dark:text-surface-400 font-medium mt-1">@{user.username}</p>
                        </div>
                        <div className="flex gap-2">
                            <Button variant="secondary" className="rounded-full px-6 border-surface-200 dark:border-surface-700" leftIcon={<Edit3 className="w-4 h-4" />}>Edit Profile</Button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-8">
                    {/* About */}
                    <div className="glass-card p-8">
                        <h2 className="text-xl font-bold font-display text-surface-900 dark:text-surface-100 mb-4 flex items-center gap-2">
                            <BookOpen className="w-5 h-4" /> About
                        </h2>
                        <p className="text-surface-600 dark:text-surface-400 leading-relaxed text-lg">
                            {user.bio || `Ambitious student at ${user.college || 'our university'}, focused on ${user.department || 'innovation'} and personal growth. Passionate about community building and academic excellence.`}
                        </p>
                        <div className="flex flex-wrap gap-4 mt-6 text-sm font-medium text-surface-500">
                            {user.college && <div className="flex items-center gap-1.5 bg-surface-50 dark:bg-surface-800 px-3 py-1.5 rounded-full"><MapPin className="w-4 h-4" />{user.college}</div>}
                            <div className="flex items-center gap-1.5 bg-surface-50 dark:bg-surface-800 px-3 py-1.5 rounded-full"><Calendar className="w-4 h-4" />Joined {joinedAtDate}</div>
                        </div>
                    </div>

                    {/* Joined Clubs */}
                    <div className="glass-card p-8">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-bold font-display text-surface-900 dark:text-surface-100 flex items-center gap-2">
                                <Users className="w-5 h-4" /> Joined Clubs
                            </h2>
                            <Badge variant="neutral">{joinedClubs.length} Clubs</Badge>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {joinedClubs.map((club) => (
                                <Link key={club.id} href={`/clubs/${club.slug}`}>
                                    <div className="p-4 rounded-2xl bg-surface-50 dark:bg-surface-800/50 hover:bg-white dark:hover:bg-surface-800 border border-transparent hover:border-primary-100 dark:hover:border-primary-900/30 transition-all hover:shadow-xl hover:shadow-primary-600/5 group">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-500 to-accent-600 flex items-center justify-center text-white font-bold shadow-md overflow-hidden">
                                                {club.logoUrl ? <img src={club.logoUrl} alt="" className="w-full h-full object-cover" /> : club.name.charAt(0)}
                                            </div>
                                            <div className="min-w-0">
                                                <p className="font-bold text-surface-900 dark:text-surface-100 truncate group-hover:text-primary-600 transition-colors">{club.name}</p>
                                                <p className="text-[10px] font-black uppercase text-surface-400 tracking-widest">{club.category}</p>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                        {joinedClubs.length === 0 && (
                            <div className="text-center py-10 bg-surface-50 dark:bg-surface-800/20 rounded-2xl border border-dashed border-surface-200 dark:border-surface-700">
                                <p className="text-surface-500 text-sm">Not an active member of any clubs yet.</p>
                            </div>
                        )}
                    </div>

                    {/* Badges */}
                    <div className="glass-card p-8">
                        <h2 className="text-xl font-bold font-display text-surface-900 dark:text-surface-100 mb-6 flex items-center gap-2">
                            <Award className="w-5 h-4" /> Achievements
                        </h2>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                            {user.badges && user.badges.length > 0 ? user.badges.map((badge) => (
                                <div key={badge.name} className="text-center p-4 rounded-2xl bg-surface-50 dark:bg-surface-800/50 hover:bg-surface-100 dark:hover:bg-surface-800 transition-all cursor-pointer group">
                                    <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-white dark:bg-surface-900 shadow-xl flex items-center justify-center text-3xl group-hover:scale-110 transition-transform">
                                        <img src={badge.iconUrl} alt={badge.name} className="w-10 h-10 object-contain" />
                                    </div>
                                    <p className="text-xs font-black text-surface-900 dark:text-surface-100 uppercase tracking-tighter">{badge.name}</p>
                                </div>
                            )) : (
                                <p className="col-span-full text-center py-6 text-surface-500 text-sm">Keep participating to earn badges!</p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    <div className="glass-card p-8 space-y-6">
                        <h3 className="text-sm font-black text-surface-400 uppercase tracking-[0.2em]">Contribution</h3>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between p-4 rounded-2xl bg-primary-50 dark:bg-primary-900/20 border border-primary-100 dark:border-primary-900/30">
                                <div className="flex items-center gap-3 text-primary-600 dark:text-primary-400">
                                    <Award className="w-5 h-5" /><span className="text-sm font-bold">Total Points</span>
                                </div>
                                <span className="text-xl font-black text-primary-700 dark:text-primary-300">{user.points.toLocaleString()}</span>
                            </div>
                            <div className="flex items-center justify-between p-4 rounded-2xl bg-surface-50 dark:bg-surface-800 group hover:border-surface-200 transition-all">
                                <div className="flex items-center gap-3 text-surface-500 group-hover:text-surface-700 transition-colors">
                                    <Users className="w-5 h-5" /><span className="text-sm font-bold">Involvement</span>
                                </div>
                                <span className="text-lg font-black text-surface-900 dark:text-surface-100">{joinedClubs.length} Clubs</span>
                            </div>
                        </div>
                    </div>

                    <div className="glass-card p-8 border-t-4 border-primary-600">
                        <h3 className="font-bold text-surface-900 dark:text-surface-100 mb-4 uppercase text-xs tracking-widest">Education</h3>
                        <div className="space-y-1">
                            <p className="font-extrabold text-surface-900 dark:text-surface-100">{user.college || 'Unspecified University'}</p>
                            <p className="text-sm text-surface-500 font-medium">{user.department} {user.year ? `• Year ${user.year}` : ''}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
