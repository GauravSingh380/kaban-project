import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
    Plus, Search, Calendar, FolderOpen, Trash2, Archive, X, LayoutGrid, List,
    Filter, RotateCcw
} from 'lucide-react';
import { projectConfig } from '../../helper';
import GlobalModelP from './ProjectItems/GlobalModel';
import RenderHtmlFieldsP from './ProjectItems/RenderHtmlFields';
import { addProjectJsonConfig } from './projectComp';
import ProjectCard from './projectComp/ProjectCard';
import ProjectListItem from './projectComp/ProjectListItem';
import StatisticsCard from './projectComp/StatisticsCard';
import { useApi, useAuth } from '../../api';
import { useToast } from '../StyledAlert/ToastContext';
import ApiSpinnerV2 from '../Teams/ApiSpinnerv2';
import StyledSpinner from '../StyledSpinner/StyledSpinner';

const ProjectContent1v1 = ({ user }) => {
    // Basic UI State
    const [viewMode, setViewMode] = useState('grid');
    const [showFilters, setShowFilters] = useState(false);
    const [selectedProjects, setSelectedProjects] = useState([]);
    const [isAddModelOpen, setIsAddModelOpen] = useState(false);

    // Filter State
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [priorityFilter, setPriorityFilter] = useState('all');
    const [sortBy, setSortBy] = useState('name');
    const [sortOrder, setSortOrder] = useState('asc');
    const [includeArchived, setIncludeArchived] = useState(false);

    // Advanced Filter State
    const [startDateFilter, setStartDateFilter] = useState('');
    const [endDateFilter, setEndDateFilter] = useState('');
    const [minBudget, setMinBudget] = useState('');
    const [maxBudget, setMaxBudget] = useState('');
    const [teamSizeFilter, setTeamSizeFilter] = useState('');

    // Pagination State
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [totalPages, setTotalPages] = useState(1);
    const [totalProjects, setTotalProjects] = useState(0);

    // Data State
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(false);

    // crud state 
    const [deletingProjectId, setDeletingProjectId] = useState(null);
    const [archivingProjectId, setArchivingProjectId] = useState(null);

    const alert = useToast();
    const hasFetchedProjects = useRef(false);
    const searchDebounceTimer = useRef(null);


    const [projectFormData, setProjectFormData] = useState({
        name: "",
        description: "",
        status: "",
        priority: "",
        progress: 0,
        startDate: "",
        dueDate: "",
        budget: "",
        spent: "",
        team: [],
        client: "",
        tags: [],
        starred: false
    });

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

    const sortOptions = [
        { value: 'name', label: 'Name' },
        { value: 'priority', label: 'Priority' },
        { value: 'progress', label: 'Progress' },
        { value: 'dueDate', label: 'Due Date' },
        { value: 'budget', label: 'Budget' },
        { value: 'createdAt', label: 'Created Date' }
    ];

    const { isAuthenticated, projectDetails, getProjectSummaryDetails, newProject, createNewProject, archiveProject, deleteProject } = useAuth();
    const {
        loading: loadingGetProjectDetails,
        error: errorGetProjectDetails,
        execute: executeGetProjectDetails
    } = useApi(getProjectSummaryDetails);

    const {
        loading: loadingCreateProject,
        execute: executeCreateProject
    } = useApi(createNewProject);
    const {
        loading: loadingArchiveProject,
        execute: executeArchiveProject
    } = useApi(archiveProject);
    const {
        loading: loadingDeleteProject,
        execute: executeDeleteProject
    } = useApi(deleteProject);

    // ==================== FETCH PROJECTS FROM API ====================
    const fetchProjects = useCallback(async () => {
        setLoading(true);
        try {
            const queryParams = new URLSearchParams({
                page: currentPage.toString(),
                limit: itemsPerPage.toString(),
                search: searchTerm,
                status: statusFilter,
                priority: priorityFilter,
                sortBy: sortBy,
                sortOrder: sortOrder,
                includeArchived: includeArchived.toString()
            });

            // const response = await fetch(`http://localhost:3000/api/projects/available?${queryParams}`, {
            //     method: 'GET',
            // });
            // const data = await response.json();
            const apiResp = await executeGetProjectDetails(queryParams);
            if (apiResp) {
                setProjects(apiResp?.data?.projects);
                setTotalPages(apiResp?.data?.pagination?.totalPages);
                setTotalProjects(apiResp?.data?.pagination?.totalProjects);
            } else {
                alert.error(apiResp?.message || 'Failed to fetch projects');
            }
        } catch (error) {
            alert.error('Failed to fetch projects. Please try again.');
            console.error('Failed to fetch projects:', error);
        } finally {
            setLoading(false);
        }
    }, [currentPage, itemsPerPage, searchTerm, statusFilter, priorityFilter, sortBy, sortOrder, includeArchived]);

    const handleOnArchiveProject = useCallback(async (projectId) => {
        setArchivingProjectId(projectId)
        try {
            const apiResp = await executeArchiveProject(projectId);
            if (apiResp) {
                alert.success(apiResp.message || 'An error occurred. Please try again.');
                // hasFetchedBugs.current = true
                fetchProjects();
                setArchivingProjectId(null)
            }
        } catch (error) {
            if (error.message) {
                alert.error(error.message || 'An error occurred. Please try again.');
            } else {
                alert.error("Failed to get bugs. Please try again.");
            }
            setArchivingProjectId(null)
            console.log('Failed to get bugs:', error.message || error);
        }
    }, [executeArchiveProject]);
    const handleDeleteProject = useCallback(async (projectId) => {
        setDeletingProjectId(projectId)
        try {
            const apiResp = await executeDeleteProject(projectId);
            if (apiResp) {
                alert.success(apiResp.message || 'An error occurred. Please try again.');
                fetchProjects();
                setDeletingProjectId(null)
            }
        } catch (error) {
            if (error.message) {
                alert.error(error.message || 'An error occurred. Please try again.');
            } else {
                alert.error("Failed to get bugs. Please try again.");
            }
            setDeletingProjectId(null)
            console.log('Failed to get bugs:', error.message || error);
        }
    }, [executeDeleteProject]);

    // ==================== DEBOUNCED SEARCH ====================
    useEffect(() => {
        if (searchDebounceTimer.current) {
            clearTimeout(searchDebounceTimer.current);
        }

        searchDebounceTimer.current = setTimeout(() => {
            if (hasFetchedProjects.current) {
                setCurrentPage(1); // Reset to first page on search
                fetchProjects();
            }
        }, 500); // 500ms delay

        return () => {
            if (searchDebounceTimer.current) {
                clearTimeout(searchDebounceTimer.current);
            }
        };
    }, [searchTerm]);

    // ==================== FETCH ON FILTER CHANGE ====================
    useEffect(() => {
        if (hasFetchedProjects.current) {
            setCurrentPage(1); // Reset to first page on filter change
            fetchProjects();
        }
    }, [statusFilter, priorityFilter, sortBy, sortOrder, includeArchived, itemsPerPage]);

    // ==================== FETCH ON PAGE CHANGE ====================
    useEffect(() => {
        if (hasFetchedProjects.current) {
            fetchProjects();
        }
    }, [currentPage]);

    // ==================== INITIAL FETCH ====================
    useEffect(() => {
        if (isAuthenticated && !hasFetchedProjects.current) {
            hasFetchedProjects.current = true;
            fetchProjects();
        }
    }, [isAuthenticated, fetchProjects]);

    // ==================== CLEAR FILTERS ====================
    const clearFilters = () => {
        setSearchTerm('');
        setStatusFilter('all');
        setPriorityFilter('all');
        setSortBy('name');
        setSortOrder('asc');
        setIncludeArchived(false);
        setStartDateFilter('');
        setEndDateFilter('');
        setMinBudget('');
        setMaxBudget('');
        setTeamSizeFilter('');
        setCurrentPage(1);
    };

    // ==================== APPLY ADVANCED FILTERS ====================
    const applyAdvancedFilters = () => {
        // You can add logic here to handle advanced filters
        // For now, just close the filters panel
        setShowFilters(false);
        alert.info('Advanced filters applied');
    };

    // ==================== RESET ADVANCED FILTERS ====================
    const resetAdvancedFilters = () => {
        setStartDateFilter('');
        setEndDateFilter('');
        setMinBudget('');
        setMaxBudget('');
        setTeamSizeFilter('');
    };

    // ==================== PROJECT ACTIONS ====================
    const handleAddProject = async () => {
        const requiredFields = projectConfig.filter(field => field.required);
        const missingFields = requiredFields.filter(field =>
            !projectFormData[field.name] ||
            (typeof projectFormData[field.name] === 'string' && projectFormData[field.name].trim() === '')
        );

        if (missingFields.length > 0) {
            alert.warning(`Please fill in required fields: ${missingFields.map(f => f.label).join(', ')}`);
            return;
        }

        try {
            const apiResp = await executeCreateProject(projectFormData);
            if (apiResp) {
                alert.success(apiResp?.message || "Project created successfully!");
                setIsAddModelOpen(false);
                fetchProjects(); // Refresh the list
            }
        } catch (error) {
            alert.error(error.message || 'Failed to create project. Please try again.');
            console.error('Failed to create project:', error);
        }
    };

    const handleProjectInputChange = (fieldName, value) => {
        setProjectFormData(prev => ({
            ...prev,
            [fieldName]: value
        }));
    };

    const toggleProjectSelection = (projectId) => {
        setSelectedProjects(prev =>
            prev.includes(projectId)
                ? prev.filter(id => id !== projectId)
                : [...prev, projectId]
        );
    };

    const selectAllProjects = () => {
        setSelectedProjects(selectedProjects.length === projects.length ? [] : projects.map(p => p._id));
    };

    // ==================== PAGINATION CONTROLS ====================
    const nextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(prev => prev + 1);
        }
    };

    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(prev => prev - 1);
        }
    };

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    // ==================== LOADING STATE ====================
    if (loading && !hasFetchedProjects.current) {
        return <ApiSpinnerV2
            borderWidth='3px'
            size='2.5rem'
            text='Loading...'
            fontSize='font-semibold'
        />;
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
                    <button
                        onClick={() => setIsAddModelOpen(true)}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                    >
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
                            placeholder="Search projects by name, description, or client..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                        {loading && (
                            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                                <div className="animate-spin h-4 w-4 border-2 border-blue-500 border-t-transparent rounded-full"></div>
                            </div>
                        )}
                    </div>
                </div>
                {/* filters */}
                <div className="flex flex-wrap gap-2 mb-4">
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
                        {sortOptions.map(option => (
                            <option key={option.value} value={option.value}>
                                Sort by {option.label}
                            </option>
                        ))}
                    </select>

                    <select
                        value={sortOrder}
                        onChange={(e) => setSortOrder(e.target.value)}
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                        <option value="asc">Ascending</option>
                        <option value="desc">Descending</option>
                    </select>

                    {/* <button
                        onClick={() => setShowFilters(!showFilters)}
                        className={`p-2 border rounded-lg transition-colors ${showFilters ? 'bg-blue-100 border-blue-500 text-blue-600' : 'border-gray-300 hover:bg-gray-50'
                            }`}
                    >
                        <Filter className="w-4 h-4" />
                    </button> */}

                    <button
                        onClick={clearFilters}
                        className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:text-gray-800 border border-gray-300 rounded-lg hover:bg-gray-50"
                    >
                        <RotateCcw className="w-4 h-4" />
                        <span>Reset</span>
                    </button>

                    <label className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                        <input
                            type="checkbox"
                            checked={includeArchived}
                            onChange={(e) => setIncludeArchived(e.target.checked)}
                            className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                        />
                        <span className="text-sm text-gray-700">Show Archived</span>
                    </label>

                    <div className="flex items-center gap-2 ml-auto">
                        <span className="text-sm text-gray-500">
                            {totalProjects} total projects
                        </span>
                        <select
                            value={itemsPerPage}
                            onChange={(e) => {
                                setItemsPerPage(Number(e.target.value));
                                setCurrentPage(1);
                            }}
                            className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
                        >
                            <option value={5}>5 per page</option>
                            <option value={10}>10 per page</option>
                            <option value={15}>15 per page</option>
                            <option value={20}>20 per page</option>
                            <option value={50}>50 per page</option>
                        </select>

                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => setViewMode('grid')}
                                className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-blue-100 text-blue-600' : 'text-gray-400 hover:text-gray-600'}`}
                            >
                                <LayoutGrid className="w-4 h-4" />
                            </button>
                            <button
                                onClick={() => setViewMode('list')}
                                className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-blue-100 text-blue-600' : 'text-gray-400 hover:text-gray-600'}`}
                            >
                                <List className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Advanced Filters Panel */}
                {showFilters && (
                    <div className="bg-gray-50 p-4 rounded-lg mb-6 border border-gray-200">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="font-medium text-gray-900">Advanced Filters</h3>
                            <button
                                onClick={() => setShowFilters(false)}
                                className="text-gray-400 hover:text-gray-600"
                            >
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
                                            value={startDateFilter}
                                            onChange={(e) => setStartDateFilter(e.target.value)}
                                            className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            placeholder="Start date"
                                        />
                                        <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                    </div>
                                    <div className="relative flex-1">
                                        <input
                                            type="date"
                                            value={endDateFilter}
                                            onChange={(e) => setEndDateFilter(e.target.value)}
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
                                        value={minBudget}
                                        onChange={(e) => setMinBudget(e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="Min budget"
                                    />
                                    <input
                                        type="number"
                                        value={maxBudget}
                                        onChange={(e) => setMaxBudget(e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="Max budget"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Team Size</label>
                                <select
                                    value={teamSizeFilter}
                                    onChange={(e) => setTeamSizeFilter(e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                >
                                    <option value="">Any size</option>
                                    <option value="1-3">Small (1-3)</option>
                                    <option value="4-6">Medium (4-6)</option>
                                    <option value="7+">Large (7+)</option>
                                </select>
                            </div>
                        </div>
                        <div className="flex justify-end gap-2 mt-4">
                            <button
                                onClick={resetAdvancedFilters}
                                className="px-4 py-2 text-sm text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-100"
                            >
                                Reset
                            </button>
                            <button
                                onClick={applyAdvancedFilters}
                                className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                            >
                                Apply Filters
                            </button>
                        </div>
                    </div>
                )}

                {/* Statistics Cards */}
                <StatisticsCard projects={projects} />

                {/* Loading State */}
                {loading && hasFetchedProjects.current && (
                    <div className="flex justify-center py-8">
                        <div className="animate-spin h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full"></div>
                    </div>
                )}

                {/* Projects Display */}
                {!loading && projects.length === 0 ? (
                    <div className="text-center py-12">
                        <FolderOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 mb-2">No projects found</h3>
                        <p className="text-gray-600 mb-4">
                            {searchTerm || statusFilter !== 'all' || priorityFilter !== 'all'
                                ? 'Try adjusting your filters to see more projects.'
                                : 'Get started by creating your first project.'
                            }
                        </p>
                        <button
                            onClick={() => setIsAddModelOpen(true)}
                            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            <Plus className="w-4 h-4 inline mr-2" />
                            New Project
                        </button>
                    </div>
                ) : !loading && (
                    <>
                        {viewMode === 'grid' ? (
                            <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-6">
                                {projects.map(project => (
                                    <ProjectCard
                                        key={project._id}
                                        project={project}
                                        selectedProjects={selectedProjects}
                                        toggleProjectSelection={toggleProjectSelection}
                                        onRefresh={fetchProjects}
                                        archivingProjectId={archivingProjectId}
                                        onArchive={handleOnArchiveProject}
                                        loadingArchiveProject={loadingArchiveProject}
                                        onDelete={handleDeleteProject}
                                        deletingProjectId={deletingProjectId}
                                        loadingDeleteProject={loadingDeleteProject}
                                    />
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
                                            {projects.map(project => (
                                                <ProjectListItem
                                                    key={project._id}
                                                    project={project}
                                                    onRefresh={fetchProjects}
                                                />
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )}
                    </>
                )}
                {/* Pagination */}
                {!loading && projects.length > 0 && (
                    <div className="py-4 mt-6 border-t">
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">

                            {/* Showing count */}
                            <p className="text-sm text-gray-600">
                                Showing {((currentPage - 1) * itemsPerPage) + 1} to{" "}
                                {Math.min(currentPage * itemsPerPage, totalProjects)} of{" "}
                                {totalProjects} projects
                            </p>

                            {/* Pagination */}
                            <div className="flex items-center gap-2 flex-wrap">

                                {/* Previous */}
                                <button
                                    onClick={prevPage}
                                    disabled={currentPage === 1}
                                    className="px-3 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    Previous
                                </button>

                                {/* Page Numbers */}
                                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
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
                                            className={`px-3 py-2 text-sm rounded-lg
                                            ${currentPage === pageNumber
                                                    ? "bg-blue-600 text-white"
                                                    : "border border-gray-300 hover:bg-gray-50"
                                                }`}
                                        >
                                            {pageNumber}
                                        </button>
                                    );
                                })}

                                {/* Ellipsis */}
                                {totalPages > 5 && currentPage < totalPages - 2 && (
                                    <span className="px-2 py-2 text-sm text-gray-500">...</span>
                                )}

                                {/* Last Page */}
                                {totalPages > 5 && currentPage < totalPages - 2 && (
                                    <button
                                        onClick={() => paginate(totalPages)}
                                        className={`px-3 py-2 text-sm rounded-lg
                                         ${currentPage === totalPages
                                                ? "bg-blue-600 text-white"
                                                : "border border-gray-300 hover:bg-gray-50"
                                            }`}
                                    >
                                        {totalPages}
                                    </button>
                                )}

                                {/* Next */}
                                <button
                                    onClick={nextPage}
                                    disabled={currentPage === totalPages}
                                    className="px-3 py-2 text-sm border border-gray-300 rounded-lg
                     hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    Next
                                </button>
                            </div>
                        </div>
                    </div>
                )}
                <GlobalModelP
                    isOpen={isAddModelOpen}
                    onClose={() => setIsAddModelOpen(false)}
                    header="Add New Project"
                    onSubmit={handleAddProject}
                    disabled={loadingCreateProject}
                    submitText={loadingCreateProject ?
                        <StyledSpinner
                            borderWidth='3px'
                            size='1.5rem'
                            text='Adding...'
                            fontSize='semi bold'
                        /> :
                        'Add Project'
                    }
                    size="large"
                >
                    <div>
                        <RenderHtmlFieldsP
                            fieldItems={addProjectJsonConfig}
                            formData={projectFormData}
                            handleInputChange={handleProjectInputChange}
                        />
                    </div>
                </GlobalModelP>
            </div>
        </div>
    );
};

export default ProjectContent1v1;