import { create } from 'zustand';
import { Club, ClubMember, PaginatedResponse } from '@/types';
import api from '@/lib/api';

interface ClubState {
    clubs: Club[];
    currentClub: Club | null;
    members: ClubMember[];
    isLoading: boolean;
    error: string | null;
    totalPages: number;
    currentPage: number;
    fetchClubs: (page?: number, search?: string, category?: string) => Promise<void>;
    fetchClubBySlug: (slug: string) => Promise<void>;
    fetchMembers: (clubId: number) => Promise<void>;
    joinClub: (clubId: number) => Promise<void>;
    leaveClub: (clubId: number) => Promise<void>;
    clearCurrentClub: () => void;
}

export const useClubStore = create<ClubState>()((set) => ({
    clubs: [],
    currentClub: null,
    members: [],
    isLoading: false,
    error: null,
    totalPages: 0,
    currentPage: 0,

    fetchClubs: async (page = 0, search = '', category = '') => {
        set({ isLoading: true, error: null });
        try {
            const params = new URLSearchParams();
            params.append('page', String(page));
            params.append('size', '12');
            if (search) params.append('search', search);
            if (category) params.append('category', category);

            const response = await api.get<PaginatedResponse<Club>>(`/clubs?${params}`);
            set({
                clubs: response.data.content,
                totalPages: response.data.totalPages,
                currentPage: response.data.currentPage,
                isLoading: false,
            });
        } catch (error: any) {
            set({ isLoading: false, error: error.response?.data?.message || 'Failed to fetch clubs' });
        }
    },

    fetchClubBySlug: async (slug: string) => {
        set({ isLoading: true, error: null });
        try {
            const response = await api.get<Club>(`/clubs/${slug}`);
            set({ currentClub: response.data, isLoading: false });
        } catch (error: any) {
            set({ isLoading: false, error: error.response?.data?.message || 'Failed to fetch club' });
        }
    },

    fetchMembers: async (clubId: number) => {
        try {
            const response = await api.get<ClubMember[]>(`/clubs/${clubId}/members`);
            set({ members: response.data });
        } catch (error: any) {
            console.error('Failed to fetch members:', error);
        }
    },

    joinClub: async (clubId: number) => {
        try {
            await api.post(`/clubs/${clubId}/join`);
            set((state) => ({
                currentClub: state.currentClub
                    ? { ...state.currentClub, isJoined: true, memberCount: state.currentClub.memberCount + 1 }
                    : null,
            }));
        } catch (error: any) {
            console.error('Failed to join club:', error);
        }
    },

    leaveClub: async (clubId: number) => {
        try {
            await api.post(`/clubs/${clubId}/leave`);
            set((state) => ({
                currentClub: state.currentClub
                    ? { ...state.currentClub, isJoined: false, memberCount: state.currentClub.memberCount - 1 }
                    : null,
            }));
        } catch (error: any) {
            console.error('Failed to leave club:', error);
        }
    },

    clearCurrentClub: () => set({ currentClub: null, members: [] }),
}));
