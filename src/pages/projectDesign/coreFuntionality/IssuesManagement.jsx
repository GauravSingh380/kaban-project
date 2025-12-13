import React, { useState } from 'react';
import { Plus, Eye, Edit, Trash2, Search, Filter, Download, Upload, Bug, AlertCircle, CheckCircle, Clock, User, Calendar, Folder } from 'lucide-react';

// Sample data - integrate with your context later
const initialBugs = [
  {
    id: 'bug-1',
    bugId: 'bug-1',
    slNo: 1,
    title: 'Login button not responding on mobile',
    description: 'When users try to login on mobile devices, the button click event is not firing properly',
    project: 'TWR',
    projectId: 'proj-1',
    priority: 'high',
    status: 'open',
    reportedBy: 'Ashok Reddy',
    reportedById: 'user-3',
    assignedTo: 'Gaurav Singh',
    assignedToId: 'user-1',
    reportedOn: '2025-12-13',
    updatedAt: '2025-12-13',
    issueEnv: ['demo', 'prod'],
    comments: 'This is affecting user login experience significantly',
    sprint: 'Sprint 5'
  },
  {
    id: 'bug-2',
    bugId: 'bug-2',
    slNo: 2,
    title: 'Data export feature showing incorrect dates',
    description: 'The exported CSV file shows dates in wrong format',
    project: 'ECP',
    projectId: 'proj-2',
    priority: 'medium',
    status: 'in-progress',
    reportedBy: 'Priya Sharma',
    reportedById: 'user-2',
    assignedTo: 'Rahul Verma',
    assignedToId: 'user-3',
    reportedOn: '2025-12-10',
    updatedAt: '2025-12-12',
    issueEnv: ['prod'],
    comments: 'Working on date formatting logic',
    sprint: 'Sprint 5'
  },
  {
    id: 'bug-3',
    bugId: 'bug-3',
    slNo: 3,
    title: 'Training Progress report refresher not displaying',
    description: 'School Admin completed training but refresher details are not displaying in Training Progress report',
    project: 'TWR',
    projectId: 'proj-1',
    priority: 'critical',
    status: 'fixed',
    reportedBy: 'Ashok Reddy',
    reportedById: 'user-3',
    assignedTo: 'Gaurav Singh',
    assignedToId: 'user-1',
    reportedOn: '2025-12-13',
    updatedAt: '2025-12-13',
    issueEnv: ['demo'],
    comments: 'Fixed the display logic and tested',
    sprint: 'Sprint 4'
  }
];

const availableProjects = ['TWR', 'ECP', 'MBA', 'HCP'];
const availableTeamMembers = [
  { id: 'user-1', name: 'Gaurav Singh' },
  { id: 'user-2', name: 'Priya Sharma' },
  { id: 'user-3', name: 'Rahul Verma' },
  { id: 'user-4', name: 'Anjali Patel' }
];
const availableSprints = ['Sprint 3', 'Sprint 4', 'Sprint 5', 'Sprint 6', 'Backlog'];

