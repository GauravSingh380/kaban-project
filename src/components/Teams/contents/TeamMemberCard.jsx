import React from 'react'
import {
    Plus, Search, Filter, MoreHorizontal, Calendar, Users, Mail, Phone, Globe,
    MapPin, Star, Edit, Trash2,
    CheckCircle2, Clock, AlertCircle, Settings, Eye, Download, Upload,
    Activity, Award, TrendingUp, Target, MessageSquare, Video, Slack,
    PhoneCall,
} from 'lucide-react';
const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
};
const getRoleColor = (role) => {
    switch (role.toLowerCase()) {
        case 'team lead': return 'text-purple-600 bg-purple-50';
        case 'senior developer': return 'text-blue-600 bg-blue-50';
        case 'qa manager': return 'text-green-600 bg-green-50';
        case 'devops engineer': return 'text-orange-600 bg-orange-50';
        case 'junior developer': return 'text-gray-600 bg-gray-50';
        default: return 'text-gray-600 bg-gray-50';
    }
};

const TeamMemberCard = ({ member, getRoleIcon,getStatusColor,toggleStar, getWorkloadColor }) => (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
        <div className="p-6">
            <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                    {/* <input
                        type="checkbox"
                        checked={selectedMembers.includes(member.id)}
                        onChange={() => toggleMemberSelection(member.id)}
                        className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                    /> */}
                    <div className="relative">
                        <div className="w-12 h-12 rounded-full bg-blue-500 text-white text-lg flex items-center justify-center font-medium">
                        {(member && member.avatar) ?? member?.userDetails?.name?.split(' ').map(word => word[0].toUpperCase()).join('')}
                        </div>
                        {member?.userDetails?.isActive && (
                            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                        )}
                    </div>
                    <div>
                        <h3 className="font-semibold text-gray-900 text-lg">{member.name}</h3>
                        <p className="text-sm text-gray-600 flex items-center gap-1">
                            <span>Role:</span>
                            {/* {getRoleIcon(member.role)} */}
                            {member.role.toUpperCase()}
                        </p>
                        <p className="text-sm text-gray-500">Department: {member?.userDetails?.department || ""}</p>
                        <p className="text-sm text-gray-500">Position:
                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${getRoleColor(member?.userDetails?.role) || ""}`}>
                                {member?.userDetails?.role || ""}
                            </span>
                        </p>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => toggleStar(member.id)}
                        className={`p-1 rounded-full ${member.starred ? 'text-yellow-500' : 'text-gray-400'} hover:bg-gray-100`}
                    >
                        <Star className="w-4 h-4" fill={member.starred ? 'currentColor' : 'none'} />
                    </button>
                    <button className="p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full">
                        <MoreHorizontal className="w-4 h-4" />
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(member?.userDetails?.status)}`}>
                        {member?.userDetails?.status === 'active' && <CheckCircle2 className="w-3 h-3 mr-1" />}
                        {member?.userDetails?.status === 'inactive' && <AlertCircle className="w-3 h-3 mr-1" />}
                        {member?.userDetails?.status === 'on_leave' && <Clock className="w-3 h-3 mr-1" />}
                        {member?.userDetails?.status.charAt(0).toUpperCase() + member?.userDetails?.status.slice(1).replace('_', ' ')}
                    </span>
                </div>
                <div>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getWorkloadColor(member?.workload)}`}>
                        {member.workload}% workload
                    </span>
                </div>
            </div>

            <div className="space-y-3 mb-4 grid grid-cols-1 md:grid-cols-2 gap-2">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Mail className="w-4 h-4" />
                    <span>{member.email}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                    <PhoneCall className="w-4 h-4" />
                    <span>{member?.userDetails?.phone || 'Not provided'}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                    <MapPin className="w-4 h-4" />
                    <span>{member?.userDetails?.location}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Calendar className="w-4 h-4" />
                    <span>Joined {formatDate(member?.userDetails?.createdAt)}</span>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                    <p className="text-xs text-gray-500 mb-1">Performance</p>
                    <div className="flex items-center gap-2">
                        <div className="flex-1 bg-gray-200 rounded-full h-2">
                            <div
                                className="bg-green-500 h-2 rounded-full transition-all duration-300"
                                style={{ width: `${member.performance || 75}%` }}
                            />
                        </div>
                        <span className="text-sm font-medium text-gray-900">{member.performance || 75}%</span>
                    </div>
                </div>
                <div>
                    <p className="text-xs text-gray-500 mb-1">Tasks</p>
                    <p className="text-sm font-medium text-gray-900">
                        {member.completedTasks || '-'}/{member.totalTasks || '-'}
                    </p>
                </div>
            </div>

            <div className="mb-4">
                <p className="text-xs text-gray-500 mb-2">Current Projects</p>
                <div className="flex flex-wrap gap-1">
                    {member?.userDetails?.projects.slice(0, 2).map((project, index) => (
                        <span key={index} className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
                            {project}
                        </span>
                    ))}
                    {member?.projects?.length > 2 && (
                        <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                            +{member?.userDetails?.projects.length - 2} more
                        </span>
                    )}
                </div>
            </div>

            <div className="mb-4">
                <p className="text-xs text-gray-500 mb-2">Skills</p>
                <div className="flex flex-wrap gap-1">
                    {member?.userDetails?.skills?.slice(0, 3).map((skill, index) => (
                        <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                            {skill}
                        </span>
                    ))}
                    {member?.userDetails?.skills.length > 3 && (
                        <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                            +{member?.userDetails?.skills?.length - 3} more
                        </span>
                    )}
                </div>
            </div>

            <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                <div className="flex gap-2">
                    <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-full" title="Message">
                        <MessageSquare className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-green-600 hover:bg-green-50 rounded-full" title="Video Call">
                        <Video className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-purple-600 hover:bg-purple-50 rounded-full" title="Slack">
                        <Slack className="w-4 h-4" />
                    </button>
                </div>
                <div className="flex gap-2">
                    <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full">
                        <Eye className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full">
                        <Edit className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-full">
                        <Trash2 className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </div>
    </div>
);

export default TeamMemberCard