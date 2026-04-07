'use client';

import { useEffect, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, Users, Hash, Loader2 } from 'lucide-react';
import Link from 'next/link';
import MessageBubble from '@/components/chat/MessageBubble';
import ChatInput from '@/components/chat/ChatInput';
import { useChatStore } from '@/stores/chatStore';
import { useClubStore } from '@/stores/clubStore';
import { useAuthStore } from '@/stores/authStore';

export default function ClubChatPage() {
    const params = useParams();
    const router = useRouter();
    const slug = params.slug as string;
    const { user } = useAuthStore();
    const { currentClub, fetchClubBySlug } = useClubStore();
    const { messages, fetchHistory, connect, disconnect, sendMessage, isLoading } = useChatStore();
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (slug && !currentClub) {
            fetchClubBySlug(slug);
        }
    }, [slug, currentClub, fetchClubBySlug]);

    useEffect(() => {
        if (currentClub?.id) {
            fetchHistory(currentClub.id);
            connect(currentClub.id);
            return () => disconnect();
        }
    }, [currentClub?.id, fetchHistory, connect, disconnect]);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages]);

    const handleSend = (content: string) => {
        if (currentClub?.id) {
            sendMessage(currentClub.id, content);
        }
    };

    if (!currentClub && isLoading) {
        return (
            <div className="h-[60vh] flex items-center justify-center">
                <Loader2 className="w-8 h-8 text-primary-600 animate-spin" />
            </div>
        );
    }

    if (!currentClub) return null;

    return (
        <div className="flex flex-col h-[calc(100vh-var(--navbar-height)-3rem)] animate-fade-in">
            {/* Chat Header */}
            <div className="flex items-center gap-3 pb-4 border-b border-surface-200 dark:border-surface-700">
                <button onClick={() => router.back()} className="p-2 hover:bg-surface-100 dark:hover:bg-surface-800 rounded-xl transition-colors">
                    <ArrowLeft className="w-5 h-5 text-surface-500" />
                </button>
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center text-white font-bold">
                    <Hash className="w-5 h-5" />
                </div>
                <div className="flex-1">
                    <h2 className="font-semibold text-surface-900 dark:text-surface-100">{currentClub.name}</h2>
                    <div className="flex items-center gap-1 text-xs text-surface-500">
                        <Users className="w-3 h-3" />
                        <span>{currentClub.memberCount} members</span>
                    </div>
                </div>
            </div>

            {/* Messages */}
            <div 
                ref={scrollRef}
                className="flex-1 overflow-y-auto py-4 space-y-4 scrollbar-hide"
            >
                {messages.map((msg) => (
                    <MessageBubble 
                        key={msg.id} 
                        message={msg} 
                        isOwn={msg.sender.id === user?.id} 
                    />
                ))}
                {messages.length === 0 && !isLoading && (
                    <div className="h-full flex flex-col items-center justify-center text-surface-400 space-y-2">
                        <MessageSquare className="w-12 h-12 opacity-20" />
                        <p>No messages yet. Start the conversation!</p>
                    </div>
                )}
            </div>

            {/* Input */}
            <ChatInput onSend={handleSend} />
        </div>
    );
}

import { MessageSquare } from 'lucide-react';
