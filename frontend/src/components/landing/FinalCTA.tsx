'use client';

import { motion } from 'framer-motion';
import Button from '@/components/ui/Button';
import { ArrowRight, Sparkles } from 'lucide-react';
import Link from 'next/link';

export default function FinalCTA() {
    return (
        <section className="py-24 relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
                <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="relative rounded-[3rem] bg-gradient-to-br from-primary-600 via-primary-700 to-accent-700 p-12 md:p-20 overflow-hidden text-center shadow-2xl"
                >
                    {/* Background Visuals */}
                    <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-[80px]" />
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent-400/20 rounded-full translate-y-1/2 -translate-x-1/2 blur-[80px]" />

                    <div className="relative z-10 max-w-3xl mx-auto space-y-8">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-sm font-bold">
                            <Sparkles className="w-4 h-4 text-amber-300" />
                            <span>Available Now to All Colleges</span>
                        </div>

                        <h2 className="text-4xl md:text-6xl font-black font-display text-white leading-tight">
                            Start Building Your <br />
                            Campus Future Today.
                        </h2>

                        <p className="text-xl text-primary-100 font-medium max-w-xl mx-auto">
                            Join the fastest growing student network and unlock a world of clubs, events, and career opportunities.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                            <Link href="/signup" className="w-full sm:w-auto">
                                <Button 
                                    variant="secondary" 
                                    size="lg" 
                                    className="w-full sm:w-auto rounded-full font-bold px-12 h-16 text-xl shadow-2xl hover:scale-105 active:scale-95 transition-all"
                                    rightIcon={<ArrowRight className="w-6 h-6" />}
                                >
                                    Sign Up Free
                                </Button>
                            </Link>
                            <Link href="/login" className="w-full sm:w-auto">
                                <Button 
                                    variant="ghost" 
                                    size="lg" 
                                    className="w-full sm:w-auto text-white hover:bg-white/10 border border-white/20 rounded-full font-bold px-12 h-16 text-xl"
                                >
                                    Login
                                </Button>
                            </Link>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
