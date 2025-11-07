import React from 'react';
import { Modal, Box, Typography } from '@mui/material';
import ProfileForm from './ProfileForm';

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

const ProfileModal = ({ open, handleClose, profile }) => {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="profile-modal-title"
      aria-describedby="profile-modal-description"
    >
      <Box sx={style}>
        <Typography id="profile-modal-title" variant="h6" component="h2">
          Edit Profile
        </Typography>
        <ProfileForm profile={profile} handleClose={handleClose} />
      </Box>
    </Modal>
  );
};

export default ProfileModal;
