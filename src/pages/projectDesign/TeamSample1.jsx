import React, { useState } from 'react';
import { Plus, Eye, Edit, Trash2, User, Mail, Phone, Briefcase, Calendar, MapPin, Award, CheckCircle, XCircle, Clock } from 'lucide-react';

// Sample initial data - You'll integrate this with your backend later
const initialTeamMembers = [
  {
    id: 'user-1',
    name: 'Gaurav Singh',
    email: 'gaurav.singh@company.com',
    phone: '+91 98765 43210',
    role: 'super-admin',
    designation: 'Senior Full Stack Developer',
    department: 'Engineering',
    projects: ['TWR', 'ECP'],
    assignedBugs: 5,
    resolvedBugs: 23,
    joinDate: '2023-01-15',
    status: 'active',
    skills: ['React', 'Node.js', 'MongoDB', 'AWS'],
    avatar: 'https://ui-avatars.com/api/?name=Gaurav+Singh&background=7c3aed&color=fff',
    location: 'Delhi, India'
  },
  {
    id: 'user-2',
    name: 'Priya Sharma',
    email: 'priya.sharma@company.com',
    phone: '+91 98765 43211',
    role: 'admin',
    designation: 'Project Manager',
    department: 'Management',
    projects: ['ECP', 'MBA'],
    assignedBugs: 3,
    resolvedBugs: 45,
    joinDate: '2022-06-20',
    status: 'active',
    skills: ['Project Management', 'Agile', 'Scrum'],
    avatar: 'https://ui-avatars.com/api/?name=Priya+Sharma&background=3b82f6&color=fff',
    location: 'Mumbai, India'
  },
  {
    id: 'user-3',
    name: 'Rahul Verma',
    email: 'rahul.verma@company.com',
    phone: '+91 98765 43212',
    role: 'developer',
    designation: 'Backend Developer',
    department: 'Engineering',
    projects: ['MBA', 'HCP'],
    assignedBugs: 8,
    resolvedBugs: 34,
    joinDate: '2023-03-10',
    status: 'active',
    skills: ['Python', 'Django', 'PostgreSQL', 'Docker'],
    avatar: 'https://ui-avatars.com/api/?name=Rahul+Verma&background=10b981&color=fff',
    location: 'Bangalore, India'
  },
  {
    id: 'user-4',
    name: 'Anjali Patel',
    email: 'anjali.patel@company.com',
    phone: '+91 98765 43213',
    role: 'developer',
    designation: 'Frontend Developer',
    department: 'Engineering',
    projects: ['HCP', 'TWR'],
    assignedBugs: 6,
    resolvedBugs: 28,
    joinDate: '2023-07-01',
    status: 'active',
    skills: ['React', 'TypeScript', 'Tailwind CSS', 'Next.js'],
    avatar: 'https://ui-avatars.com/api/?name=Anjali+Patel&background=f59e0b&color=fff',
    location: 'Pune, India'
  },
  {
    id: 'user-5',
    name: 'Vikram Malhotra',
    email: 'vikram.malhotra@company.com',
    phone: '+91 98765 43214',
    role: 'tester',
    designation: 'QA Engineer',
    department: 'Quality Assurance',
    projects: ['TWR', 'ECP', 'MBA'],
    assignedBugs: 2,
    resolvedBugs: 67,
    joinDate: '2022-09-15',
    status: 'inactive',
    skills: ['Manual Testing', 'Selenium', 'Jest', 'Cypress'],
    avatar: 'https://ui-avatars.com/api/?name=Vikram+Malhotra&background=6366f1&color=fff',
    location: 'Hyderabad, India'
  }
];

