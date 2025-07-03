import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, X, ChevronLeft, ChevronRight, LogOut, } from 'lucide-react';
import HomePageUser from "../components/home/Home"
import allMenuItems from '../helper';
import SidebarTabs from '../components/common/SidebarTabs';
import RenderContent from './Dashboard/RenderContennt';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Check authentication and token expiration
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

      setUser(JSON.parse(userData));
    };

    checkAuth();

    // Check every minute for token expiration
    const interval = setInterval(checkAuth, 60000);

    return () => clearInterval(interval);
  }, [navigate]);

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
    localStorage.removeItem('user');
    localStorage.removeItem('loginTime');
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
    )
  };

  if (!user) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <SidebarTabs
      user={user}
      menuItems={menuItems}
      renderContent={renderContent}
      orientation="vertical" // or "horizontal"
      defaultTab="dashboard"
      setActiveTab={setActiveTab}
      activeTab={activeTab}
      onLogout={handleLogout}
    />
  );
};

export default Dashboard;