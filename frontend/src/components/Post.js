import React, { useState, useContext } from 'react';
import { Card, CardContent, CardMedia, Typography, CardActions, IconButton, Collapse, Box } from '@mui/material';
import { Favorite, FavoriteBorder, ChatBubbleOutline } from '@mui/icons-material';
import { PostContext } from '../context/PostContext';
import { useAuth } from '../context/AuthContext';
import CommentForm from './CommentForm';

const Post = ({ post }) => {
  const { likePost } = useContext(PostContext);
  const { user } = useAuth();
  const [commentsVisible, setCommentsVisible] = useState(false);

  const isLiked = post.likes.includes(user._id);

  const toggleComments = () => {
    setCommentsVisible(!commentsVisible);
  };

  return (
    <Card sx={{ mb: 2 }}>
      {post.mediaUrl && (
        <CardMedia
          component="img"
          height="300"
          image={`https://paws-connect.onrender.com/${post.mediaUrl.replace(/\\/g, '/')}`}
          alt={post.caption}
        />
      )}
      <CardContent>
        <Typography variant="h6" component="div">
          {post.author.username}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {post.caption}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites" onClick={() => likePost(post._id)}>
          {isLiked ? <Favorite color="error" /> : <FavoriteBorder />}
        </IconButton>
        <Typography variant="body2">{post.likes.length} likes</Typography>
        <IconButton aria-label="show comments" onClick={toggleComments}>
          <ChatBubbleOutline />
        </IconButton>
        <Typography variant="body2">{post.comments.length} comments</Typography>
      </CardActions>
      <Collapse in={commentsVisible} timeout="auto" unmountOnExit>
        <CardContent>
          <CommentForm postId={post._id} />
          {post.comments.map((comment) => (
            <Box key={comment._id} sx={{ mt: 2 }}>
              <Typography variant="subtitle2" component="span">
                {comment.user.username}
              </Typography>
              <Typography variant="body2" component="span" sx={{ ml: 1 }}>
                {comment.text}
              </Typography>
            </Box>
          ))}
        </CardContent>
      </Collapse>
    </Card>
  );
};

export default Post;
