import React, { useState } from 'react';
import { Star, MessageSquare, MoreHorizontal, User, Shield, Crown } from 'lucide-react';
import TableCard from './TableCard';

const MemberTableExample = () => {
    const [selectedMembers, setSelectedMembers] = useState([]);
    const [members, setMembers] = useState([
        {
            id: 1,
            name: "John Doe",
            email: "john@example.com",
            role: "admin",
            department: "Engineering",
            performance: 95,
            completedTasks: 45,
            totalTasks: 50,
            workload: 85,
            starred: true,
            userDetails: {
                name: "John Doe",
                status: "active"
            },
            lastLogin: "2024-01-15T10:30:00Z"
        },
        {
            id: 2,
            name: "Jane Smith",
            email: "jane@example.com",
            role: "user",
            department: "Marketing",
            performance: 88,
            completedTasks: 32,
            totalTasks: 40,
            workload: 60,
            starred: false,
            userDetails: {
                name: "Jane Smith",
                status: "away"
            },
            lastLogin: "2024-01-14T15:45:00Z"
        }
    ]);

    // Helper functions
    const getRoleIcon = (role) => {
        switch (role) {
            case 'admin': return <Crown className="w-4 h-4" />;
            case 'moderator': return <Shield className="w-4 h-4" />;
            default: return <User className="w-4 h-4" />;
        }
    };

    const getWorkloadColor = (workload) => {
        if (workload >= 80) return 'bg-red-100 text-red-800';
        if (workload >= 60) return 'bg-yellow-100 text-yellow-800';
        return 'bg-green-100 text-green-800';
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'active': return 'bg-green-100 text-green-800 border-green-200';
            case 'away': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
            case 'offline': return 'bg-gray-100 text-gray-800 border-gray-200';
            default: return 'bg-gray-100 text-gray-800 border-gray-200';
        }
    };

    const getTimeAgo = (dateString) => {
        if (!dateString) return 'Never';
        const date = new Date(dateString);
        const now = new Date();
        const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));

        if (diffInHours < 1) return 'Just now';
        if (diffInHours < 24) return `${diffInHours}h ago`;
        return `${Math.floor(diffInHours / 24)}d ago`;
    };

    const toggleStar = (memberId) => {
        setMembers(prev => prev.map(member =>
            member.id === memberId
                ? { ...member, starred: !member.starred }
                : member
        ));
    };

    // Table headers configuration
    const headers = [
        {
            id: 'member',
            title: 'Member',
            key: 'name',
            align: 'left',
            render: (member) => (
                <div className="flex items-center gap-3">
                    <div className="relative">
                        <div className="w-10 h-10 rounded-full bg-blue-500 text-white text-sm flex items-center justify-center font-medium">
                            {member?.userDetails?.name?.split(' ').map(word => word[0].toUpperCase()).join('') || "NA"}
                        </div>
                        {member?.userDetails?.status === 'active' && (
                            <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                        )}
                    </div>
                    <div>
                        <div className="flex items-center gap-2">
                            <h3 className="font-semibold text-gray-900">{member.name}</h3>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    toggleStar(member.id);
                                }}
                                className={`p-1 rounded-full ${member.starred ? 'text-yellow-500' : 'text-gray-400'} hover:bg-gray-100`}
                            >
                                <Star className="w-4 h-4" fill={member.starred ? 'currentColor' : 'none'} />
                            </button>
                        </div>
                        <p className="text-sm text-gray-600">{member.email}</p>
                    </div>
                </div>
            )
        },
        {
            id: 'role',
            title: 'Role',
            align: 'center',
            render: (member) => (
                <div>
                    <p className="text-sm font-medium text-gray-900 flex items-center justify-center gap-1">
                        {getRoleIcon(member.role)}
                        {member.role.toUpperCase()}
                    </p>
                    <p className="text-xs text-gray-500">{member.department}</p>
                </div>
            )
        },
        {
            id: 'performance',
            title: 'Performance',
            align: 'center',
            render: (member) => (
                <div>
                    <p className="text-sm font-medium text-gray-900">{member.performance}%</p>
                    <p className="text-xs text-gray-500">Performance</p>
                </div>
            )
        },
        {
            id: 'tasks',
            title: 'Tasks',
            align: 'center',
            render: (member) => (
                <div>
                    <p className="text-sm font-medium text-gray-900">{member.completedTasks}/{member.totalTasks}</p>
                    <p className="text-xs text-gray-500">Tasks</p>
                </div>
            )
        },
        {
            id: 'workload',
            title: 'Workload',
            align: 'center',
            render: (member) => (
                <div>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getWorkloadColor(member.workload)}`}>
                        {member.workload}%
                    </span>
                    <p className="text-xs text-gray-500 mt-1">Workload</p>
                </div>
            )
        },
        {
            id: 'status',
            title: 'Status',
            align: 'center',
            render: (member) => (
                <div>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(member?.userDetails?.status)}`}>
                        {member?.userDetails?.status?.charAt(0).toUpperCase() + member?.userDetails?.status?.slice(1).replace('_', ' ')}
                    </span>
                    <p className="text-xs text-gray-500 mt-1">Last active {getTimeAgo(member?.lastLogin || "")}</p>
                </div>
            )
        },
        {
            id: 'actions',
            title: 'Actions',
            align: 'center',
            render: (member) => (
                <div className="flex gap-2 justify-center">
                    <button
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-full"
                        onClick={(e) => {
                            e.stopPropagation();
                            console.log('Message member:', member.name);
                        }}
                    >
                        <MessageSquare className="w-4 h-4" />
                    </button>
                    <button
                        className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full"
                        onClick={(e) => {
                            e.stopPropagation();
                            console.log('More options for:', member.name);
                        }}
                    >
                        <MoreHorizontal className="w-4 h-4" />
                    </button>
                </div>
            )
        }
    ];

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-6">Team Members</h2>
            <TableCard
                headers={headers}
                data={members}
                selectable={true}
                selectedItems={selectedMembers}
                onSelectAll={setSelectedMembers}
                onRowClick={(member) => console.log('Clicked member:', member)}
                emptyMessage="No team members found"
            />
        </div>
    );
};

export default MemberTableExample;