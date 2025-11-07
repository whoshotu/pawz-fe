import React, { createContext, useState, useCallback } from 'react';
import api from '../utils/api';

export const ServiceContext = createContext();

export const ServiceProvider = ({ children }) => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchServices = useCallback(async () => {
    try {
      setLoading(true);
      const res = await api.get('/services');
      setServices(res.data.services);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred while fetching services.');
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <ServiceContext.Provider value={{ services, loading, error, fetchServices }}>
      {children}
    </ServiceContext.Provider>
  );
};
