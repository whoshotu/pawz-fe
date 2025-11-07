import React, { useState, useContext } from 'react';
import { PostContext } from '../context/PostContext';
import { TextField, Button, Box } from '@mui/material';

const CommentForm = ({ postId }) => {
  const { addComment } = useContext(PostContext);
  const [text, setText] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addComment(postId, text);
      setText('');
    } catch (err) {
      // Error is already handled in PostContext
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
      <Button type="submit" variant="contained" color="primary" sx={{ mt: 1 }}>
        Post Comment
      </Button>
    </Box>
  );
};

export default CommentForm;
