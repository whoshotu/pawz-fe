import React, { useState, useContext } from 'react';
import { PostContext } from '../context/PostContext';
import { TextField, Button, Box, Typography, Input } from '@mui/material';

const PostForm = () => {
  const { addPost, error } = useContext(PostContext);
  const [caption, setCaption] = useState('');
  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('caption', caption);
    if (image) {
      formData.append('image', image);
    }

    try {
      await addPost(formData);
      setCaption('');
      setImage(null);
    } catch (err) {
      // Error is already handled in PostContext
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Typography variant="h6">Create a New Post</Typography>
      {error && <Typography color="error">{error}</Typography>}
      <TextField
        label="What's on your mind?"
        variant="outlined"
        value={caption}
        onChange={(e) => setCaption(e.target.value)}
        required
        fullWidth
        multiline
        rows={3}
      />
      <Input
        type="file"
        accept="image/*"
        onChange={(e) => setImage(e.target.files[0])}
        style={{ display: 'none' }}
        id="raised-button-file"
      />
      <label htmlFor="raised-button-file">
        <Button variant="contained" component="span">
          Upload Image
        </Button>
      </label>
      {image && <Typography variant="body2">{image.name}</Typography>}
      <Button type="submit" variant="contained" color="primary">
        Post
      </Button>
    </Box>
  );
};

export default PostForm;
