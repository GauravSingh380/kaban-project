import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import { Building2, Upload } from 'lucide-react';
import { Search, Filter, Download, Plus, ChevronLeft, ChevronRight, X, AlertCircle } from 'lucide-react';
import { formConfig, initialBugs } from '../../helper';
import BugCard from './BugCard/BugCard';
import AddBugModal from './BugModel/AddBugModal';
import ImportBugModal from './ImportBugModel/ImportBugModal';
import GlobalModel from '../common/GlobalModel';
import RenderHtmlFields from '../common/RenderHtmlFields';
import { useToast } from '../StyledAlert/ToastContext';
import BugStats from './BugCard/BugStats';
import { useApi, useAuth } from '../../api';
import StyledSpinner from '../StyledSpinner/StyledSpinner';
import BugListSkelton from '../common/BugListSkelton';

const BugManagementSystem = () => {
  const { isAuthenticated, bugDetails, getAllBugs, createNewBugs, projectSummary, getProjectSummaryDetails, deleteBug } = useAuth();
  const {
    loading: loadingGetAllBugs,
    error: errorGetAllBugs,
    execute: executeGetAllBugs
  } = useApi(getAllBugs);

  const {
    loading: loadingCreateBug,
    error: errorCreateBug,
    execute: executeCreateBug
  } = useApi(createNewBugs);
  
  const {
    loading: loadingDeleteBug,
    error: errorDeleteBug,
    execute: executeDeleteBug
  } = useApi(deleteBug);

  const {
    loading: loadingProjectSummary,
    execute: executeProjectSummary
  } = useApi(getProjectSummaryDetails);

  const hasFetchedBugs = useRef(false);
  const hasFetchedProjectSummary = useRef(false);
  const searchDebounceTimer = useRef(null);

  // Backend data state
  const [bugsData, setBugsData] = useState([]);
  const [globalStats, setGlobalStats] = useState({});
  const [statsByProject, setStatsByProject] = useState({});
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalBugs: 0,
    limit: 10,
    hasNextPage: false,
    hasPrevPage: false
  });

  // UI state
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRows, setSelectedRows] = useState([]);
  const [isAllSelected, setIsAllSelected] = useState(false);
  const [isIndeterminate, setIsIndeterminate] = useState(false);
  const [errors, setErrors] = useState({});
  const [showFilters, setShowFilters] = useState(false);

  // Query parameters for API
  const [queryParams, setQueryParams] = useState({
    projectId: '',
    status: '',
    priority: '',
    assignedTo: '',
    reportedBy: '',
    environment: '',
    search: '',
    page: 1,
    limit: 10,
    sortBy: 'reportedOn',
    sortOrder: 'desc'
  });

  const alert = useToast();

  // Modal states
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModelOpen, setEditModelOpen] = useState(false);
  const [currentEditBugId, setCurrentEditBugId] = useState(null);
  const [currentDeleteBugId, setCurrentDeleteBugId] = useState(null);

  // Project state
  const [selectedProject, setSelectedProject] = useState('');
  const [availableProjects, setAvailableProjects] = useState([]);
  const [projectId, setProjectId] = useState("");

  const selectedProjectId = selectedProject && selectedProject !== ""
    ? bugsData.find(bug => bug.project === selectedProject)?.projectId || ""
    : "";

  const [formData, setFormData] = useState({
    project: '',
    title: '',
    description: '',
    priority: '',
    status: '',
    reportedBy: '',
    assignedTo: '',
    issueEnv: [],
    comments: ''
  });

  // Update form data when project changes
  useEffect(() => {
    setFormData(prev => ({
      ...prev,
      project: selectedProject
    }));
  }, [selectedProject]);

  // Get filter options from current bugs data
  const filterOptions = useMemo(() => ({
    priorities: [...new Set(bugsData.map(item => item.priority))],
    statuses: [...new Set(bugsData.map(item => item.status))],
    assignedTo: [...new Set(bugsData.map(item => item.assignedTo))],
    reportedBy: [...new Set(bugsData.map(item => item.reportedBy))],
    environments: [...new Set(bugsData.flatMap(item => item.issueEnv))]
  }), [bugsData]);

  // Reset selections when project changes
  useEffect(() => {
    setSelectedRows([]);
    setQueryParams(prev => ({
      ...prev,
      projectId: projectId,
      page: 1
    }));
  }, [projectId]);

  // Debounced search effect
  useEffect(() => {
    if (searchDebounceTimer.current) {
      clearTimeout(searchDebounceTimer.current);
    }

    searchDebounceTimer.current = setTimeout(() => {
      setQueryParams(prev => ({
        ...prev,
        search: searchTerm,
        page: 1
      }));
    }, 500);

    return () => {
      if (searchDebounceTimer.current) {
        clearTimeout(searchDebounceTimer.current);
      }
    };
  }, [searchTerm]);

  // Fetch bugs whenever query params change
  useEffect(() => {
    if (isAuthenticated) {
      getAllBugDetails(queryParams);
    }
  }, [queryParams, isAuthenticated]);

  // Update selection states
  useEffect(() => {
    const currentPageIds = bugsData.map(item => item.id);
    const selectedInCurrentPage = selectedRows.filter(id => currentPageIds.includes(id));

    if (selectedInCurrentPage.length === 0) {
      setIsAllSelected(false);
      setIsIndeterminate(false);
    } else if (selectedInCurrentPage.length === bugsData.length && bugsData.length > 0) {
      setIsAllSelected(true);
      setIsIndeterminate(false);
    } else {
      setIsAllSelected(false);
      setIsIndeterminate(true);
    }
  }, [bugsData, selectedRows]);

  // Handlers
  const handleRowSelect = (id) => {
    setSelectedRows(prev =>
      prev.includes(id)
        ? prev.filter(rowId => rowId !== id)
        : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    const currentPageIds = bugsData.map(item => item.id);

    if (isAllSelected || isIndeterminate) {
      setSelectedRows(prev => prev.filter(id => !currentPageIds.includes(id)));
    } else {
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
    setQueryParams(prev => ({
      ...prev,
      [filterType]: value,
      page: 1
    }));
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedProject('');
    setQueryParams({
      projectId: '',
      status: '',
      priority: '',
      assignedTo: '',
      reportedBy: '',
      environment: '',
      search: '',
      page: 1,
      limit: queryParams.limit,
      sortBy: 'reportedOn',
      sortOrder: 'desc'
    });
  };

  const exportData = () => {
    const dataToExport = selectedRows.length > 0
      ? bugsData.filter(bug => selectedRows.includes(bug.id))
      : bugsData;

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
    setQueryParams(prev => ({
      ...prev,
      sortBy: key,
      sortOrder: prev.sortBy === key && prev.sortOrder === 'asc' ? 'desc' : 'asc',
      page: 1
    }));
  };

  const handleImportBugs = async (importedBugs) => {
    if (!selectedProject) {
      alert.error('Please select a project before importing bugs');
      return;
    }

    const processedBugs = importedBugs.map((bug) => ({
      projectId: projectId,
      title: bug.title || 'Untitled Bug',
      description: bug.description || 'No description provided',
      priority: bug.priority || 'NA',
      status: bug.status || 'open',
      reportedBy: bug.reportedBy || 'Unknown',
      assignedTo: bug.assignedTo || 'Unassigned',
      issueEnv: Array.isArray(bug.issueEnv) ? bug.issueEnv : (bug.issueEnv ? [bug.issueEnv] : []),
      comments: bug.comments || '',
      reportedOn: bug.reportedOn || new Date().toISOString().split('T')[0],
      createdAt: bug.createdAt || new Date().toISOString().split('T')[0],
      updatedAt: bug.updatedAt || new Date().toISOString().split('T')[0]
    }));

    try {
      const results = await Promise.all(
        processedBugs.map(bug => executeCreateBug(bug))
      );

      if (results) {
        alert.success(`Successfully imported ${processedBugs.length} bugs!`);
        await getAllBugDetails(queryParams);
        setIsImportModalOpen(false);
      }
    } catch (error) {
      console.error('Failed to import bugs:', error);
      alert.error(error.message || 'Failed to import bugs. Please try again.');
    }
  };

  const handleInputChange = (fieldName, value) => {
    setFormData(prev => ({
      ...prev,
      [fieldName]: value
    }));
    if (errors[fieldName]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[fieldName];
        return newErrors;
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    formConfig.forEach(field => {
      const value = formData[field.name];
      console.log('value---',  value);

      if (field.required) {
        if (field.type === 'checkbox') {
          if (!value || !Array.isArray(value) || value.length === 0) {
            newErrors[field.name] = `${field.label} is required. Please select at least one option.`;
          }
        } else if (field.type === 'select') {
          if (!value || value === '') {
            newErrors[field.name] = `Please select a ${field.label}`;
          }
        } else {
          if (!value || value?.name?.trim() === '') {
            newErrors[field.name] = `${field.label} is required`;
          }
        }
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAddNewBug = async (e) => {
    e.preventDefault();

    if (!selectedProject) {
      alert.error('Please select a project first');
      return;
    }

    if (!validateForm()) {
      return;
    }

    try {
      const apiResp = await executeCreateBug({ ...formData, projectId: projectId });
      if (apiResp) {
        alert.success(apiResp?.message || "New bug created successfully!");
        await getAllBugDetails(queryParams);
        setIsAddModalOpen(false);
        setFormData({
          project: selectedProject,
          title: '',
          description: '',
          priority: '',
          status: '',
          reportedBy: '',
          assignedTo: '',
          issueEnv: [],
          comments: ''
        });
      }
    } catch (error) {
      alert.error(error.message || 'Failed to add new bug. Please try again.');
      console.error('Failed to add new bug:', error);
    }
  };

  const handleEditBug = (id) => {
    setCurrentEditBugId(id);
    const bugToEdit = bugsData.find(b => b.id === id);

    if (bugToEdit) {
      setFormData({
        project: bugToEdit.project,
        title: bugToEdit.title || '',
        description: bugToEdit.description || '',
        priority: bugToEdit.priority || '',
        status: bugToEdit.status || '',
        reportedBy: bugToEdit.reportedBy || '',
        assignedTo: bugToEdit.assignedTo || '',
        issueEnv: bugToEdit.issueEnv || [],
        comments: bugToEdit.comments || ''
      });
      setEditModelOpen(true);
    }
  };

  const handleUpdateBug = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      // Add your update bug API call here
      // const apiResp = await executeUpdateBug(currentEditBugId, formData);
      
      // For now, just refresh the list
      await getAllBugDetails(queryParams);
      
      setEditModelOpen(false);
      setCurrentEditBugId(null);
      setFormData({
        project: '',
        title: '',
        description: '',
        priority: '',
        status: '',
        reportedBy: '',
        assignedTo: '',
        issueEnv: [],
        comments: ''
      });

      alert.success('Bug updated successfully!');
    } catch (error) {
      alert.error(error.message || 'Failed to update bug. Please try again.');
      console.error('Failed to update bug:', error);
    }
  };

  const getProjectSummaryDetail = useCallback(async () => {
    try {
      const apiResp = await executeProjectSummary();
      if (apiResp) {
        setAvailableProjects([
          ...new Set(apiResp?.data?.projects?.map(item => item.name))
        ]);
      }
    } catch (error) {
      alert.error(error.message || 'Failed to get projects. Please try again.');
      console.error('Failed to get projects:', error);
    }
  }, [executeProjectSummary]);

  const getAllBugDetails = useCallback(async (params = queryParams) => {
    try {
      const apiResp = await executeGetAllBugs({
        params: {
          ...params,
          page: params.page || 1
        }
      });
      
      if (apiResp) {
        setBugsData(apiResp?.data?.bugs || []);
        setGlobalStats(apiResp?.data?.stats || {});
        setStatsByProject(apiResp?.data?.statsByProject || {});
        setPagination(apiResp?.data?.pagination || {
          currentPage: 1,
          totalPages: 1,
          totalBugs: 0,
          limit: 10,
          hasNextPage: false,
          hasPrevPage: false
        });
      }
    } catch (error) {
      alert.error(error.message || 'Failed to get bugs. Please try again.');
      console.error('Failed to get bugs:', error);
    }
  }, [executeGetAllBugs, alert]);

  const handleDeleteBug = useCallback(async (bugId) => {
    setCurrentDeleteBugId(bugId);
    try {
      const apiResp = await executeDeleteBug(bugId);
      if (apiResp) {
        alert.success(apiResp.message || 'Bug deleted successfully');
        await getAllBugDetails(queryParams);
        setCurrentDeleteBugId(null);
        setSelectedRows(prev => prev.filter(id => id !== bugId));
      }
    } catch (error) {
      alert.error(error.message || 'Failed to delete bug. Please try again.');
      setCurrentDeleteBugId(null);
      console.error('Failed to delete bug:', error);
    }
  }, [executeDeleteBug, getAllBugDetails, queryParams, alert]);

  const handlePageChange = (newPage) => {
    setQueryParams(prev => ({
      ...prev,
      page: newPage
    }));
  };

  const handleItemsPerPageChange = (newLimit) => {
    setQueryParams(prev => ({
      ...prev,
      limit: newLimit,
      page: 1
    }));
  };

  // Update projectId when selectedProject changes
  useEffect(() => {
    if (!selectedProject || !projectSummary?.length) return;

    const found = projectSummary.find(item => item.name === selectedProject);
    setProjectId(found ? found?.projectId : "");
  }, [selectedProject, projectSummary]);

  // Initial fetch
  useEffect(() => {
    if (isAuthenticated && !hasFetchedProjectSummary.current) {
      hasFetchedProjectSummary.current = true;
      getProjectSummaryDetail();
    }
  }, [isAuthenticated, getProjectSummaryDetail]);

  return (
    <div className="max-w-full mx-auto bg-gray-50 min-h-screen">
      <div className="bg-gradient-to-r mb-4 rounded-lg bg-[#8b40c1] text-white py-6 shadow-lg">
        <div className="max-w-7xl mx-auto py-2">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">
            <div className="flex items-center gap-4">
              <Building2 className="w-10 h-10 opacity-90" />
              <div>
                <h2 className="text-3xl font-bold tracking-tight">Project Bug Stats</h2>
                <p className="text-blue-100 text-sm">
                  Select a project to manage and track its issues
                </p>
              </div>
            </div>
            <div className="flex justify-start lg:justify-end">
              <select
                value={selectedProject}
                onChange={(e) => setSelectedProject(e.target.value)}
                className="px-4 py-2.5 rounded-xl shadow-md bg-white text-gray-900 font-medium border border-blue-200 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 min-w-[220px]"
              >
                <option value="">All Projects</option>
                {availableProjects.map((project) => (
                  <option key={project} value={project}>
                    {project}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-6">
            <BugStats
              globalStats={globalStats}
              statsByProject={statsByProject}
              selectedProject={selectedProject}
              selectedProjectid={selectedProjectId}
            />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-lg">
        <div className="border-b border-gray-200 p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Bug Management System</h1>
              <p className="text-gray-600 mt-1">Track and manage bug reports and issues</p>
            </div>
            <div className="mt-4 sm:mt-0 flex items-center space-x-3">
              <button
                onClick={() => {
                  if (!selectedProject) {
                    alert.error("Please select a project to import.");
                    return;
                  }
                  setIsImportModalOpen(true);
                }}
                className="flex items-center space-x-2 px-4 py-2 cursor-pointer bg-orange-600 text-white rounded-md hover:bg-orange-700"
              >
                <Upload className="w-4 h-4" />
                <span>Import</span>
              </button>
              <button
                onClick={() => {
                  if (!selectedProject) {
                    alert.error("Please select a project to export.");
                    return;
                  }
                  exportData();
                }}
                className="flex items-center space-x-2 px-4 py-2 cursor-pointer bg-green-600 text-white rounded-md hover:bg-green-700"
              >
                <Download className="w-4 h-4" />
                <span>Export ({selectedRows.length > 0 ? selectedRows.length : pagination.totalBugs})</span>
              </button>
              <button
                onClick={() => {
                  if (!selectedProject) {
                    alert.warning('Please select a project first.');
                    return;
                  }
                  setIsAddModalOpen(true);
                }}
                className="flex items-center space-x-2 px-4 py-2 cursor-pointer bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                <Plus className="w-4 h-4" />
                <span>Add Bug</span>
              </button>
            </div>
          </div>
        </div>

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
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full sm:w-72 md:w-80 lg:w-96"
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

              {(Object.values(queryParams).some(v => v && v !== '' && v !== 'reportedOn' && v !== 'desc' && v !== 1 && v !== 10) || searchTerm) && (
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
                Showing {bugsData.length} of {pagination.totalBugs} results
              </span>
              <select
                value={queryParams.limit}
                onChange={(e) => handleItemsPerPageChange(Number(e.target.value))}
                className="border border-gray-300 rounded-md px-3 py-1 text-sm"
              >
                <option value={5}>5 per page</option>
                <option value={10}>10 per page</option>
                <option value={15}>15 per page</option>
                <option value={20}>20 per page</option>
              </select>
            </div>
          </div>

          {showFilters && (
            <div className="mt-4 p-4 bg-gray-50 rounded-md">
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                  <select
                    value={queryParams.priority}
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
                    value={queryParams.status}
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
                    value={queryParams.assignedTo}
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
                    value={queryParams.reportedBy}
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
                    value={queryParams.environment}
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

        {selectedRows.length > 0 && (
          <div className="p-4 bg-blue-50 border-b border-blue-200">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-blue-900">
                {selectedRows.length} bug{selectedRows.length !== 1 ? 's' : ''} selected
              </span>
              <div className="flex items-center space-x-2">
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
                Select Page ({bugsData.length})
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => handleSort('slNo')}
                className="flex items-center space-x-1 text-sm font-medium text-gray-700 hover:text-gray-900"
              >
                <span>Bug ID</span>
                <ChevronRight className={`w-4 h-4 transition-transform ${
                  queryParams.sortBy === 'slNo'
                    ? (queryParams.sortOrder === 'asc' ? 'rotate-90' : '-rotate-90')
                    : 'rotate-90 opacity-50'
                }`} />
              </button>
              <button
                onClick={() => handleSort('priority')}
                className="flex items-center space-x-1 text-sm font-medium text-gray-700 hover:text-gray-900"
              >
                <span>Priority</span>
                <ChevronRight className={`w-4 h-4 transition-transform ${
                  queryParams.sortBy === 'priority'
                    ? (queryParams.sortOrder === 'asc' ? 'rotate-90' : '-rotate-90')
                    : 'rotate-90 opacity-50'
                }`} />
              </button>
              <button
                onClick={() => handleSort('status')}
                className="flex items-center space-x-1 text-sm font-medium text-gray-700 hover:text-gray-900"
              >
                <span>Status</span>
                <ChevronRight className={`w-4 h-4 transition-transform ${
                  queryParams.sortBy === 'status'
                    ? (queryParams.sortOrder === 'asc' ? 'rotate-90' : '-rotate-90')
                    : 'rotate-90 opacity-50'
                }`} />
              </button>
              <button
                onClick={() => handleSort('reportedOn')}
                className="flex items-center space-x-1 text-sm font-medium text-gray-700 hover:text-gray-900"
              >
                <span>Date</span>
                <ChevronRight className={`w-4 h-4 transition-transform ${
                  queryParams.sortBy === 'reportedOn'
                    ? (queryParams.sortOrder === 'asc' ? 'rotate-90' : '-rotate-90')
                    : 'rotate-90 opacity-50'
                }`} />
              </button>
            </div>
          </div>
        </div>

        {loadingGetAllBugs ? (
          <BugListSkelton rows={6} />
        ) : (
          <div className="p-6">
            {bugsData.length === 0 ? (
              <div className="text-center py-12">
                {!selectedProject ? (
                  <>
                    <Building2 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No Project Selected</h3>
                    <p className="text-gray-600">Please select a project from the dropdown above</p>
                  </>
                ) : (
                  <>
                    <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No bugs found</h3>
                    <p className="text-gray-600">Try adjusting your search or filter criteria</p>
                  </>
                )}
              </div>
            ) : (
              <div className="grid gap-4">
                {bugsData.map((bug) => (
                  <BugCard
                    key={bug.id}
                    {...bug}
                    onView={(id) => alert.info(`View bug ${id}`)}
                    onEdit={(id) => {
                      handleEditBug(id);
                      setEditModelOpen(true);
                    }}
                    deletingBugId={currentDeleteBugId}
                    loadingDeleteBug={loadingDeleteBug}
                    onDelete={(bug) => handleDeleteBug(bug)}
                    isSelected={selectedRows.includes(bug.id)}
                    onSelect={handleRowSelect}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {pagination.totalPages > 1 && (
          <div className="px-6 py-4 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-700">
                Showing {((pagination.currentPage - 1) * pagination.limit) + 1} to {Math.min(pagination.currentPage * pagination.limit, pagination.totalBugs)} of {pagination.totalBugs} results
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handlePageChange(pagination.currentPage - 1)}
                  disabled={!pagination.hasPrevPage}
                  className="flex items-center px-3 py-2 text-sm border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                >
                  <ChevronLeft className="w-4 h-4 mr-1" />
                  Previous
                </button>

                <div className="flex items-center space-x-1">
                  {[...Array(pagination.totalPages)].map((_, index) => {
                    const page = index + 1;
                    const isVisible = page === 1 || 
                                     page === pagination.totalPages || 
                                     (page >= pagination.currentPage - 2 && page <= pagination.currentPage + 2);

                    if (!isVisible) {
                      if (page === pagination.currentPage - 3 || page === pagination.currentPage + 3) {
                        return <span key={page} className="px-2 text-gray-400">...</span>;
                      }
                      return null;
                    }

                    return (
                      <button
                        key={page}
                        onClick={() => handlePageChange(page)}
                        className={`px-3 py-2 text-sm border rounded-md ${
                          pagination.currentPage === page
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
                  onClick={() => handlePageChange(pagination.currentPage + 1)}
                  disabled={!pagination.hasNextPage}
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

      <GlobalModel
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        header="Add new bug details"
        onSubmit={(e) => handleAddNewBug(e)}
        disabled={loadingCreateBug}
        submitText={
          loadingCreateBug ? (
            <StyledSpinner
              borderWidth='3px'
              size='1.5rem'
              text='Adding...'
              fontSize='semi bold'
            />
          ) : (
            'Add new bug'
          )
        }
        children={
          <div>
            <RenderHtmlFields
              fieldItems={formConfig}
              formData={formData}
              handleInputChange={handleInputChange}
              errors={errors}
            />
          </div>
        }
      />

      <GlobalModel
        isOpen={isEditModelOpen}
        onClose={() => setEditModelOpen(false)}
        header="Edit bug details"
        onSubmit={handleUpdateBug}
        submitText="Update Details"
        disabled={loadingCreateBug}
        children={
          <RenderHtmlFields
            fieldItems={formConfig}
            formData={formData}
            handleInputChange={handleInputChange}
            errors={errors}
          />
        }
      />

      <ImportBugModal
        isOpen={isImportModalOpen}
        onClose={() => setIsImportModalOpen(false)}
        onSubmit={handleImportBugs}
        loadingCreateBug={loadingCreateBug}
      />
    </div>
  );
};

export default BugManagementSystem;