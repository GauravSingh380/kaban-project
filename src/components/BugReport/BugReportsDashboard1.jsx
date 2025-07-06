import React, { useState, useEffect, useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, Legend } from 'recharts';
import { Calendar, TrendingUp, AlertCircle, Users, Clock, CheckCircle, Target, Filter, Download, RefreshCw } from 'lucide-react';

// Sample data - in real app, this would come from your bug data
const sampleBugData = [
  { id: 1, priority: 'P1', status: 'open', assignedTo: 'John Doe', reportedBy: 'Alice Smith', issueEnv: ['Production'], reportedOn: '2024-01-15', updatedAt: '2024-01-16', resolutionTime: null },
  { id: 2, priority: 'P2', status: 'closed', assignedTo: 'Jane Wilson', reportedBy: 'Bob Johnson', issueEnv: ['Staging'], reportedOn: '2024-01-10', updatedAt: '2024-01-14', resolutionTime: 4 },
  { id: 3, priority: 'P3', status: 'in-progress', assignedTo: 'Mike Chen', reportedBy: 'Carol White', issueEnv: ['Development'], reportedOn: '2024-01-12', updatedAt: '2024-01-15', resolutionTime: null },
  { id: 4, priority: 'P1', status: 'closed', assignedTo: 'Sarah Davis', reportedBy: 'David Brown', issueEnv: ['Production'], reportedOn: '2024-01-08', updatedAt: '2024-01-12', resolutionTime: 4 },
  { id: 5, priority: 'P2', status: 'open', assignedTo: 'Tom Anderson', reportedBy: 'Emma Wilson', issueEnv: ['Staging', 'Production'], reportedOn: '2024-01-14', updatedAt: '2024-01-16', resolutionTime: null },
  { id: 6, priority: 'P3', status: 'closed', assignedTo: 'Lisa Garcia', reportedBy: 'Frank Miller', issueEnv: ['Development'], reportedOn: '2024-01-05', updatedAt: '2024-01-11', resolutionTime: 6 },
  { id: 7, priority: 'P1', status: 'in-progress', assignedTo: 'Alex Johnson', reportedBy: 'Grace Lee', issueEnv: ['Production'], reportedOn: '2024-01-13', updatedAt: '2024-01-16', resolutionTime: null },
  { id: 8, priority: 'P2', status: 'closed', assignedTo: 'Ryan Taylor', reportedBy: 'Helen Clark', issueEnv: ['Staging'], reportedOn: '2024-01-09', updatedAt: '2024-01-13', resolutionTime: 4 },
];

