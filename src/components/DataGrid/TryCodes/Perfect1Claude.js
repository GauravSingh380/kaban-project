import React, { useState, useEffect, useMemo } from 'react';
import { Search, Filter, Download, Eye, Edit, Trash2, Plus, ChevronLeft, ChevronRight, X, Calendar, User, MapPin, AlertCircle, Clock } from 'lucide-react';

const BugCard = ({ id, slNo, issueEnv, title, description, reportedOn, reportedBy, assignedTo, status, priority, comments, createdAt, updatedAt, isSelected, onSelect, onView, onEdit, onDelete }) => {
    const getPriorityColor = (priority) => {
        switch (priority) {
            case 'P1': return 'bg-red-100 text-red-800';
            case 'P2': return 'bg-orange-100 text-orange-800';
            case 'P3': return 'bg-yellow-100 text-yellow-800';
            case 'P4': return 'bg-green-100 text-green-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'open': return 'bg-red-100 text-red-800';
            case 'in-progress': return 'bg-blue-100 text-blue-800';
            case 'fixed': return 'bg-green-100 text-green-800';
            case 'closed': return 'bg-gray-100 text-gray-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <div className={`bg-white border-2 rounded-lg p-6 hover:shadow-md transition-all ${isSelected ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}`}>
            <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                    <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => onSelect(id)}
                        className="w-4 h-4 text-blue-600 rounded border-gray-300"
                    />
                    <div>
                        <h3 className="font-semibold text-gray-900">#{slNo} - {title}</h3>
                        <p className="text-sm text-gray-600 mt-1">{description}</p>
                    </div>
                </div>
                <div className="flex items-center space-x-2">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPriorityColor(priority)}`}>
                        {priority}
                    </span>
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(status)}`}>
                        {status}
                    </span>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="space-y-2 text-sm">
                    <div className="flex items-center space-x-2">
                        <User className="w-4 h-4 text-gray-400" />
                        <span>Reported by: {reportedBy}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <User className="w-4 h-4 text-gray-400" />
                        <span>Assigned to: {assignedTo}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        <span>Reported: {new Date(reportedOn).toLocaleDateString()}</span>
                    </div>
                </div>
                <div className="space-y-2 text-sm">
                    <div className="flex items-center space-x-2">
                        <MapPin className="w-4 h-4 text-gray-400" />
                        <span>Environment: {issueEnv.join(', ')}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4 text-gray-400" />
                        <span>Updated: {new Date(updatedAt).toLocaleDateString()}</span>
                    </div>
                </div>
            </div>

            {comments && (
                <div className="mb-4 p-3 bg-gray-50 rounded-md">
                    <p className="text-sm text-gray-700">{comments}</p>
                </div>
            )}

            <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                <div className="flex items-center space-x-1">
                    {issueEnv.map((env, index) => (
                        <span key={index} className="inline-flex px-2 py-1 text-xs font-medium rounded bg-blue-100 text-blue-800">
                            {env}
                        </span>
                    ))}
                </div>
                <div className="flex items-center space-x-2">
                    <button 
                        onClick={() => onView(id)}
                        className="text-blue-600 hover:text-blue-800"
                        title="View"
                    >
                        <Eye className="w-4 h-4" />
                    </button>
                    <button 
                        onClick={() => onEdit(id)}
                        className="text-green-600 hover:text-green-800"
                        title="Edit"
                    >
                        <Edit className="w-4 h-4" />
                    </button>
                    <button 
                        onClick={() => onDelete(id)}
                        className="text-red-600 hover:text-red-800"
                        title="Delete"
                    >
                        <Trash2 className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </div>
    );
};

