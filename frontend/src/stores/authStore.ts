import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User, LoginDto, RegisterDto, AuthResponse } from '@/types';
import api from '@/lib/api';

interface AuthState {
    user: User | null;
    accessToken: string | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    error: string | null;
    login: (credentials: LoginDto) => Promise<void>;
    register: (data: RegisterDto) => Promise<void>;
    logout: () => void;
    refreshToken: () => Promise<void>;
    initializeOAuth: (token: string) => Promise<void>;
    setUser: (user: User) => void;
    clearError: () => void;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set, get) => ({
            user: null,
            accessToken: null,
            isAuthenticated: false,
            isLoading: false,
            error: null,

            login: async (credentials: LoginDto) => {
                set({ isLoading: true, error: null });
                try {
                    const response = await api.post<string>('/auth/login', credentials);
                    const accessToken = response.data;
                    localStorage.setItem("token", accessToken);

                    const userResp = await api.get<User>('/users/me');
                    const user = userResp.data;

                    set({
                        user,
                        accessToken,
                        isAuthenticated: true,
                        isLoading: false,
                    });
                } catch (error: any) {
                    set({
                        isLoading: false,
                        error: error.response?.data?.message || 'Login failed',
                    });
                    throw error;
                }
            },

            register: async (data: RegisterDto) => {
                set({ isLoading: true, error: null });
                try {
                    await api.post('/auth/register', data);
                    set({ isLoading: false });
                } catch (error: any) {
                    set({
                        isLoading: false,
                        error: error.response?.data?.message || 'Registration failed',
                    });
                    throw error;
                }
            },

            logout: () => {
                localStorage.removeItem("token");
                set({
                    user: null,
                    accessToken: null,
                    isAuthenticated: false,
                    error: null,
                });
                window.location.href = "/login";
            },

            refreshToken: async () => {
                try {
                    const response = await api.post<AuthResponse>('/auth/refresh');
                    const { accessToken, user } = response.data;
                    set({ accessToken, user, isAuthenticated: true });
                } catch (error) {
                    get().logout();
                    throw error;
                }
            },

            initializeOAuth: async (token: string) => {
                set({ isLoading: true, error: null });
                try {
                    localStorage.setItem("token", token);
                    const userResp = await api.get<User>('/users/me');
                    const user = userResp.data;

                    set({
                        user,
                        accessToken: token,
                        isAuthenticated: true,
                        isLoading: false,
                    });
                } catch (error: any) {
                    localStorage.removeItem("token");
                    set({
                        isLoading: false,
                        error: error.response?.data?.message || 'OAuth initialization failed',
                    });
                    throw error;
                }
            },

            setUser: (user: User) => set({ user }),
            clearError: () => set({ error: null }),
        }),
        {
            name: 'student-connect-auth',
            partialize: (state) => ({
                user: state.user,
                accessToken: state.accessToken,
                isAuthenticated: state.isAuthenticated,
            }),
        }
    )
);
