import React, { useState, useContext } from 'react';
import { PostContext } from '../context/PostContext';
import { TextField, Button, Box, CircularProgress } from '@mui/material';

const CommentForm = ({ postId }) => {
  const { addComment } = useContext(PostContext);
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await addComment(postId, text);
      setText('');
    } catch (err) {
      // Error is already handled in PostContext
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
      <TextField
        label="Add a comment..."
        variant="outlined"
        value={text}
        onChange={(e) => setText(e.target.value)}
        required
        fullWidth
        size="small"
      />
      <Button type="submit" variant="contained" color="primary" sx={{ mt: 1 }} disabled={loading}>
        {loading ? <CircularProgress size={24} color="inherit" /> : 'Post Comment'}
      </Button>
    </Box>
  );
};

export default CommentForm;
