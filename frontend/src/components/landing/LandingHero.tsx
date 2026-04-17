'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Search, Bell, Home, Users, Calendar, Briefcase, UserCheck, Megaphone, Check, X, Plus } from 'lucide-react';
import Link from 'next/link';

export default function LandingHero() {
    return (
        <section className="pt-32 pb-20 md:pt-48 md:pb-32 bg-white overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 text-center">
                {/* Pill Badge */}
                <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-50 border border-surface-200 text-surface-500 text-xs font-semibold mb-8"
                >
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-500"></span>
                    </span>
                    Built for the next generation of students
                </motion.div>

                {/* Main Headline */}
                <motion.h1 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-5xl md:text-7xl font-bold tracking-tight text-surface-900 mb-6 leading-[1.05]"
                >
                    Connect. Grow. <br />
                    <span className="font-serif italic font-light italic text-primary-600">Succeed</span> in college.
                </motion.h1>

                {/* Subheadline */}
                <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="max-w-2xl mx-auto text-lg md:text-xl text-surface-500 mb-10 leading-relaxed"
                >
                    One platform for everything student life — clubs, events, mentors, internships, and campus connections in a single dashboard built for you.
                </motion.p>

                {/* CTAs */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8"
                >
                    <Link href="/register">
                        <button className="w-full sm:w-auto px-8 py-4 bg-primary-600 text-white rounded-xl text-lg font-semibold hover:bg-primary-700 transition-all flex items-center justify-center gap-2 shadow-lg shadow-primary-600/20 group">
                            Get Started
                            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                        </button>
                    </Link>
                    <Link href="/login">
                        <button className="w-full sm:w-auto px-8 py-4 bg-white text-surface-900 border border-surface-200 rounded-xl text-lg font-semibold hover:bg-surface-50 transition-all">
                            Login
                        </button>
                    </Link>
                </motion.div>

                {/* Trust Line */}
                <motion.p 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="text-sm text-surface-400 mb-20"
                >
                    Free for students · No credit card · Join with your college email
                </motion.p>

                {/* Product Mockup */}
                <motion.div 
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                    className="relative max-w-5xl mx-auto"
                >
                    {/* Browser Frame */}
                    <div className="rounded-2xl border border-surface-200 bg-white shadow-2xl overflow-hidden aspect-[16/10] flex flex-col">
                        {/* Browser Bar */}
                        <div className="bg-surface-50 border-b border-surface-200 px-4 py-3 flex items-center gap-4">
                            <div className="flex gap-1.5">
                                <div className="w-3 h-3 rounded-full bg-red-400" />
                                <div className="w-3 h-3 rounded-full bg-amber-400" />
                                <div className="w-3 h-3 rounded-full bg-emerald-400" />
                            </div>
                            <div className="flex-1 max-w-md mx-auto bg-white border border-surface-200 rounded-md py-1 px-3 flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-emerald-500" />
                                <span className="text-[10px] text-surface-400 font-medium truncate">app.studentconnect.io / dashboard</span>
                            </div>
                        </div>

                        {/* App Content */}
                        <div className="flex-1 flex overflow-hidden">
                            {/* Sidebar Mockup */}
                            <div className="w-56 bg-white border-r border-surface-100 p-4 hidden md:flex flex-col gap-6">
                                <div className="flex items-center gap-2 px-2">
                                    <div className="w-7 h-7 bg-surface-900 rounded-md flex items-center justify-center">
                                        <GraduationCap className="w-4 h-4 text-white" />
                                    </div>
                                    <span className="text-sm font-bold text-primary-600">StudentConnect</span>
                                </div>
                                <div className="space-y-1">
                                    {[
                                        { icon: Home, label: 'Home', active: true },
                                        { icon: Users, label: 'Clubs', badge: '12' },
                                        { icon: Calendar, label: 'Events', badge: '3' },
                                        { icon: Briefcase, label: 'Opportunities' },
                                        { icon: UserCheck, label: 'Mentors' },
                                        { icon: Megaphone, label: 'Announcements' },
                                    ].map((item) => (
                                        <div 
                                            key={item.label} 
                                            className={`flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium ${item.active ? 'bg-primary-50 text-primary-600' : 'text-surface-500'}`}
                                        >
                                            <div className="flex items-center gap-2">
                                                <item.icon className="w-4 h-4" />
                                                <span>{item.label}</span>
                                            </div>
                                            {item.badge && <span className="text-[10px] font-bold opacity-60">{item.badge}</span>}
                                        </div>
                                    ))}
                                </div>
                                <div className="mt-auto p-3 bg-surface-50 rounded-xl border border-surface-100 flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-primary-600 flex items-center justify-center text-[10px] text-white font-bold">AK</div>
                                    <div className="text-left">
                                        <p className="text-[10px] font-bold text-surface-900">Aarav K.</p>
                                        <p className="text-[8px] text-surface-400">B.Tech · 2nd year</p>
                                    </div>
                                </div>
                            </div>

                            {/* Main Feed Mockup */}
                            <div className="flex-1 bg-surface-50 p-6 overflow-y-auto no-scrollbar">
                                {/* Top Bar Content */}
                                <div className="flex items-center justify-between mb-8">
                                    <div className="relative flex-1 max-w-sm">
                                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-surface-300" />
                                        <input 
                                            readOnly 
                                            placeholder="Search clubs, events, people..." 
                                            className="w-full pl-10 pr-4 py-2 bg-white border border-surface-100 rounded-xl text-xs outline-none shadow-sm"
                                        />
                                        <div className="absolute right-3 top-1/2 -translate-y-1/2 border border-surface-100 rounded px-1 text-[8px] font-bold text-surface-300">⌘ K</div>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <div className="p-2 bg-white border border-surface-100 rounded-xl relative shadow-sm">
                                            <Bell className="w-4 h-4 text-surface-400" />
                                            <div className="absolute top-2 right-2 w-1.5 h-1.5 bg-primary-500 rounded-full border-2 border-white" />
                                        </div>
                                        <div className="text-right">
                                            <p className="text-[10px] font-medium text-surface-400">Hey Aarav · <span className="text-surface-900 font-bold">Tuesday</span></p>
                                        </div>
                                    </div>
                                </div>

                                <div className="text-left mb-6">
                                    <p className="text-[10px] font-bold text-surface-400 uppercase tracking-widest mb-1">Your Campus</p>
                                    <h2 className="text-2xl font-bold text-surface-900">Good morning, Aarav</h2>
                                </div>

                                {/* Dashboard Grid */}
                                <div className="grid grid-cols-2 gap-6">
                                    {/* Upcoming Events */}
                                    <div className="bg-white border border-surface-100 rounded-2xl p-5 shadow-sm">
                                        <div className="flex items-center justify-between mb-6">
                                            <h3 className="text-sm font-bold text-surface-900">Upcoming Events</h3>
                                            <span className="text-[10px] font-bold text-surface-400 hover:text-primary-600 transition-colors pointer-events-none">View all &rarr;</span>
                                        </div>
                                        <div className="space-y-4">
                                            {[
                                                { date: { month: 'DEC', day: '12' }, title: 'AI Club — Hackathon Kickoff', loc: 'Auditorium B' },
                                                { date: { month: 'DEC', day: '14' }, title: 'Design Meetup: Figma Jam', loc: 'Studio 204' },
                                            ].map((ev, i) => (
                                                <div key={i} className="flex items-center gap-4 p-2 rounded-xl hover:bg-surface-50 transition-colors">
                                                    <div className="w-12 h-12 rounded-xl bg-primary-50 border border-primary-100 flex flex-col items-center justify-center">
                                                        <span className="text-[8px] font-bold text-primary-400">{ev.date.month}</span>
                                                        <span className="text-sm font-bold text-primary-600">{ev.date.day}</span>
                                                    </div>
                                                    <div className="flex-1 text-left">
                                                        <p className="text-[11px] font-bold text-surface-900">{ev.title}</p>
                                                        <p className="text-[9px] text-surface-400 flex items-center gap-1">
                                                            <MapPin className="w-2 h-2" /> {ev.loc}
                                                        </p>
                                                    </div>
                                                    <button className="text-[10px] font-bold text-primary-600">RSVP</button>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* New Opportunities */}
                                    <div className="bg-white border border-surface-100 rounded-2xl p-5 shadow-sm">
                                        <div className="flex items-center justify-between mb-6">
                                            <h3 className="text-sm font-bold text-surface-900">New Opportunities</h3>
                                            <span className="text-[10px] font-bold text-surface-400 pointer-events-none">Browse &rarr;</span>
                                        </div>
                                        <div className="space-y-3">
                                            {[
                                                { title: 'SDE Intern', company: 'Fintech Startup', tags: ['Remote', 'Summer'], icon: Briefcase },
                                                { title: 'UI/UX Intern', company: 'EdTech Labs', tags: ['Hybrid'], icon: Briefcase },
                                            ].map((op, i) => (
                                                <div key={i} className="p-3 border border-surface-100 rounded-xl flex items-center gap-3">
                                                    <div className="w-9 h-9 bg-surface-50 rounded-lg flex items-center justify-center">
                                                        <op.icon className="w-4 h-4 text-surface-400" />
                                                    </div>
                                                    <div className="flex-1 text-left">
                                                        <p className="text-[11px] font-bold text-surface-900">{op.title}</p>
                                                        <p className="text-[9px] text-surface-400">{op.company}</p>
                                                    </div>
                                                    <div className="flex gap-1">
                                                        {op.tags.map(t => (
                                                            <span key={t} className="px-2 py-0.5 bg-primary-50 text-primary-600 rounded-full text-[8px] font-bold">{t}</span>
                                                        ))}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Mentor Requests */}
                                    <div className="bg-white border border-surface-100 rounded-2xl p-5 shadow-sm">
                                        <div className="flex items-center justify-between mb-6">
                                            <h3 className="text-sm font-bold text-surface-900">Mentor Requests</h3>
                                            <span className="text-[10px] font-bold text-surface-400 pointer-events-none">Manage &rarr;</span>
                                        </div>
                                        <div className="space-y-4">
                                            {[
                                                { name: 'Priya Sharma', role: 'Alumni · Google', color: 'bg-pink-500' },
                                                { name: 'Rahul Verma', role: 'Senior · CS \'24', color: 'bg-orange-500' },
                                            ].map((m, i) => (
                                                <div key={i} className="flex items-center gap-3">
                                                    <div className={`w-8 h-8 rounded-full ${m.color} flex items-center justify-center text-white text-[10px] font-bold`}>
                                                        {m.name.split(' ').map(n => n[0]).join('')}
                                                    </div>
                                                    <div className="flex-1 text-left">
                                                        <p className="text-[11px] font-bold text-surface-900">{m.name}</p>
                                                        <p className="text-[9px] text-surface-400 uppercase tracking-tighter">{m.role}</p>
                                                    </div>
                                                    <div className="flex gap-2">
                                                        <button className="p-1 bg-primary-600 text-white rounded-md"><Check className="w-3 h-3" /></button>
                                                        <button className="p-1 border border-surface-100 rounded-md"><X className="w-3 h-3" /></button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Club Suggestions */}
                                    <div className="bg-white border border-surface-100 rounded-2xl p-5 shadow-sm">
                                        <div className="flex items-center justify-between mb-6">
                                            <h3 className="text-sm font-bold text-surface-900">Club Suggestions</h3>
                                            <span className="text-[10px] font-bold text-surface-400 pointer-events-none">Explore &rarr;</span>
                                        </div>
                                        <div className="space-y-4">
                                            {[
                                                { name: 'Robotics Society', members: '214 members', icon: Users },
                                                { name: 'Debate & MUN', members: '168 members', icon: Users },
                                                { name: 'Photography Guild', members: '342 members', icon: Users },
                                            ].map((cl, i) => (
                                                <div key={i} className="flex items-center gap-3">
                                                    <div className="p-2 bg-surface-50 rounded-lg">
                                                        <cl.icon className="w-3.5 h-3.5 text-surface-400" />
                                                    </div>
                                                    <div className="flex-1 text-left">
                                                        <p className="text-[11px] font-bold text-surface-900">{cl.name}</p>
                                                        <p className="text-[9px] text-surface-400">{cl.members}</p>
                                                    </div>
                                                    <button className="px-3 py-1 border border-surface-100 rounded-lg text-xs font-bold hover:bg-surface-50 transition-colors flex items-center gap-1">
                                                        <Plus className="w-3 h-3" /> Join
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Decorative Elements */}
                    <div className="absolute -top-10 -right-10 w-24 h-24 bg-primary-100 rounded-full blur-3xl opacity-50 -z-10" />
                    <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-primary-200 rounded-full blur-3xl opacity-50 -z-10" />
                </motion.div>
            </div>
        </section>
    );
}

// Sub-component for icons used in mockup (MapPin is missing from imports)
function MapPin({ className }: { className?: string }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
            <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>
        </svg>
    )
}

function GraduationCap({ className }: { className?: string }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
            <path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/>
        </svg>
    )
}
