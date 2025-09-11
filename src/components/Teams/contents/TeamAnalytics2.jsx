import React, { useState } from 'react';
import {
    Users, TrendingUp, Target, Award, Clock, Calendar, MapPin,
    Activity, BarChart3, PieChart, LineChart, Filter, Download,
    ArrowUp, ArrowDown, Minus, Star, AlertTriangle, CheckCircle,
    Code, Palette, Database, Shield, Zap, Globe
} from 'lucide-react';

const TeamAnalytics2 = () => {
    const [timeRange, setTimeRange] = useState('30d');
    const [selectedMetric, setSelectedMetric] = useState('performance');

    // Sample data - in a real app, this would come from your API
    const analyticsData = {
        overview: {
            totalMembers: 47,
            activeMembers: 43,
            onLeave: 2,
            newHires: 6,
            avgPerformance: 82,
            totalProjects: 23,
            completedTasks: 1247,
            pendingTasks: 189
        },
        departmentBreakdown: [
            { name: 'Engineering', count: 22, color: 'bg-blue-500' },
            { name: 'Design', count: 8, color: 'bg-purple-500' },
            { name: 'Product', count: 6, color: 'bg-green-500' },
            { name: 'Marketing', count: 5, color: 'bg-orange-500' },
            { name: 'Sales', count: 4, color: 'bg-pink-500' },
            { name: 'DevOps', count: 2, color: 'bg-red-500' }
        ],
        roleDistribution: [
            { role: 'Senior Developer', count: 12, trend: 'up' },
            { role: 'Junior Developer', count: 8, trend: 'up' },
            { role: 'Team Lead', count: 6, trend: 'neutral' },
            { role: 'QA Manager', count: 5, trend: 'up' },
            { role: 'DevOps Engineer', count: 4, trend: 'neutral' },
            { role: 'Designer', count: 8, trend: 'up' },
            { role: 'Product Manager', count: 4, trend: 'down' }
        ],
        workloadDistribution: {
            underutilized: 8,
            optimal: 32,
            overutilized: 7
        },
        topPerformers: [
            { name: 'Sarah Chen', department: 'Engineering', score: 97, avatar: 'SC' },
            { name: 'Alex Rodriguez', department: 'Design', score: 94, avatar: 'AR' },
            { name: 'Michael Kim', department: 'Product', score: 92, avatar: 'MK' },
            { name: 'Emma Wilson', department: 'Engineering', score: 90, avatar: 'EW' }
        ],
        skillsAnalysis: [
            { skill: 'React', count: 18, level: 'high' },
            { skill: 'Node.js', count: 15, level: 'high' },
            { skill: 'Python', count: 12, level: 'medium' },
            { skill: 'AWS', count: 10, level: 'medium' },
            { skill: 'Figma', count: 8, level: 'high' },
            { skill: 'Docker', count: 7, level: 'low' }
        ],
        locationBreakdown: [
            { location: 'San Francisco', count: 15 },
            { location: 'Remote', count: 12 },
            { location: 'New York', count: 10 },
            { location: 'Austin', count: 6 },
            { location: 'Seattle', count: 4 }
        ]
    };

    const MetricCard = ({ title, value, change, icon: Icon, color = 'blue' }) => (
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
                    <p className="text-3xl font-bold text-gray-900">{value}</p>
                    {change && (
                        <div className="flex items-center mt-2">
                            {change > 0 ? (
                                <ArrowUp className="w-4 h-4 text-green-500 mr-1" />
                            ) : change < 0 ? (
                                <ArrowDown className="w-4 h-4 text-red-500 mr-1" />
                            ) : (
                                <Minus className="w-4 h-4 text-gray-400 mr-1" />
                            )}
                            <span className={`text-sm font-medium ${
                                change > 0 ? 'text-green-600' : change < 0 ? 'text-red-600' : 'text-gray-500'
                            }`}>
                                {change > 0 ? '+' : ''}{change}% vs last month
                            </span>
                        </div>
                    )}
                </div>
                <div className={`p-3 rounded-full bg-${color}-100`}>
                    <Icon className={`w-6 h-6 text-${color}-600`} />
                </div>
            </div>
        </div>
    );

    const ProgressBar = ({ percentage, color = 'blue' }) => (
        <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
                className={`bg-${color}-500 h-2 rounded-full transition-all duration-500`}
                style={{ width: `${percentage}%` }}
            />
        </div>
    );

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Team Analytics</h1>
                    <p className="text-gray-600">Comprehensive insights into your team's performance and structure</p>
                </div>
                <div className="flex items-center gap-4">
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
                    <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                        <Download className="w-4 h-4" />
                        Export
                    </button>
                </div>
            </div>

            {/* Overview Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <MetricCard 
                    title="Total Team Members" 
                    value={analyticsData.overview.totalMembers}
                    change={8}
                    icon={Users}
                    color="blue"
                />
                <MetricCard 
                    title="Active Members" 
                    value={analyticsData.overview.activeMembers}
                    change={5}
                    icon={CheckCircle}
                    color="green"
                />
                <MetricCard 
                    title="Avg Performance" 
                    value={`${analyticsData.overview.avgPerformance}%`}
                    change={3}
                    icon={TrendingUp}
                    color="purple"
                />
                <MetricCard 
                    title="Active Projects" 
                    value={analyticsData.overview.totalProjects}
                    change={-2}
                    icon={Target}
                    color="orange"
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
                {/* Department Breakdown */}
                <div className="lg:col-span-1">
                    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                        <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
                            <PieChart className="w-5 h-5 text-blue-600" />
                            Department Distribution
                        </h3>
                        <div className="space-y-4">
                            {analyticsData.departmentBreakdown.map((dept, index) => (
                                <div key={index} className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className={`w-3 h-3 rounded-full ${dept.color}`}></div>
                                        <span className="text-sm font-medium text-gray-700">{dept.name}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-sm font-semibold text-gray-900">{dept.count}</span>
                                        <span className="text-xs text-gray-500">
                                            ({Math.round((dept.count / analyticsData.overview.totalMembers) * 100)}%)
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Workload Distribution */}
                <div className="lg:col-span-1">
                    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                        <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
                            <Activity className="w-5 h-5 text-green-600" />
                            Workload Analysis
                        </h3>
                        <div className="space-y-6">
                            <div>
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-sm font-medium text-gray-700">Under-utilized</span>
                                    <span className="text-sm font-semibold text-blue-600">
                                        {analyticsData.workloadDistribution.underutilized}
                                    </span>
                                </div>
                                <ProgressBar 
                                    percentage={(analyticsData.workloadDistribution.underutilized / analyticsData.overview.totalMembers) * 100} 
                                    color="blue"
                                />
                            </div>
                            <div>
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-sm font-medium text-gray-700">Optimal</span>
                                    <span className="text-sm font-semibold text-green-600">
                                        {analyticsData.workloadDistribution.optimal}
                                    </span>
                                </div>
                                <ProgressBar 
                                    percentage={(analyticsData.workloadDistribution.optimal / analyticsData.overview.totalMembers) * 100} 
                                    color="green"
                                />
                            </div>
                            <div>
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-sm font-medium text-gray-700">Over-utilized</span>
                                    <span className="text-sm font-semibold text-red-600">
                                        {analyticsData.workloadDistribution.overutilized}
                                    </span>
                                </div>
                                <ProgressBar 
                                    percentage={(analyticsData.workloadDistribution.overutilized / analyticsData.overview.totalMembers) * 100} 
                                    color="red"
                                />
                            </div>
                        </div>
                        <div className="mt-6 p-4 bg-orange-50 rounded-lg">
                            <div className="flex items-center gap-2 text-orange-700">
                                <AlertTriangle className="w-4 h-4" />
                                <span className="text-sm font-medium">7 members need workload adjustment</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Top Performers */}
                <div className="lg:col-span-1">
                    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                        <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
                            <Award className="w-5 h-5 text-yellow-600" />
                            Top Performers
                        </h3>
                        <div className="space-y-4">
                            {analyticsData.topPerformers.map((performer, index) => (
                                <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                                    <div className="flex items-center gap-2">
                                        <span className="text-sm font-bold text-gray-500 w-6">#{index + 1}</span>
                                        <div className="w-8 h-8 rounded-full bg-blue-500 text-white text-xs flex items-center justify-center font-medium">
                                            {performer.avatar}
                                        </div>
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-sm font-medium text-gray-900">{performer.name}</p>
                                        <p className="text-xs text-gray-500">{performer.department}</p>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                                        <span className="text-sm font-semibold text-gray-900">{performer.score}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Role Distribution */}
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                    <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
                        <BarChart3 className="w-5 h-5 text-indigo-600" />
                        Role Distribution
                    </h3>
                    <div className="space-y-4">
                        {analyticsData.roleDistribution.map((role, index) => (
                            <div key={index} className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors">
                                <div className="flex items-center gap-3">
                                    <span className="text-sm font-medium text-gray-700">{role.role}</span>
                                    {role.trend === 'up' && <ArrowUp className="w-4 h-4 text-green-500" />}
                                    {role.trend === 'down' && <ArrowDown className="w-4 h-4 text-red-500" />}
                                    {role.trend === 'neutral' && <Minus className="w-4 h-4 text-gray-400" />}
                                </div>
                                <span className="text-sm font-semibold text-gray-900">{role.count}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Skills Analysis */}
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                    <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
                        <Code className="w-5 h-5 text-purple-600" />
                        Skills Coverage
                    </h3>
                    <div className="space-y-4">
                        {analyticsData.skillsAnalysis.map((skill, index) => (
                            <div key={index} className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm font-medium text-gray-700">{skill.skill}</span>
                                    <div className="flex items-center gap-2">
                                        <span className="text-sm font-semibold text-gray-900">{skill.count}</span>
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                            skill.level === 'high' ? 'bg-green-100 text-green-700' :
                                            skill.level === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                                            'bg-red-100 text-red-700'
                                        }`}>
                                            {skill.level}
                                        </span>
                                    </div>
                                </div>
                                <ProgressBar 
                                    percentage={(skill.count / analyticsData.overview.totalMembers) * 100}
                                    color={skill.level === 'high' ? 'green' : skill.level === 'medium' ? 'yellow' : 'red'}
                                />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Location Breakdown */}
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                    <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
                        <MapPin className="w-5 h-5 text-red-600" />
                        Team Locations
                    </h3>
                    <div className="space-y-4">
                        {analyticsData.locationBreakdown.map((location, index) => (
                            <div key={index} className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors">
                                <div className="flex items-center gap-3">
                                    <Globe className="w-4 h-4 text-gray-400" />
                                    <span className="text-sm font-medium text-gray-700">{location.location}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-sm font-semibold text-gray-900">{location.count}</span>
                                    <span className="text-xs text-gray-500">
                                        ({Math.round((location.count / analyticsData.overview.totalMembers) * 100)}%)
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Quick Stats */}
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                    <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
                        <Zap className="w-5 h-5 text-yellow-600" />
                        Quick Insights
                    </h3>
                    <div className="space-y-4">
                        <div className="p-4 bg-blue-50 rounded-lg">
                            <div className="flex items-center gap-2 mb-2">
                                <CheckCircle className="w-5 h-5 text-blue-600" />
                                <span className="font-medium text-blue-900">Task Completion</span>
                            </div>
                            <p className="text-sm text-blue-700">
                                {analyticsData.overview.completedTasks} tasks completed this month
                            </p>
                            <p className="text-xs text-blue-600 mt-1">
                                {analyticsData.overview.pendingTasks} still pending
                            </p>
                        </div>
                        
                        <div className="p-4 bg-green-50 rounded-lg">
                            <div className="flex items-center gap-2 mb-2">
                                <TrendingUp className="w-5 h-5 text-green-600" />
                                <span className="font-medium text-green-900">Growth</span>
                            </div>
                            <p className="text-sm text-green-700">
                                {analyticsData.overview.newHires} new hires in the last 30 days
                            </p>
                            <p className="text-xs text-green-600 mt-1">
                                17% team growth rate
                            </p>
                        </div>

                        <div className="p-4 bg-yellow-50 rounded-lg">
                            <div className="flex items-center gap-2 mb-2">
                                <AlertTriangle className="w-5 h-5 text-yellow-600" />
                                <span className="font-medium text-yellow-900">Attention Needed</span>
                            </div>
                            <p className="text-sm text-yellow-700">
                                {analyticsData.overview.onLeave} members currently on leave
                            </p>
                            <p className="text-xs text-yellow-600 mt-1">
                                Consider workload redistribution
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TeamAnalytics2;