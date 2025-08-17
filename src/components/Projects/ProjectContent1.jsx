import React, { useState, useEffect } from 'react';
import {
    Plus, Search, MoreHorizontal, Calendar, Bug, AlertCircle, CheckCircle2, Clock,
    TrendingUp, TrendingDown, FolderOpen, Eye, Edit, Trash2, Archive, Star,
     Activity, Target, X, LayoutGrid, List
} from 'lucide-react';
import { projectData } from './ProjectItems/projectData';
import { projectConfig } from '../../helper';
import GlobalModel from '../common/GlobalModel';
import RenderHtmlFields from '../common/RenderHtmlFields';

const ProjectsContent1 = ({ user }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [priorityFilter, setPriorityFilter] = useState('all');
    const [sortBy, setSortBy] = useState('name');
    const [viewMode, setViewMode] = useState('grid'); // grid or list
    const [showFilters, setShowFilters] = useState(false);
    const [selectedProjects, setSelectedProjects] = useState([]);
    const [isAddModelOpen, setIsAddModelOpen] = useState(false)

    const [projectFormData, setProjectFormData] = useState({
        name: "",
        description: "",
        status: "",
        priority: "",
        progress: 0,
        startDate: "",
        dueDate: "",
        budget: 0,
        spent: 0,
        team: [],
        bugs: {
            total: 0,
            open: 0,
            critical: 0,
            resolved: 0
        },
        milestones: {
            total: 0,
            completed: 0,
            upcoming: 0
        },
        client: "",
        tags: [],
        starred: false
    });

    const jsoData =     {
        id: 1,
        name: 'E-commerce Platform',
        description: 'Complete redesign of the e-commerce.',
        status: 'active',
        priority: 'high',
        progress: 78,
        startDate: '2024-01-15',
        dueDate: '2024-08-15',
        budget: 45000,
        spent: 35000,
        team: [
            { name: 'John Doe', role: 'Project Manager', avatar: 'JD' },
            { name: 'Sarah Wilson', role: 'Frontend Developer', avatar: 'SW' },
            { name: 'Mike Johnson', role: 'Backend Developer', avatar: 'MJ' },
            { name: 'Emily Davis', role: 'UI/UX Designer', avatar: 'ED' }
        ],
        bugs: {
            total: 15,
            open: 12,
            critical: 3,
            resolved: 3
        },
        milestones: {
            total: 8,
            completed: 6,
            upcoming: 2
        },
        client: 'TechCorp Inc.',
        tags: ['E-commerce', 'React', 'Node.js', 'MongoDB'],
        starred: true
    }


    // Mock projects data - replace with your actual data
    const [projects, setProjects] = useState(projectData);

    const statusOptions = [
        { value: 'all', label: 'All Status' },
        { value: 'active', label: 'Active' },
        { value: 'testing', label: 'Testing' },
        { value: 'planning', label: 'Planning' },
        { value: 'completed', label: 'Completed' },
        { value: 'on_hold', label: 'On Hold' }
    ];

    const priorityOptions = [
        { value: 'all', label: 'All Priorities' },
        { value: 'critical', label: 'Critical' },
        { value: 'high', label: 'High' },
        { value: 'medium', label: 'Medium' },
        { value: 'low', label: 'Low' }
    ];

    const getPriorityColor = (priority) => {
        switch (priority) {
            case 'critical': return 'text-red-600 bg-red-50 border-red-200';
            case 'high': return 'text-orange-600 bg-orange-50 border-orange-200';
            case 'medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
            case 'low': return 'text-green-600 bg-green-50 border-green-200';
            default: return 'text-gray-600 bg-gray-50 border-gray-200';
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'active': return 'text-green-600 bg-green-50 border-green-200';
            case 'testing': return 'text-blue-600 bg-blue-50 border-blue-200';
            case 'planning': return 'text-purple-600 bg-purple-50 border-purple-200';
            case 'completed': return 'text-gray-600 bg-gray-50 border-gray-200';
            case 'on_hold': return 'text-red-600 bg-red-50 border-red-200';
            default: return 'text-gray-600 bg-gray-50 border-gray-200';
        }
    };

    const getProgressColor = (progress) => {
        if (progress >= 80) return 'bg-green-500';
        if (progress >= 60) return 'bg-blue-500';
        if (progress >= 40) return 'bg-yellow-500';
        if (progress >= 20) return 'bg-orange-500';
        return 'bg-red-500';
    };

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(amount);
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    const getDaysRemaining = (dueDate) => {
        const today = new Date();
        const due = new Date(dueDate);
        const diffTime = due - today;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays;
    };

    const filteredProjects = projects.filter(project => {
        const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
            project.client.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesStatus = statusFilter === 'all' || project.status === statusFilter;
        const matchesPriority = priorityFilter === 'all' || project.priority === priorityFilter;

        return matchesSearch && matchesStatus && matchesPriority;
    });

    const sortedProjects = [...filteredProjects].sort((a, b) => {
        switch (sortBy) {
            case 'name':
                return a.name.localeCompare(b.name);
            case 'priority':
                const priorityOrder = { 'critical': 4, 'high': 3, 'medium': 2, 'low': 1 };
                return priorityOrder[b.priority] - priorityOrder[a.priority];
            case 'progress':
                return b.progress - a.progress;
            case 'dueDate':
                return new Date(a.dueDate) - new Date(b.dueDate);
            case 'budget':
                return b.budget - a.budget;
            default:
                return 0;
        }
    });

    const toggleStar = (projectId) => {
        setProjects(projects.map(project =>
            project.id === projectId
                ? { ...project, starred: !project.starred }
                : project
        ));
    };

    const toggleProjectSelection = (projectId) => {
        setSelectedProjects(prev =>
            prev.includes(projectId)
                ? prev.filter(id => id !== projectId)
                : [...prev, projectId]
        );
    };

    const selectAllProjects = () => {
        setSelectedProjects(selectedProjects.length === sortedProjects.length ? [] : sortedProjects.map(p => p.id));
    };

    const ProjectCard = ({ project }) => (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
            <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                        <input
                            type="checkbox"
                            checked={selectedProjects.includes(project.id)}
                            onChange={() => toggleProjectSelection(project.id)}
                            className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                        />
                        <div>
                            <h3 className="font-semibold text-gray-900 text-lg mb-1">{project.name}</h3>
                            <p className="text-sm text-gray-600 mb-2">{project.description}</p>
                            <p className="text-sm text-gray-500">Client: {project.client}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => toggleStar(project.id)}
                            className={`p-1 rounded-full ${project.starred ? 'text-yellow-500' : 'text-gray-400'} hover:bg-gray-100`}
                        >
                            <Star className="w-4 h-4" fill={project.starred ? 'currentColor' : 'none'} />
                        </button>
                        <button className="p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full">
                            <MoreHorizontal className="w-4 h-4" />
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="flex items-center gap-2">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(project.status)}`}>
                            {project.status === 'active' && <Activity className="w-3 h-3 mr-1" />}
                            {project.status === 'testing' && <Bug className="w-3 h-3 mr-1" />}
                            {project.status === 'planning' && <Calendar className="w-3 h-3 mr-1" />}
                            {project.status === 'completed' && <CheckCircle2 className="w-3 h-3 mr-1" />}
                            {project.status === 'on_hold' && <Clock className="w-3 h-3 mr-1" />}
                            {project.status.charAt(0).toUpperCase() + project.status.slice(1).replace('_', ' ')}
                        </span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getPriorityColor(project.priority)}`}>
                            {project.priority === 'critical' && <AlertCircle className="w-3 h-3 mr-1" />}
                            {project.priority === 'high' && <TrendingUp className="w-3 h-3 mr-1" />}
                            {project.priority === 'medium' && <Target className="w-3 h-3 mr-1" />}
                            {project.priority === 'low' && <TrendingDown className="w-3 h-3 mr-1" />}
                            {project.priority.charAt(0).toUpperCase() + project.priority.slice(1)}
                        </span>
                    </div>
                </div>

                <div className="mb-4">
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium text-gray-700">Progress</span>
                        <span className="text-sm font-medium text-gray-900">{project.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                            className={`h-2 rounded-full transition-all duration-300 ${getProgressColor(project.progress)}`}
                            style={{ width: `${project.progress}%` }}
                        />
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                        <p className="text-xs text-gray-500 mb-1">Budget</p>
                        <p className="text-sm font-medium text-gray-900">{formatCurrency(project.budget)}</p>
                    </div>
                    <div>
                        <p className="text-xs text-gray-500 mb-1">Spent</p>
                        <p className="text-sm font-medium text-gray-900">{formatCurrency(project.spent)}</p>
                    </div>
                    <div>
                        <p className="text-xs text-gray-500 mb-1">Due Date</p>
                        <p className="text-sm font-medium text-gray-900">{formatDate(project.dueDate)}</p>
                    </div>
                    <div>
                        <p className="text-xs text-gray-500 mb-1">Days Left</p>
                        <p className={`text-sm font-medium ${getDaysRemaining(project.dueDate) < 0 ? 'text-red-600' : getDaysRemaining(project.dueDate) < 7 ? 'text-orange-600' : 'text-gray-900'}`}>
                            {getDaysRemaining(project.dueDate) < 0 ? 'Overdue' : `${getDaysRemaining(project.dueDate)} days`}
                        </p>
                    </div>
                </div>

                <div className="mb-4">
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-xs text-gray-500">Team</span>
                        <span className="text-xs text-gray-500">{project.team.length} members</span>
                    </div>
                    <div className="flex -space-x-2">
                        {project.team.slice(0, 4).map((member, index) => (
                            <div
                                key={index}
                                className="w-8 h-8 rounded-full bg-blue-500 text-white text-xs flex items-center justify-center border-2 border-white"
                                title={`${member.name} - ${member.role}`}
                            >
                                {member.avatar}
                            </div>
                        ))}
                        {project.team.length > 4 && (
                            <div className="w-8 h-8 rounded-full bg-gray-500 text-white text-xs flex items-center justify-center border-2 border-white">
                                +{project.team.length - 4}
                            </div>
                        )}
                    </div>
                </div>

                <div className="grid grid-cols-3 gap-4 mb-4">
                    <div className="text-center">
                        <p className="text-sm font-medium text-gray-900">{project.bugs.open}</p>
                        <p className="text-xs text-gray-500">Open Bugs</p>
                    </div>
                    <div className="text-center">
                        <p className="text-sm font-medium text-gray-900">{project.milestones.completed}/{project.milestones.total}</p>
                        <p className="text-xs text-gray-500">Milestones</p>
                    </div>
                    <div className="text-center">
                        <p className="text-sm font-medium text-gray-900">{Math.round((project.spent / project.budget) * 100)}%</p>
                        <p className="text-xs text-gray-500">Budget Used</p>
                    </div>
                </div>

                <div className="flex flex-wrap gap-1 mb-4">
                    {project.tags.map((tag, index) => (
                        <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                            {tag}
                        </span>
                    ))}
                </div>

                <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                    <button className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800">
                        <Eye className="w-4 h-4" />
                        View Details
                    </button>
                    <div className="flex gap-2">
                        <button className="p-2 cursor-pointer text-gray-400 hover:text-gray-600 hover:bg-gray-200 rounded-full">
                            <Edit className="w-4 h-4" />
                        </button>
                        <button className="p-2 cursor-pointer text-gray-400 hover:text-gray-600 hover:bg-gray-200 rounded-full">
                            <Archive className="w-4 h-4" />
                        </button>
                        <button className="p-2 cursor-pointer text-gray-400 hover:text-red-600 hover:bg-red-100 rounded-full">
                            <Trash2 className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );

    const ProjectListItem = ({ project }) => (
        <tr className="bg-white border-b border-gray-200 hover:bg-gray-50 transition-colors">
            <td className="px-2 py-4 whitespace-wrap">
                <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-gray-900 text-wrap">{project.name}</h3>
                    <button
                        onClick={() => toggleStar(project.id)}
                        className={`p-1 rounded-full ${project.starred ? 'text-yellow-500' : 'text-gray-400'} hover:bg-gray-100`}
                    >
                        <Star className="w-4 h-4" fill={project.starred ? 'currentColor' : 'none'} />
                    </button>
                </div>
                <p className="text-sm text-gray-600 whitespace-normal break-words">{project.description}</p>
                <p className="text-xs text-gray-500 mt-1">Client: {project.client}</p>
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-center">
                <p className="text-sm font-medium text-gray-900">{project.progress}%</p>
                <div className="w-20 bg-gray-200 rounded-full h-2 mt-1">
                    <div
                        className={`h-2 rounded-full transition-all duration-300 ${getProgressColor(project.progress)}`}
                        style={{ width: `${project.progress}%` }}
                    />
                </div>
            </td>

            <td className="px-6 py-4 whitespace-nowrap text-center">
                <p className="text-sm font-medium text-gray-900">{formatCurrency(project.budget)}</p>
                <p className="text-xs text-gray-500">{formatCurrency(project.spent)} spent</p>
            </td>

            <td className="px-6 py-4 whitespace-nowrap text-center">
                <p className="text-sm font-medium text-gray-900">{formatDate(project.dueDate)}</p>
                <p className={`text-xs ${getDaysRemaining(project.dueDate) < 0 ? 'text-red-600' : getDaysRemaining(project.dueDate) < 7 ? 'text-orange-600' : 'text-gray-500'}`}>
                    {getDaysRemaining(project.dueDate) < 0 ? 'Overdue' : `${getDaysRemaining(project.dueDate)} days left`}
                </p>
            </td>

            <td className="px-6 py-4 whitespace-nowrap text-center">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(project.status)}`}>
                    {project.status.charAt(0).toUpperCase() + project.status.slice(1).replace('_', ' ')}
                </span>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getPriorityColor(project.priority)}`}>
                    {project.priority.charAt(0).toUpperCase() + project.priority.slice(1)}
                </span>
            </td>

            <td className="px-6 py-4 whitespace-nowrap text-center">
                {project.team.slice(0, 3).map((member, index) => (
                    <div
                        key={index}
                        className="w-8 h-8 rounded-full bg-blue-500 text-white text-xs flex items-center justify-center border-2 border-white"
                        title={`${member.name} - ${member.role}`}
                    >
                        {member.avatar}
                    </div>
                ))}
                {project.team.length > 3 && (
                    <div className="w-8 h-8 rounded-full bg-gray-500 text-white text-xs flex items-center justify-center border-2 border-white">
                        +{project.team.length - 3}
                    </div>
                )}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-center">

                {/* <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full">
                    <MoreHorizontal className="w-4 h-4" />
                </button> */}
                <div className="flex">
                    <button className="p-1.5 cursor-pointer text-gray-400 hover:text-gray-600 hover:bg-gray-200 rounded-full">
                        <Edit className="w-4 h-4" />
                    </button>
                    <button className="p-1.5 cursor-pointer text-gray-400 hover:text-gray-600 hover:bg-gray-200 rounded-full">
                        <Archive className="w-4 h-4" />
                    </button>
                    <button className="p-1.5 cursor-pointer text-gray-400 hover:text-red-600 hover:bg-red-100 rounded-full">
                        <Trash2 className="w-4 h-4" />
                    </button>
                </div>
            </td>
        </tr>
    );

    // const hasActiveFilters = Object.values(statusFilter).some(filter => filter) || searchTerm;
    const clearFilters = () => {
        setSearchTerm('');
        setStatusFilter('all')
        setPriorityFilter('all')
    };

    // Add these state variables at the top of your component with other state declarations
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5); // You can make this configurable

    // Add this pagination logic after your sorting logic
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = sortedProjects.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(sortedProjects.length / itemsPerPage);

    // Pagination functions
    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    const nextPage = () => setCurrentPage(prev => Math.min(prev + 1, totalPages));
    const prevPage = () => setCurrentPage(prev => Math.max(prev - 1, 1));

    const handleProjectInputChange = (fieldName, value) => {
        setProjectFormData(prev => ({
            ...prev,
            [fieldName]: value
        }));
    };
    const handleAddProject = () => {
        console.log("----form data----", projectFormData)
        setProjects((prev) => {
            return [...prev, {
                ...projectFormData,
                id: prev.length + 1
            }]
        })
    }

    return (
        <div className="max-w-full mx-auto bg-gray-50 min-h-screen">
            {/* Header */}
            <div className="mb-8 p-4 bg-white rounded-lg shadow-lg">
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Projects</h1>
                        <p className="text-gray-600 mt-1">Manage and track your project portfolio</p>
                    </div>
                    <button onClick={() => setIsAddModelOpen(true)} className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
                        <Plus className="w-4 h-4" />
                        New Project
                    </button>
                </div>

                {/* Search and Filters */}
                <div className="flex flex-col sm:flex-row gap-4 mb-6">
                    <div className="flex-1 relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <input
                            type="text"
                            placeholder="Search projects..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>

                    <div className="flex gap-2">
                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        >
                            {statusOptions.map(option => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>

                        <select
                            value={priorityFilter}
                            onChange={(e) => setPriorityFilter(e.target.value)}
                            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        >
                            {priorityOptions.map(option => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>

                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        >
                            <option value="name">Sort by Name</option>
                            <option value="priority">Sort by Priority</option>
                            <option value="progress">Sort by Progress</option>
                            <option value="dueDate">Sort by Due Date</option>
                            <option value="budget">Sort by Budget</option>
                        </select>

                        {/* <button
                            onClick={() => setShowFilters(!showFilters)}
                            className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                        >
                            <Filter className="w-4 h-4" />
                        </button> */}
                        <button
                            onClick={clearFilters}
                            className="flex items-center space-x-2 px-3 py-2 text-gray-600 hover:text-gray-800"
                        >
                            <X className="w-4 h-4" />
                            <span>Clear</span>
                        </button>
                        <div className="flex items-center space-x-4">
                            <span className="text-sm text-gray-500">
                                Showing {currentItems.length} of {sortedProjects.length} results
                            </span>
                            <select
                                value={itemsPerPage}
                                onChange={(e) => {
                                    setItemsPerPage(Number(e.target.value));
                                    setCurrentPage(1);
                                }}
                                className="border border-gray-300 rounded-md px-3 py-1 text-sm"
                            >
                                <option value={5}>5 per page</option>
                                <option value={10}>10 per page</option>
                                <option value={15}>15 per page</option>
                                <option value={20}>20 per page</option>
                            </select>
                        </div>
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => setViewMode('grid')}
                                className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-blue-100 text-blue-600' : 'text-gray-400 hover:text-gray-600'}`}
                            >
                                <LayoutGrid />
                            </button>
                            <button
                                onClick={() => setViewMode('list')}
                                className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-blue-100 text-blue-600' : 'text-gray-400 hover:text-gray-600'}`}
                            >
                                <List />
                            </button>
                        </div>
                    </div>
                </div>

                {/* View Toggle and Bulk Actions */}
                <div className="flex justify-between items-center mb-6">
                    <div className="flex items-center gap-4">
                        {/* <div className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                checked={selectedProjects.length === sortedProjects.length && sortedProjects.length > 0}
                                onChange={selectAllProjects}
                                className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                            />
                            <span className="text-sm text-gray-600">
                                {selectedProjects.length > 0 ? `${selectedProjects.length} selected` : 'Select all'}
                            </span>
                        </div> */}

                        {selectedProjects.length > 0 && (
                            <div className="flex gap-2">
                                <button className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded hover:bg-gray-200">
                                    <Archive className="w-4 h-4 inline mr-1" />
                                    Archive
                                </button>
                                <button className="px-3 py-1 text-sm bg-red-100 text-red-700 rounded hover:bg-red-200">
                                    <Trash2 className="w-4 h-4 inline mr-1" />
                                    Delete
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                {/* Additional Filters (shown when showFilters is true) */}
                {showFilters && (
                    <div className="bg-gray-50 p-4 rounded-lg mb-6">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="font-medium text-gray-900">Advanced Filters</h3>
                            <button onClick={() => setShowFilters(false)} className="text-gray-400 hover:text-gray-600">
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Date Range</label>
                                <div className="flex gap-2">
                                    <div className="relative flex-1">
                                        <input
                                            type="date"
                                            className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            placeholder="Start date"
                                        />
                                        <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                    </div>
                                    <div className="relative flex-1">
                                        <input
                                            type="date"
                                            className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            placeholder="End date"
                                        />
                                        <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                    </div>
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Budget Range</label>
                                <div className="flex gap-2">
                                    <input
                                        type="number"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="Min budget"
                                    />
                                    <input
                                        type="number"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="Max budget"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Team Size</label>
                                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                                    <option value="">Any size</option>
                                    <option value="1-3">Small (1-3)</option>
                                    <option value="4-6">Medium (4-6)</option>
                                    <option value="7+">Large (7+)</option>
                                </select>
                            </div>
                        </div>
                        <div className="flex justify-end gap-2 mt-4">
                            <button className="px-4 py-2 text-sm text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-100">
                                Reset
                            </button>
                            <button className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                                Apply Filters
                            </button>
                        </div>
                    </div>
                )}
                {/* Statistics Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                    <div className="bg-white p-4 rounded-lg border border-gray-200">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Total Projects</p>
                                <p className="text-2xl font-bold text-gray-900">{projects.length}</p>
                            </div>
                            <div className="p-3 bg-blue-100 rounded-full">
                                <FolderOpen className="w-6 h-6 text-blue-600" />
                            </div>
                        </div>
                        <p className="text-xs text-gray-500 mt-2">
                            {projects.filter(p => p.status === 'active').length} active
                        </p>
                    </div>

                    <div className="bg-white p-4 rounded-lg border border-gray-200">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Total Budget</p>
                                <p className="text-2xl font-bold text-gray-900">
                                    {formatCurrency(projects.reduce((sum, p) => sum + p.budget, 0))}
                                </p>
                            </div>
                            <div className="p-3 bg-green-100 rounded-full">
                                <TrendingUp className="w-6 h-6 text-green-600" />
                            </div>
                        </div>
                        <p className="text-xs text-gray-500 mt-2">
                            {formatCurrency(projects.reduce((sum, p) => sum + p.spent, 0))} spent
                        </p>
                    </div>

                    <div className="bg-white p-4 rounded-lg border border-gray-200">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Open Issues</p>
                                <p className="text-2xl font-bold text-gray-900">
                                    {projects.reduce((sum, p) => sum + p.bugs.open, 0)}
                                </p>
                            </div>
                            <div className="p-3 bg-orange-100 rounded-full">
                                <Bug className="w-6 h-6 text-orange-600" />
                            </div>
                        </div>
                        <p className="text-xs text-gray-500 mt-2">
                            {projects.reduce((sum, p) => sum + p.bugs.critical, 0)} critical
                        </p>
                    </div>

                    <div className="bg-white p-4 rounded-lg border border-gray-200">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Avg Progress</p>
                                <p className="text-2xl font-bold text-gray-900">
                                    {Math.round(projects.reduce((sum, p) => sum + p.progress, 0) / projects.length)}%
                                </p>
                            </div>
                            <div className="p-3 bg-purple-100 rounded-full">
                                <Target className="w-6 h-6 text-purple-600" />
                            </div>
                        </div>
                        <p className="text-xs text-gray-500 mt-2">
                            {projects.filter(p => p.progress >= 80).length} near completion
                        </p>
                    </div>
                </div>
                {/* Projects Display */}
                {currentItems.length === 0 ? (
                    <div className="text-center py-12">
                        <FolderOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 mb-2">No projects found</h3>
                        <p className="text-gray-600 mb-4">
                            {searchTerm || statusFilter !== 'all' || priorityFilter !== 'all'
                                ? 'Try adjusting your filters to see more projects.'
                                : 'Get started by creating your first project.'
                            }
                        </p>
                        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                            <Plus className="w-4 h-4 inline mr-2" />
                            New Project
                        </button>
                    </div>
                ) : (
                    <>
                        {viewMode === 'grid' ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {currentItems.map(project => (
                                    <ProjectCard key={project.id} project={project} />
                                ))}
                            </div>
                        ) : (
                            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                                <div className="overflow-x-auto">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    <span className="text-sm font-medium text-gray-900">Project Name</span>
                                                </th>
                                                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    <span className="text-sm font-medium text-gray-900">Progress</span>
                                                </th>
                                                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    <span className="text-sm font-medium text-gray-900">Budget</span>
                                                </th>
                                                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    <span className="text-sm font-medium text-gray-900">Due Date</span>
                                                </th>
                                                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    <span className="text-sm font-medium text-gray-900">Status</span>
                                                </th>
                                                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    <span className="text-sm font-medium text-gray-900">Team</span>
                                                </th>
                                                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    <span className="text-sm font-medium text-gray-900">Actions</span>
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {currentItems.map(project => (
                                                <ProjectListItem key={project.id} project={project} />
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )}
                    </>
                )}

                {/* Pagination */}
                {sortedProjects.length > 0 && (
                    <div className="py-4">
                        <div className="flex justify-between items-center">
                            <p className="text-sm text-gray-600">
                                Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, sortedProjects.length)} of {sortedProjects.length} projects
                            </p>
                            <div className="flex gap-2">
                                <button
                                    onClick={prevPage}
                                    disabled={currentPage === 1}
                                    className="px-3 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50"
                                >
                                    Previous
                                </button>

                                {/* Display page numbers */}
                                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                                    // Show pages around current page
                                    let pageNumber;
                                    if (totalPages <= 5) {
                                        pageNumber = i + 1;
                                    } else if (currentPage <= 3) {
                                        pageNumber = i + 1;
                                    } else if (currentPage >= totalPages - 2) {
                                        pageNumber = totalPages - 4 + i;
                                    } else {
                                        pageNumber = currentPage - 2 + i;
                                    }

                                    return (
                                        <button
                                            key={pageNumber}
                                            onClick={() => paginate(pageNumber)}
                                            className={`px-3 py-2 text-sm rounded-lg ${currentPage === pageNumber
                                                ? 'bg-blue-600 text-white'
                                                : 'border border-gray-300 hover:bg-gray-50'
                                                }`}
                                        >
                                            {pageNumber}
                                        </button>
                                    );
                                })}

                                {/* Show ellipsis if there are more pages */}
                                {totalPages > 5 && currentPage < totalPages - 2 && (
                                    <span className="px-3 py-2 text-sm">...</span>
                                )}

                                {/* Show last page if not in current range */}
                                {totalPages > 5 && currentPage < totalPages - 2 && (
                                    <button
                                        onClick={() => paginate(totalPages)}
                                        className={`px-3 py-2 text-sm rounded-lg ${currentPage === totalPages
                                            ? 'bg-blue-600 text-white'
                                            : 'border border-gray-300 hover:bg-gray-50'
                                            }`}
                                    >
                                        {totalPages}
                                    </button>
                                )}

                                <button
                                    onClick={nextPage}
                                    disabled={currentPage === totalPages}
                                    className="px-3 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50"
                                >
                                    Next
                                </button>
                            </div>
                        </div>
                    </div>
                )}
                {/* add project */}
                <GlobalModel
                    isOpen={isAddModelOpen}
                    onClose={() => setIsAddModelOpen(false)}
                    header="Add new projects"
                    onSubmit={handleAddProject}
                    submitText="Add project"
                    children={
                        <RenderHtmlFields
                            fieldItems={projectConfig}
                            formData={projectFormData}
                            handleInputChange={handleProjectInputChange}
                        />
                    }
                />
            </div>
        </div>
    );
};

export default ProjectsContent1;