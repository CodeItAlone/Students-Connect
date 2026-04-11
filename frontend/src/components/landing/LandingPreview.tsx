'use client';

import { motion } from 'framer-motion';
import { Users, Calendar, Briefcase, ChevronRight, Star } from 'lucide-react';
import Badge from '@/components/ui/Badge';

export default function LandingPreview() {
    return (
        <section id="preview" className="py-24 bg-surface-50/50 dark:bg-surface-900/50 relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-black font-display text-surface-900 dark:text-surface-100 mb-4">
                        Experience the <span className="text-primary-600">Product.</span>
                    </h2>
                    <p className="text-lg text-surface-600 dark:text-surface-400 font-medium">
                        A clean, intuitive interface designed specifically for student engagement.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Club Card Preview */}
                    <motion.div
                        whileHover={{ y: -10 }}
                        className="glass-card p-6 border-b-4 border-primary-500 shadow-xl"
                    >
                        <div className="flex items-center justify-between mb-6">
                            <div className="w-12 h-12 rounded-xl bg-primary-600 flex items-center justify-center text-white shadow-lg shadow-primary-600/20">
                                <Users className="w-6 h-6" />
                            </div>
                            <Badge variant="accent" size="sm">Featured</Badge>
                        </div>
                        <h4 className="text-xl font-bold text-surface-900 dark:text-surface-100 mb-2">AI Innovators Circle</h4>
                        <p className="text-sm text-surface-500 mb-4">Exploring the frontiers of machine learning and large language models.</p>
                        <div className="flex items-center justify-between pt-4 border-t border-surface-100 dark:border-surface-800">
                            <span className="text-xs font-bold text-surface-400 uppercase tracking-widest">1.2K Members</span>
                            <ChevronRight className="w-5 h-5 text-primary-600" />
                        </div>
                    </motion.div>

                    {/* Event Card Preview */}
                    <motion.div
                        whileHover={{ y: -10 }}
                        className="glass-card p-6 border-b-4 border-accent-500 shadow-xl"
                    >
                        <div className="flex items-center justify-between mb-6">
                            <div className="w-12 h-12 rounded-xl bg-accent-600 flex items-center justify-center text-white shadow-lg shadow-accent-600/20">
                                <Calendar className="w-6 h-6" />
                            </div>
                            <span className="text-xs font-black text-accent-600 uppercase">Tomorrow</span>
                        </div>
                        <h4 className="text-xl font-bold text-surface-900 dark:text-surface-100 mb-2">CodeCraft Hackathon</h4>
                        <p className="text-sm text-surface-500 mb-4">48-hour build-athon with $5,000 in prizes and industry mentors.</p>
                        <div className="flex items-center justify-between pt-4 border-t border-surface-100 dark:border-surface-800">
                            <span className="text-xs font-bold text-surface-400 uppercase tracking-widest">Remote • Workshop</span>
                            <ChevronRight className="w-5 h-5 text-accent-600" />
                        </div>
                    </motion.div>

                    {/* Opportunity Card Preview */}
                    <motion.div
                        whileHover={{ y: -10 }}
                        className="glass-card p-6 border-b-4 border-emerald-500 shadow-xl"
                    >
                        <div className="flex items-center justify-between mb-6">
                            <div className="w-12 h-12 rounded-xl bg-emerald-600 flex items-center justify-center text-white shadow-lg shadow-emerald-600/20">
                                <Briefcase className="w-6 h-6" />
                            </div>
                            <div className="flex items-center gap-1">
                                <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                                <span className="text-[10px] font-bold text-surface-400 uppercase">Paid</span>
                            </div>
                        </div>
                        <h4 className="text-xl font-bold text-surface-900 dark:text-surface-100 mb-2">Frontend Engineer (Intern)</h4>
                        <p className="text-sm text-surface-500 mb-4">Join our core platform team and build features used by thousands.</p>
                        <div className="flex items-center justify-between pt-4 border-t border-surface-100 dark:border-surface-800">
                            <span className="text-xs font-bold text-surface-400 uppercase tracking-widest">TechCorp Inc.</span>
                            <ChevronRight className="w-5 h-5 text-emerald-600" />
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
