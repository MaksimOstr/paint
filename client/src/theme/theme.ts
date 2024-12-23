'use client'

import { createTheme, PaletteMode } from "@mui/material/styles";

const theme = (mode: PaletteMode) =>
  createTheme({
    palette: {
      mode: mode,
      ...(mode === "light"
        ? {
            background: {
              default: "#ffffff",
              paper: "#f5f5f5",
            },
            text: {
              primary: "#000000",
              secondary: "#616161",
            },
            primary: {
              main: "#4A90E2",
            },
            secondary: {
              main: "#FF4081",
            },
          }
        : {
            // Цвета для тёмного режима
            background: {
              default: "#000000",
              paper: "#121212",
            },
            text: {
              primary: "#ffffff",
              secondary: "#bdbdbd",
            },
            primary: {
              main: "#4A90E2",
            },
            secondary: {
              main: "#FF4081",
            },
          }),
    },
    typography: {
      fontFamily: "Roboto, sans-serif",
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: "8px",
            textTransform: "none",
            fontWeight: "bold",
          },
        },
      },
    },
  });

export default theme;
