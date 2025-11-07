import React from 'react';
import { Grid, Paper, Typography } from '@mui/material';
import Pets from './Pets';
import Feed from './Feed';
import PostForm from './PostForm';

const Dashboard = () => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography variant="h4" component="h1" gutterBottom>
          Dashboard
        </Typography>
      </Grid>
      <Grid item xs={12} md={8}>
        <Paper sx={{ p: 2, mb: 2 }}>
          <PostForm />
        </Paper>
        <Paper sx={{ p: 2 }}>
          <Feed />
        </Paper>
      </Grid>
      <Grid item xs={12} md={4}>
        <Paper sx={{ p: 2 }}>
          <Pets />
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Dashboard;
