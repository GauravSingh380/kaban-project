import React, { useState } from 'react';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  Folder, 
  Users, 
  Bug, 
  Calendar,
  AlertCircle,
  CheckCircle,
  Clock
} from 'lucide-react';

const ProjectCard = ({ project, onView, onEdit, onDelete }) => {
  const getStatusColor = (status) => {
    const colors = {
      active: 'bg-green-100 text-green-800',
      planning: 'bg-blue-100 text-blue-800',
      onhold: 'bg-yellow-100 text-yellow-800',
      completed: 'bg-purple-100 text-purple-800',
      archived: 'bg-gray-100 text-gray-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const getStatusIcon = (status) => {
    const icons = {
      active: <CheckCircle className="w-4 h-4" />,
      planning: <Clock className="w-4 h-4" />,
      onhold: <AlertCircle className="w-4 h-4" />,
      completed: <CheckCircle className="w-4 h-4" />,
      archived: <Folder className="w-4 h-4" />
    };
    return icons[status] || <Folder className="w-4 h-4" />;
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center">
            <Folder className="w-6 h-6 text-purple-600" />
          </div>
          <div>
            <h3 className="text-xl font-medium text-gray-900">{project.name}</h3>
            <p className="text-sm text-gray-500">{project.code}</p>
          </div>
        </div>
        <span className={`inline-flex items-center space-x-1 px-3 py-1 text-xs font-semibold rounded-full ${getStatusColor(project.status)}`}>
          {getStatusIcon(project.status)}
          <span className="ml-1">{project.status}</span>
        </span>
      </div>

      <p className="text-sm text-gray-600 mb-4 line-clamp-2">{project.description}</p>

      <div className="grid grid-cols-3 gap-4 mb-4">
        <div className="flex flex-col items-center p-3 bg-red-50 rounded-lg">
          <Bug className="w-5 h-5 text-red-600 mb-1" />
          <span className="text-2xl font-bold text-red-600">{project.totalBugs}</span>
          <span className="text-xs text-gray-600">Total Bugs</span>
        </div>
        <div className="flex flex-col items-center p-3 bg-blue-50 rounded-lg">
          <Users className="w-5 h-5 text-blue-600 mb-1" />
          <span className="text-2xl font-bold text-blue-600">{project.teamSize}</span>
          <span className="text-xs text-gray-600">Team Members</span>
        </div>
        <div className="flex flex-col items-center p-3 bg-green-50 rounded-lg">
          <CheckCircle className="w-5 h-5 text-green-600 mb-1" />
          <span className="text-2xl font-bold text-green-600">{project.progress}%</span>
          <span className="text-xs text-gray-600">Progress</span>
        </div>
      </div>

      <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
        <div className="flex items-center space-x-2">
          <Calendar className="w-4 h-4" />
          <span>Start: {new Date(project.startDate).toLocaleDateString()}</span>
        </div>
        <div className="flex items-center space-x-2">
          <Calendar className="w-4 h-4" />
          <span>Due: {new Date(project.dueDate).toLocaleDateString()}</span>
        </div>
      </div>

      <div className="mb-4">
        <p className="text-sm font-medium text-gray-700 mb-2">Tech Stack:</p>
        <div className="flex flex-wrap gap-2">
          {project.techStack.map((tech, index) => (
            <span
              key={index}
              className="inline-flex px-2 py-1 text-xs rounded-sm bg-blue-100 text-blue-800"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      <div className="pt-4 border-t border-gray-200 flex items-center justify-between">
        <div className="text-sm text-gray-600">
          <span className="font-medium">Manager:</span> {project.manager}
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => onView(project.id)}
            className="text-blue-600 hover:text-blue-800 p-2 hover:bg-blue-50 rounded cursor-pointer"
            title="View project"
          >
            <Eye className="w-4 h-4" />
          </button>
          <button
            onClick={() => onEdit(project.id)}
            className="text-green-600 hover:text-green-800 p-2 hover:bg-green-50 rounded cursor-pointer"
            title="Edit project"
          >
            <Edit className="w-4 h-4" />
          </button>
          <button
            onClick={() => onDelete(project.id)}
            className="text-red-600 hover:text-red-800 p-2 hover:bg-red-50 rounded cursor-pointer"
            title="Delete project"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

const ProjectSample2 = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Sample data - replace with your API calls
  const [projects, setProjects] = useState([
    {
      id: 1,
      name: 'Training Web Report',
      code: 'TWR',
      description: 'A comprehensive training and reporting platform for educational institutions with real-time progress tracking',
      status: 'active',
      totalBugs: 4,
      teamSize: 8,
      progress: 75,
      startDate: '2025-01-15',
      dueDate: '2025-06-30',
      techStack: ['React', 'Node.js', 'MongoDB', 'Express'],
      manager: 'Gaurav Singh'
    },
    {
      id: 2,
      name: 'E-Commerce Platform',
      code: 'ECP',
      description: 'Modern e-commerce solution with payment gateway integration and inventory management',
      status: 'planning',
      totalBugs: 0,
      teamSize: 6,
      progress: 25,
      startDate: '2025-02-01',
      dueDate: '2025-08-15',
      techStack: ['Next.js', 'PostgreSQL', 'Stripe', 'AWS'],
      manager: 'Ashok Reddy'
    },
    {
      id: 3,
      name: 'Mobile Healthcare App',
      code: 'MHA',
      description: 'Healthcare management app for patient records and appointment scheduling',
      status: 'onhold',
      totalBugs: 12,
      teamSize: 5,
      progress: 60,
      startDate: '2024-11-01',
      dueDate: '2025-04-30',
      techStack: ['React Native', 'Firebase', 'GraphQL'],
      manager: 'Dr. Sharma'
    },
    {
      id: 4,
      name: 'Analytics Dashboard',
      code: 'ADB',
      description: 'Business intelligence dashboard with real-time data visualization',
      status: 'completed',
      totalBugs: 2,
      teamSize: 4,
      progress: 100,
      startDate: '2024-09-01',
      dueDate: '2024-12-31',
      techStack: ['Vue.js', 'D3.js', 'Python', 'Django'],
      manager: 'Priya Kumar'
    }
  ]);

  const handleView = (id) => {
    console.log('View project:', id);
    // Navigate to project details page
  };

  const handleEdit = (id) => {
    console.log('Edit project:', id);
    // Open edit modal or navigate to edit page
  };

  const handleDelete = (id) => {
    console.log('Delete project:', id);
    // Show confirmation modal and delete
  };

  const handleAddProject = () => {
    console.log('Add new project');
    // Open add project modal
  };

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.code.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || project.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const statusCounts = {
    all: projects.length,
    active: projects.filter(p => p.status === 'active').length,
    planning: projects.filter(p => p.status === 'planning').length,
    onhold: projects.filter(p => p.status === 'onhold').length,
    completed: projects.filter(p => p.status === 'completed').length
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Projects</h1>
            <p className="text-gray-600 mt-1">Manage and track all your projects</p>
          </div>
          <button
            onClick={handleAddProject}
            className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            <Plus className="w-5 h-5" />
            <span>Add Project</span>
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-5 gap-4 mb-6">
          <div className="bg-white p-4 rounded-lg border border-gray-200 text-center">
            <div className="text-3xl font-bold text-gray-900">{statusCounts.all}</div>
            <div className="text-sm text-gray-600">Total Projects</div>
          </div>
          <div className="bg-white p-4 rounded-lg border border-gray-200 text-center">
            <div className="text-3xl font-bold text-green-600">{statusCounts.active}</div>
            <div className="text-sm text-gray-600">Active</div>
          </div>
          <div className="bg-white p-4 rounded-lg border border-gray-200 text-center">
            <div className="text-3xl font-bold text-blue-600">{statusCounts.planning}</div>
            <div className="text-sm text-gray-600">Planning</div>
          </div>
          <div className="bg-white p-4 rounded-lg border border-gray-200 text-center">
            <div className="text-3xl font-bold text-yellow-600">{statusCounts.onhold}</div>
            <div className="text-sm text-gray-600">On Hold</div>
          </div>
          <div className="bg-white p-4 rounded-lg border border-gray-200 text-center">
            <div className="text-3xl font-bold text-purple-600">{statusCounts.completed}</div>
            <div className="text-sm text-gray-600">Completed</div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex items-center space-x-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search projects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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
          <Folder className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No projects found</h3>
          <p className="text-gray-600">Try adjusting your search or filters</p>
        </div>
      )}
    </div>
  );
};

export default ProjectSample2;