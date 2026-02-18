import { AppBar, Box, Drawer, IconButton, List, ListItemButton, ListItemText, Toolbar, Typography } from '@mui/material';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { Link, Outlet } from 'react-router-dom';
import { useThemeStore } from '../../store/theme.store';

const items = [
  ['/', 'Dashboard'],
  ['/transactions', 'Transazioni'],
  ['/accounts', 'Conti'],
  ['/budgets', 'Budget'],
  ['/savings', 'Risparmi'],
  ['/ai-analysis', 'Analisi AI'],
  ['/ai-chat', 'Chat AI'],
  ['/settings', 'Impostazioni']
];

export const AppLayout = () => {
  const toggleMode = useThemeStore((s) => s.toggleMode);

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar position='fixed'>
        <Toolbar>
          <Typography variant='h6' sx={{ flexGrow: 1 }}>Budget Planner</Typography>
          <IconButton color='inherit' onClick={toggleMode}><DarkModeIcon /></IconButton>
        </Toolbar>
      </AppBar>
      <Drawer variant='permanent' sx={{ width: 220, [`& .MuiDrawer-paper`]: { width: 220, top: 64 } }}>
        <List>
          {items.map(([to, label]) => (
            <ListItemButton component={Link} to={to} key={to}><ListItemText primary={label} /></ListItemButton>
          ))}
        </List>
      </Drawer>
      <Box component='main' sx={{ flexGrow: 1, p: 3, mt: 8, ml: { xs: 0, md: '220px' } }}>
        <Outlet />
      </Box>
    </Box>
  );
};
