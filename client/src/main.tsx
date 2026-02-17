import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { AppRouter } from './app/router';
import './i18n';
import { useThemeStore } from './store/theme.store';
import { buildTheme } from './theme/theme';

const queryClient = new QueryClient();

const Root = () => {
  const mode = useThemeStore((s) => s.mode);

  return (
    <ThemeProvider theme={buildTheme(mode)}>
      <CssBaseline />
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <AppRouter />
        </BrowserRouter>
      </QueryClientProvider>
    </ThemeProvider>
  );
};

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>
);
