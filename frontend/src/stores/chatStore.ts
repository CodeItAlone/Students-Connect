import { create } from 'zustand';
import { ChatMessage, PaginatedResponse } from '@/types';
import api from '@/lib/api';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

interface ChatState {
    messages: ChatMessage[];
    isLoading: boolean;
    error: string | null;
    stompClient: Client | null;
    fetchHistory: (clubId: number, page?: number) => Promise<void>;
    connect: (clubId: number) => void;
    disconnect: () => void;
    sendMessage: (clubId: number, content: string) => void;
}

export const useChatStore = create<ChatState>()((set, get) => ({
    messages: [],
    isLoading: false,
    error: null,
    stompClient: null,

    fetchHistory: async (clubId: number, page = 0) => {
        set({ isLoading: true, error: null });
        try {
            const response = await api.get<PaginatedResponse<ChatMessage>>(`/clubs/${clubId}/chat/history?page=${page}&size=50`);
            set({ 
                messages: page === 0 ? response.data.content.reverse() : [...response.data.content.reverse(), ...get().messages],
                isLoading: false 
            });
        } catch (error: any) {
            set({ isLoading: false, error: error.response?.data?.message || 'Failed to fetch chat history' });
        }
    },

    connect: (clubId: number) => {
        const socket = new SockJS(`${process.env.NEXT_PUBLIC_API_URL || 'https://students-connect-bw3g.onrender.com'}/ws`);
        const client = new Client({
            webSocketFactory: () => socket,
            onConnect: () => {
                client.subscribe(`/topic/club/${clubId}/chat`, (message) => {
                    const newMessage = JSON.parse(message.body) as ChatMessage;
                    set((state) => ({ messages: [...state.messages, newMessage] }));
                });
            },
            onStompError: (frame) => {
                console.error('Broker reported error: ' + frame.headers['message']);
                console.error('Additional details: ' + frame.body);
            },
        });

        client.activate();
        set({ stompClient: client });
    },

    disconnect: () => {
        const { stompClient } = get();
        if (stompClient) {
            stompClient.deactivate();
            set({ stompClient: null });
        }
    },

    sendMessage: (clubId: number, content: string) => {
        const { stompClient } = get();
        if (stompClient && stompClient.connected) {
            stompClient.publish({
                destination: `/app/club/${clubId}/chat`,
                body: JSON.stringify({ content }),
            });
        } else {
            console.error('STOMP client is not connected');
        }
    }
}));
