import { Navigate, Route, Routes } from 'react-router-dom';
import { AppLayout } from '../components/layout/AppLayout';
import { useAuthStore } from '../store/auth.store';
import { LoginPage } from '../pages/LoginPage';
import { RegisterPage } from '../pages/RegisterPage';
import { DashboardPage } from '../pages/DashboardPage';
import { TransactionsPage } from '../pages/TransactionsPage';
import { AccountsPage } from '../pages/AccountsPage';
import { BudgetsPage } from '../pages/BudgetsPage';
import { SavingsPage } from '../pages/SavingsPage';
import { AIAnalysisPage } from '../pages/AIAnalysisPage';
import { AIChatPage } from '../pages/AIChatPage';
import { SettingsPage } from '../pages/SettingsPage';

const Protected = ({ children }: { children: JSX.Element }) => {
  const token = useAuthStore((s) => s.accessToken);
  return token ? children : <Navigate to='/login' replace />;
};

export const AppRouter = () => (
  <Routes>
    <Route path='/login' element={<LoginPage />} />
    <Route path='/register' element={<RegisterPage />} />

    <Route path='/' element={<Protected><AppLayout /></Protected>}>
      <Route index element={<DashboardPage />} />
      <Route path='transactions' element={<TransactionsPage />} />
      <Route path='accounts' element={<AccountsPage />} />
      <Route path='budgets' element={<BudgetsPage />} />
      <Route path='savings' element={<SavingsPage />} />
      <Route path='ai-analysis' element={<AIAnalysisPage />} />
      <Route path='ai-chat' element={<AIChatPage />} />
      <Route path='settings' element={<SettingsPage />} />
    </Route>
  </Routes>
);
