import { create } from 'zustand';
import { Badge, LeaderboardEntry } from '@/types';
import api from '@/lib/api';

interface GamificationState {
    leaderboard: LeaderboardEntry[];
    badges: Badge[];
    myBadges: Badge[];
    isLoading: boolean;
    fetchLeaderboard: (page?: number, size?: number) => Promise<void>;
    fetchBadges: () => Promise<void>;
    fetchMyBadges: () => Promise<void>;
}

export const useGamificationStore = create<GamificationState>()((set) => ({
    leaderboard: [],
    badges: [],
    myBadges: [],
    isLoading: false,

    fetchLeaderboard: async (page = 0, size = 20) => {
        set({ isLoading: true });
        try {
            const response = await api.get<LeaderboardEntry[]>(`/gamification/leaderboard?page=${page}&size=${size}`);
            set({ leaderboard: response.data, isLoading: false });
        } catch (error: any) {
            set({ isLoading: false });
            console.error('Failed to fetch leaderboard:', error);
        }
    },

    fetchBadges: async () => {
        try {
            const response = await api.get<Badge[]>('/gamification/badges');
            set({ badges: response.data });
        } catch (error: any) {
            console.error('Failed to fetch badges:', error);
        }
    },

    fetchMyBadges: async () => {
        try {
            const response = await api.get<Badge[]>('/gamification/my-badges');
            set({ myBadges: response.data });
        } catch (error: any) {
            console.error('Failed to fetch my badges:', error);
        }
    }
}));
