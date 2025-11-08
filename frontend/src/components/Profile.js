import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { ProfileContext } from '../context/ProfileContext';
import { useAuth } from '../context/AuthContext';
import { Avatar, Box, Button, CircularProgress, Typography } from '@mui/material';
import ProfileModal from './ProfileModal';

const Profile = () => {
  const { id } = useParams();
  const { profile, loading, error, getProfileById } = useContext(ProfileContext);
  const { user } = useAuth();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    getProfileById(id);
  }, [id, getProfileById]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  return (
    <Box>
      {profile && (
        <Box>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Avatar
              src={`https://paws-connect.onrender.com/${profile.profilePicture?.replace(/\\/g, '/')}`}
              sx={{ width: 100, height: 100, mr: 2 }}
            />
            <Box>
              <Typography variant="h4">{profile.username}</Typography>
              <Typography variant="body1">{profile.bio}</Typography>
            </Box>
            {user.id === profile._id && (
              <Button variant="contained" sx={{ ml: 'auto' }} onClick={handleOpen}>
                Edit Profile
              </Button>
            )}
          </Box>
          <ProfileModal open={open} handleClose={handleClose} profile={profile} />
        </Box>
      )}
    </Box>
  );
};

export default Profile;
