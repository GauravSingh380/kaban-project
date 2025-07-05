import React, { useState, useEffect, useMemo } from 'react';
import { Upload } from 'lucide-react';
import { Search, Filter, Download, Plus, ChevronLeft, ChevronRight, X, AlertCircle } from 'lucide-react';
import { initialBugs } from '../../helper';
import BugCard from './BugCard/BugCard';
import AddBugModal from './BugModel/AddBugModal';
import ImportBugModal from './ImportBugModel/ImportBugModal';
import GlobalModel from '../common/GlobalModel';
import RenderHtmlFields from '../common/RenderHtmlFields';

const BugManagementSystem = () => {
  const [originalData, setOriginalData] = useState(initialBugs);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [selectedRows, setSelectedRows] = useState([]);
  const [isAllSelected, setIsAllSelected] = useState(false);
  const [isIndeterminate, setIsIndeterminate] = useState(false);
  const [filters, setFilters] = useState({
    priority: '',
    status: '',
    assignedTo: '',
    reportedBy: '',
    environment: ''
  });
  // Add this state variable with other useState declarations in BugManagementSystem component
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModelOpen, setEditModelOpen] = useState(false);
  const [previewData, setPreviewData] = useState({});

  const [newBug, setNewBug] = useState({
    title: '',
    description: '',
    priority: '',
    status: 'open',
    reportedBy: '',
    assignedTo: '',
    issueEnv: [],
    comments: ''
  });
  const [showFilters, setShowFilters] = useState(false);

  // Get unique values for filter dropdowns
  const filterOptions = useMemo(() => ({
    priorities: [...new Set(originalData.map(item => item.priority))],
    statuses: [...new Set(originalData.map(item => item.status))],
    assignedTo: [...new Set(originalData.map(item => item.assignedTo))],
    reportedBy: [...new Set(originalData.map(item => item.reportedBy))],
    environments: [...new Set(originalData.flatMap(item => item.issueEnv))]
  }), [originalData]);

  // Filtering logic
  const filteredData = useMemo(() => {
    let filtered = originalData;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(item =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.reportedBy.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.assignedTo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.slNo.toString().includes(searchTerm) ||
        item.comments.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.status.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.priority.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Advanced filters
    if (filters.priority) {
      filtered = filtered.filter(item => item.priority === filters.priority);
    }
    if (filters.status) {
      filtered = filtered.filter(item => item.status === filters.status);
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
      let aValue = a[sortConfig.key];
      let bValue = b[sortConfig.key];

      // Handle date sorting
      if (sortConfig.key === 'reportedOn' || sortConfig.key === 'updatedAt') {
        aValue = new Date(aValue);
        bValue = new Date(bValue);
      }

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
    } else if (selectedInCurrentPage.length === paginatedData.length) {
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
    const currentPageIds = paginatedData.map(item => item.id);

    if (isAllSelected || isIndeterminate) {
      // Deselect all items from current page
      setSelectedRows(prev => prev.filter(id => !currentPageIds.includes(id)));
    } else {
      // Select all items from current page
      setSelectedRows(prev => {
        const newSelection = [...prev];
        currentPageIds.forEach(id => {
          if (!newSelection.includes(id)) {
            newSelection.push(id);
          }
        });
        return newSelection;
      });
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
      priority: '',
      status: '',
      assignedTo: '',
      reportedBy: '',
      environment: ''
    });
    setSearchTerm('');
    setCurrentPage(1);
  };

  const handleAddBug = () => {
    // Basic validation
    if (!newBug.title || !newBug.description || !newBug.priority || !newBug.status || !newBug.reportedBy || !newBug.assignedTo) {
      alert('Please fill in all required fields');
      return;
    }

    // Create new bug object
    const bug = {
      id: Math.max(...originalData.map(b => b.id)) + 1,
      slNo: Math.max(...originalData.map(b => b.slNo)) + 1,
      ...newBug,
      reportedOn: new Date().toISOString().split('T')[0],
      createdAt: new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0]
    };

    // Add to data
    const newData = [...originalData, bug];
    setOriginalData(newData);

    // Reset form and close modal
    setNewBug({
      title: '',
      description: '',
      priority: '',
      status: 'open',
      reportedBy: '',
      assignedTo: '',
      issueEnv: [],
      comments: ''
    });

    setIsAddModalOpen(false);
  };

  const exportData = () => {
    // Get the data to export (selected bugs or all filtered/sorted bugs)
    const dataToExport = selectedRows.length > 0
      ? sortedData.filter(bug => selectedRows.includes(bug.id))
      : sortedData;

    // Create CSV content
    const headers = [
      'Bug ID', 'Serial No', 'Title', 'Description', 'Priority', 'Status',
      'Reported By', 'Assigned To', 'Environment', 'Reported On', 'Comments'
    ];

    const csvContent = [
      headers.join(','),
      ...dataToExport.map(bug => [
        bug.id,
        bug.slNo,
        `"${bug.title}"`,
        `"${bug.description}"`,
        bug.priority,
        bug.status,
        bug.reportedBy,
        bug.assignedTo,
        `"${bug.issueEnv.join(', ')}"`,
        bug.reportedOn,
        `"${bug.comments}"`
      ].join(','))
    ].join('\n');

    // Create and download file
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', `bugs_${new Date().toISOString().split('T')[0]}.csv`);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const handleSort = (key) => {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  // Add this function with other handlers in BugManagementSystem component
  const handleImportBugs = (importedBugs) => {
    // Generate unique IDs and serial numbers
    const maxId = Math.max(...originalData.map(b => b.id), 0);
    const maxSlNo = Math.max(...originalData.map(b => b.slNo), 0);

    const processedBugs = importedBugs.map((bug, index) => ({
      ...bug,
      id: maxId + index + 1,
      slNo: maxSlNo + index + 1,
      // Ensure all required fields have values
      title: bug.title || 'Untitled Bug',
      description: bug.description || 'No description provided',
      priority: bug.priority || 'P3',
      status: bug.status || 'open',
      reportedBy: bug.reportedBy || 'Unknown',
      assignedTo: bug.assignedTo || 'Unassigned',
      issueEnv: Array.isArray(bug.issueEnv) ? bug.issueEnv : (bug.issueEnv ? [bug.issueEnv] : []),
      comments: bug.comments || '',
      reportedOn: bug.reportedOn || new Date().toISOString().split('T')[0],
      createdAt: bug.createdAt || new Date().toISOString().split('T')[0],
      updatedAt: bug.updatedAt || new Date().toISOString().split('T')[0]
    }));

    // Add to existing data
    setOriginalData(prev => [...prev, ...processedBugs]);
    alert(`Successfully imported ${processedBugs.length} bugs!`);
  };
  const handleInputChange = (fieldName, value) => {
    setPreviewData(prev => ({
        ...prev,
        [fieldName]: value
    }));
};
const handleEditBug = (e) => {
  e.preventDefault();
  console.log("Prev------data---", previewData)
      // Create new bug object
      const bug = {
        id: Math.max(...originalData.map(b => b.id)) + 1,
        slNo: Math.max(...originalData.map(b => b.slNo)) + 1,
        ...previewData,
        reportedOn: new Date().toISOString().split('T')[0],
        createdAt: new Date().toISOString().split('T')[0],
        updatedAt: new Date().toISOString().split('T')[0]
      };
  
      // Add to data
      const newData = [...originalData, bug];
      setOriginalData(newData);
  
      // Reset form and close modal
      setNewBug({
        title: '',
        description: '',
        priority: '',
        status: 'open',
        reportedBy: '',
        assignedTo: '',
        issueEnv: [],
        comments: ''
      });

    // Find the bug to edit
    // const bugToEdit = originalData.find(bug => bug.id === previewData.id);

    // if (bugToEdit) {
    //     // Update the bug
    //     const updatedBug = { ...bugToEdit, ...previewData };
    //     const updatedData = originalData.map(bug => bug.id === updatedBug.id ? updatedBug : bug);
    //     setOriginalData(updatedData);
    //     setEditModelOpen(false);
    //     setPreviewData({});
    // } else {
    //     alert('Bug not found!');
    // }

}

  return (
    <div className="max-w-full mx-auto bg-gray-50 min-h-screen">
      <div className="bg-white rounded-lg shadow-lg">
        {/* Header */}
        <div className="border-b border-gray-200 p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Bug Management System</h1>
              <p className="text-gray-600 mt-1">Track and manage bug reports and issues</p>
            </div>
            <div className="mt-4 sm:mt-0 flex items-center space-x-3">
              <button
                onClick={() => setIsImportModalOpen(true)}
                className="flex items-center space-x-2 px-4 py-2 cursor-pointer bg-orange-600 text-white rounded-md hover:bg-orange-700"
              >
                <Upload className="w-4 h-4" />
                <span>Import</span>
              </button>
              <button
                onClick={exportData}
                className="flex items-center space-x-2 px-4 py-2 cursor-pointer bg-green-600 text-white rounded-md hover:bg-green-700"
              >
                <Download className="w-4 h-4" />
                <span>Export ({selectedRows.length > 0 ? selectedRows.length : sortedData.length})</span>
              </button>
              <button
                onClick={() => setIsAddModalOpen(true)}
                className="flex items-center space-x-2 px-4 py-2 cursor-pointer bg-blue-600 text-white rounded-md hover:bg-blue-700"
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
                className={`flex items-center space-x-2 px-4 py-2 border rounded-md ${showFilters ? 'bg-blue-50 border-blue-300 text-blue-700' : 'border-gray-300 text-gray-700'
                  }`}
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
                <option value={15}>15 per page</option>
                <option value={20}>20 per page</option>
              </select>
            </div>
          </div>

          {/* Advanced Filters */}
          {showFilters && (
            <div className="mt-4 p-4 bg-gray-50 rounded-md">
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
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
                  <label className="block text-sm font-medium text-gray-700 mb-1">Assigned To</label>
                  <select
                    value={filters.assignedTo}
                    onChange={(e) => handleFilterChange('assignedTo', e.target.value)}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                  >
                    <option value="">All Assignees</option>
                    {filterOptions.assignedTo.map(assignee => (
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
                    {filterOptions.reportedBy.map(reporter => (
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

        {/* Selection Controls */}
        {selectedRows.length > 0 && (
          <div className="p-4 bg-blue-50 border-b border-blue-200">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-blue-900">
                {selectedRows.length} bug{selectedRows.length !== 1 ? 's' : ''} selected
              </span>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => {
                    const selectedBugs = sortedData.filter(bug => selectedRows.includes(bug.id));
                    const updatedData = originalData.map(bug =>
                      selectedRows.includes(bug.id)
                        ? { ...bug, status: 'closed', updatedAt: new Date().toISOString().split('T')[0] }
                        : bug
                    );
                    setOriginalData(updatedData);
                    setSelectedRows([]);
                  }}
                  className="px-3 py-1 text-sm bg-green-600 text-white rounded hover:bg-green-700"
                >
                  Mark as Closed
                </button>
                <button
                  onClick={() => {
                    const updatedData = originalData.filter(bug => !selectedRows.includes(bug.id));
                    setOriginalData(updatedData);
                    setSelectedRows([]);
                  }}
                  className="px-3 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700"
                >
                  Delete Selected
                </button>
                <button
                  onClick={() => setSelectedRows([])}
                  className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50"
                >
                  Clear Selection
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Table Header */}
        <div className="px-6 py-3 border-b border-gray-200 bg-gray-50">
          <div className="flex items-center">
            <div className="flex items-center mr-4">
              <input
                type="checkbox"
                checked={isAllSelected}
                ref={checkbox => {
                  if (checkbox) checkbox.indeterminate = isIndeterminate;
                }}
                onChange={handleSelectAll}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <span className="ml-2 text-sm font-medium text-gray-700">
                Select Page ({paginatedData.length})
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => handleSort('slNo')}
                className="flex items-center space-x-1 text-sm font-medium text-gray-700 hover:text-gray-900"
              >
                <span>Bug ID</span>
                <ChevronRight className={`w-4 h-4 transition-transform ${sortConfig.key === 'slNo' ?
                  (sortConfig.direction === 'asc' ? 'rotate-90' : '-rotate-90') :
                  'rotate-90 opacity-50'
                  }`} />
              </button>
              <button
                onClick={() => handleSort('priority')}
                className="flex items-center space-x-1 text-sm font-medium text-gray-700 hover:text-gray-900"
              >
                <span>Priority</span>
                <ChevronRight className={`w-4 h-4 transition-transform ${sortConfig.key === 'priority' ?
                  (sortConfig.direction === 'asc' ? 'rotate-90' : '-rotate-90') :
                  'rotate-90 opacity-50'
                  }`} />
              </button>
              <button
                onClick={() => handleSort('status')}
                className="flex items-center space-x-1 text-sm font-medium text-gray-700 hover:text-gray-900"
              >
                <span>Status</span>
                <ChevronRight className={`w-4 h-4 transition-transform ${sortConfig.key === 'status' ?
                  (sortConfig.direction === 'asc' ? 'rotate-90' : '-rotate-90') :
                  'rotate-90 opacity-50'
                  }`} />
              </button>
              <button
                onClick={() => handleSort('reportedOn')}
                className="flex items-center space-x-1 text-sm font-medium text-gray-700 hover:text-gray-900"
              >
                <span>Date</span>
                <ChevronRight className={`w-4 h-4 transition-transform ${sortConfig.key === 'reportedOn' ?
                  (sortConfig.direction === 'asc' ? 'rotate-90' : '-rotate-90') :
                  'rotate-90 opacity-50'
                  }`} />
              </button>
            </div>
          </div>
        </div>

        {/* Bug Cards */}
        <div className="p-6">
          {paginatedData.length === 0 ? (
            <div className="text-center py-12">
              <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No bugs found</h3>
              <p className="text-gray-600">Try adjusting your search or filter criteria</p>
            </div>
          ) : (
            <div className="grid gap-4">
              {paginatedData.map((bug) => (
                <BugCard
                  key={bug.id}
                  {...bug}
                  onView={(id) => alert(`View bug ${id}`)}
                  onEdit={(id) => setEditModelOpen(true)}
                  onDelete={(id) => {
                    if (window.confirm('Are you sure you want to delete this bug?')) {
                      const updatedData = originalData.filter(b => b.id !== id);
                      setOriginalData(updatedData);
                      setSelectedRows(prev => prev.filter(rowId => rowId !== id));
                    }
                  }}
                  isSelected={selectedRows.includes(bug.id)}
                  onSelect={handleRowSelect}
                />
              ))}
            </div>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="px-6 py-4 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-700">
                Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, sortedData.length)} of {sortedData.length} results
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                  className="flex items-center px-3 py-2 text-sm border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
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
                        onClick={() => setCurrentPage(page)}
                        className={`px-3 py-2 text-sm border rounded-md ${currentPage === page
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
                  onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                  disabled={currentPage === totalPages}
                  className="flex items-center px-3 py-2 text-sm border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                >
                  Next
                  <ChevronRight className="w-4 h-4 ml-1" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Add Bug Modal */}
      <AddBugModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        newBug={newBug}
        setNewBug={setNewBug}
        filterOptions={filterOptions}
        onSubmit={handleAddBug}
      />
      <GlobalModel
        isOpen={isEditModelOpen}
        onClose={() => setEditModelOpen(false)}
        header="Edit bug details"
        onSubmit={(e) => handleEditBug(e)}
        children={
        <RenderHtmlFields
        fieldItems={formConfig}
        previewData={previewData}
        handleInputChange={handleInputChange}
        />}
      />
      <ImportBugModal
        isOpen={isImportModalOpen}
        onClose={() => setIsImportModalOpen(false)}
        onSubmit={handleImportBugs}
      />
    </div>
  );
};

const formConfig = [
  {
    "id": "1",
    "type": "text",
    "label": "Bug Title",
    "name": "title",
    "required": true,
    "placeholder": "Enter bug title",
    "options": [],
    "conditions": [],
    "validations": {
      "minLength": "",
      "maxLength": "",
      "pattern": "",
      "min": "",
      "max": ""
    }
  },
  {
    "id": "2",
    "type": "textarea",
    "label": "Description",
    "name": "description",
    "required": false,
    "placeholder": "",
    "options": [],
    "conditions": [],
    "validations": {
      "minLength": "",
      "maxLength": "",
      "pattern": "",
      "min": "",
      "max": ""
    }
  },
  {
    "id": "3",
    "type": "select",
    "label": "Priority",
    "name": "priority",
    "required": false,
    "placeholder": "",
    "options": ['P1', 'P2', 'P3', 'P4'],
    "conditions": [],
    "validations": {
      "minLength": "",
      "maxLength": "",
      "pattern": "",
      "min": "",
      "max": ""
    }
  },
  {
    "id": "4",
    "type": "select",
    "label": "Status",
    "name": "status",
    "required": false,
    "placeholder": "",
    "options": ['open', 'in-progress','closed', 'fixed'],
    "conditions": [],
    "validations": {
      "minLength": "",
      "maxLength": "",
      "pattern": "",
      "min": "",
      "max": ""
    }
  },
  {
    "id": "5",
    "type": "text",
    "label": "Reported By",
    "name": "reportedBy",
    "required": true,
    "placeholder": "Enter bug title",
    "options": [],
    "conditions": [],
    "validations": {
      "minLength": "",
      "maxLength": "",
      "pattern": "",
      "min": "",
      "max": ""
    }
  },
  {
    "id": "6",
    "type": "text",
    "label": "Assigned To",
    "name": "assignedTo",
    "required": false,
    "placeholder": "",
    "options": [],
    "conditions": [],
    "validations": {
      "minLength": "",
      "maxLength": "",
      "pattern": "",
      "min": "",
      "max": ""
    }
  },
  {
    "id": "7",
    "type": "checkbox",
    "label": "Environment",
    "name": "issueEnv",
    "required": false,
    "placeholder": "",
    "options": [
      "dev",
      "prod",
      "stg",
      "demo",
    ],
    "conditions": [],
    "validations": {
      "minLength": "",
      "maxLength": "",
      "pattern": "",
      "min": "",
      "max": ""
    }
  },
  {
    "id": "8",
    "type": "textarea",
    "label": "Comments",
    "name": "comments",
    "required": false,
    "placeholder": "Enter you comments...",
    "options": [],
    "conditions": [],
    "validations": {
      "minLength": "",
      "maxLength": "",
      "pattern": "",
      "min": "",
      "max": ""
    }
  },
]

export default BugManagementSystem;