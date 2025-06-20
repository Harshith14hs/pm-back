import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Auth.css';

// API base URL
const API_BASE_URL = 'http://localhost:5001';

const Auth = () => {
    const navigate = useNavigate();
    const [isLogin, setIsLogin] = useState(false);
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const validateForm = () => {
        if (!isLogin && formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            return false;
        }
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        
        if (!validateForm()) {
            return;
        }

        setLoading(true);

        try {
            const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register';
            const payload = isLogin 
                ? { email: formData.email, password: formData.password }
                : {
                    username: formData.username,
                    email: formData.email,
                    password: formData.password
                };

            console.log('Sending request to:', `${API_BASE_URL}${endpoint}`);
            console.log('Payload:', payload);

            const response = await fetch(`${API_BASE_URL}${endpoint}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(payload)
            });

            console.log('Response status:', response.status);

            // Check if response is ok before trying to parse JSON
            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            console.log('Response data:', data);

            if (!data.success) {
                throw new Error(data.error || 'Authentication failed');
            }

            // Store token
            if (data.token) {
                localStorage.setItem('token', data.token);
                // Also store user data if available
                if (data.user) {
                    localStorage.setItem('user', JSON.stringify(data.user));
                }
            }
            
            // Redirect to dashboard
            navigate('/dashboard');
        } catch (error) {
            console.error('Auth error:', error);
            if (error.message.includes('404')) {
                setError('Server not found. Please check if the backend server is running.');
            } else {
                setError(error.message || 'Something went wrong. Please try again.');
            }
        } finally {
            setLoading(false);
        }
    };

    const toggleMode = () => {
        setIsLogin(!isLogin);
        setError('');
        setFormData({
            username: '',
            email: '',
            password: '',
            confirmPassword: ''
        });
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <div className="auth-header">
                    <h2>{isLogin ? 'Welcome Back!' : 'Create Account'}</h2>
                    <p>{isLogin ? 'Sign in to continue' : 'Sign up to get started'}</p>
                </div>

                {error && <div className="error-message">{error}</div>}

                <form onSubmit={handleSubmit} className="auth-form">
                    {!isLogin && (
                        <div className="form-group">
                            <label htmlFor="username">Username</label>
                            <input
                                type="text"
                                id="username"
                                name="username"
                                value={formData.username}
                                onChange={handleChange}
                                required
                                minLength={3}
                                placeholder="Enter your username"
                            />
                        </div>
                    )}

                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            placeholder="Enter your email"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            minLength={6}
                            placeholder="Enter your password"
                        />
                    </div>

                    {!isLogin && (
                        <div className="form-group">
                            <label htmlFor="confirmPassword">Confirm Password</label>
                            <input
                                type="password"
                                id="confirmPassword"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                required
                                minLength={6}
                                placeholder="Confirm your password"
                            />
                        </div>
                    )}

                    <button 
                        type="submit" 
                        className="auth-button"
                        disabled={loading}
                    >
                        {loading ? 'Processing...' : isLogin ? 'Sign In' : 'Create Account'}
                    </button>
                </form>

                <div className="auth-footer">
                    <p>
                        {isLogin ? "Don't have an account? " : "Already have an account? "}
                        <button 
                            type="button" 
                            className="toggle-button"
                            onClick={toggleMode}
                        >
                            {isLogin ? 'Sign Up' : 'Sign In'}
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Auth; 