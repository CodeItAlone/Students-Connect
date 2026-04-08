'use client';

import { useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuthStore } from '@/stores/authStore';
import api from '@/lib/api';
import { User } from '@/types';

function CallbackContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { initializeOAuth } = useAuthStore();

    useEffect(() => {
        const token = searchParams.get('token');
        const error = searchParams.get('error');

        if (error) {
            console.error('Login error:', error);
            router.push(`/login?error=${encodeURIComponent(error)}`);
            return;
        }

        if (token) {
            initializeOAuth(token)
                .then(() => {
                    router.push('/dashboard');
                })
                .catch((err) => {
                    console.error('Failed to initialize user after OAuth:', err);
                    router.push('/login?error=Failed to initialize session');
                });
        } else {
            router.push('/login');
        }
    }, [searchParams, router, initializeOAuth]);

    return (
        <div className="flex flex-col items-center justify-center min-vh-100 bg-surface-50 dark:bg-surface-950 p-6">
            <div className="w-16 h-16 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mb-4"></div>
            <h2 className="text-xl font-semibold text-surface-900 dark:text-surface-50">Completing Sign In...</h2>
            <p className="text-surface-500 dark:text-surface-400 mt-2">Just a moment while we set up your session.</p>
        </div>
    );
}

export default function AuthCallbackPage() {
    return (
        <Suspense fallback={
            <div className="flex flex-col items-center justify-center min-vh-100 bg-surface-50 dark:bg-surface-950 p-6">
                <div className="w-16 h-16 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mb-4"></div>
            </div>
        }>
            <CallbackContent />
        </Suspense>
    );
}
