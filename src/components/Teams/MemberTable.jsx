import React from 'react';
import { Star, MessageSquare, MoreHorizontal } from 'lucide-react';

const MemberTable = ({ sortedMembers, selectedMembers, selectAllMembers, toggleMemberSelection, toggleStar, getRoleIcon, getWorkloadColor, getStatusColor, getTimeAgo }) => {
    
    const MemberRow = ({ member }) => (
        <tr className="hover:bg-gray-50 transition-colors">
            <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center gap-4">
                    {/* <input
                        type="checkbox"
                        checked={selectedMembers.includes(member.id)}
                        onChange={() => toggleMemberSelection(member.id)}
                        className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                    /> */}
                    <div className="flex items-center gap-3">
                        <div className="relative">
                            <div className="w-10 h-10 rounded-full bg-blue-500 text-white text-sm flex items-center justify-center font-medium">
                                {member?.userDetails?.name?.split(' ').map(word => word[0].toUpperCase()).join('') || "NA"}
                            </div>
                            {member?.userDetails?.status && (
                                <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                            )}
                        </div>
                        <div>
                            <div className="flex items-center gap-2">
                                <h3 className="font-semibold text-gray-900">{member.name}</h3>
                                <button
                                    onClick={() => toggleStar(member.id)}
                                    className={`p-1 rounded-full ${member.starred ? 'text-yellow-500' : 'text-gray-400'} hover:bg-gray-100`}
                                >
                                    <Star className="w-4 h-4" fill={member.starred ? 'currentColor' : 'none'} />
                                </button>
                            </div>
                            <p className="text-sm text-gray-600">{member.email}</p>
                        </div>
                    </div>
                </div>
            </td>
            
            <td className="px-6 py-4 whitespace-nowrap text-center">
                <div>
                    <p className="text-sm font-medium text-gray-900 flex items-center justify-center gap-1">
                        {getRoleIcon(member.role)}
                        {member.role.toUpperCase()}
                    </p>
                    <p className="text-xs text-gray-500">{member.department}</p>
                </div>
            </td>
            
            <td className="px-6 py-4 whitespace-nowrap text-center">
                <div>
                    <p className="text-sm font-medium text-gray-900">{member.performance}%</p>
                    <p className="text-xs text-gray-500">Performance</p>
                </div>
            </td>
            
            <td className="px-6 py-4 whitespace-nowrap text-center">
                <div>
                    <p className="text-sm font-medium text-gray-900">{member.completedTasks}/{member.totalTasks}</p>
                    <p className="text-xs text-gray-500">Tasks</p>
                </div>
            </td>
            
            <td className="px-6 py-4 whitespace-nowrap text-center">
                <div>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getWorkloadColor(member.workload)}`}>
                        {member.workload}%
                    </span>
                    <p className="text-xs text-gray-500 mt-1">Workload</p>
                </div>
            </td>
            
            <td className="px-6 py-4 whitespace-nowrap text-center">
                <div>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(member?.userDetails?.status)}`}>
                        {member?.userDetails?.status.charAt(0).toUpperCase() + member?.userDetails?.status.slice(1).replace('_', ' ')}
                    </span>
                    <p className="text-xs text-gray-500 mt-1">Last active {getTimeAgo(member?.lastLogin|| "")}</p>
                </div>
            </td>
            
            <td className="px-6 py-4 whitespace-nowrap text-center">
                <div className="flex gap-2 justify-center">
                    <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-full">
                        <MessageSquare className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full">
                        <MoreHorizontal className="w-4 h-4" />
                    </button>
                </div>
            </td>
        </tr>
    );

    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                <div className="flex items-center gap-4">
                                    <input
                                        type="checkbox"
                                        checked={selectedMembers.length === sortedMembers.length && sortedMembers.length > 0}
                                        onChange={selectAllMembers}
                                        className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                                    />
                                    <span className="text-sm font-medium text-gray-900">Member</span>
                                </div>
                            </th>
                            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                <span className="text-sm font-medium text-gray-900">Role</span>
                            </th>
                            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                <span className="text-sm font-medium text-gray-900">Performance</span>
                            </th>
                            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                <span className="text-sm font-medium text-gray-900">Tasks</span>
                            </th>
                            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                <span className="text-sm font-medium text-gray-900">Workload</span>
                            </th>
                            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                <span className="text-sm font-medium text-gray-900">Status</span>
                            </th>
                            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                <span className="text-sm font-medium text-gray-900">Actions</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {sortedMembers.map(member => (
                            <MemberRow key={member.id} member={member} />
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MemberTable;