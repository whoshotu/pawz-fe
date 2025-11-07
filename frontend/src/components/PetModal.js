import React from 'react';
import { Modal, Box, Typography } from '@mui/material';
import PetForm from './PetForm';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const PetModal = ({ open, handleClose, pet }) => {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="pet-modal-title"
      aria-describedby="pet-modal-description"
    >
      <Box sx={style}>
        <Typography id="pet-modal-title" variant="h6" component="h2">
          {pet ? 'Edit Pet' : 'Add Pet'}
        </Typography>
        <PetForm pet={pet} handleClose={handleClose} />
      </Box>
    </Modal>
  );
};

export default PetModal;
