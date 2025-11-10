import React from 'react';
import { Card, CardContent, Typography, Link } from '@mui/material';

const Service = ({ service }) => {
  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Typography variant="h6" component="div">
          {service.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {service.address}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Phone: {service.phone_number}
        </Typography>
        {service.website && (
          <Typography variant="body2" color="text.secondary">
            Website: <Link href={service.website} target="_blank" rel="noopener noreferrer">{service.website}</Link>
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};

export default Service;
