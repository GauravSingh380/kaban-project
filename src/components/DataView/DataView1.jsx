import React, { useState, useMemo } from 'react';
import {
    Plus, Search, Filter, MoreHorizontal, Calendar, Users, Bug, AlertCircle,
    CheckCircle2, Clock, TrendingUp, TrendingDown, FolderOpen, Settings, Eye,
    Edit, Trash2, Archive, Star, GitBranch, Activity, Target, Download, Upload, X,
    Grid3X3, List, ChevronLeft, ChevronRight
} from 'lucide-react';

// Reusable Data Management Component
const DataView1 = ({
    title,
    subtitle,
    data,
    columns,
    cardConfig,
    statsConfig,
    searchFields,
    filterOptions,
    sortOptions,
    onAdd,
    onEdit,
    onDelete,
    onView,
    onBulkAction,
    itemsPerPage = 12,
    enableExport = true,
    enableSelection = true,
    enableStarring = false,
    customActions = [],
    className = ""
}) => {
    // State management
    const [searchTerm, setSearchTerm] = useState('');
    const [filters, setFilters] = useState({});
    const [sortBy, setSortBy] = useState(sortOptions?.[0]?.value || '');
    const [viewMode, setViewMode] = useState('grid');
    const [selectedItems, setSelectedItems] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);

    // Initialize filters
    React.useEffect(() => {
        if (filterOptions && Object.keys(filters).length === 0) {
            const initialFilters = {};
            filterOptions.forEach(option => {
                initialFilters[option.key] = 'all';
            });
            setFilters(initialFilters);
        }
    }, [filterOptions]);

    // Data filtering and sorting
    const filteredAndSortedData = useMemo(() => {
        let result = [...data];

        // Apply search
        if (searchTerm && searchFields) {
            result = result.filter(item => 
                searchFields.some(field => {
                    const value = getNestedValue(item, field);
                    return value?.toString().toLowerCase().includes(searchTerm.toLowerCase());
                })
            );
        }

        // Apply filters
        Object.entries(filters).forEach(([key, value]) => {
            if (value !== 'all') {
                result = result.filter(item => getNestedValue(item, key) === value);
            }
        });

        // Apply sorting
        if (sortBy && sortOptions) {
            const sortOption = sortOptions.find(option => option.value === sortBy);
            if (sortOption) {
                result.sort((a, b) => {
                    const aValue = getNestedValue(a, sortOption.field);
                    const bValue = getNestedValue(b, sortOption.field);
                    
                    if (sortOption.type === 'string') {
                        return sortOption.reverse 
                            ? bValue.localeCompare(aValue)
                            : aValue.localeCompare(bValue);
                    } else if (sortOption.type === 'number') {
                        return sortOption.reverse ? bValue - aValue : aValue - bValue;
                    } else if (sortOption.type === 'date') {
                        return sortOption.reverse 
                            ? new Date(bValue) - new Date(aValue)
                            : new Date(aValue) - new Date(bValue);
                    }
                    return 0;
                });
            }
        }

        return result;
    }, [data, searchTerm, filters, sortBy, searchFields, sortOptions]);

    // Pagination
    const totalPages = Math.ceil(filteredAndSortedData.length / itemsPerPage);
    const paginatedData = filteredAndSortedData.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    // Utility functions
    const getNestedValue = (obj, path) => {
        return path.split('.').reduce((current, key) => current?.[key], obj);
    };

    const formatValue = (value, type, options = {}) => {
        if (value === null || value === undefined) return '-';
        
        switch (type) {
            case 'currency':
                return new Intl.NumberFormat('en-US', {
                    style: 'currency',
                    currency: options.currency || 'USD'
                }).format(value);
            case 'date':
                return new Date(value).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric'
                });
            case 'percentage':
                return `${value}%`;
            case 'number':
                return value.toLocaleString();
            default:
                return value;
        }
    };

    const getStatusBadgeClass = (value, config) => {
        if (!config) return 'text-gray-600 bg-gray-50 border-gray-200';
        const statusConfig = config[value];
        return statusConfig || 'text-gray-600 bg-gray-50 border-gray-200';
    };

    // Selection handlers
    const toggleSelection = (itemId) => {
        setSelectedItems(prev =>
            prev.includes(itemId)
                ? prev.filter(id => id !== itemId)
                : [...prev, itemId]
        );
    };

    const toggleSelectAll = () => {
        setSelectedItems(
            selectedItems.length === paginatedData.length 
                ? [] 
                : paginatedData.map(item => item.id)
        );
    };

    const clearFilters = () => {
        setSearchTerm('');
        const resetFilters = {};
        filterOptions?.forEach(option => {
            resetFilters[option.key] = 'all';
        });
        setFilters(resetFilters);
        setCurrentPage(1);
    };

    // Render statistics
    const renderStats = () => {
        if (!statsConfig) return null;

        return (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                {statsConfig.map((stat, index) => {
                    const value = stat.calculate ? stat.calculate(data) : getNestedValue(data, stat.field);
                    return (
                        <div key={index} className="bg-white p-4 rounded-lg border border-gray-200">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                                    <p className="text-2xl font-bold text-gray-900">
                                        {formatValue(value, stat.type, stat.options)}
                                    </p>
                                </div>
                                <div className={`p-3 rounded-full ${stat.bgColor || 'bg-blue-100'}`}>
                                    <stat.icon className={`w-6 h-6 ${stat.iconColor || 'text-blue-600'}`} />
                                </div>
                            </div>
                            {stat.subtitle && (
                                <p className="text-xs text-gray-500 mt-2">{stat.subtitle}</p>
                            )}
                        </div>
                    );
                })}
            </div>
        );
    };

    // Render card view
    const renderCard = (item) => {
        if (!cardConfig) return null;

        return (
            <div key={item.id} className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                <div className="p-6">
                    {/* Card Header */}
                    <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3 flex-1">
                            {enableSelection && (
                                <input
                                    type="checkbox"
                                    checked={selectedItems.includes(item.id)}
                                    onChange={() => toggleSelection(item.id)}
                                    className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                                />
                            )}
                            <div className="flex-1">
                                <h3 className="font-semibold text-gray-900 text-lg mb-1">
                                    {getNestedValue(item, cardConfig.title)}
                                </h3>
                                {cardConfig.subtitle && (
                                    <p className="text-sm text-gray-600 mb-2">
                                        {getNestedValue(item, cardConfig.subtitle)}
                                    </p>
                                )}
                                {cardConfig.description && (
                                    <p className="text-sm text-gray-500">
                                        {getNestedValue(item, cardConfig.description)}
                                    </p>
                                )}
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            {enableStarring && (
                                <button className="p-1 text-gray-400 hover:text-yellow-500 hover:bg-gray-100 rounded-full">
                                    <Star className="w-4 h-4" />
                                </button>
                            )}
                            <button className="p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full">
                                <MoreHorizontal className="w-4 h-4" />
                            </button>
                        </div>
                    </div>

                    {/* Card Body */}
                    {cardConfig.fields && (
                        <div className="space-y-4">
                            {cardConfig.fields.map((field, index) => (
                                <div key={index}>
                                    {field.type === 'badges' && (
                                        <div className="flex flex-wrap gap-2">
                                            {field.items.map((badgeField, badgeIndex) => {
                                                const value = getNestedValue(item, badgeField.field);
                                                return (
                                                    <span
                                                        key={badgeIndex}
                                                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusBadgeClass(value, badgeField.config)}`}
                                                    >
                                                        {badgeField.icon && <badgeField.icon className="w-3 h-3 mr-1" />}
                                                        {formatValue(value, badgeField.type)}
                                                    </span>
                                                );
                                            })}
                                        </div>
                                    )}
                                    {field.type === 'progress' && (
                                        <div>
                                            <div className="flex justify-between items-center mb-2">
                                                <span className="text-sm font-medium text-gray-700">{field.label}</span>
                                                <span className="text-sm font-medium text-gray-900">
                                                    {formatValue(getNestedValue(item, field.field), field.valueType)}
                                                </span>
                                            </div>
                                            <div className="w-full bg-gray-200 rounded-full h-2">
                                                <div
                                                    className={`h-2 rounded-full transition-all duration-300 ${field.getColor ? field.getColor(getNestedValue(item, field.field)) : 'bg-blue-500'}`}
                                                    style={{ width: `${getNestedValue(item, field.field)}%` }}
                                                />
                                            </div>
                                        </div>
                                    )}
                                    {field.type === 'grid' && (
                                        <div className={`grid grid-cols-${field.columns || 2} gap-4`}>
                                            {field.items.map((gridItem, gridIndex) => (
                                                <div key={gridIndex}>
                                                    <p className="text-xs text-gray-500 mb-1">{gridItem.label}</p>
                                                    <p className="text-sm font-medium text-gray-900">
                                                        {formatValue(getNestedValue(item, gridItem.field), gridItem.type, gridItem.options)}
                                                    </p>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                    {field.type === 'tags' && (
                                        <div className="flex flex-wrap gap-1">
                                            {getNestedValue(item, field.field)?.map((tag, tagIndex) => (
                                                <span key={tagIndex} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                    {field.type === 'avatars' && (
                                        <div>
                                            <div className="flex justify-between items-center mb-2">
                                                <span className="text-xs text-gray-500">{field.label}</span>
                                                <span className="text-xs text-gray-500">
                                                    {getNestedValue(item, field.field)?.length} {field.suffix || 'items'}
                                                </span>
                                            </div>
                                            <div className="flex -space-x-2">
                                                {getNestedValue(item, field.field)?.slice(0, field.maxShow || 4).map((avatar, avatarIndex) => (
                                                    <div
                                                        key={avatarIndex}
                                                        className="w-8 h-8 rounded-full bg-blue-500 text-white text-xs flex items-center justify-center border-2 border-white"
                                                        title={avatar.name}
                                                    >
                                                        {avatar.avatar}
                                                    </div>
                                                ))}
                                                {getNestedValue(item, field.field)?.length > (field.maxShow || 4) && (
                                                    <div className="w-8 h-8 rounded-full bg-gray-500 text-white text-xs flex items-center justify-center border-2 border-white">
                                                        +{getNestedValue(item, field.field).length - (field.maxShow || 4)}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Card Actions */}
                    <div className="flex justify-between items-center pt-4 border-t border-gray-100 mt-4">
                        <button
                            onClick={() => onView?.(item)}
                            className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800"
                        >
                            <Eye className="w-4 h-4" />
                            View Details
                        </button>
                        <div className="flex gap-2">
                            {customActions.map((action, index) => (
                                <button
                                    key={index}
                                    onClick={() => action.handler(item)}
                                    className={`p-2 rounded-full ${action.className || 'text-gray-400 hover:text-gray-600 hover:bg-gray-100'}`}
                                    title={action.title}
                                >
                                    <action.icon className="w-4 h-4" />
                                </button>
                            ))}
                            <button
                                onClick={() => onEdit?.(item)}
                                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full"
                            >
                                <Edit className="w-4 h-4" />
                            </button>
                            <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full">
                                <Archive className="w-4 h-4" />
                            </button>
                            <button
                                onClick={() => onDelete?.(item)}
                                className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-full"
                            >
                                <Trash2 className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    // Render table row
    const renderTableRow = (item) => {
        if (!columns) return null;

        return (
            <div key={item.id} className="bg-white border-b border-gray-200 hover:bg-gray-50 transition-colors">
                <div className="px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 flex-1">
                            {enableSelection && (
                                <input
                                    type="checkbox"
                                    checked={selectedItems.includes(item.id)}
                                    onChange={() => toggleSelection(item.id)}
                                    className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                                />
                            )}
                            {columns.slice(0, 1).map((column, index) => (
                                <div key={index} className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 mb-1">
                                        <h3 className="font-semibold text-gray-900">
                                            {formatValue(getNestedValue(item, column.field), column.type, column.options)}
                                        </h3>
                                        {enableStarring && (
                                            <button className="p-1 text-gray-400 hover:text-yellow-500 hover:bg-gray-100 rounded-full">
                                                <Star className="w-4 h-4" />
                                            </button>
                                        )}
                                    </div>
                                    {column.subtitle && (
                                        <p className="text-sm text-gray-600 truncate">
                                            {formatValue(getNestedValue(item, column.subtitle), 'text')}
                                        </p>
                                    )}
                                </div>
                            ))}
                        </div>

                        <div className="flex items-center gap-6">
                            {columns.slice(1).map((column, index) => (
                                <div key={index} className="text-center">
                                    {column.type === 'progress' ? (
                                        <div className="text-center">
                                            <p className="text-sm font-medium text-gray-900">
                                                {formatValue(getNestedValue(item, column.field), 'percentage')}
                                            </p>
                                            <div className="w-20 bg-gray-200 rounded-full h-2 mt-1">
                                                <div
                                                    className={`h-2 rounded-full transition-all duration-300 ${column.getColor ? column.getColor(getNestedValue(item, column.field)) : 'bg-blue-500'}`}
                                                    style={{ width: `${getNestedValue(item, column.field)}%` }}
                                                />
                                            </div>
                                        </div>
                                    ) : column.type === 'badge' ? (
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusBadgeClass(getNestedValue(item, column.field), column.config)}`}>
                                            {formatValue(getNestedValue(item, column.field), 'text')}
                                        </span>
                                    ) : (
                                        <div className="text-right">
                                            <p className="text-sm font-medium text-gray-900">
                                                {formatValue(getNestedValue(item, column.field), column.type, column.options)}
                                            </p>
                                            {column.subtitle && (
                                                <p className="text-xs text-gray-500">
                                                    {formatValue(getNestedValue(item, column.subtitle), column.subtitleType)}
                                                </p>
                                            )}
                                        </div>
                                    )}
                                </div>
                            ))}

                            <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full">
                                <MoreHorizontal className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className={`max-w-7xl mx-auto ${className}`}>
            {/* Header */}
            <div className="mb-8">
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
                        {subtitle && <p className="text-gray-600 mt-1">{subtitle}</p>}
                    </div>
                    {onAdd && (
                        <button
                            onClick={onAdd}
                            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                        >
                            <Plus className="w-4 h-4" />
                            Add New
                        </button>
                    )}
                </div>

                {/* Search and Filters */}
                <div className="flex flex-col sm:flex-row gap-4 mb-6">
                    {/* Search */}
                    {searchFields && (
                        <div className="flex-1 relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                            <input
                                type="text"
                                placeholder="Search..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                    )}

                    <div className="flex gap-2">
                        {/* Filter Dropdowns */}
                        {filterOptions?.map((option, index) => (
                            <select
                                key={index}
                                value={filters[option.key] || 'all'}
                                onChange={(e) => setFilters(prev => ({ ...prev, [option.key]: e.target.value }))}
                                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            >
                                {option.options.map(opt => (
                                    <option key={opt.value} value={opt.value}>
                                        {opt.label}
                                    </option>
                                ))}
                            </select>
                        ))}

                        {/* Sort Dropdown */}
                        {sortOptions && (
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            >
                                {sortOptions.map(option => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                        )}

                        {/* Clear Filters */}
                        <button
                            onClick={clearFilters}
                            className="flex items-center space-x-2 px-3 py-2 text-gray-600 hover:text-gray-800"
                        >
                            <X className="w-4 h-4" />
                            <span>Clear</span>
                        </button>
                    </div>
                </div>

                {/* Selection and View Controls */}
                <div className="flex justify-between items-center mb-6">
                    <div className="flex items-center gap-4">
                        {enableSelection && (
                            <>
                                <div className="flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        checked={selectedItems.length === paginatedData.length && paginatedData.length > 0}
                                        onChange={toggleSelectAll}
                                        className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                                    />
                                    <span className="text-sm text-gray-600">
                                        {selectedItems.length > 0 ? `${selectedItems.length} selected` : 'Select all'}
                                    </span>
                                </div>

                                {selectedItems.length > 0 && onBulkAction && (
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
                            </>
                        )}
                    </div>

                    {/* View Mode Toggle */}
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => setViewMode('grid')}
                            className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-blue-100 text-blue-600' : 'text-gray-400 hover:text-gray-600'}`}
                        >
                            <Grid3X3 className="w-4 h-4" />
                        </button>
                        <button
                            onClick={() => setViewMode('table')}
                            className={`p-2 rounded-lg ${viewMode === 'table' ? 'bg-blue-100 text-blue-600' : 'text-gray-400 hover:text-gray-600'}`}
                        >
                            <List className="w-4 h-4" />
                        </button>
                    </div>
                </div>

                {/* Statistics */}
                {renderStats()}

                {/* Data Display */}
                {paginatedData.length === 0 ? (
                    <div className="text-center py-12">
                        <FolderOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 mb-2">No items found</h3>
                        <p className="text-gray-600 mb-4">
                            {searchTerm || Object.values(filters).some(f => f !== 'all')
                                ? 'Try adjusting your filters to see more items.'
                                : 'Get started by adding your first item.'
                            }
                        </p>
                        {onAdd && (
                            <button
                                onClick={onAdd}
                                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                            >
                                <Plus className="w-4 h-4 inline mr-2" />
                                Add New
                            </button>
                        )}
                    </div>
                ) : (
                    <>
                        {viewMode === 'grid' ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {paginatedData.map(renderCard)}
                            </div>
                        ) : (
                            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                                {/* Table Header */}
                                {columns && (
                                    <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-4">
                                                {enableSelection && (
                                                    <input
                                                        type="checkbox"
                                                        checked={selectedItems.length === paginatedData.length && paginatedData.length > 0}
                                                        onChange={toggleSelectAll}
                                                        className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                                                    />
                                                )}
                                                <span className="text-sm font-medium text-gray-900">
                                                    {columns[0]?.label}
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-6">
                                                {columns.slice(1).map((column, index) => (
                                                    <span key={index} className="text-sm font-medium text-gray-900">
                                                        {column.label}
                                                    </span>
                                                ))}
                                                <span className="text-sm font-medium text-gray-900">Actions</span>
                                            </div>
                                        </div>
                                    </div>
                                )}
                                {paginatedData.map(renderTableRow)}
                            </div>
                        )}
                    </>
                )}

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="flex justify-between items-center mt-6">
                        <p className="text-sm text-gray-600">
                            Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, filteredAndSortedData.length)} of {filteredAndSortedData.length} items
                        </p>
                        <div className="flex gap-2">
                            <button
                                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                disabled={currentPage === 1}
                                className="px-3 py-2 text-sm bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1"
                        >
                            <ChevronLeft className="w-4 h-4" />
                            Previous
                        </button>
                        
                        <div className="flex gap-1">
                            {Array.from({ length: Math.min(7, totalPages) }, (_, i) => {
                                let pageNum;
                                if (totalPages <= 7) {
                                    pageNum = i + 1;
                                } else if (currentPage <= 4) {
                                    pageNum = i + 1;
                                } else if (currentPage >= totalPages - 3) {
                                    pageNum = totalPages - 6 + i;
                                } else {
                                    pageNum = currentPage - 3 + i;
                                }

                                return (
                                    <button
                                        key={pageNum}
                                        onClick={() => setCurrentPage(pageNum)}
                                        className={`px-3 py-2 text-sm rounded-lg ${
                                            currentPage === pageNum
                                                ? 'bg-blue-600 text-white'
                                                : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                                        }`}
                                    >
                                        {pageNum}
                                    </button>
                                );
                            })}
                        </div>

                        <button
                            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                            disabled={currentPage === totalPages}
                            className="px-3 py-2 text-sm bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1"
                        >
                            Next
                            <ChevronRight className="w-4 h-4" />
                        </button>
                    </div>
                    </div>
                )}

                {/* Export/Import Actions */}
                {enableExport && (
                    <div className="flex justify-center mt-6 pt-6 border-t border-gray-200">
                        <div className="flex gap-2">
                            <button className="flex items-center gap-2 px-4 py-2 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg">
                                <Download className="w-4 h-4" />
                                Export
                            </button>
                            <button className="flex items-center gap-2 px-4 py-2 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg">
                                <Upload className="w-4 h-4" />
                                Import
                            </button>
                        </div>
                    </div>
                )}
            </div>
        {/* </div> */}
        </div>
    );
};

export default DataView1;