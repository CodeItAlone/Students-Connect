'use client';

import { LeaderboardEntry } from '@/types';
import { Trophy, Medal, Award } from 'lucide-react';

interface LeaderboardTableProps {
    entries: LeaderboardEntry[];
    currentUserId?: number;
}

export default function LeaderboardTable({ entries, currentUserId }: LeaderboardTableProps) {
    const getRankIcon = (rank: number) => {
        switch (rank) {
            case 1:
                return <Trophy className="w-5 h-5 text-amber-400" />;
            case 2:
                return <Medal className="w-5 h-5 text-surface-400" />;
            case 3:
                return <Award className="w-5 h-5 text-amber-700" />;
            default:
                return (
                    <span className="text-sm font-bold text-surface-400 w-5 text-center">{rank}</span>
                );
        }
    };

    return (
        <div className="space-y-2">
            {entries.map((entry) => (
                <div
                    key={entry.userId}
                    className={`flex items-center gap-4 p-4 rounded-xl transition-all duration-200 hover:bg-surface-50 dark:hover:bg-surface-800/50 ${entry.userId === currentUserId
                            ? 'bg-primary-50/50 dark:bg-primary-900/10 border border-primary-200 dark:border-primary-800'
                            : 'bg-white dark:bg-surface-800/30 border border-surface-100 dark:border-surface-700/50'
                        } ${entry.rank <= 3 ? 'shadow-sm' : ''}`}
                >
                    {/* Rank */}
                    <div className="flex items-center justify-center w-8">
                        {getRankIcon(entry.rank)}
                    </div>

                    {/* Avatar */}
                    {entry.avatarUrl ? (
                        <img
                            src={entry.avatarUrl}
                            alt={entry.fullName}
                            className="w-10 h-10 rounded-full object-cover"
                        />
                    ) : (
                        <div
                            className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm ${entry.rank === 1
                                    ? 'bg-gradient-to-br from-amber-400 to-amber-600'
                                    : entry.rank === 2
                                        ? 'bg-gradient-to-br from-surface-300 to-surface-500'
                                        : entry.rank === 3
                                            ? 'bg-gradient-to-br from-amber-600 to-amber-800'
                                            : 'bg-gradient-to-br from-primary-400 to-primary-600'
                                }`}
                        >
                            {entry.fullName?.charAt(0) || '?'}
                        </div>
                    )}

                    {/* User Info */}
                    <div className="flex-1 min-w-0">
                        <p className="font-semibold text-surface-900 dark:text-surface-100 truncate">
                            {entry.fullName}
                            {entry.userId === currentUserId && (
                                <span className="text-xs font-normal text-primary-500 ml-2">(You)</span>
                            )}
                        </p>
                        <p className="text-xs text-surface-500 dark:text-surface-400">
                            {entry.badges} badges earned
                        </p>
                    </div>

                    {/* Points */}
                    <div className="text-right">
                        <p className="font-bold text-surface-900 dark:text-surface-100">
                            {entry.points.toLocaleString()}
                        </p>
                        <p className="text-xs text-surface-500 dark:text-surface-400">points</p>
                    </div>
                </div>
            ))}
        </div>
    );
}
