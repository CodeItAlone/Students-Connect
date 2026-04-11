'use client';

import { motion } from 'framer-motion';
import { Users, Layout, Calendar, Heart } from 'lucide-react';

const STATS = [
    { label: 'Students Joined', value: '1,200+', icon: Users, color: 'text-blue-600' },
    { label: 'Active Clubs', value: '45+', icon: Layout, color: 'text-purple-600' },
    { label: 'Events Hosted', value: '250+', icon: Calendar, color: 'text-emerald-600' },
    { label: 'Community Vibes', value: '100%', icon: Heart, color: 'text-rose-600' },
];

export default function LandingStats() {
    return (
        <section className="py-20 relative bg-primary-600 dark:bg-primary-950 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary-600 to-accent-700 opacity-90" />
            
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 text-center">
                    {STATS.map((stat, index) => {
                        const Icon = stat.icon;
                        return (
                            <motion.div
                                key={stat.label}
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="space-y-4"
                            >
                                <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center mx-auto text-white shadow-xl border border-white/10">
                                    <Icon className="w-8 h-8" />
                                </div>
                                <div>
                                    <p className="text-3xl md:text-5xl font-black text-white font-display mb-1">{stat.value}</p>
                                    <p className="text-xs md:text-sm font-bold text-primary-100 uppercase tracking-[0.2em]">{stat.label}</p>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
