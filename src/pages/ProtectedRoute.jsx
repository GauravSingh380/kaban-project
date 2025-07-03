import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = () => {
      const userData = localStorage.getItem('user');
      const loginTime = localStorage.getItem('loginTime');
      
      if (!userData || !loginTime) {
        navigate('/login');
        return;
      }
      
      const currentTime = Date.now();
      const sessionDuration = currentTime - parseInt(loginTime);
      const oneHour = 60 * 60 * 1000; // 1 hour in milliseconds
      
      if (sessionDuration > oneHour) {
        // Token expired
        localStorage.removeItem('user');
        localStorage.removeItem('loginTime');
        navigate('/login');
        return;
      }
    };
    
    checkAuth();
    
    // Check every minute for token expiration
    const interval = setInterval(checkAuth, 60000);
    
    return () => clearInterval(interval);
  }, [navigate]);

  return children;
};

export default ProtectedRoute;