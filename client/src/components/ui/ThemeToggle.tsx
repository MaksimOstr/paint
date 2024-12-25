'use client';

import { IconButton } from '@mui/material';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { useTheme } from '@/theme/ThemeProvider';


const ThemeToggleButton = () => {
  const { mode, toggleTheme } = useTheme();

  return (
    <IconButton sx={{ position: 'absolute', right: '20px', top: '20px' }} onClick={toggleTheme} color="inherit">
      {mode === 'light' ? <DarkModeIcon/> : <LightModeIcon />}
    </IconButton>
  );
};

export default ThemeToggleButton;