const BugCard = ({ bug, onView, onEdit, onDelete, onSelect, isSelected }) => {
  const getPriorityColor = (priority) => {
    const colors = {
      low: 'bg-green-100 text-green-800',
      medium: 'bg-yellow-100 text-yellow-800',
      high: 'bg-orange-100 text-orange-800',
      critical: 'bg-red-100 text-red-800'
    };
    return colors[priority] || 'bg-gray-100 text-gray-800';
  };

  const getStatusColor = (status) => {
    const colors = {
      open: 'bg-red-100 text-red-800',
      'in-progress': 'bg-blue-100 text-blue-800',
      fixed: 'bg-green-100 text-green-800',
      closed: 'bg-gray-100 text-gray-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className={`bg-white border rounded-lg p-6 hover:shadow-md transition-shadow ${
      isSelected ? 'border-purple-500 bg-purple-50' : 'border-gray-200'
    }`}>
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <input
            type="checkbox"
            checked={isSelected}
            onChange={() => onSelect(bug.id)}
            className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
          />
          <div>
            <h3 className="text-xl font-medium text-gray-900 mb-1">{bug.title}</h3>
            <p className="text-sm font-bold text-gray-600">Bug #{bug.slNo}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-xs px-2 py-1 rounded-full bg-purple-100 text-purple-800">
            {bug.project}
          </span>
          {(bug.status !== 'fixed' && bug.status !== 'closed') && (
            <span className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${getPriorityColor(bug.priority)}`}>
              {bug.priority}
            </span>
          )}
          <span className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${getStatusColor(bug.status)}`}>
            {bug.status}
          </span>
        </div>
      </div>

      <p className="text-md text-gray-600 mb-4 line-clamp-3">{bug.description}</p>

      <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
        <div className="flex items-center space-x-2">
          <User className="w-4 h-4 text-gray-400" />
          <span>Reported by: {bug.reportedBy}</span>
        </div>
        <div className="flex items-center space-x-2">
          <User className="w-4 h-4 text-gray-400" />
          <span>Assigned to: {bug.assignedTo}</span>
        </div>
        <div className="flex items-center space-x-2">
          <Calendar className="w-4 h-4 text-gray-400" />
          <span>Reported: {new Date(bug.reportedOn).toLocaleDateString()}</span>
        </div>
        <div className="flex items-center space-x-2">
          <Clock className="w-4 h-4 text-gray-400" />
          <span>Updated: {new Date(bug.updatedAt).toLocaleDateString()}</span>
        </div>
      </div>

      <div className="mb-4">
        <div className="flex items-center space-x-2 mb-2">
          <p className="text-sm font-medium text-gray-700">Environment:</p>
          <div className="flex flex-wrap gap-2">
            {bug.issueEnv.map((env, index) => (
              <span
                key={index}
                className={`inline-flex px-2 py-1 text-xs rounded-sm ${
                  env === 'demo' ? 'bg-red-100 text-red-400' : 'bg-blue-100 text-blue-800'
                }`}
              >
                {env.toUpperCase()}
              </span>
            ))}
          </div>
        </div>
        {bug.sprint && (
          <div className="flex items-center space-x-2">
            <p className="text-sm font-medium text-gray-700">Sprint:</p>
            <span className="text-xs px-2 py-1 bg-indigo-100 text-indigo-800 rounded">
              {bug.sprint}
            </span>
          </div>
        )}
      </div>

      <div className="pt-4 border-t border-gray-200 flex items-center justify-between">
        <div className="text-sm text-gray-500 line-clamp-2 flex-1">
          {bug.comments}
        </div>
        <div className="flex items-center space-x-2 ml-4">
          <button
            onClick={() => onView(bug.id)}
            className="text-blue-600 hover:text-blue-800 p-1 cursor-pointer"
            title="View details"
          >
            <Eye className="w-4 h-4" />
          </button>
          <button
            onClick={() => onEdit(bug.id)}
            className="text-green-600 hover:text-green-800 p-1 cursor-pointer"
            title="Edit bug"
          >
            <Edit className="w-4 h-4" />
          </button>
          <button
            onClick={() => onDelete(bug.id)}
            className="text-red-600 hover:text-red-800 p-1 cursor-pointer"
            title="Delete bug"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

const BugModal = ({ isOpen, onClose, onSave, bug = null }) => {
  const [formData, setFormData] = useState(bug || {
    title: '',
    description: '',
    project: '',
    projectId: '',
    priority: 'medium',
    status: 'open',
    reportedBy: 'Current User',
    reportedById: 'user-1',
    assignedTo: '',
    assignedToId: '',
    issueEnv: [],
    comments: '',
    sprint: 'Backlog'
  });

  if (!isOpen) return null;

  const handleSubmit = () => {
    if (!formData.title || !formData.project || !formData.assignedToId) {
      alert('Please fill in all required fields');
      return;
    }
    onSave(formData);
  };

  const toggleEnv = (env) => {
    const envs = formData.issueEnv.includes(env)
      ? formData.issueEnv.filter(e => e !== env)
      : [...formData.issueEnv, env];
    setFormData({ ...formData, issueEnv: envs });
  };

  const handleProjectChange = (projectCode) => {
    const projectId = `proj-${projectCode}`;
    setFormData({ ...formData, project: projectCode, projectId });
  };

  const handleAssigneeChange = (userId) => {
    const user = availableTeamMembers.find(m => m.id === userId);
    setFormData({ ...formData, assignedToId: userId, assignedTo: user?.name || '' });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg p-6 w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          {bug ? 'Edit Bug' : 'Report New Bug'}
        </h2>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Bug Title *
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="Brief description of the issue"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description *
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows="4"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="Detailed description of the bug"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Project *
              </label>
              <select
                value={formData.project}
                onChange={(e) => handleProjectChange(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="">Select Project</option>
                {availableProjects.map(project => (
                  <option key={project} value={project}>{project}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Assigned To *
              </label>
              <select
                value={formData.assignedToId}
                onChange={(e) => handleAssigneeChange(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="">Select Team Member</option>
                {availableTeamMembers.map(member => (
                  <option key={member.id} value={member.id}>{member.name}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Priority
              </label>
              <select
                value={formData.priority}
                onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="critical">Critical</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Status
              </label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="open">Open</option>
                <option value="in-progress">In Progress</option>
                <option value="fixed">Fixed</option>
                <option value="closed">Closed</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Sprint
              </label>
              <select
                value={formData.sprint}
                onChange={(e) => setFormData({ ...formData, sprint: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                {availableSprints.map(sprint => (
                  <option key={sprint} value={sprint}>{sprint}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Environment *
            </label>
            <div className="flex space-x-4">
              {['demo', 'prod', 'staging'].map(env => (
                <button
                  key={env}
                  onClick={() => toggleEnv(env)}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    formData.issueEnv.includes(env)
                      ? 'bg-purple-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {env.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Additional Comments
            </label>
            <textarea
              value={formData.comments}
              onChange={(e) => setFormData({ ...formData, comments: e.target.value })}
              rows="3"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="Any additional information..."
            />
          </div>

          <div className="flex justify-end space-x-3 mt-6 pt-6 border-t border-gray-200">
            <button
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              {bug ? 'Update Bug' : 'Create Bug'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const IssuesManagement = () => {
  const [bugs, setBugs] = useState(initialBugs);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBug, setEditingBug] = useState(null);
  const [selectedBugs, setSelectedBugs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterProject, setFilterProject] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterPriority, setFilterPriority] = useState('all');
  const [filterSprint, setFilterSprint] = useState('all');

  const handleView = (id) => {
    alert(`Viewing bug: ${id}`);
  };

  const handleEdit = (id) => {
    const bug = bugs.find(b => b.id === id);
    setEditingBug(bug);
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    if (confirm('Are you sure you want to delete this bug?')) {
      setBugs(bugs.filter(b => b.id !== id));
      setSelectedBugs(selectedBugs.filter(bugId => bugId !== id));
    }
  };

  const handleSave = (bugData) => {
    if (editingBug) {
      setBugs(bugs.map(b => 
        b.id === editingBug.id ? { 
          ...bugData, 
          id: b.id,
          bugId: b.bugId,
          slNo: b.slNo,
          updatedAt: new Date().toISOString().split('T')[0]
        } : b
      ));
    } else {
      const newBug = {
        ...bugData,
        id: `bug-${Date.now()}`,
        bugId: `bug-${Date.now()}`,
        slNo: bugs.length + 1,
        reportedOn: new Date().toISOString().split('T')[0],
        updatedAt: new Date().toISOString().split('T')[0]
      };
      setBugs([...bugs, newBug]);
    }
    setIsModalOpen(false);
    setEditingBug(null);
  };

  const handleSelectAll = () => {
    if (selectedBugs.length === filteredBugs.length) {
      setSelectedBugs([]);
    } else {
      setSelectedBugs(filteredBugs.map(b => b.id));
    }
  };

  const handleSelect = (id) => {
    setSelectedBugs(prev =>
      prev.includes(id) ? prev.filter(bugId => bugId !== id) : [...prev, id]
    );
  };

  const handleBulkDelete = () => {
    if (confirm(`Delete ${selectedBugs.length} selected bugs?`)) {
      setBugs(bugs.filter(b => !selectedBugs.includes(b.id)));
      setSelectedBugs([]);
    }
  };

  const handleExport = () => {
    alert('Exporting bugs...');
  };

  const filteredBugs = bugs.filter(bug => {
    const matchesSearch = bug.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         bug.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesProject = filterProject === 'all' || bug.project === filterProject;
    const matchesStatus = filterStatus === 'all' || bug.status === filterStatus;
    const matchesPriority = filterPriority === 'all' || bug.priority === filterPriority;
    const matchesSprint = filterSprint === 'all' || bug.sprint === filterSprint;
    return matchesSearch && matchesProject && matchesStatus && matchesPriority && matchesSprint;
  });

  const stats = {
    total: bugs.length,
    open: bugs.filter(b => b.status === 'open').length,
    inProgress: bugs.filter(b => b.status === 'in-progress').length,
    fixed: bugs.filter(b => b.status === 'fixed').length,
    closed: bugs.filter(b => b.status === 'closed').length
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Issues & Bug Management</h1>
            <p className="text-gray-600 mt-1">Track and manage bug reports and issues</p>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={handleExport}
              className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <Download className="w-5 h-5" />
              <span>Export</span>
            </button>
            <button
              onClick={() => {
                setEditingBug(null);
                setIsModalOpen(true);
              }}
              className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              <Plus className="w-5 h-5" />
              <span>Add Bug</span>
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Bugs</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{stats.total}</p>
              </div>
              <Bug className="w-8 h-8 text-gray-600" />
            </div>
          </div>
          
          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Open</p>
                <p className="text-2xl font-bold text-red-600 mt-1">{stats.open}</p>
              </div>
              <AlertCircle className="w-8 h-8 text-red-600" />
            </div>
          </div>
          
          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">In Progress</p>
                <p className="text-2xl font-bold text-blue-600 mt-1">{stats.inProgress}</p>
              </div>
              <Clock className="w-8 h-8 text-blue-600" />
            </div>
          </div>
          
          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Fixed</p>
                <p className="text-2xl font-bold text-green-600 mt-1">{stats.fixed}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
          </div>
          
          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Closed</p>
                <p className="text-2xl font-bold text-gray-600 mt-1">{stats.closed}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-gray-600" />
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6">
          <div className="flex flex-col space-y-4">
            <div className="flex items-center space-x-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search bugs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
              <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
                <Filter className="w-5 h-5" />
                <span>Filters</span>
              </button>
            </div>
            
            <div className="grid grid-cols-4 gap-4">
              <select
                value={filterProject}
                onChange={(e) => setFilterProject(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="all">All Projects</option>
                {availableProjects.map(project => (
                  <option key={project} value={project}>{project}</option>
                ))}
              </select>

              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="all">All Status</option>
                <option value="open">Open</option>
                <option value="in-progress">In Progress</option>
                <option value="fixed">Fixed</option>
                <option value="closed">Closed</option>
              </select>

              <select
                value={filterPriority}
                onChange={(e) => setFilterPriority(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="all">All Priority</option>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="critical">Critical</option>
              </select>

              <select
                value={filterSprint}
                onChange={(e) => setFilterSprint(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="all">All Sprints</option>
                {availableSprints.map(sprint => (
                  <option key={sprint} value={sprint}>{sprint}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Bulk Actions */}
        {selectedBugs.length > 0 && (
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 mb-6 flex items-center justify-between">
            <span className="text-purple-900 font-medium">
              {selectedBugs.length} bug(s) selected
            </span>
            <div className="flex items-center space-x-3">
              <button
                onClick={handleBulkDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Delete Selected
              </button>
              <button
                onClick={() => setSelectedBugs([])}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Clear Selection
              </button>
            </div>
          </div>
        )}

        {/* Select All */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={selectedBugs.length === filteredBugs.length && filteredBugs.length > 0}
              onChange={handleSelectAll}
              className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
            />
            <span className="text-sm text-gray-600">Select All ({filteredBugs.length})</span>
          </div>
          <span className="text-sm text-gray-600">
            Showing {filteredBugs.length} of {bugs.length} bugs
          </span>
        </div>
      </div>

      {/* Bugs Grid */}
      <div className="grid grid-cols-1 gap-6">
        {filteredBugs.map(bug => (
          <BugCard
            key={bug.id}
            bug={bug}
            onView={handleView}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onSelect={handleSelect}
            isSelected={selectedBugs.includes(bug.id)}
          />
        ))}
      </div>

      {filteredBugs.length === 0 && (
        <div className="text-center py-12">
          <Bug className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600 text-lg">No bugs found</p>
        </div>
      )}

      {/* Modal */}
      <BugModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingBug(null);
        }}
        onSave={handleSave}
        bug={editingBug}
      />
    </div>
  );
};

export default IssuesManagement;