'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import LandingNavbar from '@/components/landing/LandingNavbar';
import LandingHero from '@/components/landing/LandingHero';
import LandingProblem from '@/components/landing/LandingProblem';
import LandingFeatures from '@/components/landing/LandingFeatures';
import LandingBenefits from '@/components/landing/LandingBenefits';
import LandingInstitutions from '@/components/landing/LandingInstitutions';
import LandingStats from '@/components/landing/LandingStats';
import FinalCTA from '@/components/landing/FinalCTA';
import LandingFooter from '@/components/landing/LandingFooter';

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
            <div className="fixed inset-0 bg-white flex items-center justify-center z-50">
                <div className="w-12 h-12 border-4 border-primary-600 border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white text-surface-900 selection:bg-primary-500/30 font-sans">
            <LandingNavbar />
            <main>
                {/* Hero section handles its own spacing but starts after Navbar */}
                <LandingHero />
                
                {/* Problem Section - Light Gray Background */}
                <LandingProblem />
                
                {/* Features Section - White Background */}
                <LandingFeatures />
                
                {/* Benefits Section - Soft Blue Tint Background */}
                <div className="bg-primary-50/50">
                    <LandingBenefits />
                </div>
                
                {/* Institutions Section - White Background (LandingInstitutions already has bg-surface-50 in its def, I will wrap it to ensure alternating) */}
                {/* Wait, LandingInstitutions has bg-surface-50. LandingProblem has bg-surface-50. */}
                {/* Let's follow the spec: White (Hero), Light Gray (Problem), White (Features), Soft Blue (Benefits), White (Institutions) */}
                <div className="bg-white">
                    <LandingInstitutions />
                </div>
                
                {/* Stats Section - Dark navy card on White background */}
                <div className="bg-white">
                    <LandingStats />
                </div>
                
                {/* Final CTA Section - Light rounded card on White background */}
                <div className="bg-white">
                    <FinalCTA />
                </div>
            </main>
            <LandingFooter />
        </div>
    );
}
