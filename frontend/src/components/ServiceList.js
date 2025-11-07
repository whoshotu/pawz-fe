import React, { useEffect, useContext } from 'react';
import { ServiceContext } from '../context/ServiceProvider';
import Service from './Service';
import { CircularProgress, Typography, Box } from '@mui/material';

const ServiceList = () => {
  const { services, loading, error, fetchServices } = useContext(ServiceContext);

  useEffect(() => {
    fetchServices();
  }, [fetchServices]);

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Services
      </Typography>
      {services.length === 0 ? (
        <Typography>No services found.</Typography>
      ) : (
        services.map((service) => <Service key={service._id} service={service} />)
      )}
    </Box>
  );
};

export default ServiceList;
