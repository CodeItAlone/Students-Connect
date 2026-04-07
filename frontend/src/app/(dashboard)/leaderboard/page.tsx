'use client';

import { useEffect } from 'react';
import { Trophy, Medal, Award, Flame, Crown } from 'lucide-react';
import Badge from '@/components/ui/Badge';
import { useGamificationStore } from '@/stores/gamificationStore';

export default function LeaderboardPage() {
    const { leaderboard, fetchLeaderboard, isLoading } = useGamificationStore();

    useEffect(() => {
        fetchLeaderboard(0, 50);
    }, [fetchLeaderboard]);

    const getRankIcon = (rank: number) => {
        switch (rank) {
            case 1: return <Crown className="w-6 h-6 text-amber-400" />;
            case 2: return <Medal className="w-6 h-6 text-surface-400" />;
            case 3: return <Award className="w-6 h-6 text-amber-700" />;
            default: return <span className="text-lg font-bold text-surface-400 w-6 text-center">{rank}</span>;
        }
    };

    const getRankGradient = (rank: number) => {
        switch (rank) {
            case 1: return 'from-amber-400 to-amber-600';
            case 2: return 'from-surface-300 to-surface-500';
            case 3: return 'from-amber-600 to-amber-800';
            default: return 'from-primary-400 to-primary-600';
        }
    };

    const topRankings = leaderboard.slice(0, 3);
    const podiumRankings = [topRankings[1], topRankings[0], topRankings[2]].filter(r => !!r); 

    return (
        <div className="space-y-6 animate-fade-in">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold font-display text-surface-900 dark:text-surface-100">Leaderboard</h1>
                    <p className="text-surface-500 dark:text-surface-400 mt-1">Top contributors across all colleges</p>
                </div>
                <div className="flex items-center gap-2 text-sm text-surface-500">
                    <Flame className="w-4 h-4 text-orange-500" />
                    <span>Updated live</span>
                </div>
            </div>

            {/* Top 3 Podium */}
            {!isLoading && leaderboard.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {podiumRankings.map((entry, index) => {
                        const originalIndex = leaderboard.indexOf(entry);
                        const displayRank = originalIndex + 1;
                        return (
                            <div key={entry.userId} className={`glass-card p-5 text-center hover-lift ${index === 1 ? 'lg:-mt-4' : 'mt-0'}`}>
                                <div className="relative inline-block">
                                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${getRankGradient(displayRank)} flex items-center justify-center text-white text-xl font-bold mx-auto shadow-lg`}>
                                        {entry.avatarUrl ? <img src={entry.avatarUrl} alt="" className="w-full h-full object-cover rounded-2xl" /> : entry.fullName.charAt(0)}
                                    </div>
                                    <div className="absolute -top-2 -right-2">{getRankIcon(displayRank)}</div>
                                </div>
                                <h3 className="font-semibold text-surface-900 dark:text-surface-100 mt-3">{entry.fullName}</h3>
                                <p className="text-xl font-bold gradient-text font-display mt-2">{entry.points.toLocaleString()}</p>
                                <p className="text-xs text-surface-400">points</p>
                                <div className="mt-2"><Badge variant="primary" size="sm">{entry.badges} badges</Badge></div>
                            </div>
                        );
                    })}
                </div>
            )}

            {/* Loading / Empty State */}
            {isLoading && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-48">
                    {Array(3).fill(0).map((_, i) => <div key={i} className="glass-card animate-pulse bg-surface-100 dark:bg-surface-800" />)}
                </div>
            )}

            {/* Full List */}
            <div className="glass-card overflow-hidden">
                <div className="px-6 py-4 border-b border-surface-200 dark:border-surface-700">
                    <h2 className="font-semibold text-surface-900 dark:text-surface-100">Full Rankings</h2>
                </div>
                <div className="divide-y divide-surface-100 dark:divide-surface-800">
                    {leaderboard.map((entry, index) => {
                        const rank = index + 1;
                        return (
                            <div key={entry.userId} className={`flex items-center gap-4 px-6 py-4 hover:bg-surface-50 dark:hover:bg-surface-800/50 transition-colors ${rank <= 3 ? 'bg-primary-50/30 dark:bg-primary-900/5' : ''}`}>
                                <div className="w-8 flex justify-center">{getRankIcon(rank)}</div>
                                <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${getRankGradient(rank)} flex items-center justify-center text-white font-bold text-sm overflow-hidden`}>
                                    {entry.avatarUrl ? <img src={entry.avatarUrl} alt="" className="w-full h-full object-cover" /> : entry.fullName.charAt(0)}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="font-semibold text-surface-900 dark:text-surface-100">{entry.fullName}</p>
                                </div>
                                <div className="text-sm text-surface-500">{entry.badges} badges</div>
                                <div className="text-right">
                                    <p className="font-bold text-surface-900 dark:text-surface-100">{entry.points.toLocaleString()}</p>
                                    <p className="text-xs text-surface-500">pts</p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
