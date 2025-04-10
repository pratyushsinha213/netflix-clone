import { create } from 'zustand';
import { axiosInstance } from '../utils/axios';
import { toast } from 'react-hot-toast';

export const useAuthStore = create((set) => ({
    user: null,
    isCheckingAuth: true,
    isLoading: false, // This acts as both isRegistering and isLoggingIn = false
    isLoggingOut: false,
    register: async (credentials) => {
        set({ isLoading: true, user: null });
        try {
            const response = await axiosInstance.post('/auth/register', credentials);
            set({ user: response.data.user });
            toast.success(response.data.message || "Account created successfully.");
        } catch (error) {
            toast.error(error.response.data.message || "Registration failed.");
            set({ user: null });
        } finally {
            set({ isLoading: false });
        }
    },
    login: async (credentials) => {
        set({ isLoading: true, user: null });
        try {
            const response = await axiosInstance.post('/auth/login', credentials);
            set({ user: response.data.user });
            toast.success(response.data.message || "Logged in successfully.");
        } catch (error) {
            set({ user: null });
            toast.error(error.response.data.message || "Login failed.");
        } finally {
            set({ isLoading: false });
        }
    },
    logout: async () => {
        set({ isLoggingOut: true });
        try {
            const response = await axiosInstance.post('/auth/logout');
            set({ user: null });
            toast.success(response.data.message || "Logged out successfully.");
        } catch (error) {
            toast.error(error.response.data.message || "Logout failed.");
        } finally {
            set({ isLoggingOut: false });
        }
    },
    checkAuth: async () => {
        set({ isCheckingAuth: true, user: null });
        try {
            const response = await axiosInstance.get('/auth/check-auth');
            set({ user: response.data.user });
        // eslint-disable-next-line no-unused-vars
        } catch (error) {
            set({ user: null });
        } finally {
            set({ isCheckingAuth: false });
        }
    }
}));