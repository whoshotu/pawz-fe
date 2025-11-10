import React, { useState, useContext, useEffect } from 'react';
import { PostContext } from '../context/PostContext';
import { TextField, Button, Box, Typography, Input, CircularProgress, Alert } from '@mui/material';

const PostForm = () => {
  const { addPost, error } = useContext(PostContext);
  const [caption, setCaption] = useState('');
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [imageError, setImageError] = useState('');

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
        setImage(null);
        setPreview(null);
      } else {
        setImage(file);
        setPreview(URL.createObjectURL(file));
      }
    } else {
      setImage(null);
      setPreview(null);
    }
  };

  // Clean up the object URL on unmount
  useEffect(() => () => { if (preview) URL.revokeObjectURL(preview) }, [preview]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let data;
    setLoading(true);
    let headers = {};

    try {
      if (image) {
        data = new FormData();
        data.append('caption', caption);
        data.append('image', image);
        headers = { 'Content-Type': 'multipart/form-data' };
        // When using FormData, the browser will set the Content-Type to multipart/form-data automatically.
      } else {
        data = { caption };
        headers = { 'Content-Type': 'application/json' };
      }
      await addPost(data, { headers });
      setCaption('');
      setImage(null);
      setPreview(null);
    } catch (err) {
      // Error is already handled in PostContext
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Typography variant="h6">Create a New Post</Typography>
      {error && <Alert severity="error">{error}</Alert>}
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
        onChange={handleImageChange}
        style={{ display: 'none' }}
        id="raised-button-file"
      />
      <label htmlFor="raised-button-file">
        <Button variant="contained" component="span">
          Upload Image
        </Button>
      </label>
      {imageError && <Alert severity="error">{imageError}</Alert>}
      {preview && <Box component="img" sx={{ height: 200, width: 'auto', mt: 2, alignSelf: 'center' }} src={preview} alt="Preview" />}
      <Button type="submit" variant="contained" color="primary" disabled={loading}>
        {loading ? <CircularProgress size={24} color="inherit" /> : 'Post'}
      </Button>
    </Box>
  );
};

export default PostForm;
