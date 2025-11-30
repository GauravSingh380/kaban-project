import React, { useState, useEffect, useMemo } from 'react';
import { Upload, Search, Filter, Download, Plus, ChevronLeft, ChevronRight, X, AlertCircle, FolderOpen } from 'lucide-react';

// Mock form config - simplified for demo
const formConfig = [
  {
    id: "1",
    type: "select",
    label: "Project",
    name: "project",
    required: true,
    options: ['TWR', 'PWC', 'MetLife', 'GenAi'],
  },
  {
    id: "2",
    type: "text",
    label: "Bug Title",
    name: "title",
    required: true,
    placeholder: "Enter bug title",
  },
  {
    id: "3",
    type: "textarea",
    label: "Description",
    name: "description",
    required: false,
    placeholder: "Describe the bug",
  },
  {
    id: "4",
    type: "select",
    label: "Priority",
    name: "priority",
    required: true,
    options: ['P1', 'P2', 'P3', 'P4'],
  },
  {
    id: "5",
    type: "select",
    label: "Status",
    name: "status",
    required: true,
    options: ['open', 'in-progress', 'closed', 'fixed'],
  },
  {
    id: "6",
    type: "text",
    label: "Reported By",
    name: "reportedBy",
    required: true,
    placeholder: "Reporter name",
  },
  {
    id: "7",
    type: "text",
    label: "Assigned To",
    name: "assignedTo",
    required: false,
    placeholder: "Assignee name",
  },
];

// Sample initial bugs with projects
const initialBugs = [
  {
    id: 1,
    slNo: 1,
    project: 'TWR',
    title: 'Login button not working',
    description: 'Users cannot login',
    priority: 'P1',
    status: 'open',
    reportedBy: 'John Doe',
    assignedTo: 'Jane Smith',
    reportedOn: '2024-01-15',
  },
  {
    id: 2,
    slNo: 2,
    project: 'PWC',
    title: 'Dashboard loading slow',
    description: 'Dashboard takes 10+ seconds to load',
    priority: 'P2',
    status: 'in-progress',
    reportedBy: 'Alice Johnson',
    assignedTo: 'Bob Wilson',
    reportedOn: '2024-01-16',
  },
  {
    id: 3,
    slNo: 3,
    project: 'MetLife',
    title: 'Data export failing',
    description: 'CSV export throws error',
    priority: 'P1',
    status: 'open',
    reportedBy: 'Charlie Brown',
    assignedTo: 'Diana Prince',
    reportedOn: '2024-01-17',
  },
  {
    id: 4,
    slNo: 4,
    project: 'GenAi',
    title: 'API timeout issues',
    description: 'API requests timing out after 30s',
    priority: 'P2',
    status: 'fixed',
    reportedBy: 'Eve Adams',
    assignedTo: 'Frank Castle',
    reportedOn: '2024-01-18',
  },
  {
    id: 5,
    slNo: 5,
    project: 'TWR',
    title: 'Mobile view broken',
    description: 'Layout breaks on mobile devices',
    priority: 'P3',
    status: 'in-progress',
    reportedBy: 'Grace Lee',
    assignedTo: 'Henry Ford',
    reportedOn: '2024-01-19',
  },
];

