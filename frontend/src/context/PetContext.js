import React, { createContext, useState, useCallback } from 'react';
import api from '../utils/api';

export const PetContext = createContext();

export const PetProvider = ({ children }) => {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPets = useCallback(async () => {
    try {
      setLoading(true);
      const res = await api.get('/pets');
      setPets(res.data);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred while fetching pets.');
    } finally {
      setLoading(false);
    }
  }, []);

  const addPet = async (petData) => {
    try {
      const res = await api.post('/pets', petData);
      setPets([...pets, res.data]);
      return res.data;
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred while adding the pet.');
      throw err;
    }
  };

  const updatePet = async (id, petData) => {
    try {
      const res = await api.put(`/pets/${id}`, petData);
      setPets(pets.map(pet => (pet._id === id ? res.data : pet)));
      return res.data;
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred while updating the pet.');
      throw err;
    }
  };

  const deletePet = async (id) => {
    try {
      await api.delete(`/pets/${id}`);
      setPets(pets.filter(pet => pet._id !== id));
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred while deleting the pet.');
      throw err;
    }
  };

  return (
    <PetContext.Provider value={{ pets, loading, error, fetchPets, addPet, updatePet, deletePet }}>
      {children}
    </PetContext.Provider>
  );
};
