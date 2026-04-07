'use client';

import { Mentor } from '@/types';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import { Star, Calendar, MessageSquare } from 'lucide-react';

interface MentorCardProps {
    mentor: Mentor;
    onBook?: (mentorId: number) => void;
}

export default function MentorCard({ mentor, onBook }: MentorCardProps) {
    return (
        <div className="glass-card p-5 hover-lift group">
            <div className="flex items-start gap-4">
                {/* Avatar */}
                <div className="relative">
                    {mentor.user.avatarUrl ? (
                        <img
                            src={mentor.user.avatarUrl}
                            alt={mentor.user.fullName}
                            className="w-14 h-14 rounded-xl object-cover"
                        />
                    ) : (
                        <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-accent-400 to-primary-500 flex items-center justify-center text-white font-bold text-lg">
                            {mentor.user.fullName.charAt(0)}
                        </div>
                    )}
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-400 rounded-full border-2 border-white dark:border-surface-800" />
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-surface-900 dark:text-surface-100 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                        {mentor.user.fullName}
                    </h3>
                    <p className="text-sm text-surface-500 dark:text-surface-400 mt-0.5">
                        {mentor.user.role === 'MENTOR' ? 'Mentor' : mentor.user.department || 'Expert'}
                    </p>
                    <div className="flex items-center gap-1 mt-1">
                        <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                        <span className="text-sm font-medium text-surface-700 dark:text-surface-300">
                            {mentor.rating.toFixed(1)}
                        </span>
                        <span className="text-xs text-surface-400">
                            ({mentor.totalSessions} sessions)
                        </span>
                    </div>
                </div>
            </div>

            <p className="text-sm text-surface-600 dark:text-surface-400 mt-3 line-clamp-2">
                {mentor.bio}
            </p>

            {/* Expertise Tags */}
            <div className="flex flex-wrap gap-1.5 mt-3">
                {mentor.expertise.slice(0, 4).map((skill) => (
                    <Badge key={skill} variant="neutral" size="sm">
                        {skill}
                    </Badge>
                ))}
                {mentor.expertise.length > 4 && (
                    <Badge variant="neutral" size="sm">
                        +{mentor.expertise.length - 4}
                    </Badge>
                )}
            </div>

            {/* Actions */}
            <div className="flex gap-2 mt-4">
                <Button
                    variant="primary"
                    size="sm"
                    className="flex-1"
                    leftIcon={<Calendar className="w-4 h-4" />}
                    onClick={() => onBook?.(mentor.id)}
                >
                    Book Session
                </Button>
                <Button variant="ghost" size="sm" leftIcon={<MessageSquare className="w-4 h-4" />}>
                    Message
                </Button>
            </div>
        </div>
    );
}
