import React, { useState, useEffect, useMemo } from 'react';
import {
  Calendar,
  Clock,
  Users,
  Target,
  TrendingUp,
  Plus,
  Filter,
  Search,
  MoreHorizontal,
  Edit3,
  Trash2,
  CheckCircle2,
  AlertCircle,
  Timer,
  Flag,
  User,
  GitBranch,
  Activity,
  BarChart3,
  PlayCircle,
  PauseCircle,
  Square,
  ChevronDown,
  ChevronRight,
  MessageSquare,
  Paperclip,
  Eye,
  Settings,
  Download,
  Upload
} from 'lucide-react';

const SprintManagement4 = () => {
  const [selectedSprint, setSelectedSprint] = useState(null);
  const [activeView, setActiveView] = useState('board'); // board, list, timeline, reports
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterAssignee, setFilterAssignee] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  // Mock data for sprints
  const [sprints] = useState([
    {
      id: 1,
      name: 'Sprint 24 - User Authentication',
      project: 'Project Alpha',
      status: 'active',
      startDate: '2024-07-15',
      endDate: '2024-07-29',
      duration: 14,
      goal: 'Implement complete user authentication system with OAuth integration',
      velocity: 42,
      capacity: 50,
      burndownData: [
        { day: 1, remaining: 45 },
        { day: 2, remaining: 42 },
        { day: 3, remaining: 40 },
        { day: 4, remaining: 38 },
        { day: 5, remaining: 35 },
        { day: 6, remaining: 32 },
        { day: 7, remaining: 28 }
      ]
    },
    {
      id: 2,
      name: 'Sprint 23 - Dashboard Redesign',
      project: 'Project Alpha',
      status: 'completed',
      startDate: '2024-07-01',
      endDate: '2024-07-14',
      duration: 14,
      goal: 'Redesign main dashboard with improved UX',
      velocity: 38,
      capacity: 40
    },
    {
      id: 3,
      name: 'Sprint 25 - API Integration',
      project: 'Project Beta',
      status: 'planned',
      startDate: '2024-07-30',
      endDate: '2024-08-13',
      duration: 14,
      goal: 'Integrate third-party APIs for data synchronization',
      velocity: 0,
      capacity: 45
    }
  ]);

  // Mock data for tasks
  const [tasks] = useState([
    {
      id: 1,
      title: 'Implement OAuth 2.0 Login',
      description: 'Add Google and GitHub OAuth integration',
      status: 'in_progress',
      priority: 'high',
      storyPoints: 8,
      assignee: { name: 'John Doe', avatar: 'JD' },
      labels: ['backend', 'authentication'],
      sprint: 1,
      comments: 3,
      attachments: 1,
      subtasks: [
        { id: 1, title: 'Setup OAuth providers', completed: true },
        { id: 2, title: 'Create auth middleware', completed: true },
        { id: 3, title: 'Implement token refresh', completed: false },
        { id: 4, title: 'Add error handling', completed: false }
      ]
    },
    {
      id: 2,
      title: 'Design Login UI Components',
      description: 'Create reusable login form components',
      status: 'completed',
      priority: 'medium',
      storyPoints: 5,
      assignee: { name: 'Jane Smith', avatar: 'JS' },
      labels: ['frontend', 'ui'],
      sprint: 1,
      comments: 7,
      attachments: 2,
      subtasks: []
    },
    {
      id: 3,
      title: 'Setup JWT Token Management',
      description: 'Implement secure token storage and refresh',
      status: 'todo',
      priority: 'high',
      storyPoints: 6,
      assignee: { name: 'Mike Johnson', avatar: 'MJ' },
      labels: ['backend', 'security'],
      sprint: 1,
      comments: 1,
      attachments: 0,
      subtasks: []
    },
    {
      id: 4,
      title: 'Add Password Reset Flow',
      description: 'Email-based password reset functionality',
      status: 'in_review',
      priority: 'medium',
      storyPoints: 4,
      assignee: { name: 'Sarah Wilson', avatar: 'SW' },
      labels: ['backend', 'email'],
      sprint: 1,
      comments: 2,
      attachments: 0,
      subtasks: []
    },
    {
      id: 5,
      title: 'User Profile Management',
      description: 'Allow users to edit their profile information',
      status: 'todo',
      priority: 'low',
      storyPoints: 3,
      assignee: { name: 'Tom Brown', avatar: 'TB' },
      labels: ['frontend', 'profile'],
      sprint: 1,
      comments: 0,
      attachments: 1,
      subtasks: []
    }
  ]);

  const teamMembers = [
    { id: 1, name: 'John Doe', avatar: 'JD', role: 'Full Stack Developer' },
    { id: 2, name: 'Jane Smith', avatar: 'JS', role: 'Frontend Developer' },
    { id: 3, name: 'Mike Johnson', avatar: 'MJ', role: 'Backend Developer' },
    { id: 4, name: 'Sarah Wilson', avatar: 'SW', role: 'DevOps Engineer' },
    { id: 5, name: 'Tom Brown', avatar: 'TB', role: 'UI/UX Designer' }
  ];

  useEffect(() => {
    if (sprints.length > 0 && !selectedSprint) {
      setSelectedSprint(sprints.find(s => s.status === 'active') || sprints[0]);
    }
  }, [sprints]);

  const filteredTasks = useMemo(() => {
    let filtered = tasks.filter(task => task.sprint === selectedSprint?.id);
    
    if (filterStatus !== 'all') {
      filtered = filtered.filter(task => task.status === filterStatus);
    }
    
    if (filterAssignee !== 'all') {
      filtered = filtered.filter(task => task.assignee.name === filterAssignee);
    }
    
    if (searchTerm) {
      filtered = filtered.filter(task => 
        task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    return filtered;
  }, [tasks, selectedSprint, filterStatus, filterAssignee, searchTerm]);

  const getStatusColor = (status) => {
    const colors = {
      active: 'bg-green-100 text-green-700 border-green-200',
      completed: 'bg-blue-100 text-blue-700 border-blue-200',
      planned: 'bg-gray-100 text-gray-700 border-gray-200'
    };
    return colors[status] || colors.planned;
  };

  const getTaskStatusColor = (status) => {
    const colors = {
      todo: 'bg-gray-100 text-gray-700',
      in_progress: 'bg-blue-100 text-blue-700',
      in_review: 'bg-yellow-100 text-yellow-700',
      completed: 'bg-green-100 text-green-700'
    };
    return colors[status] || colors.todo;
  };

  const getPriorityColor = (priority) => {
    const colors = {
      low: 'text-green-600',
      medium: 'text-yellow-600',
      high: 'text-red-600'
    };
    return colors[priority] || colors.medium;
  };

  const getPriorityIcon = (priority) => {
    const icons = {
      low: <Flag className="w-4 h-4 text-green-600" />,
      medium: <Flag className="w-4 h-4 text-yellow-600" />,
      high: <Flag className="w-4 h-4 text-red-600" />
    };
    return icons[priority] || icons.medium;
  };

  const sprintProgress = selectedSprint ? {
    completed: filteredTasks.filter(t => t.status === 'completed').length,
    inProgress: filteredTasks.filter(t => t.status === 'in_progress').length,
    inReview: filteredTasks.filter(t => t.status === 'in_review').length,
    todo: filteredTasks.filter(t => t.status === 'todo').length,
    total: filteredTasks.length,
    storyPointsCompleted: filteredTasks.filter(t => t.status === 'completed').reduce((sum, t) => sum + t.storyPoints, 0),
    totalStoryPoints: filteredTasks.reduce((sum, t) => sum + t.storyPoints, 0)
  } : null;

  const renderKanbanBoard = () => {
    const columns = [
      { id: 'todo', title: 'To Do', status: 'todo' },
      { id: 'in_progress', title: 'In Progress', status: 'in_progress' },
      { id: 'in_review', title: 'In Review', status: 'in_review' },
      { id: 'completed', title: 'Completed', status: 'completed' }
    ];

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {columns.map(column => {
          const columnTasks = filteredTasks.filter(task => task.status === column.status);
          return (
            <div key={column.id} className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                  {column.title}
                  <span className="bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded-full">
                    {columnTasks.length}
                  </span>
                </h3>
              </div>
              
              <div className="space-y-3">
                {columnTasks.map(task => (
                  <div
                    key={task.id}
                    className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 cursor-pointer hover:shadow-md transition-shadow"
                    onClick={() => {
                      setSelectedTask(task);
                      setShowTaskModal(true);
                    }}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-medium text-gray-900 text-sm leading-tight">{task.title}</h4>
                      {getPriorityIcon(task.priority)}
                    </div>
                    
                    <p className="text-gray-600 text-xs mb-3 line-clamp-2">{task.description}</p>
                    
                    <div className="flex flex-wrap gap-1 mb-3">
                      {task.labels.map(label => (
                        <span key={label} className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded">
                          {label}
                        </span>
                      ))}
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-white text-xs flex items-center justify-center font-medium">
                          {task.assignee.avatar}
                        </div>
                        <span className="text-xs text-gray-600">{task.assignee.name}</span>
                      </div>
                      
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <span className="bg-gray-100 px-2 py-1 rounded">{task.storyPoints}sp</span>
                        <div className="flex items-center gap-1">
                          <MessageSquare className="w-3 h-3" />
                          {task.comments}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  const renderTaskList = () => (
    <div className="bg-white rounded-lg border border-gray-200">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Task</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assignee</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Priority</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Points</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredTasks.map(task => (
              <tr key={task.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div>
                    <div className="font-medium text-gray-900">{task.title}</div>
                    <div className="text-sm text-gray-500 truncate max-w-xs">{task.description}</div>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {task.labels.map(label => (
                        <span key={label} className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded">
                          {label}
                        </span>
                      ))}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getTaskStatusColor(task.status)}`}>
                    {task.status.replace('_', ' ')}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-white text-xs flex items-center justify-center font-medium">
                      {task.assignee.avatar}
                    </div>
                    <span className="text-sm text-gray-900">{task.assignee.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-1">
                    {getPriorityIcon(task.priority)}
                    <span className={`text-sm font-medium ${getPriorityColor(task.priority)}`}>
                      {task.priority}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-sm">
                    {task.storyPoints}sp
                  </span>
                </td>
                <td className="px-6 py-4">
                  <button 
                    onClick={() => {
                      setSelectedTask(task);
                      setShowTaskModal(true);
                    }}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderBurndownChart = () => {
    if (!selectedSprint?.burndownData) return null;

    const maxRemaining = Math.max(...selectedSprint.burndownData.map(d => d.remaining));
    
    return (
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Burndown Chart</h3>
        <div className="h-64 relative">
          <svg width="100%" height="100%" className="absolute inset-0">
            <defs>
              <linearGradient id="burndownGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.1" />
              </linearGradient>
            </defs>
            
            {/* Grid lines */}
            {[...Array(6)].map((_, i) => (
              <line 
                key={i}
                x1="0" 
                y1={`${(i / 5) * 100}%`} 
                x2="100%" 
                y2={`${(i / 5) * 100}%`}
                stroke="#E5E7EB" 
                strokeWidth="1"
              />
            ))}
            
            {/* Ideal line */}
            <line 
              x1="0" 
              y1="10%" 
              x2="100%" 
              y2="90%"
              stroke="#EF4444" 
              strokeWidth="2"
              strokeDasharray="4,4"
            />
            
            {/* Actual burndown line */}
            <polyline
              points={selectedSprint.burndownData.map((point, index) => 
                `${(index / (selectedSprint.burndownData.length - 1)) * 100},${90 - ((point.remaining / maxRemaining) * 80)}`
              ).join(' ')}
              fill="url(#burndownGradient)"
              stroke="#3B82F6"
              strokeWidth="3"
            />
            
            {/* Data points */}
            {selectedSprint.burndownData.map((point, index) => (
              <circle
                key={index}
                cx={`${(index / (selectedSprint.burndownData.length - 1)) * 100}%`}
                cy={`${90 - ((point.remaining / maxRemaining) * 80)}%`}
                r="4"
                fill="#3B82F6"
                stroke="white"
                strokeWidth="2"
              />
            ))}
          </svg>
        </div>
        
        <div className="flex items-center justify-center gap-6 mt-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
            <span className="text-sm text-gray-600">Actual</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 border-2 border-red-500 border-dashed rounded-full"></div>
            <span className="text-sm text-gray-600">Ideal</span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-8xl mx-auto p-6">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold text-gray-900">Sprint Management</h1>
          <div className="flex gap-3">
            <button 
              onClick={() => setShowCreateModal(true)}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Create Sprint
            </button>
            <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
              <Settings className="w-4 h-4" />
              Settings
            </button>
          </div>
        </div>

        {/* Sprint Selector */}
        <div className="flex flex-wrap items-center gap-4 mb-6">
          {sprints.map(sprint => (
            <button
              key={sprint.id}
              onClick={() => setSelectedSprint(sprint)}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg border transition-colors ${
                selectedSprint?.id === sprint.id
                  ? 'bg-blue-50 border-blue-200 text-blue-700'
                  : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'
              }`}
            >
              <div>
                <h3 className="font-medium text-left">{sprint.name}</h3>
                <div className="flex items-center gap-2 text-xs">
                  <span className={`px-2 py-1 rounded-full border ${getStatusColor(sprint.status)}`}>
                    {sprint.status}
                  </span>
                  <span className="text-gray-500">{sprint.project}</span>
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Sprint Overview */}
        {selectedSprint && (
          <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold text-gray-900">{selectedSprint.name}</h2>
                  <div className="flex items-center gap-2">
                    {selectedSprint.status === 'active' && (
                      <button className="flex items-center gap-2 px-3 py-1 bg-green-100 text-green-700 rounded-md text-sm">
                        <PauseCircle className="w-4 h-4" />
                        Pause Sprint
                      </button>
                    )}
                    {selectedSprint.status === 'planned' && (
                      <button className="flex items-center gap-2 px-3 py-1 bg-blue-100 text-blue-700 rounded-md text-sm">
                        <PlayCircle className="w-4 h-4" />
                        Start Sprint
                      </button>
                    )}
                  </div>
                </div>
                
                <p className="text-gray-600 mb-4">{selectedSprint.goal}</p>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">{new Date(selectedSprint.endDate).getDate() - new Date().getDate()}</div>
                    <div className="text-sm text-gray-500">Days Left</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">{sprintProgress?.storyPointsCompleted}</div>
                    <div className="text-sm text-gray-500">Points Done</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">{sprintProgress?.totalStoryPoints}</div>
                    <div className="text-sm text-gray-500">Total Points</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-orange-600">{selectedSprint.velocity}</div>
                    <div className="text-sm text-gray-500">Velocity</div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-medium text-gray-900 mb-3">Sprint Progress</h3>
                {sprintProgress && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Completed</span>
                      <span>{sprintProgress.completed}/{sprintProgress.total}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-green-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${(sprintProgress.completed / sprintProgress.total) * 100}%` }}
                      ></div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-2 mt-4 text-xs">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        <span>Completed: {sprintProgress.completed}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                        <span>In Progress: {sprintProgress.inProgress}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                        <span>In Review: {sprintProgress.inReview}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
                        <span>To Do: {sprintProgress.todo}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* View Controls */}
      <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveView('board')}
              className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                activeView === 'board'
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Target className="w-4 h-4" />
              Board
            </button>
            <button
              onClick={() => setActiveView('list')}
              className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                activeView === 'list'
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <BarChart3 className="w-4 h-4" />
              List
            </button>
            <button
              onClick={() => setActiveView('reports')}
              className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                activeView === 'reports'
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <TrendingUp className="w-4 h-4" />
              Reports
            </button>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <Search className="w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search tasks..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-sm"
              />
            </div>
            
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-sm"
            >
              <option value="all">All Status</option>
              <option value="todo">To Do</option>
              <option value="in_progress">In Progress</option>
              <option value="in_review">In Review</option>
              <option value="completed">Completed</option>
            </select>
            
            <select
              value={filterAssignee}
              onChange={(e) => setFilterAssignee(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-sm"
            >
              <option value="all">All Assignees</option>
              {teamMembers.map(member => (
                <option key={member.id} value={member.name}>{member.name}</option>
              ))}
            </select>
            
            <button className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-md text-gray-600 hover:bg-gray-50 text-sm">
              <Filter className="w-4 h-4" />
              Filters
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="mb-6">
        {activeView === 'board' && renderKanbanBoard()}
        {activeView === 'list' && renderTaskList()}
        {activeView === 'reports' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {renderBurndownChart()}
            
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Velocity Tracking</h3>
              <div className="h-64">
                <div className="flex items-end h-full gap-2">
                  {sprints.filter(s => s.status !== 'planned').map(sprint => (
                    <div key={sprint.id} className="flex flex-col items-center flex-1">
                      <div 
                        className="w-full bg-blue-100 rounded-t-md relative group"
                        style={{ height: `${(sprint.velocity / 50) * 100}%` }}
                      >
                        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                          {sprint.velocity} points
                        </div>
                      </div>
                      <div className="text-xs text-gray-500 mt-1">{sprint.name.split(' - ')[0]}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Create Sprint Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Create New Sprint</h3>
                <button 
                  onClick={() => setShowCreateModal(false)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Sprint Name</label>
                  <input 
                    type="text" 
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    placeholder="e.g. Sprint 25 - API Integration"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                    <input 
                      type="date" 
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                    <input 
                      type="date" 
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Project</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500">
                    <option>Project Alpha</option>
                    <option>Project Beta</option>
                    <option>Project Gamma</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Sprint Goal</label>
                  <textarea 
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    placeholder="What do you want to accomplish in this sprint?"
                  />
                </div>
              </div>
              
              <div className="mt-6 flex justify-end gap-3">
                <button 
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button 
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Create Sprint
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Task Detail Modal */}
      {showTaskModal && selectedTask && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getTaskStatusColor(selectedTask.status)} mb-2`}>
                    {selectedTask.status.replace('_', ' ')}
                  </span>
                  <h3 className="text-xl font-semibold text-gray-900">{selectedTask.title}</h3>
                </div>
                <button 
                  onClick={() => setShowTaskModal(false)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <div className="mb-6">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Description</h4>
                    <p className="text-gray-600">{selectedTask.description || "No description provided"}</p>
                  </div>
                  
                  {selectedTask.subtasks && selectedTask.subtasks.length > 0 && (
                    <div className="mb-6">
                      <h4 className="text-sm font-medium text-gray-700 mb-3">Subtasks ({selectedTask.subtasks.filter(s => s.completed).length}/{selectedTask.subtasks.length})</h4>
                      <div className="space-y-2">
                        {selectedTask.subtasks.map(subtask => (
                          <div key={subtask.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-md">
                            <button className="text-gray-400 hover:text-green-500">
                              {subtask.completed ? (
                                <CheckCircle2 className="w-5 h-5 text-green-500" />
                              ) : (
                                <div className="w-5 h-5 border-2 border-gray-300 rounded-full" />
                              )}
                            </button>
                            <span className={`flex-1 ${subtask.completed ? 'line-through text-gray-400' : 'text-gray-700'}`}>
                              {subtask.title}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  <div className="mb-6">
                    <h4 className="text-sm font-medium text-gray-700 mb-3">Activity</h4>
                    <div className="space-y-4">
                      <div className="flex gap-3">
                        <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
                          <User className="w-4 h-4" />
                        </div>
                        <div className="flex-1">
                          <div className="text-sm font-medium text-gray-900">John Doe</div>
                          <div className="text-xs text-gray-500">Created this task • 2 days ago</div>
                        </div>
                      </div>
                      <div className="flex gap-3">
                        <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
                          <User className="w-4 h-4" />
                        </div>
                        <div className="flex-1">
                          <div className="text-sm font-medium text-gray-900">Jane Smith</div>
                          <div className="text-xs text-gray-500">Changed status from "To Do" to "In Progress" • 1 day ago</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-medium text-gray-700 mb-2">Assignee</h4>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-white flex items-center justify-center font-medium">
                          {selectedTask.assignee.avatar}
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">{selectedTask.assignee.name}</div>
                          <div className="text-xs text-gray-500">Developer</div>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium text-gray-700 mb-2">Details</h4>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <div className="text-xs text-gray-500">Priority</div>
                          <div className="flex items-center gap-1 mt-1">
                            {getPriorityIcon(selectedTask.priority)}
                            <span className={`text-sm font-medium ${getPriorityColor(selectedTask.priority)}`}>
                              {selectedTask.priority}
                            </span>
                          </div>
                        </div>
                        <div>
                          <div className="text-xs text-gray-500">Story Points</div>
                          <div className="text-sm font-medium text-gray-900 mt-1">{selectedTask.storyPoints}sp</div>
                        </div>
                        <div>
                          <div className="text-xs text-gray-500">Labels</div>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {selectedTask.labels.map(label => (
                              <span key={label} className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded">
                                {label}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div>
                          <div className="text-xs text-gray-500">Sprint</div>
                          <div className="text-sm font-medium text-gray-900 mt-1">
                            {sprints.find(s => s.id === selectedTask.sprint)?.name || 'No sprint'}
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium text-gray-700 mb-2">Actions</h4>
                      <div className="space-y-2">
                        <button className="w-full flex items-center gap-2 px-3 py-2 bg-blue-50 text-blue-700 rounded-md text-sm">
                          <Edit3 className="w-4 h-4" />
                          Edit Task
                        </button>
                        <button className="w-full flex items-center gap-2 px-3 py-2 bg-red-50 text-red-700 rounded-md text-sm">
                          <Trash2 className="w-4 h-4" />
                          Delete Task
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SprintManagement4;