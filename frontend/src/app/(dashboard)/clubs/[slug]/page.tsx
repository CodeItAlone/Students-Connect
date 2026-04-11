'use client';

import { useEffect, useState, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Users, Calendar, MessageSquare, Settings, CheckCircle2, Share2, Loader2, Send, Globe, Shield, UserPlus, Info, ExternalLink, Sparkles } from 'lucide-react';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import Link from 'next/link';
import { useClubStore } from '@/stores/clubStore';
import { useEventStore } from '@/stores/eventStore';
import Input from '@/components/ui/Input';

const TABS = [
    { id: 'about', label: 'About', icon: <Info className="w-4 h-4" /> },
    { id: 'chat', label: 'Club Chat', icon: <MessageSquare className="w-4 h-4" /> },
    { id: 'members', label: 'Members', icon: <Users className="w-4 h-4" /> },
];

export default function ClubDetailPage() {
    const params = useParams();
    const router = useRouter();
    const slug = params.slug as string;
    const [activeTab, setActiveTab] = useState('about');
    const [message, setMessage] = useState('');
    const chatEndRef = useRef<HTMLDivElement>(null);
    const { currentClub, fetchClubBySlug, joinClub, leaveClub, isLoading: isClubLoading, members, fetchMembers } = useClubStore();
    const { events, fetchEvents, isLoading: isEventsLoading } = useEventStore();

    useEffect(() => {
        if (slug) {
            fetchClubBySlug(slug);
        }
    }, [slug, fetchClubBySlug]);

    useEffect(() => {
        if (currentClub?.id) {
            fetchEvents(0, '', '', currentClub.id);
            fetchMembers(currentClub.id);
        }
    }, [currentClub?.id, fetchEvents, fetchMembers]);

    useEffect(() => {
        if (activeTab === 'chat') {
            chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
        }
    }, [activeTab]);

    if (isClubLoading && !currentClub) {
        return (
            <div className="h-[60vh] flex items-center justify-center">
                <Loader2 className="w-8 h-8 text-primary-600 animate-spin" />
            </div>
        );
    }

    if (!currentClub) {
        return (
            <div className="text-center py-20 animate-fade-in">
                <div className="w-20 h-20 bg-surface-100 dark:bg-surface-800 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Shield className="w-10 h-10 text-surface-400" />
                </div>
                <h2 className="text-2xl font-bold text-surface-900 dark:text-surface-100">Club not found</h2>
                <p className="text-surface-500 mt-2 max-w-sm mx-auto">The club you are looking for does not exist or has been removed from the platform.</p>
                <Link href="/clubs">
                    <Button variant="primary" className="mt-8 rounded-full px-8">Browse All Clubs</Button>
                </Link>
            </div>
        );
    }

    const handleJoinToggle = async () => {
        if (currentClub.isJoined) {
            if (window.confirm('Are you sure you want to leave this club?')) {
                await leaveClub(currentClub.id);
            }
        } else {
            await joinClub(currentClub.id);
        }
    };

    const handleSendMessage = (e: React.FormEvent) => {
        e.preventDefault();
        if (!message.trim()) return;
        // Mock add message locally for demo
        setMessage('');
    };

    const mockMessages: { id: number, sender: string, role: string, text: string, time: string, isMe: boolean }[] = [
        { id: 1, sender: currentClub.leaderName || 'Leader', role: 'Leader', text: `Welcome to the ${currentClub.name} official thread! 👋`, time: '10:30 AM', isMe: false },
        { id: 2, sender: 'Alex Chen', role: 'Member', text: 'Stoked to be here! When is our next project kickoff?', time: '11:15 AM', isMe: false },
        { id: 3, sender: 'You', role: 'Member', text: 'Glad to join the community!', time: '12:05 PM', isMe: true },
    ];

    return (
        <div className="space-y-6 animate-fade-in max-w-7xl mx-auto">
            {/* Premium Header */}
            <div className="relative rounded-[2.5rem] overflow-hidden group shadow-2xl">
                <div 
                    className="absolute inset-0 bg-gradient-to-br from-primary-600 via-primary-700 to-accent-700 -z-10"
                    style={currentClub.bannerUrl ? { backgroundImage: `url(${currentClub.bannerUrl})`, backgroundSize: 'cover', backgroundPosition: 'center' } : {}}
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-all duration-500" />
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent h-full pt-20" />
                
                <div className="relative p-6 md:p-10 pt-20 md:pt-32 flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div className="flex items-center gap-5 md:gap-8">
                        <div className="w-20 h-20 md:w-32 md:h-32 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/30 shadow-2xl flex items-center justify-center text-white text-4xl font-bold shrink-0 overflow-hidden transform group-hover:scale-105 transition-transform duration-500">
                            {currentClub.logoUrl ? <img src={currentClub.logoUrl} alt="" className="w-full h-full object-cover" /> : currentClub.name.charAt(0)}
                        </div>
                        <div className="space-y-2">
                            <div className="flex flex-wrap items-center gap-3">
                                <h1 className="text-3xl md:text-5xl font-bold text-white font-display drop-shadow-md">{currentClub.name}</h1>
                                {currentClub.verified && (
                                    <Badge variant="success" className="bg-emerald-500/90 border-none text-white shadow-lg animate-pulse-subtle">✓ Verified</Badge>
                                )}
                            </div>
                            <div className="flex flex-wrap items-center gap-4 text-white/90 text-sm md:text-base font-medium">
                                <span className="flex items-center gap-1.5 bg-white/10 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
                                    <Globe className="w-4 h-4" /> {currentClub.category}
                                </span>
                                <span className="flex items-center gap-1.5 bg-white/10 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
                                    <Users className="w-4 h-4" /> {currentClub.memberCount} Members
                                </span>
                            </div>
                        </div>
                    </div>
                    
                    <div className="flex items-center gap-3 self-start md:self-end">
                        <Button 
                            variant={currentClub.isJoined ? 'secondary' : 'primary'} 
                            onClick={handleJoinToggle}
                            className={`rounded-full px-8 shadow-xl transition-all duration-300 ${currentClub.isJoined ? 'bg-white/10 text-white border-white/20 hover:bg-white/20' : 'hover:scale-105'}`}
                            leftIcon={currentClub.isJoined ? <span className="mr-1">✓</span> : <UserPlus className="w-5 h-5" />}
                        >
                            {currentClub.isJoined ? 'Joined Club' : 'Join Now'}
                        </Button>
                        <Button variant="ghost" className="bg-white/10 text-white hover:bg-white/20 rounded-full w-12 h-12 p-0 flex items-center justify-center border border-white/10">
                            <Share2 className="w-5 h-5" />
                        </Button>
                    </div>
                </div>
            </div>

            {/* Navigation Tabs */}
            <div className="flex border-b border-surface-200 dark:border-surface-800 scrollbar-hide overflow-x-auto">
                {TABS.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex items-center gap-2 px-6 py-4 text-sm font-bold transition-all border-b-2 whitespace-nowrap ${
                            activeTab === tab.id
                                ? 'border-primary-600 text-primary-600'
                                : 'border-transparent text-surface-500 hover:text-surface-700 dark:hover:text-surface-300'
                        }`}
                    >
                        {tab.icon}
                        {tab.label}
                    </button>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Tab Content */}
                <div className="lg:col-span-2 space-y-8">
                    {activeTab === 'about' && (
                        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2">
                            <section className="glass-card p-8">
                                <h2 className="text-2xl font-bold font-display text-surface-900 dark:text-surface-100 mb-4">About the Club</h2>
                                <p className="text-surface-600 dark:text-surface-400 leading-relaxed text-lg italic mb-6">
                                    "{currentClub.shortDescription}"
                                </p>
                                <div className="prose dark:prose-invert max-w-none text-surface-600 dark:text-surface-400">
                                    {currentClub.fullDescription}
                                </div>
                                
                                {currentClub.websiteUrl && (
                                    <Link href={currentClub.websiteUrl} target="_blank" className="inline-flex items-center gap-2 text-primary-600 mt-8 font-semibold hover:underline">
                                        Visit Official Website <ExternalLink className="w-4 h-4" />
                                    </Link>
                                )}

                                <div className="mt-8 pt-8 border-t border-surface-100 dark:border-surface-800">
                                    <h3 className="text-sm font-bold text-surface-400 uppercase tracking-widest mb-4">Areas of Interest</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {currentClub.tags?.map((tag) => (
                                            <Badge key={tag} variant="neutral" className="px-4 py-1.5 rounded-lg border dark:border-surface-700">{tag}</Badge>
                                        ))}
                                    </div>
                                </div>
                            </section>

                            {/* Upcoming Events Container */}
                            <section className="glass-card p-8">
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="text-2xl font-bold font-display text-surface-900 dark:text-surface-100">Club Events</h2>
                                    <span className="text-sm font-medium text-surface-500">{events.length} upcoming</span>
                                </div>
                                <div className="grid gap-4">
                                    {events.map((event) => {
                                        const startDate = new Date(event.startDate);
                                        return (
                                            <div key={event.id} className="group flex items-center gap-5 p-4 rounded-2xl bg-surface-50 dark:bg-surface-800/50 hover:bg-white dark:hover:bg-surface-800 transition-all border border-transparent hover:border-primary-100 dark:hover:border-primary-900/30 hover:shadow-xl hover:shadow-primary-600/5">
                                                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-500 to-accent-600 flex flex-col items-center justify-center text-white shadow-lg">
                                                    <span className="text-[10px] font-bold uppercase opacity-80">{startDate.toLocaleString('default', { month: 'short' })}</span>
                                                    <span className="text-xl font-black">{startDate.getDate()}</span>
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <h4 className="font-bold text-surface-900 dark:text-surface-100 truncate group-hover:text-primary-600 transition-colors">{event.title}</h4>
                                                    <p className="text-sm text-surface-500 flex items-center gap-2 mt-1">
                                                        <Calendar className="w-3.5 h-3.5" /> {event.mode} • 7:00 PM
                                                    </p>
                                                </div>
                                                <Button variant="ghost" size="sm" className="rounded-full group-hover:bg-primary-50 group-hover:text-primary-600 dark:group-hover:bg-primary-900/30">View</Button>
                                            </div>
                                        );
                                    })}
                                    {events.length === 0 && (
                                        <div className="text-center py-12 bg-surface-50 dark:bg-surface-800/30 rounded-2xl border border-dashed border-surface-200 dark:border-surface-700">
                                            <Calendar className="w-10 h-10 text-surface-300 mx-auto mb-3" />
                                            <p className="text-surface-500">No events scheduled yet. Stay tuned!</p>
                                        </div>
                                    )}
                                </div>
                            </section>
                        </div>
                    )}

                    {activeTab === 'chat' && (
                        <div className="glass-card flex flex-col h-[650px] animate-in slide-in-from-right-4 overflow-hidden">
                            {!currentClub.isJoined ? (
                                <div className="flex-1 flex flex-col items-center justify-center p-12 text-center">
                                    <div className="w-20 h-20 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center mb-6">
                                        <Shield className="w-10 h-10 text-primary-600" />
                                    </div>
                                    <h3 className="text-xl font-bold text-surface-900 dark:text-surface-100">Private Community Chat</h3>
                                    <p className="text-surface-500 mt-2 max-w-xs">You must be a member to view messages and participate in the discussion.</p>
                                    <Button onClick={handleJoinToggle} variant="primary" className="mt-8 rounded-full px-10 shadow-lg">Join Club to Start Chatting</Button>
                                </div>
                            ) : (
                                <>
                                    <div className="flex-1 overflow-y-auto p-6 space-y-6">
                                        <div className="text-center py-4">
                                            <span className="text-[10px] font-bold text-surface-400 bg-surface-100 dark:bg-surface-800 px-3 py-1 rounded-full uppercase tracking-widest">Beginning of Thread</span>
                                        </div>
                                        {mockMessages.map((msg) => (
                                            <div key={msg.id} className={`flex gap-3 ${msg.isMe ? 'flex-row-reverse' : ''}`}>
                                                {!msg.isMe && (
                                                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-400 to-accent-400 flex items-center justify-center text-white font-bold shrink-0 shadow-md">
                                                        {msg.sender.charAt(0)}
                                                    </div>
                                                )}
                                                <div className={`max-w-[80%] space-y-1 ${msg.isMe ? 'items-end' : ''}`}>
                                                    <div className={`flex items-center gap-2 ${msg.isMe ? 'flex-row-reverse' : ''}`}>
                                                        <span className="text-xs font-bold text-surface-700 dark:text-surface-300">{msg.sender}</span>
                                                        <Badge variant={msg.role === 'Leader' ? 'accent' : 'neutral'} size="sm" className="text-[9px] uppercase tracking-tighter px-1.5 leading-none h-4">{msg.role}</Badge>
                                                    </div>
                                                    <div className={`p-4 rounded-2xl text-sm leading-relaxed shadow-sm ${msg.isMe ? 'bg-primary-600 text-white rounded-tr-none' : 'bg-surface-50 dark:bg-surface-800 text-surface-800 dark:text-surface-200 rounded-tl-none border dark:border-surface-700'}`}>
                                                        {msg.text}
                                                    </div>
                                                    <p className="text-[10px] text-surface-400 font-medium px-1">{msg.time}</p>
                                                </div>
                                            </div>
                                        ))}
                                        <div ref={chatEndRef} />
                                    </div>
                                    <form onSubmit={handleSendMessage} className="p-4 bg-surface-50 dark:bg-surface-80ß/50 border-t border-surface-100 dark:border-surface-800 flex gap-3">
                                        <div className="flex-1 relative">
                                            <input 
                                                value={message}
                                                onChange={(e) => setMessage(e.target.value)}
                                                placeholder="Type a message..."
                                                className="w-full bg-white dark:bg-surface-900 border border-surface-200 dark:border-surface-700 rounded-2xl px-5 py-3 pr-12 focus:ring-2 focus:ring-primary-500 outline-none transition-all shadow-inner dark:text-white"
                                            />
                                            <button type="submit" className="absolute right-2 top-1.5 p-2 bg-primary-600 text-white rounded-xl hover:bg-primary-700 shadow-lg shadow-primary-600/20 transition-all">
                                                <Send className="w-5 h-5" />
                                            </button>
                                        </div>
                                    </form>
                                </>
                            )}
                        </div>
                    )}

                    {activeTab === 'members' && (
                        <div className="glass-card p-8 animate-in slide-in-from-right-4">
                            <h2 className="text-2xl font-bold font-display text-surface-900 dark:text-surface-100 mb-6 flex items-center justify-between">
                                Club Community
                                <Badge variant="primary">{members.length} Members</Badge>
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {members.map((member) => (
                                    <div key={member.id} className="flex items-center gap-4 p-4 rounded-2xl bg-surface-50 dark:bg-surface-800/50 border border-transparent hover:border-surface-200 dark:hover:border-surface-700 transition-all">
                                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-surface-300 to-surface-400 dark:from-surface-700 dark:to-surface-600 flex items-center justify-center text-white font-bold shadow-inner">
                                            {member.user?.fullName?.charAt(0) || 'U'}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="font-bold text-surface-900 dark:text-surface-100 truncate">{member.user?.fullName}</p>
                                            <p className="text-xs text-surface-500 uppercase tracking-widest font-semibold">{member.role}</p>
                                        </div>
                                        {member.role === 'LEADER' && <Badge variant="accent" size="sm">Admin</Badge>}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Performance Sidebar */}
                <div className="space-y-6">
                    {/* Club Stats */}
                    <div className="glass-card overflow-hidden">
                        <div className="bg-primary-600 p-4 text-white">
                            <h3 className="font-bold flex items-center gap-2"><Globe className="w-4 h-4" /> Quick Stats</h3>
                        </div>
                        <div className="p-6 space-y-5">
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-medium text-surface-500">Founded</span>
                                <span className="text-sm font-bold text-surface-900 dark:text-surface-100">Fall 2024</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-medium text-surface-500">Category</span>
                                <Badge variant="primary" size="sm">{currentClub.category}</Badge>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-medium text-surface-500">Access</span>
                                <span className="text-sm font-bold text-emerald-600 flex items-center gap-1.5">
                                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> {currentClub.isOpen ? 'Open to All' : 'Invite Only'}
                                </span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-medium text-surface-500">Global Rank</span>
                                <span className="text-sm font-black text-surface-900 dark:text-surface-100">#4</span>
                            </div>
                        </div>
                    </div>

                    {/* Club Leader */}
                    <div className="glass-card p-6 border-l-4 border-accent-500">
                        <h3 className="font-bold text-surface-900 dark:text-surface-100 mb-5 flex items-center gap-2">
                            <Shield className="w-4 h-4 text-accent-500" /> Administrative Leader
                        </h3>
                        <div className="flex items-center gap-4">
                            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-accent-400 to-primary-400 flex items-center justify-center text-white font-black text-xl shadow-lg shadow-accent-500/20">
                                {currentClub.leaderName?.charAt(0)}
                            </div>
                            <div>
                                <p className="font-black text-surface-900 dark:text-surface-100 text-lg">{currentClub.leaderName}</p>
                                <p className="text-xs font-bold text-surface-500 uppercase tracking-widest mt-0.5">Primary Administrator</p>
                            </div>
                        </div>
                        <Button variant="ghost" size="sm" className="w-full mt-6 rounded-xl border border-surface-200 dark:border-surface-700 font-bold hover:bg-surface-50 dark:hover:bg-surface-800">
                            Message Leader
                        </Button>
                    </div>

                    {/* Tips/Inspiration Tooltip */}
                    <div className="bg-gradient-to-br from-surface-900 to-black p-6 rounded-3xl text-white shadow-2xl">
                        <div className="flex items-center gap-2 mb-3">
                            <Sparkles className="w-4 h-4 text-accent-400" />
                            <h4 className="text-sm font-black uppercase tracking-widest">Connect Tip</h4>
                        </div>
                        <p className="text-sm text-surface-300 leading-relaxed">
                            Joining a club increases your <b>Collaborator Score</b> by +50. Active participation leads to exclusive mentor invites.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
