import React, { useState, useEffect } from 'react';
import {
    Plus, Search, Filter, MoreHorizontal, Calendar, Users, Bug, AlertCircle,
    CheckCircle2, Clock, TrendingUp, TrendingDown, FolderOpen, Settings,
    Eye, Edit, Trash2, Archive, Star, GitBranch, Activity, Target,
    Download, Upload, X
} from 'lucide-react';

const DataView3 = ({
    // Required props
    title,
    description,
    data,
    columns,
    
    // Optional props with defaults
    addButtonText = "Add New",
    onAddClick = () => {},
    onEditClick = () => {},
    onDeleteClick = () => {},
    onViewClick = () => {},
    onArchiveClick = () => {},
    onStarClick = () => {},
    onBulkAction = () => {},
    onSearch = () => {},
    onFilter = () => {},
    onSort = () => {},
    
    // Display options
    defaultViewMode = 'grid', // 'grid' or 'list'
    enableViewToggle = true,
    enableSelection = true,
    enablePagination = true,
    enableExport = true,
    enableStats = true,
    
    // Filter options
    filterOptions = {
        status: [],
        priority: []
    },
    
    // Custom renderers
    renderGridItem = null,
    renderListItem = null,
    renderStats = null,
    
    // Pagination
    itemsPerPage = 10,
    
    // Icons
    icons = {
        add: Plus,
        search: Search,
        filter: Filter,
        grid: FolderOpen,
        list: GitBranch,
        view: Eye,
        edit: Edit,
        delete: Trash2,
        archive: Archive,
        star: Star,
        download: Download,
        upload: Upload
    }
}) => {
    // State management
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [priorityFilter, setPriorityFilter] = useState('all');
    const [sortBy, setSortBy] = useState('name');
    const [viewMode, setViewMode] = useState(defaultViewMode);
    const [showFilters, setShowFilters] = useState(false);
    const [selectedItems, setSelectedItems] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);

    // Derived data
    const filteredData = data.filter(item => {
        const matchesSearch = columns.some(col => 
            String(item[col.key]).toLowerCase().includes(searchTerm.toLowerCase())
        );
        
        const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
        const matchesPriority = priorityFilter === 'all' || item.priority === priorityFilter;
        
        return matchesSearch && matchesStatus && matchesPriority;
    });

    const sortedData = [...filteredData].sort((a, b) => {
        if (sortBy === 'name') return a.name.localeCompare(b.name);
        if (sortBy === 'priority') {
            const priorityOrder = { 'critical': 4, 'high': 3, 'medium': 2, 'low': 1 };
            return priorityOrder[b.priority] - priorityOrder[a.priority];
        }
        if (sortBy === 'progress') return b.progress - a.progress;
        if (sortBy === 'dueDate') return new Date(a.dueDate) - new Date(b.dueDate);
        if (sortBy === 'budget') return b.budget - a.budget;
        return 0;
    });

    // Pagination logic
    const totalPages = Math.ceil(sortedData.length / itemsPerPage);
    const paginatedData = enablePagination 
        ? sortedData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
        : sortedData;

    // Helper functions
    const toggleSelection = (itemId) => {
        setSelectedItems(prev =>
            prev.includes(itemId)
                ? prev.filter(id => id !== itemId)
                : [...prev, itemId]
        );
    };

    const selectAllItems = () => {
        setSelectedItems(selectedItems.length === sortedData.length 
            ? [] 
            : sortedData.map(item => item.id)
        );
    };

    const clearFilters = () => {
        setSearchTerm('');
        setStatusFilter('all');
        setPriorityFilter('all');
    };

    // Default renderers if not provided
    const DefaultGridItem = ({ item }) => (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow p-6">
            <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                    {enableSelection && (
                        <input
                            type="checkbox"
                            checked={selectedItems.includes(item.id)}
                            onChange={() => toggleSelection(item.id)}
                            className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                        />
                    )}
                    <div>
                        <h3 className="font-semibold text-gray-900 text-lg mb-1">{item.name}</h3>
                        <p className="text-sm text-gray-600 mb-2">{item.description}</p>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => onStarClick(item)}
                        className={`p-1 rounded-full ${item.starred ? 'text-yellow-500' : 'text-gray-400'} hover:bg-gray-100`}
                    >
                        <Star className="w-4 h-4" fill={item.starred ? 'currentColor' : 'none'} />
                    </button>
                    <button className="p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full">
                        <MoreHorizontal className="w-4 h-4" />
                    </button>
                </div>
            </div>
            
            {/* Status and Priority */}
            <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="flex items-center gap-2">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(item.status)}`}>
                        {item.status.charAt(0).toUpperCase() + item.status.slice(1).replace('_', ' ')}
                    </span>
                </div>
                <div className="flex items-center gap-2">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getPriorityColor(item.priority)}`}>
                        {item.priority.charAt(0).toUpperCase() + item.priority.slice(1)}
                    </span>
                </div>
            </div>
            
            {/* Progress */}
            {item.progress !== undefined && (
                <div className="mb-4">
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium text-gray-700">Progress</span>
                        <span className="text-sm font-medium text-gray-900">{item.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                            className={`h-2 rounded-full transition-all duration-300 ${getProgressColor(item.progress)}`}
                            style={{ width: `${item.progress}%` }}
                        />
                    </div>
                </div>
            )}
            
            {/* Actions */}
            <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                <button 
                    onClick={() => onViewClick(item)}
                    className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800"
                >
                    <Eye className="w-4 h-4" />
                    View Details
                </button>
                <div className="flex gap-2">
                    <button 
                        onClick={() => onEditClick(item)}
                        className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full"
                    >
                        <Edit className="w-4 h-4" />
                    </button>
                    <button 
                        onClick={() => onArchiveClick(item)}
                        className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full"
                    >
                        <Archive className="w-4 h-4" />
                    </button>
                    <button 
                        onClick={() => onDeleteClick(item)}
                        className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-full"
                    >
                        <Trash2 className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </div>
    );

    const DefaultListItem = ({ item }) => (
        <div className="bg-white border-b border-gray-200 hover:bg-gray-50 transition-colors px-6 py-4">
            <div className="flex items-center justify-evenly">
                <div className="flex items-center gap-4 flex-1">
                    {enableSelection && (
                        <input
                            type="checkbox"
                            checked={selectedItems.includes(item.id)}
                            onChange={() => toggleSelection(item.id)}
                            className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                        />
                    )}

                    <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold text-gray-900">{item.name}</h3>
                            <button
                                onClick={() => onStarClick(item)}
                                className={`p-1 rounded-full ${item.starred ? 'text-yellow-500' : 'text-gray-400'} hover:bg-gray-100`}
                            >
                                <Star className="w-4 h-4" fill={item.starred ? 'currentColor' : 'none'} />
                            </button>
                        </div>
                        <p className="text-sm text-gray-600 truncate">{item.description}</p>
                    </div>
                </div>

                <div className="flex items-center gap-6">
                    {item.progress !== undefined && (
                        <div className="text-center">
                            <p className="text-sm font-medium text-gray-900">{item.progress}%</p>
                            <div className="w-20 bg-gray-200 rounded-full h-2 mt-1">
                                <div
                                    className={`h-2 rounded-full transition-all duration-300 ${getProgressColor(item.progress)}`}
                                    style={{ width: `${item.progress}%` }}
                                />
                            </div>
                        </div>
                    )}

                    {item.budget !== undefined && (
                        <div className="text-right">
                            <p className="text-sm font-medium text-gray-900">{formatCurrency(item.budget)}</p>
                        </div>
                    )}

                    {item.dueDate !== undefined && (
                        <div className="text-right">
                            <p className="text-sm font-medium text-gray-900">{formatDate(item.dueDate)}</p>
                        </div>
                    )}

                    <div className="flex items-center gap-2">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(item.status)}`}>
                            {item.status.charAt(0).toUpperCase() + item.status.slice(1).replace('_', ' ')}
                        </span>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getPriorityColor(item.priority)}`}>
                            {item.priority.charAt(0).toUpperCase() + item.priority.slice(1)}
                        </span>
                    </div>

                    <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full">
                        <MoreHorizontal className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </div>
    );

    const DefaultStats = () => (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-white p-4 rounded-lg border border-gray-200">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-sm font-medium text-gray-600">Total Items</p>
                        <p className="text-2xl font-bold text-gray-900">{data.length}</p>
                    </div>
                    <div className="p-3 bg-blue-100 rounded-full">
                        <FolderOpen className="w-6 h-6 text-blue-600" />
                    </div>
                </div>
            </div>
            
            <div className="bg-white p-4 rounded-lg border border-gray-200">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-sm font-medium text-gray-600">Active</p>
                        <p className="text-2xl font-bold text-gray-900">
                            {data.filter(item => item.status === 'active').length}
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
                        <p className="text-sm font-medium text-gray-600">High Priority</p>
                        <p className="text-2xl font-bold text-gray-900">
                            {data.filter(item => item.priority === 'high' || item.priority === 'critical').length}
                        </p>
                    </div>
                    <div className="p-3 bg-orange-100 rounded-full">
                        <AlertCircle className="w-6 h-6 text-orange-600" />
                    </div>
                </div>
            </div>
            
            <div className="bg-white p-4 rounded-lg border border-gray-200">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-sm font-medium text-gray-600">Avg Progress</p>
                        <p className="text-2xl font-bold text-gray-900">
                            {Math.round(data.reduce((sum, item) => sum + (item.progress || 0), 0) / data.length)}%
                        </p>
                    </div>
                    <div className="p-3 bg-purple-100 rounded-full">
                        <Target className="w-6 h-6 text-purple-600" />
                    </div>
                </div>
            </div>
        </div>
    );

    // Helper functions for styling
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
        }).format(amount || 0);
    };

    const formatDate = (dateString) => {
        if (!dateString) return '';
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    return (
        <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="mb-8">
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
                        <p className="text-gray-600 mt-1">{description}</p>
                    </div>
                    <button 
                        onClick={onAddClick}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                    >
                        <Plus className="w-4 h-4" />
                        {addButtonText}
                    </button>
                </div>

                {/* Search and Filters */}
                <div className="flex flex-col sm:flex-row gap-4 mb-6">
                    <div className="flex-1 relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <input
                            type="text"
                            placeholder={`Search ${title.toLowerCase()}...`}
                            value={searchTerm}
                            onChange={(e) => {
                                setSearchTerm(e.target.value);
                                onSearch(e.target.value);
                            }}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>

                    <div className="flex gap-2">
                        {filterOptions.status.length > 0 && (
                            <select
                                value={statusFilter}
                                onChange={(e) => {
                                    setStatusFilter(e.target.value);
                                    onFilter('status', e.target.value);
                                }}
                                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            >
                                <option value="all">All Status</option>
                                {filterOptions.status.map(option => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                        )}

                        {filterOptions.priority.length > 0 && (
                            <select
                                value={priorityFilter}
                                onChange={(e) => {
                                    setPriorityFilter(e.target.value);
                                    onFilter('priority', e.target.value);
                                }}
                                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            >
                                <option value="all">All Priorities</option>
                                {filterOptions.priority.map(option => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                        )}

                        <select
                            value={sortBy}
                            onChange={(e) => {
                                setSortBy(e.target.value);
                                onSort(e.target.value);
                            }}
                            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        >
                            <option value="name">Sort by Name</option>
                            <option value="priority">Sort by Priority</option>
                            {columns.some(col => col.key === 'progress') && (
                                <option value="progress">Sort by Progress</option>
                            )}
                            {columns.some(col => col.key === 'dueDate') && (
                                <option value="dueDate">Sort by Due Date</option>
                            )}
                            {columns.some(col => col.key === 'budget') && (
                                <option value="budget">Sort by Budget</option>
                            )}
                        </select>

                        <button
                            onClick={() => setShowFilters(!showFilters)}
                            className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                        >
                            <Filter className="w-4 h-4" />
                        </button>
                        <button
                            onClick={clearFilters}
                            className="flex items-center space-x-2 px-3 py-2 text-gray-600 hover:text-gray-800"
                        >
                            <X className="w-4 h-4" />
                            <span>Clear</span>
                        </button>
                    </div>
                </div>

                {/* View Toggle and Bulk Actions */}
                <div className="flex justify-between items-center mb-6">
                    <div className="flex items-center gap-4">
                        {enableSelection && (
                            <div className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    checked={selectedItems.length === sortedData.length && sortedData.length > 0}
                                    onChange={selectAllItems}
                                    className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                                />
                                <span className="text-sm text-gray-600">
                                    {selectedItems.length > 0 ? `${selectedItems.length} selected` : 'Select all'}
                                </span>
                            </div>
                        )}

                        {selectedItems.length > 0 && (
                            <div className="flex gap-2">
                                <button 
                                    onClick={() => onBulkAction('archive', selectedItems)}
                                    className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
                                >
                                    <Archive className="w-4 h-4 inline mr-1" />
                                    Archive
                                </button>
                                <button 
                                    onClick={() => onBulkAction('delete', selectedItems)}
                                    className="px-3 py-1 text-sm bg-red-100 text-red-700 rounded hover:bg-red-200"
                                >
                                    <Trash2 className="w-4 h-4 inline mr-1" />
                                    Delete
                                </button>
                            </div>
                        )}
                    </div>

                    {enableViewToggle && (
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => setViewMode('grid')}
                                className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-blue-100 text-blue-600' : 'text-gray-400 hover:text-gray-600'}`}
                            >
                                <FolderOpen className="w-4 h-4" />
                            </button>
                            <button
                                onClick={() => setViewMode('list')}
                                className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-blue-100 text-blue-600' : 'text-gray-400 hover:text-gray-600'}`}
                            >
                                <GitBranch className="w-4 h-4" />
                            </button>
                        </div>
                    )}
                </div>

                {/* Statistics */}
                {enableStats && (renderStats ? renderStats(data) : <DefaultStats />)}

                {/* Data Display */}
                {sortedData.length === 0 ? (
                    <div className="text-center py-12">
                        <FolderOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 mb-2">No items found</h3>
                        <p className="text-gray-600 mb-4">
                            {searchTerm || statusFilter !== 'all' || priorityFilter !== 'all'
                                ? 'Try adjusting your filters to see more items.'
                                : 'Get started by adding your first item.'
                            }
                        </p>
                        <button 
                            onClick={onAddClick}
                            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            <Plus className="w-4 h-4 inline mr-2" />
                            {addButtonText}
                        </button>
                    </div>
                ) : (
                    <>
                        {viewMode === 'grid' ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {paginatedData.map(item => (
                                    renderGridItem 
                                        ? renderGridItem({ item, toggleSelection, selectedItems, enableSelection }) 
                                        : <DefaultGridItem key={item.id} item={item} />
                                ))}
                            </div>
                        ) : (
                            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                                <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-4">
                                            {enableSelection && (
                                                <input
                                                    type="checkbox"
                                                    checked={selectedItems.length === sortedData.length && sortedData.length > 0}
                                                    onChange={selectAllItems}
                                                    className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                                                />
                                            )}
                                            <span className="text-sm font-medium text-gray-900">Name</span>
                                        </div>
                                        <div className="flex items-center gap-6">
                                            {columns.some(col => col.key === 'progress') && (
                                                <span className="text-sm font-medium text-gray-900">Progress</span>
                                            )}
                                            {columns.some(col => col.key === 'budget') && (
                                                <span className="text-sm font-medium text-gray-900">Budget</span>
                                            )}
                                            {columns.some(col => col.key === 'dueDate') && (
                                                <span className="text-sm font-medium text-gray-900">Due Date</span>
                                            )}
                                            <span className="text-sm font-medium text-gray-900">Status</span>
                                            <span className="text-sm font-medium text-gray-900">Actions</span>
                                        </div>
                                    </div>
                                </div>
                                {paginatedData.map(item => (
                                    renderListItem 
                                        ? renderListItem({ item, toggleSelection, selectedItems, enableSelection }) 
                                        : <DefaultListItem key={item.id} item={item} />
                                ))}
                            </div>
                        )}
                    </>
                )}

                {/* Pagination */}
                {enablePagination && sortedData.length > 0 && (
                    <div className="flex justify-between items-center mt-6">
                        <p className="text-sm text-gray-600">
                            Showing {paginatedData.length} of {sortedData.length} items
                        </p>
                        <div className="flex gap-2">
                            <button 
                                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                                disabled={currentPage === 1}
                                className="px-3 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50"
                            >
                                Previous
                            </button>
                            
                            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                                let pageNum;
                                if (totalPages <= 5) {
                                    pageNum = i + 1;
                                } else if (currentPage <= 3) {
                                    pageNum = i + 1;
                                } else if (currentPage >= totalPages - 2) {
                                    pageNum = totalPages - 4 + i;
                                } else {
                                    pageNum = currentPage - 2 + i;
                                }
                                
                                return (
                                    <button
                                        key={pageNum}
                                        onClick={() => setCurrentPage(pageNum)}
                                        className={`px-3 py-2 text-sm ${currentPage === pageNum ? 'bg-blue-600 text-white' : 'border border-gray-300'} rounded-lg hover:bg-gray-50`}
                                    >
                                        {pageNum}
                                    </button>
                                );
                            })}
                            
                            <button 
                                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                                disabled={currentPage === totalPages}
                                className="px-3 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50"
                            >
                                Next
                            </button>
                        </div>
                    </div>
                )}

                {/* Export Options */}
                {enableExport && (
                    <div className="fixed bottom-6 right-6 flex flex-col gap-2">
                        <button className="bg-white border border-gray-300 p-3 rounded-full shadow-lg hover:shadow-xl transition-shadow">
                            <Download className="w-5 h-5 text-gray-600" />
                        </button>
                        <button className="bg-white border border-gray-300 p-3 rounded-full shadow-lg hover:shadow-xl transition-shadow">
                            <Upload className="w-5 h-5 text-gray-600" />
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default DataView3;