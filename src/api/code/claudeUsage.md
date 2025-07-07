// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './api/hooks/useAuth';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/Login';
import RegisterPage from './pages/Register';
import Dashboard from './pages/Dashboard';
import ProtectedRoute from './pages/ProtectedRoute';
import LoadingSpinner from './components/LoadingSpinner'; // Optional loading component

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          
          {/* Protected Routes */}
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } 
          />
          
          {/* Redirect any unknown routes to landing page */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;

// pages/ProtectedRoute.js - Updated to use useAuth hook
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import LoadingSpinner from '../components/LoadingSpinner';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  // Show loading spinner while checking authentication
  if (loading) {
    return <LoadingSpinner />;
  }

  // If not authenticated, redirect to login with return URL
  if (!isAuthenticated) {
    return <Navigate 
      to="/login" 
      state={{ from: location }} 
      replace 
    />;
  }

  // If authenticated, render the protected component
  return children;
};

export default ProtectedRoute;

// pages/Login.js - Example of using useAuth in login page
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useApi } from '../hooks/useApi';

const LoginPage = () => {
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });

  const { login, isAuthenticated } = useAuth();
  const { loading, error, execute } = useApi(login);
  const navigate = useNavigate();
  const location = useLocation();

  // Get the page user was trying to access before login
  const from = location.state?.from?.pathname || '/dashboard';

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, from]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await execute(credentials);
      // Navigation will happen automatically due to useEffect above
    } catch (error) {
      // Error is already handled by useApi hook
      console.error('Login failed:', error.message);
    }
  };

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={credentials.email}
              onChange={handleChange}
              required
              disabled={loading}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={credentials.password}
              onChange={handleChange}
              required
              disabled={loading}
            />
          </div>
          {error && (
            <div className="error-message">
              {error.message}
            </div>
          )}
          <button type="submit" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        <div className="form-footer">
          <p>
            Don't have an account? <Link to="/register">Register here</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

// pages/Register.js - Example of using useAuth in register page
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useApi } from '../hooks/useApi';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const { register, isAuthenticated } = useAuth();
  const { loading, error, execute } = useApi(register);
  const navigate = useNavigate();

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Client-side validation
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    try {
      await execute(formData);
      // Navigation will happen automatically due to useEffect above
    } catch (error) {
      console.error('Registration failed:', error.message);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="register-container">
      <div className="register-form">
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              required
              disabled={loading}
            />
          </div>
          <div className="form-group">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
              disabled={loading}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
              disabled={loading}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              disabled={loading}
            />
          </div>
          {error && (
            <div className="error-message">
              {error.message}
            </div>
          )}
          <button type="submit" disabled={loading}>
            {loading ? 'Registering...' : 'Register'}
          </button>
        </form>
        <div className="form-footer">
          <p>
            Already have an account? <Link to="/login">Login here</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;

// pages/Dashboard.js - Example of using useAuth in dashboard
import React, { useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useApi } from '../hooks/useApi';
import { authService } from '../api/services/authService';

const Dashboard = () => {
  const { user, logout, logoutAll } = useAuth();
  const { 
    data: userProfile, 
    loading, 
    error, 
    execute: fetchProfile 
  } = useApi(authService.getCurrentUser);

  useEffect(() => {
    // Fetch fresh user profile on dashboard load
    fetchProfile();
  }, [fetchProfile]);

  const handleLogout = async () => {
    try {
      await logout();
      // User will be redirected automatically by ProtectedRoute
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const handleLogoutAll = async () => {
    try {
      await logoutAll();
      // User will be redirected automatically by ProtectedRoute
    } catch (error) {
      console.error('Logout all failed:', error);
    }
  };

  if (loading) {
    return <div>Loading profile...</div>;
  }

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>Dashboard</h1>
        <div className="user-actions">
          <button onClick={handleLogout}>Logout</button>
          <button onClick={handleLogoutAll}>Logout All Devices</button>
        </div>
      </header>
      
      <main className="dashboard-content">
        <div className="user-info">
          <h2>Welcome, {user?.name || 'User'}!</h2>
          {userProfile && (
            <div className="profile-details">
              <p><strong>Email:</strong> {userProfile.data.user.email}</p>
              <p><strong>Role:</strong> {userProfile.data.user.role}</p>
              <p><strong>User ID:</strong> {userProfile.data.user.userGuid}</p>
            </div>
          )}
          {error && (
            <div className="error-message">
              Failed to load profile: {error.message}
            </div>
          )}
        </div>
        
        {/* Add your dashboard content here */}
        <div className="dashboard-widgets">
          <div className="widget">
            <h3>Widget 1</h3>
            <p>Dashboard content goes here...</p>
          </div>
          <div className="widget">
            <h3>Widget 2</h3>
            <p>More dashboard content...</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;

// components/LoadingSpinner.js - Optional loading component
import React from 'react';

const LoadingSpinner = () => {
  return (
    <div className="loading-spinner">
      <div className="spinner"></div>
      <p>Loading...</p>
    </div>
  );
};

export default LoadingSpinner;

// Optional: components/Navbar.js - Navigation component that uses auth state
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <nav className="navbar">
      <div className="nav-brand">
        <Link to="/">Your App</Link>
      </div>
      <div className="nav-links">
        {isAuthenticated ? (
          <>
            <Link to="/dashboard">Dashboard</Link>
            <span>Hello, {user?.name}</span>
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;