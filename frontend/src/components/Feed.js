import React, { useContext, useEffect } from 'react';
import { PostContext } from '../context/PostContext';
import Post from './Post';
import { CircularProgress, Typography, Box, Alert } from '@mui/material';
import PullToRefresh from 'react-pull-to-refresh';

const Feed = () => {
  const { posts, loading, error, fetchPosts } = useContext(PostContext);

  useEffect(() => {
    // Fetch posts only if they haven't been loaded yet.
    if (posts.length === 0) {
      fetchPosts();
    }
  }, [fetchPosts]);

  // Show a loading spinner only on the initial load when there are no posts.
  // During a refresh, the library's indicator will be shown.
  if (loading && posts.length === 0) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  const handleRefresh = async () => {
    await fetchPosts();
  };

  return (
    <Box>
      <Typography variant="h5" component="h2" gutterBottom>
        Main Feed
      </Typography>
      <PullToRefresh onRefresh={handleRefresh}>
        {posts.length === 0 ? (
          <Typography>No posts yet. Be the first to post!</Typography>
        ) : (
          posts.map((post) => <Post key={post._id} post={post} />)
        )}
      </PullToRefresh>
    </Box>
  );
};

export default Feed;
