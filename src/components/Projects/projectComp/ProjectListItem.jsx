import React from 'react'

const ProjectListItem = ({ project }) => (
        <tr className="bg-white border-b border-gray-200 hover:bg-gray-50 transition-colors">
            <td className="px-2 py-4 whitespace-wrap">
                <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-gray-900 text-wrap">{project.name}</h3>
                    <button
                        onClick={() => toggleStar(project.id)}
                        className={`p-1 rounded-full ${project.starred ? 'text-yellow-500' : 'text-gray-400'} hover:bg-gray-100`}
                    >
                        <Star className="w-4 h-4" fill={project.starred ? 'currentColor' : 'none'} />
                    </button>
                </div>
                <p className="text-sm text-gray-600 whitespace-normal break-words">{project.description}</p>
                <p className="text-xs text-gray-500 mt-1">Client: {project.client}</p>
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-center">
                <p className="text-sm font-medium text-gray-900">{project.progress}%</p>
                <div className="w-20 bg-gray-200 rounded-full h-2 mt-1">
                    <div
                        className={`h-2 rounded-full transition-all duration-300 ${getProgressColor(project.progress)}`}
                        style={{ width: `${project.progress}%` }}
                    />
                </div>
            </td>

            <td className="px-6 py-4 whitespace-nowrap text-center">
                <p className="text-sm font-medium text-gray-900">{formatCurrency(project.budget)}</p>
                <p className="text-xs text-gray-500">{formatCurrency(project.spent)} spent</p>
            </td>

            <td className="px-6 py-4 whitespace-nowrap text-center">
                <p className="text-sm font-medium text-gray-900">{formatDate(project.dueDate)}</p>
                <p className={`text-xs ${getDaysRemaining(project.dueDate) < 0 ? 'text-red-600' : getDaysRemaining(project.dueDate) < 7 ? 'text-orange-600' : 'text-gray-500'}`}>
                    {getDaysRemaining(project.dueDate) < 0 ? 'Overdue' : `${getDaysRemaining(project.dueDate)} days left`}
                </p>
            </td>

            <td className="px-6 py-4 whitespace-nowrap text-center">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(project.status)}`}>
                    {project.status.charAt(0).toUpperCase() + project.status.slice(1).replace('_', ' ')}
                </span>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getPriorityColor(project.priority)}`}>
                    {project.priority.charAt(0).toUpperCase() + project.priority.slice(1)}
                </span>
            </td>

            <td className="px-6 py-4 whitespace-nowrap text-center">
                {/* {project.team.slice(0, 3).map((member, index) => (
                    <div
                        key={index}
                        className="w-8 h-8 rounded-full bg-blue-500 text-white text-xs flex items-center justify-center border-2 border-white"
                        title={`${member.name} - ${member.role}`}
                    >
                        {member.avatar}
                    </div>
                ))} */}
                {/* {project.team.length > 3 && (
                    <div className="w-8 h-8 rounded-full bg-gray-500 text-white text-xs flex items-center justify-center border-2 border-white">
                        +{project.team.length - 3}
                    </div>
                )} */}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-center">

                {/* <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full">
                    <MoreHorizontal className="w-4 h-4" />
                </button> */}
                <div className="flex">
                    <button className="p-1.5 cursor-pointer text-gray-400 hover:text-gray-600 hover:bg-gray-200 rounded-full">
                        <Edit className="w-4 h-4" />
                    </button>
                    <button className="p-1.5 cursor-pointer text-gray-400 hover:text-gray-600 hover:bg-gray-200 rounded-full">
                        <Archive className="w-4 h-4" />
                    </button>
                    <button className="p-1.5 cursor-pointer text-gray-400 hover:text-red-600 hover:bg-red-100 rounded-full">
                        <Trash2 className="w-4 h-4" />
                    </button>
                </div>
            </td>
        </tr>
    );


export default ProjectListItem