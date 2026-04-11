'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import LandingNavbar from '@/components/landing/LandingNavbar';
import LandingHero from '@/components/landing/LandingHero';
import LandingFeatures from '@/components/landing/LandingFeatures';
import LandingHowItWorks from '@/components/landing/LandingHowItWorks';
import LandingPreview from '@/components/landing/LandingPreview';
import LandingStats from '@/components/landing/LandingStats';
import LandingTestimonials from '@/components/landing/LandingTestimonials';
import LandingFooter from '@/components/landing/LandingFooter';
import FinalCTA from '@/components/landing/FinalCTA';

export default function LandingPage() {
    const router = useRouter();
    const [isCheckingAuth, setIsCheckingAuth] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            router.replace('/dashboard');
        } else {
            setIsCheckingAuth(false);
        }
    }, [router]);

    if (isCheckingAuth) {
        return (
            <div className="fixed inset-0 bg-white dark:bg-surface-950 flex items-center justify-center z-50">
                <div className="w-12 h-12 border-4 border-primary-600 border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white dark:bg-surface-950 text-surface-900 dark:text-surface-100 selection:bg-primary-500/30">
            <LandingNavbar />
            <main>
                <LandingHero />
                <LandingFeatures />
                <LandingHowItWorks />
                <LandingPreview />
                <LandingStats />
                <LandingTestimonials />
                <FinalCTA />
            </main>
            <LandingFooter />
        </div>
    );
}
