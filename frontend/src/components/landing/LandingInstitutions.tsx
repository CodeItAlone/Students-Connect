'use client';

import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';

const BULLETS = [
    "Better student engagement",
    "Organised communication",
    "Club management",
    "Better visibility for opportunities",
    "Stronger campus ecosystem"
];

export default function LandingInstitutions() {
    return (
        <section className="py-24 bg-surface-50">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    {/* Left: Image Card */}
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="relative"
                    >
                        <div className="rounded-[2.5rem] overflow-hidden shadow-2xl border border-white/20">
                            <img 
                                src="/images/campus.png" 
                                alt="Modern Campus Architecture" 
                                className="w-full aspect-[4/5] object-cover transition-transform duration-700 hover:scale-105"
                            />
                        </div>
                        {/* Floating Badge */}
                        <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-3xl shadow-xl border border-surface-100 max-w-[200px] hidden md:block">
                            <p className="text-xs font-bold text-surface-400 uppercase tracking-tighter mb-1">Impact</p>
                            <p className="text-xl font-bold text-surface-900 leading-tight">Transformation of campus life.</p>
                        </div>
                    </motion.div>

                    {/* Right: Content */}
                    <motion.div
                        initial={{ opacity: 0, x: 40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <p className="text-[10px] font-bold text-primary-600 uppercase tracking-widest mb-4">
                            For Colleges & Institutions
                        </p>
                        <h2 className="text-4xl md:text-5xl font-bold text-surface-900 mb-6 tracking-tight">
                            Also valuable for institutions.
                        </h2>
                        <p className="text-lg text-surface-500 mb-10 leading-relaxed">
                            Student Connect isn't just for students — it gives clubs, admins, and placement cells a calm, structured way to reach their campus.
                        </p>

                        <ul className="space-y-4 mb-12">
                            {BULLETS.map((bullet, i) => (
                                <li key={i} className="flex items-center gap-3 text-surface-700 font-medium">
                                    <CheckCircle2 className="w-5 h-5 text-primary-500" />
                                    <span>{bullet}</span>
                                </li>
                            ))}
                        </ul>

                        <div className="flex flex-col sm:flex-row items-center gap-4">
                            <button className="w-full sm:w-auto px-8 py-3 bg-white text-surface-900 border border-surface-200 rounded-xl font-semibold hover:bg-surface-50 transition-all shadow-sm">
                                Talk to our team
                            </button>
                            <button className="w-full sm:w-auto px-8 py-3 text-surface-500 font-semibold hover:text-surface-900 transition-colors">
                                See what's included
                            </button>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
