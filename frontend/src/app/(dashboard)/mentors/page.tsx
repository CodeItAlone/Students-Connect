'use client';

import { useState, useMemo } from 'react';
import { Search, Star, MessageSquare, Sparkles, MapPin, Zap, CalendarDays } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import { DEMO_MENTORS } from '@/lib/demoData';

export default function MentorsPage() {
    const [search, setSearch] = useState('');

    // Local filtering for instant demo response
    const filteredMentors = useMemo(() => {
        return DEMO_MENTORS.filter((m) =>
            m.user.fullName.toLowerCase().includes(search.toLowerCase()) ||
            m.expertise.some((e) => e.toLowerCase().includes(search.toLowerCase()))
        );
    }, [search]);

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
                        <div className="p-1.5 bg-amber-100 dark:bg-amber-900/30 rounded-lg">
                            <Zap className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                        </div>
                        <span className="text-sm font-bold text-amber-600 dark:text-amber-400 uppercase tracking-widest">Expert Guidance</span>
                    </div>
                    <h1 className="text-4xl font-extrabold font-display text-surface-900 dark:text-surface-100 tracking-tight">
                        Connect with Mentors
                    </h1>
                    <p className="text-lg text-surface-500 dark:text-surface-400 mt-2 max-w-2xl">
                        Schedule 1-on-1 sessions with industry experts and alumni who have been in your shoes.
                    </p>
                </div>
            </motion.div>

            {/* Search Bar */}
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="bg-white dark:bg-surface-900 p-2 rounded-2xl border border-surface-100 dark:border-surface-800 shadow-sm"
            >
                <Input
                    placeholder="Search by name, company, or expertise (e.g., 'React', 'Google')..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    leftIcon={<Search className="w-5 h-5 text-surface-400" />}
                    className="border-none focus:ring-0 text-lg py-6"
                />
            </motion.div>

            {/* Mentor Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                <AnimatePresence mode="popLayout">
                    {filteredMentors.map((mentor, index) => (
                        <motion.div
                            key={mentor.id}
                            layout
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                            transition={{ duration: 0.4, delay: index * 0.05 }}
                        >
                            <div className="group glass-card p-6 h-full flex flex-col border border-surface-200/50 dark:border-surface-700/50 hover:border-amber-500/50 transition-all duration-500 hover:shadow-2xl hover:shadow-amber-500/10">
                                <div className="flex items-start gap-4">
                                    <div className="relative shrink-0">
                                        <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-600 p-0.5 shadow-xl group-hover:rotate-3 transition-transform duration-500">
                                            <div className="w-full h-full rounded-[14px] bg-white dark:bg-surface-900 overflow-hidden">
                                                {mentor.user.avatarUrl ? (
                                                    <img src={mentor.user.avatarUrl} alt="" className="w-full h-full object-cover" />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center font-black text-2xl text-amber-600">
                                                        {mentor.user.fullName.charAt(0)}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                        <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-500 rounded-full border-4 border-white dark:border-surface-900 shadow-lg" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-1.5 font-black text-xl text-surface-900 dark:text-surface-100 group-hover:text-amber-600 transition-colors">
                                            {mentor.user.fullName}
                                            <Sparkles className="w-4 h-4 text-amber-500" />
                                        </div>
                                        <p className="text-sm font-bold text-surface-500 dark:text-surface-400 mt-0.5 flex items-center gap-1.5 uppercase tracking-wider">
                                            <MapPin className="w-3.5 h-3.5 text-amber-500" />
                                            {mentor.user.college}
                                        </p>
                                        <div className="flex items-center gap-1.5 mt-2 bg-amber-50 dark:bg-amber-950/30 w-fit px-2 py-1 rounded-lg border border-amber-100 dark:border-amber-900/50">
                                            <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                                            <span className="text-xs font-black text-amber-700 dark:text-amber-400">{mentor.rating}</span>
                                            <span className="text-[10px] text-amber-600 dark:text-amber-500 font-bold uppercase tracking-tighter">({mentor.totalSessions} sessions)</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-6 flex-1">
                                    <p className="text-sm text-surface-600 dark:text-surface-400 font-medium leading-relaxed line-clamp-3">
                                        {mentor.bio}
                                    </p>
                                    <div className="flex flex-wrap gap-1.5 mt-5">
                                        {mentor.expertise.map((skill) => (
                                            <Badge key={skill} variant="neutral" className="bg-surface-100 dark:bg-surface-800 border-none text-surface-600 dark:text-surface-400 text-[10px] font-black uppercase tracking-widest px-2.5 py-1">
                                                {skill}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>

                                <div className="mt-8 flex gap-3">
                                    <Button 
                                        variant="primary" 
                                        className="flex-1 bg-amber-600 hover:bg-amber-700 shadow-xl shadow-amber-500/20 font-black uppercase text-xs tracking-widest py-4"
                                        leftIcon={<CalendarDays className="w-4 h-4 mr-1" />}
                                    >
                                        Book Session
                                    </Button>
                                    <Button 
                                        variant="ghost" 
                                        className="border-surface-200 dark:border-surface-700 font-black uppercase text-xs tracking-widest"
                                    >
                                        <MessageSquare className="w-4 h-4" />
                                    </Button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            {/* Empty State */}
            {filteredMentors.length === 0 && (
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-32 bg-surface-50 dark:bg-surface-900/50 rounded-3xl border-2 border-dashed border-surface-200 dark:border-surface-800"
                >
                    <Star className="w-16 h-16 text-surface-300 mx-auto mb-6" />
                    <h3 className="text-2xl font-black text-surface-900 dark:text-surface-100">No mentors found</h3>
                    <p className="text-surface-500 max-w-sm mx-auto mt-2 font-medium">Try searching for a specific expertise like &quot;React&quot; or &quot;Design&quot;.</p>
                </motion.div>
            )}
        </div>
    );
}
