import { Button, Card, CardContent, Chip, Stack, Typography } from '@mui/material';
import { useTransactions } from '../hooks/useTransactions';

export const TransactionsPage = () => {
  const { list } = useTransactions();
  return <Stack gap={2}><Typography variant='h4'>Transazioni</Typography>{list.data?.map((tx: any) => <Card key={tx.id}><CardContent><Stack direction='row' justifyContent='space-between'><Typography>{tx.category?.name ?? 'Senza categoria'} - {tx.amount} {tx.currency}</Typography><Chip label={tx.type} color={tx.type === 'INCOME' ? 'success' : 'error'} /></Stack><Typography color='text.secondary'>{new Date(tx.date).toLocaleDateString('it-IT')}</Typography></CardContent></Card>) ?? null}<Button variant='outlined'>Import CSV / Excel</Button></Stack>;
};
