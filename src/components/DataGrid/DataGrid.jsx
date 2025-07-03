import React, { useState, useEffect, useMemo } from 'react';
import { Upload } from 'lucide-react';
import { Search, Filter, Download, Eye, Edit, Trash2, Plus, ChevronLeft, ChevronRight, X, Calendar, User, AlertCircle, Clock, Flag } from 'lucide-react';

const BugCard = ({ id, slNo, issueEnv, title, description, reportedOn, reportedBy, assignedTo, status, priority, comments, createdAt, updatedAt, onView, onEdit, onDelete, isSelected, onSelect }) => {
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
      case 'in-progress': return 'bg-yellow-100 text-yellow-800';
      case 'fixed': return 'bg-green-100 text-green-800';
      case 'closed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className={`bg-white border rounded-lg p-6 hover:shadow-md transition-shadow ${isSelected ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}`}>
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <input
            type="checkbox"
            checked={isSelected}
            onChange={() => onSelect(id)}
            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <div>
            <h3 className="font-medium text-gray-900 mb-1">{title}</h3>
            <p className="text-sm text-gray-600">Bug #{slNo}</p>
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

      <p className="text-sm text-gray-600 mb-4 line-clamp-2">{description}</p>

      <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
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
        <div className="flex items-center space-x-2">
          <Clock className="w-4 h-4 text-gray-400" />
          <span>Updated: {new Date(updatedAt).toLocaleDateString()}</span>
        </div>
      </div>

      <div className="mb-4">
        <p className="text-sm font-medium text-gray-700 mb-2">Environment:</p>
        <div className="flex flex-wrap gap-2">
          {issueEnv.map((env, index) => (
            <span key={index} className="inline-flex px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">
              {env}
            </span>
          ))}
        </div>
      </div>

      <div className="pt-4 border-t border-gray-200 flex items-center justify-between">
        <div className="text-sm text-gray-500">
          {comments && comments.length > 50 ? `${comments.substring(0, 50)}...` : comments}
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => onView(id)}
            className="text-blue-600 hover:text-blue-800 p-1"
          >
            <Eye className="w-4 h-4" />
          </button>
          <button
            onClick={() => onEdit(id)}
            className="text-green-600 hover:text-green-800 p-1"
          >
            <Edit className="w-4 h-4" />
          </button>
          <button
            onClick={() => onDelete(id)}
            className="text-red-600 hover:text-red-800 p-1"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

