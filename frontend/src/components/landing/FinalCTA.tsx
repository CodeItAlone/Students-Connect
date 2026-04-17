'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function FinalCTA() {
    return (
        <section className="py-24 bg-white">
            <div className="max-w-7xl mx-auto px-6">
                <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="bg-primary-50 rounded-[3rem] p-12 md:p-24 text-center relative overflow-hidden"
                >
                    {/* Background Accents */}
                    <div className="absolute top-0 left-0 w-64 h-64 bg-primary-200/30 blur-[80px] rounded-full -ml-32 -mt-32" />
                    <div className="absolute bottom-0 right-0 w-64 h-64 bg-primary-300/20 blur-[80px] rounded-full -mr-32 -mb-32" />

                    <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center">
                        <p className="text-[10px] font-bold text-primary-600 uppercase tracking-widest mb-6">Your Move</p>
                        
                        <h2 className="text-4xl md:text-6xl font-bold text-surface-900 tracking-tight leading-[1.1] mb-8">
                            Your college journey deserves more than <span className="font-serif italic font-light italic text-primary-600">scattered groups.</span>
                        </h2>

                        <p className="text-lg text-surface-500 mb-10 leading-relaxed">
                            Join Student Connect and unlock your campus potential — discover clubs, mentors, events, and opportunities that actually fit you.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
                            <Link href="/register" className="w-full sm:w-auto">
                                <button className="w-full sm:w-auto px-10 py-4 bg-primary-600 text-white rounded-xl text-lg font-semibold hover:bg-primary-700 transition-all shadow-lg shadow-primary-600/20">
                                    Get Started
                                </button>
                            </Link>
                            <Link href="/login" className="w-full sm:w-auto">
                                <button className="w-full sm:w-auto px-10 py-4 bg-white text-surface-900 border border-surface-200 rounded-xl text-lg font-semibold hover:bg-surface-50 transition-all">
                                    Login
                                </button>
                            </Link>
                        </div>

                        <p className="mt-8 text-sm text-surface-400">
                            Free for students · Built with campus communities in mind
                        </p>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
