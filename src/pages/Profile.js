import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Box,
  Typography,
  Paper,
  Avatar,
  Button,
  TextField,
  Grid,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  IconButton,
  Chip,
  Alert
} from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon, Favorite, FavoriteBorder } from '@mui/icons-material';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
function Profile() {
  const [posts, setPosts] = useState([]);
  const [bio, setBio] = useState('');
  const [profilePicture, setProfilePicture] = useState('');
  const [error, setError] = useState('');
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    fetchUserPosts();
  }, [user]);

  const fetchUserPosts = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/posts');
      setPosts(response.data.filter(post => post.author._id === user._id));
    } catch (error) {
      setError('Error fetching posts');
    }
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    try {
      await axios.patch('http://localhost:5000/api/users/profile', {
        bio,
        profilePicture
      });
      // Refresh user data
      window.location.reload();
    } catch (error) {
      setError('Error updating profile');
    }
  };

  const handleLike = async (postId) => {
    try {
      const response = await axios.post(`http://localhost:5000/api/posts/${postId}/like`);
      setPosts(posts.map(post => 
        post._id === postId ? response.data : post
      ));
    } catch (error) {
      setError('Error liking post');
    }
  };

  const handleDeletePost = async (postId) => {
    try {
      await axios.delete(`http://localhost:5000/api/posts/${postId}`);
      setPosts(posts.filter(post => post._id !== postId));
    } catch (error) {
      setError('Error deleting post');
    }
  };

  if (!user) {
    return null;
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{ p: 4 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Avatar
                src={user.profilePicture}
                alt={user.username}
                sx={{ width: 120, height: 120, mb: 2 }}
              />
              <Typography variant="h5" gutterBottom>
                {user.username}
              </Typography>
              <Typography variant="body1" color="text.secondary" paragraph>
                {user.bio || 'No bio yet'}
              </Typography>
            </Box>
            <Box component="form" onSubmit={handleUpdateProfile}>
              <TextField
                fullWidth
                label="Bio"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                margin="normal"
                multiline
                rows={3}
              />
              <TextField
                fullWidth
                label="Profile Picture URL"
                value={profilePicture}
                onChange={(e) => setProfilePicture(e.target.value)}
                margin="normal"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                sx={{ mt: 2 }}
              >
                Update Profile
              </Button>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} md={8}>
          <Typography variant="h5" gutterBottom>
            Your Posts
          </Typography>
          <Grid container spacing={3}>
            {posts.map((post) => (
              <Grid item key={post._id} xs={12} sm={6}>
                <Card>
                  <CardActionArea onClick={() => navigate(`/post/${post._id}`)}>
                    {post.featuredImage && (
                      <CardMedia
                        component="img"
                        height="140"
                        image={post.featuredImage}
                        alt={post.title}
                      />
                    )}
                    <CardContent>
                      <Typography gutterBottom variant="h6">
                        {post.title}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          display: '-webkit-box',
                          WebkitLineClamp: 3,
                          WebkitBoxOrient: 'vertical',
                        }}
                      >
                        {post.content}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                  <Box sx={{ p: 2, pt: 0 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Box>
                        {post.tags.map((tag) => (
                          <Chip
                            key={tag}
                            label={tag}
                            size="small"
                            sx={{ mr: 0.5, mb: 0.5 }}
                          />
                        ))}
                      </Box>
                      <IconButton
                        size="small"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleLike(post._id);
                        }}
                        color="primary"
                      >
                        {post.likes.includes(user._id) ? <Favorite /> : <FavoriteBorder />}
                      </IconButton>
                    </Box>
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Profile; 