const TeamMemberCard = ({ member, onView, onEdit, onDelete }) => {
  const getRoleColor = (role) => {
    const colors = {
      'super-admin': 'bg-purple-100 text-purple-800',
      'admin': 'bg-blue-100 text-blue-800',
      'developer': 'bg-green-100 text-green-800',
      'tester': 'bg-yellow-100 text-yellow-800',
      'viewer': 'bg-gray-100 text-gray-800'
    };
    return colors[role] || 'bg-gray-100 text-gray-800';
  };

  const getStatusColor = (status) => {
    return status === 'active' 
      ? 'bg-green-100 text-green-800' 
      : 'bg-red-100 text-red-800';
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-all">
      {/* Header with Avatar and Status */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-4">
          <img 
            src={member.avatar} 
            alt={member.name}
            className="w-16 h-16 rounded-full border-2 border-purple-200"
          />
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{member.name}</h3>
            <p className="text-sm text-gray-600">{member.designation}</p>
            <p className="text-xs text-gray-500 mt-1">{member.department}</p>
          </div>
        </div>
        <div className="flex flex-col items-end space-y-2">
          <span className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${getRoleColor(member.role)}`}>
            {member.role.toUpperCase()}
          </span>
          <span className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${getStatusColor(member.status)}`}>
            {member.status === 'active' ? <CheckCircle className="w-3 h-3 mr-1" /> : <XCircle className="w-3 h-3 mr-1" />}
            {member.status.toUpperCase()}
          </span>
        </div>
      </div>

      {/* Contact Info */}
      <div className="space-y-2 mb-4 pb-4 border-b border-gray-200">
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <Mail className="w-4 h-4 text-gray-400" />
          <span className="truncate">{member.email}</span>
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <Phone className="w-4 h-4 text-gray-400" />
          <span>{member.phone}</span>
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <MapPin className="w-4 h-4 text-gray-400" />
          <span>{member.location}</span>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3 mb-4">
        <div className="bg-blue-50 rounded-lg p-3 text-center">
          <p className="text-xs text-gray-600 mb-1">Projects</p>
          <p className="text-lg font-bold text-blue-600">{member.projects.length}</p>
        </div>
        <div className="bg-orange-50 rounded-lg p-3 text-center">
          <p className="text-xs text-gray-600 mb-1">Assigned</p>
          <p className="text-lg font-bold text-orange-600">{member.assignedBugs}</p>
        </div>
        <div className="bg-green-50 rounded-lg p-3 text-center">
          <p className="text-xs text-gray-600 mb-1">Resolved</p>
          <p className="text-lg font-bold text-green-600">{member.resolvedBugs}</p>
        </div>
      </div>

      {/* Projects */}
      <div className="mb-4">
        <p className="text-sm font-medium text-gray-700 mb-2">Projects:</p>
        <div className="flex flex-wrap gap-2">
          {member.projects.map((project, index) => (
            <span
              key={index}
              className="inline-flex px-2 py-1 text-xs bg-purple-100 text-purple-800 rounded"
            >
              {project}
            </span>
          ))}
        </div>
      </div>

      {/* Skills */}
      <div className="mb-4">
        <p className="text-sm font-medium text-gray-700 mb-2">Skills:</p>
        <div className="flex flex-wrap gap-2">
          {member.skills.slice(0, 3).map((skill, index) => (
            <span
              key={index}
              className="inline-flex px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded"
            >
              {skill}
            </span>
          ))}
          {member.skills.length > 3 && (
            <span className="inline-flex px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded">
              +{member.skills.length - 3} more
            </span>
          )}
        </div>
      </div>

      {/* Join Date */}
      <div className="mb-4 pb-4 border-b border-gray-200">
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <Calendar className="w-4 h-4 text-gray-400" />
          <span>Joined: {new Date(member.joinDate).toLocaleDateString()}</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-end space-x-2">
        <button
          onClick={() => onView(member.id)}
          className="text-blue-600 hover:text-blue-800 p-2 hover:bg-blue-50 rounded transition-colors"
          title="View details"
        >
          <Eye className="w-4 h-4" />
        </button>
        <button
          onClick={() => onEdit(member.id)}
          className="text-green-600 hover:text-green-800 p-2 hover:bg-green-50 rounded transition-colors"
          title="Edit member"
        >
          <Edit className="w-4 h-4" />
        </button>
        <button
          onClick={() => onDelete(member.id)}
          className="text-red-600 hover:text-red-800 p-2 hover:bg-red-50 rounded transition-colors"
          title="Delete member"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

const TeamMemberModal = ({ isOpen, onClose, onSave, member = null, availableProjects = [] }) => {
  const [formData, setFormData] = useState(member || {
    name: '',
    email: '',
    phone: '',
    role: 'developer',
    designation: '',
    department: 'Engineering',
    projects: [],
    skills: [],
    location: '',
    status: 'active',
    joinDate: new Date().toISOString().split('T')[0]
  });

  const [newSkill, setNewSkill] = useState('');

  if (!isOpen) return null;

  const handleSubmit = () => {
    onSave(formData);
  };

  const addSkill = () => {
    if (newSkill.trim() && !formData.skills.includes(newSkill.trim())) {
      setFormData({ ...formData, skills: [...formData.skills, newSkill.trim()] });
      setNewSkill('');
    }
  };

  const removeSkill = (skill) => {
    setFormData({ ...formData, skills: formData.skills.filter(s => s !== skill) });
  };

  const toggleProject = (project) => {
    const projects = formData.projects.includes(project)
      ? formData.projects.filter(p => p !== project)
      : [...formData.projects, project];
    setFormData({ ...formData, projects });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          {member ? 'Edit Team Member' : 'Add Team Member'}
        </h2>
        
        <div className="space-y-4">
          {/* Basic Info */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Enter full name"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email *
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="email@company.com"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="+91 98765 43210"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Location
              </label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="City, Country"
              />
            </div>
          </div>

          {/* Role & Department */}
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Role *
              </label>
              <select
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="super-admin">Super Admin</option>
                <option value="admin">Admin</option>
                <option value="developer">Developer</option>
                <option value="tester">Tester</option>
                <option value="viewer">Viewer</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Department
              </label>
              <select
                value={formData.department}
                onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="Engineering">Engineering</option>
                <option value="Management">Management</option>
                <option value="Quality Assurance">Quality Assurance</option>
                <option value="Design">Design</option>
                <option value="Operations">Operations</option>
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
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Designation
              </label>
              <input
                type="text"
                value={formData.designation}
                onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="e.g., Senior Developer"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Join Date
              </label>
              <input
                type="date"
                value={formData.joinDate}
                onChange={(e) => setFormData({ ...formData, joinDate: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Projects Assignment */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Assigned Projects
            </label>
            <div className="flex flex-wrap gap-2">
              {availableProjects.map((project) => (
                <button
                  key={project}
                  onClick={() => toggleProject(project)}
                  className={`px-3 py-1 text-sm rounded-lg transition-colors ${
                    formData.projects.includes(project)
                      ? 'bg-purple-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {project}
                </button>
              ))}
            </div>
          </div>

          {/* Skills */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Skills
            </label>
            <div className="flex space-x-2 mb-2">
              <input
                type="text"
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addSkill()}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Add a skill"
              />
              <button
                onClick={addSkill}
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
              >
                Add
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.skills.map((skill, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-3 py-1 bg-gray-100 text-gray-700 rounded-lg"
                >
                  {skill}
                  <button
                    onClick={() => removeSkill(skill)}
                    className="ml-2 text-red-500 hover:text-red-700"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>

          <div className="flex justify-end space-x-3 mt-6">
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
              {member ? 'Update Member' : 'Add Member'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const TeamSample1 = () => {
  const [teamMembers, setTeamMembers] = useState(initialTeamMembers);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingMember, setEditingMember] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');

  const availableProjects = ['TWR', 'ECP', 'MBA', 'HCP']; // This will come from your projects data

  const handleView = (id) => {
    alert(`Viewing team member: ${id}`);
  };

  const handleEdit = (id) => {
    const member = teamMembers.find(m => m.id === id);
    setEditingMember(member);
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    if (confirm('Are you sure you want to remove this team member?')) {
      setTeamMembers(teamMembers.filter(m => m.id !== id));
    }
  };

  const handleSave = (memberData) => {
    if (editingMember) {
      setTeamMembers(teamMembers.map(m => 
        m.id === editingMember.id ? { 
          ...memberData, 
          id: m.id,
          avatar: `https://ui-avatars.com/api/?name=${memberData.name.replace(' ', '+')}&background=7c3aed&color=fff`,
          assignedBugs: m.assignedBugs,
          resolvedBugs: m.resolvedBugs
        } : m
      ));
    } else {
      const newMember = {
        ...memberData,
        id: `user-${Date.now()}`,
        avatar: `https://ui-avatars.com/api/?name=${memberData.name.replace(' ', '+')}&background=7c3aed&color=fff`,
        assignedBugs: 0,
        resolvedBugs: 0
      };
      setTeamMembers([...teamMembers, newMember]);
    }
    setIsModalOpen(false);
    setEditingMember(null);
  };

  const filteredMembers = teamMembers.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.designation.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = filterRole === 'all' || member.role === filterRole;
    const matchesStatus = filterStatus === 'all' || member.status === filterStatus;
    return matchesSearch && matchesRole && matchesStatus;
  });

  const stats = {
    total: teamMembers.length,
    active: teamMembers.filter(m => m.status === 'active').length,
    developers: teamMembers.filter(m => m.role === 'developer').length,
    admins: teamMembers.filter(m => m.role === 'admin' || m.role === 'super-admin').length
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Team Management</h1>
            <p className="text-gray-600 mt-1">Manage your team members and their roles</p>
          </div>
          <button
            onClick={() => {
              setEditingMember(null);
              setIsModalOpen(true);
            }}
            className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            <Plus className="w-5 h-5" />
            <span>Add Member</span>
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Members</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{stats.total}</p>
              </div>
              <User className="w-8 h-8 text-purple-600" />
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
                <p className="text-sm text-gray-600">Developers</p>
                <p className="text-2xl font-bold text-blue-600 mt-1">{stats.developers}</p>
              </div>
              <Briefcase className="w-8 h-8 text-blue-600" />
            </div>
          </div>
          
          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Admins</p>
                <p className="text-2xl font-bold text-indigo-600 mt-1">{stats.admins}</p>
              </div>
              <Award className="w-8 h-8 text-indigo-600" />
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="flex items-center space-x-4">
          <input
            type="text"
            placeholder="Search team members..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
          <select
            value={filterRole}
            onChange={(e) => setFilterRole(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          >
            <option value="all">All Roles</option>
            <option value="super-admin">Super Admin</option>
            <option value="admin">Admin</option>
            <option value="developer">Developer</option>
            <option value="tester">Tester</option>
            <option value="viewer">Viewer</option>
          </select>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
      </div>

      {/* Team Members Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMembers.map(member => (
          <TeamMemberCard
            key={member.id}
            member={member}
            onView={handleView}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </div>

      {filteredMembers.length === 0 && (
        <div className="text-center py-12">
          <User className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600 text-lg">No team members found</p>
        </div>
      )}

      {/* Modal */}
      <TeamMemberModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingMember(null);
        }}
        onSave={handleSave}
        member={editingMember}
        availableProjects={availableProjects}
      />
    </div>
  );
};

export default TeamSample1;