const BugReportsDashboard1 = () => {
  const [bugData, setBugData] = useState(sampleBugData);
  const [dateRange, setDateRange] = useState('7'); // days
  const [selectedMetric, setSelectedMetric] = useState('all');
  const [refreshing, setRefreshing] = useState(false);

  // Calculate key metrics
  const metrics = useMemo(() => {
    const total = bugData.length;
    const open = bugData.filter(b => b.status === 'open').length;
    const closed = bugData.filter(b => b.status === 'closed').length;
    const inProgress = bugData.filter(b => b.status === 'in-progress').length;
    const critical = bugData.filter(b => b.priority === 'P1').length;
    const avgResolutionTime = bugData.filter(b => b.resolutionTime).reduce((acc, b) => acc + b.resolutionTime, 0) / bugData.filter(b => b.resolutionTime).length || 0;
    
    return {
      total,
      open,
      closed,
      inProgress,
      critical,
      avgResolutionTime: Math.round(avgResolutionTime * 10) / 10,
      resolutionRate: total > 0 ? Math.round((closed / total) * 100) : 0
    };
  }, [bugData]);

  // Priority distribution data
  const priorityData = useMemo(() => {
    const priorities = bugData.reduce((acc, bug) => {
      acc[bug.priority] = (acc[bug.priority] || 0) + 1;
      return acc;
    }, {});
    
    return Object.entries(priorities).map(([priority, count]) => ({
      name: priority,
      value: count,
      color: priority === 'P1' ? '#ef4444' : priority === 'P2' ? '#f59e0b' : '#10b981'
    }));
  }, [bugData]);

  // Status distribution data
  const statusData = useMemo(() => {
    const statuses = bugData.reduce((acc, bug) => {
      acc[bug.status] = (acc[bug.status] || 0) + 1;
      return acc;
    }, {});
    
    return Object.entries(statuses).map(([status, count]) => ({
      name: status.replace('-', ' ').toUpperCase(),
      value: count,
      color: status === 'open' ? '#ef4444' : status === 'closed' ? '#10b981' : '#f59e0b'
    }));
  }, [bugData]);

  // Environment distribution data
  const environmentData = useMemo(() => {
    const envCount = bugData.reduce((acc, bug) => {
      bug.issueEnv.forEach(env => {
        acc[env] = (acc[env] || 0) + 1;
      });
      return acc;
    }, {});
    
    return Object.entries(envCount).map(([env, count]) => ({
      environment: env,
      count
    }));
  }, [bugData]);

  // Team performance data
  const teamPerformance = useMemo(() => {
    const teamData = bugData.reduce((acc, bug) => {
      const assignee = bug.assignedTo;
      if (!acc[assignee]) {
        acc[assignee] = { name: assignee, assigned: 0, resolved: 0, avgResolution: 0 };
      }
      acc[assignee].assigned += 1;
      if (bug.status === 'closed') {
        acc[assignee].resolved += 1;
        acc[assignee].avgResolution = bug.resolutionTime || 0;
      }
      return acc;
    }, {});
    
    return Object.values(teamData).map(member => ({
      ...member,
      resolutionRate: member.assigned > 0 ? Math.round((member.resolved / member.assigned) * 100) : 0
    }));
  }, [bugData]);

  // Trend data (simulated)
  const trendData = useMemo(() => {
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    return days.map(day => ({
      day,
      reported: Math.floor(Math.random() * 10) + 1,
      resolved: Math.floor(Math.random() * 8) + 1
    }));
  }, []);

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };

  const exportReport = () => {
    const reportData = {
      generatedAt: new Date().toISOString(),
      metrics,
      priorityDistribution: priorityData,
      statusDistribution: statusData,
      environmentDistribution: environmentData,
      teamPerformance
    };
    
    const blob = new Blob([JSON.stringify(reportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `bug-report-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Bug Reports & Analytics</h1>
              <p className="text-gray-600 mt-2">Comprehensive insights and metrics for bug management</p>
            </div>
            <div className="mt-4 sm:mt-0 flex items-center space-x-3">
              <select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2 text-sm"
              >
                <option value="7">Last 7 days</option>
                <option value="30">Last 30 days</option>
                <option value="90">Last 90 days</option>
                <option value="365">Last year</option>
              </select>
              <button
                onClick={handleRefresh}
                className={`flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 ${refreshing ? 'opacity-50' : ''}`}
              >
                <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
                <span>Refresh</span>
              </button>
              <button
                onClick={exportReport}
                className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
              >
                <Download className="w-4 h-4" />
                <span>Export</span>
              </button>
            </div>
          </div>
        </div>

        {/* Key Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Bugs</p>
                <p className="text-3xl font-bold text-gray-900">{metrics.total}</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-full">
                <AlertCircle className="w-6 h-6 text-blue-600" />
              </div>
            </div>
            <p className="text-sm text-gray-500 mt-2">All reported bugs</p>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Open Bugs</p>
                <p className="text-3xl font-bold text-red-600">{metrics.open}</p>
              </div>
              <div className="p-3 bg-red-100 rounded-full">
                <AlertCircle className="w-6 h-6 text-red-600" />
              </div>
            </div>
            <p className="text-sm text-gray-500 mt-2">Requires attention</p>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Resolution Rate</p>
                <p className="text-3xl font-bold text-green-600">{metrics.resolutionRate}%</p>
              </div>
              <div className="p-3 bg-green-100 rounded-full">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
            </div>
            <p className="text-sm text-gray-500 mt-2">Bugs resolved</p>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg Resolution Time</p>
                <p className="text-3xl font-bold text-orange-600">{metrics.avgResolutionTime}</p>
              </div>
              <div className="p-3 bg-orange-100 rounded-full">
                <Clock className="w-6 h-6 text-orange-600" />
              </div>
            </div>
            <p className="text-sm text-gray-500 mt-2">Days to resolve</p>
          </div>
        </div>

        {/* Charts Row 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Priority Distribution */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Priority Distribution</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={priorityData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {priorityData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Status Distribution */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Status Distribution</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Charts Row 2 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Environment Distribution */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Environment Distribution</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={environmentData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="environment" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Bug Trend */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Bug Trend (Last 7 Days)</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="reported" stroke="#ef4444" strokeWidth={2} />
                <Line type="monotone" dataKey="resolved" stroke="#10b981" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Team Performance Table */}
        <div className="bg-white rounded-lg shadow mb-8">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Team Performance</h3>
            <p className="text-sm text-gray-600 mt-1">Individual contributor metrics</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Team Member</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assigned</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Resolved</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Resolution Rate</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Avg Resolution Time</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {teamPerformance.map((member, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
                          {member.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div className="ml-3">
                          <div className="text-sm font-medium text-gray-900">{member.name}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{member.assigned}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{member.resolved}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                        member.resolutionRate >= 80 ? 'bg-green-100 text-green-800' :
                        member.resolutionRate >= 60 ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {member.resolutionRate}%
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {member.avgResolution || 'N/A'} days
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Critical Issues Alert */}
        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
          <div className="flex items-center">
            <AlertCircle className="w-5 h-5 text-red-600 mr-3" />
            <div>
              <h4 className="text-lg font-semibold text-red-900">Critical Issues Alert</h4>
              <p className="text-red-700 mt-1">
                You have {metrics.critical} critical (P1) bugs that require immediate attention.
              </p>
              <button className="mt-3 bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 text-sm">
                View Critical Issues
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BugReportsDashboard1;