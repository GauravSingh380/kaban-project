import React, { useState, useEffect, useMemo } from 'react';
import {
    Search, Filter, X, ChevronLeft, ChevronRight, Download, Archive, Trash2
} from 'lucide-react';

/**
 * DataDisplay - A highly reusable component for displaying data in grid or table view
 * with search, filters, sorting, pagination, and bulk actions
 * 
 * @param {Object} props
 * @param {Array} props.data - Array of data items to display
 * @param {Array} props.columns - Column configuration for table view
 * @param {Function} props.renderGridCard - Custom render function for grid view
 * @param {Array} props.filterConfig - Filter configuration
 * @param {Array} props.sortOptions - Sort options
 * @param {Array} props.bulkActions - Bulk action buttons configuration
 * @param {Function} props.onSearch - Callback for search (for backend integration)
 * @param {Function} props.onFilter - Callback for filter change (for backend integration)
 * @param {Function} props.onSort - Callback for sort change (for backend integration)
 * @param {Function} props.onPageChange - Callback for page change (for backend integration)
 * @param {Boolean} props.serverSide - Enable server-side processing
 * @param {Number} props.totalItems - Total items count (for server-side pagination)
 * @param {Boolean} props.loading - Loading state
 * @param {String} props.emptyStateTitle - Empty state title
 * @param {String} props.emptyStateDescription - Empty state description
 * @param {React.Component} props.emptyStateIcon - Empty state icon
 */

