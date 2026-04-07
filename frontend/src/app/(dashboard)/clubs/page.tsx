'use client';

import { useState } from 'react';
import { Search, Filter, ChevronDown } from 'lucide-react';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import Link from 'next/link';

const categories = ['All', 'Technology', 'Arts', 'Sports', 'Literary', 'Social', 'Science', 'Music'];

const mockClubs = [
    { id: 1, name: 'CodeCraft Society', slug: 'codecraft', description: 'A community of passionate coders building projects and learning together.', category: 'Technology', members: 234, verified: true, tags: ['Web Dev', 'AI/ML', 'DSA'] },
    { id: 2, name: 'Debate & MUN Club', slug: 'debate-mun', description: 'Sharpen your oratory skills and participate in Model United Nations conferences.', category: 'Literary', members: 156, verified: true, tags: ['Public Speaking', 'MUN'] },
    { id: 3, name: 'Photography Circle', slug: 'photo-circle', description: 'Capture moments, learn photography techniques, and showcase your art.', category: 'Arts', members: 189, verified: false, tags: ['Photography', 'Editing'] },
    { id: 4, name: 'Robotics Lab', slug: 'robotics', description: 'Build robots, compete in competitions, and push the boundaries of automation.', category: 'Technology', members: 98, verified: true, tags: ['Arduino', 'IoT', 'Embedded'] },
    { id: 5, name: 'Melody Makers', slug: 'melody', description: 'A music club for singers, instrumentalists, and music enthusiasts.', category: 'Music', members: 145, verified: true, tags: ['Singing', 'Guitar', 'Band'] },
    { id: 6, name: 'Green Earth Society', slug: 'green-earth', description: 'Environmental awareness campaigns, tree plantations, and sustainability initiatives.', category: 'Social', members: 112, verified: false, tags: ['Environment', 'Sustainability'] },
];

export default function ClubsPage() {
    const [search, setSearch] = useState('');
    const [activeCategory, setActiveCategory] = useState('All');

    const filteredClubs = mockClubs.filter((club) => {
        const matchesSearch = club.name.toLowerCase().includes(search.toLowerCase());
        const matchesCategory = activeCategory === 'All' || club.category === activeCategory;
        return matchesSearch && matchesCategory;
    });

    return (
        <div className="space-y-6 animate-fade-in">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold font-display text-surface-900 dark:text-surface-100">
                    Discover Clubs
                </h1>
                <p className="text-surface-500 dark:text-surface-400 mt-1">
                    Find and join communities that match your interests
                </p>
            </div>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                    <Input
                        placeholder="Search clubs..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        leftIcon={<Search className="w-4 h-4" />}
                    />
                </div>
                <Button variant="secondary" leftIcon={<Filter className="w-4 h-4" />} rightIcon={<ChevronDown className="w-4 h-4" />}>
                    Filters
                </Button>
            </div>

            {/* Categories */}
            <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                    <button
                        key={cat}
                        onClick={() => setActiveCategory(cat)}
                        className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${activeCategory === cat
                                ? 'bg-primary-600 text-white shadow-md'
                                : 'bg-white dark:bg-surface-800 text-surface-600 dark:text-surface-400 hover:bg-surface-100 dark:hover:bg-surface-700 border border-surface-200 dark:border-surface-700'
                            }`}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            {/* Club Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {filteredClubs.map((club) => (
                    <Link key={club.id} href={`/clubs/${club.slug}`}>
                        <div className="glass-card overflow-hidden hover-lift cursor-pointer group h-full">
                            <div className="h-32 bg-gradient-to-br from-primary-400 to-accent-500 relative">
                                <div className="absolute inset-0 bg-black/10" />
                                {club.verified && (
                                    <div className="absolute top-3 right-3">
                                        <Badge variant="success" size="sm">✓ Verified</Badge>
                                    </div>
                                )}
                            </div>
                            <div className="p-5 space-y-3">
                                <div className="flex items-start gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center text-white font-bold -mt-8 relative z-10 border-2 border-white dark:border-surface-800 shadow-md">
                                        {club.name.charAt(0)}
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-surface-900 dark:text-surface-100 group-hover:text-primary-600 transition-colors">
                                            {club.name}
                                        </h3>
                                        <Badge variant="primary" size="sm">{club.category}</Badge>
                                    </div>
                                </div>
                                <p className="text-sm text-surface-600 dark:text-surface-400 line-clamp-2">
                                    {club.description}
                                </p>
                                <div className="flex items-center justify-between pt-2 border-t border-surface-100 dark:border-surface-700">
                                    <span className="text-xs text-surface-500">{club.members} members</span>
                                    <div className="flex gap-1">
                                        {club.tags.slice(0, 2).map((tag) => (
                                            <span key={tag} className="text-xs px-2 py-0.5 bg-surface-100 dark:bg-surface-700 text-surface-500 rounded-full">{tag}</span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
