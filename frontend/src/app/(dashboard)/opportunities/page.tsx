'use client';

import { useState, useMemo } from 'react';
import { Search, Briefcase, MapPin, Clock, ExternalLink, Sparkles, Building2, TrendingUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import { DEMO_OPPORTUNITIES } from '@/lib/demoData';

const types = ['All', 'Internship', 'Job', 'Research', 'Volunteer'];

export default function OpportunitiesPage() {
    const [search, setSearch] = useState('');
    const [activeType, setActiveType] = useState('All');

    // Local filtering for instant demo response
    const filteredOpps = useMemo(() => {
        return DEMO_OPPORTUNITIES.filter(opp => {
            const matchesSearch = opp.title.toLowerCase().includes(search.toLowerCase()) || 
                                 opp.company!.toLowerCase().includes(search.toLowerCase()) ||
                                 opp.description.toLowerCase().includes(search.toLowerCase());
            const matchesType = activeType === 'All' || opp.type === activeType.toUpperCase();
            return matchesSearch && matchesType;
        });
    }, [search, activeType]);

    const getTypeStyles = (type: string) => {
        switch (type) {
            case 'INTERNSHIP': return 'from-primary-500 to-indigo-600';
            case 'JOB': return 'from-accent-500 to-fuchsia-600';
            case 'RESEARCH': return 'from-emerald-500 to-teal-600';
            case 'VOLUNTEER': return 'from-amber-500 to-orange-600';
            default: return 'from-surface-500 to-surface-700';
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
                        <div className="p-1.5 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg">
                            <TrendingUp className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                        </div>
                        <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest">Career Launchpad</span>
                    </div>
                    <h1 className="text-4xl font-extrabold font-display text-surface-900 dark:text-surface-100 tracking-tight">
                        Launch Your Future
                    </h1>
                    <p className="text-lg text-surface-500 dark:text-surface-400 mt-2 max-w-2xl">
                        Hand-picked internships, research roles, and jobs from industry leaders and startups.
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
                        placeholder="Search by role, company name, or talent..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        leftIcon={<Search className="w-5 h-5 text-surface-400" />}
                        className="border-none focus:ring-0 text-lg py-6"
                    />
                </div>
                <div className="flex gap-2 overflow-x-auto p-2 scrollbar-hide">
                    {types.map((type) => (
                        <button
                            key={type}
                            onClick={() => setActiveType(type)}
                            className={`px-6 py-2.5 rounded-xl text-sm font-bold whitespace-nowrap transition-all duration-300 ${activeType === type
                                    ? 'bg-emerald-600 text-white shadow-xl shadow-emerald-500/30 scale-105'
                                    : 'bg-surface-50 dark:bg-surface-800 text-surface-600 dark:text-surface-400 hover:bg-surface-100 dark:hover:bg-surface-700'
                                }`}
                        >
                            {type}
                        </button>
                    ))}
                </div>
            </motion.div>

            {/* Opportunity List */}
            <div className="space-y-6">
                <AnimatePresence mode="popLayout">
                    {filteredOpps.map((opp, index) => (
                        <motion.div
                            key={opp.id}
                            layout
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.3, delay: index * 0.05 }}
                        >
                            <div className="group relative glass-card p-6 flex flex-col md:flex-row gap-6 border border-surface-200/50 dark:border-surface-700/50 hover:border-emerald-500/50 transition-all duration-500 hover:shadow-xl hover:shadow-emerald-500/5">
                                {/* Company Logo/Icon */}
                                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${getTypeStyles(opp.type)} flex items-center justify-center text-white shrink-0 shadow-lg group-hover:scale-110 transition-transform duration-500`}>
                                    {opp.company === 'Google' ? <Building2 className="w-8 h-8" /> : 
                                     opp.company === 'Amazon' ? <Briefcase className="w-8 h-8" /> : 
                                     <Building2 className="w-8 h-8" />}
                                </div>

                                {/* Content */}
                                <div className="flex-1 min-w-0">
                                    <div className="flex flex-wrap items-start justify-between gap-3 mb-2">
                                        <div>
                                            <h3 className="text-xl font-bold text-surface-900 dark:text-surface-100 group-hover:text-emerald-600 transition-colors">
                                                {opp.title}
                                            </h3>
                                            <div className="flex items-center gap-2 mt-1">
                                                <span className="text-sm font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-widest">{opp.company}</span>
                                                <div className="w-1 h-1 rounded-full bg-surface-300 dark:bg-surface-600" />
                                                <div className="flex items-center gap-1.5 text-surface-500">
                                                    <MapPin className="w-3.5 h-3.5" />
                                                    <span className="text-xs font-bold">{opp.location}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <Badge variant="neutral" className={`${getTypeStyles(opp.type).replace('from-', 'bg-')} border-none text-white text-[10px] uppercase font-black px-4 py-1.5`}>
                                            {opp.type}
                                        </Badge>
                                    </div>

                                    <p className="text-surface-600 dark:text-surface-400 text-sm font-medium line-clamp-2 leading-relaxed mb-4">
                                        {opp.description}
                                    </p>

                                    <div className="flex flex-wrap gap-4 items-center">
                                        <div className="flex items-center gap-2 text-surface-500 bg-surface-50 dark:bg-surface-800/50 px-3 py-1.5 rounded-lg border border-surface-100 dark:border-surface-700">
                                            <Clock className="w-3.5 h-3.5 text-emerald-500" />
                                            <span className="text-[10px] font-bold uppercase tracking-tighter">Deadline: {new Date(opp.deadline!).toLocaleDateString()}</span>
                                        </div>
                                        {opp.isRemote && (
                                            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400 rounded-lg border border-emerald-100 dark:border-emerald-900/50">
                                                <Sparkles className="w-3.5 h-3.5" />
                                                <span className="text-[10px] font-black uppercase tracking-widest">Remote Ready</span>
                                            </div>
                                        )}
                                        <div className="flex gap-1.5">
                                            {opp.tags.map(tag => (
                                                <span key={tag} className="text-[10px] font-bold px-2.5 py-1.5 bg-surface-100 dark:bg-surface-800 text-surface-500 rounded-lg border border-surface-200 dark:border-surface-700 uppercase">
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Action */}
                                <div className="flex items-center justify-end shrink-0">
                                    <a href={opp.applicationUrl} target="_blank" rel="noopener noreferrer" className="w-full md:w-auto">
                                        <Button 
                                            variant="primary" 
                                            className="w-full md:w-auto bg-emerald-600 hover:bg-emerald-700 shadow-xl shadow-emerald-500/20 font-black uppercase text-xs tracking-widest px-8 py-4"
                                            rightIcon={<ExternalLink className="w-4 h-4 ml-2" />}
                                        >
                                            Apply Now
                                        </Button>
                                    </a>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            {/* Empty State */}
            {filteredOpps.length === 0 && (
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-32 bg-surface-50 dark:bg-surface-900/50 rounded-3xl border-2 border-dashed border-surface-200 dark:border-surface-800"
                >
                    <Briefcase className="w-16 h-16 text-surface-300 mx-auto mb-6" />
                    <h3 className="text-2xl font-black text-surface-900 dark:text-surface-100">No opportunities found</h3>
                    <p className="text-surface-500 max-w-sm mx-auto mt-2 font-medium">Try searching for a specific company or role title.</p>
                </motion.div>
            )}
        </div>
    );
}
