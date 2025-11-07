import React, { useState, useContext, useEffect } from 'react';
import { PetContext } from '../context/PetContext';
import { Grid, Card, CardContent, CardActions, Button, Typography, CircularProgress, Box } from '@mui/material';
import PetModal from './PetModal';

const Pets = () => {
  const { pets, loading, error, fetchPets, deletePet } = useContext(PetContext);
  const [open, setOpen] = useState(false);
  const [selectedPet, setSelectedPet] = useState(null);

  useEffect(() => {
    fetchPets();
  }, [fetchPets]);

  const handleOpen = (pet = null) => {
    setSelectedPet(pet);
    setOpen(true);
  };

  const handleClose = () => {
    setSelectedPet(null);
    setOpen(false);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this pet?')) {
      deletePet(id);
    }
  };

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h5" component="h2">
          Your Pets
        </Typography>
        <Button variant="contained" color="primary" onClick={() => handleOpen()}>
          Add Pet
        </Button>
      </Box>
      {pets.length === 0 ? (
        <Typography>You haven't added any pets yet.</Typography>
      ) : (
        <Grid container spacing={2}>
          {pets.map((pet) => (
            <Grid item key={pet._id} xs={12}>
              <Card>
                <CardContent>
                  <Typography variant="h6">{pet.name}</Typography>
                  <Typography color="textSecondary">Breed: {pet.breed}</Typography>
                  <Typography color="textSecondary">Age: {pet.age}</Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" color="primary" onClick={() => handleOpen(pet)}>
                    Edit
                  </Button>
                  <Button size="small" color="secondary" onClick={() => handleDelete(pet._id)}>
                    Delete
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
      <PetModal open={open} handleClose={handleClose} pet={selectedPet} />
    </Box>
  );
};

export default Pets;
