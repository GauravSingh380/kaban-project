import React, { useState } from 'react';
import { Plus, Eye, Edit, Trash2, Folder, Calendar, User, CheckCircle, AlertCircle, Clock } from 'lucide-react';

// Sample initial data
const initialProjects = [
  {
    id: 'proj-1',
    name: 'TWR',
    code: 'TWR',
    description: 'Training and Workshop Registration system for educational institutions',
    status: 'active',
    startDate: '2024-01-15',
    endDate: '2025-06-30',
    manager: 'Gaurav Singh',
    teamSize: 8,
    totalBugs: 4,
    openBugs: 3,
    completionPercentage: 65,
    color: 'purple'
  },
  {
    id: 'proj-2',
    name: 'E-Commerce Platform',
    code: 'ECP',
    description: 'Modern e-commerce solution with advanced analytics and inventory management',
    status: 'active',
    startDate: '2024-03-01',
    endDate: '2025-12-31',
    manager: 'Priya Sharma',
    teamSize: 12,
    totalBugs: 8,
    openBugs: 5,
    completionPercentage: 45,
    color: 'blue'
  },
  {
    id: 'proj-3',
    name: 'Mobile Banking App',
    code: 'MBA',
    description: 'Secure mobile banking application with biometric authentication',
    status: 'planning',
    startDate: '2025-02-01',
    endDate: '2025-10-30',
    manager: 'Rahul Verma',
    teamSize: 6,
    totalBugs: 0,
    openBugs: 0,
    completionPercentage: 15,
    color: 'green'
  },
  {
    id: 'proj-4',
    name: 'Healthcare Portal',
    code: 'HCP',
    description: 'Patient management and telemedicine platform',
    status: 'completed',
    startDate: '2023-06-01',
    endDate: '2024-11-30',
    manager: 'Anjali Patel',
    teamSize: 10,
    totalBugs: 2,
    openBugs: 0,
    completionPercentage: 100,
    color: 'indigo'
  }
];

