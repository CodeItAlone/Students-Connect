'use client';

import { useState, useEffect } from 'react';
import { Search, Filter, ChevronDown, CheckCircle2, Users, Loader2, Sparkles } from 'lucide-react';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import Link from 'next/link';
import { useClubStore } from '@/stores/clubStore';

const categories = ['All', 'Technology', 'Artificial Intelligence', 'Career Development', 'Entrepreneurship', 'Leadership', 'Arts', 'Sports'];

export default function ClubsPage() {
    const [search, setSearch] = useState('');
    const [activeCategory, setActiveCategory] = useState('All');
    const { clubs, fetchClubs, isLoading } = useClubStore();

    useEffect(() => {
        fetchClubs(0, search, activeCategory === 'All' ? '' : activeCategory);
    }, [fetchClubs, search, activeCategory]);

    const getJudgeCopy = (category: string) => {
        switch (category) {
            case 'Technology': return 'Where coders become builders.';
            case 'Artificial Intelligence': return 'Build with the future.';
            case 'Career Development': return 'Your next opportunity starts here.';
            case 'Entrepreneurship': return 'Ideas deserve execution.';
            case 'Leadership': return 'Leadership through action.';
            default: return 'Join the community and grow.';
        }
    };

    return (
        <div className="space-y-6 animate-fade-in">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <div className="flex items-center gap-2 mb-1">
                        <Sparkles className="w-4 h-4 text-primary-500" />
                        <span className="text-sm font-medium text-primary-600 dark:text-primary-400">Student Communities</span>
                    </div>
                    <h1 className="text-3xl font-bold font-display text-surface-900 dark:text-surface-100">
                        Discover Clubs
                    </h1>
                    <p className="text-surface-500 dark:text-surface-400 mt-1">
                        Find and join communities that match your ambitions
                    </p>
                </div>
            </div>

            {/* Filters */}
            <div className="flex flex-col lg:flex-row gap-4">
                <div className="flex-1">
                    <Input
                        placeholder="Search by name or description..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        leftIcon={<Search className="w-4 h-4" />}
                        className="glass-input"
                    />
                </div>
                <div className="flex gap-2 overflow-x-auto pb-2 lg:pb-0 scrollbar-hide">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all duration-200 ${activeCategory === cat
                                    ? 'bg-primary-600 text-white shadow-lg shadow-primary-500/20'
                                    : 'bg-white dark:bg-surface-800 text-surface-600 dark:text-surface-400 hover:bg-surface-50 dark:hover:bg-surface-700 border border-surface-200 dark:border-surface-700'
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            {/* Club Grid */}
            {isLoading && clubs.length === 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {Array(6).fill(0).map((_, i) => (
                        <div key={i} className="glass-card h-64 animate-pulse bg-surface-100 dark:bg-surface-800" />
                    ))}
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {clubs.map((club) => (
                        <Link key={club.id} href={`/clubs/${club.slug}`}>
                            <div className="glass-card overflow-hidden hover-lift cursor-pointer group h-full flex flex-col">
                                <div 
                                    className="h-32 bg-gradient-to-br from-primary-400 to-accent-500 relative shrink-0"
                                    style={club.bannerUrl ? { backgroundImage: `url(${club.bannerUrl})`, backgroundSize: 'cover' } : {}}
                                >
                                    <div className="absolute inset-0 bg-black/10 transition-opacity group-hover:opacity-0" />
                                    {club.verified && (
                                        <div className="absolute top-3 right-3">
                                            <Badge variant="success" size="sm" className="bg-emerald-500/90 backdrop-blur-sm border-none text-white">✓ Verified</Badge>
                                        </div>
                                    )}
                                </div>
                                <div className="p-5 flex-1 flex flex-col">
                                    <div className="flex items-start gap-3 mb-3">
                                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center text-white font-bold -mt-10 relative z-10 border-4 border-white dark:border-surface-900 shadow-xl overflow-hidden">
                                            {club.logoUrl ? <img src={club.logoUrl} alt="" className="w-full h-full object-cover" /> : club.name.charAt(0)}
                                        </div>
                                        <div className="pt-1">
                                            <h3 className="font-bold text-surface-900 dark:text-surface-100 group-hover:text-primary-600 transition-colors line-clamp-1">
                                                {club.name}
                                            </h3>
                                            <p className="text-xs font-semibold text-primary-600 dark:text-primary-400 uppercase tracking-wider">
                                                {getJudgeCopy(club.category)}
                                            </p>
                                        </div>
                                    </div>
                                    <p className="text-sm text-surface-600 dark:text-surface-400 line-clamp-2 mb-4 flex-1">
                                        {club.shortDescription || club.fullDescription}
                                    </p>
                                    <div className="flex items-center justify-between pt-4 border-t border-surface-100 dark:border-surface-800">
                                        <div className="flex items-center gap-1.5">
                                            <Users className="w-4 h-4 text-surface-400" />
                                            <span className="text-xs font-medium text-surface-500">{club.memberCount} members</span>
                                        </div>
                                        <div className="flex gap-1">
                                            {club.tags.slice(0, 2).map((tag) => (
                                                <span key={tag} className="text-[10px] font-bold px-2 py-0.5 bg-surface-100 dark:bg-surface-800 text-surface-500 rounded-md border border-surface-200 dark:border-surface-700 uppercase">{tag}</span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            )}

            {/* Empty State */}
            {!isLoading && clubs.length === 0 && (
                <div className="text-center py-20 glass-card">
                    <Search className="w-12 h-12 text-surface-300 mx-auto mb-4" />
                    <h3 className="text-lg font-bold text-surface-900 dark:text-surface-100">No clubs found</h3>
                    <p className="text-surface-500 max-w-xs mx-auto mt-2">Try adjusting your search or category filters to find what you&apos;re looking for.</p>
                    <Button 
                        variant="ghost" 
                        onClick={() => { setSearch(''); setActiveCategory('All'); }}
                        className="mt-6"
                    >
                        Clear all filters
                    </Button>
                </div>
            )}
        </div>
    );
}
