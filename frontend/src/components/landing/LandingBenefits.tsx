'use client';

import { motion } from 'framer-motion';
import { Network, Rocket, Zap, Heart, Clock, Mail } from 'lucide-react';

const BENEFITS = [
    {
        title: 'Grow your network',
        description: 'Meet peers across departments, batches, and campuses without awkward intros.',
        icon: Network,
        label: 'Network'
    },
    {
        title: 'Build your career early',
        description: 'Discover internships, research roles, and real-world projects tied to your goals.',
        icon: Rocket,
        label: 'Career'
    },
    {
        title: 'Stay active on campus',
        description: 'Find clubs and events that genuinely match what you care about.',
        icon: Heart,
        label: 'Campus'
    },
    {
        title: 'Learn from mentors',
        description: 'Get honest advice from seniors and alumni who\'ve already walked the path.',
        icon: Zap,
        label: 'Mentorship'
    },
    {
        title: 'Save hours every week',
        description: 'Stop digging through 14 group chats. One feed, everything that matters.',
        icon: Clock,
        label: 'Focus'
    },
    {
        title: 'Stay informed',
        description: 'Official announcements and updates arrive in one clean inbox.',
        icon: Mail,
        label: 'Signal'
    }
];

export default function LandingBenefits() {
    return (
        <section className="py-24 bg-white">
            <div className="max-w-7xl mx-auto px-6">
                {/* Header */}
                <div className="mb-20">
                    <motion.p 
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-[10px] font-bold text-surface-400 uppercase tracking-widest mb-4"
                    >
                        Why Students Love It
                    </motion.p>
                    <motion.h2 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-6xl font-bold text-surface-900 mb-6 tracking-tight"
                    >
                        Built for ambitious students.
                    </motion.h2>
                    <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-lg text-surface-500 max-w-2xl leading-relaxed"
                    >
                        Designed around the way real students actually move through college — not the way institutions usually expect them to.
                    </motion.p>
                </div>

                {/* Benefits Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-16">
                    {BENEFITS.map((benefit, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="flex flex-col items-start text-left"
                        >
                            <div className="flex items-center gap-2 mb-4">
                                <benefit.icon className="w-4 h-4 text-primary-600" />
                                <span className="text-[10px] font-bold text-primary-600 uppercase tracking-widest">{benefit.label}</span>
                            </div>
                            <h3 className="text-xl font-bold text-surface-900 mb-3">{benefit.title}</h3>
                            <p className="text-base text-surface-500 leading-relaxed">
                                {benefit.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
