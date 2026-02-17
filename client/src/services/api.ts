import axios from 'axios';
import { useAuthStore } from '../store/auth.store';

const apiBaseUrl = import.meta.env.VITE_API_URL ?? (import.meta.env.DEV ? 'http://localhost:4000/api' : '/api');

export const api = axios.create({
  baseURL: apiBaseUrl
});

api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().accessToken;
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});
