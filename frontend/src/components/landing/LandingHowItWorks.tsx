'use client';

import { motion } from 'framer-motion';
import { UserCircle2, Compass, Rocket } from 'lucide-react';

const STEPS = [
    {
        title: 'Create Your Profile',
        description: 'Set up your unique academic profile, interests, and skills to personalize your discovery feed.',
        icon: UserCircle2,
        color: 'bg-blue-500',
    },
    {
        title: 'Join & Explore',
        description: 'Discover clubs, join events, and browse internships that align with your career goals.',
        icon: Compass,
        color: 'bg-purple-500',
    },
    {
        title: 'Network & Grow',
        description: 'Connect with mentors, build your reputation, and unlock exclusive opportunities.',
        icon: Rocket,
        color: 'bg-emerald-500',
    },
];

export default function LandingHowItWorks() {
    return (
        <section id="how-it-works" className="py-24 bg-white dark:bg-surface-950">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
                <div className="text-center mb-20">
                    <motion.h2 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-5xl font-black font-display text-surface-900 dark:text-surface-100 mb-4"
                    >
                        Your Journey to <br />
                        <span className="text-primary-600">Growth.</span>
                    </motion.h2>
                    <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-lg text-surface-600 dark:text-surface-400 font-medium max-w-2xl mx-auto"
                    >
                        Success on Student Connect is as easy as 1-2-3. Start your campus revolution today.
                    </motion.p>
                </div>

                <div className="relative">
                    {/* Connection Line (Desktop) */}
                    <div className="hidden lg:block absolute top-[15%] left-[10%] right-[10%] h-0.5 bg-gradient-to-r from-blue-500 via-purple-500 to-emerald-500 opacity-20" />

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-8">
                        {STEPS.map((step, index) => {
                            const Icon = step.icon;
                            return (
                                <motion.div
                                    key={step.title}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.2 }}
                                    className="relative flex flex-col items-center text-center group"
                                >
                                    {/* Step Number Badge */}
                                    <div className="absolute -top-4 -left-4 lg:left-1/2 lg:-translate-x-1/2 w-10 h-10 rounded-full bg-white dark:bg-surface-800 border-2 border-primary-100 dark:border-primary-900 shadow-lg flex items-center justify-center text-sm font-black text-primary-600 z-10">
                                        0{index + 1}
                                    </div>

                                    {/* Icon Container */}
                                    <div className={`w-28 h-28 rounded-[2.5rem] ${step.color} flex items-center justify-center text-white shadow-2xl mb-8 transform transition-transform group-hover:scale-110 duration-500 group-hover:rotate-6`}>
                                        <Icon className="w-12 h-12" />
                                    </div>

                                    <h3 className="text-2xl font-bold text-surface-900 dark:text-surface-100 mb-4">
                                        {step.title}
                                    </h3>
                                    <p className="text-surface-600 dark:text-surface-400 leading-relaxed font-medium">
                                        {step.description}
                                    </p>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}
