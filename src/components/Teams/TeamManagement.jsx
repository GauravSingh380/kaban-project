import React, { useState } from 'react';
import { Users, Building, Shield, Activity, GitPullRequestDraft, UserPlus } from 'lucide-react';
import MembersTab from './TeamMembers/MembersTab';
import TeamUsers from './TeamUsers';
import LeaveRequests1 from './contents/LeaveRequests1';
import LeaveRequests2 from './contents/LeaveRequests2';
import TeamAnalytics1 from './contents/TeamAnalytics1';
import TeamAnalytics2 from './contents/TeamAnalytics2';

// Reusable Tab Component
const TabNavigation = ({ tabs, activeTab, onTabChange }) => {
    return (
        <div className="border-b border-gray-200 mb-6">
            <nav className="flex space-x-8">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => onTabChange(tab.id)}
                        className={`py-3 px-1 border-b-2 font-medium text-sm transition-colors ${activeTab === tab.id
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

const TeamsTab = () => {
    return (
        <div className="bg-white rounded-lg border border-gray-200 p-6">
            <TeamUsers />
        </div>
    );
};

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

const AnalyticsTab = () => {
    return (
        <div className="space-y-6">
            <TeamAnalytics1 />
            <br />
            <br />
            <br />
            <br />
            <TeamAnalytics2 />

        </div>
    );
};

const LeaveRequestsTab = () => {
    return (
        <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div>
                <LeaveRequests1 />
                <br />
                <br />
                <br />
                <br />
                <LeaveRequests2 />
            </div>
        </div>
    );
};

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
                return <MembersTab user={user} />;
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
            <div className="max-w-8xl px-6 mx-auto sm:px-6 lg:px-8 py-4">
                {/* Header */}
                <div className="mb-2">
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