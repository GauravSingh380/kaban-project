import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../api'; // Update path as needed
import { allMenuItems } from '../helper';
import SidebarTabs from '../components/common/SidebarTabs';
import RenderContent from './Dashboard/RenderContennt';

const Dashboard = () => {

  const { user, isAuthenticated, logout, loading } = useAuth();
  let defaultTab; 
  if(user){
    defaultTab = user.role === 'admin' ? 'dashboard' : 'issues';
  }

  const [activeTab, setActiveTab] = useState(defaultTab);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [error, setError] = useState(null);
  
  const navigate = useNavigate();
  const location = useLocation();

  // Handle authentication state
  useEffect(() => {
    if (isAuthenticated === false) {
      setError('Session expired. Please login again.');
      const timer = setTimeout(() => {
        navigate('/login', { state: { from: location } });
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isAuthenticated, navigate, location]);

  // Handle responsive layout
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (mobile) {
        setSidebarOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Define menu items with role-based access
  const getAllMenuItems = () => {
    if (!user) return [];
    return allMenuItems.filter(item => item.roles.includes(user.role));
  };

  const menuItems = getAllMenuItems();
  const renderContent = () => {
    return (
      <RenderContent menuItems={menuItems} activeTab={activeTab} user={user} />
    );
  };

  if (loading || !user) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="text-center p-4 bg-red-100 rounded-lg">
          <p className="text-red-600">{error}</p>
          <p className="text-gray-600 mt-2">Redirecting to login page...</p>
        </div>
      </div>
    );
  }

  return (
    <SidebarTabs
      user={user}
      menuItems={menuItems}
      renderContent={renderContent}
      orientation="vertical"
      defaultTab="dashboard"
      setActiveTab={setActiveTab}
      activeTab={activeTab}
      onLogout={handleLogout}
    />
  );
};

export default Dashboard;