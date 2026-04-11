'use client';

import { useState, useMemo } from 'react';
import { Search, ChevronRight, CheckCircle2, Users, Sparkles, MapPin } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Input from '@/components/ui/Input';
import Badge from '@/components/ui/Badge';
import Link from 'next/link';
import { DEMO_CLUBS } from '@/lib/demoData';

const categories = ['All', 'Technology', 'Artificial Intelligence', 'Career Development', 'Entrepreneurship', 'Leadership'];

export default function ClubsPage() {
    const [search, setSearch] = useState('');
    const [activeCategory, setActiveCategory] = useState('All');

    // Local filtering for instant demo response
    const filteredClubs = useMemo(() => {
        return DEMO_CLUBS.filter(club => {
            const matchesSearch = club.name.toLowerCase().includes(search.toLowerCase()) || 
                                 club.shortDescription.toLowerCase().includes(search.toLowerCase());
            const matchesCategory = activeCategory === 'All' || club.category === activeCategory;
            return matchesSearch && matchesCategory;
        });
    }, [search, activeCategory]);

    const getCategoryStyles = (category: string) => {
        switch (category) {
            case 'Technology': return 'from-blue-500 to-indigo-600';
            case 'Artificial Intelligence': return 'from-purple-500 to-fuchsia-600';
            case 'Career Development': return 'from-emerald-500 to-teal-600';
            case 'Entrepreneurship': return 'from-amber-500 to-orange-600';
            case 'Leadership': return 'from-rose-500 to-pink-600';
            default: return 'from-primary-500 to-accent-600';
        }
    };

    return (
        <div className="space-y-8 max-w-7xl mx-auto">
            {/* Header Section */}
            <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col md:flex-row md:items-end justify-between gap-6"
            >
                <div>
                    <div className="flex items-center gap-2 mb-2">
                        <div className="p-1.5 bg-primary-100 dark:bg-primary-900/30 rounded-lg">
                            <Sparkles className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                        </div>
                        <span className="text-sm font-bold text-primary-600 dark:text-primary-400 uppercase tracking-widest">Premium Communities</span>
                    </div>
                    <h1 className="text-4xl font-extrabold font-display text-surface-900 dark:text-surface-100 tracking-tight">
                        Discover Excellence
                    </h1>
                    <p className="text-lg text-surface-500 dark:text-surface-400 mt-2 max-w-2xl">
                        Join elite student-led organizations designed to accelerate your growth and career.
                    </p>
                </div>
            </motion.div>

            {/* Filter Bar */}
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="flex flex-col lg:flex-row gap-6 bg-white dark:bg-surface-900 p-2 rounded-2xl border border-surface-100 dark:border-surface-800 shadow-sm"
            >
                <div className="flex-1">
                    <Input
                        placeholder="Search for your next community..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        leftIcon={<Search className="w-5 h-5 text-surface-400" />}
                        className="border-none focus:ring-0 text-lg py-6"
                    />
                </div>
                <div className="flex gap-2 overflow-x-auto p-2 scrollbar-hide">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={`px-6 py-2.5 rounded-xl text-sm font-bold whitespace-nowrap transition-all duration-300 ${activeCategory === cat
                                    ? 'bg-primary-600 text-white shadow-xl shadow-primary-500/30 scale-105'
                                    : 'bg-surface-50 dark:bg-surface-800 text-surface-600 dark:text-surface-400 hover:bg-surface-100 dark:hover:bg-surface-700'
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </motion.div>

            {/* Club Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                <AnimatePresence mode="popLayout">
                    {filteredClubs.map((club, index) => (
                        <motion.div
                            key={club.id}
                            layout
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                            transition={{ duration: 0.4, delay: index * 0.05 }}
                        >
                            <Link href={`/clubs/${club.slug}`} className="block h-full translate-z-0">
                                <div className="group relative glass-card overflow-hidden h-full flex flex-col border border-surface-200/50 dark:border-surface-700/50 hover:border-primary-500/50 transition-all duration-500 hover:shadow-2xl hover:shadow-primary-500/10">
                                    {/* Banner */}
                                    <div className="h-44 relative overflow-hidden shrink-0">
                                        <div 
                                            className="absolute inset-0 bg-gradient-to-br transition-transform duration-700 group-hover:scale-110"
                                            style={{ 
                                                backgroundImage: `url(${club.bannerUrl})`, 
                                                backgroundSize: 'cover', 
                                                backgroundPosition: 'center' 
                                            }}
                                        />
                                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500" />
                                        
                                        {club.verified && (
                                            <div className="absolute top-4 right-4">
                                                <div className="flex items-center gap-1.5 px-3 py-1 bg-white/90 dark:bg-surface-900/90 backdrop-blur-md rounded-full border border-white/20 shadow-lg">
                                                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                                                    <span className="text-[10px] font-bold text-surface-900 dark:text-surface-100 uppercase tracking-tighter">Verified</span>
                                                </div>
                                            </div>
                                        )}
                                        
                                        <div className="absolute bottom-4 left-4">
                                            <Badge variant="neutral" className="bg-white/20 backdrop-blur-md border-none text-white text-[10px] uppercase font-bold px-3 py-1">
                                                {club.category}
                                            </Badge>
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="p-6 flex-1 flex flex-col relative">
                                        {/* Avatar Overflow */}
                                        <div className="absolute -top-10 left-6">
                                            <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${getCategoryStyles(club.category)} flex items-center justify-center text-white text-3xl font-black shadow-2xl border-4 border-white dark:border-surface-900 overflow-hidden`}>
                                                {club.logoUrl ? <img src={club.logoUrl} alt="" className="w-full h-full object-cover" /> : club.name.charAt(0)}
                                            </div>
                                        </div>

                                        <div className="mt-12 flex-1">
                                            <h3 className="text-2xl font-bold text-surface-900 dark:text-surface-100 group-hover:text-primary-600 transition-colors duration-300">
                                                {club.name}
                                            </h3>
                                            <div className="flex items-center gap-2 text-primary-500 mt-1 mb-4">
                                                <MapPin className="w-3.5 h-3.5" />
                                                <span className="text-xs font-bold uppercase tracking-widest">{club.college}</span>
                                            </div>
                                            <p className="text-surface-600 dark:text-surface-400 font-medium leading-relaxed line-clamp-3">
                                                {club.shortDescription}
                                            </p>
                                        </div>

                                        {/* Tags & Stats */}
                                        <div className="mt-6 pt-6 border-t border-surface-100 dark:border-surface-800 flex items-center justify-between">
                                            <div className="flex items-center gap-2 bg-surface-50 dark:bg-surface-800 px-3 py-1.5 rounded-xl border border-surface-100 dark:border-surface-700">
                                                <Users className="w-4 h-4 text-primary-500" />
                                                <span className="text-sm font-black text-surface-900 dark:text-surface-100">{club.memberCount}</span>
                                                <span className="text-xs text-surface-500 font-bold uppercase tracking-tighter">Members</span>
                                            </div>
                                            <div className="flex items-center gap-1 font-bold text-primary-600 text-sm group-hover:translate-x-1 transition-transform">
                                                Explore <ChevronRight className="w-4 h-4" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            {/* Empty State */}
            {filteredClubs.length === 0 && (
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-32 bg-surface-50 dark:bg-surface-900/50 rounded-3xl border-2 border-dashed border-surface-200 dark:border-surface-800"
                >
                    <Search className="w-16 h-16 text-surface-300 mx-auto mb-6" />
                    <h3 className="text-2xl font-black text-surface-900 dark:text-surface-100">No matches found</h3>
                    <p className="text-surface-500 max-w-sm mx-auto mt-2 font-medium">We couldn&apos;t find any clubs matching &quot;{search}&quot;. Try broadening your search.</p>
                </motion.div>
            )}
        </div>
    );
}
