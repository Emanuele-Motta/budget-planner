import { Button, Card, CardContent, Grid2, Stack, Typography } from '@mui/material';
import { useDashboard } from '../hooks/useDashboard';
import { ExpenseTrendChart } from '../components/charts/ExpenseTrendChart';
import { CategoryPieChart } from '../components/charts/CategoryPieChart';
import { api } from '../services/api';

export const DashboardPage = () => {
  const { data } = useDashboard();

  const fakeTrend = [
    { name: 'Gen', value: 400 },
    { name: 'Feb', value: 480 },
    { name: 'Mar', value: 420 },
    { name: 'Apr', value: 530 }
  ];

  return (
    <Stack gap={2}>
      <Typography variant='h4'>Dashboard Finanziaria</Typography>
      <Grid2 container spacing={2}>
        {[
          ['Saldo totale', data?.totalBalance ?? 0],
          ['Spese mese', data?.monthlyExpenses ?? 0],
          ['Entrate mese', data?.monthlyIncome ?? 0],
          ['Tasso risparmio', `${(data?.savingsRate ?? 0).toFixed(1)}%`]
        ].map(([label, value]) => (
          <Grid2 size={{ xs: 12, sm: 6, md: 3 }} key={String(label)}>
            <Card><CardContent><Typography color='text.secondary'>{label}</Typography><Typography variant='h5'>{value}</Typography></CardContent></Card>
          </Grid2>
        ))}
      </Grid2>

      <Grid2 container spacing={2}>
        <Grid2 size={{ xs: 12, md: 8 }}><Card><CardContent><Typography variant='h6'>Andamento spese</Typography><ExpenseTrendChart data={fakeTrend} /></CardContent></Card></Grid2>
        <Grid2 size={{ xs: 12, md: 4 }}><Card><CardContent><Typography variant='h6'>Categorie</Typography><CategoryPieChart data={fakeTrend} /></CardContent></Card></Grid2>
      </Grid2>

      <Button variant='contained' onClick={() => api.post('/ai/analyze')}>Analizza le mie finanze</Button>
    </Stack>
  );
};
