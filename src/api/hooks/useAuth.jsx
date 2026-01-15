// api/hooks/useAuth.js
import { useState, useEffect, useContext, createContext, useRef, useCallback } from 'react';
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

  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  //! user
  const [user, setUser] = useState(null);
  const [userDetails, setUserDetails] = useState(null);

  //! projects
  const [projectDetails, setProjectDetails] = useState([]);
  const [newProject, setNewProject] = useState([]);
  const [projectSummary, setProjectSummary] = useState([])

  //! Bugs
  const [bugDetails, setBugDetails] = useState([])

  const tokenCheckIntervalRef = useRef(null);
  const hasCheckedRef = useRef(false);

  useEffect(() => {
    if (!hasCheckedRef.current) {
      checkAuthStatus();
      hasCheckedRef.current = true;
    }

    return () => {
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
  
      const interval = setInterval(refreshAccessTokenIfVisible, 25 * 60 * 1000); // 25 mins
      tokenCheckIntervalRef.current = interval;
    }
  
    if (!isAuthenticated && tokenCheckIntervalRef.current) {
      clearInterval(tokenCheckIntervalRef.current);
      tokenCheckIntervalRef.current = null;
    }
  }, [isAuthenticated]);

  const checkAuthStatus = useCallback(async () => {
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
  }, [user, isAuthenticated]);

  const refreshAccessToken = useCallback(async () => {
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
  }, []);

  const login = useCallback(async (credentials) => {
    setLoading(true);
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
      setLoading(false);
    }
  }, []);

  const getUserDetails = useCallback(async () => {
    try {
      const response = await authService.getCurrentUser();
      if (response.success) {
        setUserDetails(response.data);
        return response;
      }
      throw new Error(response.message);
    } catch (error) {
      throw error;
    }
  }, []);
  const updateUserDetails = useCallback(async (payload) => {
    try {
      const response = await authService.updateCurrentUser(payload);
      if (response.success) {
        setUserDetails(response.data);
        return response;
      }
      throw new Error(response.message);
    } catch (error) {
      throw error;
    }
  }, []);
  const getAllUserDetails = useCallback(async () => {
    try {
      const response = await authService.getAllUsers();
      if (response.success) {
        setUserDetails(response.data);
        return response;
      }
      throw new Error(response.message);
    } catch (error) {
      throw error;
    }
  }, []);
  const getAllProjectDetails = useCallback(async (queryParams) => {
    try {
      const response = await authService.getProjectSummary(queryParams);
      if (response.success) {
        setProjectDetails(response.data);
        return response;
      }
      throw new Error(response.message);
    } catch (error) {
      throw error;
    }
  }, []);
  const getProjectSummaryDetails = useCallback(async (queryParams) => {
    try {
      const response = await authService.getProjectSummary(queryParams);
      if (response.success) {
        setProjectSummary(response.data.projects);
        return response;
      }
      throw new Error(response.message);
    } catch (error) {
      throw error;
    }
  }, []);
  const createNewProject = useCallback(async (payload) => {
    try {
      const response = await authService.createProjects(payload);
      if (response.success) {
        setNewProject(response.data);
        return response;
      }
      throw new Error(response.message);
    } catch (error) {
      throw error;
    }
  }, []);
  const archiveProject = useCallback(async (projectId) => {
    try {
      const response = await authService.archiveProjects(projectId);
      if (response.success) {
        // setNewProject(response.data);
        return response;
      }
      throw new Error(response.message);
    } catch (error) {
      throw error;
    }
  }, []);
  const getUsersName = useCallback(async (query) => {
    try {
      const response = await authService.getUsers(query);
      if (response.success) {
        // setNewProject(response.data);
        return response;
      }
      throw new Error(response.message);
    } catch (error) {
      throw error;
    }
  }, []);
  const deleteProject = useCallback(async (projectId) => {
    try {
      const response = await authService.deleteProjects(projectId);
      if (response.success) {
        return response;
      }
      throw new Error(response.message);
    } catch (error) {
      throw error;
    }
  }, []);
  const getAllBugs = useCallback(async () => {
    try {
      const response = await authService.getBugs();
      if (response.success) {
        setBugDetails(response.data);
        return response;
      }
      throw new Error(response.message);
    } catch (error) {
      throw error;
    }
  }, []);
  const createNewBugs = useCallback(async (payload) => {
    try {
      const response = await authService.createBugs(payload);
      if (response.success) {
        setProjectDetails(response.data);
        return response;
      }
      throw new Error(response.message);
    } catch (error) {
      throw error;
    }
  }, []);
  const deleteBug = useCallback(async (payload) => {
    try {
      const response = await authService.deleteBug(payload);
      if (response.success) {
        setProjectDetails(response.data);
        return response;
      }
      throw new Error(response.message);
    } catch (error) {
      throw error;
    }
  }, []);

  const register = useCallback(async (userData) => {
    setLoading(true);
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
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(async () => {
    setLoading(true);
    try {
      await authService.logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setUser(null);
      setUserDetails(null);
      setIsAuthenticated(false);
      setLoading(false);
    }
  }, []);

  const logoutAll = useCallback(async () => {
    setLoading(true);
    try {
      await authService.logoutAll();
    } catch (error) {
      console.error('Logout all error:', error);
    } finally {
      setUser(null);
      setUserDetails(null);
      setIsAuthenticated(false);
      localStorage.removeItem('accessToken');
      setLoading(false);
    }
  }, []);

  const value = {
    user,
    userDetails,
    isAuthenticated,
    loading,
    login,
    getUserDetails,
    getAllUserDetails,
    updateUserDetails,
    register,
    logout,
    logoutAll,
    checkAuthStatus,
    refreshAccessToken,
    projectDetails,
    newProject,
    archiveProject,
    createNewProject,
    getAllProjectDetails,
    bugDetails,
    getAllBugs,
    createNewBugs,
    getProjectSummaryDetails,
    projectSummary,
    deleteBug,
    deleteProject,
    getUsersName
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};