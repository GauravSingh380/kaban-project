import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
    Plus, Search, Calendar, FolderOpen, Trash2, Archive, X, LayoutGrid, List
} from 'lucide-react';
import { projectData } from './ProjectItems/projectData';
import { projectConfig } from '../../helper';
import GlobalModel from '../common/GlobalModel';
import RenderHtmlFields from '../common/RenderHtmlFields';
import GlobalModelP from './ProjectItems/GlobalModel';
import RenderHtmlFieldsP from './ProjectItems/RenderHtmlFields';
import { addProjectJsonConfig } from './projectComp';
import ProjectCard from './projectComp/ProjectCard';
import ProjectListItem from './projectComp/ProjectListItem';
import StatisticsCard from './projectComp/StatisticsCard';
import { useApi, useAuth } from '../../api';
import { useToast } from '../StyledAlert/ToastContext';

const ProjectsContent1 = ({ user }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [priorityFilter, setPriorityFilter] = useState('all');
    const [sortBy, setSortBy] = useState('name');
    const [viewMode, setViewMode] = useState('grid'); // grid or list
    const [showFilters, setShowFilters] = useState(false);
    const [selectedProjects, setSelectedProjects] = useState([]);
    const [isAddModelOpen, setIsAddModelOpen] = useState(false)

    const alert = useToast();
    const hasFetchedProjects = useRef(false);

    const { isAuthenticated, projectDetails, getAllProjectDetails, newProject, createNewProject } = useAuth();
    const {
        loading: loadingGetProjectDetails,
        error: errorGetProjectDetails,
        execute: executeGetProjectDetails
    } = useApi(getAllProjectDetails);
    const {
        loading: loadingCreateProject,
        error: errorCreateProject,
        execute: executeCreateProject
    } = useApi(createNewProject);

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
        // bugs: {
        //     total: 0,
        //     open: 0,
        //     critical: 0,
        //     resolved: 0
        // },
        // milestones: {
        //     total: 0,
        //     completed: 0,
        //     upcoming: 0
        // },
        client: "",
        tags: [],
        starred: false
    });

    // Mock projects data - replace with your actual data
    const [projects, setProjects] = useState([]);

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
    const handleAddProject = async () => {
        // Validate required fields
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
            console.log("apiResp------", apiResp);
            if (apiResp) {
                alert.success(`${apiResp?.message || "User updated successful!"}`);
                setProjects(prev => [...prev, apiResp.data]);

                // Reset form
                // setProjectFormData({ ...initialFormData });
                setIsAddModelOpen(false);
            }
        } catch (error) {
            if (error.message) {
                alert.error(error.message || 'An error occurred. Please try again.');
            } else {
                alert.error("Failed to get projects. Please try again.");
            }
            console.log('Failed to get projects:', error.message || error);
        }


        console.log("----form data----", projectFormData);
        // setProjects((prev) => {
        //     return [...prev, {
        //         ...projectFormData,
        //         id: prev.length + 1,
        //         // Set default values for missing optional fields
        //         bugs: {
        //             total: 0,
        //             open: 0,
        //             critical: 0,
        //             resolved: 0
        //         },
        //         milestones: {
        //             total: 0,
        //             completed: 0,
        //             upcoming: 0
        //         }
        //     }];
        // });

        // // Reset form and close modal
        // setProjectFormData({
        //     name: "",
        //     description: "",
        //     status: "",
        //     priority: "",
        //     progress: 0,
        //     startDate: "",
        //     dueDate: "",
        //     budget: 0,
        //     spent: 0,
        //     team: [],
        //     client: "",
        //     tags: [],
        //     starred: false
        // });

        // setIsAddModelOpen(false);
    };
    const getProjectDetails = useCallback(async () => {
        try {
            const apiResp = await executeGetProjectDetails();
            if (apiResp) {
                alert.success(`${apiResp?.message || "Project fetched successful!"}`);
                setProjects(apiResp?.data.projects || []);
            }
        } catch (error) {
            if (error.message) {
                alert.error(error.message || 'An error occurred. Please try again.');
            } else {
                alert.error("Failed to get projects. Please try again.");
            }
            console.log('Failed to get projects:', error.message || error);
        }
    }, [executeGetProjectDetails]);

    useEffect(() => {
        if (isAuthenticated && !loadingGetProjectDetails && !hasFetchedProjects.current) {
            hasFetchedProjects.current = true;
            getProjectDetails();
        }
    }, [isAuthenticated, projects, projectDetails, getProjectDetails, loadingGetProjectDetails]);

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
                <StatisticsCard projects={projects} />
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
                            <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-6">
                                {currentItems.map(project => (
                                    <ProjectCard key={project._id}
                                        project={project}
                                        selectedProjects={selectedProjects}
                                        toggleProjectSelection={toggleProjectSelection}
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
                                            {currentItems.map(project => (
                                                <ProjectListItem
                                                    key={project.id}
                                                    project={project}
                                                    toggleStar={toggleStar}
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
                <GlobalModelP
                    isOpen={isAddModelOpen}
                    onClose={() => setIsAddModelOpen(false)}
                    header="Add New Project"
                    onSubmit={handleAddProject}
                    submitText="Add Project"
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

export default ProjectsContent1;