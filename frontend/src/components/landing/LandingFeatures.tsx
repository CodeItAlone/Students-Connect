'use client';

import { motion } from 'framer-motion';
import { Users, Calendar, Briefcase, GraduationCap, Trophy, Shield, Sparkles } from 'lucide-react';

const FEATURES = [
    {
        title: 'Discover Clubs',
        description: 'Join communities that match your professional and personal interests.',
        icon: Users,
        color: 'from-blue-500 to-cyan-500',
    },
    {
        title: 'Find Events',
        description: 'Hackathons, workshops, webinars, and college fests all in one calendar.',
        icon: Calendar,
        color: 'from-purple-500 to-pink-500',
    },
    {
        title: 'Opportunities Hub',
        description: 'Access curated internships, jobs, and scholarships tailored to your profile.',
        icon: Briefcase,
        color: 'from-orange-500 to-amber-500',
    },
    {
        title: 'Mentorship Network',
        description: 'Learn from seniors, alumni, and industry experts in your field.',
        icon: GraduationCap,
        color: 'from-emerald-500 to-teal-500',
    },
    {
        title: 'College Communities',
        description: 'Official college-managed spaces for notices, fests, and governance.',
        icon: Shield,
        color: 'from-indigo-500 to-blue-500',
    },
    {
        title: 'Gamified Growth',
        description: 'Grow your profile reputation and engagement through active participation.',
        icon: Trophy,
        color: 'from-rose-500 to-pink-500',
    },
];

export default function LandingFeatures() {
    return (
        <section id="features" className="py-24 relative overflow-hidden bg-surface-50/50 dark:bg-surface-900/50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
                <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 text-xs font-bold uppercase tracking-widest"
                    >
                        <Sparkles className="w-3 h-3" />
                        <span>Platform Features</span>
                    </motion.div>
                    <motion.h2 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-5xl font-black font-display text-surface-900 dark:text-surface-100"
                    >
                        Everything a Student Needs, <br />
                        <span className="text-primary-600">In One Ecosystem.</span>
                    </motion.h2>
                    <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-lg text-surface-600 dark:text-surface-400 font-medium"
                    >
                        Student Connect bridges the gap between academics and opportunities, providing a centralized hub for campus life.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {FEATURES.map((feature, index) => {
                        const Icon = feature.icon;
                        return (
                            <motion.div
                                key={feature.title}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="group p-8 rounded-[2rem] bg-white dark:bg-surface-800 border border-surface-200 dark:border-surface-700 hover:border-primary-500 dark:hover:border-primary-500 hover:shadow-2xl hover:shadow-primary-600/10 transition-all duration-500"
                            >
                                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center text-white shadow-lg mb-6 transform transition-transform group-hover:scale-110 group-hover:rotate-3`}>
                                    <Icon className="w-7 h-7" />
                                </div>
                                <h3 className="text-xl font-bold text-surface-900 dark:text-surface-100 mb-3 group-hover:text-primary-600 transition-colors">
                                    {feature.title}
                                </h3>
                                <p className="text-surface-600 dark:text-surface-400 leading-relaxed">
                                    {feature.description}
                                </p>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
