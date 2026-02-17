export type CurrencyCode = 'EUR' | 'USD' | 'GBP';

export type AccountType = 'CASH' | 'BANK' | 'CARD' | 'INVESTMENT';

export interface JwtPayload {
  userId: string;
  email: string;
}

export interface DashboardKpi {
  totalBalance: number;
  monthlyExpenses: number;
  monthlyIncome: number;
  savingsRate: number;
  averageExpense: number;
}

export interface AIInsight {
  id: string;
  kind: 'SAVING_TIP' | 'ANOMALY' | 'FORECAST' | 'CATEGORY_SUGGESTION';
  title: string;
  description: string;
  createdAt: string;
}
