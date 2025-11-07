import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

const Service = ({ service }) => {
  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Typography variant="h6" component="div">
          {service.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {service.description}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Category: {service.category}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Phone: {service.phone}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Email: {service.email}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Website: {service.website}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default Service;
