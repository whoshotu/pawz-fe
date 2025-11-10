import React, { useState, useContext, useEffect } from 'react';
import { ProfileContext } from '../context/ProfileContext';
import { useAuth } from '../context/AuthContext';
import { TextField, Button, Box, Input, Typography, CircularProgress, Alert } from '@mui/material';

const ProfileForm = ({ profile, handleClose }) => {
  const { updateProfile } = useContext(ProfileContext);
  const { user } = useAuth();
  const [bio, setBio] = useState('');
  const [loading, setLoading] = useState(false);
  const [profilePicture, setProfilePicture] = useState(null);
  const [preview, setPreview] = useState(null);
  const [imageError, setImageError] = useState('');

  useEffect(() => {
    if (profile) {
      setBio(profile.bio || '');
    }
  }, [profile]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

    if (preview) {
      URL.revokeObjectURL(preview);
    }

    setImageError(''); // Clear previous errors

    if (file) {
      if (file.size > MAX_FILE_SIZE) {
        setImageError('File size cannot exceed 5MB.');
        setProfilePicture(null);
        setPreview(null);
      } else {
        setProfilePicture(file);
        setPreview(URL.createObjectURL(file));
      }
    } else {
      setProfilePicture(null);
      setPreview(null);
    }
  };

  useEffect(() => () => { if (preview) URL.revokeObjectURL(preview) }, [preview]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append('bio', bio.trim());
    if (profilePicture) {
      formData.append('image', profilePicture);
    }

    try {
      await updateProfile(user._id, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      handleClose();
    } catch (err) {
      // Error is already handled in ProfileContext
    } finally {
      setLoading(false);
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
        onChange={handleImageChange}
        style={{ display: 'none' }}
        id="profile-picture-file"
      />
      <label htmlFor="profile-picture-file">
        <Button variant="contained" component="span">
          Upload Profile Picture
        </Button>
      </label>
      {imageError && <Alert severity="error">{imageError}</Alert>}
      {preview && <Box component="img" sx={{ height: 150, width: 150, mt: 2, alignSelf: 'center', borderRadius: '50%', objectFit: 'cover' }} src={preview} alt="Preview" />}
      <Button type="submit" variant="contained" color="primary" disabled={loading}>
        {loading ? <CircularProgress size={24} color="inherit" /> : 'Update Profile'}
      </Button>
    </Box>
  );
};

export default ProfileForm;
