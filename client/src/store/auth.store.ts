import { create } from 'zustand';

interface AuthState {
  accessToken: string | null;
  user: { id: string; email: string; fullName: string } | null;
  setAuth: (payload: { accessToken: string; user: { id: string; email: string; fullName: string } }) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  accessToken: null,
  user: null,
  setAuth: ({ accessToken, user }) => set({ accessToken, user }),
  logout: () => set({ accessToken: null, user: null })
}));
