import { useQuery } from '@tanstack/react-query';
import { api } from '../services/api';

export const useDashboard = () =>
  useQuery({
    queryKey: ['dashboard-kpi'],
    queryFn: async () => (await api.get('/dashboard/kpi')).data
  });
