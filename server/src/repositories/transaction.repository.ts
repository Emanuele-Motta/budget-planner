import { prisma } from '../config/prisma.js';

export const transactionRepository = {
  listByUser: (userId: string) => prisma.transaction.findMany({ where: { userId }, include: { category: true, account: true }, orderBy: { date: 'desc' } }),
  create: (data: Parameters<typeof prisma.transaction.create>[0]['data']) => prisma.transaction.create({ data }),
  monthlyAggregates: async (userId: string) => {
    const txs = await prisma.transaction.findMany({ where: { userId } });
    return txs;
  }
};
