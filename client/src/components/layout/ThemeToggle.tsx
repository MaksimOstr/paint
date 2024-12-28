'use client';

import { IconButton } from '@mui/material';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { useTheme } from '@/providers/ThemeProvider';


const ThemeToggleButton = () => {
  const { mode, toggleTheme } = useTheme();

  return (
    <IconButton onClick={toggleTheme} color="inherit" size='medium'>
      {mode === 'light' ? <DarkModeIcon fontSize='large'/> : <LightModeIcon fontSize='large'/>}
    </IconButton>
  );
};

export default ThemeToggleButton;