const DataDisplay = ({
    // Data props
    data = [],
    columns = [],
    renderGridCard,

    // Filter & Search props
    filterConfig = [],
    sortOptions = [],
    searchPlaceholder = "Search...",
    searchKeys = ['name', 'email'],

    // Bulk actions
    bulkActions = [],

    // Server-side props
    serverSide = false,
    onSearch,
    onFilter,
    onSort,
    onPageChange,
    totalItems = 0,
    loading = false,

    // Customization props
    emptyStateTitle = "No data found",
    emptyStateDescription = "Try adjusting your search or filters",
    emptyStateIcon: EmptyIcon = Search,

    // View options
    enableGridView = true,
    enableTableView = true,
    defaultView = 'grid',
    defaultItemsPerPage = 6,
    itemsPerPageOptions = [6, 12, 18, 24],

    // Action callbacks
    onRowClick,
    getRowId = (item) => item.id,

    // Styling
    containerClassName = "",
    cardClassName = "",
}) => {
    // State Management
    const [searchTerm, setSearchTerm] = useState('');
    const [filters, setFilters] = useState({});
    const [sortBy, setSortBy] = useState(sortOptions[0]?.value || '');
    const [viewMode, setViewMode] = useState(defaultView);
    const [showFilters, setShowFilters] = useState(false);
    const [selectedItems, setSelectedItems] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(defaultItemsPerPage);

    // Initialize filters
    useEffect(() => {
        const initialFilters = {};
        filterConfig.forEach(filter => {
            initialFilters[filter.key] = filter.defaultValue || 'all';
        });
        setFilters(initialFilters);
    }, [filterConfig]);

    // Client-side filtering and sorting
    const processedData = useMemo(() => {
        if (serverSide) return data;

        let filtered = [...data];

        // Apply search
        if (searchTerm) {
            filtered = filtered.filter(item =>
                searchKeys.some(key => {
                    const value = key.split('.').reduce((obj, k) => obj?.[k], item);
                    return value?.toString().toLowerCase().includes(searchTerm.toLowerCase());
                })
            );
        }

        // Apply filters
        Object.keys(filters).forEach(key => {
            if (filters[key] !== 'all') {
                filtered = filtered.filter(item => {
                    const value = key.split('.').reduce((obj, k) => obj?.[k], item);
                    return value === filters[key];
                });
            }
        });

        // Apply sorting
        if (sortBy) {
            filtered.sort((a, b) => {
                const aValue = sortBy.split('.').reduce((obj, k) => obj?.[k], a);
                const bValue = sortBy.split('.').reduce((obj, k) => obj?.[k], b);

                if (typeof aValue === 'string') {
                    return aValue.localeCompare(bValue);
                }
                return aValue - bValue;
            });
        }

        return filtered;
    }, [data, searchTerm, filters, sortBy, serverSide, searchKeys]);

    // Pagination
    const paginatedData = useMemo(() => {
        if (serverSide) return data;
        const startIndex = (currentPage - 1) * itemsPerPage;
        return processedData.slice(startIndex, startIndex + itemsPerPage);
    }, [processedData, currentPage, itemsPerPage, serverSide, data]);

    const totalPages = Math.ceil((serverSide ? totalItems : processedData.length) / itemsPerPage);
    const totalCount = serverSide ? totalItems : processedData.length;

    // Handlers
    const handleSearch = (value) => {
        setSearchTerm(value);
        setCurrentPage(1);
        if (serverSide && onSearch) {
            onSearch(value);
        }
    };

    const handleFilterChange = (key, value) => {
        const newFilters = { ...filters, [key]: value };
        setFilters(newFilters);
        setCurrentPage(1);
        if (serverSide && onFilter) {
            onFilter(newFilters);
        }
    };

    const handleSortChange = (value) => {
        setSortBy(value);
        setCurrentPage(1);
        if (serverSide && onSort) {
            onSort(value);
        }
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
        if (serverSide && onPageChange) {
            onPageChange(page, itemsPerPage);
        }
    };

    const handleItemsPerPageChange = (value) => {
        setItemsPerPage(value);
        setCurrentPage(1);
        if (serverSide && onPageChange) {
            onPageChange(1, value);
        }
    };

    const clearFilters = () => {
        setSearchTerm('');
        const resetFilters = {};
        filterConfig.forEach(filter => {
            resetFilters[filter.key] = 'all';
        });
        setFilters(resetFilters);
        setCurrentPage(1);
        if (serverSide) {
            onSearch?.('');
            onFilter?.(resetFilters);
        }
    };

    const toggleItemSelection = (itemId) => {
        setSelectedItems(prev =>
            prev.includes(itemId)
                ? prev.filter(id => id !== itemId)
                : [...prev, itemId]
        );
    };

    const selectAllItems = () => {
        if (selectedItems.length === paginatedData.length) {
            setSelectedItems([]);
        } else {
            setSelectedItems(paginatedData.map(item => getRowId(item)));
        }
    };

    // Render Default Grid Card
    const renderDefaultGridCard = (item) => (
        <div
            key={getRowId(item)}
            className={`bg-white rounded-lg border border-gray-200 p-5 hover:shadow-lg transition-all duration-200 cursor-pointer ${cardClassName}`}
            onClick={() => onRowClick?.(item)}
        >
            <div className="flex items-start justify-between mb-4">
                <input
                    type="checkbox"
                    checked={selectedItems.includes(getRowId(item))}
                    onChange={(e) => {
                        e.stopPropagation();
                        toggleItemSelection(getRowId(item));
                    }}
                    className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                />
            </div>
            <pre className="text-xs overflow-auto">{JSON.stringify(item, null, 2)}</pre>
        </div>
    );

    return (
        <div className={`space-y-6 ${containerClassName}`}>
            {/* Search and Filters */}
            <div className="bg-white rounded-lg border border-gray-200 p-4">
                <div className="flex flex-col md:flex-row gap-4 mb-4">
                    <div className="flex-1 relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                            type="text"
                            placeholder={searchPlaceholder}
                            value={searchTerm}
                            onChange={(e) => handleSearch(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>

                    <div className="flex gap-2">
                        {filterConfig.length > 0 && (
                            <button
                                onClick={() => setShowFilters(!showFilters)}
                                className={`flex items-center gap-2 px-4 py-2 border rounded-lg transition-colors ${showFilters ? 'bg-blue-50 border-blue-300 text-blue-700' : 'border-gray-300 hover:bg-gray-50'
                                    }`}
                            >
                                <Filter className="w-4 h-4" />
                                Filters
                            </button>
                        )}

                        {sortOptions.length > 0 && (
                            <select
                                value={sortBy}
                                onChange={(e) => handleSortChange(e.target.value)}
                                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            >
                                {sortOptions.map(option => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                        )}

                        <button
                            onClick={clearFilters}
                            className="flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
                            <X className="w-4 h-4" />
                            Clear
                        </button>

                        {(enableGridView && enableTableView) && (
                            <div className="flex border border-gray-300 rounded-lg overflow-hidden">
                                <button
                                    onClick={() => setViewMode('grid')}
                                    className={`px-3 py-2 transition-colors ${viewMode === 'grid' ? 'bg-blue-500 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'
                                        }`}
                                >
                                    <div className="grid grid-cols-2 gap-1">
                                        <div className="w-2 h-2 bg-current rounded-sm"></div>
                                        <div className="w-2 h-2 bg-current rounded-sm"></div>
                                        <div className="w-2 h-2 bg-current rounded-sm"></div>
                                        <div className="w-2 h-2 bg-current rounded-sm"></div>
                                    </div>
                                </button>
                                <button
                                    onClick={() => setViewMode('list')}
                                    className={`px-3 py-2 transition-colors ${viewMode === 'list' ? 'bg-blue-500 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'
                                        }`}
                                >
                                    <div className="space-y-1">
                                        <div className="w-4 h-0.5 bg-current"></div>
                                        <div className="w-4 h-0.5 bg-current"></div>
                                        <div className="w-4 h-0.5 bg-current"></div>
                                    </div>
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                {/* Advanced Filters */}
                {showFilters && filterConfig.length > 0 && (
                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {filterConfig.map(filter => (
                                <div key={filter.key}>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        {filter.label}
                                    </label>
                                    <select
                                        value={filters[filter.key] || 'all'}
                                        onChange={(e) => handleFilterChange(filter.key, e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                    >
                                        {filter.options.map(option => (
                                            <option key={option.value} value={option.value}>
                                                {option.label}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Bulk Actions */}
            {selectedItems.length > 0 && bulkActions.length > 0 && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <span className="text-sm font-medium text-blue-700">
                                {selectedItems.length} item{selectedItems.length !== 1 ? 's' : ''} selected
                            </span>
                            <button
                                onClick={selectAllItems}
                                className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                            >
                                {selectedItems.length === paginatedData.length ? 'Deselect All' : 'Select All'}
                            </button>
                        </div>
                        <div className="flex gap-2">
                            {bulkActions.map((action, index) => (
                                <button
                                    key={index}
                                    onClick={() => action.onClick(selectedItems)}
                                    className={`px-4 py-2 rounded-lg transition-colors text-sm font-medium ${action.className || 'bg-blue-600 text-white hover:bg-blue-700'}`}
                                >
                                    {action.icon && <action.icon className="w-4 h-4 inline mr-2" />}
                                    {action.label}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* Results Info */}
            <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">
                    Showing {paginatedData.length} of {totalCount} items
                </span>
                <select
                    value={itemsPerPage}
                    onChange={(e) => handleItemsPerPageChange(Number(e.target.value))}
                    className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500"
                >
                    {itemsPerPageOptions.map(option => (
                        <option key={option} value={option}>{option} per page</option>
                    ))}
                </select>
            </div>

            {/* Data Display */}
            {loading ? (<div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>) :
                (paginatedData.length > 0 ? (
                    viewMode === 'grid' ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {paginatedData.map(item =>
                                renderGridCard ? renderGridCard(item, selectedItems, toggleItemSelection, getRowId) : renderDefaultGridCard(item)
                            )}
                        </div>
                    ) : (
                        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            <input
                                                type="checkbox"
                                                checked={selectedItems.length === paginatedData.length}
                                                onChange={selectAllItems}
                                                className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                                            />
                                        </th>
                                        {columns.map((column, index) => (
                                            <th
                                                key={index}
                                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                            >
                                                {column.label}
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {paginatedData.map(item => (
                                        <tr
                                            key={getRowId(item)}
                                            className="hover:bg-gray-50 transition-colors cursor-pointer"
                                            onClick={() => onRowClick?.(item)}
                                        >
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <input
                                                    type="checkbox"
                                                    checked={selectedItems.includes(getRowId(item))}
                                                    onChange={(e) => {
                                                        e.stopPropagation();
                                                        toggleItemSelection(getRowId(item));
                                                    }}
                                                    className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                                                />
                                            </td>
                                            {columns.map((column, index) => (
                                                <td key={index} className="px-6 py-4 whitespace-nowrap">
                                                    {column.render ? column.render(item) : (
                                                        <span className="text-sm text-gray-900">
                                                            {column.key.split('.').reduce((obj, k) => obj?.[k], item)}
                                                        </span>
                                                    )}
                                                </td>
                                            ))}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )
                ) : (
                    <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
                        <EmptyIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 mb-2">{emptyStateTitle}</h3>
                        <p className="text-gray-500 mb-6">{emptyStateDescription}</p>
                        <button
                            onClick={clearFilters}
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            Clear Filters
                        </button>
                    </div>
                )
                )}
            {/* Pagination */}
            {totalPages > 1 && (
                <div className="bg-white rounded-lg border border-gray-200 px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div className="text-sm text-gray-700">
                            Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, totalCount)} of {totalCount} results
                        </div>
                        <div className="flex items-center space-x-2">
                            <button
                                onClick={() => handlePageChange(currentPage - 1)}
                                disabled={currentPage === 1}
                                className="flex items-center px-4 py-2 text-sm border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
                            >
                                <ChevronLeft className="w-4 h-4 mr-1" />
                                Previous
                            </button>

                            <div className="flex items-center space-x-1">
                                {[...Array(totalPages)].map((_, index) => {
                                    const page = index + 1;
                                    const isVisible = page === 1 || page === totalPages || (page >= currentPage - 2 && page <= currentPage + 2);

                                    if (!isVisible) {
                                        if (page === currentPage - 3 || page === currentPage + 3) {
                                            return <span key={page} className="px-2 text-gray-400">...</span>;
                                        }
                                        return null;
                                    }

                                    return (
                                        <button
                                            key={page}
                                            onClick={() => handlePageChange(page)}
                                            className={`px-4 py-2 text-sm border rounded-lg transition-colors ${currentPage === page
                                                ? 'bg-blue-600 text-white border-blue-600'
                                                : 'border-gray-300 hover:bg-gray-50'
                                                }`}
                                        >
                                            {page}
                                        </button>
                                    );
                                })}
                            </div>

                            <button
                                onClick={() => handlePageChange(currentPage + 1)}
                                disabled={currentPage === totalPages}
                                className="flex items-center px-4 py-2 text-sm border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
                            >
                                Next
                                <ChevronRight className="w-4 h-4 ml-1" />
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DataDisplay;