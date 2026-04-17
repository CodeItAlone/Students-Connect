'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, GraduationCap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const NAV_LINKS = [
    { label: 'Features', href: '#features' },
    { label: 'About', href: '#problem' },
    { label: 'Contact', href: '#footer' },
];

export default function LandingNavbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav
            className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
                isScrolled 
                ? 'bg-white/90 backdrop-blur-md border-b border-surface-200 py-3' 
                : 'bg-white border-b border-transparent py-5'
            }`}
        >
            <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
                {/* Logo Section */}
                <Link href="/" className="flex items-center gap-2.5 group">
                    <div className="w-10 h-10 bg-surface-900 rounded-xl flex items-center justify-center shadow-lg transition-transform group-hover:scale-105 duration-300">
                        <GraduationCap className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-xl font-bold tracking-tight">
                        <span className="text-surface-900">Student</span>
                        <span className="text-primary-600">Connect</span>
                    </span>
                </Link>

                {/* Desktop Navigation Links */}
                <div className="hidden md:flex items-center gap-10">
                    {NAV_LINKS.map((link) => (
                        <Link 
                            key={link.label} 
                            href={link.href}
                            className="text-sm font-medium text-surface-500 hover:text-surface-900 transition-colors"
                        >
                            {link.label}
                        </Link>
                    ))}
                </div>

                {/* Right CTAs */}
                <div className="hidden md:flex items-center gap-4">
                    <Link href="/login">
                        <button className="px-5 py-2 text-sm font-medium text-surface-600 hover:text-surface-900 transition-colors">
                            Login
                        </button>
                    </Link>
                    <Link href="/register">
                        <button className="px-6 py-2.5 bg-surface-900 text-white rounded-xl text-sm font-semibold hover:bg-surface-800 transition-all shadow-sm hover:shadow-md active:scale-[0.98]">
                            Get Started
                        </button>
                    </Link>
                </div>

                {/* Mobile Menu Toggle */}
                <button 
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="md:hidden p-2 text-surface-500 hover:text-surface-900 transition-colors"
                >
                    {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
            </div>

            {/* Mobile Navigation Menu */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-white border-b border-surface-200 overflow-hidden"
                    >
                        <div className="px-6 py-8 flex flex-col gap-6">
                            {NAV_LINKS.map((link) => (
                                <Link 
                                    key={link.label} 
                                    href={link.href}
                                    onClick={() => setIsMenuOpen(false)}
                                    className="text-lg font-medium text-surface-600 hover:text-surface-900 transition-colors"
                                >
                                    {link.label}
                                </Link>
                            ))}
                            <div className="flex flex-col gap-3 pt-6 border-t border-surface-100">
                                <Link href="/login" onClick={() => setIsMenuOpen(false)} className="w-full">
                                    <button className="w-full py-3 text-base font-medium text-surface-600 border border-surface-200 rounded-xl hover:bg-surface-50 transition-colors">
                                        Login
                                    </button>
                                </Link>
                                <Link href="/register" onClick={() => setIsMenuOpen(false)} className="w-full">
                                    <button className="w-full py-3 bg-surface-900 text-white rounded-xl text-base font-semibold hover:bg-surface-800 transition-colors shadow-sm">
                                        Get Started
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
