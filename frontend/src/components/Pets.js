import React, { useState, useContext, useEffect } from 'react';
import { PetContext } from '../context/PetContext';
import { Grid, Card, CardContent, CardActions, Button, Typography, CircularProgress, Box, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import PetModal from './PetModal';

const Pets = () => {
  const { pets, loading, error, fetchPets, deletePet } = useContext(PetContext);
  const [open, setOpen] = useState(false);
  const [selectedPet, setSelectedPet] = useState(null);
  const [openDeleteConfirm, setOpenDeleteConfirm] = useState(false);
  const [petToDelete, setPetToDelete] = useState(null);


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

  const handleOpenDeleteConfirm = (pet) => {
    setPetToDelete(pet);
    setOpenDeleteConfirm(true);
  };

  const handleCloseDeleteConfirm = () => {
    setPetToDelete(null);
    setOpenDeleteConfirm(false);
  };

  const handleDelete = () => {
    deletePet(petToDelete._id);
    handleCloseDeleteConfirm();
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2, color: 'secondary.main' }}>
        <Typography variant="h5" component="h2">
          Your Pets
        </Typography>
        <Button variant="contained" color="primary" onClick={() => handleOpen()}>
          Add Pet
        </Button>
      </Box>
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <Typography color="error">{error}</Typography>
      ) : pets.length === 0 ? (
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
                  <Button size="small" color="secondary" onClick={() => handleOpenDeleteConfirm(pet)}>
                    Delete
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
      <PetModal open={open} handleClose={handleClose} pet={selectedPet} />
      <Dialog
        open={openDeleteConfirm}
        onClose={handleCloseDeleteConfirm}
      >
        <DialogTitle>{"Delete Pet?"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete {petToDelete?.name}? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteConfirm}>Cancel</Button>
          <Button onClick={handleDelete} color="secondary" autoFocus>Delete</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Pets;
