// api/config/axiosConfig.js
import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000/api';

// Create axios instance
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Important for cookies
});

// Request interceptor
apiClient.interceptors.request.use(
  (config) => {
    // Add auth token to headers if available
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    // Log request in development
    if (process.env.NODE_ENV === 'development') {
      console.log('API Request:', {
        method: config.method,
        url: config.url,
        data: config.data,
      });
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
apiClient.interceptors.response.use(
  (response) => {
    // Log response in development
    if (process.env.NODE_ENV === 'development') {
      console.log('API Response:', {
        status: response.status,
        data: response.data,
      });
    }
    
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    
    // Handle 401 errors (token expired)
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        // Try to refresh token
        const response = await axios.post(`${API_BASE_URL}/auth/refresh`, {}, {
          withCredentials: true
        });
        
        if (response.data.success) {
          const newToken = response.data.data.accessToken;
          localStorage.setItem('accessToken', newToken);
          
          // Retry original request with new token
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
          return apiClient(originalRequest);
        }
      } catch (refreshError) {
        // Refresh failed, redirect to login
        localStorage.removeItem('accessToken');
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }
    
    // Handle other errors
    if (process.env.NODE_ENV === 'development') {
      console.error('API Error:', {
        status: error.response?.status,
        message: error.response?.data?.message || error.message,
        url: error.config?.url,
      });
    }
    
    return Promise.reject(error);
  }
);

export default apiClient;

// api/services/authService.js
import apiClient from '../config/axiosConfig';

export const authService = {
  // Register new user
  register: async (userData) => {
    try {
      const response = await apiClient.post('/auth/register', userData);
      
      // Store tokens if provided
      if (response.data.success && response.data.data.accessToken) {
        localStorage.setItem('accessToken', response.data.data.accessToken);
      }
      
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Registration failed');
    }
  },

  // Login user
  login: async (credentials) => {
    try {
      const response = await apiClient.post('/auth/login', credentials);
      
      // Store access token
      if (response.data.success && response.data.data.accessToken) {
        localStorage.setItem('accessToken', response.data.data.accessToken);
      }
      
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Login failed');
    }
  },

  // Refresh token
  refreshToken: async () => {
    try {
      const response = await apiClient.post('/auth/refresh');
      
      if (response.data.success && response.data.data.accessToken) {
        localStorage.setItem('accessToken', response.data.data.accessToken);
      }
      
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Token refresh failed');
    }
  },

  // Logout user
  logout: async () => {
    try {
      const response = await apiClient.post('/auth/logout');
      localStorage.removeItem('accessToken');
      return response.data;
    } catch (error) {
      // Clear token even if logout fails
      localStorage.removeItem('accessToken');
      throw new Error(error.response?.data?.message || 'Logout failed');
    }
  },

  // Logout from all devices
  logoutAll: async () => {
    try {
      const response = await apiClient.post('/auth/logout-all');
      localStorage.removeItem('accessToken');
      return response.data;
    } catch (error) {
      localStorage.removeItem('accessToken');
      throw new Error(error.response?.data?.message || 'Logout from all devices failed');
    }
  },

  // Get current user profile
  getCurrentUser: async () => {
    try {
      const response = await apiClient.get('/auth/me');
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch user profile');
    }
  },

  // Verify token
  verifyToken: async () => {
    try {
      const response = await apiClient.post('/auth/verify-token');
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Token verification failed');
    }
  },
};

// api/utils/apiHandler.js
export class ApiError extends Error {
  constructor(message, status, code) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.code = code;
  }
}

export const handleApiError = (error) => {
  if (error.response) {
    // Server responded with error status
    const { status, data } = error.response;
    return new ApiError(
      data?.message || 'An error occurred',
      status,
      data?.code || status
    );
  } else if (error.request) {
    // Network error
    return new ApiError('Network error. Please check your connection.', 0, 'NETWORK_ERROR');
  } else {
    // Other error
    return new ApiError(error.message || 'An unexpected error occurred', 0, 'UNKNOWN_ERROR');
  }
};

export const createApiMethod = (method, url, options = {}) => {
  return async (data = null, config = {}) => {
    try {
      const response = await apiClient({
        method,
        url,
        data,
        ...config,
        ...options,
      });
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  };
};

// api/hooks/useAuth.js
import { useState, useEffect, useContext, createContext } from 'react';
import { authService } from '../services/authService';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check if user is logged in on app start
  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      if (token) {
        const response = await authService.verifyToken();
        if (response.success) {
          setUser(response.data.user);
          setIsAuthenticated(true);
        } else {
          localStorage.removeItem('accessToken');
        }
      }
    } catch (error) {
      localStorage.removeItem('accessToken');
    } finally {
      setLoading(false);
    }
  };

  const login = async (credentials) => {
    try {
      const response = await authService.login(credentials);
      if (response.success) {
        setUser(response.data.user);
        setIsAuthenticated(true);
        return response;
      }
      throw new Error(response.message);
    } catch (error) {
      throw error;
    }
  };

  const register = async (userData) => {
    try {
      const response = await authService.register(userData);
      if (response.success) {
        setUser(response.data);
        setIsAuthenticated(true);
        return response;
      }
      throw new Error(response.message);
    } catch (error) {
      throw error;
    }
  };

  const logout = async () => {
    try {
      await authService.logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setUser(null);
      setIsAuthenticated(false);
      localStorage.removeItem('accessToken');
    }
  };

  const logoutAll = async () => {
    try {
      await authService.logoutAll();
    } catch (error) {
      console.error('Logout all error:', error);
    } finally {
      setUser(null);
      setIsAuthenticated(false);
      localStorage.removeItem('accessToken');
    }
  };

  const value = {
    user,
    isAuthenticated,
    loading,
    login,
    register,
    logout,
    logoutAll,
    checkAuthStatus,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// api/hooks/useApi.js
import { useState, useCallback } from 'react';
import { handleApiError } from '../utils/apiHandler';

export const useApi = (apiFunction) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const execute = useCallback(
    async (...args) => {
      try {
        setLoading(true);
        setError(null);
        const result = await apiFunction(...args);
        setData(result);
        return result;
      } catch (err) {
        const apiError = handleApiError(err);
        setError(apiError);
        throw apiError;
      } finally {
        setLoading(false);
      }
    },
    [apiFunction]
  );

  const reset = useCallback(() => {
    setData(null);
    setError(null);
    setLoading(false);
  }, []);

  return {
    data,
    loading,
    error,
    execute,
    reset,
  };
};