const BugCard = ({ bug, isSelected, onSelect, onEdit, onDelete }) => {
  const priorityColors = {
    P1: 'bg-red-100 text-red-800 border-red-300',
    P2: 'bg-orange-100 text-orange-800 border-orange-300',
    P3: 'bg-yellow-100 text-yellow-800 border-yellow-300',
    P4: 'bg-blue-100 text-blue-800 border-blue-300',
  };

  const statusColors = {
    open: 'bg-gray-100 text-gray-800',
    'in-progress': 'bg-blue-100 text-blue-800',
    fixed: 'bg-green-100 text-green-800',
    closed: 'bg-purple-100 text-purple-800',
  };

  return (
    <div className={`border rounded-lg p-4 ${isSelected ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}`}>
      <div className="flex items-start gap-4">
        <input
          type="checkbox"
          checked={isSelected}
          onChange={() => onSelect(bug.id)}
          className="mt-1 w-4 h-4 text-blue-600 border-gray-300 rounded"
        />
        <div className="flex-1">
          <div className="flex items-start justify-between mb-2">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-mono text-gray-500">#{bug.slNo}</span>
                <span className="text-xs px-2 py-1 rounded-full bg-purple-100 text-purple-800">
                  {bug.project}
                </span>
                <span className={`text-xs px-2 py-1 rounded-full ${priorityColors[bug.priority]}`}>
                  {bug.priority}
                </span>
                <span className={`text-xs px-2 py-1 rounded-full ${statusColors[bug.status]}`}>
                  {bug.status}
                </span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900">{bug.title}</h3>
              <p className="text-sm text-gray-600 mt-1">{bug.description}</p>
            </div>
          </div>
          <div className="flex items-center justify-between text-sm text-gray-500 mt-3">
            <div className="flex gap-4">
              <span>Reported: {bug.reportedBy}</span>
              <span>Assigned: {bug.assignedTo}</span>
              <span>Date: {bug.reportedOn}</span>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => onEdit(bug.id)}
                className="px-3 py-1 text-blue-600 hover:bg-blue-50 rounded"
              >
                Edit
              </button>
              <button
                onClick={() => onDelete(bug.id)}
                className="px-3 py-1 text-red-600 hover:bg-red-50 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Modal = ({ isOpen, onClose, title, children, onSubmit, submitText = "Submit" }) => {
  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(e);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto m-4">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-xl font-semibold">{title}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-4">{children}</div>
        <div className="flex justify-end gap-2 p-4 border-t">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            {submitText}
          </button>
        </div>
      </div>
    </div>
  );
};

