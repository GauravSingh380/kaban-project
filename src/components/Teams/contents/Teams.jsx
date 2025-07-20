import React from 'react'
import {
    MoreHorizontal
} from 'lucide-react';

const Teams = ({ teams, teamMembers }) => {
    return (
        <div className="space-y-6">
            {teams.map(team => (
                <div key={team.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900">{team.name}</h3>
                            <p className="text-gray-600">{team.description}</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${team.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                                }`}>
                                {team.status}
                            </span>
                            <button className="p-1 text-gray-400 hover:text-gray-600">
                                <MoreHorizontal className="w-4 h-4" />
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div>
                            <p className="text-sm text-gray-500">Department</p>
                            <p className="font-medium">{team.department}</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Members</p>
                            <p className="font-medium">{team.members.length}</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Projects</p>
                            <p className="font-medium">{team.projects.length}</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="flex -space-x-2">
                            {team.members.slice(0, 5).map(memberId => {
                                const member = teamMembers.find(m => m.id === memberId);
                                return member ? (
                                    <div key={memberId} className="w-8 h-8 rounded-full bg-blue-500 text-white text-xs flex items-center justify-center border-2 border-white">
                                        {member.avatar}
                                    </div>
                                ) : null;
                            })}
                            {team.members.length > 5 && (
                                <div className="w-8 h-8 rounded-full bg-gray-300 text-gray-700 text-xs flex items-center justify-center border-2 border-white">
                                    +{team.members.length - 5}
                                </div>
                            )}
                        </div>
                        <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                            View Team
                        </button>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Teams