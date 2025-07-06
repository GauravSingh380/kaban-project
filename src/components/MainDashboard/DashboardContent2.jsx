import React, { useState, useEffect } from 'react';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    PieChart, Pie, Cell, LineChart, Line, Legend
} from 'recharts';
import {
    Calendar, Clock, AlertTriangle, CheckCircle, Users,
    TrendingUp, Activity, Target, Bug, Folder,
    ChevronRight, Filter, Eye, MoreHorizontal
} from 'lucide-react';

const DashboardContent2 = ({ user }) => {
    const [timeFilter, setTimeFilter] = useState('week');
    const [selectedProject, setSelectedProject] = useState('all');

    // Mock data - replace with real data from your API
    const projects = [
        {
            id: 1,
            name: 'E-commerce Platform',
            status: 'active',
            progress: 75,
            priority: 'high',
            startDate: '2024-01-15',
            endDate: '2024-12-31',
            teamSize: 8,
            budget: 150000,
            spent: 112500,
            lead: 'John Smith',
            totalTasks: 45,
            completedTasks: 34,
            openBugs: 12,
            closedBugs: 28,
            lastActivity: '2 hours ago',
            health: 'good',
            technologies: ['React', 'Node.js', 'MongoDB'],
            milestones: { completed: 3, total: 5 }
        },
        {
            id: 2,
            name: 'Mobile Banking App',
            status: 'active',
            progress: 45,
            priority: 'critical',
            startDate: '2024-02-01',
            endDate: '2024-10-15',
            teamSize: 12,
            budget: 200000,
            spent: 90000,
            lead: 'Sarah Johnson',
            totalTasks: 67,
            completedTasks: 30,
            openBugs: 8,
            closedBugs: 15,
            lastActivity: '30 minutes ago',
            health: 'at-risk',
            technologies: ['Flutter', 'Firebase', 'REST API'],
            milestones: { completed: 2, total: 6 }
        },
        {
            id: 3,
            name: 'CRM Dashboard',
            status: 'completed',
            progress: 100,
            priority: 'medium',
            startDate: '2023-11-01',
            endDate: '2024-03-30',
            teamSize: 5,
            budget: 80000,
            spent: 75000,
            lead: 'Mike Chen',
            totalTasks: 32,
            completedTasks: 32,
            openBugs: 0,
            closedBugs: 18,
            lastActivity: '3 days ago',
            health: 'excellent',
            technologies: ['Vue.js', 'Laravel', 'MySQL'],
            milestones: { completed: 4, total: 4 }
        },
        {
            id: 4,
            name: 'AI Analytics Tool',
            status: 'planning',
            progress: 15,
            priority: 'medium',
            startDate: '2024-03-01',
            endDate: '2024-11-30',
            teamSize: 6,
            budget: 120000,
            spent: 18000,
            lead: 'Emma Davis',
            totalTasks: 23,
            completedTasks: 3,
            openBugs: 2,
            closedBugs: 1,
            lastActivity: '1 day ago',
            health: 'good',
            technologies: ['Python', 'TensorFlow', 'PostgreSQL'],
            milestones: { completed: 0, total: 4 }
        },
        {
            id: 5,
            name: 'Security Audit Platform',
            status: 'on-hold',
            progress: 30,
            priority: 'low',
            startDate: '2024-01-10',
            endDate: '2024-08-15',
            teamSize: 4,
            budget: 60000,
            spent: 18000,
            lead: 'Alex Rodriguez',
            totalTasks: 28,
            completedTasks: 8,
            openBugs: 5,
            closedBugs: 3,
            lastActivity: '1 week ago',
            health: 'needs-attention',
            technologies: ['Java', 'Spring Boot', 'Docker'],
            milestones: { completed: 1, total: 3 }
        }
    ];

    // Calculate overall statistics
    const totalProjects = projects.length;
    const activeProjects = projects.filter(p => p.status === 'active').length;
    const completedProjects = projects.filter(p => p.status === 'completed').length;
    const totalBudget = projects.reduce((sum, p) => sum + p.budget, 0);
    const totalSpent = projects.reduce((sum, p) => sum + p.spent, 0);
    const totalTasks = projects.reduce((sum, p) => sum + p.totalTasks, 0);
    const completedTasks = projects.reduce((sum, p) => sum + p.completedTasks, 0);
    const totalOpenBugs = projects.reduce((sum, p) => sum + p.openBugs, 0);
    const totalTeamMembers = projects.reduce((sum, p) => sum + p.teamSize, 0);

    // Project status distribution data
    const statusData = [
        { name: 'Active', value: activeProjects, color: '#10B981' },
        { name: 'Completed', value: completedProjects, color: '#3B82F6' },
        { name: 'Planning', value: projects.filter(p => p.status === 'planning').length, color: '#F59E0B' },
        { name: 'On Hold', value: projects.filter(p => p.status === 'on-hold').length, color: '#EF4444' }
    ];

    // Monthly progress data
    const monthlyData = [
        { month: 'Jan', tasks: 45, bugs: 12, projects: 2 },
        { month: 'Feb', tasks: 52, bugs: 18, projects: 3 },
        { month: 'Mar', tasks: 38, bugs: 15, projects: 4 },
        { month: 'Apr', tasks: 61, bugs: 22, projects: 4 },
        { month: 'May', tasks: 48, bugs: 19, projects: 5 },
        { month: 'Jun', tasks: 67, bugs: 25, projects: 5 }
    ];

    // Priority distribution
    const priorityData = [
        { name: 'Critical', value: projects.filter(p => p.priority === 'critical').length, color: '#DC2626' },
        { name: 'High', value: projects.filter(p => p.priority === 'high').length, color: '#EA580C' },
        { name: 'Medium', value: projects.filter(p => p.priority === 'medium').length, color: '#D97706' },
        { name: 'Low', value: projects.filter(p => p.priority === 'low').length, color: '#65A30D' }
    ];

    const getStatusColor = (status) => {
        switch (status) {
            case 'active': return 'bg-green-100 text-green-800';
            case 'completed': return 'bg-blue-100 text-blue-800';
            case 'planning': return 'bg-yellow-100 text-yellow-800';
            case 'on-hold': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const getPriorityColor = (priority) => {
        switch (priority) {
            case 'critical': return 'bg-red-100 text-red-800';
            case 'high': return 'bg-orange-100 text-orange-800';
            case 'medium': return 'bg-yellow-100 text-yellow-800';
            case 'low': return 'bg-green-100 text-green-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const getHealthColor = (health) => {
        switch (health) {
            case 'excellent': return 'text-green-500';
            case 'good': return 'text-blue-500';
            case 'at-risk': return 'text-yellow-500';
            case 'needs-attention': return 'text-red-500';
            default: return 'text-gray-500';
        }
    };

    return (
        <div className="max-w-full mx-auto bg-gray-50 min-h-screen">
            {/* Header */}
            <div className="bg-white rounded-lg shadow-lg mb-6">
                <div className="border-b border-gray-200 p-6">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">Project Dashboard</h1>
                            <p className="text-gray-600 mt-1">Welcome back, {user?.name || 'User'}! Here's your project overview</p>
                        </div>
                        <div className="mt-4 sm:mt-0 flex items-center space-x-3">
                            <select
                                value={timeFilter}
                                onChange={(e) => setTimeFilter(e.target.value)}
                                className="border border-gray-300 rounded-md px-3 py-2 text-sm"
                            >
                                <option value="week">This Week</option>
                                <option value="month">This Month</option>
                                <option value="quarter">This Quarter</option>
                                <option value="year">This Year</option>
                            </select>
                            <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                                <Filter className="w-4 h-4" />
                                <span>Filter</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600">Total Projects</p>
                            <p className="text-2xl font-bold text-gray-900">{totalProjects}</p>
                            <p className="text-sm text-green-600">+2 from last month</p>
                        </div>
                        <div className="p-3 bg-blue-100 rounded-full">
                            <Folder className="w-6 h-6 text-blue-600" />
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600">Active Projects</p>
                            <p className="text-2xl font-bold text-gray-900">{activeProjects}</p>
                            <p className="text-sm text-green-600">85% completion rate</p>
                        </div>
                        <div className="p-3 bg-green-100 rounded-full">
                            <Activity className="w-6 h-6 text-green-600" />
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600">Team Members</p>
                            <p className="text-2xl font-bold text-gray-900">{totalTeamMembers}</p>
                            <p className="text-sm text-blue-600">Across all projects</p>
                        </div>
                        <div className="p-3 bg-purple-100 rounded-full">
                            <Users className="w-6 h-6 text-purple-600" />
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600">Open Issues</p>
                            <p className="text-2xl font-bold text-gray-900">{totalOpenBugs}</p>
                            <p className="text-sm text-red-600">Needs attention</p>
                        </div>
                        <div className="p-3 bg-red-100 rounded-full">
                            <AlertTriangle className="w-6 h-6 text-red-600" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                {/* Monthly Progress Chart */}
                <div className="bg-white rounded-lg shadow p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Monthly Progress</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={monthlyData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="month" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="tasks" stroke="#3B82F6" name="Tasks Completed" />
                            <Line type="monotone" dataKey="bugs" stroke="#EF4444" name="Bugs Fixed" />
                        </LineChart>
                    </ResponsiveContainer>
                </div>

                {/* Project Status Distribution */}
                <div className="bg-white rounded-lg shadow p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Project Status Distribution</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie
                                data={statusData}
                                cx="50%"
                                cy="50%"
                                outerRadius={80}
                                dataKey="value"
                                label={({ name, value }) => `${name}: ${value}`}
                            >
                                {statusData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Budget Overview */}
            <div className="bg-white rounded-lg shadow mb-6">
                <div className="p-6 border-b border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900">Budget Overview</h3>
                </div>
                <div className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="text-center">
                            <p className="text-sm text-gray-600">Total Budget</p>
                            <p className="text-2xl font-bold text-gray-900">${totalBudget.toLocaleString()}</p>
                        </div>
                        <div className="text-center">
                            <p className="text-sm text-gray-600">Total Spent</p>
                            <p className="text-2xl font-bold text-blue-600">${totalSpent.toLocaleString()}</p>
                        </div>
                        <div className="text-center">
                            <p className="text-sm text-gray-600">Remaining</p>
                            <p className="text-2xl font-bold text-green-600">${(totalBudget - totalSpent).toLocaleString()}</p>
                        </div>
                    </div>
                    <div className="mt-4">
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-sm font-medium text-gray-700">Budget Utilization</span>
                            <span className="text-sm text-gray-500">{Math.round((totalSpent / totalBudget) * 100)}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                                className="bg-blue-600 h-2 rounded-full"
                                style={{ width: `${Math.round((totalSpent / totalBudget) * 100)}%` }}
                            ></div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Recent Project Activities */}
            <div className="bg-white rounded-lg shadow">
                <div className="p-6 border-b border-gray-200">
                    <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold text-gray-900">Recent Project Activities</h3>
                        <button className="text-sm text-blue-600 hover:text-blue-800">View All</button>
                    </div>
                </div>
                <div className="divide-y divide-gray-200">
                    {projects.slice(0, 3).map((project) => (
                        <div key={project.id} className="p-6">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-4">
                                    <div className="flex-shrink-0">
                                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                                            <Folder className="w-5 h-5 text-blue-600" />
                                        </div>
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-medium text-gray-900">{project.name}</h4>
                                        <p className="text-sm text-gray-600">
                                            {project.completedTasks}/{project.totalTasks} tasks completed • {project.lastActivity}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(project.status)}`}>
                                        {project.status}
                                    </span>
                                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(project.priority)}`}>
                                        {project.priority}
                                    </span>
                                    <div className="flex items-center space-x-2">
                                        <div className="w-16 bg-gray-200 rounded-full h-2">
                                            <div
                                                className="bg-blue-600 h-2 rounded-full"
                                                style={{ width: `${project.progress}%` }}
                                            ></div>
                                        </div>
                                        <span className="text-sm text-gray-500">{project.progress}%</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default DashboardContent2;