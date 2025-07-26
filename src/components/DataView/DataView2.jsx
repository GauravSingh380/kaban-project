import React, { useState, useMemo } from 'react';
import {
  Plus, Search, Filter, MoreHorizontal, Calendar, Users, Bug, 
  AlertCircle, CheckCircle2, Clock, TrendingUp, TrendingDown, 
  FolderOpen, Eye, Edit, Trash2, Archive, Star, GitBranch, 
  Activity, Target, Download, Upload, X, Grid, List
} from 'lucide-react';

const DataView2 = ({
  // Data and configuration
  data = [],
  title = "Data View",
  subtitle = "Manage your data",
  
  // Column configuration for table view
  columns = [],
  
  // Card render function for grid view
  renderCard = null,
  
  // Action buttons
  onAdd = null,
  addButtonText = "Add New",
  addButtonIcon = Plus,
  
  // Search configuration
  searchFields = ['name'],
  searchPlaceholder = "Search...",
  
  // Filter configuration
  filters = [], // Array of filter objects
  
  // Sort configuration
  sortOptions = [
    { value: 'name', label: 'Sort by Name' }
  ],
  
  // Statistics cards configuration
  statsCards = [],
  
  // Selection configuration
  selectable = true,
  onSelectionChange = null,
  
  // Action handlers
  onView = null,
  onEdit = null,
  onDelete = null,
  onArchive = null,
  onStar = null,
  
  // Pagination
  pageSize = 12,
  
  // Custom bulk actions
  bulkActions = [],
  
  // View modes
  defaultViewMode = 'grid',
  allowViewModeChange = true,
  
  // Export options
  showExportOptions = true,
  onExport = null,
  
  // Empty state
  emptyStateIcon = FolderOpen,
  emptyStateTitle = "No data found",
  emptyStateMessage = "Get started by adding your first item.",
  
  // Custom styling
  className = ""
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilters, setActiveFilters] = useState({});
  const [sortBy, setSortBy] = useState(sortOptions[0]?.value || '');
  const [viewMode, setViewMode] = useState(defaultViewMode);
  const [selectedItems, setSelectedItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  // Initialize active filters with default values
  React.useEffect(() => {
    const defaultFilters = {};
    filters.forEach(filter => {
      defaultFilters[filter.key] = filter.defaultValue || 'all';
    });
    setActiveFilters(defaultFilters);
  }, [filters]);

    // Helper function to get nested values
    const getNestedValue = (obj, path) => {
      return path.split('.').reduce((current, key) => current?.[key], obj);
    };

  // Filter and search logic
  const filteredData = useMemo(() => {
    return data.filter(item => {
      // Search filter
      const matchesSearch = searchFields.some(field => {
        const value = getNestedValue(item, field);
        return value && value.toString().toLowerCase().includes(searchTerm.toLowerCase());
      });

      if (searchTerm && !matchesSearch) return false;

      // Custom filters
      return filters.every(filter => {
        const filterValue = activeFilters[filter.key];
        if (!filterValue || filterValue === 'all') return true;
        
        if (filter.filterFn) {
          return filter.filterFn(item, filterValue);
        }
        
        return getNestedValue(item, filter.key) === filterValue;
      });
    });
  }, [data, searchTerm, activeFilters, searchFields, filters]);

  // Sort logic
  const sortedData = useMemo(() => {
    if (!sortBy) return filteredData;
    
    const sortOption = sortOptions.find(option => option.value === sortBy);
    if (sortOption?.sortFn) {
      return [...filteredData].sort(sortOption.sortFn);
    }
    
    return [...filteredData].sort((a, b) => {
      const aVal = getNestedValue(a, sortBy);
      const bVal = getNestedValue(b, sortBy);
      
      if (typeof aVal === 'string') {
        return aVal.localeCompare(bVal);
      }
      
      return bVal - aVal;
    });
  }, [filteredData, sortBy, sortOptions]);

  // Pagination logic
  const totalPages = Math.ceil(sortedData.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const paginatedData = sortedData.slice(startIndex, startIndex + pageSize);


  // Selection handlers
  const toggleItemSelection = (itemId) => {
    const newSelection = selectedItems.includes(itemId)
      ? selectedItems.filter(id => id !== itemId)
      : [...selectedItems, itemId];
    
    setSelectedItems(newSelection);
    onSelectionChange?.(newSelection);
  };

  const selectAllItems = () => {
    const newSelection = selectedItems.length === paginatedData.length 
      ? [] 
      : paginatedData.map(item => item.id);
    
    setSelectedItems(newSelection);
    onSelectionChange?.(newSelection);
  };

  // Filter handlers
  const updateFilter = (key, value) => {
    setActiveFilters(prev => ({ ...prev, [key]: value }));
    setCurrentPage(1);
  };

  const clearFilters = () => {
    setSearchTerm('');
    const clearedFilters = {};
    filters.forEach(filter => {
      clearedFilters[filter.key] = filter.defaultValue || 'all';
    });
    setActiveFilters(clearedFilters);
    setCurrentPage(1);
  };

  const hasActiveFilters = searchTerm || 
    filters.some(filter => activeFilters[filter.key] !== 'all' && activeFilters[filter.key] !== filter.defaultValue);

  // Default card renderer if none provided
  const defaultCardRenderer = (item) => (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow p-6">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          {selectable && (
            <input
              type="checkbox"
              checked={selectedItems.includes(item.id)}
              onChange={() => toggleItemSelection(item.id)}
              className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
            />
          )}
          <div>
            <h3 className="font-semibold text-gray-900 text-lg mb-1">
              {item.name || item.title || 'Unnamed Item'}
            </h3>
            {item.description && (
              <p className="text-sm text-gray-600 mb-2">{item.description}</p>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2">
          {onStar && (
            <button
              onClick={() => onStar(item.id, !item.starred)}
              className={`p-1 rounded-full ${item.starred ? 'text-yellow-500' : 'text-gray-400'} hover:bg-gray-100`}
            >
              <Star className="w-4 h-4" fill={item.starred ? 'currentColor' : 'none'} />
            </button>
          )}
          <button className="p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full">
            <MoreHorizontal className="w-4 h-4" />
          </button>
        </div>
      </div>
      
      <div className="flex justify-between items-center pt-4 border-t border-gray-100">
        <div className="flex gap-2">
          {onView && (
            <button 
              onClick={() => onView(item)}
              className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800"
            >
              <Eye className="w-4 h-4" />
              View
            </button>
          )}
        </div>
        <div className="flex gap-2">
          {onEdit && (
            <button 
              onClick={() => onEdit(item)}
              className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full"
            >
              <Edit className="w-4 h-4" />
            </button>
          )}
          {onArchive && (
            <button 
              onClick={() => onArchive(item)}
              className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full"
            >
              <Archive className="w-4 h-4" />
            </button>
          )}
          {onDelete && (
            <button 
              onClick={() => onDelete(item)}
              className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-full"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );

  // Default table row renderer
  const TableRow = ({ item }) => (
    <div className="bg-white border-b border-gray-200 hover:bg-gray-50 transition-colors">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4 flex-1">
            {selectable && (
              <input
                type="checkbox"
                checked={selectedItems.includes(item.id)}
                onChange={() => toggleItemSelection(item.id)}
                className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
              />
            )}
            
            {columns.map((column, index) => (
              <div key={index} className={column.className || "flex-1"}>
                {column.render ? column.render(item) : (
                  <div>
                    {column.header === columns[0].header && (
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-gray-900">
                          {getNestedValue(item, column.key)}
                        </h3>
                        {onStar && (
                          <button
                            onClick={() => onStar(item.id, !item.starred)}
                            className={`p-1 rounded-full ${item.starred ? 'text-yellow-500' : 'text-gray-400'} hover:bg-gray-100`}
                          >
                            <Star className="w-4 h-4" fill={item.starred ? 'currentColor' : 'none'} />
                          </button>
                        )}
                      </div>
                    )}
                    {column.header !== columns[0].header && (
                      <p className="text-sm font-medium text-gray-900">
                        {getNestedValue(item, column.key)}
                      </p>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
          
          <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full">
            <MoreHorizontal className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );

  const AddButtonIcon = addButtonIcon;
  const EmptyIcon = emptyStateIcon;

  return (
    <div className={`max-w-7xl mx-auto ${className}`}>
      {/* Header */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
            <p className="text-gray-600 mt-1">{subtitle}</p>
          </div>
          {onAdd && (
            <button 
              onClick={onAdd}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
            >
              <AddButtonIcon className="w-4 h-4" />
              {addButtonText}
            </button>
          )}
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder={searchPlaceholder}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div className="flex gap-2">
            {filters.map((filter) => (
              <select
                key={filter.key}
                value={activeFilters[filter.key] || filter.defaultValue || 'all'}
                onChange={(e) => updateFilter(filter.key, e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                {filter.options.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            ))}

            {sortOptions.length > 1 && (
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
        </div>

        {/* View Toggle and Bulk Actions */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-4">
            {selectable && (
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={selectedItems.length === paginatedData.length && paginatedData.length > 0}
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
                {bulkActions.map((action, index) => (
                  <button
                    key={index}
                    onClick={() => action.onClick(selectedItems)}
                    className={`px-3 py-1 text-sm rounded ${action.className || 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                  >
                    {action.icon && <action.icon className="w-4 h-4 inline mr-1" />}
                    {action.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {allowViewModeChange && (
            <div className="flex items-center gap-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-blue-100 text-blue-600' : 'text-gray-400 hover:text-gray-600'}`}
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-blue-100 text-blue-600' : 'text-gray-400 hover:text-gray-600'}`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>

        {/* Statistics Cards */}
        {statsCards.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {statsCards.map((card, index) => (
              <div key={index} className="bg-white p-4 rounded-lg border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{card.title}</p>
                    <p className="text-2xl font-bold text-gray-900">{card.value}</p>
                  </div>
                  {card.icon && (
                    <div className={`p-3 rounded-full ${card.iconBg || 'bg-blue-100'}`}>
                      <card.icon className={`w-6 h-6 ${card.iconColor || 'text-blue-600'}`} />
                    </div>
                  )}
                </div>
                {card.subtitle && (
                  <p className="text-xs text-gray-500 mt-2">{card.subtitle}</p>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Data Display */}
        {sortedData.length === 0 ? (
          <div className="text-center py-12">
            <EmptyIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">{emptyStateTitle}</h3>
            <p className="text-gray-600 mb-4">
              {hasActiveFilters
                ? 'Try adjusting your filters to see more results.'
                : emptyStateMessage
              }
            </p>
            {onAdd && (
              <button 
                onClick={onAdd}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Plus className="w-4 h-4 inline mr-2" />
                {addButtonText}
              </button>
            )}
          </div>
        ) : (
          <>
            {viewMode === 'grid' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {paginatedData.map(item => (
                  <div key={item.id}>
                    {renderCard ? renderCard(item, {
                      selected: selectedItems.includes(item.id),
                      onSelect: () => toggleItemSelection(item.id),
                      onView: onView ? () => onView(item) : null,
                      onEdit: onEdit ? () => onEdit(item) : null,
                      onDelete: onDelete ? () => onDelete(item) : null,
                      onArchive: onArchive ? () => onArchive(item) : null,
                      onStar: onStar ? () => onStar(item.id, !item.starred) : null,
                    }) : defaultCardRenderer(item)}
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                {columns.length > 0 && (
                  <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        {selectable && (
                          <input
                            type="checkbox"
                            checked={selectedItems.length === paginatedData.length && paginatedData.length > 0}
                            onChange={selectAllItems}
                            className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                          />
                        )}
                        {columns.map((column, index) => (
                          <span key={index} className={`text-sm font-medium text-gray-900 ${column.headerClassName || 'flex-1'}`}>
                            {column.header}
                          </span>
                        ))}
                      </div>
                      <span className="text-sm font-medium text-gray-900">Actions</span>
                    </div>
                  </div>
                )}
                {paginatedData.map(item => (
                  <TableRow key={item.id} item={item} />
                ))}
              </div>
            )}
          </>
        )}

        {/* Pagination */}
        {sortedData.length > 0 && totalPages > 1 && (
          <div className="flex justify-between items-center mt-6">
            <p className="text-sm text-gray-600">
              Showing {startIndex + 1} to {Math.min(startIndex + pageSize, sortedData.length)} of {sortedData.length} results
            </p>
            <div className="flex gap-2">
              <button 
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                className="px-3 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50"
              >
                Previous
              </button>
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                const pageNum = currentPage <= 3 ? i + 1 : currentPage - 2 + i;
                if (pageNum > totalPages) return null;
                return (
                  <button
                    key={pageNum}
                    onClick={() => setCurrentPage(pageNum)}
                    className={`px-3 py-2 text-sm rounded-lg ${
                      currentPage === pageNum 
                        ? 'bg-blue-600 text-white' 
                        : 'border border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}
              <button 
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
                className="px-3 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>
        )}

        {/* Export Options */}
        {showExportOptions && (
          <div className="fixed bottom-6 right-6 flex flex-col gap-2">
            <button 
              onClick={() => onExport?.('download')}
              className="bg-white border border-gray-300 p-3 rounded-full shadow-lg hover:shadow-xl transition-shadow"
            >
              <Download className="w-5 h-5 text-gray-600" />
            </button>
            <button 
              onClick={() => onExport?.('upload')}
              className="bg-white border border-gray-300 p-3 rounded-full shadow-lg hover:shadow-xl transition-shadow"
            >
              <Upload className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DataView2;