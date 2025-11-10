import React, { useState, useContext, useEffect } from 'react';
import { PetContext } from '../context/PetContext';
import { TextField, Button, Box, Typography, CircularProgress } from '@mui/material';

const PetForm = ({ pet, handleClose }) => {
  const { addPet, updatePet, error } = useContext(PetContext);
  const [name, setName] = useState('');
  const [breed, setBreed] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (pet) {
      setName(pet.name);
      setBreed(pet.breed);
      setDateOfBirth(pet.dateOfBirth.split('T')[0]);
    } else {
      setName('');
      setBreed('');
      setDateOfBirth('');
    }
  }, [pet]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (pet) {
        await updatePet(pet._id, { name, breed, dateOfBirth });
      } else {
        await addPet({ name, breed, dateOfBirth });
      }
      handleClose();
    } catch (err) {
      // Error is already handled in PetContext
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      {error && <Typography color="error">{error}</Typography>}
      <TextField
        label="Name"
        variant="outlined"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        fullWidth
      />
      <TextField
        label="Breed"
        variant="outlined"
        value={breed}
        onChange={(e) => setBreed(e.target.value)}
        required
        fullWidth
      />
      <TextField
        label="Date of Birth"
        type="date"
        variant="outlined"
        value={dateOfBirth}
        onChange={(e) => setDateOfBirth(e.target.value)}
        required
        fullWidth
        InputLabelProps={{
          shrink: true,
        }}
      />
      <Button type="submit" variant="contained" color="primary" disabled={loading}>
        {loading ? <CircularProgress size={24} color="inherit" /> : (pet ? 'Update Pet' : 'Add Pet')}
      </Button>
    </Box>
  );
};

export default PetForm;
