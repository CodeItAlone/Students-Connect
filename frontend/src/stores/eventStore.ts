import { create } from 'zustand';
import { Event, PaginatedResponse } from '@/types';
import api from '@/lib/api';

interface EventState {
    events: Event[];
    isLoading: boolean;
    error: string | null;
    totalPages: number;
    currentPage: number;
    fetchEvents: (page?: number, type?: string, search?: string, clubId?: number) => Promise<void>;
    rsvpEvent: (eventId: number) => Promise<void>;
}

export const useEventStore = create<EventState>()((set, get) => ({
    events: [],
    isLoading: false,
    error: null,
    totalPages: 0,
    currentPage: 0,

    fetchEvents: async (page = 0, type = '', search = '', clubId?: number) => {
        set({ isLoading: true, error: null });
        try {
            const params = new URLSearchParams();
            params.append('page', String(page));
            params.append('size', '10');
            if (type && type !== 'ALL') params.append('type', type);
            if (search) params.append('search', search);
            if (clubId) params.append('clubId', String(clubId));

            const response = await api.get<PaginatedResponse<Event>>(`/events?${params}`);
            set({
                events: response.data.content,
                totalPages: response.data.totalPages,
                currentPage: response.data.currentPage,
                isLoading: false,
            });
        } catch (error: any) {
            set({ isLoading: false, error: error.response?.data?.message || 'Failed to fetch events' });
        }
    },

    rsvpEvent: async (eventId: number) => {
        try {
            await api.post(`/events/${eventId}/rsvp`);
            // Optimistically update the list
            set((state) => ({
                events: state.events.map(event => 
                    event.id === eventId 
                        ? { ...event, isRsvped: true, currentParticipants: event.currentParticipants + 1 } 
                        : event
                )
            }));
        } catch (error: any) {
            console.error('Failed to RSVP:', error);
            throw error;
        }
    }
}));
