'use client';

import { motion } from 'framer-motion';
import { Users, Calendar, Briefcase, GraduationCap, Layout, Megaphone } from 'lucide-react';

const FEATURES = [
    {
        title: 'Clubs & Communities',
        description: 'Join the clubs that match your interests and find your people on campus.',
        icon: Users,
        id: '01'
    },
    {
        title: 'Events & Activities',
        description: 'Never miss a workshop, hackathon or fest — everything in one calendar.',
        icon: Calendar,
        id: '02'
    },
    {
        title: 'Opportunities Hub',
        description: 'Internships, jobs, scholarships and hackathons — curated for students.',
        icon: Briefcase,
        id: '03'
    },
    {
        title: 'Mentor Network',
        description: 'Get 1:1 guidance from seniors and alumni who\'ve been where you are.',
        icon: GraduationCap,
        id: '04'
    },
    {
        title: 'Smart Dashboard',
        description: 'A personalised feed that learns what matters most to your growth.',
        icon: Layout,
        id: '05'
    },
    {
        title: 'Announcements',
        description: 'Official updates from your college — without the notice-board scramble.',
        icon: Megaphone,
        id: '06'
    }
];

export default function LandingFeatures() {
    return (
        <section id="features" className="py-24 bg-white">
            <div className="max-w-7xl mx-auto px-6">
                {/* Header */}
                <div className="mb-20">
                    <motion.p 
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="text-[10px] font-bold text-primary-600 uppercase tracking-widest mb-4"
                    >
                        Features
                    </motion.p>
                    <motion.h2 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-5xl font-bold text-surface-900 mb-6 tracking-tight max-w-xl"
                    >
                        Everything students look for, in one quiet place.
                    </motion.h2>
                    <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-lg text-surface-500 max-w-2xl leading-relaxed"
                    >
                        Thoughtful tools that replace the tangle of WhatsApp groups, unread emails, and forgotten posters.
                    </motion.p>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
                    {FEATURES.map((feature, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="group relative"
                        >
                            <div className="w-12 h-12 bg-surface-50 rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary-50 transition-colors duration-300">
                                <feature.icon className="w-6 h-6 text-primary-600" />
                            </div>
                            <h3 className="text-xl font-bold text-surface-900 mb-3">{feature.title}</h3>
                            <p className="text-sm text-surface-500 leading-relaxed mb-6">
                                {feature.description}
                            </p>
                            <span className="text-[10px] font-bold text-surface-300 group-hover:text-primary-400 transition-colors">
                                {feature.id}
                                <div className="mt-1 w-8 h-[1px] bg-surface-100 group-hover:bg-primary-200 transition-colors" />
                            </span>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