const ProjectCard = ({ project, onView, onEdit, onDelete }) => {
  const getStatusColor = (status) => {
    const colors = {
      active: 'bg-green-100 text-green-800',
      planning: 'bg-yellow-100 text-yellow-800',
      onhold: 'bg-orange-100 text-orange-800',
      completed: 'bg-blue-100 text-blue-800',
      archived: 'bg-gray-100 text-gray-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const getColorClasses = (color) => {
    const colors = {
      purple: 'border-purple-200 bg-purple-50',
      blue: 'border-blue-200 bg-blue-50',
      green: 'border-green-200 bg-green-50',
      indigo: 'border-indigo-200 bg-indigo-50',
      red: 'border-red-200 bg-red-50',
      orange: 'border-orange-200 bg-orange-50'
    };
    return colors[color] || 'border-gray-200 bg-gray-50';
  };

  return (
    <div className={`bg-white border-2 rounded-lg p-6 hover:shadow-lg transition-all ${getColorClasses(project.color)}`}>
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className={`p-3 rounded-lg bg-${project.color}-100`}>
            <Folder className={`w-6 h-6 text-${project.color}-600`} />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-900">{project.name}</h3>
            <p className="text-sm font-medium text-gray-500">{project.code}</p>
          </div>
        </div>
        <span className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${getStatusColor(project.status)}`}>
          {project.status.toUpperCase()}
        </span>
      </div>

      <p className="text-sm text-gray-600 mb-4 line-clamp-2">{project.description}</p>

      {/* Progress Bar */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-1">
          <span className="text-xs font-medium text-gray-600">Progress</span>
          <span className="text-xs font-semibold text-gray-900">{project.completionPercentage}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className={`bg-${project.color}-600 h-2 rounded-full transition-all`}
            style={{ width: `${project.completionPercentage}%` }}
          ></div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="bg-white rounded-lg p-3 border border-gray-200">
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-600">Team Size</span>
            <User className="w-4 h-4 text-gray-400" />
          </div>
          <p className="text-lg font-bold text-gray-900 mt-1">{project.teamSize}</p>
        </div>
        <div className="bg-white rounded-lg p-3 border border-gray-200">
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-600">Open Bugs</span>
            <AlertCircle className="w-4 h-4 text-red-400" />
          </div>
          <p className="text-lg font-bold text-gray-900 mt-1">{project.openBugs}/{project.totalBugs}</p>
        </div>
      </div>

      {/* Dates */}
      <div className="grid grid-cols-2 gap-3 mb-4 text-xs">
        <div className="flex items-center space-x-2">
          <Calendar className="w-3 h-3 text-gray-400" />
          <span className="text-gray-600">Start: {new Date(project.startDate).toLocaleDateString()}</span>
        </div>
        <div className="flex items-center space-x-2">
          <Clock className="w-3 h-3 text-gray-400" />
          <span className="text-gray-600">End: {new Date(project.endDate).toLocaleDateString()}</span>
        </div>
      </div>

      {/* Manager */}
      <div className="mb-4 pb-4 border-b border-gray-200">
        <div className="flex items-center space-x-2">
          <User className="w-4 h-4 text-gray-400" />
          <span className="text-sm text-gray-600">Manager:</span>
          <span className="text-sm font-medium text-gray-900">{project.manager}</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-end space-x-2">
        <button
          onClick={() => onView(project.id)}
          className="text-blue-600 hover:text-blue-800 p-2 hover:bg-blue-50 rounded transition-colors"
          title="View details"
        >
          <Eye className="w-4 h-4" />
        </button>
        <button
          onClick={() => onEdit(project.id)}
          className="text-green-600 hover:text-green-800 p-2 hover:bg-green-50 rounded transition-colors"
          title="Edit project"
        >
          <Edit className="w-4 h-4" />
        </button>
        <button
          onClick={() => onDelete(project.id)}
          className="text-red-600 hover:text-red-800 p-2 hover:bg-red-50 rounded transition-colors"
          title="Delete project"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

const ProjectModal = ({ isOpen, onClose, onSave, project = null }) => {
  const [formData, setFormData] = useState(project || {
    name: '',
    code: '',
    description: '',
    status: 'planning',
    startDate: '',
    endDate: '',
    manager: '',
    teamSize: 1,
    color: 'purple'
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          {project ? 'Edit Project' : 'Create New Project'}
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Project Name *
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Enter project name"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Project Code *
              </label>
              <input
                type="text"
                required
                value={formData.code}
                onChange={(e) => setFormData({ ...formData, code: e.target.value.toUpperCase() })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="e.g., TWR"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              rows="3"
              placeholder="Project description"
            />
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
                <option value="planning">Planning</option>
                <option value="active">Active</option>
                <option value="onhold">On Hold</option>
                <option value="completed">Completed</option>
                <option value="archived">Archived</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Color Theme
              </label>
              <select
                value={formData.color}
                onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="purple">Purple</option>
                <option value="blue">Blue</option>
                <option value="green">Green</option>
                <option value="indigo">Indigo</option>
                <option value="red">Red</option>
                <option value="orange">Orange</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Start Date *
              </label>
              <input
                type="date"
                required
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
                required
                value={formData.endDate}
                onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Project Manager *
              </label>
              <input
                type="text"
                required
                value={formData.manager}
                onChange={(e) => setFormData({ ...formData, manager: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Manager name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Team Size
              </label>
              <input
                type="number"
                min="1"
                value={formData.teamSize}
                onChange={(e) => setFormData({ ...formData, teamSize: parseInt(e.target.value) })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
          </div>

          <div className="flex justify-end space-x-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              {project ? 'Update Project' : 'Create Project'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const ProjectSample1 = () => {
  const [projects, setProjects] = useState(initialProjects);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const handleView = (id) => {
    alert(`Viewing project: ${id}`);
  };

  const handleEdit = (id) => {
    const project = projects.find(p => p.id === id);
    setEditingProject(project);
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    if (confirm('Are you sure you want to delete this project?')) {
      setProjects(projects.filter(p => p.id !== id));
    }
  };

  const handleSave = (projectData) => {
    if (editingProject) {
      setProjects(projects.map(p => 
        p.id === editingProject.id ? { ...projectData, id: p.id } : p
      ));
    } else {
      const newProject = {
        ...projectData,
        id: `proj-${Date.now()}`,
        totalBugs: 0,
        openBugs: 0,
        completionPercentage: 0
      };
      setProjects([...projects, newProject]);
    }
    setIsModalOpen(false);
    setEditingProject(null);
  };

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.code.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || project.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const stats = {
    total: projects.length,
    active: projects.filter(p => p.status === 'active').length,
    planning: projects.filter(p => p.status === 'planning').length,
    completed: projects.filter(p => p.status === 'completed').length
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Projects</h1>
            <p className="text-gray-600 mt-1">Manage and track all your projects</p>
          </div>
          <button
            onClick={() => {
              setEditingProject(null);
              setIsModalOpen(true);
            }}
            className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            <Plus className="w-5 h-5" />
            <span>Add Project</span>
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Projects</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{stats.total}</p>
              </div>
              <Folder className="w-8 h-8 text-purple-600" />
            </div>
          </div>
          
          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Active</p>
                <p className="text-2xl font-bold text-green-600 mt-1">{stats.active}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
          </div>
          
          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Planning</p>
                <p className="text-2xl font-bold text-yellow-600 mt-1">{stats.planning}</p>
              </div>
              <Clock className="w-8 h-8 text-yellow-600" />
            </div>
          </div>
          
          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Completed</p>
                <p className="text-2xl font-bold text-blue-600 mt-1">{stats.completed}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-blue-600" />
            </div>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="flex items-center space-x-4">
          <input
            type="text"
            placeholder="Search projects..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="planning">Planning</option>
            <option value="onhold">On Hold</option>
            <option value="completed">Completed</option>
            <option value="archived">Archived</option>
          </select>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map(project => (
          <ProjectCard
            key={project.id}
            project={project}
            onView={handleView}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </div>

      {filteredProjects.length === 0 && (
        <div className="text-center py-12">
          <Folder className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600 text-lg">No projects found</p>
        </div>
      )}

      {/* Modal */}
      <ProjectModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingProject(null);
        }}
        onSave={handleSave}
        project={editingProject}
      />
    </div>
  );
};

export default ProjectSample1;