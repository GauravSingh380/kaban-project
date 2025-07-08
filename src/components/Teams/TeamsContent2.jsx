import React, { useState } from 'react';
import {
    Users,
    UserPlus,
    Settings,
    Search,
    Filter,
    Download,
    MoreHorizontal,
    Mail,
    Phone,
    MapPin,
    Calendar,
    Clock,
    Shield,
    Star,
    AlertCircle,
    CheckCircle2,
    Activity,
    FolderOpen,
    Bug,
    Target,
    TrendingUp,
    TrendingDown,
    Edit,
    Trash2,
    Eye,
    UserCheck,
    UserX,
    Crown,
    Award,
    Briefcase,
    Globe
} from 'lucide-react';

const TeamsContent2 = ({ user }) => {
    const [activeView, setActiveView] = useState('overview');
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedRole, setSelectedRole] = useState('all');
    const [selectedTeam, setSelectedTeam] = useState('all');
    const [selectedMember, setSelectedMember] = useState(null);

    // Mock data for teams
    const teamsData = {
        overview: {
            totalMembers: 24,
            activeMembers: 22,
            newThisMonth: 3,
            averageWorkload: 78,
            teams: 4,
            departments: 3
        },
        teams: [
            {
                id: 1,
                name: 'Frontend Development',
                description: 'Responsible for UI/UX and client-side development',
                members: 8,
                lead: 'Sarah Johnson',
                projects: ['E-commerce Platform', 'Mobile App Redesign'],
                status: 'active',
                workload: 85,
                performance: 92
            },
            {
                id: 2,
                name: 'Backend Development',
                description: 'Server-side development and API management',
                members: 6,
                lead: 'Mike Chen',
                projects: ['API Integration', 'Database Optimization'],
                status: 'active',
                workload: 75,
                performance: 88
            },
            {
                id: 3,
                name: 'QA & Testing',
                description: 'Quality assurance and testing procedures',
                members: 5,
                lead: 'Emma Wilson',
                projects: ['Security Audit', 'Performance Testing'],
                status: 'active',
                workload: 70,
                performance: 95
            },
            {
                id: 4,
                name: 'DevOps',
                description: 'Infrastructure and deployment management',
                members: 5,
                lead: 'Alex Rodriguez',
                projects: ['CI/CD Pipeline', 'Cloud Migration'],
                status: 'active',
                workload: 80,
                performance: 90
            }
        ],
        members: [
            {
                id: 1,
                name: 'Sarah Johnson',
                email: 'sarah.johnson@company.com',
                role: 'Team Lead',
                department: 'Frontend Development',
                avatar: 'SJ',
                status: 'active',
                lastActive: '2 hours ago',
                joinDate: '2023-01-15',
                location: 'New York, NY',
                phone: '+1 (555) 123-4567',
                workload: 85,
                tasksCompleted: 156,
                currentProjects: ['E-commerce Platform', 'Mobile App Redesign'],
                skills: ['React', 'TypeScript', 'UI/UX Design'],
                performance: 92,
                permissions: ['project_manage', 'team_lead', 'code_review']
            },
            {
                id: 2,
                name: 'Mike Chen',
                email: 'mike.chen@company.com',
                role: 'Senior Developer',
                department: 'Backend Development',
                avatar: 'MC',
                status: 'active',
                lastActive: '1 hour ago',
                joinDate: '2023-02-20',
                location: 'San Francisco, CA',
                phone: '+1 (555) 234-5678',
                workload: 75,
                tasksCompleted: 142,
                currentProjects: ['API Integration', 'Database Optimization'],
                skills: ['Node.js', 'Python', 'Docker'],
                performance: 88,
                permissions: ['code_review', 'deploy']
            },
            {
                id: 3,
                name: 'Emma Wilson',
                email: 'emma.wilson@company.com',
                role: 'QA Manager',
                department: 'QA & Testing',
                avatar: 'EW',
                status: 'active',
                lastActive: '30 minutes ago',
                joinDate: '2023-03-10',
                location: 'Chicago, IL',
                phone: '+1 (555) 345-6789',
                workload: 70,
                tasksCompleted: 98,
                currentProjects: ['Security Audit', 'Performance Testing'],
                skills: ['Test Automation', 'Selenium', 'Jest'],
                performance: 95,
                permissions: ['test_manage', 'bug_report']
            },
            {
                id: 4,
                name: 'Alex Rodriguez',
                email: 'alex.rodriguez@company.com',
                role: 'DevOps Engineer',
                department: 'DevOps',
                avatar: 'AR',
                status: 'active',
                lastActive: '45 minutes ago',
                joinDate: '2023-04-05',
                location: 'Austin, TX',
                phone: '+1 (555) 456-7890',
                workload: 80,
                tasksCompleted: 87,
                currentProjects: ['CI/CD Pipeline', 'Cloud Migration'],
                skills: ['AWS', 'Kubernetes', 'Jenkins'],
                performance: 90,
                permissions: ['deploy', 'infrastructure']
            },
            {
                id: 5,
                name: 'Lisa Park',
                email: 'lisa.park@company.com',
                role: 'Junior Developer',
                department: 'Frontend Development',
                avatar: 'LP',
                status: 'active',
                lastActive: '3 hours ago',
                joinDate: '2023-06-01',
                location: 'Seattle, WA',
                phone: '+1 (555) 567-8901',
                workload: 60,
                tasksCompleted: 45,
                currentProjects: ['Mobile App Redesign'],
                skills: ['React', 'JavaScript', 'CSS'],
                performance: 85,
                permissions: ['code_view']
            },
            {
                id: 6,
                name: 'David Kim',
                email: 'david.kim@company.com',
                role: 'Senior Developer',
                department: 'Backend Development',
                avatar: 'DK',
                status: 'inactive',
                lastActive: '2 days ago',
                joinDate: '2023-05-15',
                location: 'Los Angeles, CA',
                phone: '+1 (555) 678-9012',
                workload: 0,
                tasksCompleted: 78,
                currentProjects: [],
                skills: ['Java', 'Spring Boot', 'MySQL'],
                performance: 82,
                permissions: ['code_review']
            }
        ],
        recentActivity: [
            { id: 1, type: 'member_joined', member: 'Lisa Park', description: 'joined Frontend Development team', time: '2 hours ago' },
            { id: 2, type: 'role_changed', member: 'Mike Chen', description: 'promoted to Senior Developer', time: '1 day ago' },
            { id: 3, type: 'project_assigned', member: 'Emma Wilson', description: 'assigned to Security Audit project', time: '2 days ago' },
            { id: 4, type: 'member_inactive', member: 'David Kim', description: 'marked as inactive', time: '2 days ago' },
            { id: 5, type: 'permission_granted', member: 'Alex Rodriguez', description: 'granted infrastructure permissions', time: '3 days ago' }
        ]
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

    const getStatusColor = (status) => {
        switch (status) {
            case 'active': return 'text-green-600 bg-green-50';
            case 'inactive': return 'text-red-600 bg-red-50';
            case 'away': return 'text-yellow-600 bg-yellow-50';
            default: return 'text-gray-600 bg-gray-50';
        }
    };

    const getActivityIcon = (type) => {
        switch (type) {
            case 'member_joined': return <UserPlus className="w-4 h-4 text-green-500" />;
            case 'role_changed': return <Shield className="w-4 h-4 text-blue-500" />;
            case 'project_assigned': return <FolderOpen className="w-4 h-4 text-purple-500" />;
            case 'member_inactive': return <UserX className="w-4 h-4 text-red-500" />;
            case 'permission_granted': return <UserCheck className="w-4 h-4 text-green-500" />;
            default: return <Activity className="w-4 h-4 text-gray-500" />;
        }
    };

    const filteredMembers = teamsData.members.filter(member => {
        const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                             member.email.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesRole = selectedRole === 'all' || member.role === selectedRole;
        const matchesTeam = selectedTeam === 'all' || member.department === selectedTeam;
        return matchesSearch && matchesRole && matchesTeam;
    });

    const renderOverview = () => (
        <div className="space-y-6">
            {/* Overview Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600">Total Members</p>
                            <p className="text-2xl font-bold text-gray-900">{teamsData.overview.totalMembers}</p>
                        </div>
                        <div className="p-3 bg-blue-50 rounded-full">
                            <Users className="w-6 h-6 text-blue-600" />
                        </div>
                    </div>
                    <div className="mt-4 flex items-center text-sm">
                        <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                        <span className="text-green-600">12%</span>
                        <span className="text-gray-500 ml-1">from last month</span>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600">Active Members</p>
                            <p className="text-2xl font-bold text-gray-900">{teamsData.overview.activeMembers}</p>
                        </div>
                        <div className="p-3 bg-green-50 rounded-full">
                            <UserCheck className="w-6 h-6 text-green-600" />
                        </div>
                    </div>
                    <div className="mt-4 flex items-center text-sm">
                        <CheckCircle2 className="w-4 h-4 text-green-500 mr-1" />
                        <span className="text-green-600">92%</span>
                        <span className="text-gray-500 ml-1">activity rate</span>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600">New This Month</p>
                            <p className="text-2xl font-bold text-gray-900">{teamsData.overview.newThisMonth}</p>
                        </div>
                        <div className="p-3 bg-purple-50 rounded-full">
                            <UserPlus className="w-6 h-6 text-purple-600" />
                        </div>
                    </div>
                    <div className="mt-4 flex items-center text-sm">
                        <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                        <span className="text-green-600">3 new</span>
                        <span className="text-gray-500 ml-1">members</span>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600">Avg Workload</p>
                            <p className="text-2xl font-bold text-gray-900">{teamsData.overview.averageWorkload}%</p>
                        </div>
                        <div className="p-3 bg-orange-50 rounded-full">
                            <Activity className="w-6 h-6 text-orange-600" />
                        </div>
                    </div>
                    <div className="mt-4 flex items-center text-sm">
                        <TrendingDown className="w-4 h-4 text-green-500 mr-1" />
                        <span className="text-green-600">5%</span>
                        <span className="text-gray-500 ml-1">from last week</span>
                    </div>
                </div>
            </div>

            {/* Teams Overview */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-lg font-semibold text-gray-900">Teams Overview</h2>
                    <button 
                        onClick={() => setActiveView('teams')}
                        className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                    >
                        View All Teams
                    </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {teamsData.teams.map((team) => (
                        <div key={team.id} className="border border-gray-200 rounded-lg p-4">
                            <div className="flex items-center justify-between mb-3">
                                <div>
                                    <h3 className="font-medium text-gray-900">{team.name}</h3>
                                    <p className="text-sm text-gray-600">{team.description}</p>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <span className="text-sm text-gray-500">{team.members} members</span>
                                </div>
                            </div>
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-sm text-gray-600">Team Lead: {team.lead}</span>
                                <span className="text-sm font-medium text-gray-900">{team.performance}% performance</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                                <div
                                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                                    style={{ width: `${team.performance}%` }}
                                ></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-lg font-semibold text-gray-900">Recent Team Activity</h2>
                    <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">View All</button>
                </div>
                <div className="space-y-4">
                    {teamsData.recentActivity.map((activity) => (
                        <div key={activity.id} className="flex items-start space-x-3">
                            <div className="flex-shrink-0 mt-1">
                                {getActivityIcon(activity.type)}
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm text-gray-900">
                                    <span className="font-medium">{activity.member}</span> {activity.description}
                                </p>
                                <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );

    const renderMembers = () => (
        <div className="space-y-6">
            {/* Search and Filters */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
                <div className="flex items-center space-x-4">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <input
                            type="text"
                            placeholder="Search members..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>
                    <select
                        value={selectedRole}
                        onChange={(e) => setSelectedRole(e.target.value)}
                        className="border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                        <option value="all">All Roles</option>
                        <option value="Team Lead">Team Lead</option>
                        <option value="Senior Developer">Senior Developer</option>
                        <option value="QA Manager">QA Manager</option>
                        <option value="DevOps Engineer">DevOps Engineer</option>
                        <option value="Junior Developer">Junior Developer</option>
                    </select>
                    <select
                        value={selectedTeam}
                        onChange={(e) => setSelectedTeam(e.target.value)}
                        className="border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                        <option value="all">All Teams</option>
                        {teamsData.teams.map((team) => (
                            <option key={team.id} value={team.name}>{team.name}</option>
                        ))}
                    </select>
                </div>
                <div className="flex items-center space-x-3">
                    <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                        <UserPlus className="w-4 h-4" />
                        <span>Add Member</span>
                    </button>
                    <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50">
                        <Download className="w-4 h-4" />
                        <span>Export</span>
                    </button>
                </div>
            </div>

            {/* Members Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredMembers.map((member) => (
                    <div key={member.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-medium">
                                    {member.avatar}
                                </div>
                                <div>
                                    <h3 className="font-medium text-gray-900">{member.name}</h3>
                                    <p className="text-sm text-gray-600">{member.email}</p>
                                </div>
                            </div>
                            <div className="flex items-center space-x-2">
                                <button className="p-1 text-gray-400 hover:text-gray-600">
                                    <Eye className="w-4 h-4" />
                                </button>
                                <button className="p-1 text-gray-400 hover:text-gray-600">
                                    <MoreHorizontal className="w-4 h-4" />
                                </button>
                            </div>
                        </div>

                        <div className="space-y-2 mb-4">
                            <div className="flex items-center justify-between">
                                <span className={`px-2 py-1 text-xs font-medium rounded-full ${getRoleColor(member.role)}`}>
                                    {member.role}
                                </span>
                                <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(member.status)}`}>
                                    {member.status}
                                </span>
                            </div>
                            <p className="text-sm text-gray-600">{member.department}</p>
                        </div>

                        <div className="space-y-2 mb-4">
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-gray-600">Workload</span>
                                <span className="font-medium">{member.workload}%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                                <div
                                    className={`h-2 rounded-full transition-all duration-300 ${
                                        member.workload > 80 ? 'bg-red-500' : 
                                        member.workload > 60 ? 'bg-yellow-500' : 'bg-green-500'
                                    }`}
                                    style={{ width: `${member.workload}%` }}
                                ></div>
                            </div>
                        </div>

                        <div className="flex items-center justify-between text-sm text-gray-600">
                            <span>Tasks: {member.tasksCompleted}</span>
                            <span>Performance: {member.performance}%</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

    const renderTeams = () => (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">Team Management</h2>
                <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                    <Users className="w-4 h-4" />
                    <span>Create Team</span>
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {teamsData.teams.map((team) => (
                    <div key={team.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                        <div className="flex items-center justify-between mb-4">
                            <div>
                                <h3 className="text-lg font-medium text-gray-900">{team.name}</h3>
                                <p className="text-sm text-gray-600">{team.description}</p>
                            </div>
                            <div className="flex items-center space-x-2">
                                <button className="p-2 text-gray-400 hover:text-gray-600">
                                    <Edit className="w-4 h-4" />
                                </button>
                                <button className="p-2 text-gray-400 hover:text-gray-600">
                                    <Settings className="w-4 h-4" />
                                </button>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-2">
                                    <Crown className="w-4 h-4 text-yellow-500" />
                                    <span className="text-sm font-medium text-gray-900">Team Lead</span>
                                </div>
                                <span className="text-sm text-gray-600">{team.lead}</span>
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-2">
                                    <Users className="w-4 h-4 text-blue-500" />
                                    <span className="text-sm font-medium text-gray-900">Members</span>
                                </div>
                                <span className="text-sm text-gray-600">{team.members}</span>
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-2">
                                    <FolderOpen className="w-4 h-4 text-green-500" />
                                    <span className="text-sm font-medium text-gray-900">Active Projects</span>
                                </div>
                                <span className="text-sm text-gray-600">{team.projects.length}</span>
                            </div>

                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm font-medium text-gray-900">Performance</span>
                                    <span className="text-sm text-gray-600">{team.performance}%</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                    <div
                                        className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                                        style={{ width: `${team.performance}%` }}
                                    ></div>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm font-medium text-gray-900">Workload</span>
                                    <span className="text-sm text-gray-600">{team.workload}%</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                    <div
                                        className={`h-2 rounded-full transition-all duration-300 ${
                                            team.workload > 80 ? 'bg-red-500' : 
                                            team.workload > 60 ? 'bg-yellow-500' : 'bg-green-500'
                                        }`}
                                        style={{ width: `${team.workload}%` }}
                                    ></div>
                                </div>
                            </div>

                            <div className="pt-4 border-t border-gray-200">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-gray-600">Current Projects:</span>
                                    <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                                        View All
                                    </button>
                                </div>
                                <div className="mt-2 space-y-1">
                                    {team.projects.slice(0, 2).map((project, index) => (
                                        <div key={index} className="text-sm text-gray-600">• {project}</div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

    return (
        <div className="p-6 space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Teams</h1>
                    <p className="text-gray-600 mt-1">Manage your team members and collaborate effectively</p>
                </div>
                <div className="mt-4 sm:mt-0 flex items-center space-x-3">
                    <button
                        onClick={() => setActiveView('overview')}
                        className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                            activeView === 'overview' 
                                ? 'bg-blue-600 text-white' 
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                    >
                        Overview
                    </button>
                    <button
                        onClick={() => setActiveView('members')}
                        className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                            activeView === 'members' 
                                ? 'bg-blue-600 text-white' 
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                    >
                        Members
                    </button>
                    <button
                        onClick={() => setActiveView('teams')}
                        className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                            activeView === 'teams' 
                                ? 'bg-blue-600 text-white' 
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                    >
                        Teams
                    </button>
                </div>
            </div>

            {/* Content based on active view */}
            {activeView === 'overview' && renderOverview()}
            {activeView === 'members' && renderMembers()}
            {activeView === 'teams' && renderTeams()}
        </div>
    );
};

export default TeamsContent2;