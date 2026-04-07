'use client';

import { useState, useEffect } from 'react';
import { Search, Filter, Briefcase, MapPin, Clock, ExternalLink } from 'lucide-react';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import { useOpportunityStore } from '@/stores/opportunityStore';

const types = ['All', 'Internship', 'Job', 'Research', 'Volunteer'];

export default function OpportunitiesPage() {
    const { opportunities, fetchOpportunities, isLoading } = useOpportunityStore();
    const [search, setSearch] = useState('');
    const [activeType, setActiveType] = useState('All');

    useEffect(() => {
        fetchOpportunities(activeType === 'All' ? '' : activeType.toUpperCase(), search);
    }, [activeType, search, fetchOpportunities]);

    const typeColors: Record<string, 'primary' | 'accent' | 'success' | 'warning'> = {
        INTERNSHIP: 'primary', JOB: 'accent', RESEARCH: 'success', VOLUNTEER: 'warning',
    };

    return (
        <div className="space-y-6 animate-fade-in">
            <div>
                <h1 className="text-3xl font-bold font-display text-surface-900 dark:text-surface-100">Opportunities</h1>
                <p className="text-surface-500 dark:text-surface-400 mt-1">Find internships, jobs, research, and volunteer positions</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                    <Input 
                        placeholder="Search opportunities..." 
                        value={search} 
                        onChange={(e) => setSearch(e.target.value)} 
                        leftIcon={<Search className="w-4 h-4" />} 
                    />
                </div>
                <Button variant="secondary" leftIcon={<Filter className="w-4 h-4" />}>Filters</Button>
            </div>

            <div className="flex flex-wrap gap-2">
                {types.map((type) => (
                    <button 
                        key={type} 
                        onClick={() => setActiveType(type)} 
                        className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${activeType === type ? 'bg-primary-600 text-white shadow-md' : 'bg-white dark:bg-surface-800 text-surface-600 dark:text-surface-400 hover:bg-surface-100 dark:hover:bg-surface-700 border border-surface-200 dark:border-surface-700'}`}
                    >
                        {type}
                    </button>
                ))}
            </div>

            <div className="space-y-4">
                {opportunities.map((opp) => (
                    <div key={opp.id} className="glass-card p-5 hover-lift flex flex-col sm:flex-row gap-4">
                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${opp.type === 'INTERNSHIP' ? 'from-primary-400 to-primary-600' : opp.type === 'JOB' ? 'from-accent-400 to-accent-600' : opp.type === 'RESEARCH' ? 'from-emerald-400 to-emerald-600' : 'from-amber-400 to-amber-600'} flex items-center justify-center flex-shrink-0`}>
                            <Briefcase className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-2">
                                <div>
                                    <h3 className="font-semibold text-surface-900 dark:text-surface-100">{opp.title}</h3>
                                    <p className="text-sm text-surface-500 dark:text-surface-400 mt-0.5">{opp.company}</p>
                                </div>
                                <Badge variant={typeColors[opp.type] || 'primary'} size="sm">{opp.type}</Badge>
                            </div>
                            <div className="flex flex-wrap items-center gap-3 mt-2 text-sm text-surface-500">
                                <div className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" />{opp.location || (opp.isRemote ? 'Remote' : 'On-site')}</div>
                                {opp.deadline && (
                                    <div className="flex items-center gap-1">
                                        <Clock className="w-3.5 h-3.5" />
                                        Deadline: {new Date(opp.deadline).toLocaleDateString()}
                                    </div>
                                )}
                                {opp.isRemote && <Badge variant="success" size="sm" dot>Remote</Badge>}
                            </div>
                            {opp.tags && opp.tags.length > 0 && (
                                <div className="flex flex-wrap gap-1.5 mt-3">
                                    {opp.tags.map((tag) => (
                                        <span key={tag} className="text-xs px-2 py-0.5 bg-surface-100 dark:bg-surface-700 text-surface-500 rounded-full">{tag}</span>
                                    ))}
                                </div>
                            )}
                        </div>
                        <div className="flex sm:flex-col gap-2 sm:items-end justify-end">
                            {opp.applicationUrl && (
                                <a href={opp.applicationUrl} target="_blank" rel="noopener noreferrer">
                                    <Button variant="primary" size="sm" rightIcon={<ExternalLink className="w-3.5 h-3.5" />}>Apply</Button>
                                </a>
                            )}
                        </div>
                    </div>
                ))}
                {isLoading && (
                    Array(3).fill(0).map((_, i) => (
                        <div key={i} className="glass-card h-32 animate-pulse bg-surface-100 dark:bg-surface-800" />
                    ))
                )}
                {!isLoading && opportunities.length === 0 && (
                    <div className="text-center py-12 glass-card">
                        <p className="text-surface-500">No opportunities found matching your criteria.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
