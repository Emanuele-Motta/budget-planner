import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { api } from '../services/api';

export const useTransactions = () => {
  const qc = useQueryClient();

  const list = useQuery({
    queryKey: ['transactions'],
    queryFn: async () => (await api.get('/transactions')).data
  });

  const create = useMutation({
    mutationFn: async (payload: unknown) => (await api.post('/transactions', payload)).data,
    onSuccess: () => qc.invalidateQueries({ queryKey: ['transactions'] })
  });

  return { list, create };
};
