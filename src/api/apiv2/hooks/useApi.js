// api/hooks/useApi.js
import { useState, useEffect, useCallback } from 'react';

/**
 * Generic hook for API calls with loading, error, and success states
 */
export const useApi = (apiFunction, dependencies = []) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const execute = useCallback(async (...args) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await apiFunction(...args);
      setData(response.data);
      return response;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, dependencies);

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
    reset
  };
};

/**
 * Hook for automatic API calls on component mount
 */
export const useApiEffect = (apiFunction, dependencies = []) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const refetch = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await apiFunction();
      setData(response.data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, dependencies);

  useEffect(() => {
    refetch();
  }, [refetch]);

  return {
    data,
    loading,
    error,
    refetch
  };
};

/**
 * Hook specifically for authentication
 */
export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const login = useCallback(async (credentials) => {
    setLoading(true);
    setError(null);
    
    try {
      const authService = (await import('../services/authService')).default;
      const response = await authService.login(credentials);
      setUser(response.data.user);
      return response;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const register = useCallback(async (userData) => {
    setLoading(true);
    setError(null);
    
    try {
      const authService = (await import('../services/authService')).default;
      const response = await authService.register(userData);
      setUser(response.data);
      return response;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(async () => {
    setLoading(true);
    
    try {
      const authService = (await import('../services/authService')).default;
      await authService.logout();
      setUser(null);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  const getCurrentUser = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const authService = (await import('../services/authService')).default;
      const response = await authService.getCurrentUser();
      setUser(response.data.user);
      return response;
    } catch (err) {
      setError(err);
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  const checkAuth = useCallback(async () => {
    const authService = (await import('../services/authService')).default;
    
    if (!authService.isAuthenticated()) {
      setUser(null);
      setLoading(false);
      return;
    }

    try {
      await getCurrentUser();
    } catch (err) {
      setUser(null);
      authService.clearAuth();
    }
  }, [getCurrentUser]);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return {
    user,
    loading,
    error,
    login,
    register,
    logout,
    getCurrentUser,
    checkAuth,
    isAuthenticated: !!user
  };
};

/**
 * Hook for form submissions with API calls
 */
export const useApiForm = (apiFunction, options = {}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const { onSuccess, onError, resetOnSuccess = true } = options;

  const submit = useCallback(async (formData) => {
    setLoading(true);
    setError(null);
    setSuccess(false);
    
    try {
      const response = await apiFunction(formData);
      setSuccess(true);
      
      if (onSuccess) {
        onSuccess(response);
      }
      
      if (resetOnSuccess) {
        setTimeout(() => setSuccess(false), 3000);
      }
      
      return response;
    } catch (err) {
      setError(err);
      
      if (onError) {
        onError(err);
      }
      
      throw err;
    } finally {
      setLoading(false);
    }
  }, [apiFunction, onSuccess, onError, resetOnSuccess]);

  const reset = useCallback(() => {
    setError(null);
    setSuccess(false);
    setLoading(false);
  }, []);

  return {
    loading,
    error,
    success,
    submit,
    reset
  };
};