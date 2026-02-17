import { Button, Paper, Stack, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { api } from '../services/api';
import { useNavigate } from 'react-router-dom';

export const RegisterPage = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const onSubmit = async () => {
    await api.post('/auth/register', { fullName, email, password });
    navigate('/login');
  };

  return <Paper sx={{ p: 3, maxWidth: 420, mx: 'auto', mt: 10 }}><Stack gap={2}><Typography variant='h5'>Registrazione</Typography><TextField label='Nome completo' value={fullName} onChange={(e) => setFullName(e.target.value)} /><TextField label='Email' value={email} onChange={(e) => setEmail(e.target.value)} /><TextField type='password' label='Password' value={password} onChange={(e) => setPassword(e.target.value)} /><Button variant='contained' onClick={onSubmit}>Crea account</Button></Stack></Paper>;
};
