'use client';

import Link from 'next/link';

export default function LandingFooter() {
    return (
        <footer className="bg-surface-50 dark:bg-surface-900 border-t border-surface-200 dark:border-surface-800 pt-20 pb-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-12 mb-16">
                    {/* Brand */}
                    <div className="col-span-2 lg:col-span-2 space-y-6">
                        <Link href="/" className="flex items-center gap-2 group">
                            <div className="w-10 h-10 rounded-xl overflow-hidden shadow-lg border border-white/20">
                                <img src="/logo.jpg" alt="Student Connect" className="w-full h-full object-cover" />
                            </div>
                            <span className="text-xl font-black font-display tracking-tight text-surface-900 dark:text-surface-100">
                                Student Connect
                            </span>
                        </Link>
                        <p className="text-surface-500 dark:text-surface-400 font-medium max-w-xs leading-relaxed">
                            The all-in-one ecosystem for students, colleges, and communities. Where growth meets opportunity.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div className="space-y-6">
                        <h4 className="text-sm font-black text-surface-900 dark:text-surface-100 uppercase tracking-widest">Platform</h4>
                        <ul className="space-y-4">
                            <li><Link href="#features" className="text-sm font-medium text-surface-500 hover:text-primary-600 transition-colors">Features</Link></li>
                            <li><Link href="#how-it-works" className="text-sm font-medium text-surface-500 hover:text-primary-600 transition-colors">How It Works</Link></li>
                            <li><Link href="#preview" className="text-sm font-medium text-surface-500 hover:text-primary-600 transition-colors">Showcase</Link></li>
                        </ul>
                    </div>

                    {/* Community */}
                    <div className="space-y-6">
                        <h4 className="text-sm font-black text-surface-900 dark:text-surface-100 uppercase tracking-widest">Support</h4>
                        <ul className="space-y-4">
                            <li><Link href="#" className="text-sm font-medium text-surface-500 hover:text-primary-600 transition-colors">Help Center</Link></li>
                            <li><Link href="#" className="text-sm font-medium text-surface-500 hover:text-primary-600 transition-colors">Contact Us</Link></li>
                            <li><Link href="#" className="text-sm font-medium text-surface-500 hover:text-primary-600 transition-colors">Privacy Policy</Link></li>
                        </ul>
                    </div>

                    {/* Auth */}
                    <div className="space-y-6">
                        <h4 className="text-sm font-black text-surface-900 dark:text-surface-100 uppercase tracking-widest">Join Us</h4>
                        <ul className="space-y-4">
                            <li><Link href="/login" className="text-sm font-medium text-surface-500 hover:text-primary-600 transition-colors">Login</Link></li>
                            <li><Link href="/register" className="text-sm font-medium text-surface-500 hover:text-primary-600 transition-colors">Sign Up</Link></li>
                        </ul>
                    </div>
                </div>

                <div className="pt-8 border-t border-surface-200 dark:border-surface-800 flex flex-col md:flex-row justify-between items-center gap-6">
                    <p className="text-sm text-surface-500 font-medium text-center md:text-left">
                        © 2026 Student Connect. All rights reserved. 
                    </p>
                    <div className="flex gap-8">
                        <Link href="#" className="text-xs font-bold text-surface-400 hover:text-surface-600 uppercase tracking-widest">Twitter</Link>
                        <Link href="#" className="text-xs font-bold text-surface-400 hover:text-surface-600 uppercase tracking-widest">Instagram</Link>
                        <Link href="#" className="text-xs font-bold text-surface-400 hover:text-surface-600 uppercase tracking-widest">LinkedIn</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
