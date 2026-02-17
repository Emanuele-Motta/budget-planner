import { Button, Paper, Stack, TextField, Typography } from '@mui/material';
import { FormEvent, useState } from 'react';
import { api } from '../services/api';
import { useAuthStore } from '../store/auth.store';
import { useNavigate } from 'react-router-dom';

export const LoginPage = () => {
  const [email, setEmail] = useState('demo@budgetplanner.it');
  const [password, setPassword] = useState('password123');
  const setAuth = useAuthStore((s) => s.setAuth);
  const navigate = useNavigate();

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const res = await api.post('/auth/login', { email, password });
    setAuth({ accessToken: res.data.tokens.accessToken, user: res.data.user });
    navigate('/');
  };

  return (
    <Paper sx={{ p: 3, maxWidth: 420, mx: 'auto', mt: 10 }}>
      <Stack component='form' gap={2} onSubmit={onSubmit}>
        <Typography variant='h5'>Login</Typography>
        <TextField label='Email' value={email} onChange={(e) => setEmail(e.target.value)} />
        <TextField type='password' label='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
        <Button variant='contained' type='submit'>Accedi</Button>
      </Stack>
    </Paper>
  );
};
