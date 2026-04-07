'use client';

import { useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Users, Calendar, MessageSquare, Settings, CheckCircle2, Share2, Loader2 } from 'lucide-react';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import Link from 'next/link';
import { useClubStore } from '@/stores/clubStore';
import { useEventStore } from '@/stores/eventStore';

export default function ClubDetailPage() {
    const params = useParams();
    const slug = params.slug as string;
    const { currentClub, fetchClubBySlug, joinClub, leaveClub, isLoading: isClubLoading } = useClubStore();
    const { events, fetchEvents, isLoading: isEventsLoading } = useEventStore();

    useEffect(() => {
        if (slug) {
            fetchClubBySlug(slug);
        }
    }, [slug, fetchClubBySlug]);

    useEffect(() => {
        if (currentClub?.id) {
            fetchEvents(0, '', '', currentClub.id);
        }
    }, [currentClub?.id, fetchEvents]);

    if (isClubLoading && !currentClub) {
        return (
            <div className="h-[60vh] flex items-center justify-center">
                <Loader2 className="w-8 h-8 text-primary-600 animate-spin" />
            </div>
        );
    }

    if (!currentClub) {
        return (
            <div className="text-center py-20">
                <h2 className="text-2xl font-bold text-surface-900 dark:text-surface-100">Club not found</h2>
                <p className="text-surface-500 mt-2">The club you are looking for does not exist or has been removed.</p>
                <Link href="/discovery">
                    <Button variant="primary" className="mt-6">Back to Discovery</Button>
                </Link>
            </div>
        );
    }

    const handleJoinToggle = () => {
        if (currentClub.isJoined) {
            leaveClub(currentClub.id);
        } else {
            joinClub(currentClub.id);
        }
    };

    return (
        <div className="space-y-6 animate-fade-in">
            {/* Banner */}
            <div 
                className="relative h-48 md:h-64 rounded-3xl overflow-hidden bg-gradient-to-br from-primary-500 via-primary-600 to-accent-600"
                style={currentClub.bannerUrl ? { backgroundImage: `url(${currentClub.bannerUrl})`, backgroundSize: 'cover' } : {}}
            >
                <div className="absolute inset-0 bg-black/20" />
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/60 to-transparent h-1/2" />
                <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
                    <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white text-2xl font-bold border border-white/30 shadow-lg overflow-hidden">
                            {currentClub.logoUrl ? <img src={currentClub.logoUrl} alt="" className="w-full h-full object-cover" /> : currentClub.name.charAt(0)}
                        </div>
                        <div className="min-w-0">
                            <div className="flex items-center gap-2">
                                <h1 className="text-2xl md:text-3xl font-bold text-white font-display truncate">{currentClub.name}</h1>
                                {currentClub.verified && <CheckCircle2 className="w-5 h-5 text-emerald-400" />}
                            </div>
                            <p className="text-white/70 text-sm">{currentClub.college}</p>
                        </div>
                    </div>
                    <div className="hidden md:flex gap-2">
                        <Button variant="ghost" size="sm" className="text-white border border-white/20 hover:bg-white/10" leftIcon={<Share2 className="w-4 h-4" />}>
                            Share
                        </Button>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Quick Actions */}
                    <div className="flex flex-wrap gap-3">
                        <Button 
                            variant={currentClub.isJoined ? 'secondary' : 'primary'} 
                            leftIcon={<Users className="w-4 h-4" />}
                            onClick={handleJoinToggle}
                        >
                            {currentClub.isJoined ? 'Joined' : 'Join Club'}
                        </Button>
                        <Link href={`/clubs/${slug}/chat`}>
                            <Button variant="secondary" leftIcon={<MessageSquare className="w-4 h-4" />}>
                                Club Chat
                            </Button>
                        </Link>
                        <Link href={`/clubs/${slug}/dashboard`}>
                            <Button variant="ghost" leftIcon={<Settings className="w-4 h-4" />}>
                                Dashboard
                            </Button>
                        </Link>
                    </div>

                    {/* About */}
                    <div className="glass-card p-6">
                        <h2 className="text-xl font-semibold font-display text-surface-900 dark:text-surface-100 mb-3">
                            About
                        </h2>
                        <p className="text-surface-600 dark:text-surface-400 leading-relaxed">
                            {currentClub.description}
                        </p>
                        {currentClub.tags && currentClub.tags.length > 0 && (
                            <div className="flex flex-wrap gap-2 mt-4">
                                {currentClub.tags.map((tag) => (
                                    <Badge key={tag} variant="primary" size="sm">{tag}</Badge>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Upcoming Events */}
                    <div className="glass-card p-6">
                        <h2 className="text-xl font-semibold font-display text-surface-900 dark:text-surface-100 mb-4">
                            Upcoming Events
                        </h2>
                        <div className="space-y-3">
                            {events.slice(0, 3).map((event) => {
                                const startDate = new Date(event.startDate);
                                return (
                                    <Link key={event.id} href={`/events`}>
                                        <div className="flex items-center gap-4 p-3 rounded-xl hover:bg-surface-50 dark:hover:bg-surface-800/50 transition-colors cursor-pointer">
                                            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary-100 to-accent-100 dark:from-primary-900/30 dark:to-accent-900/30 flex flex-col items-center justify-center">
                                                <span className="text-xs font-medium text-primary-600 dark:text-primary-400">
                                                    {startDate.toLocaleString('default', { month: 'short' })}
                                                </span>
                                                <span className="text-sm font-bold text-surface-900 dark:text-surface-100">
                                                    {startDate.getDate()}
                                                </span>
                                            </div>
                                            <div className="flex-1">
                                                <p className="font-medium text-surface-900 dark:text-surface-100">{event.title}</p>
                                                <p className="text-sm text-surface-500">{event.type} • {event.mode}</p>
                                            </div>
                                            <Badge variant={event.isRsvped ? "success" : "primary"} size="sm">
                                                {event.isRsvped ? 'Registered' : 'RSVP'}
                                            </Badge>
                                        </div>
                                    </Link>
                                );
                            })}
                            {!isEventsLoading && events.length === 0 && (
                                <p className="text-center py-6 text-surface-500">No upcoming events scheduled.</p>
                            )}
                            {isEventsLoading && (
                                Array(2).fill(0).map((_, i) => <div key={i} className="h-16 animate-pulse bg-surface-100 dark:bg-surface-800 rounded-xl" />)
                            )}
                        </div>
                    </div>
                </div>

                {/* Sidebar */}
                <div className="space-y-4">
                    {/* Stats */}
                    <div className="glass-card p-5 space-y-4">
                        <h3 className="font-semibold text-surface-900 dark:text-surface-100">Club Info</h3>
                        <div className="space-y-3">
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-surface-500">Members</span>
                                <span className="font-semibold text-surface-900 dark:text-surface-100">{currentClub.memberCount}</span>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-surface-500">Category</span>
                                <Badge variant="primary" size="sm">{currentClub.category}</Badge>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-surface-500">Status</span>
                                <Badge variant="success" size="sm" dot>Active</Badge>
                            </div>
                        </div>
                    </div>

                    {/* Leader */}
                    <div className="glass-card p-5">
                        <h3 className="font-semibold text-surface-900 dark:text-surface-100 mb-3">Club Leader</h3>
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-400 to-accent-400 flex items-center justify-center text-white font-bold text-sm">
                                {currentClub.leaderName?.charAt(0) || 'L'}
                            </div>
                            <div>
                                <p className="font-medium text-surface-900 dark:text-surface-100">{currentClub.leaderName}</p>
                                <p className="text-xs text-surface-500">Club Administrator</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
