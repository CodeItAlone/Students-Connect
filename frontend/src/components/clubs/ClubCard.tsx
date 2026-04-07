'use client';

import { Club } from '@/types';
import Badge from '@/components/ui/Badge';
import { Users, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

interface ClubCardProps {
    club: Club;
}

export default function ClubCard({ club }: ClubCardProps) {
    return (
        <Link href={`/clubs/${club.slug}`}>
            <div className="glass-card overflow-hidden hover-lift cursor-pointer group">
                {/* Banner */}
                <div className="relative h-36 bg-gradient-to-br from-primary-500 to-accent-500 overflow-hidden">
                    {club.bannerUrl && (
                        <img
                            src={club.bannerUrl}
                            alt={club.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                    {club.verified && (
                        <div className="absolute top-3 right-3">
                            <CheckCircle2 className="w-5 h-5 text-emerald-400 drop-shadow-lg" />
                        </div>
                    )}
                </div>

                {/* Content */}
                <div className="p-4 space-y-3">
                    <div className="flex items-start gap-3">
                        {club.logoUrl ? (
                            <img
                                src={club.logoUrl}
                                alt={club.name}
                                className="w-10 h-10 rounded-xl object-cover border-2 border-white dark:border-surface-700 shadow-sm -mt-8 relative z-10 bg-white"
                            />
                        ) : (
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-400 to-accent-400 flex items-center justify-center text-white font-bold text-sm -mt-8 relative z-10 border-2 border-white dark:border-surface-700 shadow-sm">
                                {club.name.charAt(0)}
                            </div>
                        )}
                        <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-surface-900 dark:text-surface-100 truncate group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                                {club.name}
                            </h3>
                            <p className="text-xs text-surface-500 dark:text-surface-400">{club.college}</p>
                        </div>
                    </div>

                    <p className="text-sm text-surface-600 dark:text-surface-400 line-clamp-2">
                        {club.description}
                    </p>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5 text-surface-500 dark:text-surface-400">
                            <Users className="w-4 h-4" />
                            <span className="text-xs font-medium">{club.memberCount} members</span>
                        </div>
                        <Badge variant={club.isJoined ? 'success' : 'primary'} size="sm">
                            {club.isJoined ? 'Joined' : club.category}
                        </Badge>
                    </div>

                    {club.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1.5">
                            {club.tags.slice(0, 3).map((tag) => (
                                <span
                                    key={tag}
                                    className="text-xs px-2 py-0.5 bg-surface-100 dark:bg-surface-700 text-surface-500 dark:text-surface-400 rounded-full"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </Link>
    );
}
