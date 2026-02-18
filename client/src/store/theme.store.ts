import { create } from 'zustand';

interface ThemeState {
  mode: 'light' | 'dark';
  toggleMode: () => void;
}

export const useThemeStore = create<ThemeState>((set) => ({
  mode: 'light',
  toggleMode: () => set((s) => ({ mode: s.mode === 'light' ? 'dark' : 'light' }))
}));
