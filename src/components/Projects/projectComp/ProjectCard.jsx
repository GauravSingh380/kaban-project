import React from 'react'

const ProjectCard = ({ project }) => (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
        <div className="p-6">
            <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                    <input
                        type="checkbox"
                        checked={selectedProjects.includes(project.id)}
                        onChange={() => toggleProjectSelection(project.id)}
                        className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                    />
                    <div>
                        <h3 className="font-semibold text-gray-900 text-lg mb-1">{project.name}</h3>
                        <p className="text-sm text-gray-600 mb-2">{project.description}</p>
                        <p className="text-sm text-gray-500">Client: {project.client}</p>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => toggleStar(project.id)}
                        className={`p-1 rounded-full ${project.starred ? 'text-yellow-500' : 'text-gray-400'} hover:bg-gray-100`}
                    >
                        <Star className="w-4 h-4" fill={project.starred ? 'currentColor' : 'none'} />
                    </button>
                    <button className="p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full">
                        <MoreHorizontal className="w-4 h-4" />
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="flex items-center gap-2">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(project.status)}`}>
                        {project.status === 'active' && <Activity className="w-3 h-3 mr-1" />}
                        {project.status === 'testing' && <Bug className="w-3 h-3 mr-1" />}
                        {project.status === 'planning' && <Calendar className="w-3 h-3 mr-1" />}
                        {project.status === 'completed' && <CheckCircle2 className="w-3 h-3 mr-1" />}
                        {project.status === 'on_hold' && <Clock className="w-3 h-3 mr-1" />}
                        {project.status.charAt(0).toUpperCase() + project.status.slice(1).replace('_', ' ')}
                    </span>
                </div>
                <div className="flex items-center gap-2">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getPriorityColor(project.priority)}`}>
                        {project.priority === 'critical' && <AlertCircle className="w-3 h-3 mr-1" />}
                        {project.priority === 'high' && <TrendingUp className="w-3 h-3 mr-1" />}
                        {project.priority === 'medium' && <Target className="w-3 h-3 mr-1" />}
                        {project.priority === 'low' && <TrendingDown className="w-3 h-3 mr-1" />}
                        {project.priority.charAt(0).toUpperCase() + project.priority.slice(1)}
                    </span>
                </div>
            </div>

            <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-700">Progress</span>
                    <span className="text-sm font-medium text-gray-900">{project.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                        className={`h-2 rounded-full transition-all duration-300 ${getProgressColor(project.progress)}`}
                        style={{ width: `${project.progress}%` }}
                    />
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                    <p className="text-xs text-gray-500 mb-1">Budget</p>
                    <p className="text-sm font-medium text-gray-900">{formatCurrency(project.budget)}</p>
                </div>
                <div>
                    <p className="text-xs text-gray-500 mb-1">Spent</p>
                    <p className="text-sm font-medium text-gray-900">{formatCurrency(project.spent)}</p>
                </div>
                <div>
                    <p className="text-xs text-gray-500 mb-1">Due Date</p>
                    <p className="text-sm font-medium text-gray-900">{formatDate(project.dueDate)}</p>
                </div>
                <div>
                    <p className="text-xs text-gray-500 mb-1">Days Left</p>
                    <p className={`text-sm font-medium ${getDaysRemaining(project.dueDate) < 0 ? 'text-red-600' : getDaysRemaining(project.dueDate) < 7 ? 'text-orange-600' : 'text-gray-900'}`}>
                        {getDaysRemaining(project.dueDate) < 0 ? 'Overdue' : `${getDaysRemaining(project.dueDate)} days`}
                    </p>
                </div>
            </div>

            <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                    <span className="text-xs text-gray-500">Team</span>
                    <span className="text-xs text-gray-500">{project.team.length} members</span>
                </div>
                <div className="flex -space-x-2">
                    {project.team.slice(0, 4).map((member, index) => (
                        <div
                            key={index}
                            className="w-8 h-8 rounded-full bg-blue-500 text-white text-xs flex items-center justify-center border-2 border-white"
                            title={`${member.name} - ${member.role}`}
                        >
                            {member.avatar}
                        </div>
                    ))}
                    {project.team.length > 4 && (
                        <div className="w-8 h-8 rounded-full bg-gray-500 text-white text-xs flex items-center justify-center border-2 border-white">
                            +{project.team.length - 4}
                        </div>
                    )}
                </div>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="text-center">
                    <p className="text-sm font-medium text-gray-900">{project.bugs.open}</p>
                    <p className="text-xs text-gray-500">Open Bugs</p>
                </div>
                <div className="text-center">
                    <p className="text-sm font-medium text-gray-900">{project.milestones.completed}/{project.milestones.total}</p>
                    <p className="text-xs text-gray-500">Milestones</p>
                </div>
                <div className="text-center">
                    <p className="text-sm font-medium text-gray-900">{Math.round((project.spent / project.budget) * 100)}%</p>
                    <p className="text-xs text-gray-500">Budget Used</p>
                </div>
            </div>

            <div className="flex flex-wrap gap-1 mb-4">
                {project.tags.map((tag, index) => (
                    <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                        {tag}
                    </span>
                ))}
            </div>

            <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                <button className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800">
                    <Eye className="w-4 h-4" />
                    View Details
                </button>
                <div className="flex gap-2">
                    <button className="p-2 cursor-pointer text-gray-400 hover:text-gray-600 hover:bg-gray-200 rounded-full">
                        <Edit className="w-4 h-4" />
                    </button>
                    <button className="p-2 cursor-pointer text-gray-400 hover:text-gray-600 hover:bg-gray-200 rounded-full">
                        <Archive className="w-4 h-4" />
                    </button>
                    <button className="p-2 cursor-pointer text-gray-400 hover:text-red-600 hover:bg-red-100 rounded-full">
                        <Trash2 className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </div>
    </div>
);

export default ProjectCard