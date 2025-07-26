import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
    Calendar,
    Clock,
    Target,
    Play,
    Pause,
    CheckCircle2,
    AlertCircle,
    Plus,
    Edit3,
    Trash2,
    Users,
    BarChart3,
    Flag,
    Timer,
    ArrowRight,
    MoreHorizontal,
    Filter,
    Search,
    X,
    Save,
    ChevronDown,
    ChevronRight,
    Activity,
    TrendingUp,
    AlertTriangle,
    Zap
} from 'lucide-react';

const SprintManagement1 = () => {
    const [activeView, setActiveView] = useState('board');
    const [selectedSprint, setSelectedSprint] = useState(null);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [filterStatus, setFilterStatus] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');
    const [expandedSprint, setExpandedSprint] = useState(null);

    // Mock data - replace with your API calls
    const [sprints, setSprints] = useState([
        {
            id: 1,
            name: 'User Authentication Sprint',
            description: 'Implement user login, signup, and authentication features',
            status: 'active',
            startDate: '2024-07-15',
            endDate: '2024-07-29',
            totalStoryPoints: 34,
            completedStoryPoints: 18,
            totalTasks: 12,
            completedTasks: 6,
            teamMembers: ['John Doe', 'Jane Smith', 'Mike Johnson'],
            project: 'E-commerce Platform',
            progress: 53,
            velocity: 2.3,
            burndownData: [34, 30, 28, 22, 18],
            tasks: [
                { id: 1, title: 'Design login form', status: 'completed', points: 3, assignee: 'Jane Smith' },
                { id: 2, title: 'Implement OAuth integration', status: 'in_progress', points: 8, assignee: 'John Doe' },
                { id: 3, title: 'Create user registration', status: 'todo', points: 5, assignee: 'Mike Johnson' },
                { id: 4, title: 'Add password reset', status: 'todo', points: 3, assignee: 'Jane Smith' }
            ]
        },
        {
            id: 2,
            name: 'Payment Integration Sprint',
            description: 'Integrate payment gateways and handle transactions',
            status: 'planning',
            startDate: '2024-07-30',
            endDate: '2024-08-13',
            totalStoryPoints: 28,
            completedStoryPoints: 0,
            totalTasks: 8,
            completedTasks: 0,
            teamMembers: ['Sarah Wilson', 'Tom Brown'],
            project: 'E-commerce Platform',
            progress: 0,
            velocity: 0,
            burndownData: [28, 28, 28, 28, 28],
            tasks: [
                { id: 5, title: 'Research payment providers', status: 'todo', points: 2, assignee: 'Sarah Wilson' },
                { id: 6, title: 'Implement Stripe integration', status: 'todo', points: 8, assignee: 'Tom Brown' }
            ]
        },
        {
            id: 3,
            name: 'Dashboard Analytics Sprint',
            description: 'Create comprehensive dashboard with analytics',
            status: 'completed',
            startDate: '2024-06-15',
            endDate: '2024-06-29',
            totalStoryPoints: 42,
            completedStoryPoints: 42,
            totalTasks: 15,
            completedTasks: 15,
            teamMembers: ['Alice Cooper', 'Bob Davis', 'Carol White'],
            project: 'Analytics Platform',
            progress: 100,
            velocity: 3.2,
            burndownData: [42, 35, 28, 18, 0],
            tasks: [
                { id: 7, title: 'Design dashboard layout', status: 'completed', points: 5, assignee: 'Alice Cooper' },
                { id: 8, title: 'Implement charts', status: 'completed', points: 8, assignee: 'Bob Davis' }
            ]
        }
    ]);

    const [newSprint, setNewSprint] = useState({
        name: '',
        description: '',
        startDate: '',
        endDate: '',
        project: '',
        teamMembers: [],
        totalStoryPoints: 0
    });

    const [editSprint, setEditSprint] = useState({});

    const sprintStatusConfig = {
        planning: { color: 'bg-blue-100 text-blue-700 border-blue-200', icon: Calendar, label: 'Planning' },
        active: { color: 'bg-green-100 text-green-700 border-green-200', icon: Play, label: 'Active' },
        completed: { color: 'bg-gray-100 text-gray-700 border-gray-200', icon: CheckCircle2, label: 'Completed' },
        on_hold: { color: 'bg-yellow-100 text-yellow-700 border-yellow-200', icon: Pause, label: 'On Hold' }
    };

    const projects = ['E-commerce Platform', 'Analytics Platform', 'Mobile App', 'API Gateway'];
    const teamMembers = ['John Doe', 'Jane Smith', 'Mike Johnson', 'Sarah Wilson', 'Tom Brown', 'Alice Cooper', 'Bob Davis', 'Carol White'];

    const filteredSprints = sprints.filter(sprint => {
        const matchesStatus = filterStatus === 'all' || sprint.status === filterStatus;
        const matchesSearch = sprint.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            sprint.project.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesStatus && matchesSearch;
    });

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

    const handleCreateSprint = () => {
        const newSprintData = {
            id: Date.now(),
            ...newSprint,
            status: 'planning',
            completedStoryPoints: 0,
            totalTasks: 0,
            completedTasks: 0,
            progress: 0,
            velocity: 0,
            burndownData: [newSprint.totalStoryPoints],
            tasks: []
        };
        setSprints([...sprints, newSprintData]);
        setNewSprint({
            name: '',
            description: '',
            startDate: '',
            endDate: '',
            project: '',
            teamMembers: [],
            totalStoryPoints: 0
        });
        setShowCreateModal(false);
    };

    const handleEditSprint = () => {
        setSprints(sprints.map(sprint => 
            sprint.id === editSprint.id ? editSprint : sprint
        ));
        setShowEditModal(false);
        setEditSprint({});
    };

    const handleDeleteSprint = (sprintId) => {
        setSprints(sprints.filter(sprint => sprint.id !== sprintId));
    };

    const openEditModal = (sprint) => {
        setEditSprint(sprint);
        setShowEditModal(true);
    };

    const SprintCard = ({ sprint }) => {
        const statusConfig = sprintStatusConfig[sprint.status];
        const StatusIcon = statusConfig.icon;
        const daysRemaining = getDaysRemaining(sprint.endDate);
        const isExpanded = expandedSprint === sprint.id;

        return (
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                                <h3 className="text-lg font-semibold text-gray-900">{sprint.name}</h3>
                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${statusConfig.color}`}>
                                    <StatusIcon className="w-3 h-3 mr-1" />
                                    {statusConfig.label}
                                </span>
                            </div>
                            <p className="text-gray-600 text-sm mb-3">{sprint.description}</p>
                            <div className="flex items-center gap-4 text-sm text-gray-500">
                                <div className="flex items-center gap-1">
                                    <Calendar className="w-4 h-4" />
                                    {formatDate(sprint.startDate)} - {formatDate(sprint.endDate)}
                                </div>
                                <div className="flex items-center gap-1">
                                    <Target className="w-4 h-4" />
                                    {sprint.project}
                                </div>
                                <div className="flex items-center gap-1">
                                    <Users className="w-4 h-4" />
                                    {sprint.teamMembers.length} members
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => setExpandedSprint(isExpanded ? null : sprint.id)}
                                className="p-1 text-gray-400 hover:text-gray-600"
                            >
                                {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                            </button>
                            <button
                                onClick={() => openEditModal(sprint)}
                                className="p-1 text-gray-400 hover:text-blue-600"
                            >
                                <Edit3 className="w-4 h-4" />
                            </button>
                            <button
                                onClick={() => handleDeleteSprint(sprint.id)}
                                className="p-1 text-gray-400 hover:text-red-600"
                            >
                                <Trash2 className="w-4 h-4" />
                            </button>
                        </div>
                    </div>

                    {/* Progress Stats */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                        <div className="text-center">
                            <p className="text-2xl font-bold text-blue-600">{sprint.completedStoryPoints}/{sprint.totalStoryPoints}</p>
                            <p className="text-xs text-gray-500">Story Points</p>
                        </div>
                        <div className="text-center">
                            <p className="text-2xl font-bold text-green-600">{sprint.completedTasks}/{sprint.totalTasks}</p>
                            <p className="text-xs text-gray-500">Tasks</p>
                        </div>
                        <div className="text-center">
                            <p className="text-2xl font-bold text-purple-600">{sprint.progress}%</p>
                            <p className="text-xs text-gray-500">Progress</p>
                        </div>
                        <div className="text-center">
                            <p className={`text-2xl font-bold ${daysRemaining < 0 ? 'text-red-600' : daysRemaining < 3 ? 'text-yellow-600' : 'text-gray-600'}`}>
                                {daysRemaining < 0 ? 'Overdue' : `${daysRemaining}d`}
                            </p>
                            <p className="text-xs text-gray-500">Remaining</p>
                        </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="mb-4">
                        <div className="flex justify-between text-sm mb-1">
                            <span className="text-gray-600">Sprint Progress</span>
                            <span className="font-medium">{sprint.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                                style={{ width: `${sprint.progress}%` }}
                            ></div>
                        </div>
                    </div>

                    {/* Team Members */}
                    <div className="flex items-center justify-between">
                        <div className="flex -space-x-2">
                            {sprint.teamMembers.slice(0, 4).map((member, index) => (
                                <div key={index} className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-white text-xs flex items-center justify-center border-2 border-white font-medium">
                                    {member.split(' ').map(n => n[0]).join('')}
                                </div>
                            ))}
                            {sprint.teamMembers.length > 4 && (
                                <div className="w-8 h-8 rounded-full bg-gray-100 text-gray-600 text-xs flex items-center justify-center border-2 border-white">
                                    +{sprint.teamMembers.length - 4}
                                </div>
                            )}
                        </div>
                        {sprint.status === 'active' && (
                            <div className="flex items-center gap-1 text-green-600">
                                <Activity className="w-4 h-4" />
                                <span className="text-sm font-medium">Active Sprint</span>
                            </div>
                        )}
                    </div>

                    {/* Expanded Content */}
                    {isExpanded && (
                        <div className="mt-6 pt-6 border-t border-gray-200">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Tasks */}
                                <div>
                                    <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                                        <Target className="w-4 h-4" />
                                        Sprint Tasks
                                    </h4>
                                    <div className="space-y-2">
                                        {sprint.tasks.map(task => (
                                            <div key={task.id} className="flex items-center justify-between p-2 bg-gray-50 rounded-md">
                                                <div className="flex-1">
                                                    <p className="text-sm font-medium text-gray-900">{task.title}</p>
                                                    <p className="text-xs text-gray-500">{task.assignee} • {task.points} pts</p>
                                                </div>
                                                <span className={`px-2 py-1 text-xs rounded-full ${
                                                    task.status === 'completed' ? 'bg-green-100 text-green-700' :
                                                    task.status === 'in_progress' ? 'bg-blue-100 text-blue-700' :
                                                    'bg-gray-100 text-gray-700'
                                                }`}>
                                                    {task.status.replace('_', ' ')}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Burndown Chart */}
                                <div>
                                    <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                                        <TrendingUp className="w-4 h-4" />
                                        Burndown Chart
                                    </h4>
                                    <div className="h-32 bg-gray-50 rounded-md p-4 flex items-end justify-between">
                                        {sprint.burndownData.map((value, index) => (
                                            <div key={index} className="flex flex-col items-center">
                                                <div
                                                    className="w-6 bg-blue-500 rounded-t"
                                                    style={{ height: `${(value / sprint.totalStoryPoints) * 80}px` }}
                                                ></div>
                                                <span className="text-xs text-gray-500 mt-1">D{index + 1}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        );
    };

    const CreateSprintModal = () => (
        // <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="fixed inset-0 bg-[rgba(0,0,0,0.50)] flex items-center justify-center z-50 p-4 overflow-y-auto">
            <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold text-gray-900">Create New Sprint</h2>
                    <button
                        onClick={() => setShowCreateModal(false)}
                        className="text-gray-400 hover:text-gray-600"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Sprint Name</label>
                        <input
                            type="text"
                            value={newSprint.name}
                            onChange={(e) => setNewSprint({ ...newSprint, name: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Enter sprint name"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                        <textarea
                            value={newSprint.description}
                            onChange={(e) => setNewSprint({ ...newSprint, description: e.target.value })}
                            rows={3}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Enter sprint description"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Start Date</label>
                            <input
                                type="date"
                                value={newSprint.startDate}
                                onChange={(e) => setNewSprint({ ...newSprint, startDate: e.target.value })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">End Date</label>
                            <input
                                type="date"
                                value={newSprint.endDate}
                                onChange={(e) => setNewSprint({ ...newSprint, endDate: e.target.value })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Project</label>
                        <select
                            value={newSprint.project}
                            onChange={(e) => setNewSprint({ ...newSprint, project: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        >
                            <option value="">Select Project</option>
                            {projects.map(project => (
                                <option key={project} value={project}>{project}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Total Story Points</label>
                        <input
                            type="number"
                            value={newSprint.totalStoryPoints}
                            onChange={(e) => setNewSprint({ ...newSprint, totalStoryPoints: parseInt(e.target.value) || 0 })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Enter total story points"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Team Members</label>
                        <div className="border border-gray-300 rounded-md p-2 max-h-32 overflow-y-auto">
                            {teamMembers.map(member => (
                                <label key={member} className="flex items-center space-x-2 p-1">
                                    <input
                                        type="checkbox"
                                        checked={newSprint.teamMembers.includes(member)}
                                        onChange={(e) => {
                                            if (e.target.checked) {
                                                setNewSprint({
                                                    ...newSprint,
                                                    teamMembers: [...newSprint.teamMembers, member]
                                                });
                                            } else {
                                                setNewSprint({
                                                    ...newSprint,
                                                    teamMembers: newSprint.teamMembers.filter(m => m !== member)
                                                });
                                            }
                                        }}
                                        className="rounded border-gray-300"
                                    />
                                    <span className="text-sm">{member}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="flex justify-end gap-3 mt-6">
                    <button
                        onClick={() => setShowCreateModal(false)}
                        className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleCreateSprint}
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center gap-2"
                    >
                        <Save className="w-4 h-4" />
                        Create Sprint
                    </button>
                </div>
            </div>
        </div>
    );

    return (
        <div className="">
            <div className="max-w-8xl mx-auto">
                {/* Header */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
                    <div className="p-6">
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900">Sprint Management</h1>
                                <p className="text-gray-600 mt-1">Manage your agile sprints and track progress</p>
                            </div>
                            <button
                                onClick={() => setShowCreateModal(true)}
                                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                            >
                                <Plus className="w-4 h-4" />
                                Create Sprint
                            </button>
                        </div>

                        {/* Stats Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                            <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-4 rounded-lg border border-blue-200">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-blue-600 font-medium">Active Sprints</p>
                                        <p className="text-2xl font-bold text-blue-700">
                                            {sprints.filter(s => s.status === 'active').length}
                                        </p>
                                    </div>
                                    <Activity className="w-8 h-8 text-blue-500" />
                                </div>
                            </div>
                            <div className="bg-gradient-to-r from-green-50 to-green-100 p-4 rounded-lg border border-green-200">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-green-600 font-medium">Completed</p>
                                        <p className="text-2xl font-bold text-green-700">
                                            {sprints.filter(s => s.status === 'completed').length}
                                        </p>
                                    </div>
                                    <CheckCircle2 className="w-8 h-8 text-green-500" />
                                </div>
                            </div>
                            <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 p-4 rounded-lg border border-yellow-200">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-yellow-600 font-medium">Planning</p>
                                        <p className="text-2xl font-bold text-yellow-700">
                                            {sprints.filter(s => s.status === 'planning').length}
                                        </p>
                                    </div>
                                    <Calendar className="w-8 h-8 text-yellow-500" />
                                </div>
                            </div>
                            <div className="bg-gradient-to-r from-purple-50 to-purple-100 p-4 rounded-lg border border-purple-200">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-purple-600 font-medium">Avg Velocity</p>
                                        <p className="text-2xl font-bold text-purple-700">
                                            {(sprints.reduce((acc, s) => acc + s.velocity, 0) / sprints.length).toFixed(1)}
                                        </p>
                                    </div>
                                    <TrendingUp className="w-8 h-8 text-purple-500" />
                                </div>
                            </div>
                        </div>

                        {/* Filters */}
                        <div className="flex items-center gap-4 mb-6">
                            <div className="flex-1">
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                    <input
                                        type="text"
                                        placeholder="Search sprints..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 w-full"
                                    />
                                </div>
                            </div>
                            <select
                                value={filterStatus}
                                onChange={(e) => setFilterStatus(e.target.value)}
                                className="px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                            >
                                <option value="all">All Status</option>
                                <option value="planning">Planning</option>
                                <option value="active">Active</option>
                                <option value="completed">Completed</option>
                                <option value="on_hold">On Hold</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Sprint Cards */}
                <div className="space-y-6">
                    {filteredSprints.length === 0 ? (
                        <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
                            <Target className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">No Sprints Found</h3>
                            <p className="text-gray-600 mb-6">Get started by creating your first sprint</p>
                            <button
                                onClick={() => setShowCreateModal(true)}
                                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                            >
                                Create Your First Sprint
                            </button>
                        </div>
                    ) : (
                        filteredSprints.map(sprint => (
                            <SprintCard key={sprint.id} sprint={sprint} />
                        ))
                    )}
                </div>

                {/* Create Sprint Modal */}
                {showCreateModal && <CreateSprintModal />}

                {/* Edit Sprint Modal (similar structure to create modal) */}
                {showEditModal && (
                    <div className="fixed inset-0 bg-[rgba(0,0,0,0.50)] flex items-center justify-center z-50 p-4 overflow-y-auto">
                        <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-xl font-semibold text-gray-900">Edit Sprint</h2>
                                <button
                                    onClick={() => setShowEditModal(false)}
                                    className="text-gray-400 hover:text-gray-600"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Sprint Name</label>
                                    <input
                                        type="text"
                                        value={editSprint.name || ''}
                                        onChange={(e) => setEditSprint({ ...editSprint, name: e.target.value })}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="Enter sprint name"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                                    <textarea
                                        value={editSprint.description || ''}
                                        onChange={(e) => setEditSprint({ ...editSprint, description: e.target.value })}
                                        rows={3}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="Enter sprint description"
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Start Date</label>
                                        <input
                                            type="date"
                                            value={editSprint.startDate || ''}
                                            onChange={(e) => setEditSprint({ ...editSprint, startDate: e.target.value })}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">End Date</label>
                                        <input
                                            type="date"
                                            value={editSprint.endDate || ''}
                                            onChange={(e) => setEditSprint({ ...editSprint, endDate: e.target.value })}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Project</label>
                                    <select
                                        value={editSprint.project || ''}
                                        onChange={(e) => setEditSprint({ ...editSprint, project: e.target.value })}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                    >
                                        <option value="">Select Project</option>
                                        {projects.map(project => (
                                            <option key={project} value={project}>{project}</option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                                    <select
                                        value={editSprint.status || ''}
                                        onChange={(e) => setEditSprint({ ...editSprint, status: e.target.value })}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                    >
                                        <option value="planning">Planning</option>
                                        <option value="active">Active</option>
                                        <option value="completed">Completed</option>
                                        <option value="on_hold">On Hold</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Total Story Points</label>
                                    <input
                                        type="number"
                                        value={editSprint.totalStoryPoints || 0}
                                        onChange={(e) => setEditSprint({ ...editSprint, totalStoryPoints: parseInt(e.target.value) || 0 })}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="Enter total story points"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Team Members</label>
                                    <div className="border border-gray-300 rounded-md p-2 max-h-32 overflow-y-auto">
                                        {teamMembers.map(member => (
                                            <label key={member} className="flex items-center space-x-2 p-1">
                                                <input
                                                    type="checkbox"
                                                    checked={editSprint.teamMembers?.includes(member) || false}
                                                    onChange={(e) => {
                                                        const currentMembers = editSprint.teamMembers || [];
                                                        if (e.target.checked) {
                                                            setEditSprint({
                                                                ...editSprint,
                                                                teamMembers: [...currentMembers, member]
                                                            });
                                                        } else {
                                                            setEditSprint({
                                                                ...editSprint,
                                                                teamMembers: currentMembers.filter(m => m !== member)
                                                            });
                                                        }
                                                    }}
                                                    className="rounded border-gray-300"
                                                />
                                                <span className="text-sm">{member}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="flex justify-end gap-3 mt-6">
                                <button
                                    onClick={() => setShowEditModal(false)}
                                    className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleEditSprint}
                                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center gap-2"
                                >
                                    <Save className="w-4 h-4" />
                                    Save Changes
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SprintManagement1;