const AdvancedBugTable = () => {
    // Sample bug data
    const initialBugs = [
        {
            id: 1,
            slNo: 101,
            issueEnv: ['dev', 'stg'],
            title: 'Login page crashes on invalid email',
            description: 'When entering an invalid email format, the page crashes instead of showing an error message.',
            reportedOn: '2025-07-01',
            reportedBy: 'Gaurav Singh',
            assignedTo: 'Ajeet Gupta',
            status: 'open',
            priority: 'P1',
            comments: 'Needs immediate attention, reported by QA during regression testing.',
            createdAt: '2025-07-01',
            updatedAt: '2025-07-03',
        },
        {
            id: 2,
            slNo: 102,
            issueEnv: ['demo'],
            title: 'Dashboard chart not loading',
            description: 'Chart fails to load when there are no active users in the system.',
            reportedOn: '2025-06-28',
            reportedBy: 'Priya Sharma',
            assignedTo: 'Rohit Mehta',
            status: 'fixed',
            priority: 'P2',
            comments: 'Handled edge case for empty dataset.',
            createdAt: '2025-06-28',
            updatedAt: '2025-07-02',
        },
        {
            id: 3,
            slNo: 103,
            issueEnv: ['prod'],
            title: 'Payment gateway timeout',
            description: 'Users experiencing timeout errors during payment processing.',
            reportedOn: '2025-06-30',
            reportedBy: 'Amit Kumar',
            assignedTo: 'Neha Patel',
            status: 'in-progress',
            priority: 'P1',
            comments: 'Investigating connection issues with payment provider.',
            createdAt: '2025-06-30',
            updatedAt: '2025-07-04',
        },
        {
            id: 4,
            slNo: 104,
            issueEnv: ['dev', 'stg', 'prod'],
            title: 'Search functionality slow',
            description: 'Search results taking more than 5 seconds to load.',
            reportedOn: '2025-06-25',
            reportedBy: 'Rajesh Gupta',
            assignedTo: 'Priya Sharma',
            status: 'closed',
            priority: 'P3',
            comments: 'Optimized database queries and added indexing.',
            createdAt: '2025-06-25',
            updatedAt: '2025-07-01',
        },
        {
            id: 5,
            slNo: 105,
            issueEnv: ['demo', 'stg'],
            title: 'Profile image upload fails',
            description: 'Large images (>5MB) fail to upload without proper error message.',
            reportedOn: '2025-07-02',
            reportedBy: 'Sneha Reddy',
            assignedTo: 'Vikram Singh',
            status: 'open',
            priority: 'P4',
            comments: 'Need to implement proper file size validation.',
            createdAt: '2025-07-02',
            updatedAt: '2025-07-04',
        },
        {
            id: 6,
            slNo: 105,
            issueEnv: ['demo'],
            title: 'Profile image upload fails',
            description: 'Large images (>5MB) fail to upload without proper error message.',
            reportedOn: '2025-07-02',
            reportedBy: 'Sneha Reddy',
            assignedTo: 'Vikram Singh',
            status: 'open',
            priority: 'P4',
            comments: 'Need to implement proper file size validation.',
            createdAt: '2025-07-02',
            updatedAt: '2025-07-04',
        },
        {
            id: 7,
            slNo: 105,
            issueEnv: ['stg'],
            title: 'Profile image upload fails',
            description: 'Large images (>5MB) fail to upload without proper error message.',
            reportedOn: '2025-07-02',
            reportedBy: 'Sneha Reddy',
            assignedTo: 'Vikram Singh',
            status: 'closed',
            priority: 'P4',
            comments: 'Need to implement proper file size validation.',
            createdAt: '2025-07-02',
            updatedAt: '2025-07-04',
        }
    ];

    // State management
    const [originalData, setOriginalData] = useState(initialBugs);
    const [data, setData] = useState(initialBugs);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5);
    const [selectedRows, setSelectedRows] = useState([]);
    const [isAllSelected, setIsAllSelected] = useState(false);
    const [isIndeterminate, setIsIndeterminate] = useState(false);
    const [filters, setFilters] = useState({
        status: '',
        priority: '',
        assignedTo: '',
        reportedBy: '',
        environment: ''
    });
    const [showFilters, setShowFilters] = useState(false);

    // Get unique values for filter dropdowns
    const filterOptions = useMemo(() => ({
        statuses: [...new Set(originalData.map(item => item.status))],
        priorities: [...new Set(originalData.map(item => item.priority))],
        assignedTos: [...new Set(originalData.map(item => item.assignedTo))],
        reportedBys: [...new Set(originalData.map(item => item.reportedBy))],
        environments: [...new Set(originalData.flatMap(item => item.issueEnv))]
    }), [originalData]);

    // Filtering logic
    const filteredData = useMemo(() => {
        let filtered = originalData;

        // Search filter
        if (searchTerm) {
            filtered = filtered.filter(item =>
                Object.values(item).some(value => {
                    if (Array.isArray(value)) {
                        return value.some(v => v.toString().toLowerCase().includes(searchTerm.toLowerCase()));
                    }
                    return value.toString().toLowerCase().includes(searchTerm.toLowerCase());
                })
            );
        }

        // Advanced filters
        if (filters.status) {
            filtered = filtered.filter(item => item.status === filters.status);
        }
        if (filters.priority) {
            filtered = filtered.filter(item => item.priority === filters.priority);
        }
        if (filters.assignedTo) {
            filtered = filtered.filter(item => item.assignedTo === filters.assignedTo);
        }
        if (filters.reportedBy) {
            filtered = filtered.filter(item => item.reportedBy === filters.reportedBy);
        }
        if (filters.environment) {
            filtered = filtered.filter(item => item.issueEnv.includes(filters.environment));
        }

        return filtered;
    }, [originalData, searchTerm, filters]);

    // Sorting logic
    const sortedData = useMemo(() => {
        if (!sortConfig.key) return filteredData;

        return [...filteredData].sort((a, b) => {
            const aValue = a[sortConfig.key];
            const bValue = b[sortConfig.key];

            if (aValue < bValue) {
                return sortConfig.direction === 'asc' ? -1 : 1;
            }
            if (aValue > bValue) {
                return sortConfig.direction === 'asc' ? 1 : -1;
            }
            return 0;
        });
    }, [filteredData, sortConfig]);

    // Pagination logic
    const paginatedData = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        return sortedData.slice(startIndex, startIndex + itemsPerPage);
    }, [sortedData, currentPage, itemsPerPage]);

    const totalPages = Math.ceil(sortedData.length / itemsPerPage);

    // Update selection states when paginated data changes
    useEffect(() => {
        const currentPageIds = paginatedData.map(item => item.id);
        const selectedInCurrentPage = selectedRows.filter(id => currentPageIds.includes(id));
        
        if (selectedInCurrentPage.length === 0) {
            setIsAllSelected(false);
            setIsIndeterminate(false);
        } else if (selectedInCurrentPage.length === currentPageIds.length) {
            setIsAllSelected(true);
            setIsIndeterminate(false);
        } else {
            setIsAllSelected(false);
            setIsIndeterminate(true);
        }
    }, [paginatedData, selectedRows]);

    // Handlers
    const handleRowSelect = (id) => {
        let newSelectedRows;
        if (selectedRows.includes(id)) {
            newSelectedRows = selectedRows.filter(rowId => rowId !== id);
        } else {
            newSelectedRows = [...selectedRows, id];
        }
        setSelectedRows(newSelectedRows);
    };

    const handleSelectAll = () => {
        if (isAllSelected || isIndeterminate) {
            // Deselect all from current page
            const currentPageIds = paginatedData.map(item => item.id);
            setSelectedRows(prev => prev.filter(id => !currentPageIds.includes(id)));
        } else {
            // Select all from current page
            const currentPageIds = paginatedData.map(item => item.id);
            setSelectedRows(prev => [...new Set([...prev, ...currentPageIds])]);
        }
    };

    const handleFilterChange = (filterType, value) => {
        setFilters(prev => ({
            ...prev,
            [filterType]: value
        }));
        setCurrentPage(1);
    };

    const clearFilters = () => {
        setFilters({
            status: '',
            priority: '',
            assignedTo: '',
            reportedBy: '',
            environment: ''
        });
        setSearchTerm('');
        setCurrentPage(1);
    };

    const exportData = () => {
        // Export selected data or all visible data
        const dataToExport = selectedRows.length > 0 
            ? sortedData.filter(item => selectedRows.includes(item.id))
            : sortedData;

        const csvContent = [
            ['ID', 'Sl No', 'Title', 'Description', 'Status', 'Priority', 'Reported By', 'Assigned To', 'Environment', 'Reported On', 'Comments'],
            ...dataToExport.map(item => [
                item.id,
                item.slNo,
                item.title,
                item.description,
                item.status,
                item.priority,
                item.reportedBy,
                item.assignedTo,
                item.issueEnv.join('; '),
                item.reportedOn,
                item.comments
            ])
        ].map(row => row.join(',')).join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `bugs_${new Date().toISOString().split('T')[0]}.csv`;
        a.click();
        window.URL.revokeObjectURL(url);
    };

    const handleAddBug = () => {
        // Placeholder for add bug functionality
        console.log('Add bug functionality to be implemented');
    };

    const handleViewBug = (id) => {
        console.log('View bug', id);
    };

    const handleEditBug = (id) => {
        console.log('Edit bug', id);
    };

    const handleDeleteBug = (id) => {
        console.log('Delete bug', id);
    };

    return (
        <div className="max-w-full mx-auto bg-gray-50 min-h-screen">
            <div className="bg-white rounded-lg shadow-lg">
                {/* Header */}
                <div className="border-b border-gray-200 p-6">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">Bug Management System</h1>
                            <p className="text-gray-600 mt-1">Track and manage bug reports efficiently</p>
                        </div>
                        <div className="mt-4 sm:mt-0 flex items-center space-x-3">
                            <button
                                onClick={exportData}
                                className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                            >
                                <Download className="w-4 h-4" />
                                <span>Export {selectedRows.length > 0 ? `(${selectedRows.length})` : 'All'}</span>
                            </button>
                            <button
                                onClick={handleAddBug}
                                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                            >
                                <Plus className="w-4 h-4" />
                                <span>Add Bug</span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Filters and Search */}
                <div className="p-6 border-b border-gray-200">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
                        <div className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                <input
                                    type="text"
                                    placeholder="Search bugs..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full sm:w-64"
                                />
                            </div>

                            <button
                                onClick={() => setShowFilters(!showFilters)}
                                className={`flex items-center space-x-2 px-4 py-2 border rounded-md ${showFilters ? 'bg-blue-50 border-blue-300 text-blue-700' : 'border-gray-300 text-gray-700'}`}
                            >
                                <Filter className="w-4 h-4" />
                                <span>Filters</span>
                            </button>

                            {(Object.values(filters).some(v => v && v !== '') || searchTerm) && (
                                <button
                                    onClick={clearFilters}
                                    className="flex items-center space-x-2 px-3 py-2 text-sm text-red-600 hover:text-red-800"
                                >
                                    <X className="w-4 h-4" />
                                    <span>Clear All</span>
                                </button>
                            )}
                        </div>

                        <div className="flex items-center space-x-4">
                            <span className="text-sm text-gray-500">
                                Showing {paginatedData.length} of {sortedData.length} results
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
                                <option value={25}>25 per page</option>
                                <option value={50}>50 per page</option>
                            </select>
                        </div>
                    </div>

                    {/* Advanced Filters */}
                    {showFilters && (
                        <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                                    <select
                                        value={filters.status}
                                        onChange={(e) => handleFilterChange('status', e.target.value)}
                                        className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                                    >
                                        <option value="">All Statuses</option>
                                        {filterOptions.statuses.map(status => (
                                            <option key={status} value={status}>{status}</option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                                    <select
                                        value={filters.priority}
                                        onChange={(e) => handleFilterChange('priority', e.target.value)}
                                        className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                                    >
                                        <option value="">All Priorities</option>
                                        {filterOptions.priorities.map(priority => (
                                            <option key={priority} value={priority}>{priority}</option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Assigned To</label>
                                    <select
                                        value={filters.assignedTo}
                                        onChange={(e) => handleFilterChange('assignedTo', e.target.value)}
                                        className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                                    >
                                        <option value="">All Assignees</option>
                                        {filterOptions.assignedTos.map(assignee => (
                                            <option key={assignee} value={assignee}>{assignee}</option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Reported By</label>
                                    <select
                                        value={filters.reportedBy}
                                        onChange={(e) => handleFilterChange('reportedBy', e.target.value)}
                                        className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                                    >
                                        <option value="">All Reporters</option>
                                        {filterOptions.reportedBys.map(reporter => (
                                            <option key={reporter} value={reporter}>{reporter}</option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Environment</label>
                                    <select
                                        value={filters.environment}
                                        onChange={(e) => handleFilterChange('environment', e.target.value)}
                                        className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                                    >
                                        <option value="">All Environments</option>
                                        {filterOptions.environments.map(env => (
                                            <option key={env} value={env}>{env}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Bulk Actions */}
                {selectedRows.length > 0 && (
                    <div className="px-6 py-4 bg-blue-50 border-b border-blue-200">
                        <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-blue-900">
                                {selectedRows.length} bug{selectedRows.length > 1 ? 's' : ''} selected
                            </span>
                            <div className="flex items-center space-x-2">
                                <button
                                    onClick={exportData}
                                    className="px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm"
                                >
                                    Export Selected
                                </button>
                                <button
                                    onClick={() => setSelectedRows([])}
                                    className="px-3 py-1 bg-gray-600 text-white rounded-md hover:bg-gray-700 text-sm"
                                >
                                    Clear Selection
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Select All Header */}
                <div className="px-6 py-3 bg-gray-50 border-b border-gray-200">
                    <div className="flex items-center space-x-3">
                        <input
                            type="checkbox"
                            checked={isAllSelected}
                            ref={checkbox => {
                                if (checkbox) checkbox.indeterminate = isIndeterminate;
                            }}
                            onChange={handleSelectAll}
                            className="w-4 h-4 text-blue-600 rounded border-gray-300"
                        />
                        <span className="text-sm font-medium text-gray-700">
                            Select all on this page
                        </span>
                    </div>
                </div>

                {/* Bug Cards */}
                <div className="p-6">
                    <div className="grid grid-cols-1 gap-6">
                        {paginatedData.map((bug) => (
                            <BugCard
                                key={bug.id}
                                {...bug}
                                isSelected={selectedRows.includes(bug.id)}
                                onSelect={handleRowSelect}
                                onView={handleViewBug}
                                onEdit={handleEditBug}
                                onDelete={handleDeleteBug}
                            />
                        ))}
                    </div>

                    {/* Pagination */}
                    <div className="mt-6 flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
                        <div className="text-sm text-gray-500">
                            Showing {paginatedData.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0} to{' '}
                            {Math.min(currentPage * itemsPerPage, sortedData.length)} of {sortedData.length} entries
                        </div>

                        <div className="flex items-center space-x-2">
                            <button
                                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                disabled={currentPage === 1}
                                className={`px-3 py-1 border rounded-md ${currentPage === 1 ? 'cursor-not-allowed bg-gray-100' : 'hover:bg-gray-50'}`}
                            >
                                <ChevronLeft className="w-4 h-4" />
                            </button>

                            {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                                let page;
                                if (totalPages <= 5) {
                                    page = i + 1;
                                } else if (currentPage <= 3) {
                                    page = i + 1;
                                } else if (currentPage >= totalPages - 2) {
                                    page = totalPages - 4 + i;
                                } else {
                                    page = currentPage - 2 + i;
                                }
                                return (
                                    <button
                                        key={page}
                                        onClick={() => setCurrentPage(page)}
                                        className={`px-3 py-1 border rounded-md ${currentPage === page ? 'bg-blue-50 border-blue-300 text-blue-600' : 'hover:bg-gray-50'}`}
                                    >
                                        {page}
                                    </button>
                                );
                            })}

                            <button
                                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                                disabled={currentPage === totalPages}
                                className={`px-3 py-1 border rounded-md ${currentPage === totalPages ? 'cursor-not-allowed bg-gray-100' : 'hover:bg-gray-50'}`}
                            >
                                <ChevronRight className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdvancedBugTable;