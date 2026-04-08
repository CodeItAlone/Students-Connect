'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Mail, Lock, ArrowRight } from 'lucide-react';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import { useAuthStore } from '@/stores/authStore';

export default function LoginPage() {
    const router = useRouter();
    const { login, isLoading, error, clearError } = useAuthStore();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await login({ email, password });
            router.push('/');
        } catch {
            // error handled by store
        }
    };

    return (
        <div className="min-h-screen flex">
            {/* Left - Form */}
            <div className="flex-1 flex items-center justify-center p-8">
                <div className="w-full max-w-md space-y-8 animate-fade-in">
                    {/* Logo */}
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl overflow-hidden shadow-lg border border-surface-200 dark:border-surface-800">
                            <img src="/logo.jpg" alt="Student Connect" className="w-full h-full object-cover" />
                        </div>
                        <div>
                            <h1 className="text-xl font-bold font-display gradient-text">Student Connect</h1>
                            <p className="text-xs text-surface-500">One Platform. Every Opportunity.</p>
                        </div>
                    </div>

                    {/* Heading */}
                    <div>
                        <h2 className="text-3xl font-bold text-surface-900 dark:text-surface-100 font-display">
                            Welcome back
                        </h2>
                        <p className="text-surface-500 dark:text-surface-400 mt-2">
                            Sign in to your account to continue
                        </p>
                    </div>

                    {/* Error */}
                    {error && (
                        <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl text-sm text-red-600 dark:text-red-400 animate-slide-down">
                            {error}
                        </div>
                    )}

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-5">
                        <Input
                            label="Email"
                            type="email"
                            placeholder="you@college.edu"
                            value={email}
                            onChange={(e) => { setEmail(e.target.value); clearError(); }}
                            leftIcon={<Mail className="w-4 h-4" />}
                            required
                        />
                        <Input
                            label="Password"
                            type="password"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => { setPassword(e.target.value); clearError(); }}
                            leftIcon={<Lock className="w-4 h-4" />}
                            required
                        />

                        <div className="flex items-center justify-between">
                            <label className="flex items-center gap-2 text-sm text-surface-600 dark:text-surface-400 cursor-pointer">
                                <input type="checkbox" className="w-4 h-4 rounded border-surface-300 text-primary-600 focus:ring-primary-500" />
                                Remember me
                            </label>
                            <a href="#" className="text-sm text-primary-600 dark:text-primary-400 hover:underline">
                                Forgot password?
                            </a>
                        </div>

                        <Button type="submit" size="lg" className="w-full" isLoading={isLoading} rightIcon={<ArrowRight className="w-4 h-4" />}>
                            Sign In
                        </Button>
                    </form>

                    <div className="relative my-6">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-surface-200 dark:border-surface-800"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-2 bg-white dark:bg-surface-950 text-surface-500">Or continue with</span>
                        </div>
                    </div>

                    <a href={`${process.env.NEXT_PUBLIC_BASE_URL || 'https://students-connect-bw3g.onrender.com'}/oauth2/authorization/google`} className="w-full flex items-center justify-center gap-2 px-4 py-3 border border-surface-200 dark:border-surface-800 rounded-xl hover:bg-surface-50 dark:hover:bg-surface-900 transition-colors font-medium text-surface-700 dark:text-surface-300 shadow-sm">
                        <svg className="w-5 h-5" viewBox="0 0 24 24">
                            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                        </svg>
                        Sign in with Google
                    </a>

                    <p className="text-center text-sm text-surface-500 dark:text-surface-400">
                        Don&apos;t have an account?{' '}
                        <Link href="/register" className="text-primary-600 dark:text-primary-400 font-semibold hover:underline">
                            Sign up
                        </Link>
                    </p>
                </div>
            </div>

            {/* Right - Visual */}
            <div className="hidden lg:flex flex-1 items-center justify-center bg-gradient-to-br from-primary-600 via-primary-700 to-accent-700 relative overflow-hidden">
                <div className="absolute top-20 left-20 w-72 h-72 bg-white/5 rounded-full animate-pulse-soft" />
                <div className="absolute bottom-20 right-20 w-96 h-96 bg-white/5 rounded-full animate-pulse-soft" style={{ animationDelay: '1s' }} />
                <div className="relative z-10 text-center px-12">
                    <h2 className="text-4xl font-bold font-display text-white mb-4">
                        Connect. Learn. Grow.
                    </h2>
                    <p className="text-primary-100 text-lg max-w-md mx-auto">
                        Join thousands of students discovering clubs, events, and mentors at their college.
                    </p>
                </div>
            </div>
        </div>
    );
}
