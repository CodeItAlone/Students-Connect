'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, ArrowRight } from 'lucide-react';
import Button from '@/components/ui/Button';
import { motion, AnimatePresence } from 'framer-motion';

const NAV_LINKS = [
    { label: 'Features', href: '#features' },
    { label: 'How It Works', href: '#how-it-works' },
    { label: 'Showcase', href: '#preview' },
    { label: 'Testimonials', href: '#testimonials' },
];

export default function LandingNavbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav
            className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
                isScrolled 
                ? 'py-3 bg-white/80 dark:bg-surface-950/80 backdrop-blur-xl border-b border-surface-200 dark:border-surface-800 shadow-glass-sm' 
                : 'py-6 bg-transparent'
            }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2 group">
                    <div className="w-10 h-10 rounded-xl overflow-hidden shadow-lg border border-white/20 transform transition-transform group-hover:scale-105 duration-300">
                        <img src="/logo.jpg" alt="Student Connect" className="w-full h-full object-cover" />
                    </div>
                    <span className="text-xl font-black font-display tracking-tight bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">
                        Student Connect
                    </span>
                </Link>

                {/* Desktop Links */}
                <div className="hidden md:flex items-center gap-8">
                    {NAV_LINKS.map((link) => (
                        <Link 
                            key={link.label} 
                            href={link.href}
                            className="text-sm font-bold text-surface-600 dark:text-surface-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                        >
                            {link.label}
                        </Link>
                    ))}
                </div>

                {/* Desktop Auth */}
                <div className="hidden md:flex items-center gap-3">
                    <Link href="/login">
                        <Button variant="ghost" className="rounded-full font-bold">Login</Button>
                    </Link>
                    <Link href="/register">
                        <Button variant="primary" className="rounded-full font-bold px-6 shadow-glow hover:scale-105 transition-all" rightIcon={<ArrowRight className="w-4 h-4" />}>
                            Sign Up
                        </Button>
                    </Link>
                </div>

                {/* Mobile Menu Toggle */}
                <button 
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="md:hidden p-2 text-surface-600 dark:text-surface-400"
                >
                    {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
            </div>

            {/* Mobile Sidebar/Drawer */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="absolute top-full inset-x-0 bg-white dark:bg-surface-900 border-b border-surface-200 dark:border-surface-800 p-6 md:hidden shadow-2xl"
                    >
                        <div className="flex flex-col gap-5">
                            {NAV_LINKS.map((link) => (
                                <Link 
                                    key={link.label} 
                                    href={link.href}
                                    onClick={() => setIsMenuOpen(false)}
                                    className="text-lg font-bold text-surface-700 dark:text-surface-300"
                                >
                                    {link.label}
                                </Link>
                            ))}
                            <div className="grid grid-cols-2 gap-3 pt-4 border-t border-surface-100 dark:border-surface-800">
                                <Link href="/login" onClick={() => setIsMenuOpen(false)}>
                                    <Button variant="secondary" className="w-full rounded-full font-bold">Login</Button>
                                </Link>
                                <Link href="/register" onClick={() => setIsMenuOpen(false)}>
                                    <Button variant="primary" className="w-full rounded-full font-bold">Sign Up</Button>
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
