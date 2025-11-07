import React, { useState, useContext, useEffect } from 'react';
import { ProfileContext } from '../context/ProfileContext';
import { useAuth } from '../context/AuthContext';
import { TextField, Button, Box, Input, Typography } from '@mui/material';

const ProfileForm = ({ profile, handleClose }) => {
  const { updateProfile } = useContext(ProfileContext);
  const { user } = useAuth();
  const [bio, setBio] = useState('');
  const [profilePicture, setProfilePicture] = useState(null);

  useEffect(() => {
    if (profile) {
      setBio(profile.bio || '');
    }
  }, [profile]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('bio', bio);
    if (profilePicture) {
      formData.append('image', profilePicture);
    }

    try {
      await updateProfile(user._id, formData);
      handleClose();
    } catch (err) {
      // Error is already handled in ProfileContext
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <TextField
        label="Bio"
        variant="outlined"
        value={bio}
        onChange={(e) => setBio(e.target.value)}
        fullWidth
        multiline
        rows={3}
      />
      <Input
        type="file"
        accept="image/*"
        onChange={(e) => setProfilePicture(e.target.files[0])}
        style={{ display: 'none' }}
        id="profile-picture-file"
      />
      <label htmlFor="profile-picture-file">
        <Button variant="contained" component="span">
          Upload Profile Picture
        </Button>
      </label>
      {profilePicture && <Typography variant="body2">{profilePicture.name}</Typography>}
      <Button type="submit" variant="contained" color="primary">
        Update Profile
      </Button>
    </Box>
  );
};

export default ProfileForm;
