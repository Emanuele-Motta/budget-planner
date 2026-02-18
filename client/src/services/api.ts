import axios from 'axios';
import { useAuthStore } from '../store/auth.store';

const LOCAL_HOSTS = ['localhost', '127.0.0.1'];

const isLocalUrl = (url: string) => LOCAL_HOSTS.some((host) => url.includes(host));
const isLocalBrowserHost = () => typeof window !== 'undefined' && LOCAL_HOSTS.includes(window.location.hostname);

const getSupabaseFunctionBaseUrl = () => {
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL?.trim();
  if (!supabaseUrl) return null;

  const normalizedSupabaseUrl = supabaseUrl.replace(/\/$/, '');
  return `${normalizedSupabaseUrl}/functions/v1/api`;
};

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

  return getSupabaseFunctionBaseUrl() ?? '/api';
};

export const api = axios.create({
  baseURL: resolveApiBaseUrl()
});

const supabaseKey = import.meta.env.VITE_SUPABASE_KEY?.trim();
if (supabaseKey) {
  api.defaults.headers.common.apikey = supabaseKey;
}

api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().accessToken;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  } else if (supabaseKey) {
    config.headers.Authorization = `Bearer ${supabaseKey}`;
  }

  return config;
});
