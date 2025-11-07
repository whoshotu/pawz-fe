import React, { createContext, useState, useCallback } from 'react';
import api from '../utils/api';

export const PostContext = createContext();

export const PostProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPosts = useCallback(async () => {
    try {
      setLoading(true);
      const res = await api.get('/posts');
      setPosts(res.data.posts);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred while fetching posts.');
    } finally {
      setLoading(false);
    }
  }, []);

  const addPost = async (postData) => {
    try {
      const res = await api.post('/posts', postData);
      setPosts([res.data, ...posts]);
      return res.data;
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred while adding the post.');
      throw err;
    }
  };

  const likePost = async (id) => {
    try {
      const res = await api.put(`/posts/${id}/like`);
      setPosts(posts.map((post) => (post._id === id ? res.data : post)));
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred while liking the post.');
    }
  };

  const addComment = async (id, text) => {
    try {
      const res = await api.post(`/posts/${id}/comment`, { text });
      setPosts(posts.map((post) => (post._id === id ? res.data : post)));
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred while adding the comment.');
      throw err;
    }
  };

  return (
    <PostContext.Provider value={{ posts, loading, error, fetchPosts, addPost, likePost, addComment }}>
      {children}
    </PostContext.Provider>
  );
};
