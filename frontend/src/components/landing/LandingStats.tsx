'use client';

import { motion } from 'framer-motion';

const STATS = [
    { label: 'Students Connected', value: '500+' },
    { label: 'Opportunities Shared', value: '50+' },
    { label: 'Campus Clubs', value: '20+' },
    { label: 'Mentor Interactions', value: '100+' }
];

export default function LandingStats() {
    return (
        <section className="py-24 bg-white">
            <div className="max-w-7xl mx-auto px-6">
                <motion.div 
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="bg-surface-900 rounded-[3rem] p-12 md:p-20 relative overflow-hidden"
                >
                    {/* Decorative Background */}
                    <div className="absolute top-0 right-0 w-96 h-96 bg-primary-600/10 blur-[100px] rounded-full -mr-48 -mt-48" />
                    <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary-500/10 blur-[100px] rounded-full -ml-48 -mb-48" />

                    <div className="relative z-10">
                        {/* Header */}
                        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
                            <div>
                                <p className="text-[10px] font-bold text-primary-400 uppercase tracking-widest mb-4">Early Traction</p>
                                <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight max-w-xl">
                                    Real students, already finding their place.
                                </h2>
                            </div>
                            <div className="md:text-right">
                                <p className="text-sm text-surface-400 max-w-[240px] md:ml-auto">
                                    Numbers from our pilot cohort. No vanity metrics.
                                </p>
                            </div>
                        </div>

                        {/* Stats Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 sm:gap-16">
                            {STATS.map((stat, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.2 + (i * 0.1) }}
                                    className="flex flex-col gap-2"
                                >
                                    <span className="text-4xl md:text-6xl font-black text-white tracking-tighter">
                                        {stat.value}
                                    </span>
                                    <span className="text-[10px] font-bold text-surface-400 uppercase tracking-[0.2em]">
                                        {stat.label}
                                    </span>
                                    <div className="mt-4 w-8 h-[2px] bg-primary-600 opacity-50" />
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
