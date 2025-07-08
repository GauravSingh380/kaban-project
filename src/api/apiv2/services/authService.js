// api/services/authService.js
import apiClient from '../config';
import { createApiCall } from '../responseHandler';

class AuthService {
  /**
   * Register a new user
   */
  register = createApiCall(async (userData) => {
    return await apiClient.post('/auth/register', userData);
  });

  /**
   * Login user
   */
  login = createApiCall(async (credentials) => {
    const response = await apiClient.post('/auth/login', credentials, {
      withCredentials: true // Important for cookies
    });
    
    // Store access token in localStorage
    if (response.data.data.accessToken) {
      localStorage.setItem('accessToken', response.data.data.accessToken);
    }
    
    return response;
  });

  /**
   * Refresh access token
   */
  refreshToken = createApiCall(async () => {
    const response = await apiClient.post('/auth/refresh', {}, {
      withCredentials: true
    });
    
    // Update stored access token
    if (response.data.data.accessToken) {
      localStorage.setItem('accessToken', response.data.data.accessToken);
    }
    
    return response;
  });

  /**
   * Logout user
   */
  logout = createApiCall(async () => {
    const response = await apiClient.post('/auth/logout', {}, {
      withCredentials: true
    });
    
    // Clear stored token
    localStorage.removeItem('accessToken');
    
    return response;
  });

  /**
   * Logout from all devices
   */
  logoutAll = createApiCall(async () => {
    const response = await apiClient.post('/auth/logout-all', {}, {
      withCredentials: true
    });
    
    // Clear stored token
    localStorage.removeItem('accessToken');
    
    return response;
  });

  /**
   * Get current user profile
   */
  getCurrentUser = createApiCall(async () => {
    return await apiClient.get('/auth/me');
  });

  /**
   * Verify token validity
   */
  verifyToken = createApiCall(async () => {
    return await apiClient.post('/auth/verify-token');
  });

  /**
   * Check if user is authenticated
   */
  isAuthenticated = () => {
    return !!localStorage.getItem('accessToken');
  };

  /**
   * Get stored access token
   */
  getAccessToken = () => {
    return localStorage.getItem('accessToken');
  };

  /**
   * Clear authentication data
   */
  clearAuth = () => {
    localStorage.removeItem('accessToken');
  };
}

export default new AuthService();