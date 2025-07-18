import React, { useState, useEffect } from 'react';
import {
    Plus, Search, Filter, MoreHorizontal, Calendar, Users, Mail, Phone, Globe,
    MapPin, Star, Edit, Trash2, Archive, X, User, UserPlus, Crown, Shield,
    CheckCircle2, Clock, AlertCircle, Settings, Eye, Download, Upload,
    Activity, Award, TrendingUp, Target, MessageSquare, Video, Slack,
    Github, Briefcase, GraduationCap, Building, UserCheck,
    GitPullRequestDraft
} from 'lucide-react';
import TeamMemberSignup from '../TeamSignUp/TeamMemberSignUp';
import MemberTable from './MemberTable';

const TeamsContent1 = ({ user }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [roleFilter, setRoleFilter] = useState('all');
    const [statusFilter, setStatusFilter] = useState('all');
    const [departmentFilter, setDepartmentFilter] = useState('all');
    const [sortBy, setSortBy] = useState('name');
    const [viewMode, setViewMode] = useState('grid');
    const [showFilters, setShowFilters] = useState(false);
    const [selectedMembers, setSelectedMembers] = useState([]);
    const [showInviteModal, setShowInviteModal] = useState(false);
    const [activeTab, setActiveTab] = useState('members');

    // Mock team data
    const [teamMembers, setTeamMembers] = useState([
        {
            id: 1,
            name: 'Sarah Wilson',
            email: 'sarah.wilson@company.com',
            role: 'Project Manager',
            department: 'Engineering',
            status: 'active',
            avatar: 'SW',
            phone: '+1 (555) 123-4567',
            location: 'San Francisco, CA',
            timezone: 'PST',
            joinDate: '2023-01-15',
            lastActive: '2024-07-09T10:30:00Z',
            projects: ['E-commerce Platform', 'API Integration Platform'],
            skills: ['Project Management', 'Agile', 'Scrum', 'Leadership'],
            permissions: ['admin', 'project_create', 'user_management'],
            workload: 85,
            completedTasks: 47,
            totalTasks: 52,
            performance: 92,
            socialLinks: {
                github: 'https://github.com/sarahwilson',
                linkedin: 'https://linkedin.com/in/sarahwilson',
                slack: '@sarah.wilson'
            },
            starred: true,
            isOnline: true
        },
        {
            id: 2,
            name: 'Mike Johnson',
            email: 'mike.johnson@company.com',
            role: 'Senior Developer',
            department: 'Engineering',
            status: 'active',
            avatar: 'MJ',
            phone: '+1 (555) 234-5678',
            location: 'Austin, TX',
            timezone: 'CST',
            joinDate: '2023-03-20',
            lastActive: '2024-07-09T09:15:00Z',
            projects: ['E-commerce Platform', 'Security Audit System'],
            skills: ['React', 'Node.js', 'Python', 'AWS'],
            permissions: ['developer', 'project_view', 'code_review'],
            workload: 78,
            completedTasks: 134,
            totalTasks: 142,
            performance: 88,
            socialLinks: {
                github: 'https://github.com/mikejohnson',
                linkedin: 'https://linkedin.com/in/mikejohnson',
                slack: '@mike.johnson'
            },
            starred: false,
            isOnline: true
        },
        {
            id: 3,
            name: 'Emily Davis',
            email: 'emily.davis@company.com',
            role: 'UI/UX Designer',
            department: 'Design',
            status: 'active',
            avatar: 'ED',
            phone: '+1 (555) 345-6789',
            location: 'New York, NY',
            timezone: 'EST',
            joinDate: '2023-05-10',
            lastActive: '2024-07-09T11:45:00Z',
            projects: ['Mobile App Redesign', 'Analytics Dashboard'],
            skills: ['Figma', 'Adobe XD', 'User Research', 'Prototyping'],
            permissions: ['designer', 'project_view', 'asset_management'],
            workload: 62,
            completedTasks: 89,
            totalTasks: 95,
            performance: 95,
            socialLinks: {
                github: 'https://github.com/emilydavis',
                linkedin: 'https://linkedin.com/in/emilydavis',
                slack: '@emily.davis'
            },
            starred: true,
            isOnline: false
        },
        {
            id: 4,
            name: 'David Kim',
            email: 'david.kim@company.com',
            role: 'Security Expert',
            department: 'Security',
            status: 'active',
            avatar: 'DK',
            phone: '+1 (555) 456-7890',
            location: 'Seattle, WA',
            timezone: 'PST',
            joinDate: '2023-02-05',
            lastActive: '2024-07-09T08:30:00Z',
            projects: ['Security Audit System'],
            skills: ['Cybersecurity', 'Penetration Testing', 'Compliance', 'Risk Assessment'],
            permissions: ['security_admin', 'audit_access', 'compliance_view'],
            workload: 90,
            completedTasks: 23,
            totalTasks: 28,
            performance: 96,
            socialLinks: {
                github: 'https://github.com/davidkim',
                linkedin: 'https://linkedin.com/in/davidkim',
                slack: '@david.kim'
            },
            starred: false,
            isOnline: true
        },
        {
            id: 5,
            name: 'Lisa Chen',
            email: 'lisa.chen@company.com',
            role: 'Lead Developer',
            department: 'Engineering',
            status: 'on_leave',
            avatar: 'LC',
            phone: '+1 (555) 567-8901',
            location: 'Los Angeles, CA',
            timezone: 'PST',
            joinDate: '2022-11-12',
            lastActive: '2024-07-05T16:20:00Z',
            projects: ['Mobile App Redesign'],
            skills: ['React Native', 'iOS', 'Android', 'Swift'],
            permissions: ['lead_developer', 'project_management', 'code_review'],
            workload: 0,
            completedTasks: 156,
            totalTasks: 165,
            performance: 91,
            socialLinks: {
                github: 'https://github.com/lisachen',
                linkedin: 'https://linkedin.com/in/lisachen',
                slack: '@lisa.chen'
            },
            starred: true,
            isOnline: false
        },
        {
            id: 6,
            name: 'Tom Brown',
            email: 'tom.brown@company.com',
            role: 'QA Engineer',
            department: 'Quality Assurance',
            status: 'inactive',
            avatar: 'TB',
            phone: '+1 (555) 678-9012',
            location: 'Chicago, IL',
            timezone: 'CST',
            joinDate: '2023-08-01',
            lastActive: '2024-07-01T14:10:00Z',
            projects: [],
            skills: ['Test Automation', 'Selenium', 'Jest', 'Quality Assurance'],
            permissions: ['qa_access', 'test_management'],
            workload: 0,
            completedTasks: 67,
            totalTasks: 75,
            performance: 85,
            socialLinks: {
                github: 'https://github.com/tombrown',
                linkedin: 'https://linkedin.com/in/tombrown',
                slack: '@tom.brown'
            },
            starred: false,
            isOnline: false
        }
    ]);

    const [teams, setTeams] = useState([
        {
            id: 1,
            name: 'Frontend Team',
            description: 'Responsible for all frontend development and UI/UX design',
            members: [2, 3, 5],
            lead: 5,
            projects: ['E-commerce Platform', 'Mobile App Redesign'],
            created: '2023-01-15',
            department: 'Engineering',
            status: 'active'
        },
        {
            id: 2,
            name: 'Backend Team',
            description: 'Handles server-side development and API management',
            members: [1, 2, 4],
            lead: 1,
            projects: ['API Integration Platform', 'Security Audit System'],
            created: '2023-02-01',
            department: 'Engineering',
            status: 'active'
        },
        {
            id: 3,
            name: 'QA Team',
            description: 'Quality assurance and testing',
            members: [6],
            lead: 6,
            projects: ['E-commerce Platform', 'Mobile App Redesign'],
            created: '2023-03-01',
            department: 'Quality Assurance',
            status: 'inactive'
        }
    ]);

    const roleOptions = [
        { value: 'all', label: 'All Roles' },
        { value: 'Project Manager', label: 'Project Manager' },
        { value: 'Senior Developer', label: 'Senior Developer' },
        { value: 'Lead Developer', label: 'Lead Developer' },
        { value: 'UI/UX Designer', label: 'UI/UX Designer' },
        { value: 'Security Expert', label: 'Security Expert' },
        { value: 'QA Engineer', label: 'QA Engineer' }
    ];

    const statusOptions = [
        { value: 'all', label: 'All Status' },
        { value: 'active', label: 'Active' },
        { value: 'inactive', label: 'Inactive' },
        { value: 'on_leave', label: 'On Leave' }
    ];

    const departmentOptions = [
        { value: 'all', label: 'All Departments' },
        { value: 'Engineering', label: 'Engineering' },
        { value: 'Design', label: 'Design' },
        { value: 'Security', label: 'Security' },
        { value: 'Quality Assurance', label: 'Quality Assurance' }
    ];

    const getStatusColor = (status) => {
        switch (status) {
            case 'active': return 'text-green-600 bg-green-50 border-green-200';
            case 'inactive': return 'text-red-600 bg-red-50 border-red-200';
            case 'on_leave': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
            default: return 'text-gray-600 bg-gray-50 border-gray-200';
        }
    };

    const getRoleIcon = (role) => {
        switch (role) {
            case 'Project Manager': return <Crown className="w-4 h-4" />;
            case 'Lead Developer': return <Shield className="w-4 h-4" />;
            case 'Senior Developer': return <User className="w-4 h-4" />;
            case 'UI/UX Designer': return <Edit className="w-4 h-4" />;
            case 'Security Expert': return <Shield className="w-4 h-4" />;
            case 'QA Engineer': return <CheckCircle2 className="w-4 h-4" />;
            default: return <User className="w-4 h-4" />;
        }
    };

    const getWorkloadColor = (workload) => {
        if (workload >= 90) return 'text-red-600 bg-red-50';
        if (workload >= 70) return 'text-orange-600 bg-orange-50';
        if (workload >= 50) return 'text-yellow-600 bg-yellow-50';
        return 'text-green-600 bg-green-50';
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    const getTimeAgo = (timestamp) => {
        const now = new Date();
        const time = new Date(timestamp);
        const diffInHours = Math.floor((now - time) / (1000 * 60 * 60));
        
        if (diffInHours < 1) return 'Just now';
        if (diffInHours < 24) return `${diffInHours}h ago`;
        const diffInDays = Math.floor(diffInHours / 24);
        return `${diffInDays}d ago`;
    };

    const filteredMembers = teamMembers.filter(member => {
        const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            member.role.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesRole = roleFilter === 'all' || member.role === roleFilter;
        const matchesStatus = statusFilter === 'all' || member.status === statusFilter;
        const matchesDepartment = departmentFilter === 'all' || member.department === departmentFilter;

        return matchesSearch && matchesRole && matchesStatus && matchesDepartment;
    });

    const sortedMembers = [...filteredMembers].sort((a, b) => {
        switch (sortBy) {
            case 'name':
                return a.name.localeCompare(b.name);
            case 'role':
                return a.role.localeCompare(b.role);
            case 'department':
                return a.department.localeCompare(b.department);
            case 'joinDate':
                return new Date(b.joinDate) - new Date(a.joinDate);
            case 'performance':
                return b.performance - a.performance;
            case 'workload':
                return b.workload - a.workload;
            default:
                return 0;
        }
    });

    const toggleStar = (memberId) => {
        setTeamMembers(teamMembers.map(member =>
            member.id === memberId
                ? { ...member, starred: !member.starred }
                : member
        ));
    };

    const toggleMemberSelection = (memberId) => {
        setSelectedMembers(prev =>
            prev.includes(memberId)
                ? prev.filter(id => id !== memberId)
                : [...prev, memberId]
        );
    };

    const selectAllMembers = () => {
        setSelectedMembers(selectedMembers.length === sortedMembers.length ? [] : sortedMembers.map(m => m.id));
    };

    const clearFilters = () => {
        setSearchTerm('');
        setRoleFilter('all');
        setStatusFilter('all');
        setDepartmentFilter('all');
    };

    const MemberCard = ({ member }) => (
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
                                {member.avatar}
                            </div>
                            {member.isOnline && (
                                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                            )}
                        </div>
                        <div>
                            <h3 className="font-semibold text-gray-900 text-lg">{member.name}</h3>
                            <p className="text-sm text-gray-600 flex items-center gap-1">
                                {getRoleIcon(member.role)}
                                {member.role}
                            </p>
                            <p className="text-sm text-gray-500">{member.department}</p>
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
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(member.status)}`}>
                            {member.status === 'active' && <CheckCircle2 className="w-3 h-3 mr-1" />}
                            {member.status === 'inactive' && <AlertCircle className="w-3 h-3 mr-1" />}
                            {member.status === 'on_leave' && <Clock className="w-3 h-3 mr-1" />}
                            {member.status.charAt(0).toUpperCase() + member.status.slice(1).replace('_', ' ')}
                        </span>
                    </div>
                    <div>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getWorkloadColor(member.workload)}`}>
                            {member.workload}% workload
                        </span>
                    </div>
                </div>

                <div className="space-y-3 mb-4">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Mail className="w-4 h-4" />
                        <span>{member.email}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                        <MapPin className="w-4 h-4" />
                        <span>{member.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Calendar className="w-4 h-4" />
                        <span>Joined {formatDate(member.joinDate)}</span>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                        <p className="text-xs text-gray-500 mb-1">Performance</p>
                        <div className="flex items-center gap-2">
                            <div className="flex-1 bg-gray-200 rounded-full h-2">
                                <div
                                    className="bg-green-500 h-2 rounded-full transition-all duration-300"
                                    style={{ width: `${member.performance}%` }}
                                />
                            </div>
                            <span className="text-sm font-medium text-gray-900">{member.performance}%</span>
                        </div>
                    </div>
                    <div>
                        <p className="text-xs text-gray-500 mb-1">Tasks</p>
                        <p className="text-sm font-medium text-gray-900">
                            {member.completedTasks}/{member.totalTasks}
                        </p>
                    </div>
                </div>

                <div className="mb-4">
                    <p className="text-xs text-gray-500 mb-2">Current Projects</p>
                    <div className="flex flex-wrap gap-1">
                        {member.projects.slice(0, 2).map((project, index) => (
                            <span key={index} className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
                                {project}
                            </span>
                        ))}
                        {member.projects.length > 2 && (
                            <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                                +{member.projects.length - 2} more
                            </span>
                        )}
                    </div>
                </div>

                <div className="mb-4">
                    <p className="text-xs text-gray-500 mb-2">Skills</p>
                    <div className="flex flex-wrap gap-1">
                        {member.skills.slice(0, 3).map((skill, index) => (
                            <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                                {skill}
                            </span>
                        ))}
                        {member.skills.length > 3 && (
                            <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                                +{member.skills.length - 3} more
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

    const MemberListItem = ({ member }) => (
        <div className="bg-white border-b border-gray-200 hover:bg-gray-50 transition-colors">
            <div className="px-6 py-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 flex-1">
                        <input
                            type="checkbox"
                            checked={selectedMembers.includes(member.id)}
                            onChange={() => toggleMemberSelection(member.id)}
                            className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                        />

                        <div className="flex items-center gap-3">
                            <div className="relative">
                                <div className="w-10 h-10 rounded-full bg-blue-500 text-white text-sm flex items-center justify-center font-medium">
                                    {member.avatar}
                                </div>
                                {member.isOnline && (
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

                    <div className="flex items-center gap-6">
                        <div className="text-center">
                            <p className="text-sm font-medium text-gray-900 flex items-center gap-1">
                                {getRoleIcon(member.role)}
                                {member.role}
                            </p>
                            <p className="text-xs text-gray-500">{member.department}</p>
                        </div>

                        <div className="text-center">
                            <p className="text-sm font-medium text-gray-900">{member.performance}%</p>
                            <p className="text-xs text-gray-500">Performance</p>
                        </div>

                        <div className="text-center">
                            <p className="text-sm font-medium text-gray-900">{member.completedTasks}/{member.totalTasks}</p>
                            <p className="text-xs text-gray-500">Tasks</p>
                        </div>

                        <div className="text-center">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getWorkloadColor(member.workload)}`}>
                                {member.workload}%
                            </span>
                            <p className="text-xs text-gray-500 mt-1">Workload</p>
                        </div>

                        <div className="text-center">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(member.status)}`}>
                                {member.status.charAt(0).toUpperCase() + member.status.slice(1).replace('_', ' ')}
                            </span>
                            <p className="text-xs text-gray-500 mt-1">Last active {getTimeAgo(member.lastActive)}</p>
                        </div>

                        <div className="flex gap-2">
                            <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-full">
                                <MessageSquare className="w-4 h-4" />
                            </button>
                            <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full">
                                <MoreHorizontal className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <div className="max-w-8xl px-6 mx-auto">
            {/* Header */}
            <div className="mb-8">
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Team Management</h1>
                        <p className="text-gray-600 mt-1">Manage your team members and collaborators</p>
                    </div>
                    <button 
                        onClick={() => setShowInviteModal(true)}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                    >
                        <UserPlus className="w-4 h-4" />
                        Invite Member
                    </button>
                </div>

                {/* Tabs */}
                <div className="border-b border-gray-200 mb-6">
                    <nav className="flex space-x-8">
                        <button
                            onClick={() => setActiveTab('members')}
                            className={`py-2 px-1 border-b-2 font-medium text-sm ${
                                activeTab === 'members'
                                    ? 'border-blue-500 text-blue-600'
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                            }`}
                        >
                            <Users className="w-4 h-4 inline mr-1" />
                            Members ({teamMembers.length})
                        </button>
                        <button
                            onClick={() => setActiveTab('teams')}
                            className={`py-2 px-1 border-b-2 font-medium text-sm ${
                                activeTab === 'teams'
                                    ? 'border-blue-500 text-blue-600'
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                            }`}
                        >
                            <Building className="w-4 h-4 inline mr-1" />
                            Teams ({teams.length})
                        </button>
                        <button
                            onClick={() => setActiveTab('permissions')}
                            className={`py-2 px-1 border-b-2 font-medium text-sm ${
                                activeTab === 'permissions'
                                    ? 'border-blue-500 text-blue-600'
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                            }`}
                        >
                            <Shield className="w-4 h-4 inline mr-1" />
                            Permissions
                        </button>
                        <button
                            onClick={() => setActiveTab('analytics')}
                            className={`py-2 px-1 border-b-2 font-medium text-sm ${
                                activeTab === 'analytics'
                                    ? 'border-blue-500 text-blue-600'
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                            }`}
                        >
                            <Activity className="w-4 h-4 inline mr-1" />
                            Analytics
                        </button>
                        <button
                            onClick={() => setActiveTab('leaveRequests')}
                            className={`py-2 px-1 border-b-2 font-medium text-sm ${
                                activeTab === 'leaveRequests'
                                    ? 'border-blue-500 text-blue-600'
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                            }`}
                        >
                            <GitPullRequestDraft className="w-4 h-4 inline mr-1" />
                            leaveRequests
                        </button>
                    </nav>
                </div>

                {/* Search and Filters */}
                {activeTab === 'members' && (
                    <div className="flex flex-col md:flex-row gap-4 mb-6">
                        <div className="flex-1 relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <input
                                type="text"
                                placeholder="Search members..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>
                        
                        <div className="flex gap-2">
                            <button
                                onClick={() => setShowFilters(!showFilters)}
                                className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                            >
                                <Filter className="w-4 h-4" />
                                Filters
                            </button>
                            
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            >
                                <option value="name">Sort by Name</option>
                                <option value="role">Sort by Role</option>
                                <option value="department">Sort by Department</option>
                                <option value="joinDate">Sort by Join Date</option>
                                <option value="performance">Sort by Performance</option>
                                <option value="workload">Sort by Workload</option>
                            </select>
                            
                            <div className="flex border border-gray-300 rounded-lg overflow-hidden">
                                <button
                                    onClick={() => setViewMode('grid')}
                                    className={`px-3 py-2 ${viewMode === 'grid' ? 'bg-blue-500 text-white' : 'bg-white text-gray-700'} hover:bg-blue-50`}
                                >
                                    <div className="grid grid-cols-2 gap-1">
                                        <div className="w-2 h-2 bg-current rounded-sm"></div>
                                        <div className="w-2 h-2 bg-current rounded-sm"></div>
                                        <div className="w-2 h-2 bg-current rounded-sm"></div>
                                        <div className="w-2 h-2 bg-current rounded-sm"></div>
                                    </div>
                                </button>
                                <button
                                    onClick={() => setViewMode('list')}
                                    className={`px-3 py-2 ${viewMode === 'list' ? 'bg-blue-500 text-white' : 'bg-white text-gray-700'} hover:bg-blue-50`}
                                >
                                    <div className="space-y-1">
                                        <div className="w-4 h-0.5 bg-current"></div>
                                        <div className="w-4 h-0.5 bg-current"></div>
                                        <div className="w-4 h-0.5 bg-current"></div>
                                    </div>
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Advanced Filters */}
                {showFilters && activeTab === 'members' && (
                    <div className="bg-gray-50 p-4 rounded-lg mb-6">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Role</label>
                                <select
                                    value={roleFilter}
                                    onChange={(e) => setRoleFilter(e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                >
                                    {roleOptions.map(option => (
                                        <option key={option.value} value={option.value}>
                                            {option.label}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                                <select
                                    value={statusFilter}
                                    onChange={(e) => setStatusFilter(e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                >
                                    {statusOptions.map(option => (
                                        <option key={option.value} value={option.value}>
                                            {option.label}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Department</label>
                                <select
                                    value={departmentFilter}
                                    onChange={(e) => setDepartmentFilter(e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                >
                                    {departmentOptions.map(option => (
                                        <option key={option.value} value={option.value}>
                                            {option.label}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        
                        <div className="flex justify-between items-center mt-4">
                            <button
                                onClick={clearFilters}
                                className="text-sm text-gray-600 hover:text-gray-800"
                            >
                                Clear all filters
                            </button>
                            <div className="text-sm text-gray-600">
                                Showing {sortedMembers.length} of {teamMembers.length} members
                            </div>
                        </div>
                    </div>
                )}

                {/* Bulk Actions */}
                {selectedMembers.length > 0 && activeTab === 'members' && (
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <span className="text-sm text-blue-700">
                                    {selectedMembers.length} member{selectedMembers.length !== 1 ? 's' : ''} selected
                                </span>
                                <button
                                    onClick={selectAllMembers}
                                    className="text-sm text-blue-600 hover:text-blue-800"
                                >
                                    {selectedMembers.length === sortedMembers.length ? 'Deselect All' : 'Select All'}
                                </button>
                            </div>
                            <div className="flex gap-2">
                                <button className="px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm">
                                    Export
                                </button>
                                <button className="px-3 py-1 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors text-sm">
                                    Archive
                                </button>
                                <button className="px-3 py-1 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm">
                                    Remove
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Tab Content */}
            {activeTab === 'members' && (
                <div>
                    {/* Members Grid/List View */}
                    {viewMode === 'grid' ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {sortedMembers.map(member => (
                                <MemberCard key={member.id} member={member} />
                            ))}
                        </div>
                    ) : (
                        // <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                        //     <div className="bg-gray-50 px-6 py-3 border-b border-gray-200">
                        //         <div className="flex items-center justify-between">
                        //             <div className="flex items-center gap-4">
                        //                 <input
                        //                     type="checkbox"
                        //                     checked={selectedMembers.length === sortedMembers.length && sortedMembers.length > 0}
                        //                     onChange={selectAllMembers}
                        //                     className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                        //                 />
                        //                 <span className="text-sm font-medium text-gray-900">Member</span>
                        //             </div>
                        //             <div className="flex items-center gap-6 text-sm font-medium text-gray-900">
                        //                 <span className="text-center">Role</span>
                        //                 <span className="text-center">Performance</span>
                        //                 <span className="text-center">Tasks</span>
                        //                 <span className="text-center">Workload</span>
                        //                 <span className="text-center">Status</span>
                        //                 <span className="text-center">Actions</span>
                        //             </div>
                        //         </div>
                        //     </div>
                        //     {sortedMembers.map(member => (
                        //         <MemberListItem key={member.id} member={member} />
                        //     ))}
                        // </div>
                        <MemberTable
                        sortedMembers={sortedMembers}
                        selectedMembers={selectedMembers}
                        selectAllMembers={selectAllMembers}
                        toggleMemberSelection={toggleMemberSelection}
                        toggleStar={toggleStar}
                        getRoleIcon={getRoleIcon}
                        getWorkloadColor={getWorkloadColor}
                        getStatusColor={getStatusColor}
                        getTimeAgo={getTimeAgo}
                    />
                    )}

                    {sortedMembers.length === 0 && (
                        <div className="text-center py-12">
                            <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                            <h3 className="text-lg font-medium text-gray-900 mb-2">No members found</h3>
                            <p className="text-gray-500">Try adjusting your search or filters</p>
                        </div>
                    )}
                </div>
            )}

            {activeTab === 'teams' && (
                <div className="space-y-6">
                    {teams.map(team => (
                        <div key={team.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                            <div className="flex items-center justify-between mb-4">
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900">{team.name}</h3>
                                    <p className="text-gray-600">{team.description}</p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                        team.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
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
            )}

            {activeTab === 'permissions' && (
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Role Permissions</h3>
                    <div className="space-y-4">
                        {roleOptions.filter(role => role.value !== 'all').map(role => (
                            <div key={role.value} className="border border-gray-200 rounded-lg p-4">
                                <h4 className="font-medium text-gray-900 mb-2">{role.label}</h4>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                                    <span className="text-sm text-gray-600 bg-gray-100 px-2 py-1 rounded">View Projects</span>
                                    <span className="text-sm text-gray-600 bg-gray-100 px-2 py-1 rounded">Edit Tasks</span>
                                    <span className="text-sm text-gray-600 bg-gray-100 px-2 py-1 rounded">View Reports</span>
                                    <span className="text-sm text-gray-600 bg-gray-100 px-2 py-1 rounded">Manage Team</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {activeTab === 'analytics' && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold text-gray-900">Team Performance</h3>
                            <TrendingUp className="w-5 h-5 text-green-500" />
                        </div>
                        <div className="text-3xl font-bold text-gray-900 mb-2">92%</div>
                        <p className="text-sm text-gray-600">Average performance across all members</p>
                    </div>
                    
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold text-gray-900">Active Members</h3>
                            <Users className="w-5 h-5 text-blue-500" />
                        </div>
                        <div className="text-3xl font-bold text-gray-900 mb-2">
                            {teamMembers.filter(m => m.status === 'active').length}
                        </div>
                        <p className="text-sm text-gray-600">Out of {teamMembers.length} total members</p>
                    </div>
                    
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold text-gray-900">Workload</h3>
                            <Activity className="w-5 h-5 text-orange-500" />
                        </div>
                        <div className="text-3xl font-bold text-gray-900 mb-2">
                            {Math.round(teamMembers.reduce((sum, m) => sum + m.workload, 0) / teamMembers.length)}%
                        </div>
                        <p className="text-sm text-gray-600">Average team workload</p>
                    </div>
                </div>
            )}
            {activeTab === 'leaveRequests' && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold text-gray-900">Leave requests of team members</h3>
                            <TrendingUp className="w-5 h-5 text-green-500" />
                        </div>
                        <div className="text-3xl font-bold text-gray-900 mb-2">92%</div>
                        <p className="text-sm text-gray-600">Average performance across all members</p>
                    </div>
{/*                     
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold text-gray-900">Active Members</h3>
                            <Users className="w-5 h-5 text-blue-500" />
                        </div>
                        <div className="text-3xl font-bold text-gray-900 mb-2">
                            {teamMembers.filter(m => m.status === 'active').length}
                        </div>
                        <p className="text-sm text-gray-600">Out of {teamMembers.length} total members</p>
                    </div>
                    
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold text-gray-900">Workload</h3>
                            <Activity className="w-5 h-5 text-orange-500" />
                        </div>
                        <div className="text-3xl font-bold text-gray-900 mb-2">
                            {Math.round(teamMembers.reduce((sum, m) => sum + m.workload, 0) / teamMembers.length)}%
                        </div>
                        <p className="text-sm text-gray-600">Average team workload</p>
                    </div> */}
                    
                </div>
            )}

            {/* Invite Member Modal */}
            {showInviteModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold text-gray-900">Invite Team Member</h3>
                            <button
                                onClick={() => setShowInviteModal(false)}
                                className="text-gray-400 hover:text-gray-600"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        
                        <form className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="Enter email address"
                                />
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Role
                                </label>
                                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                                    <option>Select Role</option>
                                    <option>Developer</option>
                                    <option>Designer</option>
                                    <option>Project Manager</option>
                                    <option>QA Engineer</option>
                                </select>
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Department
                                </label>
                                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                                    <option>Select Department</option>
                                    <option>Engineering</option>
                                    <option>Design</option>
                                    <option>Security</option>
                                    <option>Quality Assurance</option>
                                </select>
                            </div>
                            
                            <div className="flex justify-end gap-3 pt-4">
                                <button
                                    type="button"
                                    onClick={() => setShowInviteModal(false)}
                                    className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                                >
                                    Send Invitation
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TeamsContent1;