import React, { useEffect, useContext, useState } from 'react';
import { ServiceContext } from '../context/ServiceProvider';
import Service from './Service';
import { CircularProgress, Typography, Box, TextField } from '@mui/material';

const ServiceList = () => {
  const { services, loading, error, fetchServices } = useContext(ServiceContext);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchServices();
  }, [fetchServices]);

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  const filteredServices = services.filter((service) =>
    service.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Services
      </Typography>
      <TextField
        label="Search Services"
        variant="outlined"
        fullWidth
        sx={{ mb: 2 }}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {filteredServices.length === 0 ? (
        <Typography>No services found.</Typography>
      ) : (
        filteredServices.map((service) => <Service key={service.place_id} service={service} />)
      )}
    </Box>
  );
};

export default ServiceList;
