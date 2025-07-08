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
    const refreshInterval = setInterval(() => {
      refreshAccessToken();
    }, 14 * 60 * 1000); // 14 minutes

    return () => clearInterval(refreshInterval); // Clean up on unmount
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
  const refreshAccessToken = async () => {
    setLoading(true)
    try {
      const response = await authService.refreshToken();
      if (response.success && response.data.user) {
        setUser(response.data.user); // if your API sends updated user info
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.error('Token refresh failed:', error);
      logout(); // log out if refresh fails
    }
  };


  const login = async (credentials) => {
    setLoading(true)
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
    } finally {
      setLoading(false)
    }
  };

  const register = async (userData) => {
    setLoading(true)
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
    } finally{
      setLoading(false)
    }
  };

  const logout = async () => {
    setLoading(true)
    try {
      await authService.logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setUser(null);
      setIsAuthenticated(false);
      localStorage.removeItem('accessToken');
      setLoading(false)
    }
  };

  const logoutAll = async () => {
    setLoading(true)
    try {
      await authService.logoutAll();
    } catch (error) {
      console.error('Logout all error:', error);
    } finally {
      setUser(null);
      setIsAuthenticated(false);
      localStorage.removeItem('accessToken');
      setLoading(false)
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