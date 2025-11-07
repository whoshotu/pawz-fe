import React, { createContext, useState, useCallback } from 'react';
import api from '../utils/api';

export const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getProfileById = useCallback(async (id) => {
    try {
      setLoading(true);
      const res = await api.get(`/users/${id}`);
      setProfile(res.data);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred while fetching the profile.');
    } finally {
      setLoading(false);
    }
  }, []);

  const updateProfile = async (id, formData) => {
    try {
      const res = await api.put(`/users/${id}`, formData);
      setProfile(res.data);
      return res.data;
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred while updating the profile.');
      throw err;
    }
  };

  return (
    <ProfileContext.Provider value={{ profile, loading, error, getProfileById, updateProfile }}>
      {children}
    </ProfileContext.Provider>
  );
};
