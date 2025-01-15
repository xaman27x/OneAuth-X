import React from 'react';
import ReactDOM from 'react-dom/client'; // Correct import for React 18
import App from './App';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import reportWebVitals from './reportWebVitals'; // Ensure you have this file

// Create a theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2', // Primary color
    },
    background: {
      paper: '#fff', // Background color for containers
    },
  },
});

// Initialize the root
const root = ReactDOM.createRoot(document.getElementById('root')); // Create root

// Render the app
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
