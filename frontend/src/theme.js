import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#800080', // Purple
    },
    secondary: {
      main: '#FFA500', // Orange
    },
  },
  typography: {
    h1: { color: '#800080' }, // Purple
    h2: { color: '#800080' }, // Purple
    h3: { color: '#800080' }, // Purple
    h4: { color: '#800080' }, // Purple
    h5: { color: '#800080' }, // Purple
    h6: { color: '#FFA500' }, // Orange for titles
  },
});

export default theme;