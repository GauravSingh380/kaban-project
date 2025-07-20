import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
    Play,
    Pause,
    Square,
    Plus,
    Edit3,
    Save,
    X,
    Trash2,
    Calendar,
    Clock,
    Target,
    Users,
    CheckCircle2,
    AlertCircle,
    Timer,
    BarChart3,
    TrendingUp,
    Filter,
    Search,
    MoreVertical,
    Flag,
    User,
    Tag,
    ArrowRight,
    Zap,
    Activity,
    ChevronDown,
    ChevronRight,
    FileText,
    GitBranch
} from 'lucide-react';

const SprintManagement2 = () => {
    const [activeView, setActiveView] = useState('board');
    const [selectedSprint, setSelectedSprint] = useState(null);
    const [isCreatingSprint, setIsCreatingSprint] = useState(false);
    const [isEditingSprint, setIsEditingSprint] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [expandedSprints, setExpandedSprints] = useState(new Set());
    const [selectedTasks, setSelectedTasks] = useState(new Set());
    
    // Sprint form data
    const [sprintForm, setSprintForm] = useState({
        name: '',
        goal: '',
        description: '',
        startDate: '',
        endDate: '',
        teamMembers: [],
        priority: 'medium',
        status: 'planned'
    });

    // Mock data - replace with actual API calls
    const [sprints, setSprints] = useState([
        {
            id: 1,
            name: 'Sprint 24.1 - Authentication Overhaul',
            goal: 'Implement OAuth 2.0 and improve security',
            description: 'Complete redesign of authentication system with modern security practices',
            startDate: '2024-02-01',
            endDate: '2024-02-14',
            status: 'active',
            priority: 'high',
            progress: 65,
            teamMembers: [
                { id: 1, name: 'John Doe', avatar: 'JD', role: 'Lead Developer' },
                { id: 2, name: 'Jane Smith', avatar: 'JS', role: 'Backend Developer' },
                { id: 3, name: 'Mike Johnson', avatar: 'MJ', role: 'Frontend Developer' }
            ],
            tasks: [
                { id: 1, title: 'Setup OAuth providers', status: 'completed', assignee: 'John Doe', points: 5 },
                { id: 2, title: 'Implement JWT tokens', status: 'in-progress', assignee: 'Jane Smith', points: 8 },
                { id: 3, title: 'Create login UI', status: 'in-progress', assignee: 'Mike Johnson', points: 3 },
                { id: 4, title: 'Add password reset flow', status: 'todo', assignee: 'John Doe', points: 5 },
                { id: 5, title: 'Security testing', status: 'todo', assignee: 'Jane Smith', points: 8 }
            ],
            totalPoints: 29,
            completedPoints: 5,
            velocity: 23,
            burndown: [
                { day: 1, remaining: 29 },
                { day: 2, remaining: 26 },
                { day: 3, remaining: 24 },
                { day: 4, remaining: 21 },
                { day: 5, remaining: 18 },
                { day: 6, remaining: 15 },
                { day: 7, remaining: 12 }
            ]
        },
        {
            id: 2,
            name: 'Sprint 24.2 - Dashboard Analytics',
            goal: 'Build comprehensive analytics dashboard',
            description: 'Create interactive charts and reports for better insights',
            startDate: '2024-02-15',
            endDate: '2024-02-28',
            status: 'planned',
            priority: 'medium',
            progress: 0,
            teamMembers: [
                { id: 4, name: 'Sarah Wilson', avatar: 'SW', role: 'Data Engineer' },
                { id: 5, name: 'Tom Brown', avatar: 'TB', role: 'UI/UX Designer' }
            ],
            tasks: [
                { id: 6, title: 'Design analytics mockups', status: 'todo', assignee: 'Tom Brown', points: 5 },
                { id: 7, title: 'Setup data pipeline', status: 'todo', assignee: 'Sarah Wilson', points: 13 },
                { id: 8, title: 'Build chart components', status: 'todo', assignee: 'Mike Johnson', points: 8 },
                { id: 9, title: 'Implement real-time updates', status: 'todo', assignee: 'Sarah Wilson', points: 8 }
            ],
            totalPoints: 34,
            completedPoints: 0,
            velocity: 0,
            burndown: []
        },
        {
            id: 3,
            name: 'Sprint 23.12 - Mobile Optimization',
            goal: 'Optimize app for mobile devices',
            description: 'Improve mobile responsiveness and performance',
            startDate: '2024-01-15',
            endDate: '2024-01-28',
            status: 'completed',
            priority: 'high',
            progress: 100,
            teamMembers: [
                { id: 3, name: 'Mike Johnson', avatar: 'MJ', role: 'Frontend Developer' },
                { id: 5, name: 'Tom Brown', avatar: 'TB', role: 'UI/UX Designer' }
            ],
            tasks: [
                { id: 10, title: 'Mobile UI redesign', status: 'completed', assignee: 'Tom Brown', points: 8 },
                { id: 11, title: 'Touch gestures', status: 'completed', assignee: 'Mike Johnson', points: 5 },
                { id: 12, title: 'Performance optimization', status: 'completed', assignee: 'Mike Johnson', points: 8 },
                { id: 13, title: 'Cross-device testing', status: 'completed', assignee: 'Tom Brown', points: 3 }
            ],
            totalPoints: 24,
            completedPoints: 24,
            velocity: 24,
            burndown: []
        }
    ]);

    const [teamMembers] = useState([
        { id: 1, name: 'John Doe', avatar: 'JD', role: 'Lead Developer', email: 'john@example.com' },
        { id: 2, name: 'Jane Smith', avatar: 'JS', role: 'Backend Developer', email: 'jane@example.com' },
        { id: 3, name: 'Mike Johnson', avatar: 'MJ', role: 'Frontend Developer', email: 'mike@example.com' },
        { id: 4, name: 'Sarah Wilson', avatar: 'SW', role: 'Data Engineer', email: 'sarah@example.com' },
        { id: 5, name: 'Tom Brown', avatar: 'TB', role: 'UI/UX Designer', email: 'tom@example.com' }
    ]);

    const getStatusColor = (status) => {
        switch (status) {
            case 'active': return 'bg-green-100 text-green-700 border-green-200';
            case 'planned': return 'bg-blue-100 text-blue-700 border-blue-200';
            case 'completed': return 'bg-purple-100 text-purple-700 border-purple-200';
            case 'cancelled': return 'bg-red-100 text-red-700 border-red-200';
            default: return 'bg-gray-100 text-gray-700 border-gray-200';
        }
    };

    const getPriorityColor = (priority) => {
        switch (priority) {
            case 'high': return 'text-red-600';
            case 'medium': return 'text-yellow-600';
            case 'low': return 'text-green-600';
            default: return 'text-gray-600';
        }
    };

    const getTaskStatusColor = (status) => {
        switch (status) {
            case 'completed': return 'bg-green-100 text-green-700 border-green-200';
            case 'in-progress': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
            case 'todo': return 'bg-gray-100 text-gray-700 border-gray-200';
            default: return 'bg-gray-100 text-gray-700 border-gray-200';
        }
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
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
        setSprintForm({
            name: '',
            goal: '',
            description: '',
            startDate: '',
            endDate: '',
            teamMembers: [],
            priority: 'medium',
            status: 'planned'
        });
        setIsCreatingSprint(true);
    };

    const handleEditSprint = (sprint) => {
        setSprintForm({
            ...sprint,
            teamMembers: sprint.teamMembers.map(member => member.id)
        });
        setSelectedSprint(sprint);
        setIsEditingSprint(true);
    };

    const handleSaveSprint = () => {
        const newSprint = {
            id: selectedSprint?.id || Date.now(),
            ...sprintForm,
            teamMembers: teamMembers.filter(member => sprintForm.teamMembers.includes(member.id)),
            progress: selectedSprint?.progress || 0,
            tasks: selectedSprint?.tasks || [],
            totalPoints: selectedSprint?.totalPoints || 0,
            completedPoints: selectedSprint?.completedPoints || 0,
            velocity: selectedSprint?.velocity || 0,
            burndown: selectedSprint?.burndown || []
        };

        if (isEditingSprint) {
            setSprints(prevSprints => 
                prevSprints.map(sprint => 
                    sprint.id === selectedSprint.id ? newSprint : sprint
                )
            );
        } else {
            setSprints(prevSprints => [...prevSprints, newSprint]);
        }

        setIsCreatingSprint(false);
        setIsEditingSprint(false);
        setSelectedSprint(null);
    };

    const handleDeleteSprint = (sprintId) => {
        if (window.confirm('Are you sure you want to delete this sprint?')) {
            setSprints(prevSprints => prevSprints.filter(sprint => sprint.id !== sprintId));
        }
    };

    const handleStartSprint = (sprintId) => {
        setSprints(prevSprints =>
            prevSprints.map(sprint =>
                sprint.id === sprintId
                    ? { ...sprint, status: 'active', startDate: new Date().toISOString().split('T')[0] }
                    : sprint
            )
        );
    };

    const handleCompleteSprint = (sprintId) => {
        setSprints(prevSprints =>
            prevSprints.map(sprint =>
                sprint.id === sprintId
                    ? { ...sprint, status: 'completed', progress: 100 }
                    : sprint
            )
        );
    };

    const toggleSprintExpansion = (sprintId) => {
        setExpandedSprints(prev => {
            const newSet = new Set(prev);
            if (newSet.has(sprintId)) {
                newSet.delete(sprintId);
            } else {
                newSet.add(sprintId);
            }
            return newSet;
        });
    };

    const filteredSprints = sprints.filter(sprint => {
        const matchesSearch = sprint.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            sprint.goal.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === 'all' || sprint.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    const views = [
        { id: 'board', label: 'Sprint Board', icon: Target },
        { id: 'timeline', label: 'Timeline', icon: Calendar },
        { id: 'analytics', label: 'Analytics', icon: BarChart3 }
    ];

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                <div className="p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h1 className="text-2xl font-bold text-gray-900">Sprint Management</h1>
                        <button
                            onClick={handleCreateSprint}
                            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            <Plus className="w-4 h-4" />
                            Create Sprint
                        </button>
                    </div>

                    {/* View Tabs */}
                    <div className="border-b border-gray-200">
                        <nav className="flex space-x-8">
                            {views.map((view) => {
                                const Icon = view.icon;
                                return (
                                    <button
                                        key={view.id}
                                        onClick={() => setActiveView(view.id)}
                                        className={`flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm ${
                                            activeView === view.id
                                                ? 'border-blue-500 text-blue-600'
                                                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                        }`}
                                    >
                                        <Icon className="w-4 h-4" />
                                        {view.label}
                                    </button>
                                );
                            })}
                        </nav>
                    </div>
                </div>
            </div>

            {/* Filters */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                <div className="flex items-center gap-4">
                    <div className="flex-1">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                            <input
                                type="text"
                                placeholder="Search sprints..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                    </div>
                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    >
                        <option value="all">All Status</option>
                        <option value="planned">Planned</option>
                        <option value="active">Active</option>
                        <option value="completed">Completed</option>
                        <option value="cancelled">Cancelled</option>
                    </select>
                </div>
            </div>

            {/* Main Content */}
            {activeView === 'board' && (
                <div className="space-y-4">
                    {filteredSprints.map((sprint) => (
                        <div key={sprint.id} className="bg-white rounded-lg shadow-sm border border-gray-200">
                            {/* Sprint Header */}
                            <div className="p-6 border-b border-gray-200">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <button
                                            onClick={() => toggleSprintExpansion(sprint.id)}
                                            className="p-1 hover:bg-gray-100 rounded"
                                        >
                                            {expandedSprints.has(sprint.id) ? (
                                                <ChevronDown className="w-5 h-5 text-gray-500" />
                                            ) : (
                                                <ChevronRight className="w-5 h-5 text-gray-500" />
                                            )}
                                        </button>
                                        
                                        <div>
                                            <div className="flex items-center gap-3 mb-1">
                                                <h3 className="text-lg font-semibold text-gray-900">{sprint.name}</h3>
                                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(sprint.status)}`}>
                                                    {sprint.status === 'active' && <Play className="w-3 h-3 mr-1" />}
                                                    {sprint.status === 'completed' && <CheckCircle2 className="w-3 h-3 mr-1" />}
                                                    {sprint.status === 'planned' && <Clock className="w-3 h-3 mr-1" />}
                                                    {sprint.status.charAt(0).toUpperCase() + sprint.status.slice(1)}
                                                </span>
                                                <Flag className={`w-4 h-4 ${getPriorityColor(sprint.priority)}`} />
                                            </div>
                                            <p className="text-gray-600 text-sm font-medium">{sprint.goal}</p>
                                            <p className="text-gray-500 text-sm">{sprint.description}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-4">
                                        <div className="text-right">
                                            <div className="text-sm text-gray-500">
                                                {formatDate(sprint.startDate)} - {formatDate(sprint.endDate)}
                                            </div>
                                            <div className="text-sm font-medium text-gray-900">
                                                {getDaysRemaining(sprint.endDate) > 0 
                                                    ? `${getDaysRemaining(sprint.endDate)} days left`
                                                    : 'Overdue'
                                                }
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-2">
                                            {sprint.status === 'planned' && (
                                                <button
                                                    onClick={() => handleStartSprint(sprint.id)}
                                                    className="p-2 text-green-600 hover:bg-green-50 rounded-md transition-colors"
                                                    title="Start Sprint"
                                                >
                                                    <Play className="w-4 h-4" />
                                                </button>
                                            )}
                                            {sprint.status === 'active' && (
                                                <button
                                                    onClick={() => handleCompleteSprint(sprint.id)}
                                                    className="p-2 text-purple-600 hover:bg-purple-50 rounded-md transition-colors"
                                                    title="Complete Sprint"
                                                >
                                                    <Square className="w-4 h-4" />
                                                </button>
                                            )}
                                            <button
                                                onClick={() => handleEditSprint(sprint)}
                                                className="p-2 text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                                                title="Edit Sprint"
                                            >
                                                <Edit3 className="w-4 h-4" />
                                            </button>
                                            <button
                                                onClick={() => handleDeleteSprint(sprint.id)}
                                                className="p-2 text-red-600 hover:bg-red-50 rounded-md transition-colors"
                                                title="Delete Sprint"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                {/* Sprint Stats */}
                                <div className="mt-4 grid grid-cols-1 md:grid-cols-5 gap-4">
                                    <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="text-xs text-blue-600 font-medium">Progress</p>
                                                <p className="text-lg font-bold text-blue-700">{sprint.progress}%</p>
                                            </div>
                                            <TrendingUp className="w-5 h-5 text-blue-500" />
                                        </div>
                                        <div className="mt-2 bg-blue-200 rounded-full h-2">
                                            <div
                                                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                                                style={{ width: `${sprint.progress}%` }}
                                            ></div>
                                        </div>
                                    </div>
                                    
                                    <div className="bg-green-50 p-3 rounded-lg border border-green-200">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="text-xs text-green-600 font-medium">Story Points</p>
                                                <p className="text-lg font-bold text-green-700">{sprint.completedPoints}/{sprint.totalPoints}</p>
                                            </div>
                                            <Target className="w-5 h-5 text-green-500" />
                                        </div>
                                    </div>

                                    <div className="bg-purple-50 p-3 rounded-lg border border-purple-200">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="text-xs text-purple-600 font-medium">Tasks</p>
                                                <p className="text-lg font-bold text-purple-700">
                                                    {sprint.tasks.filter(t => t.status === 'completed').length}/{sprint.tasks.length}
                                                </p>
                                            </div>
                                            <CheckCircle2 className="w-5 h-5 text-purple-500" />
                                        </div>
                                    </div>

                                    <div className="bg-yellow-50 p-3 rounded-lg border border-yellow-200">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="text-xs text-yellow-600 font-medium">Team Size</p>
                                                <p className="text-lg font-bold text-yellow-700">{sprint.teamMembers.length}</p>
                                            </div>
                                            <Users className="w-5 h-5 text-yellow-500" />
                                        </div>
                                    </div>

                                    <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="text-xs text-gray-600 font-medium">Velocity</p>
                                                <p className="text-lg font-bold text-gray-700">{sprint.velocity}</p>
                                            </div>
                                            <Zap className="w-5 h-5 text-gray-500" />
                                        </div>
                                    </div>
                                </div>

                                {/* Team Members */}
                                <div className="mt-4">
                                    <div className="flex items-center gap-2">
                                        <span className="text-sm font-medium text-gray-700">Team:</span>
                                        <div className="flex -space-x-2">
                                            {sprint.teamMembers.map((member, index) => (
                                                <div
                                                    key={member.id}
                                                    className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-white text-xs flex items-center justify-center font-medium border-2 border-white shadow-sm"
                                                    title={`${member.name} - ${member.role}`}
                                                    style={{ zIndex: sprint.teamMembers.length - index }}
                                                >
                                                    {member.avatar}
                                                </div>
                                            ))}
                                        </div>
                                        {sprint.teamMembers.map((member, index) => (
                                            <span key={member.id} className="text-xs text-gray-500">
                                                {index > 0 && ', '}{member.name}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Sprint Tasks (Expandable) */}
                            {expandedSprints.has(sprint.id) && (
                                <div className="p-6">
                                    <div className="flex items-center justify-between mb-4">
                                        <h4 className="text-lg font-semibold text-gray-900">Sprint Backlog</h4>
                                        <button className="flex items-center gap-2 px-3 py-1 text-blue-600 hover:bg-blue-50 rounded-md transition-colors">
                                            <Plus className="w-4 h-4" />
                                            Add Task
                                        </button>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        {/* TODO Column */}
                                        <div className="bg-gray-50 rounded-lg p-4">
                                            <div className="flex items-center justify-between mb-3">
                                                <h5 className="font-medium text-gray-700">To Do</h5>
                                                <span className="bg-gray-200 text-gray-600 text-xs px-2 py-1 rounded-full">
                                                    {sprint.tasks.filter(t => t.status === 'todo').length}
                                                </span>
                                            </div>
                                            <div className="space-y-2">
                                                {sprint.tasks.filter(task => task.status === 'todo').map(task => (
                                                    <div key={task.id} className="bg-white p-3 rounded-md border border-gray-200 hover:shadow-sm transition-shadow">
                                                        <div className="flex items-start justify-between mb-2">
                                                            <h6 className="font-medium text-gray-900 text-sm">{task.title}</h6>
                                                            <span className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full font-medium">
                                                                {task.points}
                                                            </span>
                                                        </div>
                                                        <div className="flex items-center gap-2">
                                                            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-white text-xs flex items-center justify-center font-medium">
                                                                {task.assignee.split(' ').map(word => word[0]).join('')}
                                                            </div>
                                                            <span className="text-xs text-gray-500">{task.assignee}</span>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        {/* IN PROGRESS Column */}
                                        <div className="bg-yellow-50 rounded-lg p-4">
                                            <div className="flex items-center justify-between mb-3">
                                                <h5 className="font-medium text-gray-700">In Progress</h5>
                                                <span className="bg-yellow-200 text-yellow-600 text-xs px-2 py-1 rounded-full">
                                                    {sprint.tasks.filter(t => t.status === 'in-progress').length}
                                                </span>
                                            </div>
                                            <div className="space-y-2">
                                                {sprint.tasks.filter(task => task.status === 'in-progress').map(task => (
                                                    <div key={task.id} className="bg-white p-3 rounded-md border border-yellow-200 hover:shadow-sm transition-shadow">
                                                        <div className="flex items-start justify-between mb-2">
                                                            <h6 className="font-medium text-gray-900 text-sm">{task.title}</h6>
                                                            <span className="bg-yellow-100 text-yellow-700 text-xs px-2 py-1 rounded-full font-medium">
                                                                {task.points}
                                                            </span>
                                                        </div>
                                                        <div className="flex items-center gap-2">
                                                            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-yellow-500 to-orange-600 text-white text-xs flex items-center justify-center font-medium">
                                                                {task.assignee.split(' ').map(word => word[0]).join('')}
                                                            </div>
                                                            <span className="text-xs text-gray-500">{task.assignee}</span>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        {/* COMPLETED Column - Continuation */}
                                        <div className="bg-green-50 rounded-lg p-4">
                                            <div className="flex items-center justify-between mb-3">
                                                <h5 className="font-medium text-gray-700">Completed</h5>
                                                <span className="bg-green-200 text-green-600 text-xs px-2 py-1 rounded-full">
                                                    {sprint.tasks.filter(t => t.status === 'completed').length}
                                                </span>
                                            </div>
                                            <div className="space-y-2">
                                                {sprint.tasks.filter(task => task.status === 'completed').map(task => (
                                                    <div key={task.id} className="bg-white p-3 rounded-md border border-green-200 hover:shadow-sm transition-shadow">
                                                        <div className="flex items-start justify-between mb-2">
                                                            <h6 className="font-medium text-gray-900 text-sm line-through opacity-75">{task.title}</h6>
                                                            <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full font-medium">
                                                                {task.points}
                                                            </span>
                                                        </div>
                                                        <div className="flex items-center gap-2">
                                                            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 text-white text-xs flex items-center justify-center font-medium">
                                                                {task.assignee.split(' ').map(word => word[0]).join('')}
                                                            </div>
                                                            <span className="text-xs text-gray-500">{task.assignee}</span>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}

                    {filteredSprints.length === 0 && (
                        <div className="text-center py-12 bg-white rounded-lg shadow-sm border border-gray-200">
                            <Target className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                            <h3 className="text-lg font-medium text-gray-900 mb-2">No sprints found</h3>
                            <p className="text-gray-500 mb-4">
                                {searchTerm || statusFilter !== 'all'
                                    ? 'Try adjusting your search or filters'
                                    : 'Create your first sprint to get started'
                                }
                            </p>
                            {!searchTerm && statusFilter === 'all' && (
                                <button
                                    onClick={handleCreateSprint}
                                    className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                                >
                                    <Plus className="w-4 h-4" />
                                    Create Sprint
                                </button>
                            )}
                        </div>
                    )}
                </div>
            )}

            {/* Timeline View */}
            {activeView === 'timeline' && (
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-6">Sprint Timeline</h3>
                    <div className="space-y-6">
                        {filteredSprints
                            .sort((a, b) => new Date(a.startDate) - new Date(b.startDate))
                            .map((sprint, index) => (
                                <div key={sprint.id} className="relative">
                                    {index !== filteredSprints.length - 1 && (
                                        <div className="absolute left-4 top-8 w-0.5 h-16 bg-gray-200"></div>
                                    )}
                                    <div className="flex items-start gap-4">
                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-medium ${
                                            sprint.status === 'active' ? 'bg-green-500' :
                                            sprint.status === 'completed' ? 'bg-purple-500' :
                                            sprint.status === 'planned' ? 'bg-blue-500' : 'bg-gray-500'
                                        }`}>
                                            {sprint.status === 'active' && <Play className="w-4 h-4" />}
                                            {sprint.status === 'completed' && <CheckCircle2 className="w-4 h-4" />}
                                            {sprint.status === 'planned' && <Clock className="w-4 h-4" />}
                                            {!['active', 'completed', 'planned'].includes(sprint.status) && (
                                                <span>{index + 1}</span>
                                            )}
                                        </div>
                                        <div className="flex-1 bg-gray-50 rounded-lg p-4 border border-gray-200">
                                            <div className="flex items-center justify-between mb-2">
                                                <h4 className="font-semibold text-gray-900">{sprint.name}</h4>
                                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(sprint.status)}`}>
                                                    {sprint.status.charAt(0).toUpperCase() + sprint.status.slice(1)}
                                                </span>
                                            </div>
                                            <p className="text-gray-600 text-sm mb-3">{sprint.goal}</p>
                                            <div className="flex items-center justify-between text-sm">
                                                <div className="flex items-center gap-4">
                                                    <span className="text-gray-500">
                                                        {formatDate(sprint.startDate)} - {formatDate(sprint.endDate)}
                                                    </span>
                                                    <span className="text-gray-500">
                                                        {sprint.teamMembers.length} team members
                                                    </span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <div className="bg-blue-200 rounded-full h-2 w-16">
                                                        <div
                                                            className="bg-blue-600 h-2 rounded-full"
                                                            style={{ width: `${sprint.progress}%` }}
                                                        ></div>
                                                    </div>
                                                    <span className="text-gray-600 font-medium">{sprint.progress}%</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                    </div>
                </div>
            )}

            {/* Analytics View */}
            {activeView === 'analytics' && (
                <div className="space-y-6">
                    {/* Summary Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-600">Total Sprints</p>
                                    <p className="text-2xl font-bold text-gray-900">{sprints.length}</p>
                                </div>
                                <GitBranch className="w-8 h-8 text-blue-500" />
                            </div>
                        </div>
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-600">Active Sprints</p>
                                    <p className="text-2xl font-bold text-green-600">
                                        {sprints.filter(s => s.status === 'active').length}
                                    </p>
                                </div>
                                <Activity className="w-8 h-8 text-green-500" />
                            </div>
                        </div>
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-600">Completed Sprints</p>
                                    <p className="text-2xl font-bold text-purple-600">
                                        {sprints.filter(s => s.status === 'completed').length}
                                    </p>
                                </div>
                                <CheckCircle2 className="w-8 h-8 text-purple-500" />
                            </div>
                        </div>
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-600">Avg Velocity</p>
                                    <p className="text-2xl font-bold text-yellow-600">
                                        {Math.round(sprints.reduce((sum, s) => sum + s.velocity, 0) / sprints.length || 0)}
                                    </p>
                                </div>
                                <TrendingUp className="w-8 h-8 text-yellow-500" />
                            </div>
                        </div>
                    </div>

                    {/* Charts */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Sprint Status Distribution</h3>
                            <div className="space-y-3">
                                {['planned', 'active', 'completed', 'cancelled'].map(status => {
                                    const count = sprints.filter(s => s.status === status).length;
                                    const percentage = (count / sprints.length) * 100 || 0;
                                    return (
                                        <div key={status} className="flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <div className={`w-3 h-3 rounded-full ${
                                                    status === 'active' ? 'bg-green-500' :
                                                    status === 'planned' ? 'bg-blue-500' :
                                                    status === 'completed' ? 'bg-purple-500' : 'bg-red-500'
                                                }`}></div>
                                                <span className="text-sm text-gray-700 capitalize">{status}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <div className="w-16 bg-gray-200 rounded-full h-2">
                                                    <div
                                                        className={`h-2 rounded-full ${
                                                            status === 'active' ? 'bg-green-500' :
                                                            status === 'planned' ? 'bg-blue-500' :
                                                            status === 'completed' ? 'bg-purple-500' : 'bg-red-500'
                                                        }`}
                                                        style={{ width: `${percentage}%` }}
                                                    ></div>
                                                </div>
                                                <span className="text-sm font-medium text-gray-900 w-8">{count}</span>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Team Performance</h3>
                            <div className="space-y-4">
                                {teamMembers.map(member => {
                                    const memberSprints = sprints.filter(s => 
                                        s.teamMembers.some(tm => tm.id === member.id)
                                    );
                                    const completedTasks = sprints
                                        .flatMap(s => s.tasks)
                                        .filter(t => t.assignee === member.name && t.status === 'completed').length;
                                    
                                    return (
                                        <div key={member.id} className="flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-white text-xs flex items-center justify-center font-medium">
                                                    {member.avatar}
                                                </div>
                                                <div>
                                                    <p className="text-sm font-medium text-gray-900">{member.name}</p>
                                                    <p className="text-xs text-gray-500">{member.role}</p>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-sm font-medium text-gray-900">{completedTasks} tasks</p>
                                                <p className="text-xs text-gray-500">{memberSprints.length} sprints</p>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Create/Edit Sprint Modal */}
            {(isCreatingSprint || isEditingSprint) && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="p-6 border-b border-gray-200">
                            <h2 className="text-xl font-bold text-gray-900">
                                {isCreatingSprint ? 'Create New Sprint' : 'Edit Sprint'}
                            </h2>
                        </div>
                        
                        <div className="p-6 space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Sprint Name</label>
                                <input
                                    type="text"
                                    value={sprintForm.name}
                                    onChange={(e) => setSprintForm({...sprintForm, name: e.target.value})}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="Enter sprint name..."
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Sprint Goal</label>
                                <input
                                    type="text"
                                    value={sprintForm.goal}
                                    onChange={(e) => setSprintForm({...sprintForm, goal: e.target.value})}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="Enter sprint goal..."
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                                <textarea
                                    value={sprintForm.description}
                                    onChange={(e) => setSprintForm({...sprintForm, description: e.target.value})}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                    rows={3}
                                    placeholder="Enter sprint description..."
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Start Date</label>
                                    <input
                                        type="date"
                                        value={sprintForm.startDate}
                                        onChange={(e) => setSprintForm({...sprintForm, startDate: e.target.value})}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">End Date</label>
                                    <input
                                        type="date"
                                        value={sprintForm.endDate}
                                        onChange={(e) => setSprintForm({...sprintForm, endDate: e.target.value})}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
                                    <select
                                        value={sprintForm.priority}
                                        onChange={(e) => setSprintForm({...sprintForm, priority: e.target.value})}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                    >
                                        <option value="low">Low</option>
                                        <option value="medium">Medium</option>
                                        <option value="high">High</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                                    <select
                                        value={sprintForm.status}
                                        onChange={(e) => setSprintForm({...sprintForm, status: e.target.value})}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                    >
                                        <option value="planned">Planned</option>
                                        <option value="active">Active</option>
                                        <option value="completed">Completed</option>
                                        <option value="cancelled">Cancelled</option>
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Team Members</label>
                                <div className="space-y-2 max-h-48 overflow-y-auto border border-gray-300 rounded-md p-3">
                                    {teamMembers.map(member => (
                                        <label key={member.id} className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 p-2 rounded">
                                            <input
                                                type="checkbox"
                                                checked={sprintForm.teamMembers.includes(member.id)}
                                                onChange={(e) => {
                                                    if (e.target.checked) {
                                                        setSprintForm({
                                                            ...sprintForm,
                                                            teamMembers: [...sprintForm.teamMembers, member.id]
                                                        });
                                                    } else {
                                                        setSprintForm({
                                                            ...sprintForm,
                                                            teamMembers: sprintForm.teamMembers.filter(id => id !== member.id)
                                                        });
                                                    }
                                                }}
                                                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                            />
                                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-white text-xs flex items-center justify-center font-medium">
                                                {member.avatar}
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium text-gray-900">{member.name}</p>
                                                <p className="text-xs text-gray-500">{member.role}</p>
                                            </div>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="p-6 border-t border-gray-200 flex justify-end gap-3">
                            <button
                                onClick={() => {
                                    setIsCreatingSprint(false);
                                    setIsEditingSprint(false);
                                    setSelectedSprint(null);
                                }}
                                className="px-4 py-2 text-gray-700 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSaveSprint}
                                disabled={!sprintForm.name || !sprintForm.goal}
                                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                                <Save className="w-4 h-4 inline-block mr-2" />
                                {isCreatingSprint ? 'Create Sprint' : 'Save Changes'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SprintManagement2;