import { Alert, Button, Paper, Stack, TextField, Typography } from '@mui/material';
import { FormEvent, useState } from 'react';
import { api } from '../services/api';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export const RegisterPage = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await api.post('/auth/register', { fullName, email, password });
      navigate('/login');
    } catch (err) {
      if (axios.isAxiosError(err) && !err.response) {
        setError('Backend non raggiungibile. Controlla VITE_API_URL e che l\'API sia online.');
      } else {
        setError('Registrazione non riuscita. Verifica i dati e riprova.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper sx={{ p: 3, maxWidth: 420, mx: 'auto', mt: 10 }}>
      <Stack component='form' gap={2} onSubmit={onSubmit}>
        <Typography variant='h5'>Registrazione</Typography>
        {error ? <Alert severity='error'>{error}</Alert> : null}
        <TextField label='Nome completo' value={fullName} onChange={(e) => setFullName(e.target.value)} />
        <TextField label='Email' value={email} onChange={(e) => setEmail(e.target.value)} />
        <TextField type='password' label='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
        <Button variant='contained' type='submit' disabled={loading}>{loading ? 'Creazione...' : 'Crea account'}</Button>
      </Stack>
    </Paper>
  );
};
