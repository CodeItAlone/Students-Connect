'use client';

import { useState, useEffect } from 'react';
import { Search, Filter, Star, Calendar, MessageSquare } from 'lucide-react';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import { useMentorStore } from '@/stores/mentorStore';

export default function MentorsPage() {
    const { mentors, fetchMentors, isLoading } = useMentorStore();
    const [search, setSearch] = useState('');

    useEffect(() => {
        fetchMentors();
    }, [fetchMentors]);

    const filtered = mentors.filter((m) =>
        m.user.fullName.toLowerCase().includes(search.toLowerCase()) ||
        m.expertise.some((e) => e.toLowerCase().includes(search.toLowerCase()))
    );

    return (
        <div className="space-y-6 animate-fade-in">
            <div>
                <h1 className="text-3xl font-bold font-display text-surface-900 dark:text-surface-100">Find Mentors</h1>
                <p className="text-surface-500 dark:text-surface-400 mt-1">Connect with experienced mentors for guidance and learning</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                    <Input 
                        placeholder="Search by name or expertise..." 
                        value={search} 
                        onChange={(e) => setSearch(e.target.value)} 
                        leftIcon={<Search className="w-4 h-4" />} 
                    />
                </div>
                <Button variant="secondary" leftIcon={<Filter className="w-4 h-4" />}>Filters</Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {filtered.map((mentor) => (
                    <div key={mentor.id} className="glass-card p-5 hover-lift group">
                        <div className="flex items-start gap-4">
                            <div className="relative">
                                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-accent-400 to-primary-500 flex items-center justify-center text-white font-bold text-lg overflow-hidden">
                                    {mentor.user.avatarUrl ? (
                                        <img src={mentor.user.avatarUrl} alt="" className="w-full h-full object-cover" />
                                    ) : mentor.user.fullName.charAt(0)}
                                </div>
                                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-400 rounded-full border-2 border-white dark:border-surface-800" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <h3 className="font-semibold text-surface-900 dark:text-surface-100 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors uppercase truncate">
                                    {mentor.user.fullName}
                                </h3>
                                <p className="text-sm text-surface-500 dark:text-surface-400 mt-0.5 truncate">
                                    {mentor.user.college || 'Verified Mentor'}
                                </p>
                                <div className="flex items-center gap-1 mt-1">
                                    <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                                    <span className="text-sm font-medium text-surface-700 dark:text-surface-300">{mentor.rating}</span>
                                    <span className="text-xs text-surface-400">({mentor.totalSessions} sessions)</span>
                                </div>
                            </div>
                        </div>
                        <p className="text-sm text-surface-600 dark:text-surface-400 mt-3 line-clamp-2">{mentor.bio}</p>
                        <div className="flex flex-wrap gap-1.5 mt-3">
                            {mentor.expertise.map((skill) => (
                                <Badge key={skill} variant="neutral" size="sm">{skill}</Badge>
                            ))}
                        </div>
                        <div className="flex gap-2 mt-4">
                            <Button variant="primary" size="sm" className="flex-1" leftIcon={<Calendar className="w-4 h-4" />}>Book Session</Button>
                            <Button variant="ghost" size="sm" leftIcon={<MessageSquare className="w-4 h-4" />}>Message</Button>
                        </div>
                    </div>
                ))}
                {isLoading && (
                    Array(6).fill(0).map((_, i) => (
                        <div key={i} className="glass-card h-64 animate-pulse bg-surface-100 dark:bg-surface-800" />
                    ))
                )}
                {!isLoading && filtered.length === 0 && (
                    <div className="col-span-full text-center py-12 glass-card">
                        <p className="text-surface-500">No mentors found matching your criteria.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
