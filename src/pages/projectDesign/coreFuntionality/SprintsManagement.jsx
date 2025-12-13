import React, { useState } from 'react';
import { Plus, Edit, Trash2, Play, Pause, CheckCircle, Calendar, Clock, Target, TrendingUp, Bug, AlertCircle } from 'lucide-react';

// Sample data
const initialSprints = [
  {
    id: 'sprint-5',
    name: 'Sprint 5',
    goal: 'Complete user authentication and profile management features',
    startDate: '2025-12-09',
    endDate: '2025-12-22',
    status: 'active',
    project: 'TWR',
    projectId: 'proj-1',
    totalStoryPoints: 34,
    completedStoryPoints: 18,
    totalBugs: 8,
    completedBugs: 3,
    inProgressBugs: 3,
    openBugs: 2,
    teamMembers: ['user-1', 'user-2', 'user-4']
  },
  {
    id: 'sprint-4',
    name: 'Sprint 4',
    goal: 'Dashboard improvements and bug fixes',
    startDate: '2025-11-25',
    endDate: '2025-12-08',
    status: 'completed',
    project: 'TWR',
    projectId: 'proj-1',
    totalStoryPoints: 30,
    completedStoryPoints: 30,
    totalBugs: 12,
    completedBugs: 12,
    inProgressBugs: 0,
    openBugs: 0,
    teamMembers: ['user-1', 'user-2', 'user-3']
  },
  {
    id: 'sprint-6',
    name: 'Sprint 6',
    goal: 'E-commerce checkout flow and payment integration',
    startDate: '2025-12-23',
    endDate: '2026-01-05',
    status: 'planned',
    project: 'ECP',
    projectId: 'proj-2',
    totalStoryPoints: 40,
    completedStoryPoints: 0,
    totalBugs: 0,
    completedBugs: 0,
    inProgressBugs: 0,
    openBugs: 0,
    teamMembers: ['user-2', 'user-3']
  }
];

const initialBacklog = [
  {
    id: 'backlog-1',
    title: 'Implement dark mode',
    description: 'Add dark mode theme support across the application',
    priority: 'medium',
    storyPoints: 8,
    project: 'TWR',
    assignedTo: null
  },
  {
    id: 'backlog-2',
    title: 'Email notification system',
    description: 'Set up automated email notifications for bug updates',
    priority: 'high',
    storyPoints: 13,
    project: 'TWR',
    assignedTo: null
  },
  {
    id: 'backlog-3',
    title: 'Mobile responsive fixes',
    description: 'Fix responsive issues on mobile devices',
    priority: 'critical',
    storyPoints: 5,
    project: 'ECP',
    assignedTo: null
  }
];

const availableProjects = ['TWR', 'ECP', 'MBA', 'HCP'];

