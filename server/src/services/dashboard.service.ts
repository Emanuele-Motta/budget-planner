import dayjs from 'dayjs';
import { prisma } from '../config/prisma.js';

export const dashboardService = {
  async getKpi(userId: string) {
    const monthStart = dayjs().startOf('month').toDate();
    const monthEnd = dayjs().endOf('month').toDate();

    const [accounts, monthlyTx, allExpense] = await Promise.all([
      prisma.account.findMany({ where: { userId } }),
      prisma.transaction.findMany({ where: { userId, date: { gte: monthStart, lte: monthEnd } } }),
      prisma.transaction.findMany({ where: { userId, type: 'EXPENSE' } })
    ]);

    const totalBalance = accounts.reduce((acc, a) => acc + Number(a.balance), 0);
    const monthlyExpenses = monthlyTx.filter((t) => t.type === 'EXPENSE').reduce((acc, t) => acc + Number(t.amount), 0);
    const monthlyIncome = monthlyTx.filter((t) => t.type === 'INCOME').reduce((acc, t) => acc + Number(t.amount), 0);
    const savingsRate = monthlyIncome ? ((monthlyIncome - monthlyExpenses) / monthlyIncome) * 100 : 0;
    const averageExpense = allExpense.length ? allExpense.reduce((acc, t) => acc + Number(t.amount), 0) / allExpense.length : 0;

    return { totalBalance, monthlyExpenses, monthlyIncome, savingsRate, averageExpense };
  }
};
