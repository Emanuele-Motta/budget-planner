import axios from 'axios';
import { useAuthStore } from '../store/auth.store';

const resolveApiBaseUrl = () => {
  const envUrl = import.meta.env.VITE_API_URL?.trim();

  if (envUrl) {
    const isLocalEnv = envUrl.includes('localhost') || envUrl.includes('127.0.0.1');
    const isLocalHost = typeof window !== 'undefined' && ['localhost', '127.0.0.1'].includes(window.location.hostname);

    if (!isLocalEnv || isLocalHost) {
      return envUrl;
    }
  }

  return import.meta.env.DEV ? 'http://localhost:4000/api' : '/api';
};

export const api = axios.create({
  baseURL: resolveApiBaseUrl()
});

api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().accessToken;
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});