const AddBugModal = ({ isOpen, onClose, newBug, setNewBug, filterOptions, onSubmit }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-[rgba(0,0,0,0.50)] flex items-center justify-center z-50">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg leading-6 font-medium text-gray-900">Add New Bug</h3>
              <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
                <input
                  type="text"
                  value={newBug.title}
                  onChange={(e) => setNewBug({...newBug, title: e.target.value})}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter bug title"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description *</label>
                <textarea
                  value={newBug.description}
                  onChange={(e) => setNewBug({...newBug, description: e.target.value})}
                  rows={3}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Describe the bug"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Priority *</label>
                  <select
                    value={newBug.priority}
                    onChange={(e) => setNewBug({...newBug, priority: e.target.value})}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select Priority</option>
                    {filterOptions.priorities.map(priority => (
                      <option key={priority} value={priority}>{priority}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status *</label>
                  <select
                    value={newBug.status}
                    onChange={(e) => setNewBug({...newBug, status: e.target.value})}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select Status</option>
                    {filterOptions.statuses.map(status => (
                      <option key={status} value={status}>{status}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Reported By *</label>
                  <input
                    type="text"
                    value={newBug.reportedBy}
                    onChange={(e) => setNewBug({...newBug, reportedBy: e.target.value})}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Reporter name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Assigned To *</label>
                  <input
                    type="text"
                    value={newBug.assignedTo}
                    onChange={(e) => setNewBug({...newBug, assignedTo: e.target.value})}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Assignee name"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Environment</label>
                <div className="flex flex-wrap gap-2">
                  {filterOptions.environments.map(env => (
                    <label key={env} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={newBug.issueEnv.includes(env)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setNewBug({...newBug, issueEnv: [...newBug.issueEnv, env]});
                          } else {
                            setNewBug({...newBug, issueEnv: newBug.issueEnv.filter(e => e !== env)});
                          }
                        }}
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <span className="text-sm text-gray-700">{env}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Comments</label>
                <textarea
                  value={newBug.comments}
                  onChange={(e) => setNewBug({...newBug, comments: e.target.value})}
                  rows={2}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Additional comments"
                />
              </div>
            </div>
          </div>

          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              onClick={onSubmit}
              className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Add Bug
            </button>
            <button
              onClick={onClose}
              className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Add this ImportBugModal component after the AddBugModal component
const ImportBugModal = ({ isOpen, onClose, onSubmit }) => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [previewData, setPreviewData] = useState([]);
    const [showPreview, setShowPreview] = useState(false);
  
    if (!isOpen) return null;
  
    const handleFileSelect = (event) => {
      const file = event.target.files[0];
      if (file) {
        setSelectedFile(file);
        setShowPreview(false);
        setPreviewData([]);
      }
    };
  
    const handleFilePreview = async () => {
      if (!selectedFile) return;
  
      setIsLoading(true);
      try {
        const text = await selectedFile.text();
        const lines = text.split('\n').filter(line => line.trim());
        
        if (lines.length === 0) {
          alert('File is empty');
          return;
        }
  
        // Parse CSV
        const headers = lines[0].split(',').map(h => h.trim().replace(/"/g, ''));
        const data = lines.slice(1).map((line, index) => {
          const values = line.split(',').map(v => v.trim().replace(/"/g, ''));
          const bug = {};
          
          headers.forEach((header, i) => {
            bug[header] = values[i] || '';
          });
  
          // Generate IDs if not present
          if (!bug.id) bug.id = Date.now() + index;
          if (!bug.slNo) bug.slNo = 1000 + index;
          
          // Parse environment array
          if (bug.issueEnv && typeof bug.issueEnv === 'string') {
            bug.issueEnv = bug.issueEnv.split(',').map(env => env.trim()).filter(env => env);
          } else if (!bug.issueEnv) {
            bug.issueEnv = [];
          }
  
          // Set default dates if not present
          const today = new Date().toISOString().split('T')[0];
          if (!bug.reportedOn) bug.reportedOn = today;
          if (!bug.createdAt) bug.createdAt = today;
          if (!bug.updatedAt) bug.updatedAt = today;
  
          return bug;
        });
  
        setPreviewData(data);
        setShowPreview(true);
      } catch (error) {
        alert('Error reading file: ' + error.message);
      } finally {
        setIsLoading(false);
      }
    };
  
    const handleSubmit = () => {
      if (previewData.length === 0) {
        alert('Please select and preview a file first');
        return;
      }
  
      onSubmit(previewData);
      
      // Reset modal state
      setSelectedFile(null);
      setPreviewData([]);
      setShowPreview(false);
      onClose();
    };
  
    const handleClose = () => {
      setSelectedFile(null);
      setPreviewData([]);
      setShowPreview(false);
      onClose();
    };
  
    return (
        <div className="fixed inset-0 bg-[rgba(0,0,0,0.50)] flex items-center justify-center z-50">
        <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          {/* <div className="fixed inset-0 transition-opacity" aria-hidden="true">
            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
          </div> */}
  
          <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full">
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg leading-6 font-medium text-gray-900">Import Bugs</h3>
                <button onClick={handleClose} className="text-gray-400 hover:text-gray-600">
                  <X className="w-5 h-5" />
                </button>
              </div>
  
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Select CSV File
                  </label>
                  <div className="flex items-center space-x-4">
                    <input
                      type="file"
                      accept=".csv"
                      onChange={handleFileSelect}
                      className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                    />
                    {selectedFile && (
                      <button
                        onClick={handleFilePreview}
                        disabled={isLoading}
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
                      >
                        {isLoading ? 'Loading...' : 'Preview'}
                      </button>
                    )}
                  </div>
                  <p className="text-sm text-gray-500 mt-2">
                    CSV should contain columns: title, description, priority, status, reportedBy, assignedTo, issueEnv, comments
                  </p>
                </div>
  
                {showPreview && previewData.length > 0 && (
                  <div className="border border-gray-200 rounded-md p-4 max-h-96 overflow-y-auto">
                    <h4 className="font-medium text-gray-900 mb-3">
                      Preview ({previewData.length} bugs found)
                    </h4>
                    <div className="space-y-2">
                      {previewData.slice(0, 5).map((bug, index) => (
                        <div key={index} className="p-3 bg-gray-50 rounded border text-sm">
                          <div className="font-medium">{bug.title}</div>
                          <div className="text-gray-600">
                            Priority: {bug.priority} | Status: {bug.status} | 
                            Reported by: {bug.reportedBy} | Assigned to: {bug.assignedTo}
                          </div>
                          {bug.issueEnv && bug.issueEnv.length > 0 && (
                            <div className="text-gray-600">
                              Environment: {Array.isArray(bug.issueEnv) ? bug.issueEnv.join(', ') : bug.issueEnv}
                            </div>
                          )}
                        </div>
                      ))}
                      {previewData.length > 5 && (
                        <div className="text-center text-gray-500 text-sm">
                          ... and {previewData.length - 5} more bugs
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
  
            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
              <button
                onClick={handleSubmit}
                disabled={!showPreview || previewData.length === 0}
                className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Import {previewData.length} Bug{previewData.length !== 1 ? 's' : ''}
              </button>
              <button
                onClick={handleClose}
                className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

const BugManagementSystem = () => {
  // Initial bug data
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
      description: 'Payment processing times out after 30 seconds, causing transaction failures.',
      reportedOn: '2025-06-25',
      reportedBy: 'Amit Kumar',
      assignedTo: 'Neha Patel',
      status: 'in-progress',
      priority: 'P1',
      comments: 'Critical issue affecting revenue. Working on increasing timeout limit.',
      createdAt: '2025-06-25',
      updatedAt: '2025-07-01',
    },
    {
      id: 4,
      slNo: 104,
      issueEnv: ['dev', 'stg'],
      title: 'Email notifications not sent',
      description: 'Users are not receiving email notifications for password reset requests.',
      reportedOn: '2025-06-20',
      reportedBy: 'Ravi Gupta',
      assignedTo: 'Sunita Sharma',
      status: 'closed',
      priority: 'P3',
      comments: 'SMTP configuration issue resolved.',
      createdAt: '2025-06-20',
      updatedAt: '2025-06-22',
    },
    {
      id: 5,
      slNo: 105,
      issueEnv: ['demo', 'stg'],
      title: 'UI elements overlapping on mobile',
      description: 'On mobile devices, navigation menu overlaps with main content area.',
      reportedOn: '2025-06-15',
      reportedBy: 'Kavita Singh',
      assignedTo: 'Rajesh Kumar',
      status: 'open',
      priority: 'P4',
      comments: 'CSS responsive design needs adjustment.',
      createdAt: '2025-06-15',
      updatedAt: '2025-06-18',
    },
    {
      id: 6,
      slNo: 105,
      issueEnv: ['demo', 'stg'],
      title: 'UI elements overlapping on mobile',
      description: 'On mobile devices, navigation menu overlaps with main content area.',
      reportedOn: '2025-06-15',
      reportedBy: 'Kavita Singh',
      assignedTo: 'Rajesh Kumar',
      status: 'open',
      priority: 'P4',
      comments: 'CSS responsive design needs adjustment.',
      createdAt: '2025-06-15',
      updatedAt: '2025-06-18',
    },
    {
      id: 7,
      slNo: 105,
      issueEnv: ['demo', 'stg'],
      title: 'UI elements overlapping on mobile',
      description: 'On mobile devices, navigation menu overlaps with main content area.',
      reportedOn: '2025-06-15',
      reportedBy: 'Kavita Singh',
      assignedTo: 'Rajesh Kumar',
      status: 'open',
      priority: 'P4',
      comments: 'CSS responsive design needs adjustment.',
      createdAt: '2025-06-15',
      updatedAt: '2025-06-18',
    }
  ];

  // State management
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
        item.comments.toLowerCase().includes(searchTerm.toLowerCase())
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
                              className="flex items-center space-x-2 px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700"
                          >
                              <Upload className="w-4 h-4" />
                              <span>Import</span>
                          </button>
                          <button
                              onClick={exportData}
                              className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                          >
                              <Download className="w-4 h-4" />
                              <span>Export ({selectedRows.length > 0 ? selectedRows.length : sortedData.length})</span>
                          </button>
                          <button
                              onClick={() => setIsAddModalOpen(true)}
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
                className={`flex items-center space-x-2 px-4 py-2 border rounded-md ${
                  showFilters ? 'bg-blue-50 border-blue-300 text-blue-700' : 'border-gray-300 text-gray-700'
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
                <ChevronRight className={`w-4 h-4 transition-transform ${
                  sortConfig.key === 'slNo' ? 
                    (sortConfig.direction === 'asc' ? 'rotate-90' : '-rotate-90') : 
                    'rotate-90 opacity-50'
                }`} />
              </button>
              <button
                onClick={() => handleSort('priority')}
                className="flex items-center space-x-1 text-sm font-medium text-gray-700 hover:text-gray-900"
              >
                <span>Priority</span>
                <ChevronRight className={`w-4 h-4 transition-transform ${
                  sortConfig.key === 'priority' ? 
                    (sortConfig.direction === 'asc' ? 'rotate-90' : '-rotate-90') : 
                    'rotate-90 opacity-50'
                }`} />
              </button>
              <button
                onClick={() => handleSort('status')}
                className="flex items-center space-x-1 text-sm font-medium text-gray-700 hover:text-gray-900"
              >
                <span>Status</span>
                <ChevronRight className={`w-4 h-4 transition-transform ${
                  sortConfig.key === 'status' ? 
                    (sortConfig.direction === 'asc' ? 'rotate-90' : '-rotate-90') : 
                    'rotate-90 opacity-50'
                }`} />
              </button>
              <button
                onClick={() => handleSort('reportedOn')}
                className="flex items-center space-x-1 text-sm font-medium text-gray-700 hover:text-gray-900"
              >
                <span>Date</span>
                <ChevronRight className={`w-4 h-4 transition-transform ${
                  sortConfig.key === 'reportedOn' ? 
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
                  onEdit={(id) => alert(`Edit bug ${id}`)}
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
                        className={`px-3 py-2 text-sm border rounded-md ${
                          currentPage === page
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
          <ImportBugModal
              isOpen={isImportModalOpen}
              onClose={() => setIsImportModalOpen(false)}
              onSubmit={handleImportBugs}
          />
      </div>
  );
};

export default BugManagementSystem;