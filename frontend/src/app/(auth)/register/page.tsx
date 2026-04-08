'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Mail, Lock, User, Building2, BookOpen, ArrowRight } from 'lucide-react';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import { useAuthStore } from '@/stores/authStore';

export default function RegisterPage() {
    const router = useRouter();
    const { register, isLoading, error, clearError } = useAuthStore();
    const [formData, setFormData] = useState({
        fullName: '',
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        college: '',
        department: '',
        year: '',
    });
    const [formError, setFormError] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        clearError();
        setFormError('');
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            setFormError('Passwords do not match');
            return;
        }
        if (formData.password.length < 8) {
            setFormError('Password must be at least 8 characters');
            return;
        }
        try {
            await register({
                fullName: formData.fullName,
                username: formData.username,
                email: formData.email,
                password: formData.password,
                college: formData.college || undefined,
                department: formData.department || undefined,
                year: formData.year ? parseInt(formData.year) : undefined,
            });
            router.push('/verify-email');
        } catch {
            // error handled by store
        }
    };

    return (
        <div className="min-h-screen flex">
            {/* Left - Visual */}
            <div className="hidden lg:flex flex-1 items-center justify-center bg-gradient-to-br from-accent-600 via-primary-700 to-primary-800 relative overflow-hidden">
                <div className="absolute top-10 right-10 w-80 h-80 bg-white/5 rounded-full animate-pulse-soft" />
                <div className="absolute bottom-10 left-10 w-64 h-64 bg-white/5 rounded-full animate-pulse-soft" style={{ animationDelay: '1s' }} />
                <div className="relative z-10 text-center px-12">
                    <h2 className="text-4xl font-bold font-display text-white mb-4">
                        Start Your Journey
                    </h2>
                    <p className="text-primary-100 text-lg max-w-md mx-auto">
                        Create your account and unlock a world of clubs, events, mentorship, and opportunities.
                    </p>
                </div>
            </div>

            {/* Right - Form */}
            <div className="flex-1 flex items-center justify-center p-8 overflow-y-auto">
                <div className="w-full max-w-md space-y-6 animate-fade-in">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl overflow-hidden shadow-lg border border-surface-200 dark:border-surface-800">
                            <img src="/logo.jpg" alt="Student Connect" className="w-full h-full object-cover" />
                        </div>
                        <div>
                            <h1 className="text-xl font-bold font-display gradient-text">Student Connect</h1>
                            <p className="text-xs text-surface-500">One Platform. Every Opportunity.</p>
                        </div>
                    </div>

                    <div>
                        <h2 className="text-3xl font-bold text-surface-900 dark:text-surface-100 font-display">Create account</h2>
                        <p className="text-surface-500 dark:text-surface-400 mt-2">Join the student ecosystem</p>
                    </div>

                    {(error || formError) && (
                        <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl text-sm text-red-600 dark:text-red-400 animate-slide-down">
                            {error || formError}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <Input label="Full Name" name="fullName" placeholder="John Doe" value={formData.fullName} onChange={handleChange} leftIcon={<User className="w-4 h-4" />} required />
                            <Input label="Username" name="username" placeholder="johndoe" value={formData.username} onChange={handleChange} leftIcon={<User className="w-4 h-4" />} required />
                        </div>
                        <Input label="Email" name="email" type="email" placeholder="you@college.edu" value={formData.email} onChange={handleChange} leftIcon={<Mail className="w-4 h-4" />} required />
                        <div className="grid grid-cols-2 gap-4">
                            <Input label="Password" name="password" type="password" placeholder="••••••••" value={formData.password} onChange={handleChange} leftIcon={<Lock className="w-4 h-4" />} required />
                            <Input label="Confirm Password" name="confirmPassword" type="password" placeholder="••••••••" value={formData.confirmPassword} onChange={handleChange} leftIcon={<Lock className="w-4 h-4" />} required />
                        </div>
                        <Input label="College" name="college" placeholder="Your College Name" value={formData.college} onChange={handleChange} leftIcon={<Building2 className="w-4 h-4" />} />
                        <div className="grid grid-cols-2 gap-4">
                            <Input label="Department" name="department" placeholder="Computer Science" value={formData.department} onChange={handleChange} leftIcon={<BookOpen className="w-4 h-4" />} />
                            <Input label="Year" name="year" type="number" placeholder="2" value={formData.year} onChange={handleChange} />
                        </div>

                        <Button type="submit" size="lg" className="w-full" isLoading={isLoading} rightIcon={<ArrowRight className="w-4 h-4" />}>
                            Create Account
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
                        Already have an account?{' '}
                        <Link href="/login" className="text-primary-600 dark:text-primary-400 font-semibold hover:underline">Sign in</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
