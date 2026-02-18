import { Card, CardContent, Stack, Typography } from '@mui/material';

export const BudgetsPage = () => (
  <Stack gap={2}>
    <Typography variant='h4'>Budgets</Typography>
    <Card><CardContent><Typography>Sezione Budgets pronta per estensioni (CRUD, notifiche, export/import, multi valuta).</Typography></CardContent></Card>
  </Stack>
);
