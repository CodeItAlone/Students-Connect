'use client';

import { Event } from '@/types';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import { Calendar, MapPin, Users, Clock } from 'lucide-react';

interface EventCardProps {
    event: Event;
    onRsvp?: (eventId: number) => void;
}

export default function EventCard({ event, onRsvp }: EventCardProps) {
    const formatDate = (date: string) => {
        return new Date(date).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
        });
    };

    const formatTime = (date: string) => {
        return new Date(date).toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    const typeColors: Record<string, 'primary' | 'accent' | 'success' | 'warning'> = {
        WORKSHOP: 'primary',
        HACKATHON: 'accent',
        SEMINAR: 'success',
        COMPETITION: 'warning',
        MEETUP: 'primary',
        OTHER: 'primary',
    };

    return (
        <div className="glass-card overflow-hidden hover-lift group">
            {/* Banner */}
            <div className="relative h-40 bg-gradient-to-br from-accent-500 to-primary-600 overflow-hidden">
                {event.bannerUrl && (
                    <img
                        src={event.bannerUrl}
                        alt={event.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-3 left-3 right-3">
                    <Badge variant={typeColors[event.type] || 'primary'} size="sm">
                        {event.type}
                    </Badge>
                </div>
                <div className="absolute top-3 right-3">
                    <Badge
                        variant={event.mode === 'ONLINE' ? 'success' : event.mode === 'HYBRID' ? 'warning' : 'neutral'}
                        size="sm"
                        dot
                    >
                        {event.mode}
                    </Badge>
                </div>
            </div>

            {/* Content */}
            <div className="p-4 space-y-3">
                <h3 className="font-semibold text-surface-900 dark:text-surface-100 line-clamp-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                    {event.title}
                </h3>

                <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-surface-500 dark:text-surface-400">
                        <Calendar className="w-4 h-4 flex-shrink-0" />
                        <span>{formatDate(event.startDate)}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-surface-500 dark:text-surface-400">
                        <Clock className="w-4 h-4 flex-shrink-0" />
                        <span>{formatTime(event.startDate)}</span>
                    </div>
                    {event.location && (
                        <div className="flex items-center gap-2 text-sm text-surface-500 dark:text-surface-400">
                            <MapPin className="w-4 h-4 flex-shrink-0" />
                            <span className="truncate">{event.location}</span>
                        </div>
                    )}
                    {event.maxParticipants && (
                        <div className="flex items-center gap-2 text-sm text-surface-500 dark:text-surface-400">
                            <Users className="w-4 h-4 flex-shrink-0" />
                            <span>
                                {event.currentParticipants}/{event.maxParticipants} registered
                            </span>
                        </div>
                    )}
                </div>

                {event.club && (
                    <p className="text-xs text-surface-400 dark:text-surface-500">
                        By <span className="font-medium text-primary-600 dark:text-primary-400">{event.club.name}</span>
                    </p>
                )}

                <Button
                    variant={event.isRsvped ? 'secondary' : 'primary'}
                    size="sm"
                    className="w-full"
                    onClick={() => onRsvp?.(event.id)}
                >
                    {event.isRsvped ? 'Cancel RSVP' : 'RSVP Now'}
                </Button>
            </div>
        </div>
    );
}
