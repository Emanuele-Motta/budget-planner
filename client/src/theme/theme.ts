import { createTheme } from '@mui/material';

export const buildTheme = (mode: 'light' | 'dark') =>
  createTheme({
    palette: {
      mode,
      primary: { main: '#1976d2' },
      secondary: { main: '#26a69a' }
    },
    shape: { borderRadius: 14 }
  });
