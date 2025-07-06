import React, { useState, useMemo } from 'react';
import {
    Search, Filter, Plus, Download, Upload, MoreHorizontal, Eye, Edit, Trash2,
    Users, Calendar, DollarSign, Target, TrendingUp, AlertTriangle, CheckCircle,
    Clock, Folder, ChevronRight, ChevronDown, Settings, Activity, Bug, Star,
    Grid, List, SortAsc, SortDesc, X
} from 'lucide-react';

const ProjectsContent2 = ({ user }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [showFilters, setShowFilters] = useState(false);
    const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
    const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'asc' });
    const [filters, setFilters] = useState({
        status: '',
        priority: '',
        lead: '',
        health: ''
    });

    // Mock projects data - replace with real data from your API
    const projects = [
        {
            id: 1,
            name: 'E-commerce Platform',
            description: 'Complete overhaul of the existing e-commerce platform with modern tech stack',
            status: 'active',
            progress: 75,
            priority: 'high',
            startDate: '2024-01-15',
            endDate: '2024-12-31',
            teamSize: 8,
            budget: 150000,
            spent: 112500,
            lead: 'John Smith',
            leadAvatar: '/api/placeholder/32/32',
            totalTasks: 45,
            completedTasks: 34,
            openBugs: 12,
            closedBugs: 28,
            lastActivity: '2 hours ago',
            health: 'good',
            technologies: ['React', 'Node.js', 'MongoDB', 'AWS'],
            milestones: { completed: 3, total: 5 },
            team: [
                { name: 'John Smith', role: 'Lead Developer', avatar: '/api/placeholder/24/24' },
                { name: 'Sarah Wilson', role: 'Frontend Developer', avatar: '/api/placeholder/24/24' },
                { name: 'Mike Johnson', role: 'Backend Developer', avatar: '/api/placeholder/24/24' },
                { name: 'Lisa Chen', role: 'UI/UX Designer', avatar: '/api/placeholder/24/24' }
            ],
            recentActivity: [
                { action: 'Task completed', user: 'John Smith', time: '2 hours ago' },
                { action: 'Bug fixed', user: 'Sarah Wilson', time: '4 hours ago' },
                { action: 'Milestone reached', user: 'Team', time: '1 day ago' }
            ]
        },
        {
            id: 2,
            name: 'Mobile Banking App',
            description: 'Secure mobile banking application with biometric authentication',
            status: 'active',
            progress: 45,
            priority: 'critical',
            startDate: '2024-02-01',
            endDate: '2024-10-15',
            teamSize: 12,
            budget: 200000,
            spent: 90000,
            lead: 'Sarah Johnson',
            leadAvatar: '/api/placeholder/32/32',
            totalTasks: 67,
            completedTasks: 30,
            openBugs: 8,
            closedBugs: 15,
            lastActivity: '30 minutes ago',
            health: 'at-risk',
            technologies: ['Flutter', 'Firebase', 'REST API', 'Docker'],
            milestones: { completed: 2, total: 6 },
            team: [
                { name: 'Sarah Johnson', role: 'Project Manager', avatar: '/api/placeholder/24/24' },
                { name: 'David Brown', role: 'Mobile Developer', avatar: '/api/placeholder/24/24' },
                { name: 'Emma Davis', role: 'Security Engineer', avatar: '/api/placeholder/24/24' },
                { name: 'Tom Wilson', role: 'QA Engineer', avatar: '/api/placeholder/24/24' }
            ],
            recentActivity: [
                { action: 'Security review completed', user: 'Emma Davis', time: '30 minutes ago' },
                { action: 'Feature deployed', user: 'David Brown', time: '2 hours ago' },
                { action: 'Bug reported', user: 'Tom Wilson', time: '3 hours ago' }
            ]
        },
        {
            id: 3,
            name: 'CRM Dashboard',
            description: 'Customer relationship management dashboard with analytics',
            status: 'completed',
            progress: 100,
            priority: 'medium',
            startDate: '2023-11-01',
            endDate: '2024-03-30',
            teamSize: 5,
            budget: 80000,
            spent: 75000,
            lead: 'Mike Chen',
            leadAvatar: '/api/placeholder/32/32',
            totalTasks: 32,
            completedTasks: 32,
            openBugs: 0,
            closedBugs: 18,
            lastActivity: '3 days ago',
            health: 'excellent',
            technologies: ['Vue.js', 'Laravel', 'MySQL', 'Redis'],
            milestones: { completed: 4, total: 4 },
            team: [
                { name: 'Mike Chen', role: 'Full Stack Developer', avatar: '/api/placeholder/24/24' },
                { name: 'Anna Rodriguez', role: 'Data Analyst', avatar: '/api/placeholder/24/24' },
                { name: 'James Park', role: 'DevOps Engineer', avatar: '/api/placeholder/24/24' }
            ],
            recentActivity: [
                { action: 'Project completed', user: 'Mike Chen', time: '3 days ago' },
                { action: 'Final deployment', user: 'James Park', time: '3 days ago' },
                { action: 'Documentation updated', user: 'Anna Rodriguez', time: '4 days ago' }
            ]
        },
        {
            id: 4,
            name: 'AI Analytics Tool',
            description: 'Machine learning powered analytics tool for business intelligence',
            status: 'planning',
            progress: 15,
            priority: 'medium',
            startDate: '2024-03-01',
            endDate: '2024-11-30',
            teamSize: 6,
            budget: 120000,
            spent: 18000,
            lead: 'Emma Davis',
            leadAvatar: '/api/placeholder/32/32',
            totalTasks: 23,
            completedTasks: 3,
            openBugs: 2,
            closedBugs: 1,
            lastActivity: '1 day ago',
            health: 'good',
            technologies: ['Python', 'TensorFlow', 'PostgreSQL', 'Kubernetes'],
            milestones: { completed: 0, total: 4 },
            team: [
                { name: 'Emma Davis', role: 'Data Scientist', avatar: '/api/placeholder/24/24' },
                { name: 'Robert Kim', role: 'ML Engineer', avatar: '/api/placeholder/24/24' },
                { name: 'Sophie Turner', role: 'Backend Developer', avatar: '/api/placeholder/24/24' }
            ],
            recentActivity: [
                { action: 'Requirements gathered', user: 'Emma Davis', time: '1 day ago' },
                { action: 'Architecture designed', user: 'Robert Kim', time: '2 days ago' },
                { action: 'Environment setup', user: 'Sophie Turner', time: '3 days ago' }
            ]
        },
        {
            id: 5,
            name: 'Security Audit Platform',
            description: 'Comprehensive security audit and vulnerability assessment platform',
            status: 'on-hold',
            progress: 30,
            priority: 'low',
            startDate: '2024-01-10',
            endDate: '2024-08-15',
            teamSize: 4,
            budget: 60000,
            spent: 18000,
            lead: 'Alex Rodriguez',
            leadAvatar: '/api/placeholder/32/32',
            totalTasks: 28,
            completedTasks: 8,
            openBugs: 5,
            closedBugs: 3,
            lastActivity: '1 week ago',
            health: 'needs-attention',
            technologies: ['Java', 'Spring Boot', 'Docker', 'Jenkins'],
            milestones: { completed: 1, total: 3 },
            team: [
                { name: 'Alex Rodriguez', role: 'Security Engineer', avatar: '/api/placeholder/24/24' },
                { name: 'Maria Garcia', role: 'Penetration Tester', avatar: '/api/placeholder/24/24' },
                { name: 'Chris Lee', role: 'DevSecOps', avatar: '/api/placeholder/24/24' }
            ],
            recentActivity: [
                { action: 'Project paused', user: 'Alex Rodriguez', time: '1 week ago' },
                { action: 'Security scan completed', user: 'Maria Garcia', time: '2 weeks ago' },
                { action: 'Infrastructure updated', user: 'Chris Lee', time: '2 weeks ago' }
            ]
        }
    ];

    // Filter options
    const filterOptions = {
        statuses: [...new Set(projects.map(p => p.status))],
        priorities: [...new Set(projects.map(p => p.priority))],
        leads: [...new Set(projects.map(p => p.lead))],
        healths: [...new Set(projects.map(p => p.health))]
    };

    // Filtering and sorting logic
    const filteredProjects = useMemo(() => {
        let filtered = projects;

        // Search filter
        if (searchTerm) {
            filtered = filtered.filter(project =>
                project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                project.lead.toLowerCase().includes(searchTerm.toLowerCase()) ||
                project.technologies.some(tech => tech.toLowerCase().includes(searchTerm.toLowerCase()))
            );
        }

        // Advanced filters
        if (filters.status) {
            filtered = filtered.filter(project => project.status === filters.status);
        }
        if (filters.priority) {
            filtered = filtered.filter(project => project.priority === filters.priority);
        }
        if (filters.lead) {
            filtered = filtered.filter(project => project.lead === filters.lead);
        }
        if (filters.health) {
            filtered = filtered.filter(project => project.health === filters.health);
        }

        // Sorting
        filtered.sort((a, b) => {
            let aValue = a[sortConfig.key];
            let bValue = b[sortConfig.key];

            if (sortConfig.key === 'startDate' || sortConfig.key === 'endDate') {
                aValue = new Date(aValue);
                bValue = new Date(bValue);
            }

            if (sortConfig.direction === 'asc') {
                return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
            } else {
                return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
            }
        });

        return filtered;
    }, [searchTerm, filters, sortConfig]);

    // Helper functions
    const getStatusColor = (status) => {
        const colors = {
            active: 'bg-green-100 text-green-800',
            completed: 'bg-blue-100 text-blue-800',
            planning: 'bg-yellow-100 text-yellow-800',
            'on-hold': 'bg-gray-100 text-gray-800'
        };
        return colors[status] || 'bg-gray-100 text-gray-800';
    };

    const getPriorityColor = (priority) => {
        const colors = {
            critical: 'bg-red-100 text-red-800',
            high: 'bg-orange-100 text-orange-800',
            medium: 'bg-yellow-100 text-yellow-800',
            low: 'bg-green-100 text-green-800'
        };
        return colors[priority] || 'bg-gray-100 text-gray-800';
    };

    const getHealthColor = (health) => {
        const colors = {
            excellent: 'text-green-600',
            good: 'text-blue-600',
            'at-risk': 'text-orange-600',
            'needs-attention': 'text-red-600'
        };
        return colors[health] || 'text-gray-600';
    };

    const getHealthIcon = (health) => {
        const icons = {
            excellent: <CheckCircle className="w-4 h-4" />,
            good: <TrendingUp className="w-4 h-4" />,
            'at-risk': <AlertTriangle className="w-4 h-4" />,
            'needs-attention': <AlertTriangle className="w-4 h-4" />
        };
        return icons[health] || <Clock className="w-4 h-4" />;
    };

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0
        }).format(amount);
    };

    const handleSort = (key) => {
        setSortConfig(prev => ({
            key,
            direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc'
        }));
    };

    const clearFilters = () => {
        setFilters({
            status: '',
            priority: '',
            lead: '',
            health: ''
        });
        setSearchTerm('');
    };

    const hasActiveFilters = Object.values(filters).some(filter => filter) || searchTerm;

    return (
        <div className="p-6 space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Projects</h1>
                    <p className="text-gray-600">Manage and track your projects</p>
                </div>
                <div className="flex items-center space-x-3">
                    <button className="flex items-center space-x-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
                        <Download className="w-4 h-4" />
                        <span>Export</span>
                    </button>
                    <button className="flex items-center space-x-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
                        <Upload className="w-4 h-4" />
                        <span>Import</span>
                    </button>
                    <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                        <Plus className="w-4 h-4" />
                        <span>New Project</span>
                    </button>
                </div>
            </div>

            {/* Search and Filters */}
            <div className="flex items-center justify-between space-x-4">
                <div className="flex items-center space-x-4 flex-1">
                    <div className="relative flex-1 max-w-md">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <input
                            type="text"
                            placeholder="Search projects..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>
                    <button
                        onClick={() => setShowFilters(!showFilters)}
                        className={`flex items-center space-x-2 px-4 py-2 border rounded-lg ${showFilters ? 'bg-blue-50 border-blue-300 text-blue-700' : 'bg-white border-gray-300 hover:bg-gray-50'
                            }`}
                    >
                        <Filter className="w-4 h-4" />
                        <span>Filters</span>
                        {hasActiveFilters && (
                            <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded-full">
                                {Object.values(filters).filter(f => f).length + (searchTerm ? 1 : 0)}
                            </span>
                        )}
                    </button>
                    {hasActiveFilters && (
                        <button
                            onClick={clearFilters}
                            className="flex items-center space-x-2 px-3 py-2 text-gray-600 hover:text-gray-800"
                        >
                            <X className="w-4 h-4" />
                            <span>Clear</span>
                        </button>
                    )}
                </div>
                <div className="flex items-center space-x-2">
                    <button
                        onClick={() => setViewMode('grid')}
                        className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:bg-gray-100'}`}
                    >
                        <Grid className="w-4 h-4" />
                    </button>
                    <button
                        onClick={() => setViewMode('list')}
                        className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:bg-gray-100'}`}
                    >
                        <List className="w-4 h-4" />
                    </button>
                </div>
            </div>

            {/* Advanced Filters */}
            {showFilters && (
                <div className="bg-white p-4 border border-gray-200 rounded-lg">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                            <select
                                value={filters.status}
                                onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value }))}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            >
                                <option value="">All Statuses</option>
                                {filterOptions.statuses.map(status => (
                                    <option key={status} value={status}>{status}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
                            <select
                                value={filters.priority}
                                onChange={(e) => setFilters(prev => ({ ...prev, priority: e.target.value }))}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            >
                                <option value="">All Priorities</option>
                                {filterOptions.priorities.map(priority => (
                                    <option key={priority} value={priority}>{priority}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Project Lead</label>
                            <select
                                value={filters.lead}
                                onChange={(e) => setFilters(prev => ({ ...prev, lead: e.target.value }))}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            >
                                <option value="">All Leads</option>
                                {filterOptions.leads.map(lead => (
                                    <option key={lead} value={lead}>{lead}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Health</label>
                            <select
                                value={filters.health}
                                onChange={(e) => setFilters(prev => ({ ...prev, health: e.target.value }))}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            >
                                <option value="">All Health</option>
                                {filterOptions.healths.map(health => (
                                    <option key={health} value={health}>{health}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>
            )}

            {/* Projects Grid/List */}
            {viewMode === 'grid' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredProjects.map(project => (
                        <div key={project.id} className="bg-white rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
                            <div className="p-6">
                                <div className="flex items-start justify-between mb-4">
                                    <div className="flex-1">
                                        <h3 className="text-lg font-semibold text-gray-900 mb-2">{project.name}</h3>
                                        <p className="text-gray-600 text-sm mb-3">{project.description}</p>
                                        <div className="flex items-center space-x-2">
                                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(project.status)}`}>
                                                {project.status}
                                            </span>
                                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(project.priority)}`}>
                                                {project.priority}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-1">
                                        <div className={`flex items-center space-x-1 ${getHealthColor(project.health)}`}>
                                            {getHealthIcon(project.health)}
                                        </div>
                                        <button className="p-1 hover:bg-gray-100 rounded">
                                            <MoreHorizontal className="w-4 h-4 text-gray-400" />
                                        </button>
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-gray-600">Progress</span>
                                        <span className="font-medium">{project.progress}%</span>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-2">
                                        <div
                                            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                                            style={{ width: `${project.progress}%` }}
                                        />
                                    </div>

                                    <div className="grid grid-cols-2 gap-4 text-sm">
                                        <div className="flex items-center space-x-2">
                                            <Users className="w-4 h-4 text-gray-400" />
                                            <span className="text-gray-600">{project.teamSize} members</span>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <Calendar className="w-4 h-4 text-gray-400" />
                                            <span className="text-gray-600">{new Date(project.endDate).toLocaleDateString()}</span>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <Target className="w-4 h-4 text-gray-400" />
                                            <span className="text-gray-600">{project.completedTasks}/{project.totalTasks}</span>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <DollarSign className="w-4 h-4 text-gray-400" />
                                            <span className="text-gray-600">{formatCurrency(project.spent)}</span>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                                        <div className="flex items-center space-x-2">
                                            <img
                                                src={project.leadAvatar}
                                                alt={project.lead}
                                                className="w-6 h-6 rounded-full"
                                            />
                                            <span className="text-sm text-gray-600">{project.lead}</span>
                                        </div>
                                        <div className="flex items-center space-x-1">
                                            <button className="p-1 hover:bg-gray-100 rounded">
                                                <Eye className="w-4 h-4 text-gray-400" />
                                            </button>
                                            <button className="p-1 hover:bg-gray-100 rounded">
                                                <Edit className="w-4 h-4 text-gray-400" />
                                            </button>
                                            <button className="p-1 hover:bg-gray-100 rounded">
                                                <Star className="w-4 h-4 text-gray-400" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        <button
                                            onClick={() => handleSort('name')}
                                            className="flex items-center space-x-1 hover:text-gray-700"
                                        >
                                            <span>Project</span>
                                            {sortConfig.key === 'name' && (
                                                sortConfig.direction === 'asc' ?
                                                    <SortAsc className="w-3 h-3" /> :
                                                    <SortDesc className="w-3 h-3" />
                                            )}
                                        </button>
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Status
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Progress
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Team
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        <button
                                            onClick={() => handleSort('endDate')}
                                            className="flex items-center space-x-1 hover:text-gray-700"
                                        >
                                            <span>Due Date</span>
                                            {sortConfig.key === 'endDate' && (
                                                sortConfig.direction === 'asc' ?
                                                    <SortAsc className="w-3 h-3" /> :
                                                    <SortDesc className="w-3 h-3" />
                                            )}
                                        </button>
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Budget
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Health
                                    </th>
                                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {filteredProjects.map(project => (
                                    <tr key={project.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div className="ml-4">
                                                    <div className="text-sm font-medium text-gray-900">{project.name}</div>
                                                    <div className="text-sm text-gray-500">{project.lead}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center space-x-2">
                                                <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(project.status)}`}>
                                                    {project.status}
                                                </span>
                                                <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(project.priority)}`}>
                                                    {project.priority}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div className="w-16 bg-gray-200 rounded-full h-2 mr-3">
                                                    <div
                                                        className="bg-blue-600 h-2 rounded-full"
                                                        style={{ width: `${project.progress}%` }}
                                                    />
                                                </div>
                                                <span className="text-sm text-gray-900">{project.progress}%</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div className="flex -space-x-2">
                                                    {project.team.slice(0, 3).map((member, idx) => (
                                                        <img
                                                            key={idx}
                                                            src={member.avatar}
                                                            alt={member.name}
                                                            className="w-6 h-6 rounded-full border-2 border-white"
                                                        />
                                                    ))}
                                                    {project.team.length > 3 && (
                                                        <div className="w-6 h-6 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center">
                                                            <span className="text-xs text-gray-600">+{project.team.length - 3}</span>
                                                        </div>
                                                    )}
                                                </div>
                                                <span className="ml-2 text-sm text-gray-500">{project.teamSize}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            {new Date(project.endDate).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-900">{formatCurrency(project.spent)}</div>
                                            <div className="text-sm text-gray-500">of {formatCurrency(project.budget)}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className={`flex items-center space-x-1 ${getHealthColor(project.health)}`}>
                                                {getHealthIcon(project.health)}
                                                <span className="text-sm capitalize">{project.health}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <div className="flex items-center justify-end space-x-2">
                                                <button className="text-blue-600 hover:text-blue-900">
                                                    <Eye className="w-4 h-4" />
                                                </button>
                                                <button className="text-gray-600 hover:text-gray-900">
                                                    <Edit className="w-4 h-4" />
                                                </button>
                                                <button className="text-gray-600 hover:text-gray-900">
                                                    <Star className="w-4 h-4" />
                                                </button>
                                                <button className="text-gray-600 hover:text-gray-900">
                                                    <MoreHorizontal className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* Empty State */}
            {filteredProjects.length === 0 && (
                <div className="text-center py-12">
                    <Folder className="mx-auto h-12 w-12 text-gray-400" />
                    <h3 className="mt-2 text-sm font-medium text-gray-900">No projects found</h3>
                    <p className="mt-1 text-sm text-gray-500">
                        {hasActiveFilters
                            ? "Try adjusting your search criteria or filters"
                            : "Get started by creating your first project"
                        }
                    </p>
                    {!hasActiveFilters && (
                        <div className="mt-6">
                            <button className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700">
                                <Plus className="w-4 h-4 mr-2" />
                                New Project
                            </button>
                        </div>
                    )}
                </div>
            )}

            {/* Summary Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-8">
                <div className="bg-white p-4 rounded-lg border border-gray-200">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">Total Projects</p>
                            <p className="text-2xl font-semibold text-gray-900">{projects.length}</p>
                        </div>
                        <div className="p-3 bg-blue-100 rounded-full">
                            <Folder className="w-6 h-6 text-blue-600" />
                        </div>
                    </div>
                </div>
                <div className="bg-white p-4 rounded-lg border border-gray-200">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">Active Projects</p>
                            <p className="text-2xl font-semibold text-gray-900">
                                {projects.filter(p => p.status === 'active').length}
                            </p>
                        </div>
                        <div className="p-3 bg-green-100 rounded-full">
                            <Activity className="w-6 h-6 text-green-600" />
                        </div>
                    </div>
                </div>
                <div className="bg-white p-4 rounded-lg border border-gray-200">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">Total Budget</p>
                            <p className="text-2xl font-semibold text-gray-900">
                                {formatCurrency(projects.reduce((sum, p) => sum + p.budget, 0))}
                            </p>
                        </div>
                        <div className="p-3 bg-yellow-100 rounded-full">
                            <DollarSign className="w-6 h-6 text-yellow-600" />
                        </div>
                    </div>
                </div>
                <div className="bg-white p-4 rounded-lg border border-gray-200">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">Open Issues</p>
                            <p className="text-2xl font-semibold text-gray-900">
                                {projects.reduce((sum, p) => sum + p.openBugs, 0)}
                            </p>
                        </div>
                        <div className="p-3 bg-red-100 rounded-full">
                            <Bug className="w-6 h-6 text-red-600" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProjectsContent2;