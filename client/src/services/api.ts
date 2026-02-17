import axios from 'axios';
import { useAuthStore } from '../store/auth.store';

const LOCAL_HOSTS = ['localhost', '127.0.0.1'];

const isLocalUrl = (url: string) => LOCAL_HOSTS.some((host) => url.includes(host));
const isLocalBrowserHost = () => typeof window !== 'undefined' && LOCAL_HOSTS.includes(window.location.hostname);

const resolveApiBaseUrl = () => {
  const envUrl = import.meta.env.VITE_API_URL?.trim();

  if (envUrl) {
    if (isLocalUrl(envUrl) && !isLocalBrowserHost()) {
      console.warn('[api] Ignoro VITE_API_URL locale in ambiente remoto:', envUrl);
    } else {
      return envUrl;
    }
  }

  if (import.meta.env.DEV) {
    return 'http://localhost:4000/api';
  }

  return '/api';
};

export const api = axios.create({
  baseURL: resolveApiBaseUrl()
});

api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().accessToken;
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});
