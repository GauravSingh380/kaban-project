import React, { useState } from 'react';
import {
    Users, TrendingUp, TrendingDown, Activity, Award, Target, 
    Clock, CheckCircle2, AlertCircle, Calendar, BarChart3, 
    PieChart, LineChart, Filter, Download, RefreshCw, Settings,
    ChevronUp, ChevronDown, Star, MapPin, Briefcase, Code,
    MessageSquare, Video, Coffee, Zap, Shield, Rocket
} from 'lucide-react';

const TeamAnalytics2 = () => {
    const [timeRange, setTimeRange] = useState('30d');
    const [selectedMetric, setSelectedMetric] = useState('all');

    // Mock data - replace with your actual data
    const teamMetrics = {
        totalMembers: 24,
        activeMembers: 22,
        onLeave: 2,
        newJoins: 3,
        avgPerformance: 87,
        avgWorkload: 72,
        completionRate: 94,
        totalProjects: 12
    };

    const roleDistribution = [
        { role: 'Senior Developer', count: 8, percentage: 33.3, color: 'bg-blue-500' },
        { role: 'Junior Developer', count: 6, percentage: 25, color: 'bg-green-500' },
        { role: 'Team Lead', count: 4, percentage: 16.7, color: 'bg-purple-500' },
        { role: 'QA Manager', count: 3, percentage: 12.5, color: 'bg-orange-500' },
        { role: 'DevOps Engineer', count: 3, percentage: 12.5, color: 'bg-red-500' }
    ];

    const departmentData = [
        { dept: 'Engineering', members: 14, projects: 8, completion: 92 },
        { dept: 'Quality Assurance', members: 4, projects: 12, completion: 96 },
        { dept: 'DevOps', members: 3, projects: 6, completion: 88 },
        { dept: 'Product', members: 3, projects: 4, completion: 94 }
    ];

    const performanceData = [
        { range: '90-100%', count: 8, color: 'bg-green-500' },
        { range: '80-89%', count: 10, color: 'bg-blue-500' },
        { range: '70-79%', count: 4, color: 'bg-yellow-500' },
        { range: '60-69%', count: 2, color: 'bg-orange-500' },
        { range: '<60%', count: 0, color: 'bg-red-500' }
    ];

    const workloadData = [
        { range: 'Overloaded (>90%)', count: 3, color: 'bg-red-500' },
        { range: 'High (70-90%)', count: 12, color: 'bg-orange-500' },
        { range: 'Optimal (50-70%)', count: 7, color: 'bg-green-500' },
        { range: 'Light (<50%)', count: 2, color: 'bg-blue-500' }
    ];

    const topPerformers = [
        { name: 'Sarah Johnson', role: 'Senior Developer', performance: 98, avatar: 'SJ' },
        { name: 'Mike Chen', role: 'Team Lead', performance: 96, avatar: 'MC' },
        { name: 'Emily Davis', role: 'QA Manager', performance: 94, avatar: 'ED' },
        { name: 'Alex Rodriguez', role: 'DevOps Engineer', performance: 92, avatar: 'AR' }
    ];

    const recentActivities = [
        { type: 'join', user: 'John Smith', action: 'joined the team', time: '2 hours ago', icon: Users },
        { type: 'performance', user: 'Team Alpha', action: 'reached 95% completion rate', time: '4 hours ago', icon: TrendingUp },
        { type: 'project', user: 'Project Phoenix', action: 'milestone completed', time: '6 hours ago', icon: Target },
        { type: 'leave', user: 'Jane Doe', action: 'went on vacation', time: '1 day ago', icon: Coffee }
    ];

    const skillsData = [
        { skill: 'React', count: 18, trend: '+12%' },
        { skill: 'Node.js', count: 15, trend: '+8%' },
        { skill: 'Python', count: 12, trend: '+15%' },
        { skill: 'AWS', count: 10, trend: '+20%' },
        { skill: 'Docker', count: 9, trend: '+5%' }
    ];

    const MetricCard = ({ title, value, change, icon: Icon, trend = 'up' }) => (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-xl ${trend === 'up' ? 'bg-green-50' : 'bg-red-50'}`}>
                    <Icon className={`w-6 h-6 ${trend === 'up' ? 'text-green-600' : 'text-red-600'}`} />
                </div>
                <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                    trend === 'up' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
                }`}>
                    {trend === 'up' ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                    {change}
                </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">{value}</h3>
            <p className="text-sm text-gray-600">{title}</p>
        </div>
    );

    const ProgressBar = ({ percentage, color = 'bg-blue-500' }) => (
        <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
                className={`${color} h-2 rounded-full transition-all duration-300`} 
                style={{ width: `${percentage}%` }}
            />
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">Team Analytics</h1>
                        <p className="text-gray-600">Comprehensive insights into your team's performance and productivity</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <select
                            value={timeRange}
                            onChange={(e) => setTimeRange(e.target.value)}
                            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                            <option value="7d">Last 7 days</option>
                            <option value="30d">Last 30 days</option>
                            <option value="90d">Last 90 days</option>
                            <option value="1y">Last year</option>
                        </select>
                        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                            <Download className="w-4 h-4" />
                            Export
                        </button>
                        <button className="p-2 text-gray-500 hover:text-gray-700 border border-gray-300 rounded-lg">
                            <RefreshCw className="w-4 h-4" />
                        </button>
                    </div>
                </div>

                {/* Key Metrics */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <MetricCard 
                        title="Total Team Members" 
                        value={teamMetrics.totalMembers} 
                        change="+12.5%" 
                        icon={Users} 
                    />
                    <MetricCard 
                        title="Active Members" 
                        value={teamMetrics.activeMembers} 
                        change="+8.3%" 
                        icon={Activity} 
                    />
                    <MetricCard 
                        title="Avg Performance" 
                        value={`${teamMetrics.avgPerformance}%`} 
                        change="+5.2%" 
                        icon={Award} 
                    />
                    <MetricCard 
                        title="Project Completion" 
                        value={`${teamMetrics.completionRate}%`} 
                        change="+2.1%" 
                        icon={Target} 
                    />
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Role Distribution */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-xl font-semibold text-gray-900">Team Composition</h2>
                                <PieChart className="w-5 h-5 text-gray-500" />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-4">
                                    {roleDistribution.map((role, index) => (
                                        <div key={index} className="flex items-center gap-4">
                                            <div className={`w-4 h-4 rounded-full ${role.color}`}></div>
                                            <div className="flex-1">
                                                <div className="flex items-center justify-between mb-1">
                                                    <span className="text-sm font-medium text-gray-900">{role.role}</span>
                                                    <span className="text-sm text-gray-600">{role.count}</span>
                                                </div>
                                                <ProgressBar percentage={role.percentage} color={role.color} />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="flex items-center justify-center">
                                    <div className="text-center">
                                        <div className="text-4xl font-bold text-gray-900 mb-2">{teamMetrics.totalMembers}</div>
                                        <div className="text-sm text-gray-600">Total Members</div>
                                        <div className="flex items-center justify-center gap-4 mt-4 text-xs">
                                            <div className="flex items-center gap-1">
                                                <CheckCircle2 className="w-3 h-3 text-green-500" />
                                                <span>{teamMetrics.activeMembers} Active</span>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <Clock className="w-3 h-3 text-orange-500" />
                                                <span>{teamMetrics.onLeave} On Leave</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Department Performance */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-xl font-semibold text-gray-900">Department Overview</h2>
                                <BarChart3 className="w-5 h-5 text-gray-500" />
                            </div>
                            <div className="space-y-4">
                                {departmentData.map((dept, index) => (
                                    <div key={index} className="p-4 bg-gray-50 rounded-lg">
                                        <div className="flex items-center justify-between mb-3">
                                            <h3 className="font-medium text-gray-900">{dept.dept}</h3>
                                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                                dept.completion >= 95 ? 'bg-green-100 text-green-700' :
                                                dept.completion >= 90 ? 'bg-blue-100 text-blue-700' :
                                                'bg-yellow-100 text-yellow-700'
                                            }`}>
                                                {dept.completion}% completion
                                            </span>
                                        </div>
                                        <div className="grid grid-cols-3 gap-4 text-sm">
                                            <div>
                                                <span className="text-gray-600">Members:</span>
                                                <span className="ml-1 font-medium">{dept.members}</span>
                                            </div>
                                            <div>
                                                <span className="text-gray-600">Projects:</span>
                                                <span className="ml-1 font-medium">{dept.projects}</span>
                                            </div>
                                            <div>
                                                <ProgressBar percentage={dept.completion} />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Performance & Workload Distribution */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                                <h2 className="text-lg font-semibold text-gray-900 mb-4">Performance Distribution</h2>
                                <div className="space-y-3">
                                    {performanceData.map((perf, index) => (
                                        <div key={index} className="flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                <div className={`w-3 h-3 rounded-full ${perf.color}`}></div>
                                                <span className="text-sm text-gray-700">{perf.range}</span>
                                            </div>
                                            <span className="text-sm font-medium text-gray-900">{perf.count}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                                <h2 className="text-lg font-semibold text-gray-900 mb-4">Workload Distribution</h2>
                                <div className="space-y-3">
                                    {workloadData.map((work, index) => (
                                        <div key={index} className="flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                <div className={`w-3 h-3 rounded-full ${work.color}`}></div>
                                                <span className="text-sm text-gray-700">{work.range}</span>
                                            </div>
                                            <span className="text-sm font-medium text-gray-900">{work.count}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column */}
                    <div className="space-y-8">
                        {/* Top Performers */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                            <div className="flex items-center gap-2 mb-6">
                                <Star className="w-5 h-5 text-yellow-500" />
                                <h2 className="text-lg font-semibold text-gray-900">Top Performers</h2>
                            </div>
                            <div className="space-y-4">
                                {topPerformers.map((performer, index) => (
                                    <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                                        <div className="w-10 h-10 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-medium">
                                            {performer.avatar}
                                        </div>
                                        <div className="flex-1">
                                            <div className="font-medium text-gray-900 text-sm">{performer.name}</div>
                                            <div className="text-xs text-gray-600">{performer.role}</div>
                                        </div>
                                        <div className="text-sm font-bold text-green-600">
                                            {performer.performance}%
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Skills Overview */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                            <div className="flex items-center gap-2 mb-6">
                                <Code className="w-5 h-5 text-purple-500" />
                                <h2 className="text-lg font-semibold text-gray-900">Popular Skills</h2>
                            </div>
                            <div className="space-y-3">
                                {skillsData.map((skill, index) => (
                                    <div key={index} className="flex items-center justify-between">
                                        <div>
                                            <span className="text-sm font-medium text-gray-900">{skill.skill}</span>
                                            <span className="ml-2 text-xs text-gray-600">{skill.count} members</span>
                                        </div>
                                        <span className="text-xs text-green-600 font-medium">{skill.trend}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Recent Activity */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                            <div className="flex items-center gap-2 mb-6">
                                <Activity className="w-5 h-5 text-blue-500" />
                                <h2 className="text-lg font-semibold text-gray-900">Recent Activity</h2>
                            </div>
                            <div className="space-y-4">
                                {recentActivities.map((activity, index) => (
                                    <div key={index} className="flex items-start gap-3">
                                        <div className={`p-2 rounded-lg ${
                                            activity.type === 'join' ? 'bg-green-50' :
                                            activity.type === 'performance' ? 'bg-blue-50' :
                                            activity.type === 'project' ? 'bg-purple-50' :
                                            'bg-orange-50'
                                        }`}>
                                            <activity.icon className={`w-4 h-4 ${
                                                activity.type === 'join' ? 'text-green-600' :
                                                activity.type === 'performance' ? 'text-blue-600' :
                                                activity.type === 'project' ? 'text-purple-600' :
                                                'text-orange-600'
                                            }`} />
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-sm text-gray-900">
                                                <span className="font-medium">{activity.user}</span> {activity.action}
                                            </p>
                                            <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TeamAnalytics2;