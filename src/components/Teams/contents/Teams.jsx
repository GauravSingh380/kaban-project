import React from 'react'
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


const Teams = ({ teams, teamMembers }) => {
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
    return (
        <div className="space-y-6">
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

        </div>
    )
}

export default Teams