import { z } from 'zod';

export const createTransactionSchema = z.object({
  accountId: z.string().uuid(),
  categoryId: z.string().optional(),
  type: z.enum(['INCOME', 'EXPENSE']),
  amount: z.number().positive(),
  currency: z.string().min(3).max(3),
  date: z.string(),
  notes: z.string().optional(),
  tags: z.array(z.string()).default([])
});
