import { Alert, Button, Paper, Stack, TextField, Typography } from '@mui/material';
import { FormEvent, useState } from 'react';
import { api } from '../services/api';
import { useAuthStore } from '../store/auth.store';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export const LoginPage = () => {
  const [email, setEmail] = useState('demo@budgetplanner.it');
  const [password, setPassword] = useState('password123');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const setAuth = useAuthStore((s) => s.setAuth);
  const navigate = useNavigate();

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await api.post('/auth/login', { email, password });
      setAuth({ accessToken: res.data.tokens.accessToken, user: res.data.user });
      navigate('/');
    } catch (err) {
      if (axios.isAxiosError(err) && err.response?.status === 401) {
        setError('Credenziali non valide.');
      } else if (axios.isAxiosError(err) && !err.response) {
        setError('Backend non raggiungibile. Controlla VITE_API_URL e che l\'API sia online.');
      } else {
        setError('Errore durante il login. Riprova.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper sx={{ p: 3, maxWidth: 420, mx: 'auto', mt: 10 }}>
      <Stack component='form' gap={2} onSubmit={onSubmit}>
        <Typography variant='h5'>Login</Typography>
        {error ? <Alert severity='error'>{error}</Alert> : null}
        <TextField label='Email' value={email} onChange={(e) => setEmail(e.target.value)} />
        <TextField type='password' label='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
        <Button variant='contained' type='submit' disabled={loading}>{loading ? 'Accesso...' : 'Accedi'}</Button>
      </Stack>
    </Paper>
  );
};
