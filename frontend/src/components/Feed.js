import React, { useContext, useEffect } from 'react';
import { PostContext } from '../context/PostContext';
import Post from './Post';
import { CircularProgress, Typography, Box } from '@mui/material';

const Feed = () => {
  const { posts, loading, error, fetchPosts } = useContext(PostContext);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  return (
    <Box>
      <Typography variant="h5" component="h2" gutterBottom>
        Main Feed
      </Typography>
      {posts.length === 0 ? (
        <Typography>No posts yet. Be the first to post!</Typography>
      ) : (
        posts.map((post) => <Post key={post._id} post={post} />)
      )}
    </Box>
  );
};

export default Feed;
