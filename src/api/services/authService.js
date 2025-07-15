// api/services/authService.js
import apiClient from '../config/axiosConfig';

export const authService = {
  register: async (userData) => {
    try {
      const response = await apiClient.post('/auth/register', userData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Registration failed');
    }
  },

  login: async (credentials) => {
    try {
      const response = await apiClient.post('/auth/login', credentials);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Login failed');
    }
  },

  refreshToken: async () => {
    try {
      const response = await apiClient.post('/auth/refresh');
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Token refresh failed');
    }
  },

  logout: async () => {
    try {
      const response = await apiClient.post('/auth/logout');
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Logout failed');
    }
  },

  logoutAll: async () => {
    try {
      const response = await apiClient.post('/auth/logout-all');
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Logout from all devices failed');
    }
  },

  getCurrentUser: async () => {
    try {
      const response = await apiClient.get('/users/get-user');
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch user profile');
    }
  },
  updateCurrentUser: async (payload) => {
    try {
      const response = await apiClient.post('/users/update-user', payload);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch user profile');
    }
  },

  verifyToken: async () => {
    try {
      const response = await apiClient.post('/auth/verify-token');
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Token verification failed');
    }
  },
};


// with localStorage
// export const authService = {
//   // Register new user
//   register: async (userData) => {
//     try {
//       const response = await apiClient.post('/auth/register', userData);
      
//       // Store tokens if provided
//       if (response.data.success && response.data.data.accessToken) {
//         localStorage.setItem('accessToken', response.data.data.accessToken);
//       }
      
//       return response.data;
//     } catch (error) {
//       throw new Error(error.response?.data?.message || 'Registration failed');
//     }
//   },

//   // Login user
//   login: async (credentials) => {
//     try {
//       const response = await apiClient.post('/auth/login', credentials);
      
//       // Store access token
//       if (response.data.success && response.data.data.accessToken) {
//         localStorage.setItem('accessToken', response.data.data.accessToken);
//       }
      
//       return response.data;
//     } catch (error) {
//       throw new Error(error.response?.data?.message || 'Login failed');
//     }
//   },

//   // Refresh token
//   refreshToken: async () => {
//     try {
//       const response = await apiClient.post('/auth/refresh');
      
//       if (response.data.success && response.data.data.accessToken) {
//         localStorage.setItem('accessToken', response.data.data.accessToken);
//       }
      
//       return response.data;
//     } catch (error) {
//       throw new Error(error.response?.data?.message || 'Token refresh failed');
//     }
//   },

//   // Logout user
//   logout: async () => {
//     try {
//       const response = await apiClient.post('/auth/logout');
//       localStorage.removeItem('accessToken');
//       return response.data;
//     } catch (error) {
//       // Clear token even if logout fails
//       localStorage.removeItem('accessToken');
//       throw new Error(error.response?.data?.message || 'Logout failed');
//     }
//   },

//   // Logout from all devices
//   logoutAll: async () => {
//     try {
//       const response = await apiClient.post('/auth/logout-all');
//       localStorage.removeItem('accessToken');
//       return response.data;
//     } catch (error) {
//       localStorage.removeItem('accessToken');
//       throw new Error(error.response?.data?.message || 'Logout from all devices failed');
//     }
//   },

//   // Get current user profile
//   getCurrentUser: async () => {
//     try {
//       const response = await apiClient.get('/auth/me');
//       return response.data;
//     } catch (error) {
//       throw new Error(error.response?.data?.message || 'Failed to fetch user profile');
//     }
//   },

//   // Verify token
//   verifyToken: async () => {
//     try {
//       const response = await apiClient.post('/auth/verify-token');
//       return response.data;
//     } catch (error) {
//       throw new Error(error.response?.data?.message || 'Token verification failed');
//     }
//   },
// };