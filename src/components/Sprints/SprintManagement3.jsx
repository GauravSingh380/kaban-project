import React, { useState } from 'react';
import {
    Play,
    Pause,
    Square,
    Plus,
    Edit3,
    Trash2,
    Clock,
    Calendar,
    Users,
    Target,
    BarChart3,
    CheckCircle2,
    AlertCircle,
    Timer,
    Flag,
    User,
    ChevronRight,
    Filter,
    Search,
    MoreVertical,
    Settings,
    TrendingUp,
    Activity,
    Zap,
    GitBranch,
    AlertTriangle,
    CheckCircle,
    Circle,
    ArrowRight,
    ArrowLeft,
    RefreshCw,
    Eye,
    Download,
    Upload,
    X
} from 'lucide-react';

const SprintManagement3 = () => {
    const [activeTab, setActiveTab] = useState('active');
    const [selectedProject, setSelectedProject] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showTaskModal, setShowTaskModal] = useState(false);
    const [selectedSprint, setSelectedSprint] = useState(null);
    const [viewMode, setViewMode] = useState('grid'); // grid or list

    // Mock data
    const [projects] = useState([
        { id: 1, name: 'E-commerce Platform', color: 'bg-blue-500' },
        { id: 2, name: 'Mobile App', color: 'bg-green-500' },
        { id: 3, name: 'Dashboard Redesign', color: 'bg-purple-500' },
        { id: 4, name: 'API Integration', color: 'bg-orange-500' }
    ]);

    const [sprints, setSprints] = useState([
        {
            id: 1,
            name: 'Sprint 24 - Q4',
            project: 'E-commerce Platform',
            projectId: 1,
            status: 'active',
            startDate: '2024-07-01',
            endDate: '2024-07-14',
            duration: 14,
            progress: 65,
            tasks: {
                total: 24,
                completed: 12,
                inProgress: 8,
                todo: 4
            },
            team: [
                { id: 1, name: 'John Doe', avatar: 'JD', role: 'Developer' },
                { id: 2, name: 'Sarah Smith', avatar: 'SS', role: 'Designer' },
                { id: 3, name: 'Mike Johnson', avatar: 'MJ', role: 'QA' }
            ],
            burndownData: [
                { day: 1, planned: 24, actual: 24 },
                { day: 2, planned: 22, actual: 23 },
                { day: 3, planned: 20, actual: 21 },
                { day: 4, planned: 18, actual: 19 },
                { day: 5, planned: 16, actual: 16 },
                { day: 6, planned: 14, actual: 15 },
                { day: 7, planned: 12, actual: 12 }
            ],
            velocity: 85,
            sprintGoal: 'Complete user authentication and profile management features'
        },
        {
            id: 2,
            name: 'Sprint 23 - Backend APIs',
            project: 'Mobile App',
            projectId: 2,
            status: 'planning',
            startDate: '2024-07-15',
            endDate: '2024-07-28',
            duration: 14,
            progress: 0,
            tasks: {
                total: 18,
                completed: 0,
                inProgress: 0,
                todo: 18
            },
            team: [
                { id: 4, name: 'Emma Wilson', avatar: 'EW', role: 'Developer' },
                { id: 5, name: 'David Brown', avatar: 'DB', role: 'Backend' }
            ],
            velocity: 0,
            sprintGoal: 'Implement core API endpoints and database schema'
        },
        {
            id: 3,
            name: 'Sprint 22 - UI Components',
            project: 'Dashboard Redesign',
            projectId: 3,
            status: 'completed',
            startDate: '2024-06-15',
            endDate: '2024-06-28',
            duration: 14,
            progress: 100,
            tasks: {
                total: 16,
                completed: 16,
                inProgress: 0,
                todo: 0
            },
            team: [
                { id: 6, name: 'Lisa Chen', avatar: 'LC', role: 'Designer' },
                { id: 7, name: 'Tom Wilson', avatar: 'TW', role: 'Developer' }
            ],
            velocity: 95,
            sprintGoal: 'Complete all dashboard UI components and interactions'
        }
    ]);

    const getStatusColor = (status) => {
        switch (status) {
            case 'active': return 'bg-green-100 text-green-700 border-green-200';
            case 'planning': return 'bg-blue-100 text-blue-700 border-blue-200';
            case 'completed': return 'bg-gray-100 text-gray-700 border-gray-200';
            case 'paused': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
            default: return 'bg-gray-100 text-gray-700 border-gray-200';
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'active': return <Play className="w-3 h-3" />;
            case 'planning': return <Clock className="w-3 h-3" />;
            case 'completed': return <CheckCircle2 className="w-3 h-3" />;
            case 'paused': return <Pause className="w-3 h-3" />;
            default: return <Circle className="w-3 h-3" />;
        }
    };

    const getPriorityColor = (priority) => {
        switch (priority) {
            case 'high': return 'bg-red-100 text-red-700';
            case 'medium': return 'bg-yellow-100 text-yellow-700';
            case 'low': return 'bg-green-100 text-green-700';
            default: return 'bg-gray-100 text-gray-700';
        }
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
    };

    const getDaysRemaining = (endDate) => {
        const today = new Date();
        const end = new Date(endDate);
        const diffTime = end - today;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays;
    };

    const filteredSprints = sprints.filter(sprint => {
        const matchesTab = activeTab === 'all' || sprint.status === activeTab;
        const matchesProject = selectedProject === 'all' || sprint.projectId === parseInt(selectedProject);
        const matchesSearch = sprint.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            sprint.project.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesTab && matchesProject && matchesSearch;
    });

    const tabs = [
        { id: 'active', label: 'Active', count: sprints.filter(s => s.status === 'active').length },
        { id: 'planning', label: 'Planning', count: sprints.filter(s => s.status === 'planning').length },
        { id: 'completed', label: 'Completed', count: sprints.filter(s => s.status === 'completed').length },
        { id: 'all', label: 'All Sprints', count: sprints.length }
    ];

    const SprintCard = ({ sprint }) => {
        const daysRemaining = getDaysRemaining(sprint.endDate);
        const project = projects.find(p => p.id === sprint.projectId);

        return (
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200">
                <div className="p-6">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                                <h3 className="text-lg font-semibold text-gray-900">{sprint.name}</h3>
                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(sprint.status)}`}>
                                    {getStatusIcon(sprint.status)}
                                    <span className="ml-1 capitalize">{sprint.status}</span>
                                </span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                <div className={`w-3 h-3 rounded-full ${project?.color}`}></div>
                                <span>{sprint.project}</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-1">
                            <button className="p-1 hover:bg-gray-100 rounded">
                                <MoreVertical className="w-4 h-4 text-gray-400" />
                            </button>
                        </div>
                    </div>

                    {/* Sprint Goal */}
                    <div className="mb-4">
                        <p className="text-sm text-gray-600 italic">{sprint.sprintGoal}</p>
                    </div>

                    {/* Progress Bar */}
                    <div className="mb-4">
                        <div className="flex items-center justify-between text-sm mb-2">
                            <span className="text-gray-600">Progress</span>
                            <span className="font-medium text-gray-900">{sprint.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                                style={{ width: `${sprint.progress}%` }}
                            ></div>
                        </div>
                    </div>

                    {/* Task Statistics */}
                    <div className="grid grid-cols-4 gap-2 mb-4">
                        <div className="text-center p-2 bg-gray-50 rounded-lg">
                            <div className="text-lg font-bold text-gray-900">{sprint.tasks.total}</div>
                            <div className="text-xs text-gray-500">Total</div>
                        </div>
                        <div className="text-center p-2 bg-green-50 rounded-lg">
                            <div className="text-lg font-bold text-green-600">{sprint.tasks.completed}</div>
                            <div className="text-xs text-green-600">Done</div>
                        </div>
                        <div className="text-center p-2 bg-blue-50 rounded-lg">
                            <div className="text-lg font-bold text-blue-600">{sprint.tasks.inProgress}</div>
                            <div className="text-xs text-blue-600">In Progress</div>
                        </div>
                        <div className="text-center p-2 bg-yellow-50 rounded-lg">
                            <div className="text-lg font-bold text-yellow-600">{sprint.tasks.todo}</div>
                            <div className="text-xs text-yellow-600">To Do</div>
                        </div>
                    </div>

                    {/* Date Info */}
                    <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                        <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            <span>{formatDate(sprint.startDate)} - {formatDate(sprint.endDate)}</span>
                        </div>
                        {sprint.status === 'active' && (
                            <div className="flex items-center gap-1 text-orange-600">
                                <Timer className="w-4 h-4" />
                                <span>{daysRemaining} days left</span>
                            </div>
                        )}
                    </div>

                    {/* Team Avatars */}
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <Users className="w-4 h-4 text-gray-400" />
                            <div className="flex -space-x-2">
                                {sprint.team.map((member, index) => (
                                    <div key={member.id} className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 text-white text-xs flex items-center justify-center font-medium border-2 border-white">
                                        {member.avatar}
                                    </div>
                                ))}
                            </div>
                            <span className="text-sm text-gray-500">+{sprint.team.length} members</span>
                        </div>
                        {sprint.velocity > 0 && (
                            <div className="flex items-center gap-1 text-sm">
                                <TrendingUp className="w-4 h-4 text-green-500" />
                                <span className="text-gray-600">{sprint.velocity}% velocity</span>
                            </div>
                        )}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2 mt-4 pt-4 border-t border-gray-100">
                        <button 
                            onClick={() => setSelectedSprint(sprint)}
                            className="flex-1 px-3 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center gap-1"
                        >
                            <Eye className="w-4 h-4" />
                            View Details
                        </button>
                        <button className="px-3 py-2 text-sm border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors flex items-center justify-center gap-1">
                            <Edit3 className="w-4 h-4" />
                            Edit
                        </button>
                    </div>
                </div>
            </div>
        );
    };

    const SprintList = ({ sprint }) => {
        const daysRemaining = getDaysRemaining(sprint.endDate);
        const project = projects.find(p => p.id === sprint.projectId);

        return (
            <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className={`w-3 h-3 rounded-full ${project?.color}`}></div>
                        <h3 className="font-medium text-gray-900">{sprint.name}</h3>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(sprint.status)}`}>
                            {getStatusIcon(sprint.status)}
                            <span className="ml-1 capitalize">{sprint.status}</span>
                        </span>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="text-sm text-gray-600">
                            {formatDate(sprint.startDate)} - {formatDate(sprint.endDate)}
                        </div>
                        <div className="w-32">
                            <div className="flex items-center justify-between text-xs mb-1">
                                <span>{sprint.progress}%</span>
                                <span>{sprint.tasks.completed}/{sprint.tasks.total}</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-1.5">
                                <div 
                                    className="bg-blue-600 h-1.5 rounded-full" 
                                    style={{ width: `${sprint.progress}%` }}
                                ></div>
                            </div>
                        </div>
                        <button 
                            onClick={() => setSelectedSprint(sprint)}
                            className="text-blue-600 hover:text-blue-800"
                        >
                            <ChevronRight className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </div>
        );
    };

    const CreateSprintModal = () => {
        const [formData, setFormData] = useState({
            name: '',
            project: '',
            startDate: '',
            endDate: '',
            duration: 14,
            sprintGoal: ''
        });

        if (!showCreateModal) return null;

        return (
            <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
                <div className="bg-white rounded-lg max-w-md w-full p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Create New Sprint</h3>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Sprint Name</label>
                            <input
                                type="text"
                                value={formData.name}
                                onChange={(e) => setFormData({...formData, name: e.target.value})}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Sprint 25 - Feature Development"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Project</label>
                            <select
                                value={formData.project}
                                onChange={(e) => setFormData({...formData, project: e.target.value})}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                            >
                                <option value="">Select Project</option>
                                {projects.map(project => (
                                    <option key={project.id} value={project.id}>{project.name}</option>
                                ))}
                            </select>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                                <input
                                    type="date"
                                    value={formData.startDate}
                                    onChange={(e) => setFormData({...formData, startDate: e.target.value})}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Duration (Days)</label>
                                <input
                                    type="number"
                                    value={formData.duration}
                                    onChange={(e) => setFormData({...formData, duration: e.target.value})}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Sprint Goal</label>
                            <textarea
                                value={formData.sprintGoal}
                                onChange={(e) => setFormData({...formData, sprintGoal: e.target.value})}
                                rows={3}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                placeholder="What do you want to achieve in this sprint?"
                            />
                        </div>
                    </div>
                    <div className="flex gap-3 mt-6">
                        <button
                            onClick={() => setShowCreateModal(false)}
                            className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
                        >
                            Cancel
                        </button>
                        <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                            Create Sprint
                        </button>
                    </div>
                </div>
            </div>
        );
    };

    const SprintDetailModal = () => {
        if (!selectedSprint) return null;

        return (
            <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
                <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                    <div className="p-6 border-b border-gray-200">
                        <div className="flex items-start justify-between">
                            <div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-2">{selectedSprint.name}</h3>
                                <p className="text-gray-600">{selectedSprint.sprintGoal}</p>
                            </div>
                            <button
                                onClick={() => setSelectedSprint(null)}
                                className="p-2 hover:bg-gray-100 rounded-full"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                    </div>

                    <div className="p-6">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            {/* Sprint Overview */}
                            <div className="lg:col-span-2">
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                                    <div className="bg-blue-50 p-4 rounded-lg">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="text-sm text-blue-600 font-medium">Total Tasks</p>
                                                <p className="text-2xl font-bold text-blue-700">{selectedSprint.tasks.total}</p>
                                            </div>
                                            <Target className="w-8 h-8 text-blue-500" />
                                        </div>
                                    </div>
                                    <div className="bg-green-50 p-4 rounded-lg">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="text-sm text-green-600 font-medium">Completed</p>
                                                <p className="text-2xl font-bold text-green-700">{selectedSprint.tasks.completed}</p>
                                            </div>
                                            <CheckCircle className="w-8 h-8 text-green-500" />
                                        </div>
                                    </div>
                                    <div className="bg-yellow-50 p-4 rounded-lg">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="text-sm text-yellow-600 font-medium">In Progress</p>
                                                <p className="text-2xl font-bold text-yellow-700">{selectedSprint.tasks.inProgress}</p>
                                            </div>
                                            <Activity className="w-8 h-8 text-yellow-500" />
                                        </div>
                                    </div>
                                    <div className="bg-purple-50 p-4 rounded-lg">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="text-sm text-purple-600 font-medium">Velocity</p>
                                                <p className="text-2xl font-bold text-purple-700">{selectedSprint.velocity}%</p>
                                            </div>
                                            <TrendingUp className="w-8 h-8 text-purple-500" />
                                        </div>
                                    </div>
                                </div>

                                {/* Progress Chart Placeholder */}
                                <div className="bg-gray-50 rounded-lg p-6 mb-6">
                                    <h4 className="text-lg font-semibold text-gray-900 mb-4">Burndown Chart</h4>
                                    <div className="h-64 bg-white rounded border border-gray-200 flex items-center justify-center">
                                        <div className="text-center text-gray-500">
                                            <BarChart3 className="w-12 h-12 mx-auto mb-2" />
                                            <p>Burndown chart would be rendered here</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Sprint Info */}
                            <div className="space-y-6">
                                <div className="bg-gray-50 rounded-lg p-4">
                                    <h4 className="text-lg font-semibold text-gray-900 mb-4">Sprint Information</h4>
                                    <div className="space-y-3">
                                        <div>
                                            <p className="text-sm font-medium text-gray-700">Status</p>
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(selectedSprint.status)}`}>
                                                {getStatusIcon(selectedSprint.status)}
                                                <span className="ml-1 capitalize">{selectedSprint.status}</span>
                                            </span>
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-gray-700">Duration</p>
                                            <p className="text-sm text-gray-900">{selectedSprint.duration} days</p>
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-gray-700">Start Date</p>
                                            <p className="text-sm text-gray-900">{formatDate(selectedSprint.startDate)}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-gray-700">End Date</p>
                                            <p className="text-sm text-gray-900">{formatDate(selectedSprint.endDate)}</p>
                                        </div>
                                        {selectedSprint.status === 'active' && (
                                            <div>
                                                <p className="text-sm font-medium text-gray-700">Days Remaining</p>
                                                <p className="text-sm text-orange-600 font-medium">{getDaysRemaining(selectedSprint.endDate)} days</p>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="bg-gray-50 rounded-lg p-4">
                                    <h4 className="text-lg font-semibold text-gray-900 mb-4">Team Members</h4>
                                    <div className="space-y-3">
                                        {selectedSprint.team.map(member => (
                                            <div key={member.id} className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 text-white text-sm flex items-center justify-center font-medium">
                                                    {member.avatar}
                                                </div>
                                                <div>
                                                    <p className="text-sm font-medium text-gray-900">{member.name}</p>
                                                    <p className="text-xs text-gray-500">{member.role}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center gap-2">
                                        <Settings className="w-4 h-4" />
                                        Manage Sprint
                                    </button>
                                    <button className="w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
                                        <Download className="w-4 h-4" />
                                        Export Report
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="max-w-7xl mx-auto p-6">
            {/* Header */}
            <div className="mb-8">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Sprint Management</h1>
                        <p className="text-gray-600 mt-1">Track and manage your development sprints</p>
                    </div>
                    <div className="flex gap-3">
                        <button
                            onClick={() => setShowCreateModal(true)}
                            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            <Plus className="w-4 h-4" />
                            New Sprint
                        </button>
                        <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                            <Upload className="w-4 h-4" />
                            Import
                        </button>
                    </div>
                </div>

                {/* Filters */}
                <div className="flex flex-col sm:flex-row gap-4">
                    <div className="relative flex-1 max-w-md">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <input
                            type="text"
                            placeholder="Search sprints..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    <select
                        value={selectedProject}
                        onChange={(e) => setSelectedProject(e.target.value)}
                        className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    >
                        <option value="all">All Projects</option>
                        {projects.map(project => (
                            <option key={project.id} value={project.id}>{project.name}</option>
                        ))}
                    </select>
                    <div className="flex border border-gray-300 rounded-lg">
                        <button
                            onClick={() => setViewMode('grid')}
                            className={`px-4 py-2 ${viewMode === 'grid' ? 'bg-blue-600 text-white' : 'text-gray-700'} rounded-l-lg transition-colors`}
                        >
                            Grid
                        </button>
                        <button
                            onClick={() => setViewMode('list')}
                            className={`px-4 py-2 ${viewMode === 'list' ? 'bg-blue-600 text-white' : 'text-gray-700'} rounded-r-lg transition-colors`}
                        >
                            List
                        </button>
                    </div>
                </div>

                {/* Tabs */}
                <div className="flex border-b border-gray-200 mt-6">
                    {tabs.map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`px-4 py-3 text-sm font-medium relative ${activeTab === tab.id ? 'text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
                        >
                            {tab.label}
                            {tab.count > 0 && (
                                <span className="ml-2 px-2 py-0.5 text-xs rounded-full bg-gray-100 text-gray-600">
                                    {tab.count}
                                </span>
                            )}
                            {activeTab === tab.id && (
                                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600"></div>
                            )}
                        </button>
                    ))}
                </div>
            </div>

            {/* Sprint Cards */}
            {filteredSprints.length > 0 ? (
                viewMode === 'grid' ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredSprints.map(sprint => (
                            <SprintCard key={sprint.id} sprint={sprint} />
                        ))}
                    </div>
                ) : (
                    <div className="space-y-3">
                        {filteredSprints.map(sprint => (
                            <SprintList key={sprint.id} sprint={sprint} />
                        ))}
                    </div>
                )
            ) : (
                <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
                    <div className="mx-auto max-w-md">
                        <Target className="mx-auto h-12 w-12 text-gray-400" />
                        <h3 className="mt-2 text-lg font-medium text-gray-900">No sprints found</h3>
                        <p className="mt-1 text-sm text-gray-500">
                            Get started by creating a new sprint or adjusting your filters.
                        </p>
                        <div className="mt-6">
                            <button
                                onClick={() => setShowCreateModal(true)}
                                className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                                <Plus className="-ml-1 mr-2 h-5 w-5" />
                                New Sprint
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Modals */}
            <CreateSprintModal />
            <SprintDetailModal />
        </div>
    );
};

export default SprintManagement3;