const FormField = ({ field, value, onChange }) => {
  if (field.type === 'select') {
    return (
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {field.label} {field.required && <span className="text-red-500">*</span>}
        </label>
        <select
          value={value || ''}
          onChange={(e) => onChange(field.name, e.target.value)}
          className="w-full border border-gray-300 rounded-md px-3 py-2"
        >
          <option value="">Select {field.label}</option>
          {field.options.map((opt) => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
      </div>
    );
  }

  if (field.type === 'textarea') {
    return (
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {field.label} {field.required && <span className="text-red-500">*</span>}
        </label>
        <textarea
          value={value || ''}
          onChange={(e) => onChange(field.name, e.target.value)}
          placeholder={field.placeholder}
          rows={3}
          className="w-full border border-gray-300 rounded-md px-3 py-2"
        />
      </div>
    );
  }

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {field.label} {field.required && <span className="text-red-500">*</span>}
      </label>
      <input
        type={field.type}
        value={value || ''}
        onChange={(e) => onChange(field.name, e.target.value)}
        placeholder={field.placeholder}
        className="w-full border border-gray-300 rounded-md px-3 py-2"
      />
    </div>
  );
};

const BugsV1 = () => {
  const [bugs, setBugs] = useState(initialBugs);
  const [selectedProject, setSelectedProject] = useState(''); // '' means "All Projects"
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    priority: '',
    status: '',
    assignedTo: '',
  });
  const [selectedRows, setSelectedRows] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [showFilters, setShowFilters] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentEditBugId, setCurrentEditBugId] = useState(null);
  const [formData, setFormData] = useState({
    project: '',
    title: '',
    description: '',
    priority: '',
    status: '',
    reportedBy: '',
    assignedTo: '',
  });

  const projects = ['TWR', 'PWC', 'MetLife', 'GenAi'];

  // Get project statistics
  const projectStats = useMemo(() => {
    const stats = {};
    projects.forEach(project => {
      const projectBugs = bugs.filter(b => b.project === project);
      stats[project] = {
        total: projectBugs.length,
        open: projectBugs.filter(b => b.status === 'open').length,
        inProgress: projectBugs.filter(b => b.status === 'in-progress').length,
        closed: projectBugs.filter(b => b.status === 'closed' || b.status === 'fixed').length,
      };
    });
    return stats;
  }, [bugs]);

  // Filter by selected project first
  const projectFilteredBugs = useMemo(() => {
    if (!selectedProject) return bugs;
    return bugs.filter(bug => bug.project === selectedProject);
  }, [bugs, selectedProject]);

  // Then apply other filters
  const filteredBugs = useMemo(() => {
    let filtered = projectFilteredBugs;

    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.filter(bug =>
        bug.title?.toLowerCase().includes(searchLower) ||
        bug.description?.toLowerCase().includes(searchLower) ||
        bug.reportedBy?.toLowerCase().includes(searchLower) ||
        bug.assignedTo?.toLowerCase().includes(searchLower)
      );
    }

    if (filters.priority) {
      filtered = filtered.filter(bug => bug.priority === filters.priority);
    }
    if (filters.status) {
      filtered = filtered.filter(bug => bug.status === filters.status);
    }
    if (filters.assignedTo) {
      filtered = filtered.filter(bug => bug.assignedTo === filters.assignedTo);
    }

    return filtered;
  }, [projectFilteredBugs, searchTerm, filters]);

  const paginatedBugs = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredBugs.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredBugs, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(filteredBugs.length / itemsPerPage);

  const validateForm = () => {
    const requiredFields = formConfig.filter(field => field.required);
    const missingFields = requiredFields.filter(field => !formData[field.name]);

    if (missingFields.length > 0) {
      alert(`Please fill in required fields: ${missingFields.map(f => f.label).join(', ')}`);
      return false;
    }
    return true;
  };

  const handleAddBug = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const maxId = bugs.length > 0 ? Math.max(...bugs.map(b => b.id)) : 0;
    const maxSlNo = bugs.length > 0 ? Math.max(...bugs.map(b => b.slNo)) : 0;

    const newBug = {
      ...formData,
      id: maxId + 1,
      slNo: maxSlNo + 1,
      reportedOn: new Date().toISOString().split('T')[0],
    };

    setBugs(prev => [...prev, newBug]);
    setIsAddModalOpen(false);
    setFormData({
      project: '',
      title: '',
      description: '',
      priority: '',
      status: '',
      reportedBy: '',
      assignedTo: '',
    });
  };

  const handleEditBug = (id) => {
    const bug = bugs.find(b => b.id === id);
    if (bug) {
      setFormData({
        project: bug.project || '',
        title: bug.title || '',
        description: bug.description || '',
        priority: bug.priority || '',
        status: bug.status || '',
        reportedBy: bug.reportedBy || '',
        assignedTo: bug.assignedTo || '',
      });
      setCurrentEditBugId(id);
      setIsEditModalOpen(true);
    }
  };

  const handleUpdateBug = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setBugs(prev =>
      prev.map(bug =>
        bug.id === currentEditBugId
          ? { ...bug, ...formData }
          : bug
      )
    );
    setIsEditModalOpen(false);
    setCurrentEditBugId(null);
    setFormData({
      project: '',
      title: '',
      description: '',
      priority: '',
      status: '',
      reportedBy: '',
      assignedTo: '',
    });
  };

  const handleDeleteBug = (id) => {
    if (window.confirm('Are you sure you want to delete this bug?')) {
      setBugs(prev => prev.filter(b => b.id !== id));
      setSelectedRows(prev => prev.filter(rowId => rowId !== id));
    }
  };

  const handleInputChange = (fieldName, value) => {
    setFormData(prev => ({ ...prev, [fieldName]: value }));
  };

  const exportData = () => {
    const dataToExport = selectedRows.length > 0
      ? filteredBugs.filter(bug => selectedRows.includes(bug.id))
      : filteredBugs;

    const csvContent = [
      'Project,Bug ID,Title,Description,Priority,Status,Reported By,Assigned To,Date',
      ...dataToExport.map(bug =>
        `${bug.project},${bug.slNo},"${bug.title}","${bug.description}",${bug.priority},${bug.status},${bug.reportedBy},${bug.assignedTo},${bug.reportedOn}`
      )
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `bugs_${selectedProject || 'all'}_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
  };

  return (
    <div className="max-w-full mx-auto bg-gray-50 min-h-screen p-6">
      <div className="bg-white rounded-lg shadow-lg">
        {/* Header */}
        <div className="border-b border-gray-200 p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Bug Management System</h1>

          {/* Project Selector */}
          <div className="flex items-center gap-4 mb-4">
            <FolderOpen className="w-5 h-5 text-gray-500" />
            <div className="flex gap-2 flex-wrap">
              <button
                onClick={() => setSelectedProject('')}
                className={`px-4 py-2 rounded-md transition-colors ${selectedProject === ''
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
              >
                All Projects ({bugs.length})
              </button>
              {projects.map(project => (
                <button
                  key={project}
                  onClick={() => setSelectedProject(project)}
                  className={`px-4 py-2 rounded-md transition-colors ${selectedProject === project
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                >
                  {project} ({projectStats[project]?.total || 0})
                </button>
              ))}
            </div>
          </div>

          {/* Project Statistics */}
          {selectedProject && (
            <div className="grid grid-cols-4 gap-4 p-4 bg-gray-50 rounded-lg">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">
                  {projectStats[selectedProject]?.total || 0}
                </div>
                <div className="text-sm text-gray-600">Total Bugs</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">
                  {projectStats[selectedProject]?.open || 0}
                </div>
                <div className="text-sm text-gray-600">Open</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">
                  {projectStats[selectedProject]?.inProgress || 0}
                </div>
                <div className="text-sm text-gray-600">In Progress</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">
                  {projectStats[selectedProject]?.closed || 0}
                </div>
                <div className="text-sm text-gray-600">Resolved</div>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-2 mt-4">
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              <Plus className="w-4 h-4" />
              Add Bug
            </button>
            <button
              onClick={exportData}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
            >
              <Download className="w-4 h-4" />
              Export ({selectedRows.length > 0 ? selectedRows.length : filteredBugs.length})
            </button>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="p-6 border-b">
          <div className="flex gap-4 items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search bugs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-full"
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 px-4 py-2 border rounded-md ${showFilters ? 'bg-blue-50 border-blue-300 text-blue-700' : 'border-gray-300'
                }`}
            >
              <Filter className="w-4 h-4" />
              Filters
            </button>
          </div>

          {showFilters && (
            <div className="mt-4 grid grid-cols-3 gap-4 p-4 bg-gray-50 rounded-md">
              <select
                value={filters.priority}
                onChange={(e) => setFilters(prev => ({ ...prev, priority: e.target.value }))}
                className="border rounded-md px-3 py-2"
              >
                <option value="">All Priorities</option>
                <option value="P1">P1</option>
                <option value="P2">P2</option>
                <option value="P3">P3</option>
                <option value="P4">P4</option>
              </select>
              <select
                value={filters.status}
                onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value }))}
                className="border rounded-md px-3 py-2"
              >
                <option value="">All Statuses</option>
                <option value="open">Open</option>
                <option value="in-progress">In Progress</option>
                <option value="fixed">Fixed</option>
                <option value="closed">Closed</option>
              </select>
              <button
                onClick={() => {
                  setFilters({ priority: '', status: '', assignedTo: '' });
                  setSearchTerm('');
                }}
                className="px-4 py-2 bg-red-100 text-red-700 rounded-md hover:bg-red-200"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>

        {/* Bug List */}
        <div className="p-6">
          <div className="mb-4 text-sm text-gray-600">
            Showing {paginatedBugs.length} of {filteredBugs.length} bugs
          </div>
          {paginatedBugs.length === 0 ? (
            <div className="text-center py-12">
              <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No bugs found</h3>
              <p className="text-gray-600">
                {selectedProject
                  ? `No bugs found in ${selectedProject} project`
                  : 'Try adjusting your filters'}
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {paginatedBugs.map(bug => (
                <BugCard
                  key={bug.id}
                  bug={bug}
                  isSelected={selectedRows.includes(bug.id)}
                  onSelect={(id) => {
                    setSelectedRows(prev =>
                      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
                    );
                  }}
                  onEdit={handleEditBug}
                  onDelete={handleDeleteBug}
                />
              ))}
            </div>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="p-6 border-t flex items-center justify-between">
            <div className="text-sm text-gray-600">
              Page {currentPage} of {totalPages}
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 border rounded-md disabled:opacity-50"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
                className="px-4 py-2 border rounded-md disabled:opacity-50"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Add Bug Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Add New Bug"
        onSubmit={handleAddBug}
        submitText="Add Bug"
      >
        {formConfig.map(field => (
          <FormField
            key={field.id}
            field={field}
            value={formData[field.name]}
            onChange={handleInputChange}
          />
        ))}
      </Modal>

      {/* Edit Bug Modal */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title="Edit Bug"
        onSubmit={handleUpdateBug}
        submitText="Update Bug"
      >
        {formConfig.map(field => (
          <FormField
            key={field.id}
            field={field}
            value={formData[field.name]}
            onChange={handleInputChange}
          />
        ))}
      </Modal>
    </div>
  );
};

export default BugsV1;