// api/index.js
export { default as apiClient } from './config/axiosConfig';
export { authService } from './services/authService';
export { useAuth, AuthProvider } from './hooks/useAuth';
export { useApi } from './hooks/useApi';
export { ApiError, handleApiError, createApiMethod } from './utils/apiHandler';

// Example usage in a component
// components/LoginForm.js
import React, { useState } from 'react';
import { useAuth } from '../api/hooks/useAuth';
import { useApi } from '../api/hooks/useApi';

const LoginForm = () => {
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });

  const { login } = useAuth();
  const { loading, error, execute } = useApi(login);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await execute(credentials);
      // Redirect or show success message
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
    <form onSubmit={handleSubmit}>
      <div>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={credentials.email}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={credentials.password}
          onChange={handleChange}
          required
        />
      </div>
      {error && <div className="error">{error.message}</div>}
      <button type="submit" disabled={loading}>
        {loading ? 'Logging in...' : 'Login'}
      </button>
    </form>
  );
};

export default LoginForm;

// App.js setup
import React from 'react';
import { AuthProvider } from './api/hooks/useAuth';
import LoginForm from './components/LoginForm';

function App() {
  return (
    <AuthProvider>
      <div className="App">
        <LoginForm />
      </div>
    </AuthProvider>
  );
}

export default App;