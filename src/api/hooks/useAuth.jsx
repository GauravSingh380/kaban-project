// api/hooks/useAuth.js
import { useState, useEffect, useContext, createContext, useRef } from 'react';
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
  const [tokenCheckInterval, setTokenCheckInterval] = useState(null);

  const tokenCheckIntervalRef = useRef(null);

  useEffect(() => {
    checkAuthStatus();
  
    return () => {
      // Clear interval on unmount
      if (tokenCheckIntervalRef.current) {
        clearInterval(tokenCheckIntervalRef.current);
      }
    };
  }, []);
  
  useEffect(() => {
    if (isAuthenticated && !tokenCheckIntervalRef.current) {
      const refreshAccessTokenIfVisible = () => {
        if (document.visibilityState === 'visible') {
          refreshAccessToken();
        }
      };
  
      const interval = setInterval(refreshAccessTokenIfVisible, 10 * 60 * 1000); // 10 mins
      tokenCheckIntervalRef.current = interval;
    }
  
    if (!isAuthenticated && tokenCheckIntervalRef.current) {
      clearInterval(tokenCheckIntervalRef.current);
      tokenCheckIntervalRef.current = null;
    }
  }, [isAuthenticated]);
  // // If you want instant token refresh when the user returns to the tab, you can also add:
  // useEffect(() => {
  //   const handleVisibilityChange = () => {
  //     if (document.visibilityState === 'visible' && isAuthenticated) {
  //       refreshAccessToken();
  //     }
  //   };
  
  //   document.addEventListener('visibilitychange', handleVisibilityChange);
  
  //   return () => {
  //     document.removeEventListener('visibilitychange', handleVisibilityChange);
  //   };
  // }, [isAuthenticated]);
  

  const checkAuthStatus = async () => {
    if (user || isAuthenticated) return;
    setLoading(true);
    try {
      const response = await authService.verifyToken();
      if (response.success) {
        setUser(response.data.user);
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  const refreshAccessToken = async () => {
    setLoading(true)
    try {
      const response = await authService.refreshToken();
      if (response.success && response.data.user) {
        setUser(response.data.user);
        setIsAuthenticated(true);
      } else {
        throw new Error('Invalid token');
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
    refreshAccessToken
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};