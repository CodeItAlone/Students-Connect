import { create } from 'zustand';
import { Opportunity, PaginatedResponse } from '@/types';
import api from '@/lib/api';

interface OpportunityState {
    opportunities: Opportunity[];
    isLoading: boolean;
    error: string | null;
    fetchOpportunities: (type?: string, search?: string) => Promise<void>;
}

export const useOpportunityStore = create<OpportunityState>()((set) => ({
    opportunities: [],
    isLoading: false,
    error: null,

    fetchOpportunities: async (type = '', search = '') => {
        set({ isLoading: true, error: null });
        try {
            const params = new URLSearchParams();
            if (type && type !== 'ALL') params.append('type', type);
            if (search) params.append('search', search);

            const response = await api.get<PaginatedResponse<Opportunity>>(`/opportunities?${params}`);
            set({ opportunities: response.data.content, isLoading: false });
        } catch (error: any) {
            set({ isLoading: false, error: error.response?.data?.message || 'Failed to fetch opportunities' });
        }
    }
}));
