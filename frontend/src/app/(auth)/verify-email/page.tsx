'use client';

import { useEffect, useState, Suspense } from 'react';
import { Mail, ArrowLeft, CheckCircle, XCircle, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import Button from '@/components/ui/Button';
import api from '@/lib/api';

function VerifyEmailContent() {
    const searchParams = useSearchParams();
    const token = searchParams.get('token');
    
    const [status, setStatus] = useState<'idle' | 'verifying' | 'success' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        if (token) {
            verifyToken(token);
        }
    }, [token]);

    const verifyToken = async (tokenString: string) => {
        setStatus('verifying');
        try {
            await api.post(`/auth/verify?token=${tokenString}`);
            setStatus('success');
        } catch (error: any) {
            setStatus('error');
            setErrorMessage(error.response?.data?.message || 'Verification failed. The link might be invalid or expired.');
        }
    };

    if (status === 'verifying') {
        return (
            <div className="text-center space-y-6">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center mx-auto shadow-lg animate-pulse">
                    <Loader2 className="w-10 h-10 text-white animate-spin" />
                </div>
                <div>
                    <h1 className="text-3xl font-bold text-surface-900 dark:text-surface-100 font-display">
                        Verifying Email...
                    </h1>
                    <p className="text-surface-500 dark:text-surface-400 mt-3">
                        Please wait while we verify your account.
                    </p>
                </div>
            </div>
        );
    }

    if (status === 'success') {
        return (
            <div className="text-center space-y-6">
                <div className="w-20 h-20 rounded-2xl bg-green-500 flex items-center justify-center mx-auto shadow-lg">
                    <CheckCircle className="w-10 h-10 text-white" />
                </div>
                <div>
                    <h1 className="text-3xl font-bold text-surface-900 dark:text-surface-100 font-display">
                        Email Verified!
                    </h1>
                    <p className="text-surface-500 dark:text-surface-400 mt-3">
                        Thank you for verifying your email. You can now sign in to your account.
                    </p>
                </div>
                <Link href="/login" className="inline-block w-full max-w-[200px] mt-4">
                    <Button className="w-full">
                        Proceed to Login
                    </Button>
                </Link>
            </div>
        );
    }

    if (status === 'error') {
        return (
            <div className="text-center space-y-6">
                <div className="w-20 h-20 rounded-2xl bg-red-500 flex items-center justify-center mx-auto shadow-lg">
                    <XCircle className="w-10 h-10 text-white" />
                </div>
                <div>
                    <h1 className="text-3xl font-bold text-surface-900 dark:text-surface-100 font-display">
                        Verification Failed
                    </h1>
                    <p className="text-red-600 dark:text-red-400 mt-3 bg-red-50 dark:bg-red-900/20 p-3 rounded-lg border border-red-200 dark:border-red-800 text-sm">
                        {errorMessage}
                    </p>
                </div>
                <div className="glass-card p-5">
                    <p className="text-sm text-surface-600 dark:text-surface-400">
                        Need a new link?{' '}
                        <button className="text-primary-600 dark:text-primary-400 font-semibold hover:underline">
                            Resend verification email
                        </button>
                    </p>
                </div>
                <Link href="/login" className="inline-block mt-4">
                    <Button variant="ghost" leftIcon={<ArrowLeft className="w-4 h-4" />}>
                        Back to Sign In
                    </Button>
                </Link>
            </div>
        );
    }

    // Default 'idle' state when no token is present
    return (
        <div className="text-center space-y-6">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center mx-auto shadow-lg">
                <Mail className="w-10 h-10 text-white" />
            </div>

            <div>
                <h1 className="text-3xl font-bold text-surface-900 dark:text-surface-100 font-display">
                    Check your email
                </h1>
                <p className="text-surface-500 dark:text-surface-400 mt-3 leading-relaxed">
                    We've sent a verification link to your email address. Click the link to verify your
                    account and get started.
                </p>
            </div>

            <div className="glass-card p-5">
                <p className="text-sm text-surface-600 dark:text-surface-400">
                    Didn't receive the email? Check your spam folder or{' '}
                    <button className="text-primary-600 dark:text-primary-400 font-semibold hover:underline">
                        resend verification email
                    </button>
                </p>
            </div>

            <Link href="/login" className="inline-block mt-4">
                <Button variant="ghost" leftIcon={<ArrowLeft className="w-4 h-4" />}>
                    Back to Sign In
                </Button>
            </Link>
        </div>
    );
}

export default function VerifyEmailPage() {
    return (
        <div className="min-h-screen flex items-center justify-center p-8 bg-surface-50 dark:bg-surface-950">
            <div className="w-full max-w-md animate-fade-in">
                <Suspense fallback={<div className="text-center p-8"><Loader2 className="w-8 h-8 animate-spin mx-auto text-primary-500" /></div>}>
                    <VerifyEmailContent />
                </Suspense>
            </div>
        </div>
    );
}
