import React, { useState, useEffect } from 'react';
import {
    Activity,
    TrendingUp,
    TrendingDown,
    AlertCircle,
    CheckCircle2,
    Clock,
    Users,
    FolderOpen,
    Bug,
    Target,
    Calendar,
    BarChart3,
    PieChart,
    ArrowUpRight,
    ArrowDownRight,
    MoreHorizontal,
    Filter,
    Download,
    Plus
} from 'lucide-react';

const DashboardContent1 = ({ user }) => {
    const [timeRange, setTimeRange] = useState('7d');
    const [selectedProject, setSelectedProject] = useState('all');

    // Mock data - you'll replace this with real data from your backend
    const dashboardData = {
        overview: {
            totalProjects: 5,
            activeBugs: 47,
            resolvedThisWeek: 23,
            teamMembers: 12,
            averageResolutionTime: '2.3 days'
        },
        projects: [
            {
                id: 1,
                name: 'E-commerce Platform',
                status: 'active',
                progress: 78,
                openBugs: 12,
                criticalBugs: 3,
                team: ['John', 'Sarah', 'Mike'],
                dueDate: '2024-08-15',
                priority: 'high'
            },
            {
                id: 2,
                name: 'Mobile App Redesign',
                status: 'active',
                progress: 45,
                openBugs: 8,
                criticalBugs: 1,
                team: ['Lisa', 'Tom', 'Emma'],
                dueDate: '2024-09-01',
                priority: 'medium'
            },
            {
                id: 3,
                name: 'API Integration',
                status: 'testing',
                progress: 92,
                openBugs: 4,
                criticalBugs: 0,
                team: ['Alex', 'Nina'],
                dueDate: '2024-07-20',
                priority: 'high'
            },
            {
                id: 4,
                name: 'Security Audit',
                status: 'planning',
                progress: 15,
                openBugs: 2,
                criticalBugs: 2,
                team: ['David', 'Rachel'],
                dueDate: '2024-10-15',
                priority: 'critical'
            },
            {
                id: 5,
                name: 'Dashboard Analytics',
                status: 'active',
                progress: 67,
                openBugs: 6,
                criticalBugs: 1,
                team: ['Chris', 'Maya', 'Rob'],
                dueDate: '2024-08-30',
                priority: 'medium'
            }
        ],
        recentActivity: [
            { id: 1, type: 'bug_created', project: 'E-commerce Platform', description: 'Payment gateway timeout issue', time: '2 hours ago', priority: 'high' },
            { id: 2, type: 'bug_resolved', project: 'Mobile App Redesign', description: 'Login screen layout fix', time: '4 hours ago', priority: 'medium' },
            { id: 3, type: 'project_updated', project: 'API Integration', description: 'Moved to testing phase', time: '1 day ago', priority: 'low' },
            { id: 4, type: 'bug_assigned', project: 'Security Audit', description: 'SQL injection vulnerability', time: '1 day ago', priority: 'critical' },
            { id: 5, type: 'bug_created', project: 'Dashboard Analytics', description: 'Chart rendering issue', time: '2 days ago', priority: 'medium' }
        ],
        bugTrends: {
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            created: [3, 7, 2, 5, 8, 1, 4],
            resolved: [2, 5, 4, 6, 3, 2, 5]
        }
    };

    const getPriorityColor = (priority) => {
        switch (priority) {
            case 'critical': return 'text-red-600 bg-red-50';
            case 'high': return 'text-orange-600 bg-orange-50';
            case 'medium': return 'text-yellow-600 bg-yellow-50';
            case 'low': return 'text-green-600 bg-green-50';
            default: return 'text-gray-600 bg-gray-50';
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'active': return 'text-green-600 bg-green-50';
            case 'testing': return 'text-blue-600 bg-blue-50';
            case 'planning': return 'text-purple-600 bg-purple-50';
            case 'completed': return 'text-gray-600 bg-gray-50';
            default: return 'text-gray-600 bg-gray-50';
        }
    };

    const getActivityIcon = (type) => {
        switch (type) {
            case 'bug_created': return <Bug className="w-4 h-4 text-red-500" />;
            case 'bug_resolved': return <CheckCircle2 className="w-4 h-4 text-green-500" />;
            case 'project_updated': return <FolderOpen className="w-4 h-4 text-blue-500" />;
            case 'bug_assigned': return <Users className="w-4 h-4 text-purple-500" />;
            default: return <Activity className="w-4 h-4 text-gray-500" />;
        }
    };

    return (
        <div className="p-6 space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
                    <p className="text-gray-600 mt-1">Welcome back, {user?.name || 'User'}! Here's what's happening with your projects.</p>
                </div>
                <div className="mt-4 sm:mt-0 flex items-center space-x-3">
                    <select
                        value={timeRange}
                        onChange={(e) => setTimeRange(e.target.value)}
                        className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                        <option value="7d">Last 7 days</option>
                        <option value="30d">Last 30 days</option>
                        <option value="90d">Last 90 days</option>
                    </select>
                    <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                        <Download className="w-4 h-4" />
                        <span>Export Report</span>
                    </button>
                </div>
            </div>

            {/* Overview Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600">Total Projects</p>
                            <p className="text-2xl font-bold text-gray-900">{dashboardData.overview.totalProjects}</p>
                        </div>
                        <div className="p-3 bg-blue-50 rounded-full">
                            <FolderOpen className="w-6 h-6 text-blue-600" />
                        </div>
                    </div>
                    <div className="mt-4 flex items-center text-sm">
                        <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                        <span className="text-green-600">12%</span>
                        <span className="text-gray-500 ml-1">from last month</span>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600">Active Bugs</p>
                            <p className="text-2xl font-bold text-gray-900">{dashboardData.overview.activeBugs}</p>
                        </div>
                        <div className="p-3 bg-red-50 rounded-full">
                            <Bug className="w-6 h-6 text-red-600" />
                        </div>
                    </div>
                    <div className="mt-4 flex items-center text-sm">
                        <TrendingDown className="w-4 h-4 text-green-500 mr-1" />
                        <span className="text-green-600">8%</span>
                        <span className="text-gray-500 ml-1">from last week</span>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600">Resolved This Week</p>
                            <p className="text-2xl font-bold text-gray-900">{dashboardData.overview.resolvedThisWeek}</p>
                        </div>
                        <div className="p-3 bg-green-50 rounded-full">
                            <CheckCircle2 className="w-6 h-6 text-green-600" />
                        </div>
                    </div>
                    <div className="mt-4 flex items-center text-sm">
                        <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                        <span className="text-green-600">15%</span>
                        <span className="text-gray-500 ml-1">from last week</span>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600">Team Members</p>
                            <p className="text-2xl font-bold text-gray-900">{dashboardData.overview.teamMembers}</p>
                        </div>
                        <div className="p-3 bg-purple-50 rounded-full">
                            <Users className="w-6 h-6 text-purple-600" />
                        </div>
                    </div>
                    <div className="mt-4 flex items-center text-sm">
                        <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                        <span className="text-green-600">2 new</span>
                        <span className="text-gray-500 ml-1">this month</span>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600">Avg Resolution</p>
                            <p className="text-2xl font-bold text-gray-900">{dashboardData.overview.averageResolutionTime}</p>
                        </div>
                        <div className="p-3 bg-yellow-50 rounded-full">
                            <Clock className="w-6 h-6 text-yellow-600" />
                        </div>
                    </div>
                    <div className="mt-4 flex items-center text-sm">
                        <TrendingDown className="w-4 h-4 text-green-500 mr-1" />
                        <span className="text-green-600">0.5 days</span>
                        <span className="text-gray-500 ml-1">improvement</span>
                    </div>
                </div>
            </div>

                        {/* Quick Actions */}
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <button className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                        <div className="p-2 bg-blue-50 rounded-full">
                            <Plus className="w-5 h-5 text-blue-600" />
                        </div>
                        <div className="text-left">
                            <p className="font-medium text-gray-900">Create New Project</p>
                            <p className="text-sm text-gray-600">Start a new project with your team</p>
                        </div>
                    </button>

                    <button className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                        <div className="p-2 bg-red-50 rounded-full">
                            <Bug className="w-5 h-5 text-red-600" />
                        </div>
                        <div className="text-left">
                            <p className="font-medium text-gray-900">Report Bug</p>
                            <p className="text-sm text-gray-600">Report a new bug or issue</p>
                        </div>
                    </button>

                    <button className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                        <div className="p-2 bg-green-50 rounded-full">
                            <BarChart3 className="w-5 h-5 text-green-600" />
                        </div>
                        <div className="text-left">
                            <p className="font-medium text-gray-900">Generate Report</p>
                            <p className="text-sm text-gray-600">Create detailed project reports</p>
                        </div>
                    </button>
                </div>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Project Overview */}
                <div className="lg:col-span-2 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-lg font-semibold text-gray-900">Project Overview</h2>
                        <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">View All</button>
                    </div>
                    <div className="space-y-4">
                        {dashboardData.projects.slice(0, 3).map((project) => (
                            <div key={project.id} className="border border-gray-200 rounded-lg p-4">
                                <div className="flex items-center justify-between mb-3">
                                    <div className="flex items-center space-x-3">
                                        <h3 className="font-medium text-gray-900">{project.name}</h3>
                                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(project.priority)}`}>
                                            {project.priority}
                                        </span>
                                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(project.status)}`}>
                                            {project.status}
                                        </span>
                                    </div>
                                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                                        <Calendar className="w-4 h-4" />
                                        <span>{project.dueDate}</span>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between mb-3">
                                    <div className="flex items-center space-x-4">
                                        <div className="flex items-center space-x-1">
                                            <Bug className="w-4 h-4 text-red-500" />
                                            <span className="text-sm text-gray-600">{project.openBugs} open</span>
                                        </div>
                                        <div className="flex items-center space-x-1">
                                            <AlertCircle className="w-4 h-4 text-orange-500" />
                                            <span className="text-sm text-gray-600">{project.criticalBugs} critical</span>
                                        </div>
                                        <div className="flex items-center space-x-1">
                                            <Users className="w-4 h-4 text-blue-500" />
                                            <span className="text-sm text-gray-600">{project.team.length} members</span>
                                        </div>
                                    </div>
                                    <span className="text-sm font-medium text-gray-900">{project.progress}%</span>
                                </div>

                                <div className="w-full bg-gray-200 rounded-full h-2">
                                    <div
                                        className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                                        style={{ width: `${project.progress}%` }}
                                    ></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Recent Activity */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-lg font-semibold text-gray-900">Recent Activity</h2>
                        <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">View All</button>
                    </div>
                    <div className="space-y-4">
                        {dashboardData.recentActivity.map((activity) => (
                            <div key={activity.id} className="flex items-start space-x-3">
                                <div className="flex-shrink-0 mt-1">
                                    {getActivityIcon(activity.type)}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-gray-900">{activity.project}</p>
                                    <p className="text-sm text-gray-600">{activity.description}</p>
                                    <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
                                </div>
                                <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(activity.priority)}`}>
                                    {activity.priority}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Bug Trends Chart */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-lg font-semibold text-gray-900">Bug Trends</h2>
                    <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2">
                            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                            <span className="text-sm text-gray-600">Created</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                            <span className="text-sm text-gray-600">Resolved</span>
                        </div>
                    </div>
                </div>

                {/* Simple bar chart representation */}
                <div className="space-y-4">
                    {dashboardData.bugTrends.labels.map((label, index) => (
                        <div key={label} className="flex items-center space-x-4">
                            <div className="w-12 text-sm text-gray-600">{label}</div>
                            <div className="flex-1 flex items-center space-x-2">
                                <div className="flex items-center space-x-1">
                                    <div
                                        className="bg-red-500 h-4 rounded"
                                        style={{ width: `${dashboardData.bugTrends.created[index] * 10}px` }}
                                    ></div>
                                    <span className="text-xs text-gray-500">{dashboardData.bugTrends.created[index]}</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                    <div
                                        className="bg-green-500 h-4 rounded"
                                        style={{ width: `${dashboardData.bugTrends.resolved[index] * 10}px` }}
                                    ></div>
                                    <span className="text-xs text-gray-500">{dashboardData.bugTrends.resolved[index]}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>


        </div>
    );
};

export default DashboardContent1;