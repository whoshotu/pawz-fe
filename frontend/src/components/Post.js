import React, { useState, useContext } from 'react';
import { Card, CardContent, CardMedia, Typography, CardActions, IconButton, Collapse, Box, keyframes, Fade } from '@mui/material';
import { Favorite, FavoriteBorder, ChatBubbleOutline } from '@mui/icons-material';
import { PostContext } from '../context/PostContext';
import { useAuth } from '../context/AuthContext';
import CommentForm from './CommentForm';

// Define the "pop" animation using keyframes
const heartPop = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.3);
  }
  100% {
    transform: scale(1);
  }
`;

// Define the animation for the heart appearing on the image
const imageHeartPop = keyframes`
  0% { transform: scale(0); opacity: 0; }
  50% { transform: scale(1.2); opacity: 0.9; }
  100% { transform: scale(1); opacity: 1; }
`;

const Post = ({ post }) => {
  const { likePost } = useContext(PostContext);
  const { user } = useAuth();
  const [commentsVisible, setCommentsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showImageHeart, setShowImageHeart] = useState(false);

  const isLiked = post.likes.includes(user._id);

  const toggleComments = () => {
    setCommentsVisible(!commentsVisible);
  };

  const handleLike = () => {
    // Trigger the animation only when liking the post, not unliking
    if (!isLiked) {
      setIsAnimating(true);
    }
    likePost(post._id);
  };

  const handleImageDoubleClick = () => {
    if (!isLiked) {
      handleLike();
      setShowImageHeart(true);
      setTimeout(() => setShowImageHeart(false), 1000); // Hide heart after 1 second
    }
  };

  return (
    <Card sx={{ mb: 2 }}>
      {post.mediaUrl && (
        <Box sx={{ position: 'relative' }} onDoubleClick={handleImageDoubleClick}>
          <CardMedia
            component="img"
            height="300"
            image={`${process.env.REACT_APP_API_BASE_URL}/${post.mediaUrl.replace(/\\/g, '/')}`}
            alt={post.caption}
            sx={{ cursor: 'pointer' }}
          />
          <Fade in={showImageHeart} timeout={500}>
            <Favorite
              sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                fontSize: '5rem',
                color: 'white',
                animation: `${imageHeartPop} 0.5s ease-out`,
                pointerEvents: 'none', // Make sure it doesn't interfere with clicks
              }}
            />
          </Fade>
        </Box>
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
        <IconButton aria-label="add to favorites" onClick={handleLike}>
          {isLiked ? (
            <Favorite
              color="error"
              sx={{
                animation: isAnimating ? `${heartPop} 0.3s ease-in-out` : 'none',
              }}
              onAnimationEnd={() => setIsAnimating(false)} // Reset animation state
            />
          ) : <FavoriteBorder />}
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
