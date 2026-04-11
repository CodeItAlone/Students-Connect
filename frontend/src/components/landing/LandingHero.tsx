'use client';

import { motion } from 'framer-motion';
import Button from '@/components/ui/Button';
import { ArrowRight, Sparkles, Shield, UserPlus } from 'lucide-react';
import Link from 'next/link';

export default function LandingHero() {
    return (
        <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
            {/* Background Decorative Elements */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary-500/10 blur-[120px] rounded-full" />
                <div className="absolute bottom-[10%] right-[-10%] w-[40%] h-[40%] bg-accent-500/10 blur-[120px] rounded-full" />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
                    {/* Left Content */}
                    <div className="text-center lg:text-left space-y-8 max-w-2xl mx-auto lg:mx-0">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-50 dark:bg-primary-900/20 border border-primary-100 dark:border-primary-900/30 text-primary-600 dark:text-primary-400 text-sm font-bold animate-pulse-soft"
                        >
                            <Sparkles className="w-4 h-4" />
                            <span>Empowering the Student Ecosystem</span>
                        </motion.div>

                        <motion.h1 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            className="text-5xl md:text-7xl font-black font-display tracking-tight leading-[1.1] text-surface-900 dark:text-surface-100"
                        >
                            One Platform.<br />
                            <span className="bg-gradient-to-r from-primary-600 via-primary-500 to-accent-600 bg-clip-text text-transparent">Every Opportunity.</span>
                        </motion.h1>

                        <motion.p 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="text-lg md:text-xl text-surface-600 dark:text-surface-400 leading-relaxed font-medium max-w-xl mx-auto lg:mx-0"
                        >
                            Connect students, clubs, colleges, mentors, and careers in one modern campus ecosystem designed for growth.
                        </motion.p>

                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                            className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start pt-4"
                        >
                            <Link href="/signup" className="w-full sm:w-auto">
                                <Button 
                                    variant="primary" 
                                    size="lg" 
                                    className="w-full sm:w-auto rounded-full font-bold px-10 h-14 text-lg shadow-xl shadow-primary-600/20 hover:scale-105 active:scale-95 transition-all"
                                    rightIcon={<ArrowRight className="w-5 h-5" />}
                                >
                                    Get Started
                                </Button>
                            </Link>
                            <Link href="/login" className="w-full sm:w-auto">
                                <Button 
                                    variant="secondary" 
                                    size="lg" 
                                    className="w-full sm:w-auto rounded-full font-bold px-10 h-14 text-lg"
                                >
                                    Login
                                </Button>
                            </Link>
                        </motion.div>

                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5, delay: 0.5 }}
                            className="flex items-center justify-center lg:justify-start gap-4 text-xs font-bold text-surface-400 uppercase tracking-widest pt-6"
                        >
                            <span className="flex items-center gap-1.5"><Shield className="w-3.5 h-3.5" /> Trusted by Colleges</span>
                            <span className="w-1.5 h-1.5 rounded-full bg-surface-200 dark:bg-surface-800" />
                            <span className="flex items-center gap-1.5"><UserPlus className="w-3.5 h-3.5" /> 1000+ Students</span>
                        </motion.div>
                    </div>

                    {/* Right Visual */}
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                        className="relative hidden lg:block"
                    >
                        <div className="relative z-10 p-4 bg-white/5 backdrop-blur-3xl rounded-[2.5rem] border border-white/10 shadow-2xl overflow-hidden group">
                            <img 
                                src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=1200" 
                                alt="Dashboard Preview" 
                                className="rounded-[2rem] w-full aspect-[4/3] object-cover shadow-2xl transition-transform duration-700 group-hover:scale-105"
                            />
                            
                            {/* Floating Card: Stats */}
                            <motion.div 
                                animate={{ y: [0, -10, 0] }}
                                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                className="absolute top-10 -left-10 glass-card p-4 shadow-2xl border border-white/20 animate-fade-in"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-lg bg-emerald-500 flex items-center justify-center text-white">
                                        <Sparkles className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-bold text-surface-500 uppercase tracking-wider">Engagement</p>
                                        <p className="text-lg font-black text-surface-900 dark:text-surface-100">+450%</p>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Floating Card: Users */}
                            <motion.div 
                                animate={{ y: [0, 10, 0] }}
                                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                                className="absolute bottom-10 -right-10 glass-card p-4 shadow-2xl border border-white/20 animate-fade-in"
                            >
                                <div className="flex -space-x-3 mb-2">
                                    {[1,2,3,4].map(i => (
                                        <div key={i} className="w-8 h-8 rounded-full border-2 border-white dark:border-surface-900 bg-surface-200" />
                                    ))}
                                    <div className="w-8 h-8 rounded-full border-2 border-white dark:border-surface-900 bg-primary-600 flex items-center justify-center text-[10px] text-white font-bold">+12</div>
                                </div>
                                <p className="text-[10px] font-bold text-surface-500 uppercase tracking-wider">Active Members</p>
                            </motion.div>
                        </div>

                        {/* Background Glow */}
                        <div className="absolute inset-0 bg-primary-600/20 blur-[100px] -z-10 rounded-full scale-75 pt-20" />
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