const SprintCard = ({ sprint, onEdit, onDelete, onToggleStatus }) => {
  const getStatusColor = (status) => {
    const colors = {
      planned: 'bg-gray-100 text-gray-800',
      active: 'bg-blue-100 text-blue-800',
      completed: 'bg-green-100 text-green-800',
      cancelled: 'bg-red-100 text-red-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const getStatusIcon = (status) => {
    if (status === 'active') return <Play className="w-4 h-4" />;
    if (status === 'completed') return <CheckCircle className="w-4 h-4" />;
    if (status === 'planned') return <Clock className="w-4 h-4" />;
    return <Pause className="w-4 h-4" />;
  };

  const completionPercentage = sprint.totalStoryPoints > 0
    ? Math.round((sprint.completedStoryPoints / sprint.totalStoryPoints) * 100)
    : 0;

  const bugCompletionPercentage = sprint.totalBugs > 0
    ? Math.round((sprint.completedBugs / sprint.totalBugs) * 100)
    : 0;

  const daysRemaining = Math.ceil(
    (new Date(sprint.endDate) - new Date()) / (1000 * 60 * 60 * 24)
  );

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-all">
      <div className="flex items-start justify-between mb-4">
        <div>
          <div className="flex items-center space-x-3 mb-2">
            <h3 className="text-xl font-bold text-gray-900">{sprint.name}</h3>
            <span className={`inline-flex items-center space-x-1 px-3 py-1 text-xs font-semibold rounded-full ${getStatusColor(sprint.status)}`}>
              {getStatusIcon(sprint.status)}
              <span>{sprint.status.toUpperCase()}</span>
            </span>
          </div>
          <p className="text-sm text-purple-600 font-medium">{sprint.project}</p>
        </div>
        <div className="flex items-center space-x-2">
          {sprint.status === 'planned' && (
            <button
              onClick={() => onToggleStatus(sprint.id, 'active')}
              className="text-blue-600 hover:text-blue-800 p-2 hover:bg-blue-50 rounded transition-colors"
              title="Start sprint"
            >
              <Play className="w-5 h-5" />
            </button>
          )}
          {sprint.status === 'active' && (
            <button
              onClick={() => onToggleStatus(sprint.id, 'completed')}
              className="text-green-600 hover:text-green-800 p-2 hover:bg-green-50 rounded transition-colors"
              title="Complete sprint"
            >
              <CheckCircle className="w-5 h-5" />
            </button>
          )}
          <button
            onClick={() => onEdit(sprint.id)}
            className="text-gray-600 hover:text-gray-800 p-2 hover:bg-gray-50 rounded transition-colors"
            title="Edit sprint"
          >
            <Edit className="w-5 h-5" />
          </button>
          <button
            onClick={() => onDelete(sprint.id)}
            className="text-red-600 hover:text-red-800 p-2 hover:bg-red-50 rounded transition-colors"
            title="Delete sprint"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="mb-4 pb-4 border-b border-gray-200">
        <div className="flex items-start space-x-2">
          <Target className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
          <p className="text-sm text-gray-700">{sprint.goal}</p>
        </div>
      </div>

      {/* Timeline */}
      <div className="mb-4 pb-4 border-b border-gray-200">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center space-x-2">
            <Calendar className="w-4 h-4 text-gray-400" />
            <div>
              <p className="text-gray-600">Start Date</p>
              <p className="font-medium text-gray-900">{new Date(sprint.startDate).toLocaleDateString()}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Calendar className="w-4 h-4 text-gray-400" />
            <div>
              <p className="text-gray-600">End Date</p>
              <p className="font-medium text-gray-900">{new Date(sprint.endDate).toLocaleDateString()}</p>
            </div>
          </div>
        </div>
        {sprint.status === 'active' && (
          <div className="mt-3 flex items-center space-x-2">
            <Clock className="w-4 h-4 text-orange-500" />
            <span className="text-sm font-medium text-orange-600">
              {daysRemaining > 0 ? `${daysRemaining} days remaining` : 'Sprint ended'}
            </span>
          </div>
        )}
      </div>

      {/* Progress */}
      <div className="space-y-4 mb-4">
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">Story Points Progress</span>
            <span className="text-sm font-bold text-gray-900">
              {sprint.completedStoryPoints}/{sprint.totalStoryPoints} ({completionPercentage}%)
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div 
              className="bg-purple-600 h-3 rounded-full transition-all"
              style={{ width: `${completionPercentage}%` }}
            ></div>
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">Bugs Resolution</span>
            <span className="text-sm font-bold text-gray-900">
              {sprint.completedBugs}/{sprint.totalBugs} ({bugCompletionPercentage}%)
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div 
              className="bg-green-600 h-3 rounded-full transition-all"
              style={{ width: `${bugCompletionPercentage}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Bug Stats */}
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-red-50 rounded-lg p-3 text-center">
          <p className="text-xs text-gray-600 mb-1">Open</p>
          <p className="text-lg font-bold text-red-600">{sprint.openBugs}</p>
        </div>
        <div className="bg-blue-50 rounded-lg p-3 text-center">
          <p className="text-xs text-gray-600 mb-1">In Progress</p>
          <p className="text-lg font-bold text-blue-600">{sprint.inProgressBugs}</p>
        </div>
        <div className="bg-green-50 rounded-lg p-3 text-center">
          <p className="text-xs text-gray-600 mb-1">Completed</p>
          <p className="text-lg font-bold text-green-600">{sprint.completedBugs}</p>
        </div>
      </div>
    </div>
  );
};

const SprintModal = ({ isOpen, onClose, onSave, sprint = null }) => {
  const [formData, setFormData] = useState(sprint || {
    name: '',
    goal: '',
    startDate: '',
    endDate: '',
    status: 'planned',
    project: '',
    projectId: '',
    totalStoryPoints: 0,
    completedStoryPoints: 0,
    totalBugs: 0,
    completedBugs: 0,
    inProgressBugs: 0,
    openBugs: 0
  });

  if (!isOpen) return null;

  const handleSubmit = () => {
    if (!formData.name || !formData.project || !formData.startDate || !formData.endDate) {
      alert('Please fill in all required fields');
      return;
    }
    onSave(formData);
  };

  const handleProjectChange = (projectCode) => {
    const projectId = `proj-${projectCode}`;
    setFormData({ ...formData, project: projectCode, projectId });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          {sprint ? 'Edit Sprint' : 'Create New Sprint'}
        </h2>
        
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Sprint Name *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="e.g., Sprint 5"
              />
            </div>

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
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Sprint Goal *
            </label>
            <textarea
              value={formData.goal}
              onChange={(e) => setFormData({ ...formData, goal: e.target.value })}
              rows="3"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="What do you want to achieve in this sprint?"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Start Date *
              </label>
              <input
                type="date"
                value={formData.startDate}
                onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                End Date *
              </label>
              <input
                type="date"
                value={formData.endDate}
                onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Status
              </label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="planned">Planned</option>
                <option value="active">Active</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Total Story Points
              </label>
              <input
                type="number"
                min="0"
                value={formData.totalStoryPoints}
                onChange={(e) => setFormData({ ...formData, totalStoryPoints: parseInt(e.target.value) || 0 })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
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
              {sprint ? 'Update Sprint' : 'Create Sprint'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const BacklogCard = ({ item, onAddToSprint }) => {
  const getPriorityColor = (priority) => {
    const colors = {
      low: 'bg-green-100 text-green-800',
      medium: 'bg-yellow-100 text-yellow-800',
      high: 'bg-orange-100 text-orange-800',
      critical: 'bg-red-100 text-red-800'
    };
    return colors[priority] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-2">
        <h4 className="font-medium text-gray-900">{item.title}</h4>
        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPriorityColor(item.priority)}`}>
          {item.priority}
        </span>
      </div>
      <p className="text-sm text-gray-600 mb-3">{item.description}</p>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3 text-sm text-gray-600">
          <span className="inline-flex items-center">
            <TrendingUp className="w-3 h-3 mr-1" />
            {item.storyPoints} pts
          </span>
          <span className="text-purple-600">{item.project}</span>
        </div>
        <button
          onClick={() => onAddToSprint(item.id)}
          className="text-purple-600 hover:text-purple-800 text-sm font-medium"
        >
          Add to Sprint
        </button>
      </div>
    </div>
  );
};

const SprintsManagement = () => {
  const [sprints, setSprints] = useState(initialSprints);
  const [backlog, setBacklog] = useState(initialBacklog);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSprint, setEditingSprint] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterProject, setFilterProject] = useState('all');

  const handleEdit = (id) => {
    const sprint = sprints.find(s => s.id === id);
    setEditingSprint(sprint);
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    if (confirm('Are you sure you want to delete this sprint?')) {
      setSprints(sprints.filter(s => s.id !== id));
    }
  };

  const handleToggleStatus = (id, newStatus) => {
    setSprints(sprints.map(s => 
      s.id === id ? { ...s, status: newStatus } : s
    ));
  };

  const handleSave = (sprintData) => {
    if (editingSprint) {
      setSprints(sprints.map(s => 
        s.id === editingSprint.id ? { ...sprintData, id: s.id } : s
      ));
    } else {
      const newSprint = {
        ...sprintData,
        id: `sprint-${Date.now()}`,
        teamMembers: []
      };
      setSprints([...sprints, newSprint]);
    }
    setIsModalOpen(false);
    setEditingSprint(null);
  };

  const handleAddToSprint = (itemId) => {
    alert(`Add backlog item ${itemId} to a sprint`);
  };

  const filteredSprints = sprints.filter(sprint => {
    const matchesStatus = filterStatus === 'all' || sprint.status === filterStatus;
    const matchesProject = filterProject === 'all' || sprint.project === filterProject;
    return matchesStatus && matchesProject;
  });

  const stats = {
    total: sprints.length,
    active: sprints.filter(s => s.status === 'active').length,
    planned: sprints.filter(s => s.status === 'planned').length,
    completed: sprints.filter(s => s.status === 'completed').length
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Sprint Management</h1>
            <p className="text-gray-600 mt-1">Plan and track your development sprints</p>
          </div>
          <button
            onClick={() => {
              setEditingSprint(null);
              setIsModalOpen(true);
            }}
            className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            <Plus className="w-5 h-5" />
            <span>Create Sprint</span>
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Sprints</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{stats.total}</p>
              </div>
              <Target className="w-8 h-8 text-purple-600" />
            </div>
          </div>
          
          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Active</p>
                <p className="text-2xl font-bold text-blue-600 mt-1">{stats.active}</p>
              </div>
              <Play className="w-8 h-8 text-blue-600" />
            </div>
          </div>
          
          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Planned</p>
                <p className="text-2xl font-bold text-gray-600 mt-1">{stats.planned}</p>
              </div>
              <Clock className="w-8 h-8 text-gray-600" />
            </div>
          </div>
          
          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Completed</p>
                <p className="text-2xl font-bold text-green-600 mt-1">{stats.completed}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex items-center space-x-4">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          >
            <option value="all">All Status</option>
            <option value="planned">Planned</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>

          <select
            value={filterProject}
            onChange={(e) => setFilterProject(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          >
            <option value="all">All Projects</option>
            {availableProjects.map(project => (
              <option key={project} value={project}>{project}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sprints List */}
        <div className="lg:col-span-2">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Sprints</h2>
          <div className="space-y-6">
            {filteredSprints.map(sprint => (
              <SprintCard
                key={sprint.id}
                sprint={sprint}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onToggleStatus={handleToggleStatus}
              />
            ))}
          </div>

          {filteredSprints.length === 0 && (
            <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
              <Target className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 text-lg">No sprints found</p>
            </div>
          )}
        </div>

        {/* Backlog */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg border border-gray-200 p-6 sticky top-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Backlog</h2>
            <div className="space-y-4 max-h-[600px] overflow-y-auto">
              {backlog.map(item => (
                <BacklogCard
                  key={item.id}
                  item={item}
                  onAddToSprint={handleAddToSprint}
                />
              ))}
            </div>
            {backlog.length === 0 && (
              <p className="text-center text-gray-500 py-8">No items in backlog</p>
            )}
          </div>
        </div>
      </div>

      {/* Modal */}
      <SprintModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingSprint(null);
        }}
        onSave={handleSave}
        sprint={editingSprint}
      />
    </div>
  );
};

export default SprintsManagement;