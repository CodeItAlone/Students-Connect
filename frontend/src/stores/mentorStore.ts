import { create } from 'zustand';
import { Mentor, MentorBooking, MentorSlot } from '@/types';
import api from '@/lib/api';

interface MentorState {
    mentors: Mentor[];
    currentMentor: Mentor | null;
    isLoading: boolean;
    error: string | null;
    fetchMentors: () => Promise<void>;
    fetchMentorById: (id: number) => Promise<void>;
    bookSession: (mentorId: number, slotId: number, topic: string) => Promise<void>;
}

export const useMentorStore = create<MentorState>()((set) => ({
    mentors: [],
    currentMentor: null,
    isLoading: false,
    error: null,

    fetchMentors: async () => {
        set({ isLoading: true, error: null });
        try {
            const response = await api.get<Mentor[]>('/mentors');
            set({ mentors: response.data, isLoading: false });
        } catch (error: any) {
            set({ isLoading: false, error: error.response?.data?.message || 'Failed to fetch mentors' });
        }
    },

    fetchMentorById: async (id: number) => {
        set({ isLoading: true, error: null });
        try {
            const response = await api.get<Mentor>(`/mentors/${id}`);
            set({ currentMentor: response.data, isLoading: false });
        } catch (error: any) {
            set({ isLoading: false, error: error.response?.data?.message || 'Failed to fetch mentor' });
        }
    },

    bookSession: async (mentorId: number, slotId: number, topic: string) => {
        try {
            await api.post(`/mentors/${mentorId}/book?slotId=${slotId}&topic=${encodeURIComponent(topic)}`);
        } catch (error: any) {
            console.error('Failed to book session:', error);
            throw error;
        }
    }
}));
