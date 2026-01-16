import React, { useState } from 'react';
import { Users, Building, Shield, Activity, GitPullRequestDraft, UserPlus } from 'lucide-react';
import MembersTab from './TeamMembers/MembersTab';
import TeamUsers from './TeamUsers';

// Reusable Tab Component
const TabNavigation = ({ tabs, activeTab, onTabChange }) => {
  return (
    <div className="border-b border-gray-200 mb-6">
      <nav className="flex space-x-8">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`py-3 px-1 border-b-2 font-medium text-sm transition-colors ${
              activeTab === tab.id
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <tab.icon className="w-4 h-4 inline mr-2" />
            {tab.label}
            {tab.count !== undefined && (
              <span className="ml-2 px-2 py-0.5 text-xs rounded-full bg-gray-100 text-gray-600">
                {tab.count}
              </span>
            )}
          </button>
        ))}
      </nav>
    </div>
  );
};


// Teams Component Placeholder
const TeamsTab = () => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <TeamUsers />
    </div>
  );
};

// Permissions Component Placeholder
const PermissionsTab = () => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Permissions Management</h3>
      <div className="space-y-4">
        {['Admin', 'Developer', 'Designer', 'Viewer'].map((role) => (
          <div key={role} className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Shield className="w-5 h-5 text-blue-600" />
                <div>
                  <h4 className="font-medium text-gray-900">{role}</h4>
                  <p className="text-sm text-gray-500">Full access to all features</p>
                </div>
              </div>
              <button className="px-3 py-1 text-sm text-blue-600 hover:bg-blue-50 rounded-md transition-colors">
                Edit
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Analytics Component Placeholder
const AnalyticsTab = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { label: 'Total Members', value: '48', change: '+12%', color: 'blue' },
          { label: 'Active Projects', value: '12', change: '+5%', color: 'green' },
          { label: 'Completion Rate', value: '87%', change: '+3%', color: 'purple' }
        ].map((stat) => (
          <div key={stat.label} className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-gray-600">{stat.label}</p>
              <Activity className={`w-4 h-4 text-${stat.color}-600`} />
            </div>
            <div className="flex items-end justify-between">
              <h3 className="text-3xl font-bold text-gray-900">{stat.value}</h3>
              <span className="text-sm text-green-600 font-medium">{stat.change}</span>
            </div>
          </div>
        ))}
      </div>
      
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance Overview</h3>
        <div className="h-64 flex items-center justify-center text-gray-400">
          Chart visualization goes here
        </div>
      </div>
    </div>
  );
};

// Leave Requests Component Placeholder
const LeaveRequestsTab = () => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Leave Requests</h3>
      <div className="space-y-3">
        {[
          { name: 'John Doe', type: 'Vacation', status: 'Pending', days: '5 days' },
          { name: 'Jane Smith', type: 'Sick Leave', status: 'Approved', days: '2 days' },
          { name: 'Bob Johnson', type: 'Personal', status: 'Pending', days: '1 day' }
        ].map((request, index) => (
          <div key={index} className="p-4 border border-gray-200 rounded-lg hover:shadow-sm transition-shadow">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <h4 className="font-medium text-gray-900">{request.name}</h4>
                <p className="text-sm text-gray-600">{request.type} - {request.days}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                request.status === 'Approved' 
                  ? 'bg-green-100 text-green-700' 
                  : 'bg-yellow-100 text-yellow-700'
              }`}>
                {request.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Main Team Management Component
const TeamManagement = ({ user }) => {
  const [activeTab, setActiveTab] = useState('members');

  // Define tabs configuration
  const tabs = [
    { id: 'members', label: 'Members', icon: Users, count: 48 },
    { id: 'teams', label: 'Teams', icon: Building, count: 8 },
    { id: 'permissions', label: 'Permissions', icon: Shield },
    { id: 'analytics', label: 'Analytics', icon: Activity },
    { id: 'leaveRequests', label: 'Leave Requests', icon: GitPullRequestDraft, count: 3 }
  ];

  // Render tab content based on active tab
  const renderTabContent = () => {
    switch (activeTab) {
      case 'members':
        return <MembersTab  user={user}/>;
      case 'teams':
        return <TeamsTab />;
      case 'permissions':
        return <PermissionsTab />;
      case 'analytics':
        return <AnalyticsTab />;
      case 'leaveRequests':
        return <LeaveRequestsTab />;
      default:
        return <MembersTab user={user} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-8xl px-6 mx-auto sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Team Management</h1>
              <p className="text-gray-600 mt-2">Manage your team members and collaborators</p>
            </div>
            <button className="bg-blue-600 text-white px-5 py-2.5 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 shadow-sm">
              <UserPlus className="w-5 h-5" />
              Invite Member
            </button>
          </div>

          {/* Tab Navigation */}
          <TabNavigation 
            tabs={tabs} 
            activeTab={activeTab} 
            onTabChange={setActiveTab} 
          />
        </div>

        {/* Tab Content */}
        <div className="transition-all duration-200">
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
};

export default TeamManagement;