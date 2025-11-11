import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import Profile from './components/Profile';
import ServiceList from './components/ServiceList';
import { useAuth } from './context/AuthContext';
import { AppBar, Toolbar, Typography, Container, Box, Button } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';
import AppProviders from './context/AppProviders';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <AppProviders>
          <MainApp />
        </AppProviders>
      </Router>
    </ThemeProvider>
  );
}

// Extracted the main application logic to a new component
// so it can be wrapped by AppProviders and access the context.
const MainApp = () => {
  const { user, logout } = useAuth();

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component={Link} to={user ? "/dashboard" : "/"} sx={{ flexGrow: 1, color: 'inherit', textDecoration: 'none' }}>
            Paws Connect
          </Typography>
          {user ? (
            <>
              <Button color="inherit" component={Link} to="/services">Services</Button>
              <Button color="inherit" component={Link} to={`/profile/${user.id}`}>My Profile</Button>
              <Typography sx={{ mr: 2 }}>Hello, {user.username}</Typography>
              <Button color="inherit" onClick={logout}>Logout</Button>
            </>
          ) : (
            <>
              <Button color="inherit" component={Link} to="/login">Login</Button>
              <Button color="inherit" component={Link} to="/register">Register</Button>
            </>
          )}
        </Toolbar>
      </AppBar>
      <Container>
        <Box sx={{ mt: 4 }}>
                <Routes>
                  <Route path="/login" element={user ? <Navigate to="/dashboard" /> : <Login />} />
                  <Route path="/register" element={user ? <Navigate to="/dashboard" /> : <Register />} />
                  <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/login" />} />
                  <Route path="/profile/:id" element={user ? <Profile /> : <Navigate to="/login" />} />
                  <Route path="/services" element={user ? <ServiceList /> : <Navigate to="/login" />} />
                  <Route path="/" element={user ? <Navigate to="/dashboard" /> : <Navigate to="/login" />} />
                </Routes>
        </Box>
      </Container>
    </div>
  );
};

export default App;
