'use client';

import { motion } from 'framer-motion';
import { MessageSquare, Users, Calendar, UserCheck, Layout, ArrowDown } from 'lucide-react';

const PROBLEMS = [
    {
        icon: MessageSquare,
        text: "Opportunities get missed in WhatsApp chaos."
    },
    {
        icon: Users,
        text: "Clubs struggle to reach the right students."
    },
    {
        icon: Calendar,
        text: "Events are hard to discover — until they're over."
    },
    {
        icon: UserCheck,
        text: "Mentorship feels inaccessible to most."
    },
    {
        icon: Layout,
        text: "Information is scattered across noticeboards and DMs."
    }
];

export default function LandingProblem() {
    return (
        <section id="problem" className="py-24 bg-surface-50">
            <div className="max-w-7xl mx-auto px-6 text-center">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-16"
                >
                    <p className="text-[10px] font-bold text-surface-400 uppercase tracking-widest mb-4">The Problem</p>
                    <h2 className="text-4xl md:text-6xl font-bold text-surface-900 mb-6 tracking-tight">
                        Campus life is <span className="font-serif italic font-light text-surface-500">fragmented.</span>
                    </h2>
                    <p className="max-w-2xl mx-auto text-lg text-surface-500 leading-relaxed">
                        Between unread group chats, outdated notice boards, and dozens of scattered links, the best of college is hiding in plain sight.
                    </p>
                </motion.div>

                {/* Problem Cards Grid */}
                <div className="flex flex-wrap justify-center gap-6 mb-20">
                    {PROBLEMS.map((problem, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="bg-white border border-surface-200 p-6 rounded-2xl flex items-center gap-4 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 max-w-sm"
                        >
                            <div className="w-10 h-10 bg-surface-50 rounded-xl flex items-center justify-center flex-shrink-0">
                                <problem.icon className="w-5 h-5 text-surface-400" />
                            </div>
                            <p className="text-sm font-medium text-surface-600 text-left leading-snug">
                                {problem.text}
                            </p>
                        </motion.div>
                    ))}
                </div>

                {/* Arrow & Bottom Statement */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="flex flex-col items-center gap-8"
                >
                    <ArrowDown className="w-6 h-6 text-surface-300 animate-bounce" />
                    <h3 className="text-3xl md:text-5xl font-bold text-surface-900 tracking-tight">
                        Student Connect brings <span className="text-primary-600">everything together.</span>
                    </h3>
                </motion.div>
            </div>
        </section>
    );
}
