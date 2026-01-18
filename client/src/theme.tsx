// src/theme.ts
import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  spacing: 8,
  shape: { borderRadius: 12 },

  typography: {
    fontFamily: [
      'Assistant',
      'sans-serif',
      'Rubik',
    ].join(','),
    h4: { fontWeight: 700 },
    h2: { fontWeight: 700 },
    h5: { fontWeight: 700 },
    h6: { fontWeight: 700 },
    body1: { lineHeight: 1.6 },
  },

  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: '#F6F7FB',
        },
      },
    },

    MuiContainer: {
      defaultProps: {
        maxWidth: 'lg',
      },
    },

    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
        },
      },
    },

    MuiButton: {
      defaultProps: {
        variant: 'contained',
      },
      styleOverrides: {
        root: {
          borderRadius: 12,
          textTransform: 'none',
          fontWeight: 600,
        },
      },
    },
  },
});