import { createTheme, ThemeOptions } from '@mui/material/styles';


export const lightTheme: ThemeOptions = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#2979ff',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#ff7043',
    },
    background: {
      default: '#e3e3e3',
      paper: '#ffffff',
    },
    text: {
      primary: '#1a1a1a',
      secondary: '#555555',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Arial", sans-serif',
    fontSize: 14,
    button: {
      textTransform: 'none',
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 500,
      md: 900,
      lg: 1400,
      xl: 2000,
    }
  }
});


export const darkTheme: ThemeOptions = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#90caf9',
      contrastText: '#000000',
    },
    secondary: {
      main: '#ffab91',
    },
    background: {
      default: '#292929',
      paper: '#1e1e1e',
    },
    text: {
      primary: '#ffffff',
      secondary: '#bbbbbb',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Arial", sans-serif',
    fontSize: 14,
    button: {
      textTransform: 'none',
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 500,
      md: 900,
      lg: 1400,
      xl: 2000,
    }
  }
});


