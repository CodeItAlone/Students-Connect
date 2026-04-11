'use client';

import { motion } from 'framer-motion';
import { Quote, Star } from 'lucide-react';

const TESTIMONIALS = [
    {
        name: 'Arjun Mehta',
        role: 'Student, CS Department',
        text: 'Student Connect helped me discover technical clubs and internships way faster than I expected. The interface is just so clean.',
        stars: 5,
    },
    {
        name: 'Sarah Drasner',
        role: 'Club President, AI Innovators',
        text: 'Managing club growth and communication has become effortless. We reached 200 members within the first week of joining.',
        stars: 5,
    },
    {
        name: 'Dr. Ramesh Kumar',
        role: 'Dean of Student Affairs',
        text: 'A centralized portal for all college fests and workshops. Exactly what our university needed to bridge the engagement gap.',
        stars: 5,
    },
];

export default function LandingTestimonials() {
    return (
        <section id="testimonials" className="py-24 bg-white dark:bg-surface-950">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
                <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-6">
                    <div className="max-w-xl">
                        <h2 className="text-4xl md:text-5xl font-black font-display text-surface-900 dark:text-surface-100 mb-4">
                            What Our Community <br />
                            <span className="text-primary-600">is Saying.</span>
                        </h2>
                        <p className="text-lg text-surface-600 dark:text-surface-400 font-medium">
                            Join thousands of students and educators who are already using Student Connect to transform leur campus life.
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {TESTIMONIALS.map((t, index) => (
                        <motion.div
                            key={t.name}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="p-8 rounded-[2rem] bg-surface-50 dark:bg-surface-900 border border-surface-200 dark:border-surface-800 relative hover:border-primary-500/50 transition-colors"
                        >
                            <Quote className="absolute top-6 right-8 w-12 h-12 text-primary-600/10" />
                            
                            <div className="flex gap-1 mb-6">
                                {[...Array(t.stars)].map((_, i) => (
                                    <Star key={i} className="w-4 h-4 text-amber-500 fill-amber-500" />
                                ))}
                            </div>

                            <p className="text-lg text-surface-700 dark:text-surface-300 leading-relaxed font-medium mb-8">
                                "{t.text}"
                            </p>

                            <div className="flex items-center gap-4 pt-6 border-t border-surface-200 dark:border-surface-800">
                                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-400 to-accent-400 flex items-center justify-center text-white font-bold text-xl shadow-inner">
                                    {t.name.charAt(0)}
                                </div>
                                <div>
                                    <p className="font-bold text-surface-900 dark:text-surface-100">{t.name}</p>
                                    <p className="text-xs font-bold text-surface-500 uppercase tracking-widest">{t.role}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
