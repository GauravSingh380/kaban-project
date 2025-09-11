import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import {
    Search, Filter, MoreHorizontal, Calendar, Users, Mail,
    MapPin, Star, Edit, Trash2, X, User, UserPlus, Crown, Shield,
    CheckCircle2, Clock, AlertCircle, Eye, Activity, TrendingUp, MessageSquare,
    Video, Slack, Building, GitPullRequestDraft,
    ChevronLeft,
    ChevronRight
} from 'lucide-react';
import TeamMemberSignup from '../TeamSignUp/TeamMemberSignUp';
import MemberTable from './MemberTable';
import { useApi, useAuth } from '../../api';
import ApiSpinner from '../ApiSpinner';
import { useToast } from '../StyledAlert/ToastContext';
import TeamMemberCard from './contents/TeamMemberCard';
import { LoadingContent, Spinner } from '../common/SpinnerDemo';
import Teams from './contents/Teams';
import Permissions from './contents/Permissions';
import Analytics from './contents/Analytics';
import LeaveRequests from './contents/LeaveRequests';
import TeamAnalytics1 from './contents/TeamAnalytics1';
import TeamAnalytics2 from './contents/TeamAnalytics2';
import LeaveRequests1 from './contents/LeaveRequests1';
import LeaveRequests2 from './contents/LeaveRequests2';

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
    const hasFetched = useRef(false);

    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(6);

    const { getAllUserDetails } = useAuth();
    const { loading, error, execute } = useApi(getAllUserDetails);
    const alert = useToast();

    // Mock team data
    const [allTeamMember, setAllTeamMember] = useState([]);
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
            workload: 65,
            completedTasks: 47,
            totalTasks: 52,
            performance: 52,
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
    const departments = [
        { value: 'engineering', label: 'Engineering' },
        { value: 'design', label: 'Design' },
        { value: 'marketing', label: 'Marketing' },
        { value: 'sales', label: 'Sales' },
        { value: 'hr', label: 'Human Resources' },
        { value: 'finance', label: 'Finance' },
        { value: 'operations', label: 'Operations' }
    ];

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

    const filteredMembers = allTeamMember.filter(member => {
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
                return a.userDetails.department.localeCompare(b.userDetails.department);
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

    const fetchAllUserDetails = useCallback(async () => {
        try {
            const apiResp = await execute();
            if (apiResp) {
                alert.success(`${apiResp?.message || "All user fetched successful!"}`);
                setAllTeamMember(apiResp.data)
            }
        } catch (error) {
            if (error.message) {
                alert.error(error.message || 'An error occurred. Please try again.');
            } else {
                alert.error("Failed to get user. Please try again.");
            }
            console.error('Failed:', error);
        }
    }, [execute]);

    useEffect(() => {
        if (!hasFetched.current) {
            hasFetched.current = true;
            fetchAllUserDetails();
        }
    }, [loading]);
    // Pagination logic
    const paginatedData = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        return sortedMembers.slice(startIndex, startIndex + itemsPerPage);
    }, [sortedMembers, currentPage, itemsPerPage]);

    const totalPages = Math.ceil(sortedMembers.length / itemsPerPage);

    if (loading) {
        return (
            <div>
                <Spinner text="Default" />
            </div>
        )
    }

    return (
        <div className="max-w-8xl px-6 mx-auto">
            {/* Header */}
            <div className="mb-2">
                <div className="flex justify-between items-center mb-4">
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
                <div className="border-b border-gray-200 mb-4">
                    <nav className="flex space-x-8">
                        <button
                            onClick={() => setActiveTab('members')}
                            className={`py-2 px-1 border-b-2 font-medium text-sm ${activeTab === 'members'
                                    ? 'border-blue-500 text-blue-600'
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                }`}
                        >
                            <Users className="w-4 h-4 inline mr-1" />
                            Members ({teamMembers.length})
                        </button>
                        <button
                            onClick={() => setActiveTab('teams')}
                            className={`py-2 px-1 border-b-2 font-medium text-sm ${activeTab === 'teams'
                                    ? 'border-blue-500 text-blue-600'
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                }`}
                        >
                            <Building className="w-4 h-4 inline mr-1" />
                            Teams ({teams.length})
                        </button>
                        <button
                            onClick={() => setActiveTab('permissions')}
                            className={`py-2 px-1 border-b-2 font-medium text-sm ${activeTab === 'permissions'
                                    ? 'border-blue-500 text-blue-600'
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                }`}
                        >
                            <Shield className="w-4 h-4 inline mr-1" />
                            Permissions
                        </button>
                        <button
                            onClick={() => setActiveTab('analytics')}
                            className={`py-2 px-1 border-b-2 font-medium text-sm ${activeTab === 'analytics'
                                    ? 'border-blue-500 text-blue-600'
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                }`}
                        >
                            <Activity className="w-4 h-4 inline mr-1" />
                            Analytics
                        </button>
                        <button
                            onClick={() => setActiveTab('leaveRequests')}
                            className={`py-2 px-1 border-b-2 font-medium text-sm ${activeTab === 'leaveRequests'
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
                            </select>

                            <button
                                onClick={clearFilters}
                                className="flex items-center space-x-2 px-3 py-2 text-sm text-red-600 hover:text-red-800"
                            >
                                <X className="w-4 h-4" />
                                <span>Clear All</span>
                            </button>

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
                    <div className="flex items-center space-x-4">
                        <span className="text-sm text-gray-500">
                            Showing {paginatedData.length} of {sortedMembers.length} results
                        </span>
                        <select
                            value={itemsPerPage}
                            onChange={(e) => {
                                setItemsPerPage(Number(e.target.value));
                                setCurrentPage(1);
                            }}
                            className="border border-gray-300 rounded-md px-3 py-1 text-sm"
                        >
                            <option value={5}>5 per page</option>
                            <option value={10}>10 per page</option>
                            <option value={15}>15 per page</option>
                            <option value={20}>20 per page</option>
                        </select>
                    </div>
                    {/* Members Grid/List View */}
                    {viewMode === 'grid' ? (
                        <>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {paginatedData.map(member => (
                                    <TeamMemberCard
                                        getRoleIcon={getRoleIcon}
                                        selectedMembers={selectedMembers}
                                        selectAllMembers={selectAllMembers}
                                        toggleMemberSelection={toggleMemberSelection}
                                        toggleStar={toggleStar}
                                        getWorkloadColor={getWorkloadColor}
                                        getStatusColor={getStatusColor}
                                        getTimeAgo={getTimeAgo}
                                        key={member.id}
                                        member={member}
                                    />
                                ))}
                            </div>
                            {/* Pagination */}
                            {totalPages > 1 && (
                                <div className="px-6 py-4 border-t border-gray-200">
                                    <div className="flex items-center justify-between">
                                        <div className="text-sm text-gray-700">
                                            Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, sortedMembers.length)} of {sortedMembers.length} results
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <button
                                                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                                                disabled={currentPage === 1}
                                                className="flex items-center px-3 py-2 text-sm border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                                            >
                                                <ChevronLeft className="w-4 h-4 mr-1" />
                                                Previous
                                            </button>

                                            <div className="flex items-center space-x-1">
                                                {[...Array(totalPages)].map((_, index) => {
                                                    const page = index + 1;
                                                    const isVisible = page === 1 || page === totalPages || (page >= currentPage - 2 && page <= currentPage + 2);

                                                    if (!isVisible) {
                                                        if (page === currentPage - 3 || page === currentPage + 3) {
                                                            return <span key={page} className="px-2 text-gray-400">...</span>;
                                                        }
                                                        return null;
                                                    }

                                                    return (
                                                        <button
                                                            key={page}
                                                            onClick={() => setCurrentPage(page)}
                                                            className={`px-3 py-2 text-sm border rounded-md ${currentPage === page
                                                                ? 'bg-blue-600 text-white border-blue-600'
                                                                : 'border-gray-300 hover:bg-gray-50'
                                                                }`}
                                                        >
                                                            {page}
                                                        </button>
                                                    );
                                                })}
                                            </div>

                                            <button
                                                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                                                disabled={currentPage === totalPages}
                                                className="flex items-center px-3 py-2 text-sm border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                                            >
                                                Next
                                                <ChevronRight className="w-4 h-4 ml-1" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </>
                    ) : (
                        <MemberTable
                            sortedMembers={paginatedData}
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
                <Teams teams={teams} teamMembers={teamMembers} />
            )}

            {activeTab === 'permissions' && (
                <Permissions />
            )}

            {activeTab === 'analytics' && (
                // <Analytics teamMembers={teamMembers} />
                <>
                <TeamAnalytics1 />
                <br />
                <br />
                <br />
                <br />
                <TeamAnalytics2 />
                </>
            )}
            {activeTab === 'leaveRequests' && (
                // <LeaveRequests teamMembers={teamMembers} />
                <>
                <LeaveRequests1 />
                <br />
                <br />
                <br />
                <br />
                <LeaveRequests2 />
</>
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