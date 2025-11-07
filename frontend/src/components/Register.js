import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api'; // Import api from utils
import { Button, TextField, Container, Typography, Box, InputAdornment, IconButton, Alert } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useAuth } from '../context/AuthContext';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [serverError, setServerError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const { name, email, password } = formData;

  const validate = () => {
    let tempErrors = {};
    tempErrors.name = name ? "" : "Name is required.";
    tempErrors.email = (/$^|.+@.+..+/).test(email) ? "" : "Email is not valid.";
    tempErrors.password = password.length >= 6 ? "" : "Password must be at least 6 characters long.";
    setErrors(tempErrors);
    return Object.values(tempErrors).every(x => x === "");
  }

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Clear server error when user starts typing again
    if (serverError) {
      setServerError('');
    }
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        const newUser = {
          email,
          password,
          options: {
            data: {
              username: name.replace(/\s/g, '').toLowerCase(),
              full_name: name,
            }
          }
        };
        console.log('Attempting to register with:', { email, password, username: newUser.options.data.username });

        const res = await api.post('/auth/signup', newUser); // Use api object
        console.log('Registration successful, response:', res);

        if (res) {
          login(res.data); // Log the user in immediately
          navigate('/'); // Redirect to home page on success
        } else {
          console.error('API response is undefined');
          setServerError('An unexpected error occurred during registration.');
        }
      } catch (err) {
        console.error('Registration failed, error object:', err);
        if (err.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.error(err.response.data);
          if (err.response.data.message && err.response.data.message.includes('inappropriate content')) {
            setServerError('Username is invalid. Please try a different username (e.g., all lowercase).');
          } else {
            setServerError(err.response.data.message || 'An error occurred during registration.');
          }
        } else {
          // Something happened in setting up the request that triggered an Error
          console.error('Error', err.message);
          setServerError('An error occurred. Please try again later.');
        }
      }
    }
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <Container maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Box component="form" onSubmit={onSubmit} noValidate sx={{ mt: 1 }}>
          {serverError && <Alert severity="error" sx={{ width: '100%', mb: 2 }}>{serverError}</Alert>}
          <TextField
            margin="normal"
            required
            fullWidth
            id="name"
            label="Name"
            name="name"
            autoComplete="name"
            autoFocus
            value={name}
            onChange={onChange}
            {...(errors.name && { error: true, helperText: errors.name })}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            value={email}
            onChange={onChange}
            {...(errors.email && { error: true, helperText: errors.email })}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type={showPassword ? 'text' : 'password'}
            id="password"
            autoComplete="new-password"
            value={password}
            onChange={onChange}
            {...(errors.password && { error: true, helperText: errors.password })}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Register;
