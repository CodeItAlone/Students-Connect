'use client';

import { useState, useMemo } from 'react';
import { Search, Calendar, MapPin, Sparkles, Clock, Users, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import { DEMO_EVENTS } from '@/lib/demoData';

const eventTypes = ['All', 'Workshop', 'Hackathon', 'Seminar', 'Competition', 'Meetup'];

export default function EventsPage() {
    const [search, setSearch] = useState('');
    const [activeType, setActiveType] = useState('All');

    // Local filtering for instant demo response
    const filteredEvents = useMemo(() => {
        return DEMO_EVENTS.filter(event => {
            const matchesSearch = event.title.toLowerCase().includes(search.toLowerCase()) || 
                                 event.description.toLowerCase().includes(search.toLowerCase());
            const matchesType = activeType === 'All' || event.type === activeType.toUpperCase();
            return matchesSearch && matchesType;
        });
    }, [search, activeType]);

    const getTypeStyles = (type: string) => {
        switch (type) {
            case 'WORKSHOP': return 'bg-blue-500';
            case 'HACKATHON': return 'bg-fuchsia-600';
            case 'SEMINAR': return 'bg-emerald-500';
            case 'COMPETITION': return 'bg-amber-500';
            case 'MEETUP': return 'bg-indigo-500';
            default: return 'bg-primary-500';
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
                        <div className="p-1.5 bg-accent-100 dark:bg-accent-900/30 rounded-lg">
                            <Sparkles className="w-5 h-5 text-accent-600 dark:text-accent-400" />
                        </div>
                        <span className="text-sm font-bold text-accent-600 dark:text-accent-400 uppercase tracking-widest">Upcoming Events</span>
                    </div>
                    <h1 className="text-4xl font-extrabold font-display text-surface-900 dark:text-surface-100 tracking-tight">
                        Experience More
                    </h1>
                    <p className="text-lg text-surface-500 dark:text-surface-400 mt-2 max-w-2xl">
                        Register for exclusive workshops, high-stakes hackathons, and networking meetups.
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
                        placeholder="Search events by title or keywords..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        leftIcon={<Search className="w-5 h-5 text-surface-400" />}
                        className="border-none focus:ring-0 text-lg py-6"
                    />
                </div>
                <div className="flex gap-2 overflow-x-auto p-2 scrollbar-hide">
                    {eventTypes.map((type) => (
                        <button
                            key={type}
                            onClick={() => setActiveType(type)}
                            className={`px-6 py-2.5 rounded-xl text-sm font-bold whitespace-nowrap transition-all duration-300 ${activeType === type
                                    ? 'bg-accent-600 text-white shadow-xl shadow-accent-500/30 scale-105'
                                    : 'bg-surface-50 dark:bg-surface-800 text-surface-600 dark:text-surface-400 hover:bg-surface-100 dark:hover:bg-surface-700'
                                }`}
                        >
                            {type}
                        </button>
                    ))}
                </div>
            </motion.div>

            {/* Event Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <AnimatePresence mode="popLayout">
                    {filteredEvents.map((event, index) => (
                        <motion.div
                            key={event.id}
                            layout
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                            transition={{ duration: 0.4, delay: index * 0.05 }}
                        >
                            <div className="group relative glass-card overflow-hidden h-full flex flex-col border border-surface-200/50 dark:border-surface-700/50 hover:border-accent-500/50 transition-all duration-500 hover:shadow-2xl hover:shadow-accent-500/10">
                                {/* Banner */}
                                <div className="h-44 relative overflow-hidden shrink-0">
                                    <div 
                                        className="absolute inset-0 bg-gradient-to-br transition-transform duration-700 group-hover:scale-110"
                                        style={{ 
                                            backgroundImage: `url(${event.bannerUrl})`, 
                                            backgroundSize: 'cover', 
                                            backgroundPosition: 'center' 
                                        }}
                                    />
                                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500" />
                                    
                                    <div className="absolute top-4 left-4 flex gap-2">
                                        <Badge variant="neutral" className={`${getTypeStyles(event.type)} border-none text-white text-[10px] uppercase font-black px-3 py-1 shadow-lg`}>
                                            {event.type}
                                        </Badge>
                                        <Badge variant="neutral" className="bg-white/90 dark:bg-surface-900/90 backdrop-blur-md border-none text-surface-900 dark:text-surface-100 text-[10px] uppercase font-black px-3 py-1">
                                            {event.mode}
                                        </Badge>
                                    </div>

                                    {event.isRsvped && (
                                        <div className="absolute top-4 right-4">
                                            <div className="bg-emerald-500 text-white p-1.5 rounded-lg shadow-lg">
                                                <Sparkles className="w-4 h-4" />
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Content */}
                                <div className="p-6 flex-1 flex flex-col">
                                    <div className="flex-1">
                                        <h3 className="text-xl font-bold text-surface-900 dark:text-surface-100 group-hover:text-accent-600 transition-colors duration-300 line-clamp-2">
                                            {event.title}
                                        </h3>
                                        <p className="text-sm text-surface-500 dark:text-surface-400 mt-2 font-bold uppercase tracking-widest flex items-center gap-2">
                                            By <span className="text-accent-600 dark:text-accent-400">{event.club?.name}</span>
                                        </p>

                                        <div className="mt-5 space-y-3">
                                            <div className="flex items-center gap-3 text-surface-600 dark:text-surface-400 bg-surface-50 dark:bg-surface-800/50 p-2.5 rounded-xl border border-surface-100 dark:border-surface-700/50">
                                                <Calendar className="w-4 h-4 text-accent-500" />
                                                <span className="text-xs font-bold font-mono uppercase tracking-tighter">
                                                    {new Date(event.startDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                                                </span>
                                                <div className="w-px h-3 bg-surface-200 dark:bg-surface-700" />
                                                <Clock className="w-4 h-4 text-accent-500 ml-1" />
                                                <span className="text-xs font-bold font-mono tracking-tighter">
                                                    {new Date(event.startDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-3 text-surface-600 dark:text-surface-400 bg-surface-50 dark:bg-surface-800/50 p-2.5 rounded-xl border border-surface-100 dark:border-surface-700/50">
                                                <MapPin className="w-4 h-4 text-accent-500" />
                                                <span className="text-xs font-bold truncate">{event.location}</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Footer */}
                                    <div className="mt-6 pt-6 border-t border-surface-100 dark:border-surface-800 flex flex-col gap-4">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                <Users className="w-4 h-4 text-surface-400" />
                                                <span className="text-xs font-bold text-surface-500 uppercase tracking-tighter">
                                                    {event.currentParticipants}/{event.maxParticipants} Registered
                                                </span>
                                            </div>
                                            <span className="text-[10px] font-black text-rose-500 uppercase tracking-tighter bg-rose-50 dark:bg-rose-950/30 px-2 py-0.5 rounded-md">
                                                {event.maxParticipants ? event.maxParticipants - event.currentParticipants : 0} Seats Left
                                            </span>
                                        </div>

                                        <Button 
                                            variant={event.isRsvped ? "secondary" : "primary"} 
                                            className={`w-full font-black uppercase text-xs tracking-widest py-4 ${!event.isRsvped && 'bg-accent-600 hover:bg-accent-700 shadow-lg shadow-accent-500/20'}`}
                                            disabled={!!event.isRsvped}
                                            rightIcon={!event.isRsvped && <ArrowRight className="w-4 h-4 ml-1" />}
                                        >
                                            {event.isRsvped ? 'Saved to Calendar' : 'Register Now'}
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            {/* Empty State */}
            {filteredEvents.length === 0 && (
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-32 bg-surface-50 dark:bg-surface-900/50 rounded-3xl border-2 border-dashed border-surface-200 dark:border-surface-800"
                >
                    <Calendar className="w-16 h-16 text-surface-300 mx-auto mb-6" />
                    <h3 className="text-2xl font-black text-surface-900 dark:text-surface-100">No events found</h3>
                    <p className="text-surface-500 max-w-sm mx-auto mt-2 font-medium">We couldn&apos;t find any events matching your request. Try a different category.</p>
                </motion.div>
            )}
        </div>
    );
}
