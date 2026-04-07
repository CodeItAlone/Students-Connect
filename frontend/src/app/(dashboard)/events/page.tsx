'use client';

import { useState, useEffect } from 'react';
import { Search, Filter, Calendar, MapPin } from 'lucide-react';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import { useEventStore } from '@/stores/eventStore';

const eventTypes = ['All', 'Workshop', 'Hackathon', 'Seminar', 'Competition', 'Meetup'];

export default function EventsPage() {
    const { events, fetchEvents, rsvpEvent, isLoading } = useEventStore();
    const [search, setSearch] = useState('');
    const [activeType, setActiveType] = useState('All');

    useEffect(() => {
        fetchEvents(0, activeType === 'All' ? '' : activeType.toUpperCase(), search);
    }, [activeType, search, fetchEvents]);

    const typeColors: Record<string, 'primary' | 'accent' | 'success' | 'warning'> = {
        WORKSHOP: 'primary', HACKATHON: 'accent', SEMINAR: 'success', COMPETITION: 'warning', MEETUP: 'primary',
    };

    const handleRSVP = async (eventId: number) => {
        try {
            await rsvpEvent(eventId);
            // Points are handled by backend and will show up on profile refresh
        } catch (error) {
            alert('Failed to RSVP. Please try again.');
        }
    };

    return (
        <div className="space-y-6 animate-fade-in">
            <div>
                <h1 className="text-3xl font-bold font-display text-surface-900 dark:text-surface-100">Events</h1>
                <p className="text-surface-500 dark:text-surface-400 mt-1">Discover workshops, hackathons, and competitions</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                    <Input 
                        placeholder="Search events..." 
                        value={search} 
                        onChange={(e) => setSearch(e.target.value)} 
                        leftIcon={<Search className="w-4 h-4" />} 
                    />
                </div>
                <Button variant="secondary" leftIcon={<Filter className="w-4 h-4" />}>Filters</Button>
            </div>

            <div className="flex flex-wrap gap-2">
                {eventTypes.map((type) => (
                    <button 
                        key={type} 
                        onClick={() => setActiveType(type)} 
                        className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${activeType === type ? 'bg-primary-600 text-white shadow-md' : 'bg-white dark:bg-surface-800 text-surface-600 dark:text-surface-400 hover:bg-surface-100 dark:hover:bg-surface-700 border border-surface-200 dark:border-surface-700'}`}
                    >
                        {type}
                    </button>
                ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {events.map((event) => (
                    <div key={event.id} className="glass-card overflow-hidden hover-lift group flex flex-col">
                        <div 
                            className="h-36 bg-gradient-to-br from-accent-500 to-primary-600 relative"
                            style={event.bannerUrl ? { backgroundImage: `url(${event.bannerUrl})`, backgroundSize: 'cover' } : {}}
                        >
                            <div className="absolute inset-0 bg-black/10" />
                            <div className="absolute bottom-3 left-3">
                                <Badge variant={typeColors[event.type] || 'primary'} size="sm">{event.type}</Badge>
                            </div>
                            <div className="absolute top-3 right-3">
                                <Badge variant={event.mode === 'ONLINE' ? 'success' : event.mode === 'HYBRID' ? 'warning' : 'neutral'} size="sm" dot>{event.mode}</Badge>
                            </div>
                        </div>
                        <div className="p-4 space-y-3 flex-1 flex flex-col">
                            <h3 className="font-semibold text-surface-900 dark:text-surface-100 line-clamp-2 group-hover:text-primary-600 transition-colors">
                                {event.title}
                            </h3>
                            <div className="space-y-1.5 min-h-[4rem]">
                                <div className="flex items-center gap-2 text-sm text-surface-500">
                                    <Calendar className="w-4 h-4" />
                                    <span>{new Date(event.startDate).toLocaleDateString()} at {new Date(event.startDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-surface-500">
                                    <MapPin className="w-4 h-4" />
                                    <span className="truncate">{event.location || 'Online'}</span>
                                </div>
                            </div>
                            <p className="text-xs text-surface-400">By <span className="font-medium text-primary-600 dark:text-primary-400">{event.club?.name || 'Club'}</span></p>
                            
                            <div className="mt-auto pt-4 flex flex-col gap-3">
                                <div className="flex items-center justify-between">
                                    <span className="text-xs text-surface-500">{event.currentParticipants}{event.maxParticipants ? `/${event.maxParticipants}` : ''} registered</span>
                                    {event.maxParticipants && (
                                        <div className="w-20 h-1.5 bg-surface-200 dark:bg-surface-700 rounded-full overflow-hidden">
                                            <div 
                                                className="h-full bg-primary-500 rounded-full" 
                                                style={{ width: `${Math.min((event.currentParticipants / event.maxParticipants) * 100, 100)}%` }} 
                                            />
                                        </div>
                                    )}
                                </div>
                                <Button 
                                    variant={event.isRsvped ? "secondary" : "primary"} 
                                    size="sm" 
                                    className="w-full"
                                    onClick={() => handleRSVP(event.id)}
                                    disabled={!!event.isRsvped || (!!event.maxParticipants && event.currentParticipants >= event.maxParticipants)}
                                >
                                    {event.isRsvped ? 'Registered' : 'RSVP Now'}
                                </Button>
                            </div>
                        </div>
                    </div>
                ))}
                {isLoading && (
                    Array(6).fill(0).map((_, i) => (
                        <div key={i} className="glass-card animate-pulse h-64 bg-surface-100 dark:bg-surface-800" />
                    ))
                )}
                {!isLoading && events.length === 0 && (
                    <div className="col-span-full text-center py-12 glass-card">
                        <p className="text-surface-500">No events found matching your criteria.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
