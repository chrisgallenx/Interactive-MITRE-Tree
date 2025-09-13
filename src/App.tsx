import React from 'react';
import { CssBaseline, ThemeProvider, createTheme, Box } from '@mui/material';
import AttackTree from './components/AttackTree';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
    ].join(','),
  },
});

const data = {
  label: "Root",
  children: [
    {
      label: "Child 1",
      children: [
        { label: "Grandchild 1" },
        { label: "Grandchild 2" }
      ]
    },
    {
      label: "Child 2"
    }
  ]
};

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ 
        height: '100vh', 
        width: '100vw', 
        overflow: 'hidden',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
      }}>
        <AttackTree />
      </Box>
    </ThemeProvider>
  );
}

export default App;
